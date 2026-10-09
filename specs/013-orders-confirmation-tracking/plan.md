# Implementation Plan: Order Confirmation, Tracking, and Transactional Email

**Branch**: `013-orders-confirmation-tracking` | **Date**: 2026-10-09 | **Spec**: [spec.md](./spec.md)

## Summary

`woocommerce/checkout/thankyou.php` Blade override (shared confirmation page for both Feature 010 and 009's flows), WooCommerce email-template customization for the 4 status transitions, and a custom rate-limited, non-enumerating `/track-order/` lookup endpoint + page.

## Technical Context

**Language/Version**: PHP 8.3+ (raised 2026-10-09 for Sage 11/Acorn v6, see docs/adr/0001-sage-version.md)/Blade.
**Primary Dependencies**: WooCommerce order-status hooks (`woocommerce_order_status_changed`), WordPress mail transport / chosen transactional provider (ADR 0011), the rate-limiter helper built in Feature 005 (reused here).
**Storage**: Order status history is WooCommerce-native (order notes/status log) — no new table beyond reusing existing order data.
**Testing**: Playwright E2E (confirmation, status-change emails via sandbox provider, tracking lookup incl. non-enumeration), email-delivery monitoring configuration.
**Target Platform**: Same as prior.
**Constraints**: Non-enumeration is a hard security requirement (FR-004); never show "confirmed" without real persistence (FR-001).
**Scale/Scope**: One confirmation template, one tracking page, 4 email templates.

## Constitution Check

| Principle | Check | Status |
|---|---|---|
| 15 — Security/privacy architectural | Non-enumerating lookup, rate-limited | PASS |
| 16 — No fabricated claims | Confirmation page gated on real order existence | PASS |

No violations.

## Project Structure

### Documentation (this feature)
```text
specs/013-orders-confirmation-tracking/
├── plan.md
├── research.md
├── contracts/
│   └── tracking-api.md
├── quickstart.md
└── tasks.md
# No data-model.md — order status history is a native WooCommerce concept, not a new entity.
```

### Source Code
```text
wp-content/themes/got-sage/resources/views/
  woocommerce/checkout/thankyou.php
  woocommerce/emails/{customer-processing-order,customer-completed-order,...}.php   # brand-styled overrides
  pages/track-order.blade.php
wp-content/plugins/got-commerce/src/OrderTracking/
  RestController.php        # /wp-json/got/v1/track-order — rate-limited, non-enumerating
```

**Structure Decision**: Email template overrides stay in the theme (presentation of WooCommerce's native email system); the tracking lookup's rate-limit/non-enumeration logic is business/security logic, so it lives in `got-commerce`.

## Complexity Tracking
*No violations.*
