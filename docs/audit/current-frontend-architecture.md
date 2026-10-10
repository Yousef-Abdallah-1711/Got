# Current Frontend Architecture (the React prototype, as built)

Status tags: VERIFIED / PROPOSED / BLOCKED / REQUIRES APPROVAL. This document describes what exists in `GØT Design System (2)/` today — **a visual/behavioral reference**, not production code, and not something to be ported 1:1.

## 1. What it actually is

A single-page, no-build, no-router React app loaded directly via `<script>` tags in plain HTML shells (`ui_kits/storefront/index.html`, `coming-soon.html`, `product.html`). **VERIFIED**: there is no `package.json`, no bundler config, no `npm`/Vite build step anywhere in the design system folder — components are global-scope functions attached to `window` (e.g. `window.Checkout = Checkout;`, `window.DirectCheckout = DirectCheckout;`), and a shared namespace `window.GTDesignSystem_f9e073` exposes the component library to consuming screens. This is a design-tool export pattern (consistent with an AI design-system generator), not a conventional React project.

## 2. "Routing"

There is no client-side router. `index.html` implements a **screen switcher** (a bottom-left dev control, per `ui_kits/storefront/README.md`) that conditionally renders one top-level screen component (`Home`, `Shop`, `Product`, `Checkout`, `Account`, `Wishlist`, `Confirmation`, `ThankYou`) based on local state, plus a `go(screenName)` callback threaded through every screen as a prop. **VERIFIED** from every screen's function signature (e.g. `function Confirmation({ order, go })`, `function Shop({ openProduct, ... })`).

## 3. State management

No Redux/Zustand/Context store. Each screen uses local `React.useState`/`React.useRef` only. Cross-screen state (cart, wishlist) is lifted to whatever wraps the screen switcher (not fully visible without reading `index.html`'s wiring in depth, but inferable from props: `Shop`/`Product`/`Wishlist` all accept a `wish(p)` function and `openProduct`/`addToCart` callbacks passed down from a single parent). **PROPOSED** (consistent with prop shapes, not independently confirmed by reading the full `index.html`).

- **Wishlist persistence**: `wishlist-store.js` — a 30-line vanilla-JS module, `window.GOT_WISHLIST`, storing a de-duplicated array of product-ID strings in `localStorage['got-kit-wish']`. No account/server sync. **VERIFIED**.
- **Cart**: no equivalent dedicated store file was found; cart line items are passed as props (`cart = []`) into `Checkout`/`CartDrawer`, implying cart state lives in the screen-switcher parent only, in-memory, not persisted. **PROPOSED** (no cart-persistence file exists; if it existed it would be named analogously to `wishlist-store.js`).
- **Theme**: `theme`/`setTheme` props threaded from the top (e.g. `ComingSoon({ theme, setTheme, go })`), consistent with the documented `localStorage['got-theme']` contract in `readme.md`/`DESIGN.md` §3, but the inline no-flash bootstrap script itself lives in the HTML shells, not reviewed line-by-line here.

## 4. Data layer

**All commerce data is mock, and the mock is self-aware of its own non-authority.** `data.js` defines:

- `window.GOT_PRODUCTS` — a 4-item hardcoded catalog (`Drop 01 Hoodie` ×2 colorways, `Monogram Keychain`, `Circular Tag`), explicitly commented `// SAMPLE DATA — placeholder catalog for the mock`.
- `window.GOT_PROMOS = { source: 'unconfigured', bogo: null, freeShipping: null, lowStock: null }` and `window.GOT_calc` / `window.GOT_BADGES` — **a defensive "commerce verification gate" pattern**: these helpers only surface a promotion/badge/stock claim when `p.commerce.source === 'woocommerce'` and the relevant `active`/`eligible` flags are `true`. In the current mock, every product's `commerce` field is absent, so every gate resolves to "nothing shown" — i.e. **the prototype already encodes the constitution's "never show an unverified commerce claim" rule in its own data layer**, even though no real WooCommerce exists yet. This is a strong, reusable pattern for the production Blade/PHP layer (never render a badge/price/offer without an equivalent server-verified flag).
- `window.GOT_PHOTOS` / `window.GOT_IMG` / `window.GOT_SLOT` — maps semantic image-slot keys to Unsplash photo IDs with required photographer credit overlays (Unsplash License compliance). **No real product photography exists anywhere in the project.**
- `home-content.js` (`window.GOT_HOME`) — a homepage content object explicitly commented "mirrors what WordPress (ACF/options) + WooCommerce would supply," with a documented rule: "a section renders only when its required content exists. `null` = not yet approved → section hidden." Two sections (`craftsmanship`, `bestSellers`) are `null` today and are explicitly flagged in `HOMEPAGE-AUDIT.md` as "CMS-ready but hidden."

This content model is unusually good preparation for an ACF/WooCommerce-backed implementation: it already distinguishes "hardcoded design constant" from "must come from WordPress/WooCommerce and must not render until real."

## 5. Styling architecture

`styles.css` (design-system root) is import-only, pulling in `tokens/{fonts,colors,typography,spacing,effects,base}.css` then `components/components.css`. Storefront screens layer additional page-specific stylesheets (`home.css`, `product.css`) alongside the shared tokens. All colors/spacing/typography are consumed as CSS custom properties (`var(--got-*)`, `var(--font-mono)`, etc.) — **no hardcoded hex/px values were observed in the screen components read for this audit** (confirmed in `Checkout.jsx`, `DirectCheckout.jsx`, `Wishlist.jsx`, `Product.jsx`, `Shop.jsx`, `Promo.jsx`, `Account.jsx`, `ComingSoon.jsx`, `Confirmation.jsx`, `ThankYou.jsx`). This token discipline is a direct asset for `docs/design/dark-light-tokens.md` and the Sage Tailwind-token mapping.

## 6. Component architecture

26 components across 5 categories (`core`, `forms`, `feedback`, `navigation`, `commerce`), each shipped as a `.jsx` implementation + a `.d.ts` prop-contract file + a `.prompt.md` generation brief. Full inventory and prop contracts are in `component-inventory.md`. Components are composed functionally (e.g. `Product.jsx` composes `ColorSelector`, `SizeSelector`, `QuantityStepper`, `Accordion`, `ProductCard`, plus the page-local `OfferBlock`/`ShippingIncentive` from `Promo.jsx`) — there is no deep inheritance or HOC layering, which maps cleanly onto Blade `@include`/component partials.

## 7. Build tooling evidence

`_ds_manifest.json` and `_ds_bundle.js` exist at the design-system root. These are build/export artifacts of the **design-system generation tool itself** (most likely bundling the component previews for its own viewer), not a build pipeline for the storefront screens, which load unbundled via `<script>` tags per `ui_kits/storefront/index.html`. **Treat as supporting evidence only, per project instructions — not parsed as a dependency manifest for the WordPress build.**

## 8. What this means for the Sage/Blade conversion

- No React runtime, router, or state library needs to be reproduced — Blade templates + WooCommerce session/cart state + Alpine.js islands are a faithful, *simpler* replacement for what's actually here (a no-router, lifted-state, global-namespace app), not a downgrade.
- The mock's "commerce verification gate" pattern (`GOT_calc`, `GOT_BADGES`, `OfferBlock`, `ShippingIncentive`) should be re-implemented server-side in PHP/Blade with the same contract: a promotion/badge/stock claim renders only when WooCommerce itself confirms it, never from a client guess. See `docs/architecture/woocommerce-integration.md`.
- The component `.d.ts` files are effectively ready-to-use Blade component prop contracts and should be the starting point for `resources/views/components/*.blade.php` signatures.
