# Phase 0 Research: Cart and Standard Checkout

## Decision: Checkout mechanism (ADR 0005)

**Decision**: WooCommerce Store API (`/wc/store/v1/cart/*`, `/wc/store/v1/checkout`) drives a fully custom Blade-rendered checkout UI.
**Rationale**: Matches PRD §11.3's documented technical direction; gives full design control needed for 100% visual parity with the reference checkout layout, while still using WooCommerce's own validated cart/order logic underneath.
**Alternatives considered**: Native checkout shortcode reskinned (rejected — fighting default WooCommerce templates costs more than building fresh Blade views against the Store API); fully custom order-creation bypassing WooCommerce entirely (rejected outright — violates HPOS/native-solution principles).

## Decision: Idempotency mechanism

**Decision**: A client-generated UUID (`idempotency_key`) sent with every checkout submission, checked against a short-lived server-side record (60-second window per PRD) before creating a new order; a repeat within the window returns the original order.
**Rationale**: A purely client-side disabled-button approach (as in the prototype) provides zero real protection against network retries, double-tabs, or deliberate abuse; server-side idempotency is the only real guarantee.
**Alternatives considered**: Relying on WooCommerce's own session-based duplicate-order prevention alone (insufficient — doesn't cover the "resubmit within 60s with a slightly different request shape" case as precisely as an explicit key).

## Decision: Guest session

**Decision**: WooCommerce's native guest session + order-access-key mechanism (ADR 0008) — no custom session layer.
**Rationale**: Already solves cart persistence (14 days), order-confirmation-page access control, and guest-to-account linking correctly; reimplementing any of this would be pure risk for no benefit.

## Decision: Shipping zone seeding

**Decision**: Three zones (Alexandria; Cairo+Giza; Other governorates) are seeded idempotently on plugin activation (create-if-not-exists), with fee values left as an obvious `[TBD — confirm with brand]` placeholder in the admin until the real fees are supplied.
**Rationale**: Lets engineering build and test the full checkout flow without being blocked on the brand-owner content gap (`docs/audit/missing-assets.md`), while making it impossible to accidentally ship a silently-wrong fee (the placeholder is visibly obvious in the admin, not a plausible-looking wrong number).

## Dependencies confirmed from prior planning

`docs/architecture/checkout-flow.md` Flow 1 (full sequence diagram), `docs/architecture/woocommerce-integration.md` (entity usage table).
