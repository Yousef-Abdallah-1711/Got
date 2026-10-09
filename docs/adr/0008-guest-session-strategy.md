# ADR 0008 — Guest Session Strategy

## Status
PROPOSED.

## Context

Guest checkout is the Phase 2 launch path (PRD §11.5: "Authentication is included in Phase 3 because guest checkout is the Phase 2 launch path; registration is not required to buy."). Guest carts must persist 14 days (PRD P0-F005); guest wishlists persist 30 days (P1-F004); order confirmation for guests uses an "order access key" (PRD §9 Auth design).

## Options

1. **WooCommerce's native guest session mechanism** (its own cookie-based session handler, already built to support exactly this: cart persistence, order access keys for confirmation pages, guest-to-account linking by email at registration).
2. **A custom session layer** built in `got-commerce` on top of raw PHP sessions or a custom cookie.

## Trade-offs

- Option 1 is what WooCommerce already does, correctly, out of the box, with no additional code — exactly the kind of "native solution" constitution Principle 8 asks for.
- Option 2 would duplicate logic WooCommerce already solves (cart cookie, session table, order-access-key generation) for no documented reason, and risks diverging from WooCommerce's own guest/order-ownership security model (order URLs must return HTTP 403 to non-owners — already a solved problem via WooCommerce's order keys).

## Decision

**Option 1.** Use WooCommerce's native guest session and order-access-key mechanism for cart and order-confirmation access. Guest **wishlist** (not a WooCommerce-native concept) uses its own cookie/localStorage mechanism per ADR 0007, independent of the WooCommerce session cookie, since wishlist and cart have different lifetimes (30 days vs. 14 days) and different persistence targets.

## Consequences

- No custom guest-cart code to write or test.
- "Guest orders placed with the same email can be linked to the account after registration" (PRD P1-F001 AC) is satisfied by WooCommerce's own guest-order-to-account linking, triggered on registration with a matching email — not custom-built.
- The two guest mechanisms (WooCommerce session for cart/orders, custom cookie for wishlist) must both be documented in the Privacy Policy's cookie disclosure (feeds into `docs/architecture/deployment.md`'s compliance notes and the eventual Cookie Policy page content).

## Approval status

PROPOSED — technical implementation choice, no owner sign-off required.
