# Implementation Plan: Inline Product-Page COD Checkout

**Branch**: `009-inline-pdp-cod-checkout` | **Date**: 2026-10-09 | **Spec**: [spec.md](./spec.md)

## Summary

**Corrected 2026-10-09** (remediates finding C2-CHECKOUT): per ADR 0006 (Option 2), a thin `got-commerce` REST controller calls the exact same `CheckoutService` *validation* methods that Feature 010's Store API hooks call, for a single product/variation/qty + contact/address payload instead of a full cart. Unlike the prior version of this plan, this controller then creates the order **itself**, via a direct `wc_create_order()` call — `CheckoutService` does not create orders for either feature (see `docs/architecture/CHECKOUT-AND-ORDER-LIFECYCLE.md`). The product page gets a `DirectCheckout`-pattern Blade+Alpine form.

## Technical Context

**Language/Version**: PHP 8.3+ (raised 2026-10-09 for Sage 11/Acorn v6, see docs/adr/0001-sage-version.md) (shared `CheckoutService` validation + this feature's own order-creation call), Alpine.js (form state).
**Primary Dependencies**: `CheckoutService`'s validation methods, built in Feature 010 (hard dependency for validation only — this feature implements its own `wc_create_order()` call, since it has no cart/Store-API session to delegate to).
**Storage**: Writes to the same WooCommerce HPOS order tables as the standard checkout — no new storage.
**Testing**: Full duplicate of the standard-checkout E2E suite with the PDP entry point, plus an explicit regression test asserting both entry points produce byte-identical totals for identical inputs.
**Target Platform**: Same as prior.
**Performance Goals**: Same as standard checkout (confirmation within 2s on 4G).
**Constraints**: MUST NOT touch the visitor's persisted WooCommerce cart session at all (FR-004) — this is the core architectural reason Option 2 (dedicated endpoint) was chosen over directly using the Store API's cart-add-then-checkout flow.
**Scale/Scope**: One form, reused on every product page.

## Constitution Check

| Principle | Check | Status |
|---|---|---|
| 5 — Never trust client totals | Totals computed by the shared `CheckoutService`, identical to standard checkout | PASS |
| 6 — HPOS compatibility | Same `wc_create_order()` path as Feature 010, inherited | PASS |
| 9 — Avoid unnecessary dependencies | No new dependency; reuses Feature 010's service | PASS |

No violations.

## Project Structure

### Documentation (this feature)
```text
specs/009-inline-pdp-cod-checkout/
├── plan.md
├── research.md
├── contracts/
│   └── inline-checkout-api.md
├── quickstart.md
└── tasks.md
# No data-model.md — this feature introduces no new entities; it reuses Feature 010's Order/Line-Item model exactly.
```

### Source Code
```text
wp-content/plugins/got-commerce/src/Checkout/
  InlineCheckoutController.php   # POST /wp-json/got/v1/inline-checkout — calls CheckoutService's validation methods, then calls wc_create_order() directly itself (does NOT call a CheckoutService::createOrder() — no such method exists; see corrected contract)
  (CheckoutService.php lives here too, built by Feature 010 — this feature calls its validation methods only, never duplicates their logic, and never calls an order-creation method on it)
wp-content/themes/got-sage/resources/views/components/inline-checkout-form.blade.php
wp-content/themes/got-sage/resources/js/inline-checkout-form.js   # Alpine: field validation, submit-lock, order summary reflecting live PDP selection
```

**Structure Decision**: The controller is the *only* new file touching checkout logic; everything else is either reused (CheckoutService) or purely presentational (the form). This directly enforces FR-003 (identical business rules) by construction, not by convention alone.

## Complexity Tracking
*No violations.*
