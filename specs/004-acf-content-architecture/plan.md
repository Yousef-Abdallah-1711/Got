# Implementation Plan: ACF Content Architecture

**Branch**: `004-acf-content-architecture` | **Date**: 2026-10-09 | **Spec**: [spec.md](./spec.md)

## Summary

Register 9 ACF Blocks (Hero, Drop Intro, Editorial Split, Manifesto, Packaging Story, Social Gallery, Newsletter, FAQ, Brand Story), each with code-owned fields, a Blade frontend template, SCSS, optional JS, editor preview, and a "render nothing unless required content exists" guard — composed on any page (including the homepage) **directly in the native WordPress block editor content**, with no separate Flexible Content wrapper field. Per ADR 0004, **corrected 2026-10-09 per `docs/architecture/ACF-CONTENT-RENDERING-DECISION.md` (finding C1-ARCH)** — the original plan additionally specified a `page_sections` Flexible Content field, which created a second, competing composition model once Feature 006's commerce sections were added outside it. That field is removed; the block editor's own content sequence is now the single composition mechanism.

## Technical Context

**Language/Version**: PHP 8.3+ (raised 2026-10-09 for Sage 11/Acorn v6, see docs/adr/0001-sage-version.md), ACF Pro (6.x), Blade.
**Primary Dependencies**: ACF Pro, WordPress Media Library (for image fields).
**Storage**: ACF field data stored as WordPress post meta on each page.
**Testing**: Manual admin QA (toggle fields empty/filled per block) + code review against editability rules; no E2E needed (no commerce logic).
**Target Platform**: Same as prior features.
**Performance Goals**: N/A beyond standard page-weight budgets (enforced starting Feature 006).
**Constraints**: Constitution HTML-to-Sage Principle II/III (never flatten into one block; code-owned fields); never model WooCommerce data as ACF fields.
**Scale/Scope**: 9 block types, reusable across every content page in the site (Homepage, About, Contact, FAQ).

## Constitution Check

| Principle | Check | Status |
|---|---|---|
| II — Section-by-section, no monolith block | 9 distinct blocks, not 1 flexible monolith | PASS |
| III — ACF Pro + code-owned fields | Field groups registered in code (`register_field_group` in PHP), not builder-only | PASS |
| IV — ACF editability without hardcoding | Every text/image field editable; structural wrappers stay in Blade | PASS |
| V — Justified CPTs only | No CPT introduced by this feature — pages use the native Page post type | PASS |

No violations.

## Project Structure

### Documentation (this feature)
```text
specs/004-acf-content-architecture/
├── plan.md
├── research.md
├── data-model.md        # the 9 section content models
├── quickstart.md
└── tasks.md
# No contracts/ — no new API surface.
```

### Source Code
```text
wp-content/themes/got-sage/
  framework/
    builder/
      blocks.php                    # shared ACF block registration + render callback
      acf-blocks/
        hero/{register.php,fields.json}
        drop-intro/{register.php,fields.json}
        editorial-split/{register.php,fields.json}
        manifesto/{register.php,fields.json}
        packaging-story/{register.php,fields.json}
        social-gallery/{register.php,fields.json}
        newsletter/{register.php,fields.json}
        faq/{register.php,fields.json}
        brand-story/{register.php,fields.json}
  resources/views/blocks/{hero,drop-intro,editorial-split,manifesto,packaging-story,social-gallery,newsletter,faq,brand-story}.blade.php
  resources/css/blocks/{...}.scss   # one partial per block
```

**Structure Decision**: One self-contained folder per block under `framework/builder/acf-blocks/`, matching the constitution's "every ACF block defines registration, fields, frontend template, SCSS, optional JS, editor preview, visual-parity checklist" requirement exactly.

## Complexity Tracking
*No violations.*
