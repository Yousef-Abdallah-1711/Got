---
description: "Task list for Feature 015 — Content Pages, SEO, and Consent-Gated Analytics"
---

# Tasks: Content Pages, SEO, and Consent-Gated Analytics

**Input**: Design documents from `/specs/015-content-pages-seo-analytics/` (spec.md, plan.md, research.md)

## Phase 1: Setup
- [ ] T001 Confirm Feature 004 (ACF blocks, reusable for page layout) exists

## Phase 2: Foundational
- [ ] T002 Build `app/Support/Seo.php`: canonical URL + JSON-LD + Open Graph output helpers
- [ ] T003 [P] Build `components/consent-banner.blade.php` + `resources/js/consent.js`

**Checkpoint**: SEO helper and consent mechanism ready.

## Phase 3: User Story 1 - Visitor reads brand/policy content (Priority: P1) 🎯 MVP

### Tests for User Story 1
- [ ] T004 [P] [US1] Playwright test: every footer/checkout policy link resolves, no 404s
- [ ] T005 [P] [US1] Content review: About page claims checked against the approved brand-fact list

### Implementation for User Story 1
- [ ] T006 [P] [US1] Build `pages/about.blade.php`
- [ ] T007 [P] [US1] Build `pages/contact.blade.php`
- [ ] T008 [P] [US1] Build `pages/faq.blade.php` (reuses `Accordion`)
- [ ] T009 [P] [US1] Build `pages/shipping-policy.blade.php`
- [ ] T010 [P] [US1] Build `pages/returns-exchanges.blade.php`
- [ ] T011 [P] [US1] Build `pages/privacy-policy.blade.php`
- [ ] T012 [P] [US1] Build `pages/terms-conditions.blade.php`
- [ ] T013 [P] [US1] Build `pages/cookie-policy.blade.php`
- [ ] T014 [US1] Wire all 8 pages into the footer and link the relevant two (terms/privacy) into checkout

**Checkpoint**: User Story 1 independently testable.

---

## Phase 4: User Story 2 - Consent-respecting funnel measurement (Priority: P2)

### Tests for User Story 2
- [ ] T015 [P] [US2] Network-level test: no consent response → zero analytics requests across a full browse
- [ ] T016 [P] [US2] Network-level test: consent rejected → zero analytics requests
- [ ] T017 [P] [US2] Playwright test: consent accepted → all 4 funnel events fire correctly, purchase event exactly once even after a confirmation-page refresh

### Implementation for User Story 2
- [ ] T018 [US2] Implement the GTM-tag-conditionally-inserted-into-HTML mechanism (per research.md's "gated at the network level" decision)
- [ ] T019 [US2] Wire `view_item`/`add_to_cart`/`begin_checkout`/`purchase` event firing at the correct points, purchase tied to the confirmation page's real order (not optimistic client-side firing)
- [ ] T020 [US2] Wire the footer's "change consent" link

**Checkpoint**: Both user stories independently functional.

---

## Phase 5: Polish & Cross-Cutting Concerns
- [ ] T021 Generate/verify the XML sitemap and robots.txt
- [ ] T022 Validate schema output has zero duplication across pages
- [ ] T023 Run quickstart.md validation end to end

## Dependencies & Execution Order
- Setup/Foundational block both user stories.
- Final publishing of real (not placeholder) legal text is gated on legal review, tracked outside this feature's own engineering Definition of Done.
