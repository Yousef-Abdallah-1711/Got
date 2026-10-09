// Homepage content model — mirrors what WordPress (ACF/options) + WooCommerce would supply.
// RULE: a section renders only when its required content exists. `null` = not yet approved → section hidden.
// Brand lines below use approved copy; commerce and policy details stay conditional until configured.
window.GOT_HOME = {
  announcements: [{ text: 'Not for everyone' }, { text: 'Drop 01 — Coming soon' }, { text: 'Forged to be different' }],
  hero: { eyebrow: 'Drop 01', title: ['Not for', 'everyone'], cta: 'Shop Drop 01' },
  drop: { id: 'Drop 01', title: 'Forged to be different', status: 'Coming soon' }, // approved pre-launch status
  manifesto: ['Forged', 'to be', 'different'],
  manifestoSupport: ['Not for everyone', 'Born to be different', 'More than just a hoodie'],
  spotlightProductId: 'h1', // WooCommerce "featured" flag
  packaging: [
    { id: 'pk-box', caption: 'Welcome to GØT', note: 'Inside lid' },
    { id: 'pk-tag', caption: 'More than just a hoodie', note: 'Circular tag' },
    { id: 'pk-qr', caption: 'Scan to discover more', note: 'QR card' },
  ],
  craftsmanship: null, // needs approved fabric / weight / construction claims
  bestSellers: null,   // needs real WooCommerce sales data — never faked
  story: { facts: [['Est.', '2026'], ['Base', 'Smouha, Alexandria'], ['Category', 'Streetwear'], ['First release', 'Drop 01']] },
  social: [
    { label: 'Instagram', handle: '@got.official1', href: 'https://www.instagram.com/got.official1/' },
    { label: 'TikTok', handle: '@got.offical', href: 'https://www.tiktok.com/@got.offical' },
  ],
  faq: [
    { title: 'How do I pay?', content: 'Available payment methods are confirmed before you submit an order.' },
    { title: 'Where do you deliver?', content: 'Available delivery areas and fees are confirmed for your address before you submit an order.' },
    { title: 'Will you confirm my order?', content: 'Order details are shown after the store accepts your order.' },
    { title: 'Can I exchange an item?', content: null }, // awaiting approved Return & Exchange policy
  ],
};
