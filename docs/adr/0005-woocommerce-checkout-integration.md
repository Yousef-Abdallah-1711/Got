# ADR 0005 — WooCommerce Checkout Integration (Standard Checkout)

## Status
**RESOLVED.** This ADR's own Decision text (line 24, `woocommerce_store_api_checkout_update_order_from_request`) was correct from the start; the drift happened later, in `specs/010`'s own implementation detail, which this round's `docs/architecture/CHECKOUT-AND-ORDER-LIFECYCLE.md` correction re-aligns back to this ADR's original decision.

## Context

PRD P0-F006 requires guest + registered checkout with COD, Egyptian address capture, server-validated totals, stock reduction exactly once, duplicate-submission protection, and a confirmation email — all server-rendered (ADR 0002). PRD §11.3 explicitly names the WooCommerce Store API cart/checkout endpoints as the intended mechanism, with a footnote that exact route paths are "confirmed in Phase 2" since they depend on the WooCommerce version at build time.

## Options

1. **WooCommerce Store API** (`/wc/store/v1/cart/*`, `/wc/store/v1/checkout`) driving a Blade-rendered checkout page with Alpine.js handling the form/AJAX round-trip.
2. **Native WooCommerce checkout shortcode/block rendering**, Blade only wrapping it with GØT styling via template overrides and action/filter hooks (`woocommerce_checkout_fields`, etc.), no custom API calls at all.
3. **Fully custom checkout controller** in `got-commerce` that manually constructs a `WC_Order` from POSTed fields, bypassing both the Store API and the native checkout form processor.

## Trade-offs

- Option 1 matches the PRD's explicit technical architecture note and gives full design control (needed for 100% visual parity with `Checkout.jsx`'s custom layout — stock WooCommerce checkout templates look nothing like the GØT design system).
- Option 2 is the least code but gives the least design control; reskinning the native shortcode to match the GØT checkout layout (compact header, no distractions, custom field grouping) tends to fight WooCommerce's default templates more than overriding them via Blade views does.
- Option 3 violates constitution Principle 6 (HPOS compatibility) and Principle 8 (prefer WordPress-native solutions) by reinventing order-creation logic that WooCommerce's checkout processor already handles correctly (stock holds, tax calculation hooks, order-status transitions, email triggers) — high risk of subtly diverging from WooCommerce's own validated business rules.

## Decision

**Option 1**, implemented as: Blade views fully own the checkout page's HTML/CSS (matching `Checkout.jsx`'s layout), submitting via `fetch()` to the WooCommerce Store API's cart and checkout endpoints. Where the Store API's field set doesn't cover a GØT-specific need (e.g. exact Egyptian phone format enforcement), validation is added via WooCommerce's own extension points (`woocommerce_store_api_checkout_update_order_from_request` or equivalent for the Store API; `woocommerce_checkout_process` is the classic-checkout equivalent and is not needed if Store API is used exclusively) rather than a parallel validation system.

## Consequences

- No custom order-creation code — `wc_create_order()`/Store API call handles creation, so HPOS compatibility is inherited for free.
- The inline PDP checkout (ADR 0006) reuses this ADR's shared *validation* class (`CheckoutService`) but does not reuse the Store API hook mechanism itself — it calls `wc_create_order()` directly, since it has no Store API cart session to hook into. See `docs/architecture/CHECKOUT-AND-ORDER-LIFECYCLE.md`.
- Exact Store API endpoint paths/payload shape must be re-confirmed against the actual WooCommerce version at Phase 2 kickoff (PRD's own caveat) — this ADR's decision is the *mechanism*, not a frozen payload contract.

## Approval status

PROPOSED — technical implementation approach, consistent with PRD's own stated direction; no additional owner approval needed beyond the existing PRD approval.
