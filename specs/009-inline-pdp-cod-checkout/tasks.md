---
description: "Task list for Feature 009 — Inline Product-Page COD Checkout"
---

# Tasks: Inline Product-Page COD Checkout

**Input**: Design documents from `/specs/009-inline-pdp-cod-checkout/` (spec.md, plan.md, research.md, contracts/)

**Hard dependency**: Feature 010's `CheckoutService` validation methods (T006/T006a) must exist before T003 below can be implemented — this feature's tasks assume it.

**Corrected 2026-10-09** (remediates finding C2-CHECKOUT): this feature's controller calls `CheckoutService`'s validation methods only, then creates its own order via a direct `wc_create_order()` call — there is no `CheckoutService::createOrder()` method (see `docs/architecture/CHECKOUT-AND-ORDER-LIFECYCLE.md`).

## Phase 1: Setup
- [ ] T001 Confirm Feature 008 (PDP) and Feature 010 (`CheckoutService` validation methods) are complete on staging

## Phase 2: Foundational
- [ ] T002 Confirm `CheckoutService`'s validation methods (`validateContact`, `validateAddress`, `validateStock`, `checkIdempotency`, `recordIdempotency`) are deployed and match their documented signatures per `specs/010-cart-standard-checkout/contracts/checkout-api.md` — this is a verification step only. **No change to Feature 010 is expected or permitted here** — if the deployed service does not match its own documented contract, that is a Feature 010 defect to fix in Feature 010, not something this feature's controller should work around or adjust.

**Checkpoint**: Shared service confirmed reusable.

## Phase 3: User Story 1 - Buyer orders directly from the product page (Priority: P1) 🎯 MVP

### Tests for User Story 1
- [ ] T003 [P] [US1] Playwright E2E: full inline order happy path → confirmation page/email match standard-checkout shape
- [ ] T004 [P] [US1] Playwright E2E: cart-isolation test — place an inline order with unrelated cart contents present → assert cart unchanged
- [ ] T005 [P] [US1] Playwright E2E: duplicate submission within protection window → same order returned, not duplicated
- [ ] T006 [P] [US1] Playwright E2E: sold-out variation → inline form disabled with correct message
- [ ] T007 [P] [US1] Regression test: identical inputs via inline vs. standard checkout → byte-identical totals

### Implementation for User Story 1
- [ ] T008 [US1] Implement `InlineCheckoutController.php`: calls `CheckoutService::checkIdempotency()` first, then `validateContact()`/`validateAddress()`/`validateStock()`, then — if all pass — calls `wc_create_order()` directly itself and `CheckoutService::recordIdempotency()`; returns the contract responses from `contracts/inline-checkout-api.md`
- [ ] T009 [P] [US1] Build `components/inline-checkout-form.blade.php` (Contact/Delivery/Payment sections, matching the standard checkout's field set)
- [ ] T010 [P] [US1] Build `resources/js/inline-checkout-form.js`: field validation, submit-lock, live order-summary reflecting the PDP's currently selected variation/quantity
- [ ] T011 [US1] Wire the "Order now" CTA to scroll to and focus the inline form, matching the PDP's existing sticky-CTA visibility rules from Feature 008

**Checkpoint**: User Story 1 independently testable end to end.

---

## Phase 4: Polish & Cross-Cutting Concerns
- [ ] T012 Run the full standard-checkout E2E suite (`specs/010-cart-standard-checkout/tasks.md`'s tests) a second time with the inline entry point substituted, confirming full parity
- [ ] T013 Run quickstart.md validation end to end

## Dependencies & Execution Order

- This entire feature is downstream of Feature 010 — do not begin T008 until `CheckoutService` is stable, or the controller will need rework.
- All User Story 1 tests can be written and left failing before T008–T011 land, per standard TDD practice.
