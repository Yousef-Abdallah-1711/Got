# Component Mapping — React Reference → Blade/Alpine/ACF Target

Per ADR 0003 (hybrid translation strategy): stateless components → plain Blade components; stateful components → Blade + scoped Alpine.js; cross-page-persistent state → a small vanilla-JS module (mirroring `wishlist-store.js`'s pattern). None of the 26 components are ported as React. Status: PROPOSED mapping, grounded in the `.d.ts` contracts read in full for `docs/audit/component-inventory.md`.

| Component | Target | Translation style | Visual-parity risk |
|---|---|---|---|
| `Button` | `resources/views/components/button.blade.php` | Static Blade (no state) | Low — pure presentation; verify hover/focus/loading/disabled states render identically. |
| `IconButton` | `components/icon-button.blade.php` | Static Blade | Low — required-label rule must be enforced at the Blade component's prop validation (fail loud if `label` omitted), matching the `.d.ts`'s non-optional `label`. |
| `Icon` | `components/icon.blade.php`, backed by an SVG-sprite Blade directive | Static Blade + build-time SVG sprite generation | Medium — **blocked on the real brand icon sprite** (`docs/audit/missing-assets.md`); ships with the Lucide substitute until then, swappable without template changes if the sprite symbol names are kept identical. |
| `Badge` | `components/badge.blade.php` | Static Blade | Low for rendering; the `offer`/`bogo`/`shipping` tones are visually ready but functionally dormant pending ADR 0009. |
| `Wordmark` | `components/wordmark.blade.php` | Static Blade | High until the real logo vector exists — explicitly a placeholder swap, not a design to preserve long-term. |
| `TextField` | `components/text-field.blade.php` | Static Blade, native browser validation attrs passed through | Low. |
| `Select` | `components/select.blade.php` | Static Blade | Low; governorate options must be dynamically sourced from WooCommerce shipping zones, not hardcoded (see `docs/audit/production-gaps.md`). |
| `Checkbox` | `components/checkbox.blade.php` | Static Blade | Low. |
| `QuantityStepper` | `components/quantity-stepper.blade.php` + Alpine `x-data` | Alpine (clamp logic: `min..min(10,stock)`) | Low — logic is simple and well-specified in the `.d.ts`. |
| `SizeSelector` | `components/size-selector.blade.php` + Alpine | Alpine (selection state, strikethrough for unavailable) | Medium — must re-verify PRD AC "arrow-key keyboard navigation" between radio-style size options. |
| `ColorSelector` | `components/color-selector.blade.php` + Alpine | Alpine | Low. |
| `EarlyAccessForm` | `components/early-access-form.blade.php` + Alpine (loading/success/error) | Alpine for state, real `fetch()` to the `got-commerce` signup endpoint | Medium — must add first-name/WhatsApp optional fields (gap C-07) not in the current `.d.ts`. |
| `Notice` | `components/notice.blade.php` | Static Blade; toast variant gets a small Alpine auto-dismiss/stack behavior | Low. |
| `Modal` | `components/modal.blade.php` + Alpine (`x-trap`-style focus trap, Escape, scrim click) | Alpine | Medium — focus-trap correctness needs a real screen-reader/keyboard QA pass (`docs/testing/test-strategy.md`), not just visual copy. |
| `Skeleton` | `components/skeleton.blade.php` | Static Blade | Low. |
| `Header` | `partials/header.blade.php` (global template part, not a page ACF block) | Alpine for mobile menu/search overlay/compact-on-scroll | Medium — three modes (`store`/`minimal`/`checkout`) must be three deliberate Blade variants per `docs/architecture/wordpress-structure.md`, not one component silently branching on page type. |
| `AnnouncementBar` | `partials/announcement-bar.blade.php` | Alpine (auto-advance, pause-on-hover/focus/Pause-button/reduced-motion, **never announce automatic changes to screen readers** — explicit a11y rule to preserve) | Medium — default `variant="lime"` is directly affected by the Acid Lime decision (C-01); do not hardcode lime without the accent ADR's resolution. |
| `FilterBar` | `components/filter-bar.blade.php` + Alpine | Alpine (tab/sort/filter-panel state, synced to URL query string per PRD AC) | Medium — URL-state sync is a real requirement (PRD P0-F003 AC: "back/forward button works"), not just visual. |
| `Footer` | `partials/footer.blade.php` (global template part) | Static Blade, link columns from WordPress menus (not an ACF repeater) | Low, per the HTML-to-Sage global-template-parts rule already in the constitution. |
| `Accordion` | `components/accordion.blade.php` + Alpine | Alpine | Low. |
| `ThemeToggle` | `partials/theme-toggle.blade.php` + inline no-flash `<script>` in `<head>` | Alpine for the toggle button; a **separate**, non-Alpine inline script for the pre-paint theme read (Alpine itself isn't loaded early enough to prevent flash) | Medium — the no-flash requirement (PRD P0-F002 AC) depends on script placement/timing, not component logic. |
| `ProductCard` | `components/product-card.blade.php` | Static Blade, wishlist heart via a small Alpine/fetch call to the wishlist endpoint | Medium — badge-priority sort logic (`GOT_BADGES`'s rank table) must be reimplemented server-side exactly as specified (max 2 badges, soldout > low > offer/bogo > shipping > limited/new > drop). |
| `Price` | `components/price.blade.php` + a `formatEgp()` Blade/PHP helper | Static Blade | Low — straightforward port of `formatEGP(n)`. |
| `CartLine` | `components/cart-line.blade.php` | Alpine (qty change triggers a cart-update fetch) | Low. |
| `OrderSummary` | `components/order-summary.blade.php` | Static Blade, values always server-computed | Low. |
| `CartDrawer` | `partials/cart-drawer.blade.php` (global template part) + Alpine (open/close, focus trap, scroll lock) | Alpine | Medium — focus-trap/scroll-lock/Escape behavior needs explicit QA, same caveat as `Modal`. |

## Page-local compositions (not reusable components, but worth mapping once)

| Prototype composition | Target |
|---|---|
| `Product.jsx`'s `OfferBlock`/`ShippingIncentive` (from `Promo.jsx`) | `components/offer-block.blade.php` / `components/shipping-incentive.blade.php` — dormant until ADR 0009 resolves, but the Blade shells can be built now with the same "never render unless server-verified" gate. |
| `Product.jsx`'s sticky mobile CTA (`IntersectionObserver`-driven) | A small vanilla-JS/Alpine scroll-visibility directive — simpler implementation acceptable (ADR 0003), behavior must match (hidden while hero/inline-checkout visible). |
| `DirectCheckout.jsx` / `Checkout.jsx` | Both become real Blade+Alpine checkout forms calling the service in `docs/architecture/checkout-flow.md` — **not** components, since each has unique layout, but they reuse `TextField`/`Select`/`Checkbox`/`CartLine`/`OrderSummary`/`Notice` internally exactly as the prototype does. |

## Summary

25 of 26 components have Low–Medium visual-parity risk and no open business-decision blocker. Two cross-cutting items gate full fidelity regardless of per-component effort: the Acid Lime accent decision (affects `Button`'s primary variant, `AnnouncementBar`'s default, focus rings everywhere) and the real logo/icon-sprite assets (affects `Wordmark`/`Icon`). Both are tracked in `docs/audit/source-conflicts.md` and `docs/audit/missing-assets.md`, not re-litigated here.
