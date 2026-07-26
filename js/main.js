/* ============================================================
   APURVA ADORNMENT — shared UI (header, footer, cart, helpers)
   ============================================================ */

/* ---------- helpers ---------- */
const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
const fmt = n => "₹" + n.toLocaleString("en-IN");
const qs = new URLSearchParams(location.search);

const TILAK_SVG = `<svg class="tilak" viewBox="0 0 60 80" aria-hidden="true">
  <path d="M12 22 Q30 66 48 22 Q42 58 30 60 Q18 58 12 22Z" fill="#f2811d"/>
  <circle cx="30" cy="30" r="8.5" fill="#c1122f"/></svg>`;

const NAV_ITEMS = [
  ["index.html", "Home", "🏠"],
  ["shop.html", "Shop", "🛍"],
  ["customize.html", "Customize", "✨"],
  ["temples.html", "Temples", "🛕"],
  ["donate.html", "Donate", "🪔"],
  ["about.html", "About", "🪷"]
];

/* ---------- header / footer injection ---------- */
function renderHeader() {
  const page = location.pathname.split("/").pop() || "index.html";
  const nav = NAV_ITEMS.map(([href, label]) =>
    `<li><a href="${href}" class="${page === href ? "active" : ""}">${label}</a></li>`).join("");
  const drawerNav = NAV_ITEMS.map(([href, label, em]) =>
    `<a href="${href}"><span>${em}</span>${label}</a>`).join("");

  document.getElementById("site-header").innerHTML = `
  <a class="skip" href="#main">Skip to content</a>
  <div class="topbar">
    <span>🙏 Jay Shree Swaminarayan</span><span>✦ Free shipping above ₹999</span><span>✦ Worldwide temple delivery</span>
  </div>
  <nav class="navbar" aria-label="Main">
    <a class="brand" href="index.html">${TILAK_SVG}
      <span><span class="brand-name">Apurva Adornment</span><br>
      <span class="brand-tag">Divine Elegance in Every Creation</span></span>
    </a>
    <ul class="nav-links">${nav}</ul>
    <div class="nav-actions">
      <a class="icon-btn" href="account.html" aria-label="My account" title="My Account">
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#6d1526" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 21 Q4 14 12 14 Q20 14 20 21"/></svg>
      </a>
      <a class="icon-btn" href="cart.html" aria-label="Cart" title="Cart">
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#6d1526" stroke-width="2"><path d="M3 4 H6 L8.5 16 H19 L21.5 7 H7"/><circle cx="10" cy="20" r="1.6" fill="#6d1526"/><circle cx="17.5" cy="20" r="1.6" fill="#6d1526"/></svg>
        <span class="badge-dot" id="cart-count">0</span>
      </a>
      <button class="icon-btn hamburger" id="ham" aria-label="Open menu">
        <svg width="20" height="20" viewBox="0 0 24 24" stroke="#6d1526" stroke-width="2.4" stroke-linecap="round"><path d="M3 6 H21 M3 12 H21 M3 18 H21"/></svg>
      </button>
    </div>
  </nav>
  <div class="drawer-scrim" id="scrim"></div>
  <aside class="drawer" id="drawer" aria-label="Mobile menu">
    <div class="drawer-head"><b>🪷 Menu</b><button class="drawer-close" id="drawer-close" aria-label="Close menu">×</button></div>
    <div class="drawer-links">${drawerNav}
      <a href="account.html"><span>👤</span>My Account</a>
      <a href="cart.html"><span>🛒</span>Cart</a>
    </div>
    <div class="drawer-foot">
      <a class="btn btn-gold btn-block" href="donate.html">🪔 Donate to Temple</a>
      <a class="btn btn-outline btn-block" href="customize.html">✨ Customize Your Deity</a>
    </div>
  </aside>`;

  const drawer = document.getElementById("drawer"), scrim = document.getElementById("scrim");
  const toggle = open => { drawer.classList.toggle("open", open); scrim.classList.toggle("open", open); document.body.style.overflow = open ? "hidden" : ""; };
  document.getElementById("ham").onclick = () => toggle(true);
  document.getElementById("drawer-close").onclick = () => toggle(false);
  scrim.onclick = () => toggle(false);
  updateCartBadge();
}

function renderFooter() {
  document.getElementById("site-footer").innerHTML = `
  <footer>
    <div class="foot-grid">
      <div class="foot-brand">
        <a class="brand" href="index.html">${TILAK_SVG}
          <span><span class="brand-name" style="color:var(--gold-light)">Apurva Adornment</span><br>
          <span class="brand-tag">Divine Elegance in Every Creation</span></span></a>
        <p>India's first technology-enabled devotional lifestyle & temple management platform — combining tradition, craftsmanship & sustainability.</p>
      </div>
      <div><h4>Shop</h4><ul>
        <li><a href="shop.html?cat=jewellery">Deity Jewellery</a></li>
        <li><a href="shop.html?cat=mukut">Mukuts & Crowns</a></li>
        <li><a href="shop.html?cat=vastra">Vastras</a></li>
        <li><a href="shop.html?cat=shringar">Shringar Sets</a></li>
        <li><a href="shop.html?cat=upcycled">Upcycled Gifts</a></li></ul></div>
      <div><h4>Services</h4><ul>
        <li><a href="customize.html">AI Measurement</a></li>
        <li><a href="customize.html">Customization Studio</a></li>
        <li><a href="temples.html">Temple Dashboard</a></li>
        <li><a href="donate.html">NRI Gifting</a></li>
        <li><a href="account.html">Seva Subscriptions</a></li></ul></div>
      <div><h4>Community</h4><ul>
        <li><a href="about.html">Our Story</a></li>
        <li><a href="about.html#artisans">Artisan Stories</a></li>
        <li><a href="about.html#contact">Contact Us</a></li>
        <li><a href="#" rel="noopener">Instagram</a></li>
        <li><a href="#" rel="noopener">WhatsApp</a></li></ul></div>
    </div>
    <div class="foot-bottom">🙏 Jay Shree Swaminarayan · © 2026 Apurva Adornment · Crafted with devotion in India · <em>Demo site — dummy data</em></div>
  </footer>`;
}

/* ---------- generated product art (SVG placeholders) ---------- */
const CAT_ICONS = {
  jewellery: `<path d="M-26 -14 Q0 22 26 -14" fill="none" stroke="FG" stroke-width="4" stroke-linecap="round"/>
    <circle cx="0" cy="14" r="7" fill="AC"/><circle cx="-15" cy="-1" r="4" fill="FG"/><circle cx="15" cy="-1" r="4" fill="FG"/>`,
  mukut: `<path d="M-28 16 L-23 -14 L-10 4 L0 -22 L10 4 L23 -14 L28 16 Z" fill="FG" stroke="AC" stroke-width="2"/>
    <rect x="-30" y="16" width="60" height="8" rx="4" fill="AC"/><circle cx="0" cy="-22" r="4" fill="AC"/>`,
  vastra: `<path d="M-16 -22 L0 -12 L16 -22 L26 -12 L16 -2 L16 24 L-16 24 L-16 -2 L-26 -12 Z" fill="FG" stroke="AC" stroke-width="2"/>
    <path d="M-8 6 H8 M-8 14 H8" stroke="AC" stroke-width="3" stroke-linecap="round"/>`,
  shringar: `<circle cx="0" cy="0" r="24" fill="none" stroke="FG" stroke-width="3"/>
    <path d="M0 -14 Q6 -4 0 2 Q-6 -4 0 -14Z" fill="AC"/><circle cx="-12" cy="10" r="4" fill="FG"/><circle cx="12" cy="10" r="4" fill="FG"/><circle cx="0" cy="14" r="4" fill="AC"/>`,
  upcycled: `<rect x="-22" y="-8" width="44" height="30" rx="4" fill="FG" opacity=".9"/>
    <path d="M-22 0 H22 M0 -8 V22" stroke="AC" stroke-width="3"/><path d="M-12 -8 Q0 -30 0 -8 Q0 -30 12 -8" fill="none" stroke="AC" stroke-width="3"/>`
};

function productArt(p, id = "") {
  const t = ART_THEMES[p.theme % ART_THEMES.length];
  const icon = CAT_ICONS[p.cat].replaceAll("FG", t.fg).replaceAll("AC", t.ac);
  const u = "g" + p.id + id + Math.random().toString(36).slice(2, 6);
  return `<svg viewBox="0 0 200 210" role="img" aria-label="${p.name}" xmlns="http://www.w3.org/2000/svg">
    <defs><radialGradient id="${u}" cx="50%" cy="38%" r="75%">
      <stop offset="0%" stop-color="${t.bg1}"/><stop offset="100%" stop-color="${t.bg2}"/></radialGradient></defs>
    <rect width="200" height="210" fill="url(#${u})"/>
    <circle cx="100" cy="92" r="66" fill="none" stroke="${t.fg}" stroke-width=".8" opacity=".35"/>
    <circle cx="100" cy="92" r="54" fill="none" stroke="${t.fg}" stroke-width=".6" opacity=".25" stroke-dasharray="3 5"/>
    <path d="M40 30 l4 8 8 4 -8 4 -4 8 -4 -8 -8 -4 8 -4Z" fill="${t.fg}" opacity=".3"/>
    <path d="M160 160 l3 6 6 3 -6 3 -3 6 -3 -6 -6 -3 6 -3Z" fill="${t.fg}" opacity=".3"/>
    <g transform="translate(100 92)">${icon}</g>
    <text x="100" y="196" text-anchor="middle" font-family="Georgia,serif" font-size="11" fill="${t.fg}" opacity=".85">${CATEGORIES[p.cat]}</text>
  </svg>`;
}

/* ---------- cart & wishlist (localStorage) ---------- */
const store = {
  get cart() { try { return JSON.parse(localStorage.getItem("aa_cart")) || []; } catch { return []; } },
  set cart(v) { localStorage.setItem("aa_cart", JSON.stringify(v)); updateCartBadge(); },
  get wish() { try { return JSON.parse(localStorage.getItem("aa_wish")) || []; } catch { return []; } },
  set wish(v) { localStorage.setItem("aa_wish", JSON.stringify(v)); }
};

function updateCartBadge() {
  const el = document.getElementById("cart-count");
  if (el) el.textContent = store.cart.reduce((s, i) => s + i.qty, 0);
}

function addToCart(id, size, qty = 1) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  size = size || p.sizes[0];
  const cart = store.cart;
  const line = cart.find(i => i.id === id && i.size === size);
  if (line) line.qty += qty; else cart.push({ id, size, qty });
  store.cart = cart;
  toast(`🛒 Added "${p.name}" to cart`);
}

function toggleWish(id, btn) {
  let w = store.wish;
  if (w.includes(id)) { w = w.filter(x => x !== id); btn.classList.remove("on"); btn.innerHTML = "♡"; toast("Removed from wishlist"); }
  else { w.push(id); btn.classList.add("on"); btn.innerHTML = "♥"; toast("♥ Saved to wishlist"); }
  store.wish = w;
}

/* ---------- toast ---------- */
let toastTimer;
function toast(msg) {
  let t = document.getElementById("toast");
  if (!t) { t = document.createElement("div"); t.id = "toast"; t.className = "toast"; t.setAttribute("role", "status"); document.body.appendChild(t); }
  t.textContent = msg;
  requestAnimationFrame(() => t.classList.add("show"));
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2400);
}

/* ---------- product card ---------- */
function stars(r) { return "★".repeat(Math.round(r)) + "☆".repeat(5 - Math.round(r)); }
function cardHTML(p) {
  const off = Math.round((1 - p.price / p.old) * 100);
  const wished = store.wish.includes(p.id);
  const badgeCls = p.badge === "New" ? "new" : p.badge === "Festival" ? "fest" : "";
  return `<article class="prod-card reveal">
    ${p.badge ? `<span class="prod-badge ${badgeCls}">${p.badge}</span>` : ""}
    <button class="wish-btn ${wished ? "on" : ""}" aria-label="Add to wishlist" onclick="toggleWish(${p.id},this)">${wished ? "♥" : "♡"}</button>
    <a class="prod-art" href="product.html?id=${p.id}">${productArt(p)}</a>
    <div class="prod-body">
      <span class="prod-deity">${p.deity}</span>
      <a href="product.html?id=${p.id}"><h3 class="prod-name">${p.name}</h3></a>
      <span class="prod-rating"><span class="stars">${stars(p.rating)}</span> ${p.rating} (${p.reviews})</span>
      <div class="prod-price"><b>${fmt(p.price)}</b><s>${fmt(p.old)}</s><span class="off">${off}% off</span></div>
      <div class="prod-cta">
        <button class="btn btn-gold" onclick="addToCart(${p.id})">Add to Cart</button>
        <a class="btn btn-outline" href="product.html?id=${p.id}">View</a>
      </div>
    </div>
  </article>`;
}

/* ---------- scroll reveal ---------- */
function initReveal() {
  const io = new IntersectionObserver(es => {
    es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("on"); io.unobserve(e.target); } });
  }, { threshold: .12 });
  $$(".reveal").forEach(el => io.observe(el));
}

/* ---------- accordions ---------- */
function initAccordions() {
  $$(".accordion .acc-head").forEach(h => h.addEventListener("click", () => h.parentElement.classList.toggle("open")));
}

/* ---------- boot ---------- */
document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderFooter();
  if (typeof pageInit === "function") pageInit();
  initReveal();
  initAccordions();
});

