---
description: "Task list for Feature 004 — ACF Content Architecture"
---

# Tasks: ACF Content Architecture

**Input**: Design documents from `/specs/004-acf-content-architecture/` (spec.md, plan.md, research.md, data-model.md)

**Tests**: Manual admin QA tasks included; no automated E2E needed for this feature (no commerce/security logic).

## Phase 1: Setup

- [ ] T001 Confirm ACF Pro is installed and licensed on staging (dependency on Feature 002's environment)
- [ ] T002 [P] Create `framework/builder/blocks.php` with the shared ACF block category registration and a shared render-callback helper

## Phase 2: Foundational

- [ ] ~~T003~~ **Removed** (remediates finding C1-ARCH): the `page_sections` Flexible Content field is no longer part of this architecture. Composition happens directly in the native block editor content — see `docs/architecture/ACF-CONTENT-RENDERING-DECISION.md`. Do not re-add.
- [ ] T004 Confirm each of the 9 blocks (T005–T013 below) is insertable, previewable, and reorderable directly in the native WordPress block editor, with no wrapper field required
- [ ] T004a Register a single global ACF Options page (`got_site_settings`) for site-wide, non-menu editable values that have no other home: logo/wordmark asset, contact email/phone/WhatsApp link, social handles, default schema (organization) data — **migrated from the retired Feature 001's T007**. Every field MUST be optional when a frontend default/fallback exists (no blocked save on an empty logo/link/schema value) — **migrated from T008a** — and the field group MUST contain only fields that are actually rendered somewhere; no speculative/unused/duplicate fields — **migrated from T008c**
- [ ] T004b Add optional menu-source selector fields on the Options page for each global menu area (header primary nav, footer columns): each selector chooses an existing WordPress menu by ID, seeds once from the menu already assigned to that `register_nav_menu()` location when the selector is empty, and falls back to the Appearance → Menus assignment when still blank — never hardcodes a menu ID — **migrated from the retired Feature 001's T008d**. This is distinct from Feature 003's menu *location registration* (which this task's fallback depends on) and must not duplicate link data in an ACF repeater — **migrated from T019c/T019f**
- [ ] T004c Verify every Options-page field actually changes the rendered frontend when edited in wp-admin (a direct manual check per field, not an assumption) — **migrated from the retired Feature 001's T019b**

**Checkpoint**: Composition mechanism and global options ready — individual blocks can now be added as layouts.

## Phase 3: User Story 1 - Editor builds/reorders a page without a developer (Priority: P1) 🎯 MVP

### Implementation for User Story 1

- [ ] T005 [P] [US1] Register Hero block: fields, `resources/views/blocks/hero.blade.php`, SCSS, editor preview
- [ ] T006 [P] [US1] Register Drop Intro block (incl. the product-relationship field per data-model.md), Blade template, SCSS
- [ ] T007 [P] [US1] Register Editorial Split block, Blade template, SCSS
- [ ] T008 [P] [US1] Register Manifesto block (repeater fields), Blade template, SCSS
- [ ] T009 [P] [US1] Register Packaging Story block (repeater fields), Blade template, SCSS
- [ ] T010 [P] [US1] Register Social Gallery block (repeater fields), Blade template, SCSS
- [ ] T011 [P] [US1] Register Newsletter block, Blade template, SCSS (reuses the `EarlyAccessForm`-style component from Feature 005 where applicable)
- [ ] T012 [P] [US1] Register FAQ block (repeater fields, reuses the `Accordion` component mapping), Blade template, SCSS
- [ ] T013 [P] [US1] Register Brand Story block (repeater fields), Blade template, SCSS
- [ ] T014 [US1] Manual QA: add/reorder/remove each block on a test page as a Content Editor-role user; confirm no developer/code step was needed

**Checkpoint**: User Story 1 independently testable — a full page can be composed and reordered.

---

## Phase 4: User Story 2 - Visitor never sees a broken/empty section (Priority: P1)

### Tests for User Story 2

- [ ] T015 [P] [US2] For each of the 9 blocks, manual QA: leave its minimum-required field(s) empty, save, view live → assert the section is entirely absent
- [ ] T016 [P] [US2] For each of the 9 blocks, fill the minimum-required field(s), save, view live → assert the section now renders correctly

### Implementation for User Story 2

- [ ] T017 [US2] Implement the per-block "required for render" guard (per `data-model.md`'s table) in each block's render callback
- [ ] T018 [US2] Verify a page with every section empty still renders its header/footer correctly (no blank-page regression)

**Checkpoint**: Both user stories independently functional.

---

## Phase 5: Polish & Cross-Cutting Concerns

- [ ] T019 [P] Document each block's registration/fields/template/visual-parity checklist directly in this feature's own `data-model.md` and in `docs/design/IMPLEMENTATION-VISUAL-CONTRACT.md` — **corrected during the planning refactor**: this task previously pointed at the generic converter's `.html-to-sage/ACF-BLOCKS.md`, which is redundant with (and less accurate than) this feature's own Spec Kit artifacts
- [ ] T020 Compose a test page from these 9 blocks, placed and reordered directly in the native block editor, as a real test of "homepage is not a special hardcoded template" — the actual homepage composition (which also includes Feature 006's commerce-driven blocks, registered the same way) is finished in Feature 006, not here
- [ ] T021 Run quickstart.md validation end to end

## Dependencies & Execution Order

- Setup/Foundational block User Story 1.
- All 9 block-registration tasks in User Story 1 (T005–T013) are mutually independent ([P]) — different files each.
- User Story 2's guard logic (T017) touches the same 9 block files as User Story 1's registration (T005–T013), so in practice each block is finished (registered AND guarded) before moving to the next, even though the two user stories are conceptually separable.

## Parallel Example

```bash
Task: "Register Hero block + template"
Task: "Register Manifesto block + template"
Task: "Register FAQ block + template"
# ...all 9 blocks can be built in parallel by different contributors; each is a self-contained folder.
```
