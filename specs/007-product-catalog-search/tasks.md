---
description: "Task list for Feature 007 — Product Catalog, Categories, Filters, Search"
---

# Tasks: Product Catalog, Categories, Filters, Search

**Input**: Design documents from `/specs/007-product-catalog-search/` (spec.md, plan.md, research.md)

## Phase 1: Setup
- [ ] T001 Confirm Feature 002's environment and at least one published product category exist on staging

## Phase 2: Foundational
- [ ] T002 Build `woocommerce/archive-product.php` Blade override with the base grid structure
- [ ] T003 [P] Build `woocommerce/taxonomy-product_cat.php` reusing the same grid component

**Checkpoint**: Base catalog templates ready.

## Phase 3: User Story 1 - Browse, sort, filter (Priority: P1) 🎯 MVP

### Tests for User Story 1
- [ ] T004 [P] [US1] Playwright test: default load → 12/8 per page, newest-first
- [ ] T005 [P] [US1] Playwright test: size filter → grid updates within 300ms, only in-stock-in-size products remain
- [ ] T006 [P] [US1] Playwright test: price sort → correct lowest-variation-price ordering
- [ ] T007 [P] [US1] Playwright test: Load More → appends without full reload
- [ ] T008 [P] [US1] Playwright test: apply filter → browser back → state restored
- [ ] T009 [P] [US1] Playwright test: empty category → correct empty-state message; filter-matches-nothing → correct no-match message + clear-all action

### Implementation for User Story 1
- [ ] T010 [US1] Build `components/filter-bar.blade.php` (tabs, sort select, size-filter trigger, applied-count badge)
- [ ] T011 [US1] Build `resources/js/filter-bar.js` Alpine component: tab/sort/filter state, `URLSearchParams` sync, `pushState` on change, read `location.search` on load
- [ ] T012 [US1] Implement the Load More AJAX action, returning the next page's product-card HTML fragment
- [ ] T013 [US1] Implement price-sort-by-lowest-variation-price query logic
- [ ] T014 [US1] Implement the size-filter query logic (match products with ≥1 in-stock variation in the selected size)
- [ ] T015 [US1] Build the empty-category and no-filter-match empty states

**Checkpoint**: User Story 1 independently testable.

---

## Phase 4: User Story 2 - Search by name (Priority: P2)

### Tests for User Story 2
- [ ] T016 [P] [US2] Playwright test: search by exact name/SKU/category → correct results within 1s
- [ ] T017 [P] [US2] Playwright test: nonsense search → no-results message; empty search → no request sent

### Implementation for User Story 2
- [ ] T018 [US2] Build `app/search.php` override reusing the catalog grid component
- [ ] T019 [US2] Implement `src/Catalog/SearchQuery.php`'s `pre_get_posts` extension (name + SKU meta + category taxonomy match)
- [ ] T020 [US2] Build the no-results state with the searched term interpolated into the message

**Checkpoint**: Both user stories independently functional.

---

## Phase 5: Polish & Cross-Cutting Concerns
- [ ] T021 Run Lighthouse mobile/4G audit against the catalog page; fix any LCP regression
- [ ] T022 Run quickstart.md validation end to end

## Dependencies & Execution Order
- Setup/Foundational block both user stories.
- User Story 2 can be built in parallel with User Story 1 (different files) but is lower priority — do not let it delay User Story 1's MVP delivery.
