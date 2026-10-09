# Production Gaps

Every piece of prototype functionality that is not production-ready, categorized by gap type. This complements `page-inventory.md` (per-page classification) and `interaction-inventory.md` (per-interaction wiring state) by naming the *specific engineering work* each gap implies. Status: VERIFIED against the source files read for this audit.

## Category: No server/business logic exists at all

- **Checkout (both standard and inline)**: both `Checkout.jsx` and `DirectCheckout.jsx` only validate shape/format client-side, then fake success via `setTimeout`. **Gap**: an entire WooCommerce order-creation pipeline is needed — guest session, stock/variation re-validation, shipping-zone lookup, server-computed totals, idempotent order creation, transactional email. See `docs/architecture/checkout-flow.md`.
- **Account auth**: `Account.jsx` has no real authentication; "sign in" only format-validates and then shows a "not connected" notice. **Gap**: full WordPress auth (registration, login, password reset with 60-minute single-use tokens, lockout after 5 failures) per PRD P1-F001.
- **Early-access sign-up**: `EarlyAccessForm` has no real submit handler wired. **Gap**: full double opt-in pipeline — honeypot, rate limiting, confirmation email, 48-hour token expiry, email-tool sync with retry, consent-text/timestamp persistence, per PRD P0-F007.
- **Order tracking/confirmation**: both `Confirmation.jsx` and `ThankYou.jsx` correctly refuse to render fake data, but there is nothing to render *to* — no order persistence, no status-event pipeline, no non-enumerating lookup-by-order-number-and-email endpoint (PRD P1-F002).

## Category: Client-only data that must become server-authoritative

- **Cart totals**: `Checkout.jsx` literally labels its own numbers "Sample subtotal" / "Confirmed by WooCommerce" — the UI already anticipates server authority but nothing computes it yet.
- **Stock/variation availability**: every gate in `Product.jsx`/`Wishlist.jsx`/`data.js` checks for `commerce.source === 'woocommerce'`, which never exists — i.e., the UI is "wired for" server truth but has no server to wire to.
- **Promotion/BOGO/free-shipping state** (`Promo.jsx`): same pattern — UI exists, no backend, and (per `source-conflicts.md` C-03) no confirmed scope either.
- **Shipping zone list and fees**: hardcoded 4-option governorate list in `Checkout.jsx`/`DirectCheckout.jsx` (`Alexandria`, `Cairo`, `Giza`, `Other`) with no fee values at all — must become real WooCommerce shipping zones (PRD P0-F006 pre-condition).

## Category: Pages/templates missing entirely (see `page-inventory.md` for full list)

Dedicated Cart page, Product category as its own template/URL, Drop/collection page, Search, About, Contact, standalone FAQ page, Shipping/Returns/Privacy/Terms/Cookie policy pages, 404, standalone `/early-access/` page distinct from the Coming Soon hero.

## Category: Accessibility/engineering patterns present but not independently verified end-to-end

- Reduced-motion handling is correctly implemented in `Product.jsx` (`matchMedia('(prefers-reduced-motion: reduce)')`), but was only confirmed in that one file — not verified across every screen in this pass.
- Focus-trap/Escape/restore-focus behavior is documented in `Modal.d.ts`/`CartDrawer.d.ts` contracts but the actual trap implementation (inside the `.jsx` bodies) was not read line-by-line for every component in this audit.
- Screen-reader announcement behavior for the `AnnouncementBar`'s auto-rotation (`.d.ts` explicitly states "Never announces automatic changes to screen readers") needs a real audit with an actual screen reader once implemented in Blade/Alpine — a doc comment is not proof of correct `aria-live` suppression.

## Category: Security patterns that exist only as comments/notices, not enforcement

- `DirectCheckout.jsx`'s submit-lock (`lock.current`) is **client-side only** — it prevents a double-click in the same browser tab but provides zero real duplicate-order protection. Production needs a server-side idempotency key or the PRD's specified 60-second-window same-cart-returns-existing-order rule (P0-F006 A4).
- No CSRF/nonce equivalent exists anywhere in the prototype (expected — it's a static mock), but this means **none** of the validation patterns shown can be trusted as-is; they are UX references only, not security references.

## Category: Content model readiness (a positive gap — less work than typical)

- `home-content.js`'s `GOT_HOME` object and its "render only if content exists" rule is **already a correct ACF-readiness pattern** — converting it to real ACF field groups is comparatively low-risk/low-effort engineering work, not a redesign.
- The 25 components' `.d.ts` contracts are close to ready-to-use as Blade component prop signatures — this significantly reduces the component-mapping effort compared to a typical from-scratch Figma-to-code conversion.

## Priority ordering (informs `docs/planning/master-roadmap.md`)

1. **Blocking, brand-owner-owned** (no amount of engineering fixes these): Drop 01 product data, real photography, logo vector, legal policy text, launch date, shipping fees. See `missing-assets.md`.
2. **Blocking, decision-owned** (owner must decide, then engineering proceeds): Acid Lime vs. silver accent (C-01), inline PDP checkout scope (C-02), BOGO scope (C-03), wishlist guest-gate behavior (C-06).
3. **Pure engineering gaps, no decision needed**: all WooCommerce/WordPress backend wiring, all missing pages/templates, all server-side validation/idempotency, early-access form's missing optional fields (C-07).
