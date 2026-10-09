---
description: "Task list for Feature 018 — Verified Product Reviews"
---

# Tasks: Verified Product Reviews

**Input**: Design documents from `/specs/018-product-reviews/` (spec.md, plan.md, research.md, data-model.md)

## Phase 1: Setup
- [ ] T001 Confirm Feature 013 (order status-change hook) and Feature 011 (order ownership model) are complete

## Phase 2: Foundational
- [ ] T002 Enable WooCommerce native product reviews + star ratings in store settings
- [ ] T003 Implement `ReviewEligibility::canReview($customer_id, $product_id)` in `src/Reviews/ReviewEligibility.php`

**Checkpoint**: Eligibility check ready.

## Phase 3: User Story 1 - Verified buyer leaves a trustworthy review (Priority: P1) 🎯 MVP

### Tests for User Story 1
- [ ] T004 [P] [US1] Playwright test: Delivered order + 7 days → review-request email sent
- [ ] T005 [P] [US1] Playwright test: non-purchaser submission attempt → rejected
- [ ] T006 [P] [US1] Playwright test: pending review → not publicly visible; approved → visible with Verified Purchase badge
- [ ] T007 [P] [US1] Playwright test: duplicate review from same buyer/product → rejected

### Implementation for User Story 1
- [ ] T008 [US1] Implement `ReviewRequestScheduler.php`: daily WP-Cron sweep for 7-days-Delivered orders
- [ ] T009 [US1] Build/style the review-request email template
- [ ] T010 [US1] Override `woocommerce/single-product/tabs/reviews.php` to enforce the eligibility gate on the submission form (hide/disable when ineligible) and wire server-side rejection when bypassed
- [ ] T011 [US1] Wire the duplicate-submission check (one review per customer per product)

**Checkpoint**: User Story 1 independently testable.

---

## Phase 4: User Story 2 - Visitor judges quality from real review data (Priority: P2)

### Tests for User Story 2
- [ ] T012 [P] [US2] Playwright test: product with approved reviews → correct average/count on card and PDP
- [ ] T013 [P] [US2] Playwright test: product with zero reviews → no rating shown at all
- [ ] T014 [P] [US2] Playwright test: newly-approved review → average updates immediately, no stale cache

### Implementation for User Story 2
- [ ] T015 [US2] Build `components/rating-summary.blade.php`, wired into `ProductCard` (Feature 008's component) and the PDP template
- [ ] T016 [US2] Verify WooCommerce's native rating-recalculation fires correctly on every approval/rejection

**Checkpoint**: Both user stories independently functional.

---

## Phase 5: Polish & Cross-Cutting Concerns
- [ ] T017 Run quickstart.md validation end to end

## Dependencies & Execution Order
- Setup/Foundational block both user stories.
- This feature is naturally late in the build order — it requires real Delivered orders to exist, which in turn requires Features 010 and 013 to be functioning first.
