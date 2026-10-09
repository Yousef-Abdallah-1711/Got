---
description: "Task list for Feature 011 — Customer Accounts and Authentication"
---

# Tasks: Customer Accounts and Authentication

**Input**: Design documents from `/specs/011-customer-accounts-auth/` (spec.md, plan.md, research.md)

**Tests**: Included — security/authorization tests are core to this feature, not optional.

## Phase 1: Setup
- [ ] T001 Confirm Feature 010 (so real orders exist to test ownership/visibility against)

## Phase 2: Foundational
- [ ] T002 Build `woocommerce/myaccount/my-account.php` base shell with nav (Orders/Addresses/Account Details)
- [ ] T003 [P] Implement `LoginRateLimiter.php`: 5-failure/15-minute lockout per account

**Checkpoint**: Shell + lockout ready.

## Phase 3: User Story 1 - Returning customer logs in, sees orders (Priority: P1) 🎯 MVP

### Tests for User Story 1
- [ ] T004 [P] [US1] Playwright test: register → login → see own orders with correct detail
- [ ] T005 [P] [US1] Playwright test: guest order + matching-email registration → order appears in history
- [ ] T006 [P] [US1] Playwright test: password reset happy path, link works once

### Implementation for User Story 1
- [ ] T007 [P] [US1] Build `form-login.php`, `form-register.php`, `form-lost-password.php`
- [ ] T008 [P] [US1] Build `orders.php` and `view-order.php` (with strict ownership filtering)
- [ ] T009 [P] [US1] Build `edit-address.php`

**Checkpoint**: User Story 1 independently testable.

---

## Phase 4: User Story 2 - No customer sees another's data (Priority: P1)

### Tests for User Story 2
- [ ] T010 [P] [US2] Security test: Customer A requests Customer B's order URL → generic denial, no enumeration
- [ ] T011 [P] [US2] Security test: wrong-password vs. nonexistent-email → identical error message
- [ ] T012 [P] [US2] Security test: 5 failed logins → 6th blocked for 15 minutes
- [ ] T013 [P] [US2] Security test: reset token reused → rejected; reset token after 60 minutes → rejected

### Implementation for User Story 2
- [ ] T014 [US2] Implement the object-ownership check on `view-order.php` and any order-detail endpoint
- [ ] T015 [US2] Implement the non-enumerating login error message
- [ ] T016 [US2] Wire `LoginRateLimiter` into the login form's submission handling
- [ ] T017 [US2] Confirm WordPress's native reset-token single-use/60-minute-expiry behavior is active and not weakened by any customization

**Checkpoint**: Both user stories independently functional.

---

## Phase 5: Polish & Cross-Cutting Concerns
- [ ] T018 Run quickstart.md validation end to end, including every security scenario

## Dependencies & Execution Order
- Setup/Foundational block both user stories.
- User Story 2's tests should be run against User Story 1's implementation as soon as it exists — treat them as a required gate, not a follow-on nicety.
