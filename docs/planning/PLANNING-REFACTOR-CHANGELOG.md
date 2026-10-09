# Planning Refactor Changelog

Everything changed in this refactor session (2026-10-09, second audit round), in the order it happened. Each entry names the exact file(s) touched.

## 1. Feature 001 retirement (the core of this refactor)

- `specs/001-got-woocommerce-storefront/spec.md` — rewritten from "HTML to Sage WordPress Conversion" (52-task implementation scaffold) to "GØT Master Conversion Contract & Visual Fidelity Baseline" (documentation/governance only, zero implementation tasks).
- `specs/001-got-woocommerce-storefront/plan.md` — rewritten to reflect the new no-code role.
- `specs/001-got-woocommerce-storefront/tasks.md` — the original 52 implementation tasks removed; replaced with 7 documentation-maintenance/verification tasks.
- `specs/001-got-woocommerce-storefront/quickstart.md` — rewritten (no build/run/deploy steps — this feature has none).
- `specs/001-got-woocommerce-storefront/checklists/requirements.md` — re-validated against the new spec.
- `specs/001-got-woocommerce-storefront/research.md`, `data-model.md` — annotated as historical reference, not active instruction (content otherwise preserved, not deleted).
- **New**: `docs/planning/FEATURE-001-TASK-MIGRATION.md` — full disposition record for all 52 original tasks (12 migrated, 23 consolidated, 9 superseded, 8 obsolete-with-evidence).

## 2. Genuinely missing tasks found during the migration, added to their real owning feature

- `specs/002-wp-woo-sage-foundation/tasks.md` — added T005a (composer/npm install), T005b (framework/ directory scaffold), T012a (.gitignore hygiene), T009a/T009b (Site Mode admin switch — found during the *prior* audit round, re-verified present this round).
- `specs/002-wp-woo-sage-foundation/spec.md` — FR-002 extended (tax config), FR-011 added (Site Mode switch, prior round).
- `specs/004-acf-content-architecture/tasks.md` — added T004a (ACF Options page), T004b (menu-source selectors), T004c (verify every option field changes the frontend).
- `specs/004-acf-content-architecture/spec.md` — FR-008 added (global settings requirement).
- `specs/016-security-accessibility-performance/tasks.md` — added T007a (escaping/sanitization code-review sweep).
- `specs/017-deployment-production-acceptance/tasks.md` — added T007a (no `stock/` references, no stray converter-skill folder, pre-launch check).

## 3. New shared documents

- `docs/design/IMPLEMENTATION-VISUAL-CONTRACT.md` — the single visual-fidelity procedure, replacing the old (and target-incorrect) `stock/`-comparison instruction.
- `docs/planning/FEATURE-001-TASK-MIGRATION.md` (see §1).
- `docs/planning/DELEGATION-AND-EXECUTION-POLICY.md` — delegation rules for the next execution session.
- `docs/planning/FINAL-IMPLEMENTATION-READINESS.md` — this round's final verdict (see that document).
- This changelog.

## 4. Corrections to existing documents

- `docs/planning/REQUIREMENTS-TRACEABILITY-MATRIX.md` — **corrected a real arithmetic error**: the prior summary ("29 rows... 23 covered, 1 partial, 2 post-launch" = 26, not 29) was wrong; the true tally is 25 COVERED + 1 PARTIALLY COVERED + 3 DEFERRED/POST-LAUNCH = 29. The missing row was P2-F005 (floating WhatsApp button), which existed in the table all along but was dropped from the summary paragraph's arithmetic. Status taxonomy also expanded to include DEFERRED/POST-LAUNCH and BLOCKED BY OWNER DECISION as distinct values, per this round's request.
- `docs/planning/MASTER-IMPLEMENTATION-ROADMAP.md` — Feature 001's row and the dependency graph recalculated: 001 no longer has a blocking edge into 002 (it never should have — 001 produces no code 002 needs). Critical path corrected from "8 hops starting at 001" to "7 hops starting at 002." First executable feature corrected from 001 to 002.

## 5. What was deliberately NOT changed

- No approved business decision was reopened (Acid Lime, inline checkout, BOGO/free-shipping all remain exactly as the owner approved them).
- `stock/` and `GØT Design System (2)/` were not touched, moved, or destructively modified.
- No feature's User Story priorities or acceptance criteria were weakened to make coverage numbers look better — every COVERED status in the traceability matrix is backed by an actual task ID, checked this session.
- No application code was written, no `/speckit.implement` was run, nothing was deployed or pushed.

## 6. Net effect on task counts

| | Before this refactor | After |
|---|---|---|
| Feature 001 implementation tasks | 52 | 0 |
| Feature 001 documentation tasks | 0 | 7 |
| New tasks added to Features 002/004/016/017 (genuinely missing requirements) | 0 | 11 |
| Net total tasks across all 18 features | ~411 (400 in 002–018 + 52 in 001, minus the already-counted-once numbers — see note) | 400 (002–018, unchanged in this round except the 11 additions above) + 7 (001) = 407 |

Note: the "~411" figure is illustrative of the scale of change, not a precise before/after reconciliation of every single sub-lettered task — the precise, auditable record is `docs/planning/FEATURE-001-TASK-MIGRATION.md`'s row-by-row disposition table, not this summary table.
