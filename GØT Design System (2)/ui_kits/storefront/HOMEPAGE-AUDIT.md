# GØT Homepage — Gap analysis & implementation report

## Scope reality
The attached `got ecommerce/` folder contains only the four spec documents plus an export of this design system. **There is no WordPress / Sage 10 / Blade / Tailwind / WooCommerce code** to audit or modify, and no logo, product or packaging photography. This work is therefore the **reference design** (hi-fi interactive mock in `ui_kits/storefront/`) that the Sage build should implement. Production build, real WooCommerce data, Lighthouse and axe runs cannot be done here.

## 1. Gap analysis (previous homepage v1)
- **Sections:** only hero, 4-up grid, manifesto split, newsletter, footer. Missing: featured drop, categories, spotlight, packaging, brand story, social, FAQ.
- **Hierarchy:** hero title too small relative to DESIGN.md display scale; every section used the same centred/50-50 rhythm.
- **Responsive:** header forced to desktop layout; product grids fixed at 4 columns → overflow/squash under 1024px; no mobile menu.
- **Discovery:** search button jumped to Shop (no search); no category entry points; no wishlist.
- **Brand:** no place for the sword monogram; hatched/random imagery with no way to drop real assets.
- **States:** no loading state on home grids; no empty handling for unpublished content.

## 2. What changed
- `Home.jsx` + `HomeSections.jsx` + `home.css` — 14 rendered sections, mobile-first, asymmetric editorial layouts:
  1 Announcement · 2 Header (auto breakpoint, mobile menu, search overlay) · 3 Cinematic hero (sword-mark slot, oversized offset type, single CTA) · 4 Featured Drop 01 (outlined "01" numeral, editorial image + 2 products) · 5 Shop by category (auto-derived; hidden if < 2 categories) · 6 New arrivals (snap rail on mobile, 4-up desktop, skeleton loading) · 7 Manifesto (full-width type + approved lines) · 8 Spotlight (working colour/size/add to cart/wishlist) · 9 Packaging (always-dark band, approved captions) · 12 Brand story (facts only) · 13 Social (verified-format handles + 6 post slots) · 14 Early access · 15 FAQ (only accurate answers) · 16 Footer.
- **10 Craftsmanship** and **11 Best sellers** are CMS-ready but hidden (`null` in `home-content.js`). The "Show CMS slots" toggle in the kit bar reveals them labelled as pending.
- `home-content.js` — content model mirroring WP options/ACF; sections render only when content exists.
- **Image slots:** hero, drop editorial, packaging ×3, brand story, social ×6 and two sword-mark positions accept drag-and-drop of real assets (persisted).
- **Reusable component update:** `ProductCard` now supports `wishlisted` / `onWishlist` (44px heart, `aria-pressed`, card restructured so the button isn't nested in the link). Wishlist persists and appears in Account → Wishlist.
- Shop: responsive grid, category deep-links from home/nav, PRD empty-state copy.

## 3. Themes
All sections use semantic tokens; packaging band and hero are intentionally dark in both themes (DESIGN.md §7.1 "intentional dark photographic band"). Theme is set before first paint from `localStorage['got-theme']` → system preference.

## 4. Accessibility notes
Landmarks and `aria-labelledby` on every section; skip link; focus-visible rings on cards, category tiles, social links and menu items; Escape closes menu/search/drawer; search results are announced via `aria-live`; reduced motion zeroes durations.

## 5. Content dependencies (blocking production)
Sword monogram vector · hero/editorial/packaging photography · real Drop 01 product list, prices, sizes, stock · craftsmanship/material copy · return & exchange policy · shipping fees per governorate · confirmed social URLs · launch status.

## 6. Sage mapping
`views/sections/{hero,featured-drop,categories,new-arrivals,manifesto,spotlight,packaging,craft,best-sellers,story,social,early-access,faq}.blade.php`, each guarded by `@if($content)`; products via `wc_get_products(['featured'=>true])`, `['orderby'=>'date']`, `total_sales` (only when > 0); categories via `get_terms('product_cat',['hide_empty'=>true])`.
