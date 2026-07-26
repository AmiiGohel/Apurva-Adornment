/* ============================================================
   APURVA ADORNMENT — AI Deity Measurement Scanner
   100% in-browser (canvas image analysis). No server, no API.
   - Auto-detects the murti silhouette from an uploaded photo
   - Measures head/crown, shoulder & neck proportions (real pixels)
   - Converts to real sizes using a scale (known height OR a
     reference object of known length placed in the photo)
   - Recommends mukut / necklace / vastra sizes
   ============================================================ */
(function () {
  const DEITY_PREFIX = {
    "Shree Swaminarayan": "SW", "Radha Krishna": "RK", "Bal Gopal": "BG",
    "Jagannath Ji": "JG", "Ram Darbar": "RD", "Devi Maa": "DM"
  };
  const DEFAULT_HEIGHT = {
    "Shree Swaminarayan": 18, "Radha Krishna": 12, "Bal Gopal": 6,
    "Jagannath Ji": 12, "Ram Darbar": 12, "Devi Maa": 12
  };
  const MAXDIM = 360;
  const pad2 = n => String(Math.max(0, Math.round(n))).padStart(2, "0");

  /* ---------- load a File into a canvas ---------- */
  function loadFile(file, canvas) {
    return new Promise((res, rej) => {
      const reader = new FileReader();
      reader.onerror = () => rej(new Error("read failed"));
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const scale = Math.min(1, MAXDIM / Math.max(img.width, img.height));
          canvas.width = Math.round(img.width * scale);
          canvas.height = Math.round(img.height * scale);
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          canvas._img = img; canvas._scale = scale;
          res();
        };
        img.onerror = () => rej(new Error("image failed"));
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    });
  }
  function redraw(canvas) {
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(canvas._img, 0, 0, canvas.width, canvas.height);
  }

  /* ---------- silhouette analysis ---------- */
  function analyze(canvas, sensitivity) {
    const W = canvas.width, H = canvas.height;
    const ctx = canvas.getContext("2d");
    if (canvas._img) { ctx.clearRect(0, 0, W, H); ctx.drawImage(canvas._img, 0, 0, W, H); } // read CLEAN pixels, never the overlay
    const data = ctx.getImageData(0, 0, W, H).data;
    const at = (x, y) => { const i = (y * W + x) * 4; return [data[i], data[i + 1], data[i + 2]]; };

    /* background = median-ish of corner patches */
    const patch = [], P = Math.max(4, Math.round(Math.min(W, H) * 0.06));
    for (const [cx, cy] of [[0, 0], [W - P, 0], [0, H - P], [W - P, H - P]])
      for (let y = 0; y < P; y++) for (let x = 0; x < P; x++) patch.push(at(cx + x, cy + y));
    const bg = [0, 1, 2].map(k => patch.reduce((s, p) => s + p[k], 0) / patch.length);
    const dist = (p) => Math.abs(p[0] - bg[0]) + Math.abs(p[1] - bg[1]) + Math.abs(p[2] - bg[2]);
    const thresh = sensitivity; // sum-of-abs over 3 channels

    /* per-row extent of foreground */
    const rowMin = new Int16Array(H).fill(-1), rowMax = new Int16Array(H).fill(-1), rowCnt = new Int16Array(H);
    for (let y = 0; y < H; y++) {
      let mn = -1, mx = -1, c = 0;
      for (let x = 0; x < W; x++) {
        if (dist(at(x, y)) > thresh) { if (mn < 0) mn = x; mx = x; c++; }
      }
      rowMin[y] = mn; rowMax[y] = mx; rowCnt[y] = c;
    }
    const minRowFg = Math.max(3, Math.round(W * 0.03));
    let top = -1, bot = -1;
    for (let y = 0; y < H; y++) if (rowCnt[y] > minRowFg) { if (top < 0) top = y; bot = y; }
    if (top < 0) return null; // nothing detected

    /* horizontal bbox */
    let left = W, right = 0;
    for (let y = top; y <= bot; y++) if (rowCnt[y] > minRowFg) { left = Math.min(left, rowMin[y]); right = Math.max(right, rowMax[y]); }

    const figH = bot - top;
    const width = y => (rowCnt[y] > minRowFg ? rowMax[y] - rowMin[y] : 0);
    const band = f => Math.round(top + figH * f); // integer row index at fraction f of the figure

    /* crown / head: widest row in top 14% */
    let crownW = 0, crownY = top;
    for (let y = band(0); y <= band(0.14); y++) if (width(y) > crownW) { crownW = width(y); crownY = y; }

    /* shoulders: widest row in 25%–58% band */
    let shoW = 0, shoY = band(0.4);
    for (let y = band(0.25); y <= band(0.58); y++) if (width(y) > shoW) { shoW = width(y); shoY = y; }

    /* neck: narrowest row between head (16%) and shoulders */
    let neckW = 1e9, neckY = band(0.22);
    const nEnd = Math.max(band(0.18) + 1, shoY);
    for (let y = band(0.16); y < nEnd; y++) { const w = width(y); if (w > 2 && w < neckW) { neckW = w; neckY = y; } }
    if (neckW === 1e9 || neckW >= shoW) { neckW = Math.round((shoW || crownW) * 0.55); neckY = band(0.22); }

    /* coverage confidence */
    let fg = 0; for (let y = top; y <= bot; y++) fg += rowCnt[y];
    const coverage = fg / (figH * (right - left) + 1);
    const conf = Math.max(0.35, Math.min(0.97, coverage * 1.4));

    return { top, bot, left, right, figH, crownW, crownY, shoW, shoY, neckW, neckY, conf };
  }

  /* ---------- overlay measurement lines ---------- */
  function overlay(canvas, a) {
    const ctx = canvas.getContext("2d");
    redraw(canvas);
    ctx.lineWidth = 2;
    ctx.font = "600 11px Poppins, sans-serif";
    // bounding box
    ctx.strokeStyle = "rgba(243,210,122,.9)";
    ctx.setLineDash([5, 4]);
    ctx.strokeRect(a.left - 2, a.top - 2, (a.right - a.left) + 4, a.figH + 4);
    ctx.setLineDash([]);
    const line = (y, w, cx, color, label) => {
      ctx.strokeStyle = color; ctx.fillStyle = color;
      ctx.beginPath(); ctx.moveTo(cx - w / 2, y); ctx.lineTo(cx + w / 2, y); ctx.stroke();
      ctx.beginPath(); ctx.arc(cx - w / 2, y, 3, 0, 7); ctx.arc(cx + w / 2, y, 3, 0, 7); ctx.fill();
      ctx.fillText(label, cx + w / 2 + 5, y + 3);
    };
    const mid = (a.left + a.right) / 2;
    line(a.crownY, a.crownW, mid, "#ffa94d", "crown");
    line(a.neckY, a.neckW, (a.rowCenter || mid), "#7ee2b8", "neck");
    line(a.shoY, a.shoW, mid, "#f2811d", "shoulder");
    // height marker
    ctx.strokeStyle = "#f3d27a"; ctx.fillStyle = "#f3d27a";
    ctx.beginPath(); ctx.moveTo(a.left - 8, a.top); ctx.lineTo(a.left - 8, a.bot); ctx.stroke();
    ctx.save(); ctx.translate(a.left - 12, (a.top + a.bot) / 2); ctx.rotate(-Math.PI / 2);
    ctx.textAlign = "center"; ctx.fillText("height", 0, 0); ctx.restore();
  }

  /* ---------- recommendations ---------- */
  function recommend(deity, m) {
    const h = m.heightIn;
    const mukut = h < 5 ? "XS" : h < 8 ? "Small" : h < 13 ? "Medium" : h < 19 ? "Large" : "XL";
    const necklace = Math.max(2, Math.round(m.shoulderIn * 1.05)); // sits across shoulders
    const prefix = DEITY_PREFIX[deity] || "AA";
    const vastra = `${prefix}-${pad2(h)}`;
    return { mukut, necklace, vastra };
  }
  const SIZE_OPTS = [4, 6, 9, 12, 18, 24];
  function nearestSizeOption(h) {
    if (h < 3 || h > 27) return "Custom (share via WhatsApp)";
    let best = SIZE_OPTS[0];
    for (const s of SIZE_OPTS) if (Math.abs(s - h) < Math.abs(best - h)) best = s;
    return best + " inch";
  }

  /* ============================================================
     MOUNT
     ============================================================ */
  function mount(root, opts = {}) {
    const getDeity = opts.getDeity || (() => "Bal Gopal");
    const fmtIn = n => (Math.round(n * 10) / 10) + "″";

    root.innerHTML = `
    <div class="scan">
      <input type="file" id="scan-file" accept="image/*" hidden>
      <div class="scan-drop" id="scan-drop" tabindex="0" role="button" aria-label="Upload deity photo">
        <div class="scan-drop-ic">📷</div>
        <b>Upload a photo of your Murti / Bhagwan</b>
        <span>Tap to choose · or drag &amp; drop an image here</span>
        <small>Tip: plain background &amp; front view give the most accurate reading</small>
      </div>

      <div class="scan-work" id="scan-work" hidden>
        <div class="scan-stage"><canvas id="scan-canvas"></canvas>
          <div class="scan-badge" id="scan-conf"></div>
        </div>

        <div class="scan-controls">
          <div class="field" style="margin-bottom:.7rem">
            <label>Detection sensitivity</label>
            <input type="range" id="scan-sens" min="20" max="140" value="60" style="accent-color:var(--saffron)">
            <small>Slide if the outline (dotted box) doesn't hug your deity.</small>
          </div>

          <label style="font-size:.76rem;font-weight:600;color:var(--maroon-800);letter-spacing:.04em">How should we set the scale?</label>
          <div class="chips" id="scan-mode" style="margin:.5rem 0 .9rem">
            <button class="chip on" data-m="height" type="button">📏 I know the height</button>
            <button class="chip" data-m="ref" type="button">🪙 Use a reference object</button>
          </div>

          <div id="scan-m-height">
            <div class="field">
              <label for="scan-h">Deity height (inches)</label>
              <input type="number" id="scan-h" min="1" max="120" step="0.5">
              <small>Not sure? Leave the estimate — everything below updates as you type.</small>
            </div>
          </div>

          <div id="scan-m-ref" hidden>
            <p style="font-size:.78rem;color:var(--muted);line-height:1.6;margin-bottom:.6rem">
              👉 <b>Drag a line</b> across an object of known size in the photo (a ₹ coin, ruler, matchbox…), then enter its real length.
            </p>
            <div class="field">
              <label for="scan-ref">Reference length</label>
              <div style="display:flex;gap:.5rem">
                <input type="number" id="scan-ref" min="0.1" step="0.1" placeholder="e.g. 1" style="flex:1">
                <select id="scan-ref-unit" style="width:90px"><option value="1">inch</option><option value="0.3937">cm</option></select>
              </div>
              <small id="scan-ref-px">Line: not drawn yet</small>
            </div>
          </div>

          <button class="btn btn-outline btn-sm" id="scan-reset" type="button" style="margin-top:.3rem">↻ Upload another photo</button>
        </div>

        <div class="scan-results" id="scan-results"></div>
      </div>
    </div>`;

    const $ = s => root.querySelector(s);
    const canvas = $("#scan-canvas");
    let A = null, mode = "height";
    let refDrag = null, refLenPx = 0; // reference line

    /* ---- file handling ---- */
    const fileInput = $("#scan-file"), drop = $("#scan-drop");
    drop.onclick = () => fileInput.click();
    drop.onkeydown = e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); fileInput.click(); } };
    ["dragover", "dragenter"].forEach(ev => drop.addEventListener(ev, e => { e.preventDefault(); drop.classList.add("drag"); }));
    ["dragleave", "drop"].forEach(ev => drop.addEventListener(ev, e => { e.preventDefault(); drop.classList.remove("drag"); }));
    drop.addEventListener("drop", e => { const f = e.dataTransfer.files[0]; if (f) handleFile(f); });
    fileInput.onchange = () => { if (fileInput.files[0]) handleFile(fileInput.files[0]); };

    async function handleFile(file) {
      if (!file.type.startsWith("image/")) { window.toast && toast("Please choose an image file"); return; }
      try {
        await loadFile(file, canvas);
        $("#scan-drop").hidden = true;
        $("#scan-work").hidden = false;
        refLenPx = 0; refDrag = null; mode = "height";
        setMode("height");
        // seed height estimate from deity default
        $("#scan-h").value = DEFAULT_HEIGHT[getDeity()] || 12;
        run();
      } catch (err) { window.toast && toast("Couldn't read that image — try another"); }
    }

    /* ---- mode toggle ---- */
    function setMode(m) {
      mode = m;
      root.querySelectorAll("#scan-mode .chip").forEach(c => c.classList.toggle("on", c.dataset.m === m));
      $("#scan-m-height").hidden = m !== "height";
      $("#scan-m-ref").hidden = m !== "ref";
      run();
    }
    root.querySelectorAll("#scan-mode .chip").forEach(c => c.onclick = () => setMode(c.dataset.m));

    /* ---- reference line drawing (pointer) ---- */
    canvas.style.touchAction = "none";
    function canvasPt(e) {
      const r = canvas.getBoundingClientRect();
      return { x: (e.clientX - r.left) * (canvas.width / r.width), y: (e.clientY - r.top) * (canvas.height / r.height) };
    }
    canvas.addEventListener("pointerdown", e => {
      if (mode !== "ref") return;
      canvas.setPointerCapture(e.pointerId);
      refDrag = { a: canvasPt(e), b: canvasPt(e) };
    });
    canvas.addEventListener("pointermove", e => {
      if (mode !== "ref" || !refDrag) return;
      refDrag.b = canvasPt(e); drawRefLine();
    });
    canvas.addEventListener("pointerup", () => {
      if (mode !== "ref" || !refDrag) return;
      refLenPx = Math.hypot(refDrag.b.x - refDrag.a.x, refDrag.b.y - refDrag.a.y);
      $("#scan-ref-px").textContent = refLenPx > 4 ? `Line drawn: ${Math.round(refLenPx)} px` : "Line too short — drag across the object";
      refDrag.done = true; run();
    });
    function drawRefLine() {
      if (A) overlay(canvas, A); else redraw(canvas);
      if (!refDrag) return;
      const ctx = canvas.getContext("2d");
      ctx.strokeStyle = "#fff"; ctx.lineWidth = 2.5; ctx.setLineDash([4, 3]);
      ctx.beginPath(); ctx.moveTo(refDrag.a.x, refDrag.a.y); ctx.lineTo(refDrag.b.x, refDrag.b.y); ctx.stroke();
      ctx.setLineDash([]); ctx.fillStyle = "#fff";
      [refDrag.a, refDrag.b].forEach(p => { ctx.beginPath(); ctx.arc(p.x, p.y, 4, 0, 7); ctx.fill(); });
    }

    /* ---- live recompute ---- */
    $("#scan-sens").addEventListener("input", run);
    $("#scan-h").addEventListener("input", compute);
    $("#scan-ref").addEventListener("input", compute);
    $("#scan-ref-unit").addEventListener("change", compute);
    $("#scan-reset").onclick = () => {
      $("#scan-work").hidden = true; $("#scan-drop").hidden = false;
      fileInput.value = ""; A = null;
    };

    function run() {
      A = analyze(canvas, +$("#scan-sens").value);
      if (!A) { $("#scan-conf").textContent = "⚠ No deity detected"; $("#scan-results").innerHTML =
        `<div class="scan-warn">Couldn't find a clear shape. Try a plainer background, better lighting, or adjust sensitivity.</div>`;
        redraw(canvas); return; }
      A.rowCenter = (A.left + A.right) / 2;
      overlay(canvas, A);
      if (refDrag && refDrag.done) drawRefLine();
      $("#scan-conf").textContent = `Detected · ${Math.round(A.conf * 100)}% confidence`;
      compute();
    }

    function compute() {
      if (!A) return;
      let pxPerInch, heightIn;
      if (mode === "ref") {
        const refIn = (+$("#scan-ref").value || 0) * (+$("#scan-ref-unit").value);
        if (!refLenPx || refLenPx < 4 || refIn <= 0) {
          $("#scan-results").innerHTML = `<div class="scan-warn">Draw a line across your reference object and enter its real length to auto-calculate.</div>`;
          return;
        }
        pxPerInch = refLenPx / refIn;
        heightIn = A.figH / pxPerInch;
        $("#scan-h") && ($("#scan-h").value = Math.round(heightIn * 10) / 10);
      } else {
        heightIn = +$("#scan-h").value || DEFAULT_HEIGHT[getDeity()] || 12;
        pxPerInch = A.figH / heightIn;
      }

      const m = {
        heightIn,
        crownIn: A.crownW / pxPerInch,
        shoulderIn: A.shoW / pxPerInch,
        neckWidthIn: A.neckW / pxPerInch,
      };
      m.neckCircIn = m.neckWidthIn * Math.PI;
      const rec = recommend(getDeity(), m);

      $("#scan-results").innerHTML = `
        <div class="scan-res-head">📐 Measurement Result <span>${getDeity()}${mode === "ref" ? " · auto-scaled" : ""}</span></div>
        <div class="sum-row"><span>Detected Height</span><b>${fmtIn(m.heightIn)}</b></div>
        <div class="sum-row"><span>Crown / Head Diameter</span><b>${fmtIn(m.crownIn)}</b></div>
        <div class="sum-row"><span>Shoulder Width</span><b>${fmtIn(m.shoulderIn)}</b></div>
        <div class="sum-row"><span>Neck Size (approx)</span><b>${fmtIn(m.neckCircIn)}</b></div>
        <div class="scan-rec">
          <div class="scan-pill">👑 Mukut: <b>${rec.mukut}</b></div>
          <div class="scan-pill">📿 Necklace: <b>${rec.necklace}″</b></div>
          <div class="scan-pill">👘 Vastra: <b>${rec.vastra}</b></div>
        </div>
        <button class="btn btn-gold btn-block" id="scan-apply" style="margin-top:.9rem">✅ Use these sizes for my order</button>
        <small style="display:block;margin-top:.6rem;color:var(--muted);font-size:.7rem;line-height:1.5">
          Estimated from your photo's proportions. For a guaranteed fit our artisans confirm final sizing on WhatsApp before crafting.
        </small>`;

      $("#scan-apply").onclick = () => {
        const sizeOpt = nearestSizeOption(m.heightIn);
        opts.onApply && opts.onApply({ ...m, ...rec, sizeOption: sizeOpt, deity: getDeity() });
      };
    }
  }

  window.AAScanner = { mount };
})();

