/* ============================================================
   APURVA ADORNMENT — dummy catalogue data (for development)
   ============================================================ */
const CATEGORIES = {
  jewellery: "Deity Jewellery",
  mukut: "Mukuts & Crowns",
  vastra: "Vastras",
  shringar: "Shringar Sets",
  upcycled: "Upcycled Gifts"
};

const DEITIES = ["Shree Swaminarayan", "Radha Krishna", "Bal Gopal", "Jagannath Ji", "Ram Darbar", "Devi Maa"];

const PRODUCTS = [
  { id: 1,  name: "Rajwadi Kundan Mukut",        cat: "mukut",     deity: "Shree Swaminarayan", price: 2499, old: 3199, rating: 4.8, reviews: 142, badge: "Bestseller", theme: 0, sizes: ["S (4″)","M (8″)","L (12″)","XL (18″)"], desc: "Handcrafted rajwadi mukut with kundan stones, meenakari detailing and pearl lattice. Custom-sized to your deity's swaroop." },
  { id: 2,  name: "Pearl Jadau Necklace Set",    cat: "jewellery", deity: "Radha Krishna",      price: 1299, old: 1699, rating: 4.7, reviews: 98,  badge: "Bestseller", theme: 1, sizes: ["3″","4″","6″","8″"], desc: "Twin necklace set for jugal jodi with fresh-water pearls, jadau work and adjustable dori." },
  { id: 3,  name: "Zari Silk Festival Vastra",   cat: "vastra",    deity: "Bal Gopal",          price: 899,  old: 1199, rating: 4.9, reviews: 210, badge: "Festival",   theme: 2, sizes: ["0-2","3-4","5-6","7-8"], desc: "Pure zari silk poshak with hand embroidery — perfect for Janmashtami and utsav celebrations." },
  { id: 4,  name: "Complete Hindola Shringar",   cat: "shringar",  deity: "Radha Krishna",      price: 4999, old: 6499, rating: 5.0, reviews: 64,  badge: "Festival",   theme: 3, sizes: ["8″ set","12″ set","18″ set"], desc: "Coordinated mukut, vastra, necklace, kamarbandh and bajubandh for the Hindola festival — one box, full shringar." },
  { id: 5,  name: "Meenakari Kamarbandh",        cat: "jewellery", deity: "Shree Swaminarayan", price: 649,  old: 849,  rating: 4.6, reviews: 77,  badge: "",           theme: 4, sizes: ["S","M","L"], desc: "Delicate waist ornament in meenakari enamel with gold-tone finish and hook clasp." },
  { id: 6,  name: "Stone Work Utsav Mukut",      cat: "mukut",     deity: "Radha Krishna",      price: 1899, old: 2399, rating: 4.7, reviews: 55,  badge: "New",        theme: 5, sizes: ["S","M","L"], desc: "Festival mukut studded with coloured stones and zircon border — pairs beautifully with any utsav vastra." },
  { id: 7,  name: "Daily Seva Cotton Vastra",    cat: "vastra",    deity: "Shree Swaminarayan", price: 449,  old: 599,  rating: 4.5, reviews: 189, badge: "",           theme: 0, sizes: ["6″","9″","12″","15″"], desc: "Soft breathable cotton vastra for daily seva — easy dressing with velcro back." },
  { id: 8,  name: "Makhan Chor Jhula Set",       cat: "shringar",  deity: "Bal Gopal",          price: 2299, old: 2999, rating: 4.9, reviews: 121, badge: "Bestseller", theme: 1, sizes: ["0-2","3-4","5-6"], desc: "Complete jhula shringar with cushioned swing, mukut, vastra and bansuri for Laddu Gopal ji." },
  { id: 9,  name: "Upcycled Vastra Keychain",    cat: "upcycled",  deity: "Radha Krishna",      price: 199,  old: 299,  rating: 4.8, reviews: 260, badge: "",           theme: 2, sizes: ["One size"], desc: "Sacred keepsake handcrafted by women artisans from respectfully retired temple vastras." },
  { id: 10, name: "Framed Sacred Cloth Art",     cat: "upcycled",  deity: "Shree Swaminarayan", price: 999,  old: 1399, rating: 4.9, reviews: 84,  badge: "New",        theme: 3, sizes: ["8x8″","12x12″"], desc: "Museum-style frame preserving a piece of sanctified vastra — a blessing for your wall." },
  { id: 11, name: "Navratna Bajubandh Pair",     cat: "jewellery", deity: "Devi Maa",           price: 799,  old: 999,  rating: 4.6, reviews: 43,  badge: "",           theme: 4, sizes: ["S","M","L"], desc: "Arm ornament pair with nine-gem setting, made to order for Devi swaroops." },
  { id: 12, name: "Annakut Special Poshak",      cat: "vastra",    deity: "Shree Swaminarayan", price: 1599, old: 2099, rating: 4.8, reviews: 96,  badge: "Festival",   theme: 5, sizes: ["9″","12″","18″","24″"], desc: "Grand brocade poshak with heavy border designed for Annakut darshan." },
  { id: 13, name: "Peacock Feather Mukut",       cat: "mukut",     deity: "Bal Gopal",          price: 749,  old: 949,  rating: 4.7, reviews: 158, badge: "Bestseller", theme: 0, sizes: ["XS","S","M"], desc: "Classic morpankh mukut with soft velvet base — the signature crown of Kanha ji." },
  { id: 14, name: "Jagannath Tilak Jewellery",   cat: "jewellery", deity: "Jagannath Ji",       price: 1099, old: 1449, rating: 4.8, reviews: 39,  badge: "",           theme: 1, sizes: ["S","M","L"], desc: "Traditional Odia-style adornment set including chandrika tilak and neck mala." },
  { id: 15, name: "Ram Darbar Shringar Set",     cat: "shringar",  deity: "Ram Darbar",         price: 5999, old: 7499, rating: 4.9, reviews: 28,  badge: "New",        theme: 2, sizes: ["12″ set","18″ set","24″ set"], desc: "Complete adornment for Shree Ram, Sita ji, Lakshman ji & Hanuman ji — 4 mukuts, 4 vastras, jewellery." },
  { id: 16, name: "Sacred Gift Hamper",          cat: "upcycled",  deity: "Radha Krishna",      price: 1499, old: 1999, rating: 4.9, reviews: 112, badge: "Festival",   theme: 3, sizes: ["Standard","Premium"], desc: "Curated hamper of upcycled keepsakes — bookmark, keychain, frame art & incense in a keepsake box." },
  { id: 17, name: "Chandan Summer Vastra",       cat: "vastra",    deity: "Radha Krishna",      price: 699,  old: 899,  rating: 4.6, reviews: 133, badge: "",           theme: 4, sizes: ["6″","9″","12″"], desc: "Light cooling chandan-toned vastra for the summer season with sandalwood-inspired prints." },
  { id: 18, name: "Diwali Grand Mukut",          cat: "mukut",     deity: "Devi Maa",           price: 2999, old: 3899, rating: 4.8, reviews: 51,  badge: "Festival",   theme: 5, sizes: ["M","L","XL"], desc: "Show-stopping mukut with lattice gold work and ruby-tone centre for Diwali & Navratri." },
  { id: 19, name: "Tulsi Kanthi Mala Set",       cat: "jewellery", deity: "Shree Swaminarayan", price: 349,  old: 449,  rating: 4.9, reviews: 305, badge: "Bestseller", theme: 0, sizes: ["One size"], desc: "Pure tulsi double-strand kanthi mala, hand-knotted with cotton thread." },
  { id: 20, name: "Sinjara Utsav Shringar",      cat: "shringar",  deity: "Devi Maa",           price: 3499, old: 4299, rating: 4.7, reviews: 33,  badge: "",           theme: 1, sizes: ["9″ set","12″ set"], desc: "Complete shringar with chunari, mukut, haar & bangles for Devi Maa utsav." },
  { id: 21, name: "Winter Shawl Poshak",         cat: "vastra",    deity: "Bal Gopal",          price: 549,  old: 749,  rating: 4.8, reviews: 176, badge: "",           theme: 2, sizes: ["0-2","3-4","5-6","7-8"], desc: "Warm quilted poshak with soft woollen shawl to keep Thakorji cosy in winter." },
  { id: 22, name: "Sacred Cloth Bookmark Set",   cat: "upcycled",  deity: "Jagannath Ji",       price: 249,  old: 349,  rating: 4.7, reviews: 92,  badge: "",           theme: 3, sizes: ["Set of 3","Set of 5"], desc: "Handmade bookmarks from retired temple cloth with tassels — set for gifting." },
  { id: 23, name: "Ram Navami Dhanush Set",      cat: "jewellery", deity: "Ram Darbar",         price: 899,  old: 1199, rating: 4.6, reviews: 24,  badge: "New",        theme: 4, sizes: ["S","M"], desc: "Miniature gold-tone dhanush-baan with stand, plus matching tilak jewellery." },
  { id: 24, name: "Sone Ki Jhalar Mukut",        cat: "mukut",     deity: "Jagannath Ji",       price: 1699, old: 2199, rating: 4.8, reviews: 47,  badge: "",           theme: 5, sizes: ["S","M","L"], desc: "Traditional jhalar-style crown with hanging gold fringe for Mahaprabhu." }
];

/* colour themes for generated product art */
const ART_THEMES = [
  { bg1: "#6d1526", bg2: "#3d0812", fg: "#f3d27a", ac: "#f2811d" },
  { bg1: "#8a4b12", bg2: "#54240a", fg: "#ffe9b0", ac: "#f3d27a" },
  { bg1: "#0f6d64", bg2: "#073d38", fg: "#f3d27a", ac: "#ffa94d" },
  { bg1: "#7a1224", bg2: "#490a16", fg: "#ffd9a0", ac: "#d4a941" },
  { bg1: "#9c6b00", bg2: "#5e4000", fg: "#fff3c9", ac: "#c1122f" },
  { bg1: "#4a1a4f", bg2: "#2a0e2d", fg: "#f3d27a", ac: "#ffa94d" }
];

const TEMPLES = [
  { id: 1, name: "Shree Swaminarayan Mandir",  city: "Ahmedabad, Gujarat",  need: "Annakut Shringar — 12 vastras & 4 mukuts", raised: 68, goal: "₹85,000", theme: 0 },
  { id: 2, name: "ISKCON Temple",              city: "Vrindavan, UP",       need: "Janmashtami festival set for Radha Krishna", raised: 84, goal: "₹1,20,000", theme: 2 },
  { id: 3, name: "Jagannath Mandir",           city: "Puri, Odisha",        need: "Rath Yatra vastras for Mahaprabhu",          raised: 45, goal: "₹95,000", theme: 3 },
  { id: 4, name: "Akshar Purushottam Mandir",  city: "Vadodara, Gujarat",   need: "Hindola festival decoration & shringar",     raised: 57, goal: "₹60,000", theme: 1 },
  { id: 5, name: "Shree Ram Mandir",           city: "Ayodhya, UP",         need: "Ram Navami darbar shringar set",             raised: 91, goal: "₹2,00,000", theme: 4 },
  { id: 6, name: "Ambaji Devi Mandir",         city: "Banaskantha, Gujarat",need: "Navratri chunari & mukut seva",              raised: 38, goal: "₹75,000", theme: 5 }
];

const ORDERS = [
  { id: "AA-10234", date: "12 Jul 2026", items: "Rajwadi Kundan Mukut (M)", total: "₹2,499", status: "Delivered" },
  { id: "AA-10198", date: "28 Jun 2026", items: "Zari Silk Festival Vastra ×2", total: "₹1,798", status: "Delivered" },
  { id: "AA-10307", date: "16 Jul 2026", items: "Complete Hindola Shringar (12″)", total: "₹4,999", status: "In Transit" },
  { id: "AA-10312", date: "19 Jul 2026", items: "Tulsi Kanthi Mala Set", total: "₹349", status: "Processing" }
];

const DONATIONS = [
  { item: "Festival Mukut", temple: "ISKCON Vrindavan", festival: "Janmashtami", date: "10 Jul 2026", status: "Delivered", cert: true },
  { item: "Annakut Vastra ×4", temple: "Swaminarayan Mandir, Ahmedabad", festival: "Annakut", date: "02 Jun 2026", status: "Delivered", cert: true },
  { item: "Complete Shringar Set", temple: "Jagannath Mandir, Puri", festival: "Rath Yatra", date: "18 Jul 2026", status: "In Transit", cert: false }
];

const MY_DEITIES = [
  { name: "Radha Krishna", em: "🪈", height: "12 inch", place: "Home Temple", vastra: "RK-12", mukut: "Medium" },
  { name: "Bal Gopal", em: "🧈", height: "6 inch", place: "Janmashtami Seva", vastra: "BG-06", mukut: "Small" },
  { name: "Shree Swaminarayan", em: "🙏", height: "18 inch", place: "Family Mandir", vastra: "SW-18", mukut: "Large" }
];

