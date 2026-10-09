---
description: "Task list for Feature 017 — Production Deployment and Launch Acceptance"
---

# Tasks: Production Deployment and Launch Acceptance

**Input**: Design documents from `/specs/017-deployment-production-acceptance/` (spec.md, plan.md, research.md)

**Hard dependency**: Feature 016's hardening gate must have passed on staging first.

## Phase 1: Setup
- [ ] T001 Provision the production environment to the staging specification (ADR 0012's criteria)
- [ ] T002 [P] Configure the manual-approval-gated production deploy workflow (extends Feature 002's CI)

## Phase 2: Foundational
- [ ] T003 Deploy the fully-built, Feature-016-hardened codebase to production (code only — no customer traffic yet / Site Mode still Coming Soon)
- [ ] T004 [P] Configure production monitoring (uptime, error rate, email delivery)

**Checkpoint**: Production environment exists and runs the real codebase.

## Phase 3: User Story 1 - Owner can trust production is ready and recoverable (Priority: P1) 🎯 Launch gate

### Tests for User Story 1
- [ ] T005 [P] [US1] Run the 7-flow production smoke test (homepage/shop/product/cart/COD checkout/confirmation email/early-access sign-up)
- [ ] T006 [P] [US1] Run the backup-restore drill to a scratch environment; verify data integrity
- [ ] T007 [P] [US1] Trigger a test alert on each monitored signal (uptime/error-rate/email-delivery); confirm each fires
- [ ] T007a [P] [US1] Code-level sweep of the delivered theme/plugin for any reference to `stock/` (the preserved original-source backup folder) in a frontend template or stylesheet, and for the `html-to-wordpress-converter` skill repository folder accidentally existing inside `wp-content/themes` — both must be absent before go-live — **migrated from the retired Feature 001's T019/T033/T034**

### Implementation for User Story 1
- [ ] T008 [US1] Fix any failure found in T005–T007a and re-run until all pass
- [ ] T009 [US1] Confirm the preconditions for Store Mode switch: ≥1 published in-stock product, written launch-date confirmation on file, all legal/policy content published

**Checkpoint**: User Story 1 independently testable — production is verified ready.

---

## Phase 4: User Story 2 - Early-access subscribers aren't lost (Priority: P2)

### Tests for User Story 2
- [ ] T010 [P] [US2] Run `early-access-migration.php` against a copy of the confirmed subscriber list; verify count and consent-data match in the production email tool

### Implementation for User Story 2
- [ ] T011 [US2] Fix any discrepancy found in T010; re-run until the migration is verified complete

**Checkpoint**: Both user stories independently functional.

---

## Phase 5: Polish & Cross-Cutting Concerns
- [ ] T012 Flip Site Mode to Store on production, only after T008/T009/T011 all pass and written approval is on file
- [ ] T013 Re-run the smoke test once more against the now-live site
- [ ] T014 Run quickstart.md validation end to end as the final record of this feature's completion

## Dependencies & Execution Order
- Every task in this feature is sequential by nature (provision → deploy → verify → migrate → approve → switch) — this is the one feature in the roadmap where parallelization across user stories is deliberately minimal, since each step gates the next in a real production cutover.
