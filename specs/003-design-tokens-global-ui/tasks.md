---
description: "Task list for Feature 003 — Design Tokens and Global UI"
---

# Tasks: Design Tokens and Global UI

**Input**: Design documents from `/specs/003-design-tokens-global-ui/` (spec.md, plan.md, research.md)

**Tests**: Included (visual regression + accessibility are core to this feature's user stories, not optional add-ons).

## Phase 1: Setup

- [ ] T001 Confirm Feature 002's theme/plugin skeleton is active on staging (hard dependency)
- [ ] T002 [P] Configure `tailwind.config.js` to read CSS custom properties from `resources/css/tokens.css`

## Phase 2: Foundational (Blocking Prerequisites)

- [ ] T003 Port `tokens/colors.css` into `resources/css/tokens.css`, applying the approved Acid Lime accent to `--got-cta-bg`, `--color-focus`, and the announcement bar's default treatment in both themes
- [ ] T004 Verify/fix the `--got-ash` undefined-variable question (C-05) — define explicitly as `#A3A3A3` if not found elsewhere
- [ ] T005 [P] Port typography and spacing tokens (`resources/css/tokens.css` additions, per `docs/audit/visual-baseline.md` §2–3)
- [ ] T006 Write the inline no-flash theme-bootstrap `<script>` in `resources/views/layouts/app.blade.php`'s `<head>`, reading `localStorage['got-theme']` → `prefers-color-scheme` → dark fallback

**Checkpoint**: Token foundation ready — all three user stories can now build on it.

## Phase 3: User Story 1 - Visitor reads the site comfortably in dark/light mode (Priority: P1) 🎯 MVP

### Tests for User Story 1

- [ ] T007 [P] [US1] Playwright test: hard reload with dark OS preference, no stored choice → assert no flash of light mode (screenshot-diff at paint time)
- [ ] T008 [P] [US1] axe-core automated contrast scan across both themes → assert zero failures

### Implementation for User Story 1

- [ ] T009 [US1] Build `resources/views/partials/theme-toggle.blade.php` + Alpine component in `resources/js/app.js`, wired to the no-flash script's `data-theme` state
- [ ] T010 [US1] Implement dynamic accessible name ("Switch to light mode" / "Switch to dark mode") on the toggle
- [ ] T011 [US1] Verify graceful behavior when `localStorage` is blocked (try/catch, theme still applies for the page view, no console error)

**Checkpoint**: User Story 1 independently testable — theme system works end to end.

---

## Phase 4: User Story 2 - Visitor always sees consistent global navigation (Priority: P1)

### Tests for User Story 2

- [ ] T012 [P] [US2] Playwright test: visit home/policy-page/product/cart/checkout → assert correct header variant on each
- [ ] T013 [P] [US2] Playwright test: configure 2 announcement messages → assert auto-rotation, pause-on-hover, and zero rotation under `prefers-reduced-motion`

### Implementation for User Story 2

- [ ] T014 [P] [US2] Build `resources/views/partials/header.blade.php` with `store`/`minimal`/`checkout` mode variants per `docs/design/component-mapping.md`
- [ ] T015 [P] [US2] Build `resources/views/partials/footer.blade.php`, link columns sourced from WordPress menus (not hardcoded)
- [ ] T016 [US2] Build `resources/views/partials/announcement-bar.blade.php` + Alpine rotation/pause logic, `aria-live` suppressed on auto-change per the accessibility rule
- [ ] T017 [US2] Build `resources/views/partials/cart-drawer.blade.php` empty-state shell (open/close, focus trap, scroll lock) — no real cart data yet (Feature 010)
- [ ] T018 [US2] Register header/footer WordPress menu locations and seed default menus idempotently (do not overwrite editor-assigned menus)

**Checkpoint**: User Stories 1 and 2 both work independently.

---

## Phase 5: User Story 3 - Keyboard/screen-reader visitor can operate every global control (Priority: P2)

### Tests for User Story 3

- [ ] T019 [P] [US3] Manual keyboard-only walkthrough of header/footer/toggle/announcement bar — zero unreachable controls
- [ ] T020 [P] [US3] Manual screen-reader pass (VoiceOver or NVDA) confirming toggle state announcements and non-disruptive announcement-bar behavior

### Implementation for User Story 3

- [ ] T021 [US3] Fix any gaps found in T019/T020 (focus order, missing labels, focus-trap bugs in the mobile menu/cart drawer)

**Checkpoint**: All three user stories independently functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

- [ ] T022 [P] Update `docs/design/dark-light-tokens.md` and `docs/audit/source-conflicts.md` C-01 to RESOLVED/VERIFIED status
- [ ] T022a [P] Code-level audit of `tokens.css`, `app.css`, and every global-UI Blade/SCSS file for hardcoded `left`/`right`/`margin-left`/`padding-right`-style properties; replace with logical equivalents (`inset-inline-start`, `margin-inline`, `padding-block`, etc.) — **remediates a gap found during the cross-feature audit: RTL-readiness is a PRD §8 requirement with no prior task anywhere**
- [ ] T023 Run full visual regression (6 breakpoints × 2 themes) per `docs/testing/visual-regression-plan.md`
- [ ] T024 Run quickstart.md validation end to end

## Dependencies & Execution Order

- Setup/Foundational block all three user stories.
- User Stories 1 and 2 can proceed in parallel once Phase 2 completes (different files: toggle vs. header/footer/announcement/drawer).
- User Story 3 depends on User Stories 1 and 2 existing (it's an accessibility pass over their output, not independent new UI).
- Polish depends on all three.

## Parallel Example

```bash
# Once Phase 2 (tokens + no-flash script) is done:
Task: "Build theme-toggle Blade + Alpine component"   # US1
Task: "Build header partial with 3 modes"              # US2
Task: "Build footer partial from WP menus"              # US2
Task: "Build announcement-bar partial + rotation logic" # US2
```
