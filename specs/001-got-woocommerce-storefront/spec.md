# Feature Specification: GØT Master Conversion Contract & Visual Fidelity Baseline

**Feature Branch**: `001-got-woocommerce-storefront`

**Created**: 2026-06-17 | **Refactored**: 2026-10-09 (this refactor retires Feature 001 as an independent implementation track and converts it into a non-implementing reference/governance feature)

**Status**: Draft

**Input**: Originally generated as a generic HTML-to-Sage conversion scaffold (52 implementation tasks). Refactored per `docs/planning/FEATURE-001-TASK-MIGRATION.md`: every real requirement was traced to its actual owning feature (002–018) or marked obsolete with evidence; none were silently dropped. This feature's role going forward is **governance and traceability**, not implementation.

## What this feature is now

Feature 001 is **not implemented on its own**. It owns four things that no single commerce/content feature should own, because they span all of them:

1. **The source-of-truth inventory** — which original document/prototype file is authoritative for which decision (already built in `docs/audit/source-inventory.md`, this feature just points to it rather than duplicating it).
2. **The page/component/section-to-feature ownership map** — for any file in `GØT Design System (2)/`, which of Features 002–018 is responsible for its WordPress implementation (`docs/design/page-mapping.md` and `docs/design/component-mapping.md`, plus the new `docs/design/IMPLEMENTATION-VISUAL-CONTRACT.md`).
3. **The visual fidelity baseline and procedure** — what "faithful to the prototype" concretely means and how it is checked, applied by every feature's own visual-regression tasks rather than re-executed once at the end.
4. **Unresolved source conflicts** — carried forward from `docs/audit/source-conflicts.md`, resolved where the owner has since decided (Acid Lime, inline checkout, BOGO) and still open where not (C-06 wishlist guest-gate, social handle spellings).

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Any contributor can find out which feature owns a given piece of the original design (Priority: P1)

As a developer about to implement a feature, I want to look up any prototype page, component, or section and find the exact Spec Kit feature responsible for its WordPress implementation, so that I never duplicate work or leave something unowned.

**Why this priority**: This is the entire reason Feature 001 continues to exist after the refactor — without it, ownership questions get re-litigated per feature instead of answered once, centrally.

**Independent Test**: Pick any file under `GØT Design System (2)/components/` or `ui_kits/storefront/`, look it up in `docs/design/component-mapping.md` or `page-mapping.md`, and find exactly one owning feature with no ambiguity.

**Acceptance Scenarios**:

1. **Given** a developer has a prototype component in hand, **When** they check the component-mapping table, **Then** exactly one Spec Kit feature (002–018) is listed as its implementation owner.
2. **Given** a developer finds a prototype element with no listed owner, **When** they report it, **Then** it is either assigned an owner or explicitly marked out-of-scope with a reason — never left silently unowned.

---

### User Story 2 - Any reviewer can verify visual fidelity using one consistent method (Priority: P1)

As a reviewer, I want one documented procedure for checking that a built page matches the approved design, so that "visual parity" means the same measurable thing across every feature rather than a different ad hoc check each time.

**Why this priority**: Without a shared method, "100% visual parity" becomes an unverifiable slogan repeated in every feature's plan.md without substance.

**Independent Test**: Apply `docs/design/IMPLEMENTATION-VISUAL-CONTRACT.md`'s procedure to any one built page and confirm it produces a pass/fail/approved-exception result, not a subjective judgment.

**Acceptance Scenarios**:

1. **Given** a built page, **When** the visual contract's procedure is applied, **Then** it yields one of: pass, fail (with a specific diff), or a logged approved exception — never an unverifiable "looks right."
2. **Given** a deviation from the reference is deliberately approved by the brand owner, **When** it is logged, **Then** it is recorded in the approved-differences table, not silently accepted.

### Edge Cases

- What happens when a prototype element has no corresponding WordPress route at all (e.g., a dedicated Cart page, which the prototype never built)? → It is explicitly marked "extension requiring review" in `docs/design/page-mapping.md`, not invented as a new design, and not silently skipped.
- How does this feature handle a source conflict that the owner has not yet resolved? → It remains listed in `docs/audit/source-conflicts.md` as open; no feature proceeds as if it were resolved.

## Requirements *(mandatory)*

- **FR-001**: Every prototype file under `GØT Design System (2)/` MUST have exactly one documented owning feature, or an explicit "out of scope" / "extension requiring review" classification.
- **FR-002**: The visual fidelity procedure MUST be documented once, centrally, and referenced (not re-written) by every feature that builds a visible page.
- **FR-003**: This feature MUST NOT itself register a WordPress theme, plugin, ACF block, CPT, template, or any application code — its deliverables are documents only.
- **FR-004**: Every source conflict identified during planning MUST remain tracked here until explicitly resolved by the owner, with its resolution status kept current.
- **FR-005**: No requirement originally captured in this feature's pre-refactor task list MUST be lost without a recorded disposition (migrated / consolidated / superseded / obsolete-with-evidence).

## Success Criteria *(mandatory)*

- **SC-001**: 100% of prototype files have a documented owner or explicit out-of-scope classification, verified against `docs/design/component-mapping.md` and `page-mapping.md`.
- **SC-002**: Zero features duplicate this feature's visual-fidelity procedure instead of referencing it.
- **SC-003**: Zero implementation tasks exist anywhere in this feature's own `tasks.md` (it has none by design — see `plan.md`).
- **SC-004**: `docs/planning/FEATURE-001-TASK-MIGRATION.md` accounts for all 52 original tasks with a disposition and evidence pointer.

## Assumptions

- This feature produces no deployable code and has no "implementation phase" in the ordinary sense — its tasks.md (see `plan.md`) consists entirely of documentation-maintenance and verification tasks, which is intentional, not an oversight.
