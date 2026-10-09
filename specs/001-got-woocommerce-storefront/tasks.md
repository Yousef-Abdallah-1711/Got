# Tasks: GØT Master Conversion Contract & Visual Fidelity Baseline

**Input**: `spec.md`, `plan.md`, `docs/planning/FEATURE-001-TASK-MIGRATION.md`

**Note on this file**: unlike every other feature's `tasks.md`, this one contains **zero implementation tasks** — by design, per `spec.md` FR-003. Its tasks are documentation-maintenance and verification tasks only. The original 52-task implementation scaffold that used to live in this file has been fully migrated/dispositioned; see `docs/planning/FEATURE-001-TASK-MIGRATION.md` for the complete record. Do not re-add implementation tasks here — add them to the feature that actually owns the code.

## Phase 1: Setup

- [x] T001 Confirm `docs/planning/FEATURE-001-TASK-MIGRATION.md` exists and accounts for all 52 original tasks with a disposition and evidence pointer (self-check of this refactor's own completeness) — **VERIFIED 2026-10-09**: sums to 52 (5+13+4+11+7+12), spot-checked evidence task IDs exist with matching back-references. See `docs/implementation/MASTER-EXECUTION-STATUS.md`.

## Phase 2: Foundational

- [x] T002 Confirm `docs/design/page-mapping.md` and `docs/design/component-mapping.md` together cover 100% of `GØT Design System (2)/`'s pages and components with exactly one owning feature each, or an explicit out-of-scope/extension-requiring-review classification — **VERIFIED 2026-10-09**: all 26 real components and 12 prototype pages accounted for; fixed a stale "25 components" count found during verification.
- [x] T003 Confirm `docs/design/IMPLEMENTATION-VISUAL-CONTRACT.md` exists and is referenced (not duplicated) by every feature whose `plan.md` discusses visual parity — **VERIFIED 2026-10-09** (after a fix): Features 003 and 006 were duplicating the procedure instead of referencing it; corrected both `plan.md` files to cite the contract doc.

## Phase 3: User Story 1 - Any contributor can find the owning feature for any prototype element (Priority: P1)

### Tests for User Story 1

- [x] T004 [P] [US1] Spot-check: pick 5 random files from `GØT Design System (2)/components/` and `ui_kits/storefront/`, confirm each resolves to exactly one owning feature in the mapping documents — **VERIFIED 2026-10-09**: ProductCard, Header, CartDrawer, FilterBar, OrderSummary each resolve to exactly one building feature.

### Implementation for User Story 1 (documentation maintenance, not code)

- [ ] T005 [US1] Whenever a new prototype element is discovered without a mapped owner during implementation of any later feature, add it to `docs/design/component-mapping.md` or `page-mapping.md` with its owner — this is an ongoing maintenance task for the life of the project, not a one-time task — **STANDING** (intentionally left unchecked per this file's own Dependencies note: "not a task that gets checked off once"). Applied 2026-10-09 via the T002 fix.

## Phase 4: User Story 2 - Any reviewer can verify visual fidelity consistently (Priority: P1)

### Tests for User Story 2

- [ ] T006 [P] [US2] Apply `docs/design/IMPLEMENTATION-VISUAL-CONTRACT.md`'s procedure to one already-built artifact from this session (there is none yet — this task activates once Feature 002+ produces a first renderable page) and confirm it yields a pass/fail/approved-exception result — **DEFERRED, correctly unchecked**: no renderable artifact exists yet (Feature 002 has not shipped code). Do not check this box until a real page exists to compare.

### Implementation for User Story 2

- [ ] T007 [US2] Keep `docs/audit/source-conflicts.md` current: mark each conflict RESOLVED with a decision date the moment the owner decides, and leave it OPEN otherwise — never let a feature's `plan.md` assume a resolution this register doesn't yet confirm — **STANDING** (intentionally left unchecked, same reasoning as T005). Applied 2026-10-09: C-01 Acid Lime was resolved (owner-confirmed) and the register updated with a decision date.

## Dependencies & Execution Order

- This feature has no hard dependency on any other feature completing first — it is reference material, consumed continuously by Features 002–018, not sequenced against them.
- T005 and T007 are **standing** tasks for the life of the project, not tasks that get checked off once.

## Implementation Strategy

There is no "implementation" in the code sense. This feature's only deliverable is keeping the documents in `plan.md`'s Project Structure section accurate as Features 002–018 actually get built — treat it as a living reference, re-verified at each feature's own completion gate (per `docs/planning/MASTER-IMPLEMENTATION-ROADMAP.md` §3's gate sequence: "check design fidelity" explicitly points back here).
