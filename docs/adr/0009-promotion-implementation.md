# ADR 0009 — Promotion Implementation (incl. BOGO)

## Status
**RESOLVED — approved and mandatory for v1** (owner decision, prior round). **Mechanism corrected 2026-10-09** (remediates finding C3-PROMO): Option 2 below originally specified `woocommerce_cart_calculate_fees` as the BOGO hook; corrected to a real cart/order line item instead, since a fee cannot satisfy this feature's own stock-reduction requirement. See `docs/architecture/PROMOTIONS-AND-PRICING.md`.

## Context

`GOT-Store-PRD.md`/`PRODUCT.md` do not scope BOGO at all; the closest in-scope promotion mechanism is native WooCommerce coupons (percent/fixed-cart/fixed-product — already fully native, no ADR needed) and P2-F003 "Free Shipping Progress Bar" (Could Have, post-launch). The design system, however, already ships a complete, server-verification-gated BOGO/offer UI (`Badge` tones `offer`/`bogo`, `Promo.jsx`'s `OfferBlock`/`ShippingIncentive`, `data.js`'s `GOT_calc`/`GOT_BADGES`), suggesting BOGO was anticipated as a real feature by whoever built the design system, even though it never made it into the PRD's feature table.

## Options (if BOGO is approved)

1. **Native WooCommerce coupons configured as a "buy X get Y free" style discount** — WooCommerce core coupon types (percent/fixed) do not directly express "buy one get one free" as a single coupon type; this typically requires either a free-shipping-style workaround (not equivalent) or a small custom cart-logic extension.
2. **A small custom `got-commerce` promotions module**: eligibility rules (which products/variations, required quantity) configured by the shop operator via a simple admin screen, calculated server-side and realized as a real zero-priced cart/order line item (not a fee — see Decision below), surfaced to the frontend via the same `commerce.promotion`/`commerce.promotionState` shape the prototype's `Promo.jsx` already expects.
3. **A third-party WooCommerce promotions/BOGO plugin** — fastest to ship, but a third-party dependency (Principle 9) plus an unbudgeted plugin-slot cost (PRD's 15-plugin cap) and a new HPOS-compatibility check to perform.

## Trade-offs

- Native WooCommerce coupons (Option 1) genuinely cannot express BOGO cleanly — this isn't a "just configure it" situation, which is exactly why the PRD never scoped it as free.
- Option 2 costs real, unbudgeted engineering time (eligible products, quantity rules, discount calculation, coupon-stacking rules, refund behavior, expiration, cart/checkout/PDP messaging — all enumerated in the original project brief's BOGO requirements) that does not currently exist in GOT-Store-PRD.md's 8-week phase plan.
- Option 3 is fastest but adds a dependency and a compatibility risk for a feature not yet confirmed as wanted.

## Decision

**Option 2 (small custom module), corrected mechanism**: because it integrates with the already-designed `commerce.promotion`/`commerce.promotionState` contract the prototype's `Promo.jsx` expects, keeps promotion logic inside the constitution's theme/plugin boundary, and avoids an unbudgeted third-party dependency. **The discount is realized as a real, zero-priced cart/order line item** (added via `WC()->cart->add_to_cart()`, price zeroed via `woocommerce_before_calculate_totals`), not a cart fee — the original fee-based wording here could not satisfy Feature 014's own stock-reduction requirement (FR-009) and has been corrected. See `docs/architecture/PROMOTIONS-AND-PRICING.md` for the full mechanism.

## Consequences

- Real scope added to Feature 014 beyond the PRD's original phase plan — already reflected in that feature's own task list.
- Free-shipping-threshold (now also mandatory, not Could-Have) shares the same eligibility-calculation module (`ShippingIncentive`'s contract already expects a generic `remaining`/`progressPercent`/`eligibilityText` shape).
- The line-item correction means BOGO refunds and stock restoration come free from WooCommerce's native order-item refund logic — a fee could never have participated in that correctly.

## Approval status

**RESOLVED.**
