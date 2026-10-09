---
description: "Task list for Feature 013 — Order Confirmation, Tracking, and Transactional Email"
---

# Tasks: Order Confirmation, Tracking, and Transactional Email

**Input**: Design documents from `/specs/013-orders-confirmation-tracking/` (spec.md, plan.md, research.md, contracts/)

## Phase 1: Setup
- [ ] T001 Confirm Feature 010 (real orders exist) and Feature 005's rate-limiter helper are available

## Phase 2: Foundational
- [ ] T002 Confirm/configure SPF/DKIM/DMARC on the sending domain (shared with Feature 005 — verify, don't re-do, if already done)
- [ ] T003 Register the `wc-out-for-delivery` custom WooCommerce order status (label, admin color, bulk-action support) per the resolved decision in `docs/adr/0016-order-status-mapping.md` — "Delivered" requires no new status, it maps to native `Completed`

## Phase 3: User Story 1 - Buyer receives clear confirmation (Priority: P1) 🎯 MVP

### Tests for User Story 1
- [ ] T004 [P] [US1] Playwright test: real checkout → confirmation page shows correct order number/items
- [ ] T005 [P] [US1] Playwright test: confirmation email (sandbox) arrives within 2 minutes with matching details
- [ ] T006 [P] [US1] Test: confirmation page/state never shows "confirmed" without a real persisted order

### Implementation for User Story 1
- [ ] T007 [US1] Build `woocommerce/checkout/thankyou.php`, shared by Feature 010 and 009's redirects
- [ ] T008 [US1] Build/style the order-confirmation email template

**Checkpoint**: User Story 1 independently testable.

---

## Phase 4: User Story 2 - Status notifications + guest tracking (Priority: P2)

### Tests for User Story 2
- [ ] T009 [P] [US2] Playwright test: status change → matching email sent, for each of the 4 statuses
- [ ] T010 [P] [US2] Playwright test: correct order number + email → correct timeline
- [ ] T011 [P] [US2] Security test: wrong-number / wrong-email / both-wrong → byte-identical `found:false` response in all 3 cases
- [ ] T012 [P] [US2] Security test: rapid repeated lookups → rate-limited

### Implementation for User Story 2
- [ ] T013 [US2] Hook `woocommerce_order_status_changed` → dispatch the 4 branded email templates
- [ ] T014 [US2] Build `pages/track-order.blade.php` + `RestController.php` per `contracts/tracking-api.md`
- [ ] T015 [US2] Wire the reused rate-limiter helper into the tracking endpoint

**Checkpoint**: Both user stories independently functional.

---

## Phase 5: Polish & Cross-Cutting Concerns
- [ ] T016 Configure email-delivery-rate monitoring with an alert below 98% (PRD §8)
- [ ] T017 Run quickstart.md validation end to end

## Dependencies & Execution Order
- Setup/Foundational block both user stories.
- User Story 1 is the MVP (must exist for checkout itself to feel complete); User Story 2 is additive.
