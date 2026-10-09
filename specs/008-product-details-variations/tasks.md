---
description: "Task list for Feature 008 — Product Detail, Variations, Inventory"
---

# Tasks: Product Detail, Variations, Inventory

**Input**: Design documents from `/specs/008-product-details-variations/` (spec.md, plan.md, research.md, data-model.md)

## Phase 1: Setup
- [ ] T001 Confirm Feature 007's catalog/category structure exists; confirm at least one variable product (2 colors × 3 sizes) exists on staging for testing

## Phase 2: Foundational
- [ ] T002 Implement `ColorSwatchMeta.php`: register and render the `hex` term-meta field on the `pa_color` attribute's admin edit screen
- [ ] T003 Build the base `woocommerce/single-product.php` override structure (breadcrumb, layout grid: gallery + info column)

**Checkpoint**: Base template and color-swatch data model ready.

## Phase 3: User Story 1 - Buyer selects variation and adds to cart (Priority: P1) 🎯 MVP

### Tests for User Story 1
- [ ] T004 [P] [US1] Playwright test: select color → gallery updates to color-specific images
- [ ] T005 [P] [US1] Playwright test: select size → price/stock update within 200ms, no reload
- [ ] T006 [P] [US1] Playwright test: add to cart without size selected → inline error, no addition
- [ ] T007 [P] [US1] Playwright test: successful add-to-cart → cart count updates, confirmation shows correct variation/qty
- [ ] T008 [P] [US1] Playwright test: simulated network failure during add-to-cart → retry message, selection preserved

### Implementation for User Story 1
- [ ] T009 [P] [US1] Build gallery markup + swipe/zoom behavior in `resources/js/product-detail.js`
- [ ] T010 [P] [US1] Build `components/color-selector.blade.php` reading `hex` term meta
- [ ] T011 [P] [US1] Build `components/size-selector.blade.php` with strikethrough-unavailable state
- [ ] T012 [P] [US1] Build `components/quantity-stepper.blade.php` clamped to `min(10, stock)`
- [ ] T013 [US1] Wire variation-selection → price/stock update logic (native WooCommerce variation data, AJAX fallback per research.md)
- [ ] T014 [US1] Wire add-to-cart submission with network-failure handling that preserves current selection

**Checkpoint**: User Story 1 independently testable.

---

## Phase 4: User Story 2 - Accurate stock truth (Priority: P1)

### Tests for User Story 2
- [ ] T015 [P] [US2] Playwright test: zero-stock size → struck through, unselectable, add-to-cart blocked
- [ ] T016 [P] [US2] Playwright test: shared link with a now-out-of-stock size pre-selected → add-to-cart disabled with correct message
- [ ] T017 [P] [US2] Playwright test: quantity request above stock → capped with "only N left" message

### Implementation for User Story 2
- [ ] T018 [US2] Implement the unavailable-size strikethrough + selection-block logic in `size-selector.blade.php`
- [ ] T019 [US2] Implement the quantity cap and "only N left" messaging in `quantity-stepper.blade.php`
- [ ] T020 [US2] Implement JSON-LD product schema generation, rendered fresh on every request from live data

**Checkpoint**: Both user stories independently functional.

---

## Phase 5: Polish & Cross-Cutting Concerns
- [ ] T021 [P] Keyboard-only + screen-reader pass on all variation controls
- [ ] T022 Validate JSON-LD against a schema validator across a sample of test products
- [ ] T023 Run quickstart.md validation end to end

## Dependencies & Execution Order
- Setup/Foundational block both user stories.
- User Stories 1 and 2 touch the same component files, so in practice they're built together per-component rather than fully sequentially, even though conceptually separable.
