# Component Mapping — React Reference → Blade/Alpine/ACF Target

Per ADR 0003 (hybrid translation strategy): stateless components → plain Blade components; stateful components → Blade + scoped Alpine.js; cross-page-persistent state → a small vanilla-JS module (mirroring `wishlist-store.js`'s pattern). None of the 26 components are ported as React. Status: PROPOSED mapping, grounded in the `.d.ts` contracts read in full for `docs/audit/component-inventory.md`.

| Component | Owning feature | Target | Translation style | Visual-parity risk |
|---|---|---|---|
| `Button` | Feature 003 | `resources/views/components/button.blade.php` | Static Blade (no state) | Low — pure presentation; verify hover/focus/loading/disabled states render identically. |
| `IconButton` | Feature 003 | `components/icon-button.blade.php` | Static Blade | Low — required-label rule must be enforced at the Blade component's prop validation (fail loud if `label` omitted), matching the `.d.ts`'s non-optional `label`. |
| `Icon` | Feature 003 | `components/icon.blade.php`, backed by an SVG-sprite Blade directive | Static Blade + build-time SVG sprite generation | Medium — **blocked on the real brand icon sprite** (`docs/audit/missing-assets.md`); ships with the Lucide substitute until then, swappable without template changes if the sprite symbol names are kept identical. |
| `Badge` | Feature 007 | `components/badge.blade.php` | Static Blade | Low for rendering; the `offer`/`bogo`/`shipping` tones are visually ready but functionally dormant pending ADR 0009. |
| `Wordmark` | Feature 003 | `components/wordmark.blade.php` | Static Blade image component | Low for current rendering: uses the optimized WebP derived from the supplied transparent sword/wordmark PNG; editable vector master remains a content/design dependency. |
| `TextField` | Feature 005 | `components/text-field.blade.php` | Static Blade, native browser validation attrs passed through | Low. |
| `Select` | Feature 007 | `components/select.blade.php` | Static Blade | Low; governorate options must be dynamically sourced from WooCommerce shipping zones, not hardcoded (see `docs/audit/production-gaps.md`). |
| `Checkbox` | Feature 005 | `components/checkbox.blade.php` | Static Blade | Low. |
| `QuantityStepper` | Feature 008 | `components/quantity-stepper.blade.php` + Alpine `x-data` | Alpine (clamp logic: `min..min(10,stock)`) | Low — logic is simple and well-specified in the `.d.ts`. |
| `SizeSelector` | Feature 008 | `components/size-selector.blade.php` + Alpine | Alpine (selection state, strikethrough for unavailable) | Medium — must re-verify PRD AC "arrow-key keyboard navigation" between radio-style size options. |
| `ColorSelector` | Feature 008 | `components/color-selector.blade.php` + Alpine | Alpine | Low. |
| `EarlyAccessForm` | Feature 005 | `components/early-access-form.blade.php` + Alpine (loading/success/error) | Alpine for state, real `fetch()` to the `got-commerce` signup endpoint | Medium — must add first-name/WhatsApp optional fields (gap C-07) not in the current `.d.ts`. |
| `Notice` | Feature 005 | `components/notice.blade.php` | Static Blade; toast variant gets a small Alpine auto-dismiss/stack behavior | Low. |
| `Modal` | Feature 007 | `components/modal.blade.php` + Alpine (`x-trap`-style focus trap, Escape, scrim click) | Alpine | Medium — focus-trap correctness needs a real screen-reader/keyboard QA pass (`docs/testing/test-strategy.md`), not just visual copy. |
| `Skeleton` | Feature 007 | `components/skeleton.blade.php` | Static Blade | Low. |
| `Header` | Feature 003 | `partials/header.blade.php` (global template part, not a page ACF block) | Alpine for mobile menu/search overlay/compact-on-scroll | Medium — three modes (`store`/`minimal`/`checkout`) must be three deliberate Blade variants per `docs/architecture/wordpress-structure.md`, not one component silently branching on page type. |
| `AnnouncementBar` | Feature 003 | `partials/announcement-bar.blade.php` | Alpine (auto-advance, pause-on-hover/focus/Pause-button/reduced-motion, **never announce automatic changes to screen readers** — explicit a11y rule to preserve) | Medium — use the approved semantic accent token recorded in C-01; preserve the pause and reduced-motion behavior. |
| `FilterBar` | Feature 007 | `components/filter-bar.blade.php` + Alpine | Alpine (tab/sort/filter-panel state, synced to URL query string per PRD AC) | Medium — URL-state sync is a real requirement (PRD P0-F003 AC: "back/forward button works"), not just visual. |
| `Footer` | Feature 003 | `partials/footer.blade.php` (global template part) | Static Blade, link columns from WordPress menus (not an ACF repeater) | Low, per the HTML-to-Sage global-template-parts rule already in the constitution. |
| `Accordion` | Feature 004 | `components/accordion.blade.php` + Alpine | Alpine | Low. |
| `ThemeToggle` | Feature 003 | `partials/theme-toggle.blade.php` + inline no-flash `<script>` in `<head>` | Alpine for the toggle button; a **separate**, non-Alpine inline script for the pre-paint theme read (Alpine itself isn't loaded early enough to prevent flash) | Medium — the no-flash requirement (PRD P0-F002 AC) depends on script placement/timing, not component logic. |
| `ProductCard` | Feature 007 | `components/product-card.blade.php` | Static Blade, wishlist heart via a small Alpine/fetch call to the wishlist endpoint | Medium — badge-priority sort logic (`GOT_BADGES`'s rank table) must be reimplemented server-side exactly as specified (max 2 badges, soldout > low > offer/bogo > shipping > limited/new > drop). |
| `Price` | Feature 007 | `components/price.blade.php` + a `formatEgp()` Blade/PHP helper | Static Blade | Low — straightforward port of `formatEGP(n)`. |
| `CartLine` | Feature 010 | `components/cart-line.blade.php` | Alpine (qty change triggers a cart-update fetch) | Low. |
| `OrderSummary` | Feature 010 | `components/order-summary.blade.php` | Static Blade, values always server-computed | Low. |
| `CartDrawer` | Feature 010 | `partials/cart-drawer.blade.php` (global template part; Feature 003 builds the empty shell, Feature 010 owns cart wiring) + Alpine (open/close, focus trap, scroll lock) | Alpine | Medium — focus-trap/scroll-lock/Escape behavior needs explicit QA, same caveat as `Modal`. |

## Page-local compositions (not reusable components, but worth mapping once)

| Prototype composition | Owning feature | Target |
|---|---|---|
| `Product.jsx`'s `OfferBlock`/`ShippingIncentive` (from `Promo.jsx`) | Feature 014 | `components/offer-block.blade.php` / `components/shipping-incentive.blade.php` — dormant until ADR 0009 resolves; never render unless server-verified and approved for scope. |
| `Product.jsx`'s sticky mobile CTA (`IntersectionObserver`-driven) | Feature 008 | A small vanilla-JS/Alpine scroll-visibility directive — simpler implementation acceptable (ADR 0003), behavior must match (hidden while hero/inline-checkout visible). |
| `DirectCheckout.jsx` | Feature 009 | A real Blade+Alpine inline COD checkout form calling the service in `docs/architecture/checkout-flow.md`, gated on ADR 0006 approval; reuse `TextField`/`Select`/`Checkbox`/`Notice`. |
| `Checkout.jsx` | Feature 010 | A real Blade+Alpine standard checkout form calling the service in `docs/architecture/checkout-flow.md`; reuse `TextField`/`Select`/`Checkbox`/`CartLine`/`OrderSummary`/`Notice`. |

## Summary

25 of 26 components have Low–Medium visual-parity risk and no open business-decision blocker. The Acid Lime accent is owner-approved (C-01); use its semantic token for affected controls. The supplied raster logo is used by `Wordmark`; the editable vector master and real icon sprite remain tracked in `docs/audit/missing-assets.md`. Other unresolved scope and content decisions remain OPEN in `docs/audit/source-conflicts.md` and must be respected by the features that touch them.
