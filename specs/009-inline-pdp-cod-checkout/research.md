# Phase 0 Research: Inline Product-Page COD Checkout

## Decision: Mechanism (resolves prior conflict C-02, now owner-approved as mandatory)

**Decision**: A dedicated `got-commerce` REST endpoint wrapping the shared `CheckoutService`, not a Store-API cart-add-then-checkout sequence.
**Rationale**: Directly using the Store API would momentarily mutate the visitor's real cart session — risky if they already have unrelated items in it. A dedicated endpoint that never touches the cart session eliminates that risk entirely while still calling the identical internal validation/creation code as the standard checkout.
**Alternatives considered**: Store API directly (rejected — cart-pollution risk); headless checkout session via native hooks (rejected — higher implementation risk for a single-product shape, unproven benefit over the simpler wrapper).
**Reference**: `docs/adr/0006-inline-checkout-architecture.md`.

## Decision: Shared-service enforcement (corrected 2026-10-09, remediates finding C2-CHECKOUT)

**Decision**: `CheckoutService` (built in Feature 010) is the single class that validates stock, computes shipping, and checks idempotency — **it does not call `wc_create_order()`**. An independent Codex architecture review found that a shared service calling `wc_create_order()` on behalf of Feature 010's Store-API-backed flow bypasses WooCommerce's own native checkout-route order-creation pipeline, which is not WooCommerce's documented extension pattern. Corrected split: Feature 010's order is created by WooCommerce's own native Store API route (extended via hooks that call `CheckoutService`'s validation); this feature's order is created by this feature's own direct `wc_create_order()` call, after calling the same `CheckoutService` validation methods. Both entry points still share 100% of the validation logic — only the order-creation call site differs, for the structural reason given above (this feature has no cart/Store-API session to delegate to; Feature 010 does, and must not bypass it).
**Rationale**: Prevents the two entry points' *validation* logic from silently drifting apart (the original goal), while no longer risking WooCommerce checkout-pipeline bypass for the cart-based flow (the defect this correction fixes).
**Alternatives considered**: Two independent implementations kept "in sync" by discipline alone (rejected — exactly the failure mode ADR 0006 warns against); a shared service that creates orders for both flows (rejected this round — the actual defect found; see `docs/architecture/CHECKOUT-AND-ORDER-LIFECYCLE.md`).

## Decision: Cart-isolation test

**Decision**: An explicit regression test places an inline order while the test buyer has unrelated items already in their cart, then asserts the cart is byte-for-byte unchanged afterward.
**Rationale**: This is the single scenario Option 1 (Store API direct) would have risked; proving it's safe under Option 2 is this feature's most important test.

## Dependencies confirmed from prior planning

`docs/architecture/checkout-flow.md` Flow 2 (sequence diagram already drawn there), `docs/planning/feature-briefs/009-product-page-inline-cod-checkout.md`.
