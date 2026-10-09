---
description: "Task list for Feature 012 — Wishlist and Guest-to-Account Merge"
---

# Tasks: Wishlist and Guest-to-Account Merge

**Input**: Design documents from `/specs/012-wishlist-guest-merge/` (spec.md, plan.md, research.md, data-model.md, contracts/)

## Phase 1: Setup
- [ ] T001 Confirm Feature 008 (products to wishlist) and Feature 011 (accounts, for merge testing) exist on staging

## Phase 2: Foundational
- [ ] T002 Implement `WishlistService.php`: add/remove/list/merge logic against `_got_wishlist` user meta
- [ ] T003 [P] Build `resources/js/wishlist-store.js`: guest cookie/localStorage module (ports `wishlist-store.js`'s validated pattern) + shared reactive store
- [ ] T004 Register the 4 REST routes per `contracts/wishlist-api.md`

**Checkpoint**: Backend + shared client store ready.

## Phase 3: User Story 1 - Buyer saves and manages a wishlist (Priority: P1) 🎯 MVP

### Tests for User Story 1
- [ ] T005 [P] [US1] Playwright test: save from card → state syncs to PDP heart and header count
- [ ] T006 [P] [US1] Playwright test: wishlist page shows live price/availability, not stale snapshot
- [ ] T007 [P] [US1] Playwright test: sold-out item blocked from move-to-cart; single-variation moves directly, multi-variation routes to PDP
- [ ] T008 [P] [US1] Playwright test: clear wishlist requires confirmation

### Implementation for User Story 1
- [ ] T009 [P] [US1] Wire the heart control into `product-card.blade.php` and the PDP (Feature 008's template)
- [ ] T010 [US1] Build `resources/views/pages/wishlist.blade.php`
- [ ] T011 [US1] Implement the move-to-cart logic with live availability re-check
- [ ] T012 [US1] Implement the "no longer available" state for removed products
- [ ] T013 [US1] Implement the clear-wishlist confirmation modal

**Checkpoint**: User Story 1 independently testable.

---

## Phase 4: User Story 2 - Guest items survive registration (Priority: P2)

### Tests for User Story 2
- [ ] T014 [P] [US2] Playwright test: guest saves 2 items → registers → both appear, no duplicates
- [ ] T015 [P] [US2] Playwright test: guest list overlaps an existing account's list on login → merged result has no duplicates

### Implementation for User Story 2
- [ ] T016 [US2] Wire the merge call into the login/registration success flow (client-side trigger, per research.md)
- [ ] T017 [US2] PHP unit test + implementation: `WishlistService::merge()` de-duplication logic

**Checkpoint**: Both user stories independently functional.

---

## Phase 5: Polish & Cross-Cutting Concerns
- [ ] T018 [P] Accessibility pass: heart control's `aria-pressed`/accessible-name state across all 4 surfaces (header, card, PDP, wishlist page)
- [ ] T019 Run quickstart.md validation end to end

## Dependencies & Execution Order
- Setup/Foundational block both user stories.
- User Story 2 depends on User Story 1's heart/save mechanism existing first.
