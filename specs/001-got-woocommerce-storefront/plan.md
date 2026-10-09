# Implementation Plan: GØT Master Conversion Contract & Visual Fidelity Baseline

**Branch**: `001-got-woocommerce-storefront` | **Date**: 2026-10-09 (refactored) | **Spec**: `spec.md`

## Summary

This feature produces and maintains **documents only** — it owns the source-ownership map, the visual-fidelity procedure, and the open-conflicts register that every other feature (002–018) references. It does not scaffold a theme, register a block, or write a line of application code. Its original 52-task implementation scaffold has been fully migrated or dispositioned per `docs/planning/FEATURE-001-TASK-MIGRATION.md`.

## Technical Context

**Language/Version**: N/A — Markdown documentation only.

**Primary Dependencies**: None (no code dependency; references other features' artifacts).

**Storage**: N/A.

**Target Platform**: N/A.

**Project Type**: Documentation/governance feature.

**Constraints**: MUST NOT contain implementation tasks. MUST NOT duplicate content that Features 002–018 already own — it points to their artifacts rather than restating them.

## Constitution Check

| Principle | Check | Status |
|---|---|---|
| 1 — Existing design is visual source of truth | This feature's entire purpose is enforcing that, centrally | PASS |
| 2 — No unapproved visual redesign | The conflicts register (`docs/audit/source-conflicts.md`) is how deviations get caught, not silently allowed | PASS |
| 7 — Theme/plugin boundary | N/A — this feature has neither | PASS (vacuously) |

No violations.

## Project Structure

This feature has no `wp-content/` footprint. Its only "structure" is the set of documents it owns or references:

```text
docs/
  audit/source-inventory.md              (referenced, not owned)
  audit/source-conflicts.md              (owned — kept current)
  design/page-mapping.md                 (referenced, not owned)
  design/component-mapping.md            (referenced, not owned)
  design/IMPLEMENTATION-VISUAL-CONTRACT.md  (owned — the fidelity procedure)
  planning/FEATURE-001-TASK-MIGRATION.md    (owned — this refactor's own audit trail)
```

**Structure Decision**: No source code structure applies. This is the one feature in the project explicitly exempted from the "Project Structure" convention other features use, because it builds nothing.

## What changed in this refactor (2026-10-09)

- Retired as an independent implementation track. All 52 original tasks dispositioned in `docs/planning/FEATURE-001-TASK-MIGRATION.md`.
- 12 tasks representing genuinely unowned real requirements were migrated into Features 002, 004, 016, and 017 (see the migration record for exact task IDs).
- `docs/design/IMPLEMENTATION-VISUAL-CONTRACT.md` created as the single shared visual-fidelity procedure this feature now points every other feature at, replacing the old `stock/`-comparison instruction (T020–T022), which compared against the wrong artifact (a file backup, not a renderable reference).
