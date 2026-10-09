# Implementation Plan: Cart and Standard Checkout

**Branch**: `010-cart-standard-checkout` | **Date**: 2026-10-09 | **Spec**: [spec.md](./spec.md)

## Summary

**Corrected 2026-10-09** (remediates finding C2-CHECKOUT, `docs/planning/PRE-IMPLEMENTATION-ARCHITECTURE-REMEDIATION.md`): build the `got-commerce` `CheckoutService` as a **shared validation/idempotency helper** (not an order-creation intercept — WooCommerce's native Store API checkout route creates the order itself, extended via documented hooks), a `CartDrawer`/`/cart/` page wired to the WooCommerce Store API, shipping zones (Alexandria/Cairo+Giza/Other), COD payment method, and a `/checkout/` page per `docs/architecture/CHECKOUT-AND-ORDER-LIFECYCLE.md` (supersedes `checkout-flow.md` Flow 1 and ADR 0005 wherever they conflict).

## Technical Context

**Language/Version**: PHP 8.3+ (raised 2026-10-09 for Sage 11/Acorn v6, see docs/adr/0001-sage-version.md) (CheckoutService, HPOS-compatible), Alpine.js (cart/checkout forms).
**Primary Dependencies**: WooCommerce Store API (cart add/update/coupon, checkout), WooCommerce shipping zones, WooCommerce guest session (ADR 0008).
**Storage**: WooCommerce HPOS order tables, native cart session — no new custom tables.
**Testing**: Full order-lifecycle E2E suite (`docs/testing/commerce-test-matrix.md`), PHP unit tests for `CheckoutService`'s idempotency-key logic, WC integration tests for stock reduction.
**Target Platform**: Same as prior.
**Performance Goals**: Checkout confirmation < 2s on 4G (p95 target per PRD).
**Constraints**: Never trust client-computed totals (constitution Principle 5); HPOS-compatible only (Principle 6); no payment secrets anywhere (COD-only, but architecture must not preclude a future gateway).
**Scale/Scope**: Single checkout flow, shared by this feature and Feature 009.

## Constitution Check

| Principle | Check | Status |
|---|---|---|
| 3 — WooCommerce owns business data | Cart/order state lives entirely in WooCommerce | PASS |
| 5 — Never trust client totals | `CheckoutService` recomputes everything server-side on submit | PASS |
| 6 — HPOS compatibility | `wc_create_order()`/`WC_Order`, never raw `$wpdb` on order tables | PASS |
| 10 — Never modify core | Store API used as documented, no core override | PASS |

No violations.

## Project Structure

### Documentation (this feature)
```text
specs/010-cart-standard-checkout/
├── plan.md
├── research.md
├── data-model.md
├── contracts/
│   └── checkout-api.md
├── quickstart.md
└── tasks.md
```

### Source Code
```text
wp-content/plugins/got-commerce/src/Checkout/
  IdempotencyGuard.php          # tracks {idempotency_key -> order_id}; implemented BEFORE CheckoutService per the corrected task order (remediates finding C2-CHECKOUT's ordering defect)
  CheckoutService.php          # shared VALIDATION/idempotency helper only — does NOT call wc_create_order() for this feature; see docs/architecture/CHECKOUT-AND-ORDER-LIFECYCLE.md for why this changed from the prior "single order-creation path" description
  StoreApiHooks.php              # wires CheckoutService into woocommerce_store_api_checkout_update_order_from_request — this is how GØT validation reaches the NATIVE Store API checkout route without replacing it
  ShippingZoneSeed.php           # seeds Alexandria/Cairo+Giza/Other zones on activation (idempotent)
wp-content/themes/got-sage/resources/views/
  woocommerce/cart/cart.php
  woocommerce/checkout/form-checkout.php
  woocommerce/checkout/thankyou.php             # shared with Feature 013
  components/cart-line.blade.php
  components/order-summary.blade.php
resources/js/{cart.js,checkout.js}
```

**Structure Decision**: `CheckoutService` is deliberately the single implementation of every GØT-specific validation rule (address/contact/stock/idempotency) — Feature 009's controller and this feature's Store API hooks both call it, never duplicate its logic. **Order creation itself is NOT centralized in `CheckoutService`** — this feature's order is created by WooCommerce's own native Store API checkout route (unmodified), while Feature 009's order is created by its own direct `wc_create_order()` call, since it has no cart/Store-API session to delegate to. This split is deliberate (see `docs/architecture/CHECKOUT-AND-ORDER-LIFECYCLE.md`) — the earlier version of this decision incorrectly centralized order creation itself, which a Codex architecture review flagged as bypassing WooCommerce's native checkout-route processing.

## Complexity Tracking
*No violations.*
