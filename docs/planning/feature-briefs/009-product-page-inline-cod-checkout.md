**Status: PROPOSED feature brief — not yet run through full Spec Kit specify/plan/tasks workflow. Run `/speckit.specify` when this feature is scheduled to start. BLOCKED on scope approval (C-02/ADR 0006) — do not begin any implementation task below until the owner confirms this feature is in scope.**

**Superseded for implementation purposes by `specs/009-inline-pdp-cod-checkout/spec.md`, `plan.md`, and `tasks.md`** (generated via the real Spec Kit workflow). This brief is kept as the original planning rationale and is not updated further; treat the Spec Kit artifacts as authoritative for scope, acceptance criteria, and tasks.

# 009 — Product-Page Inline COD Checkout

## Summary
A faithful Blade/Alpine port of `DirectCheckout.jsx`: a complete Cash-on-Delivery order form embedded directly on the product detail page, letting a customer place an order without navigating to `/checkout/`. Uses the identical server-side business-rule service as the standard checkout (010) — see ADR 0006.

## Scope
**In** (if approved): inline form markup (Contact/Delivery/Payment sections, matching `DirectCheckout.jsx`'s layout), the thin `got-commerce` REST controller wrapping the shared checkout service (ADR 0006 Option 2), "Order now" CTA wiring from the PDP (008), shared order-confirmation redirect with the standard flow (013).
**Out**: any independent order-creation logic — there is exactly one checkout service, shared with 010; this feature contributes only a second entry point and its UI.

## Dependencies
Hard: 008, 010, **ADR 0006 approval**.

## Acceptance Criteria
Identical business-rule AC to PRD P0-F006 (`docs/planning/feature-briefs/010-cart-standard-checkout.md`), since both flows share one service: Egyptian phone/email validation, governorate/shipping validation, idempotent order creation, stock reduced exactly once, confirmation email sent, no success state before persistence confirmed. PDP-specific: "Order now" scrolls to and focuses the inline form; sold-out/unavailable variations disable the inline form entirely (matching `DirectCheckout.jsx`'s `soldOut` prop).

## Risk Register
- Building this before ADR 0006 is approved wastes engineering time on a potentially-unwanted feature — explicit blocker, not merely a suggestion.
- Doubling the checkout UI surface doubles the E2E test burden (tracked explicitly in `docs/testing/commerce-test-matrix.md` as two separate P0 rows if approved).
- Risk of accidentally diverging the two flows' validation logic over time if engineers aren't disciplined about the shared-service boundary (ADR 0006's core warning).

## Testing Requirements
Full duplicate of the standard-checkout E2E suite (010), PDP entry point, plus a specific regression test asserting both flows produce byte-identical order totals/validation behavior for the same inputs (guards against logic drift between the two entry points).

## Visual Parity Requirements
Full — against `DirectCheckout.jsx` directly.

## Definition of Done
Only applicable if approved: all AC above pass; the shared-service regression test (above) passes; no code duplication between this feature's controller and 010's controller beyond the thin request-mapping layer.
