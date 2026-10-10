---
description: "Task list for Feature 003 — Design Tokens and Global UI"
---

# Tasks: Design Tokens and Global UI

**Input**: Design documents from `/specs/003-design-tokens-global-ui/` (spec.md, plan.md, research.md)

**Tests**: Included (visual regression + accessibility are core to this feature's user stories, not optional add-ons).

## Phase 1: Setup

- [x] T001 Verify the local implementation prerequisite: a functioning WordPress site at `http://got.local`, with GOT Sage and GOT Commerce active and required development dependencies installed — **VERIFIED LOCALLY, READ-ONLY (2026-10-10)**: Edge loaded the Feature 002 skeleton homepage after one transient connection-refused response; WP Admin showed GOT Sage active and ACF PRO 6.5.0.1, GOT Commerce 0.1.0, and WooCommerce 11.2.1 active; theme/plugin Composer autoloaders and theme Vite/npm dependencies are present. No WordPress settings or data were changed. This verifies local implementation eligibility only.
- [ ] T001a Before claiming staging acceptance or production deployment, provision a separate staging environment and verify GOT Sage/GOT Commerce activation, HTTPS, and the required CI/deployment checks (Feature 002 T001/T002/T010/T011/T014/T016–T019) — **OPEN — EXTERNAL INFRASTRUCTURE**: requires an owner-provisioned staging URL with HTTPS, the theme/plugin activated there, authorized credentials for read-only acceptance, and passing remote CI/deployment evidence for the listed Feature 002 gates. Local `got.local` results do not satisfy this gate; do not change Coming Soon mode or create test data on the local site to substitute.
- [x] T002 [P] Wire Tailwind v4's CSS-first `@theme` block in `resources/css/app.css` to the custom properties defined in `resources/css/tokens.css` (no `tailwind.config.js` — Sage 11 ships Tailwind v4, see `docs/adr/0001-sage-version.md`, updated 2026-10-09 from the originally-planned Tailwind-3 JS-config approach); expose supported color, typography, layout, shadow, easing, and responsive utilities, with durations, focus widths, and stacking available as CSS variables/custom-property utilities.

## Phase 2: Foundational (Blocking Prerequisites)

- [x] T003 Port `tokens/colors.css` into `resources/css/tokens.css`, applying the approved Acid Lime accent to `--got-cta-bg`, `--color-focus`, and the announcement bar's default treatment in both themes; all 126 unique custom-property names across the supplied color, type, spacing, and effect files now have a corresponding theme definition.
- [x] T004 Preserve the verified `--got-ash: #A3A3A3` source token when porting `tokens/colors.css` and confirm `--got-text-muted` resolves to that value (C-05 resolved 2026-10-10)
- [x] T005 [P] Port typography and spacing tokens (`resources/css/tokens.css` additions, per `docs/audit/visual-baseline.md` §2–3)
- [x] T006 Write the inline no-flash theme-bootstrap `<script>` in `resources/views/layouts/app.blade.php`'s `<head>`, reading `localStorage['got-theme']` → `prefers-color-scheme` → dark fallback

**Checkpoint**: Token foundation ready — all three user stories can now build on it.

## Phase 3: User Story 1 - Visitor reads the site comfortably in dark/light mode (Priority: P1) 🎯 MVP

### Tests for User Story 1

- [x] T007 [P] [US1] Playwright test: hard reload with dark OS preference, no stored choice → assert no flash of light mode (screenshot-diff at paint time)
- [x] T008 [P] [US1] axe-core automated contrast scan across both themes → assert zero failures — current evidence covers the Coming Soon homepage in dark and light themes; complete all-surface coverage is tracked separately under convergence T026.

### Implementation for User Story 1

- [x] T009 [US1] Build `resources/views/partials/theme-toggle.blade.php` + Alpine component in `resources/js/app.js`, wired to the no-flash script's `data-theme` state
- [x] T010 [US1] Implement dynamic accessible name ("Switch to light mode" / "Switch to dark mode") on the toggle
- [x] T011 [US1] Verify graceful behavior when `localStorage` is blocked (try/catch, theme still applies for the page view, no console error)

**Checkpoint**: User Story 1 independently testable — theme system works end to end.

---

## Phase 4: User Story 2 - Visitor always sees consistent global navigation (Priority: P1)

### Tests for User Story 2

- [ ] T012 [P] [US2] Playwright test: visit home/policy-page/product/cart/checkout → assert correct header variant on each — **OPEN**: the anonymous `/shop/` E2E is skipped because WooCommerce Coming Soon visibility hides store templates; the policy route returns 404, no approved published product page exists, and empty-cart checkout redirects. Gate: use an authorized non-production/staging fixture after approved policy content, a published test product, and a non-empty cart are available; assert minimal/store/checkout variants without changing local Coming Soon settings or Product ID 12.
- [x] T013 [P] [US2] Playwright test: configure 2 announcement messages → assert auto-rotation, pause-on-hover, and zero rotation under `prefers-reduced-motion`

### Implementation for User Story 2

- [x] T014 [P] [US2] Build `resources/views/partials/header.blade.php` with `store`/`minimal`/`checkout` mode variants per `docs/design/component-mapping.md`
- [x] T015 [P] [US2] Build `resources/views/partials/footer.blade.php`, link columns sourced from WordPress menus (not hardcoded)
- [x] T016 [US2] Build `resources/views/partials/announcement-bar.blade.php` + Alpine rotation/pause logic, `aria-live` suppressed on auto-change per the accessibility rule
- [x] T017 [US2] Build `resources/views/partials/cart-drawer.blade.php` empty-state shell (open/close, focus trap, scroll lock) — no real cart data yet (Feature 010)
- [x] T018 [US2] Register header/footer WordPress menu locations and seed default menus idempotently (do not overwrite editor-assigned menus)

**Checkpoint**: User Stories 1 and 2 both work independently.

---

## Phase 5: User Story 3 - Keyboard/screen-reader visitor can operate every global control (Priority: P2)

### Tests for User Story 3

- [x] T019 [P] [US3] Manual keyboard-only walkthrough of header/footer/toggle/announcement bar — zero unreachable controls
- [ ] T020 [P] [US3] Manual screen-reader pass (VoiceOver or NVDA) confirming toggle state announcements and non-disruptive announcement-bar behavior — **OPEN**: no real VoiceOver/NVDA pass is recorded; browser accessibility-tree inspection and axe are not substitutes. Gate: run with VoiceOver on supported macOS/Safari or NVDA on supported Windows/browser, verify the toggle announces the next action/state after activation, and confirm automatic announcement rotation is not repeatedly announced while the current message remains readable on request; record platform/version and results.

### Implementation for User Story 3

- [x] T021 [US3] Fix any gaps found in T019/T020 (focus order, missing labels, focus-trap bugs in the mobile menu/cart drawer)

**Checkpoint**: All three user stories independently functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

- [x] T022 [P] Update `docs/design/dark-light-tokens.md` and `docs/audit/source-conflicts.md` C-01 to RESOLVED/VERIFIED status — **DONE 2026-10-10 as documentation maintenance only**: both references reflect the owner-approved Acid Lime decision and optional silver override; Feature 003 implementation proceeded after this documentation update.
- [x] T022a [P] Code-level audit of `tokens.css`, `app.css`, and every global-UI Blade/SCSS file for hardcoded `left`/`right`/`margin-left`/`padding-right`-style properties; replace with logical equivalents (`inset-inline-start`, `margin-inline`, `padding-block`, etc.) — **remediates a gap found during the cross-feature audit: RTL-readiness is a PRD §8 requirement with no prior task anywhere**
- [ ] T023 Run full visual regression (6 breakpoints by 2 themes) per `docs/testing/visual-regression-plan.md` — **PARTIAL, KEEP OPEN**: reference/current screenshots exist at 8 widths in both themes and current pages passed overflow checks; 1280px first-view/full-page captures were manually compared. The visual contract still requires automated pixel diffs against its tolerances and review across the applicable global UI variants/states. Gate: stabilize approved logo/vector, licensed font and menu inputs; provide approved product/page fixtures for store and checkout variants; run and retain pixel-diff results at the required viewport/theme matrix, plus owner review of brand-dependent differences.
- [ ] T024 Run quickstart.md validation end to end

## Dependencies & Execution Order

- Local prerequisite T001 and the Phase 2 foundational tasks block local implementation stories.
- Staging prerequisite T001a does not block local implementation; it is mandatory before staging acceptance or production deployment and depends on the listed Feature 002 infrastructure/CI/deployment gates.
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

## Feature 003 final handoff audit (2026-10-10)

- **Completed locally:** T002-T011, T013-T019, T021, T022a. Tokens and shared UI are implemented in the Sage theme. All 126 unique source-token names are present in `tokens.css`; `app.css` exposes supported utility aliases through Tailwind v4's CSS-first theme, while remaining tokens are usable directly or through custom-property utilities. Historical build/lint/static-analysis evidence remains recorded in the earlier execution notes. The final audit's targeted Playwright run reports 7 passed and 2 skipped; the skipped cases require store templates hidden by WooCommerce Coming Soon visibility. T023 is partial/open; T024 is open.
- **T007 detail:** the Playwright test records root theme and computed body background at first contentful paint. It verifies the no-flash behavior but does not create a screenshot-diff artifact.
- **T012 remains open:** the anonymous `/shop/` header/cart-drawer checks both skipped under WooCommerce Coming Soon visibility; current evidence also records a 404 policy route, no approved published product page, and an empty-cart checkout redirect. A staging/non-production route fixture and non-empty cart are required for the route matrix; none was fabricated and Product ID 12 was not changed.
- **T020 remains open:** no NVDA or VoiceOver screen-reader pass was performed. Browser accessibility-tree inspection is not counted as that manual test.
- **T023 remains open:** visual evidence is in `docs/reviews/coming-soon-evidence/` and the comparison in `docs/reviews/COMING-SOON-VISUAL-AUDIT.md`; captures/overflow checks and a manual 1280px comparison are not the required automated pixel-diff and full global-variant parity gate. Editable logo/vector, real product photography, licensed fonts, and complete WordPress menu content remain open inputs.
- **T024 remains open:** the final audit ran `npm.cmd run test:e2e -- tests/e2e/global-ui.spec.js`: 7 passed, 2 skipped (both store-route tests). The passing cases covered first-contentful-paint theme resolution, theme persistence across browser restart, blocked storage, axe on Coming Soon in both themes, announcement rotation/pause/reduced motion, and no-overflow checks. A production build attempt failed because Tailwind could not resolve `./contract.css` at that moment. Immediately afterward, the workspace showed concurrent uncommitted theme-source edits/new contract files; these were left untouched and no build was retried against potentially in-progress work. Re-run the build after source changes are stabilized, then finish the quickstart route/header checks with a policy page, published test product, non-empty cart, and accessible checkout in an authorized non-production/staging fixture.
- **T019 keyboard evidence:** Space and Enter activate the theme toggle without reload; the focus ring remains visible in dark and light modes.
- Product ID 12 remains in Trash. Coming Soon mode, user accounts, and product data were not changed.

## Phase 7: Convergence — acceptance criteria gaps

- [ ] T025 [US1] Verify SC-001 across 100 hard reloads in both themes with throttled network and retain the results — **OPEN**: the existing Playwright test observes theme/background at first contentful paint for a single run, not the specification's 100 repeated reloads.
- [ ] T026 [US1] Complete the SC-002 axe/contrast audit for all reachable global UI surfaces in both themes — **OPEN**: current automated evidence scans only the Coming Soon homepage; finish on ordinary store, cart, and checkout surfaces when T012's approved route/content fixture exists, and record zero failing text/control pairs.
