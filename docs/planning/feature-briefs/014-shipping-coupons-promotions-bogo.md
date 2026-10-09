**Status: PROPOSED feature brief — not yet run through full Spec Kit specify/plan/tasks workflow. Run `/speckit.specify` when this feature is scheduled to start. The BOGO sub-scope is additionally BLOCKED on ADR 0009/C-03 approval.**

**Superseded for implementation purposes by `specs/014-shipping-promotions-bogo/spec.md`, `plan.md`, and `tasks.md`** (generated via the real Spec Kit workflow). This brief is kept as the original planning rationale and is not updated further; treat the Spec Kit artifacts as authoritative for scope, acceptance criteria, and tasks.

# 014 — Shipping, Coupons, Promotions, BOGO

## Summary
Two distinct scope tiers under one roadmap feature: (a) shipping zones + native WooCommerce coupons — firmly in PRD P0/P1 scope, and (b) BOGO — not in the PRD at all, gated on owner approval.

## Scope
**In (P0/P1, unconditional)**: WooCommerce shipping zones for Alexandria / Cairo+Giza / Other governorates with brand-approved flat fees (pending `docs/audit/missing-assets.md`); native coupon support (percent/fixed-cart/fixed-product, usage limits, expiry, minimum spend) surfaced in the cart UI.
**In (conditional on ADR 0009 approval)**: BOGO eligibility engine (`got-commerce/src/Promotions/`), `OfferBlock`/`ShippingIncentive` wiring on PDP/cart/checkout, free-shipping-threshold progress bar (P2-F003, can ship alongside BOGO using the same eligibility-calculation module per ADR 0009).
**Out**: payment-gateway-based promotions (v2, out of scope entirely).

## Dependencies
Hard: 010 (shipping zones are really part of checkout's Definition of Done). Conditional: ADR 0009 for the BOGO/free-shipping sub-scope.

## Acceptance Criteria
(Shipping/coupons, implied by PRD P0-F005/P0-F006) Correct shipping fee applied per governorate; invalid/expired coupon rejected with the exact PRD-specified message, cart otherwise unchanged; governorate not covered disables Place Order with the exact PRD-specified message.
(BOGO, if approved — not in PRD, defined by the owner's eventual sign-off) Eligible products/variations, required quantity, discount calculation, coupon-stacking rules, refund behavior, stock impact, expiration, and PDP/cart/checkout messaging — all server-verified, never a client-side-only badge.

## Risk Register
- BOGO scope is explicitly unbudgeted in the PRD's 8-week phase plan — if approved, timeline must be re-estimated, not silently absorbed (see ADR 0009's consequences section).
- Shipping fees are a blocking content gap (`docs/audit/missing-assets.md`) — engineering can configure zones with placeholder fees but cannot sign off this feature as done until real fees are supplied.

## Testing Requirements
E2E: shipping-fee-by-governorate matrix, coupon valid/invalid/expired paths; if BOGO approved, the full BOGO eligibility/stacking/refund test matrix from the original project brief's promotion requirements.

## Visual Parity Requirements
Shipping/coupon UI: part of Cart/Checkout parity (010). BOGO UI (if approved): full parity against `Promo.jsx`'s `OfferBlock`/`ShippingIncentive`.

## Definition of Done
Shipping/coupon AC pass unconditionally; BOGO AC pass only if ADR 0009 was approved — if not approved, this feature's Definition of Done excludes BOGO entirely and is **not** considered incomplete for lacking it.
