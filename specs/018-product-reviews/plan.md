# Implementation Plan: Verified Product Reviews

**Branch**: `018-product-reviews` | **Date**: 2026-10-09 | **Spec**: [spec.md](./spec.md)

## Summary

Use WooCommerce's native product-review system (comments-based) with a verified-purchase gate on submission, a 7-days-after-Delivered email trigger reusing Feature 013's status-change hook, and rating/count display on `ProductCard` and the PDP.

## Technical Context

**Language/Version**: PHP 8.3+ (raised 2026-10-09 for Sage 11/Acorn v6, see docs/adr/0001-sage-version.md)/Blade.
**Primary Dependencies**: WooCommerce native reviews (built on WordPress comments), Feature 013's `woocommerce_order_status_changed` hook infrastructure, Feature 011's order-ownership model.
**Storage**: WooCommerce-native (comments table + comment meta for rating); no new custom table.
**Testing**: Playwright E2E (verified-gate enforcement, moderation visibility, rating display), PHP unit test for the 7-day scheduling logic.
**Target Platform**: Same as prior.
**Constraints**: Never trust a client-asserted "I bought this" claim — verification is always a server-side order-ownership check (constitution Principle 4/5 analog).
**Scale/Scope**: One review submission form, one moderation queue (native WP), rating display on 2 surfaces (card, PDP).

## Constitution Check

| Principle | Check | Status |
|---|---|---|
| 16 — No fabricated claims | Verified-Purchase badge is only ever true by construction (FR-002/FR-004); no rating shown with zero reviews | PASS |
| 9 — Avoid unnecessary dependencies | Uses WooCommerce's native review system, no new plugin | PASS |

No violations.

## Project Structure

### Documentation (this feature)
```text
specs/018-product-reviews/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
└── tasks.md
# No contracts/ — uses WooCommerce's native review submission (comment form), not a new custom REST endpoint.
```

### Source Code
```text
wp-content/plugins/got-commerce/src/Reviews/
  ReviewEligibility.php       # verifies a Delivered order exists for this customer+product before allowing submission
  ReviewRequestScheduler.php   # WP-Cron: finds orders Delivered exactly 7 days ago, sends the request email
wp-content/themes/got-sage/resources/views/
  woocommerce/single-product/tabs/reviews.php   # review form + list override
  components/rating-summary.blade.php            # average rating + count, used on ProductCard and PDP
```

**Structure Decision**: Eligibility verification and the email-scheduling logic are business rules, so they live in `got-commerce`; the review form/display markup is presentation, so it lives in the theme as a WooCommerce template override.

## Complexity Tracking
*No violations.*
