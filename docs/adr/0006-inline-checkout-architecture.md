# ADR 0006 — Inline PDP Checkout Architecture

## Status
**RESOLVED — approved and mandatory for v1** (owner decision, prior round). **Mechanism corrected 2026-10-09** (remediates finding C2-CHECKOUT, `docs/planning/PRE-IMPLEMENTATION-ARCHITECTURE-REMEDIATION.md`): this ADR's original Option 2 description incorrectly implied the shared service calls `wc_create_order()` for *both* flows. See the corrected Decision section below and `docs/architecture/CHECKOUT-AND-ORDER-LIFECYCLE.md` for the full detail.

## Context

`GOT-Store-PRD.md`'s approved feature table scopes Cash-on-Delivery checkout only as reached "from the cart" (P0-F006). The existing design-system prototype, however, fully builds a second, parallel checkout entry point directly on the product page (`DirectCheckout.jsx`, wired into `Product.jsx`'s "Order now" CTA) — a complete, validated, single-item COD order form. The owner has since approved this as a mandatory v1 feature.

## Options (see `docs/architecture/CHECKOUT-AND-ORDER-LIFECYCLE.md` for the full comparison, superseding the old `checkout-flow.md` Flow 2 reference)

1. **WooCommerce Store API directly from the PDP** (add single item, then immediate checkout call) — rejected: cart-pollution risk.
2. **Custom `got-commerce` endpoint sharing *validation* logic with the standard checkout, but creating its own order directly** (corrected description — see Decision below).
3. **Headless checkout session via native WooCommerce hooks** — rejected: least proven for a single-product, non-cart shape.

## Decision (corrected)

**Option 2, corrected**: implement one internal PHP class (`CheckoutService`) in `got-commerce/src/Checkout/` holding every GØT-specific *validation* rule (address/contact/stock/idempotency) — called by both the standard checkout's Store API hooks and this feature's inline controller, so neither duplicates a validation rule the other has correct. **Order creation itself is not shared**: the standard flow's order is created by WooCommerce's own native Store API checkout route (unmodified); this feature's order is created by this feature's own controller calling `wc_create_order()` directly, since it has no cart/Store-API session to delegate that call to. This correction was necessary because the original wording ("the inline controller... performs the exact same... `wc_create_order()` call as the standard flow") incorrectly implied the standard flow's order creation was itself routed through this shared service — which an independent architecture review found bypasses WooCommerce's native checkout-route processing for the cart-based flow.

## Consequences

- Still exactly one implementation of every validation rule (the original goal, preserved).
- The standard flow's order creation now correctly stays entirely inside WooCommerce's own native Store API processing — no custom order-creation layer inserted in front of it.
- This feature's order creation is a direct, supported `wc_create_order()` call — not a special case, just the one flow that legitimately needs to make that call itself rather than delegating to WooCommerce's Store API route.
- Testing burden unchanged from the original decision: two E2E flows, `docs/testing/commerce-test-matrix.md`'s "inline COD checkout" and "standard COD checkout" rows.

## Approval status

**RESOLVED.** Both the scope (mandatory v1) and the mechanism (corrected per above) are settled.
