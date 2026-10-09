**Status: PROPOSED feature brief — not yet run through full Spec Kit specify/plan/tasks workflow. Run `/speckit.specify` when this feature is scheduled to start.**

**Superseded for implementation purposes by `specs/010-cart-standard-checkout/spec.md`, `plan.md`, and `tasks.md`** (generated via the real Spec Kit workflow). This brief is kept as the original planning rationale and is not updated further; treat the Spec Kit artifacts as authoritative for scope, acceptance criteria, and tasks.

# 010 — Cart and Standard WooCommerce Checkout

## Summary
Implements PRD **P0-F005** (Shopping Cart) and **P0-F006** (Checkout with Cash on Delivery) in full — the single most business-critical feature in the v1 launch set. Builds the one authoritative checkout business-rule service that 009 (if approved) will also call.

## Scope
**In**: `CartDrawer` wired to real WooCommerce session/Store API; dedicated `/cart/` page (new, no prototype reference — "extension requiring review" per `docs/design/page-mapping.md`); `/checkout/` page (`Checkout.jsx` port); shipping-zone configuration (Alexandria/Cairo+Giza/Other, per PRD, fees pending brand input); COD payment method; idempotent order creation; order-confirmation redirect; confirmation email dispatch (shared with 013).
**Out**: order tracking page (013), account order history (011) — this feature ends at order confirmation.

## Dependencies
Hard: 008. Soft: ADR 0005 (Store API mechanism), ADR 0008 (guest session).

## Acceptance Criteria
(Verbatim, PRD P0-F005) Cart totals match sum of line totals + shipping + discounts to EGP 0.01; quantity update <500ms, no full reload; guest cart survives 14 days; post-login merge produces no duplicate variation lines; coupon response <1s; checkout blocked while any line is sold-out/over-stock.
(Verbatim, PRD P0-F006) All fields validated inline on blur + submit; Egyptian mobile formats accepted; confirmation renders <2s on 4G; stock reduced exactly once; repeated submission returns existing order, not a duplicate; confirmation email within 2 minutes in 99% of cases; no payment secret anywhere in page source/storage/network; checkout completes in ≤4 steps on 390px viewport.

## Risk Register
- R-003 (overselling on drop day) — stock reduced at order creation is this feature's job to get exactly right; PRD's documented mitigation (manual review above a threshold, documented queue plan) needs an explicit owner-approved threshold value before Phase 4.
- R-007 (COD fraud/non-delivery) — phone verification at checkout is this feature's scope; OTP (if ever added) is explicitly v2.
- Shipping fees are currently missing (`docs/audit/missing-assets.md`) — blocks final sign-off, not initial build (zones can be configured with placeholder fees and corrected later).

## Testing Requirements
Full order-lifecycle E2E suite per `docs/testing/commerce-test-matrix.md`: guest purchase, variation selection, out-of-stock prevention, coupon application, duplicate-order prevention, order confirmation, order email delivery. Security: idempotency-key test (rapid double-submit), no secrets in network tab.

## Visual Parity Requirements
Cart page: design-extension review (no dedicated prototype page exists). Checkout page: full parity against `Checkout.jsx`. Cart drawer: full parity against `CartDrawer` component contract.

## Definition of Done
All PRD P0-F005/P0-F006 AC pass; a real test order completes end to end on staging for each shipping zone (PRD Phase 2 validation step); stock-reduction-exactly-once verified under concurrent/duplicate-submission test conditions.
