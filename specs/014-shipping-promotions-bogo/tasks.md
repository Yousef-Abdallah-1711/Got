---
description: "Task list for Feature 014 — Shipping Zones, Coupons, and BOGO/Free-Shipping Promotions"
---

# Tasks: Shipping Zones, Coupons, and BOGO/Free-Shipping Promotions

**Input**: Design documents from `/specs/014-shipping-promotions-bogo/` (spec.md, plan.md, research.md, data-model.md, contracts/)

## Phase 1: Setup
- [ ] T001 Confirm Feature 010's `ShippingZoneSeed` is active on staging

## Phase 2: Foundational
- [ ] T002 Register the `got_promotion` CPT with its meta fields (per data-model.md)
- [ ] T003 Implement `EligibilityCalculator::evaluate()` returning the contract shape from `contracts/promotion-eligibility.md`
- [ ] T004 Implement `BogoLineItemHook.php` wiring `EligibilityCalculator` into `woocommerce_add_to_cart`/`woocommerce_cart_loaded_from_session` (add/remove the free line item as eligibility changes) and `woocommerce_before_calculate_totals` (zero its price) — **corrected from a `CartFeeHook.php`/`woocommerce_cart_calculate_fees` approach, which could not satisfy this feature's own FR-009 stock-reduction requirement; see `docs/architecture/PROMOTIONS-AND-PRICING.md` (finding C3-PROMO)**

**Checkpoint**: Promotion engine ready for all three rendering surfaces.

## Phase 3: User Story 1 - Correct shipping fee (Priority: P1) 🎯 MVP

### Tests for User Story 1
- [ ] T005 [P] [US1] Playwright test: correct fee per zone (×3); uncovered governorate blocks checkout

### Implementation for User Story 1
- [ ] T006 [US1] Verify/finish zone fee display in the checkout summary (mostly inherited from Feature 010)

**Checkpoint**: User Story 1 independently testable.

---

## Phase 4: User Story 2 - Valid coupon application (Priority: P1)

### Tests for User Story 2
- [ ] T007 [P] [US2] Playwright test: valid coupon applies correctly; invalid/expired/minimum-not-met rejected cleanly

### Implementation for User Story 2
- [ ] T008 [US2] Verify/finish the coupon-apply UI wiring (mostly inherited from Feature 010's cart work)

**Checkpoint**: User Stories 1 and 2 independently functional.

---

## Phase 5: User Story 3 - Real promotions only, never fake ones (Priority: P2)

### Tests for User Story 3
- [ ] T009 [P] [US3] Playwright test: no promotion configured → zero badges/messages on PDP/cart/checkout for any product
- [ ] T010 [P] [US3] Playwright test: BOGO below/at/above required quantity → correct invitation/applied states, consistent across all 3 surfaces
- [ ] T011 [P] [US3] Playwright test: expired promotion → behaves as never-configured
- [ ] T012 [P] [US3] Playwright test: free-shipping threshold boundary (just below / exactly at / above) → correct progress/unlocked states, zero off-by-one
- [ ] T013 [P] [US3] Integration test: BOGO free-item stock reduction, identical to an ordinary line item — **this is the exact test that exposed finding C3-PROMO: it could not have passed under the original fee-based mechanism (a fee has no stock to reduce); it is expected to pass now that T004 implements the line-item-based mechanism**

### Implementation for User Story 3
- [ ] T014 [US3] Wire `offer-block.blade.php` into PDP (Feature 008), calling `EligibilityCalculator` fresh on each render
- [ ] T015 [US3] Wire `shipping-incentive.blade.php` into PDP and cart
- [ ] T016 [US3] Wire both into the checkout summary
- [ ] T017 [US3] Implement the coupon-stacking rule check in `BogoLineItemHook.php`
- [ ] T018 [US3] Build the `got_promotion` admin editing screen (eligible products, quantity/threshold, dates, stacking, label, terms)

**Checkpoint**: All three user stories independently functional.

---

## Phase 6: Polish & Cross-Cutting Concerns
- [ ] T019 Mark shipping-zone fee fields as visibly placeholder pending brand input (if not already done in Feature 010)
- [ ] T020 Run quickstart.md validation end to end

## Dependencies & Execution Order
- Setup/Foundational block all three user stories.
- User Stories 1 and 2 are largely verification of Feature 010's existing work; User Story 3 is this feature's substantial new scope and should get the majority of implementation time.
