---
description: "Task list for Feature 010 — Cart and Standard Checkout"
---

# Tasks: Cart and Standard Checkout

**Input**: Design documents from `/specs/010-cart-standard-checkout/` (spec.md, plan.md, research.md, data-model.md, contracts/)

**Tests**: Included — this is the highest-risk feature in the project; every scenario in `docs/testing/commerce-test-matrix.md` tagged P0 traces back here.

## Phase 1: Setup
- [ ] T001 Confirm Feature 008 (PDP, for add-to-cart entry points) exists on staging
- [ ] T002 [P] Enable WooCommerce Store API and confirm its cart endpoints respond on staging

## Phase 2: Foundational

- [ ] T003 Create `got_checkout_idempotency` table migration (idempotent on activation)
- [ ] T003a Implement `IdempotencyGuard.php` (`checkIdempotency()`/`recordIdempotency()` against the T003 table) — **moved here from its previous position as T023, which came AFTER the task that required it; this ordering defect was found by an independent Codex architecture review (finding C2-CHECKOUT) and is fixed by building the guard immediately after its own table, before anything that calls it**
- [ ] T004 Implement `ShippingZoneSeed.php`: seed Alexandria / Cairo+Giza / Other zones idempotently, fee fields visibly placeholder pending brand input
- [ ] T005 Enable WooCommerce COD payment method, configured for "Processing" order status per the project's COD settings
- [ ] T006 Implement `CheckoutService`'s validation methods (`validateContact`, `validateAddress`, `validateStock`) plus thin wrappers around `IdempotencyGuard` (T003a) — **corrected scope**: this class no longer calls `wc_create_order()` itself (see `docs/architecture/CHECKOUT-AND-ORDER-LIFECYCLE.md` — that was the other half of finding C2-CHECKOUT). Its method contracts are fixed by `contracts/checkout-api.md` and are a hard, load-bearing dependency of Feature 009 — do not change their signatures after this task is complete without updating that contract and coordinating with Feature 009. T006 must complete and be contract-stable before Feature 009's T008 begins (see `docs/planning/MASTER-IMPLEMENTATION-ROADMAP.md`).
- [ ] T006a Implement `StoreApiHooks.php`: wires `CheckoutService`'s validation methods into `woocommerce_store_api_checkout_update_order_from_request`, so GØT validation runs inside WooCommerce's own native `/wc/store/v1/checkout` processing without replacing it — this is the corrected integration point from finding C2-CHECKOUT's first half (the custom-service-as-order-creator problem)

**Checkpoint**: Foundation ready for both this feature's UI and Feature 009's inline controller.

## Phase 3: User Story 1 - Buyer reviews a trustworthy cart (Priority: P1) 🎯 MVP

### Tests for User Story 1
- [ ] T007 [P] [US1] Playwright test: multi-item cart → totals equal sum of lines + shipping - discount
- [ ] T008 [P] [US1] Playwright test: quantity change <500ms; valid/invalid coupon <1s with correct messages
- [ ] T009 [P] [US1] Playwright test: sold-out item in cart → blocked checkout with correct messaging
- [ ] T010 [P] [US1] Playwright test: guest cart persists 14 days (simulate via cookie/session inspection); login merges with no duplicate lines
- [ ] T010a [P] [US1] Playwright test: open the mini-cart drawer (Feature 003's empty shell), add/update/remove a line from the drawer itself (not just the full cart page), confirm totals match the full `/cart/` page's totals exactly, and confirm the drawer and full cart page never disagree after a change made in either one — **remediates cross-feature-analysis.md finding G1**

### Implementation for User Story 1
- [ ] T011 [US1] Build `woocommerce/cart/cart.php` full cart page
- [ ] T012 [US1] Wire `components/cart-line.blade.php` to Store API update/remove endpoints
- [ ] T013 [US1] Build coupon-apply UI + Store API wiring
- [ ] T014 [US1] Build the empty-cart state
- [ ] T015 [US1] Implement guest-to-account cart merge logic (dedupe by variation)
- [ ] T015a [US1] Wire `partials/cart-drawer.blade.php` (the empty shell built in Feature 003) to the exact same Store API add/update/remove/coupon endpoints as the full cart page — reusing `components/cart-line.blade.php` inside the drawer rather than a second line-item template, so the drawer and the full cart page are two views of one state, never two independently-fetched copies — **remediates cross-feature-analysis.md finding G1** (the drawer was previously only a non-wired UI shell per Feature 003's own explicit scope note)
- [ ] T015b [US1] Confirm the header's cart-count badge, the drawer, and the full cart page all update from the same Store API response after any single change (add/update/remove/coupon), with no stale count or stale line visible in any of the three surfaces

**Checkpoint**: User Story 1 independently testable.

---

## Phase 4: User Story 2 - Buyer completes a real COD order (Priority: P1)

### Tests for User Story 2
- [ ] T016 [P] [US2] Playwright test: full checkout happy path, per shipping zone (×3), each producing a confirmed order + email
- [ ] T017 [P] [US2] Playwright test: ungoverned governorate → blocked with correct message
- [ ] T018 [P] [US2] Playwright test: stock conflict at submit time → no order created, buyer returned to cart with affected items listed
- [ ] T019 [P] [US2] PHP unit test: `IdempotencyGuard` — duplicate key within window returns original order, no second stock reduction
- [ ] T020 [P] [US2] Security test: inspect network/page-source for payment secrets during a full checkout session → assert none found

### Implementation for User Story 2
- [ ] T021 [US2] Build `woocommerce/checkout/form-checkout.php`
- [ ] T022 [US2] Build `resources/js/checkout.js`: field validation (incl. Egyptian phone format), submit flow calling the native `/wc/store/v1/checkout` endpoint directly (not a custom endpoint) — validation errors surface through the Store API's own error response shape, since `StoreApiHooks.php` (T006a) attaches `CheckoutService`'s validation inside WooCommerce's native processing
- [ ] ~~T023~~ **Removed — this was a duplicate of T003a, created by the same ordering defect (finding C2-CHECKOUT) this file now corrects. Do not re-add.**
- [ ] T024 [US2] Wire the stock-conflict and server-error failure states (cart preserved, no stock change) — surfaced through the Store API's native error response, read by `checkout.js` (T022)

**Checkpoint**: Both user stories independently functional — this feature's core MVP is complete.

---

## Phase 5: Polish & Cross-Cutting Concerns
- [ ] T025 Run the full order-lifecycle E2E suite from `docs/testing/commerce-test-matrix.md` (scenarios 1, 3–7, 10, 17, 19–21)
- [ ] T026 Confirm Feature 009's controller can successfully call `CheckoutService`'s validation methods (not an order-creation method — see T006's corrected scope) for a single-item request, then create its own order via a direct `wc_create_order()` call (integration smoke test)
- [ ] T027 Run quickstart.md validation end to end, including a real test order on staging for each shipping zone

## Dependencies & Execution Order

- Setup/Foundational block both user stories.
- User Story 1 (cart) should functionally precede User Story 2 (checkout) since checkout reads from a populated, valid cart — but both can be built in parallel if staffed, meeting at the cart→checkout handoff.
- Feature 009 cannot begin its own implementation tasks until T006 (`CheckoutService`) is stable.
