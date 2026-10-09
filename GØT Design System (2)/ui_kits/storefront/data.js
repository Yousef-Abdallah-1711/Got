// SAMPLE DATA — placeholder catalog for the mock. Names/prices are not approved; real Drop 01 list is TBD by brand owner.
// PLACEHOLDER PHOTOGRAPHY — free Unsplash photos (Unsplash License), desaturated via sat=-100. NOT GØT products. Replace with real merchandise shots.
window.GOT_PHOTOS = {
  hero:   ['1513789181297-6f2ec112c0bc', 'JC Gellidon', 'jcgellidon'],
  drop:   ['1677538537484-324385aff147', 'Mohamed youssry', 'youssry99'],
  h1:     ['1647797819874-f51a8a8fc5c0', 'MEHRAX', 'mehrax'],
  h1b:    ['1615320876716-0fc796a5010f', 'Mihajlo Šebalj', 'photo_diary'],
  h2:     ['1732475530155-90158f3b5f79', 'David Banjo', 'davidbvnjo'],
  h2b:    ['1732475530118-0db47f851736', 'David Banjo', 'davidbvnjo'],
  a1:     ['1630853010132-68f3aea24257', 'Tommy Diner', 'tomydiner'],
  a1b:    ['1590156351885-f73330202730', 'Laura Chouette', 'laurachouette'],
  a2:     ['1631477076114-9123f721b9dc', 'Milad Fakurian', 'fakurian'],
  a2b:    ['1669351004430-8a5c1455e45f', 'Aakash Dhage', 'aakashdhage'],
  box:    ['1630853010132-68f3aea24257', 'Tommy Diner', 'tomydiner'],
  tag:    ['1590156351885-f73330202730', 'Laura Chouette', 'laurachouette'],
  qr:     ['1771848194108-b86156b6ca72', 'Egor Komarov', 'egorkomarov'],
  story:  ['1673092147872-5ddb03194341', 'Rafay Ansari', 'rafayyansari'],
  pack:   ['1752679813117-49fdab167868', 'Atul', 'atulr'],
  post1:  ['1610582144787-eda2e6f293b4', 'Axel Antas-Bergkvist', 'aabergkvist'],
  post2:  ['1614214191247-5b2d3a734f1b', 'Sonny Mauricio', 'northernstatemedia'],
  post3:  ['1622567893612-a5345baa5c9a', 'whereslugo', 'whereslugo'],
  post4:  ['1639379789831-bbd53e09408d', 'syed fahad', 'stfufahad'],
  post5:  ['1512400930990-e0bc0bd809df', 'Timothy Rose', 'timothywilliamrose'],
  post6:  ['1680292783974-a9a336c10366', 'Chris Lynch', 'chris_lynch_'],
};
const GOT_ALIAS = { 'drop-ed': 'drop', 'pk-box': 'box', 'pk-tag': 'tag', 'pk-qr': 'qr' };
const GOT_POOL = { h1: ['h1', 'h1b', 'hero', 'drop'], h2: ['h2', 'h2b', 'story', 'post4'], a1: ['a1', 'a1b', 'box', 'qr'], a2: ['a2', 'a2b', 'pack', 'tag'] };
window.GOT_PHOTO_KEY = s => {
  if (window.GOT_PHOTOS[s]) return s;
  if (GOT_ALIAS[s]) return GOT_ALIAS[s];
  const pool = GOT_POOL[String(s).slice(0, 2)] || Object.keys(window.GOT_PHOTOS);
  const n = parseInt(String(s).slice(-1), 10);
  let h = 0; for (const c of String(s)) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return pool[(isNaN(n) ? h : n) % pool.length];
};
window.GOT_IMG = (s, w, h) => 'https://images.unsplash.com/photo-' + window.GOT_PHOTOS[window.GOT_PHOTO_KEY(s)][0] + '?auto=format&fit=crop&crop=entropy&sat=-100&q=70&w=' + w + '&h=' + h;
// spread onto <image-slot> — Unsplash srcs require credit
window.GOT_SLOT = (s, w, h) => { const p = window.GOT_PHOTOS[window.GOT_PHOTO_KEY(s)]; return { src: window.GOT_IMG(s, w, h), credit: 'Photo by ' + p[1] + ' on Unsplash', 'credit-href': 'https://unsplash.com/@' + p[2] }; };
window.GOT_PRODUCTS = [
  { id: 'h1', image: window.GOT_IMG('h1', 800, 1000), altImage: window.GOT_IMG('h1b', 800, 1000), name: 'Drop 01 Hoodie', meta: 'Black', price: 1450, cat: 'Hoodies', colors: [{ name: 'Black', hex: '#0B0B0B' }, { name: 'Steel', hex: '#777777' }], sizes: [{ label: 'S' }, { label: 'M' }, { label: 'L' }, { label: 'XL' }, { label: 'XXL' }] },
  { id: 'h2', image: window.GOT_IMG('h2', 800, 1000), altImage: window.GOT_IMG('h2b', 800, 1000), name: 'Drop 01 Hoodie', meta: 'Steel', price: 1450, cat: 'Hoodies', colors: [{ name: 'Steel', hex: '#777777' }, { name: 'Black', hex: '#0B0B0B' }], sizes: [{ label: 'S' }, { label: 'M' }, { label: 'L' }, { label: 'XL' }] },
  { id: 'a1', image: window.GOT_IMG('a1', 800, 1000), altImage: window.GOT_IMG('a1b', 800, 1000), name: 'Monogram Keychain', meta: 'Antique silver', price: 250, cat: 'Accessories', colors: [{ name: 'Antique silver', hex: '#9C9B97' }], sizes: [{ label: 'One size' }] },
  { id: 'a2', image: window.GOT_IMG('a2', 800, 1000), altImage: window.GOT_IMG('a2b', 800, 1000), name: 'Circular Tag', meta: 'Black / silver ring', price: 150, cat: 'Accessories', colors: [{ name: 'Black', hex: '#0B0B0B' }], sizes: [{ label: 'One size' }] },
];

// No promotion, shipping threshold, or live inventory configuration was supplied.
// The production adapter must pass WooCommerce-verified state; this preview never
// calculates a discount or presents sample availability as a live claim.
window.GOT_PROMOS = { source: 'unconfigured', bogo: null, freeShipping: null, lowStock: null };
window.GOT_calc = p => {
  const result = p && p.commerce && p.commerce.promotion;
  if (!result || result.source !== 'woocommerce' || result.active !== true || result.eligible !== true) {
    return { bogo: false, discount: 0, verified: false };
  }
  return {
    bogo: result.type === 'bogo',
    discount: Number.isFinite(result.discount) ? result.discount : 0,
    verified: true,
  };
};
window.GOT_BADGES = p => {
  const commerce = p && p.commerce;
  if (!commerce || commerce.source !== 'woocommerce' || !Array.isArray(commerce.badges)) return [];
  const rank = { soldout: 0, low: 1, offer: 2, bogo: 2, shipping: 3, limited: 4, new: 4, drop: 5 };
  const allowed = Object.keys(rank);
  return commerce.badges
    .filter(b => b && allowed.includes(b.tone) && typeof b.label === 'string')
    .sort((a, b) => rank[a.tone] - rank[b.tone])
    .slice(0, 2);
};
window.GOT_PRODUCTS.forEach(p => {
  p.inventoryVerified = false;
  p.soldOut = false;
  p.badge = null;
  p.sizes = p.sizes.map(s => ({ label: s.label }));
  p.badges = window.GOT_BADGES(p);
});
