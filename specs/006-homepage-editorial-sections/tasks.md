---
description: "Task list for Feature 006 — Homepage and Editorial Sections"
---

# Tasks: Homepage and Editorial Sections

**Input**: Design documents from `/specs/006-homepage-editorial-sections/` (spec.md, plan.md, research.md)

## Phase 1: Setup

- [ ] T001 Confirm Feature 004 (ACF architecture) and at least a minimal product catalog (real or placeholder, per Feature 007/008) exist on staging

## Phase 2: Foundational

- [ ] T002 Build `app/Support/HomepageQueries.php`: `featuredProducts()`, `newArrivals()`, `categoriesWithProducts(min: 2)`
- [ ] T003 Build `resources/views/front-page.blade.php`'s Site-Mode branch (Store vs. Coming Soon)

## Phase 3: User Story 1 - Visitor understands brand and finds a shop path fast (Priority: P1) 🎯 MVP

### Tests for User Story 1
- [ ] T004 [P] [US1] Playwright test: 390px viewport, assert brand line + shop CTA visible with zero scroll
- [ ] T005 [P] [US1] Playwright test: change a product's price in WC admin → assert homepage reflects it on next load

### Implementation for User Story 1
**Corrected 2026-10-09** (remediates finding C1-ARCH): T006–T009 each register a real ACF Block (`framework/builder/acf-blocks/<name>/`, editor preview, editorial-framing field group), not just a Blade template — matching Feature 004's registration pattern exactly, per `docs/architecture/ACF-CONTENT-RENDERING-DECISION.md`.
- [ ] T006 [P] [US1] Register the Featured Drop ACF Block: editorial-framing fields (eyebrow, heading override), `blocks/featured-drop.blade.php` calling `HomepageQueries::featuredProducts()` for the live data
- [ ] T007 [P] [US1] Register the New Arrivals ACF Block: `blocks/new-arrivals.blade.php` (snap rail mobile, grid desktop, skeleton loading state), live data from `HomepageQueries::newArrivals()`
- [ ] T008 [P] [US1] Register the Shop by Category ACF Block: `blocks/shop-by-category.blade.php`, hidden in its render callback when `HomepageQueries::categoriesWithProducts()` returns < 2
- [ ] T009 [P] [US1] Register the Spotlight ACF Block: `blocks/spotlight.blade.php` with working color/size/add-to-cart/wishlist (depends on Feature 008's variation components existing)
- [ ] T010 [US1] Compose the homepage by placing all applicable blocks directly in its native block-editor content, in the order: Hero, Featured Drop, Shop by Category, New Arrivals, Manifesto, Spotlight, Packaging, Craftsmanship, Best Sellers, Brand Story, Social, Early Access, FAQ (13 page-content blocks; Announcement/Header/Footer are global template parts per Feature 003, not page blocks, bringing the total to 14 visible sections as originally specified) — **no Flexible Content field or hardcoded Blade section list is involved; this is a content-editing action in wp-admin, not a code task, listed here as this feature's own verification that the corrected composition model actually works end to end**

**Checkpoint**: User Story 1 independently testable.

---

## Phase 4: User Story 2 - Unready content stays invisible (Priority: P2)

### Tests for User Story 2
- [ ] T011 [P] [US2] Test sweep: all 4 combinations of Craftsmanship/Best-Sellers present-absent → assert correct show/hide, zero broken layout

### Implementation for User Story 2
- [ ] T012 [US2] Verify Craftsmanship/Best-Sellers blocks (registered in Feature 004) correctly gate on their specific content/data requirement when placed on this page

**Checkpoint**: Both user stories independently functional.

---

## Phase 5: Polish & Cross-Cutting Concerns

- [ ] T013 Configure full-page caching for the homepage shell with correct cache-exclusion/invalidation for product-dependent fragments (per research.md)
- [ ] T014 Run Lighthouse mobile/4G audit; fix any LCP/weight-budget regression
- [ ] T015 Run full visual regression (6 breakpoints × 2 themes)
- [ ] T016 Run quickstart.md validation end to end

## Dependencies & Execution Order

- Setup/Foundational block User Story 1.
- T009 (Spotlight) soft-depends on Feature 008's variation-selection components existing — can be stubbed with a simpler add-to-cart initially and upgraded later without blocking the rest of this feature.
- User Story 2 depends on User Story 1's sections existing to test the gating around them.
