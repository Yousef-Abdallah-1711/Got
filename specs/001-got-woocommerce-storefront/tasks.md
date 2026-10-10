# Tasks: GØT Master Conversion Contract & Visual Fidelity Baseline

**Input**: `spec.md`, `plan.md`, `docs/planning/FEATURE-001-TASK-MIGRATION.md`

**Note on this file**: unlike every other feature's `tasks.md`, this one contains **zero implementation tasks** — by design, per `spec.md` FR-003. Its tasks are documentation-maintenance and verification tasks only. The original 52-task implementation scaffold that used to live in this file has been fully migrated/dispositioned; see `docs/planning/FEATURE-001-TASK-MIGRATION.md` for the complete record. Do not re-add implementation tasks here — add them to the feature that actually owns the code.

## Phase 1: Setup

- [x] T001 Confirm `docs/planning/FEATURE-001-TASK-MIGRATION.md` exists and accounts for all 52 original tasks with a disposition and evidence pointer (self-check of this refactor's own completeness) — **REVALIDATED 2026-10-10**: migration register still accounts for 52 task identities across the six phases (some identities are grouped in one row, e.g. T020–T022); evidence pointers and dispositions are present. See `docs/implementation/MASTER-EXECUTION-STATUS.md`.

## Phase 2: Foundational

- [x] T002 Confirm `docs/design/page-mapping.md` and `docs/design/component-mapping.md` together cover 100% of `GØT Design System (2)/`'s pages and components with exactly one owning feature each, or an explicit out-of-scope/extension-requiring-review classification — **REVALIDATED 2026-10-10**: the 26 component contracts have one owning feature each; the page map now has a correctly ordered owner column for all 29 tracked page/route entries, covering the 12 prototype page modules and explicit extension/missing-source cases. Page-local compositions have explicit owners too.
- [x] T003 Confirm `docs/design/IMPLEMENTATION-VISUAL-CONTRACT.md` exists and is referenced (not duplicated) by every feature whose `plan.md` discusses visual parity — **REVALIDATED 2026-10-10**: among the checked feature plans, 001, 003, and 006 discuss visual parity/fidelity; each references the shared contract. No procedure copy was found in those plans.

## Phase 3: User Story 1 - Any contributor can find the owning feature for any prototype element (Priority: P1)

### Tests for User Story 1

- [x] T004 [P] [US1] Spot-check: pick 5 random files from `GØT Design System (2)/components/` and `ui_kits/storefront/`, confirm each resolves to exactly one owning feature in the mapping documents — **REVALIDATED 2026-10-10**: ProductCard → 007, Header → 003, CartDrawer → 010, FilterBar → 007, and OrderSummary → 010; each has one explicit owner.

### Implementation for User Story 1 (documentation maintenance, not code)

- [ ] T005 [US1] Whenever a new prototype element is discovered without a mapped owner during implementation of any later feature, add it to `docs/design/component-mapping.md` or `page-mapping.md` with its owner — this is an ongoing maintenance task for the life of the project, not a one-time task — **STANDING** (intentionally left unchecked per this file's own Dependencies note: "not a task that gets checked off once"). All currently discovered pages, components, and page-local compositions have owners as of 2026-10-10.

## Phase 4: User Story 2 - Any reviewer can verify visual fidelity consistently (Priority: P1)

### Tests for User Story 2

- [ ] T006 [P] [US2] Apply `docs/design/IMPLEMENTATION-VISUAL-CONTRACT.md`'s procedure to one already-built artifact from this session and confirm it yields a pass/fail/approved-exception result — **DEFERRED, correctly unchecked**: the live WordPress homepage is the Feature 002 skeleton placeholder (“GOT Sage theme skeleton …”), not a substantive page matching a prototype, so a fidelity comparison would be fabricated. Activate this check when Feature 005 or later renders the first substantive page with a suitable prototype reference (expected candidates: Coming Soon or Store home); compare matching viewport/state per the shared contract.

### Implementation for User Story 2

- [ ] T007 [US2] Keep `docs/audit/source-conflicts.md` current: mark each conflict RESOLVED with a decision date the moment the owner decides, and leave it OPEN otherwise — never let a feature's `plan.md` assume a resolution this register doesn't yet confirm — **STANDING** (intentionally left unchecked, same reasoning as T005). Revalidated 2026-10-10: C-01 is owner-resolved; C-05 is resolved from direct source verification (`--got-ash: #A3A3A3`); C-02, C-03, C-06 and C-08 remain open owner decisions, C-04 font licensing remains open, and C-07 remains an implementation gap rather than a business decision.

## Dependencies & Execution Order

- This feature has no hard dependency on any other feature completing first — it is reference material, consumed continuously by Features 002–018, not sequenced against them.
- T005 and T007 are **standing** tasks for the life of the project, not tasks that get checked off once.

## Implementation Strategy

There is no "implementation" in the code sense. This feature's only deliverable is keeping the documents in `plan.md`'s Project Structure section accurate as Features 002–018 actually get built — treat it as a living reference, re-verified at each feature's own completion gate (per `docs/planning/MASTER-IMPLEMENTATION-ROADMAP.md` §3's gate sequence: "check design fidelity" explicitly points back here).
