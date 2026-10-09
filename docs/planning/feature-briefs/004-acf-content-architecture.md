**Status: PROPOSED feature brief — not yet run through full Spec Kit specify/plan/tasks workflow. Run `/speckit.specify` when this feature is scheduled to start.**

**Superseded for implementation purposes by `specs/004-acf-content-architecture/spec.md`, `plan.md`, and `tasks.md`** (generated via the real Spec Kit workflow). This brief is kept as the original planning rationale and is not updated further; treat the Spec Kit artifacts as authoritative for scope, acceptance criteria, and tasks.

# 004 — ACF Content Architecture and Editable Sections

## Summary
Register the ACF Block architecture decided in ADR 0004: one block per editorial section (Hero, Drop Intro, Editorial Split, Manifesto, Packaging Story, Social Gallery, Newsletter, FAQ, Brand Story), each with code-owned fields, Blade template, SCSS, editor preview, composed via a page-level Flexible Content field — never one monolithic homepage block, never hardcoded content in templates.

## Scope
**In**: ACF Block registration framework (`framework/builder/acf-blocks/`, `framework/builder/blocks.php` per constitution), field groups for every editorial section, Flexible Content field on page/homepage templates, Media Library seeding plan for each block's images per `docs/audit/missing-assets.md`.
**Out**: the actual editorial copy/images (brand-owner-supplied, tracked as a blocker, not an engineering task), WooCommerce product/category rendering (that's native WooCommerce templates, not ACF, per constitution — see 006/007/008).

## Dependencies
Hard: 002. Soft: 003 (blocks compose inside the global layout/header/footer built there).

## Acceptance Criteria
- [ ] Every block registers with: fields, frontend Blade template, SCSS file, optional JS module, editor preview, visual-parity checklist entry.
- [ ] No block hardcodes client-editable content — every text/image field is ACF-editable.
- [ ] A block renders nothing (not a broken layout) when its required content is empty — matching `home-content.js`'s `null = hidden` pattern exactly.
- [ ] Homepage composes its 14 sections (minus 2 intentionally-hidden-until-ready ones) via the Flexible Content field, reorderable by a Content Editor without a code deploy.

## Risk Register
- Risk of recreating the "one giant block" anti-pattern under time pressure — mitigated by this brief's explicit per-section registration requirement.
- Media Library seeding complexity (many image slots across many blocks) — tracked against `docs/audit/missing-assets.md`'s asset list.

## Testing Requirements
Manual admin QA: toggle each block's fields empty/filled, verify correct show/hide behavior. Code review against the constitution's ACF editability rules. No E2E needed yet (no commerce logic in this feature).

## Visual Parity Requirements
Per-block, against `docs/design/visual-parity-matrix.md`'s checklist — each block is its own parity-review unit.

## Definition of Done
All editorial blocks registered and documented in `.html-to-sage/ACF-BLOCKS.md`-equivalent (real, filled-in version, not the generic scaffold); homepage and About page both successfully compose sections via the Flexible Content field; Content Editor role can reorder sections without developer help (PRD Persona 3 goal, adapted).
