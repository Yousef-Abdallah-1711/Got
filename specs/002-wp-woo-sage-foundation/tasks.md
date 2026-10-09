---
description: "Task list for Feature 002 — WordPress, WooCommerce, and Sage Foundation"
---

# Tasks: WordPress, WooCommerce, and Sage Foundation

**Input**: Design documents from `/specs/002-wp-woo-sage-foundation/` (spec.md, plan.md, research.md)

**Tests**: Included — this feature's User Story 2 is explicitly about automated checks, so test/CI tasks are in scope, not optional.

**Note**: This feature's tasks are infrastructure, not the generic HTML-to-Sage conversion checklist in `specs/001-got-woocommerce-storefront/tasks.md` — that file's T001–T005 (Sage scaffold) are a supporting reference for T010–T012 below, not a substitute for this feature's own task list.

## Phase 1: Setup

- [ ] T001 Provision managed WordPress hosting account (PHP 8.3+ — raised 2026-10-09 for Sage 11/Acorn v6, MySQL 8/MariaDB 10.6+, HTTPS, staging environment, daily backups) per `docs/adr/0012-hosting-and-caching.md`'s selection criteria — **BLOCKED**: paid hosting provisioning requires the project owner (payment + vendor selection); not something an agent/delegate can execute.
- [ ] T002 Configure Cloudflare DNS, SSL, and www redirect for the staging subdomain — **BLOCKED**: no staging host exists yet (depends on T001); live DNS changes also require explicit owner action.
- [x] T003 [P] Initialize the Git repository and push the initial commit (if not already a repository) — **DONE 2026-10-09**: repo initialized, pushed to `https://github.com/Yousef-Abdallah-1711/Got`.
- [x] T004 [P] Run `composer create-project roots/sage` in a scratch directory and record the exact Sage/Acorn/Vite/Tailwind versions produced; update `docs/adr/0001-sage-version.md` with the VERIFIED versions — **DONE 2026-10-09**: ran via Docker (host has no native PHP/Composer); found Sage 11 (Acorn v6.3.0, Vite ^8, Tailwind v4, PHP >=8.3) is now the installer default, not Sage 10. Owner chose to move to Sage 11 — see ADR 0001.

## Phase 2: Foundational (Blocking Prerequisites)

**⚠️ CRITICAL**: No later feature can begin until this phase is complete.

- [x] T005 Scaffold `wp-content/themes/got-sage/` with a valid `style.css` theme header and `functions.php` that bootstraps Composer autoload + Acorn — **DONE 2026-10-09** (scaffolded by Codex/gpt-6-luna against Sage 11/Acorn v6, reviewed and committed).
- [x] T005a Run `composer install` and `npm install` inside `got-sage` against the actual project `composer.json`/`package.json` (not the scratch-dir check in T004, which only verifies versions) — **migrated from the retired Feature 001's T003; this was a real step T004 did not cover, since T004 operates on a throwaway scratch directory, not the project theme itself** — **DONE 2026-10-09**: `composer install` (via Docker), `npm install`, and `npm run build` all verified exit 0; `public/build/` produced.
- [x] T005b Scaffold the empty `framework/` layer directories inside `got-sage` — `framework/builder/` (used by Feature 004), `framework/custom-fields/`, `framework/post-type/`, `framework/taxonomies/` — per the constitution's Sage Architecture Enforcement principle, so later features have a consistent place to register ACF fields/CPTs/taxonomies rather than inventing ad hoc locations — **migrated from the retired Feature 001's T004** — **DONE 2026-10-09**.
- [x] T006 [P] Scaffold `wp-content/plugins/got-commerce/` with `got-commerce.php` plugin header and an empty `src/` PSR-4 namespace — **DONE 2026-10-09**: `composer install` verified exit 0.
- [x] T007 [P] Configure Vite entry points (`resources/css/app.css`, `resources/js/app.js`) in `got-sage` per `docs/architecture/wordpress-structure.md` — **DONE 2026-10-09**: Vite build verified producing `public/build/assets/app-*.css`/`.js` + manifest.
- [~] T008 Install WordPress on the staging environment; install WooCommerce; set store currency to EGP and base country to Egypt — **IN PROGRESS — local substitute verified 2026-10-09**: no staging exists (T001/T002 blocked), so this ran against the project owner's local "Local by WP Engine" site (`http://got.local`) instead. WordPress already running there; WooCommerce 11.2.0 installed and activated via live admin automation; General settings saved with Country/State = Egypt — Cairo, Currency = Egyptian pound (EGP), both verified persisted after reload. Staging-specific verification remains **BLOCKED** by T001/T002.
- [x] T008a Configure WooCommerce tax settings per the brand owner's accountant's direction (tax status, rate, and whether prices are entered tax-inclusive) — **remediates a gap found during the cross-feature audit: tax configuration was named in the PRD's own Phase 1 task list but had no owner in any of the 16 original features' tasks**; if the accountant's direction is not yet available, configure WooCommerce's tax calculation as explicitly disabled (not a silent default) and track the real decision in `docs/planning/UPDATED-RISKS-AND-DECISIONS.md` rather than guessing a rate — **DONE 2026-10-09**: verified "Enable tax rates and calculations" is unchecked (disabled) by default; already tracked in the risks doc (line 54), no accountant direction received yet.
- [~] T009 Enable WooCommerce High-Performance Order Storage (HPOS) in Settings → Advanced → Features before any product/order data is created — **IN PROGRESS — local substitute verified 2026-10-09**: verified "High-performance order storage (recommended)" is the pre-selected default on this WooCommerce version — no action needed, confirmed via live admin check, not assumed. Staging confirmation remains **BLOCKED** by T001/T002.
- [~] T009a Build the Site Mode admin settings screen (`got_manage_site_mode` capability, Administrator/Shop Manager only): current-mode display, published-product count, the ≥1-published-in-stock-product guard blocking the Coming-Soon→Store switch, cache purge on change, and an activity-log write with actor+timestamp (PRD P0-F001) — **remediates a gap found while building `docs/planning/REQUIREMENTS-TRACEABILITY-MATRIX.md`: every other feature (003, 005, 010) treated this switch as a dependency to read, but no feature previously owned building it** — **PARTIALLY VERIFIED (2026-10-10)**: implementation and PHP 8.3 checks pass; the 66/66 adapter harness verifies capability/role enforcement, missing/invalid nonce rejection, product guard, actor/time audit, and WordPress/WooCommerce/integration-cache invalidation behavior. Actual Local inspection found no full-page cache provider or cache drop-ins, so provider integration remains pending and is not claimed as passed. Existing live Edge Administrator checks pass for mode display, counts, zero-stock guard, valid mode changes, audit persistence, missing POST nonce rejection, and empty console errors. Invalid-nonce rejection has adapter evidence but is not yet confirmed through Edge; the supported browser UI exposes the nonce only as a hidden field, so the attempted visible form interaction could not alter it. Shop Manager and low-privilege Edge checks await the owner submitting the prepared temporary-account forms and taking over credential entry. Unauthenticated Edge verification also remains pending an isolated browser session. No account was submitted and no credential was exposed.
- [x] T009b `SiteMode.php` (theme) exposes a read-only getter consumed by Feature 003's header-variant logic and Feature 005/006's homepage branch — the getter reads the option T009a's settings screen writes; no feature other than this one writes that option (theme/plugin boundary: the plugin owns the flag, the theme only reads it) — **DONE 2026-10-10**: `App\Support\SiteMode::get_mode()` reads `got_site_mode`, returns only `coming_soon` or `store`, and defaults safely to Coming Soon; the PHP 8.3 isolated test passes 6/6 cases and source/test lint cleanly. No Feature 003 consumer was added.
- [~] T010 [P] Configure `.github/workflows/ci.yml`: PHPStan (level 6+), PHPCS (WordPress Coding Standards), Stylelint, ESLint, and `npm run build` on every pull request — **IN PROGRESS (2026-10-10)**: workflow and Composer/npm lint configuration are locally verified; PHP 8.3 tests, PHPStan level 6, PHPCS, Stylelint, ESLint, Vite build, YAML parsing, and `git diff --check` pass. Verified code commit `28bdaad` is pushed. GitHub rejected the workflow-file push because the active credential lacks the `workflow` scope; the workflow remains untracked locally, so no GitHub Actions result is claimed. No deployment steps or secrets are included.
- [ ] T011 Configure the staging auto-deploy step (on merge to `main`) and the production manual-approval deploy step in the same or a companion workflow file — **BLOCKED**: staging host, deployment target, and credentials are unavailable; depends on T001/T002 and owner selection.
- [x] T012 [P] Write `README.md` covering: prerequisites, local setup steps, how to run tests, how to deploy — **DONE 2026-10-09**.
- [x] T012a Configure `.gitignore` to exclude local agent folders (`.claude/`, `.agents/`, `.specify/presets` caches), `node_modules/`, `vendor/`, and build outputs (`public/build/`) unless a specific file is intentionally committed — **migrated from the retired Feature 001's T032** — **DONE 2026-10-09**.

**Checkpoint**: Foundation ready — every other feature can now begin.

## Phase 3: User Story 1 - Developer provisions a working staging environment (Priority: P1) 🎯 MVP

**Goal**: A real, reachable staging environment with WordPress + WooCommerce + the theme/plugin skeleton active.

### Implementation for User Story 1

- [~] T013 [US1] Activate `got-sage` theme and `got-commerce` plugin on staging — **IN PROGRESS — local substitute verified 2026-10-09**: owner bumped Local's site PHP to 8.3.17 and installed ACF Pro; both `got-sage` and `got-commerce` now show Active in wp-admin, verified via live browser automation. Found and fixed three real bugs blocking this along the way (see commit `1241414`): `ThemeServiceProvider` wasn't extending the real `SageServiceProvider`, the committed `composer.lock` was generated under PHP 8.5 and baked in an overly strict `>=8.4.1` platform check, and `resources/views/` had zero views causing indefinite hangs instead of a clean render. Staging activation remains **BLOCKED** by T001/T002.
- [ ] T014 [US1] Verify HTTPS with no mixed-content warnings on the staging URL — still blocked, no staging exists (T001/T002). Local dev is plain HTTP by design; not equivalent to this check. — **BLOCKED**: no staging URL exists; local HTTP is not equivalent to HTTPS verification.
- [~] T015 [US1] Verify the homepage renders without a PHP fatal error with the default (unstyled) theme — **IN PROGRESS — local substitute verified 2026-10-09**: verified live at `http://got.local/` — HTTP 200, placeholder content renders, confirmed via screenshot, second request 0.18s (healthy, not hanging). Staging render verification remains **BLOCKED** by T001/T002.

**Checkpoint**: User Story 1 is independently testable on the local substitute — staging-specific verification (T014, and the hosting/DNS tasks) remains blocked pending T001/T002.

---

## Phase 4: User Story 2 - Developer gets fast, safe feedback on every change (Priority: P2)

**Goal**: Every PR is automatically checked; every merge auto-deploys to staging; production requires manual approval.

### Tests for User Story 2

- [ ] T016 [P] [US2] Open a throwaway PR with a deliberate PHPCS violation; confirm the check fails and blocks merge — **NOT STARTED** (depends on T010 and configured GitHub CI).
- [ ] T017 [P] [US2] Fix the violation; confirm the check passes — **NOT STARTED** (depends on T010 and T016).

### Implementation for User Story 2

- [ ] T018 [US2] Confirm merge to `main` triggers an automatic staging deploy (verify the change appears on the staging URL) — **BLOCKED** by missing staging host and T011 deployment configuration.
- [ ] T019 [US2] Confirm the production deploy workflow requires a manual approval gate and does not fire automatically on merge — **NOT STARTED** (depends on T011 and configured deployment environment).

**Checkpoint**: User Stories 1 and 2 both work independently.

---

## Phase 5: User Story 3 - Future maintainer can set the project up from scratch (Priority: P3)

**Goal**: The README is sufficient, unassisted, for a new contributor.

### Implementation for User Story 3

- [~] T020 [US3] Have a second person (or a fresh-eyes self-review after a break) follow `README.md` only, with no questions asked, to reach a working local environment — **PARTIAL (2026-10-10)**: review of the prior README found that its root-level Composer/npm commands did not match the monorepo. The README now names the real project directories and Local setup, but a clean-machine/new-site walkthrough is pending. Only `http://got.local` is approved for temporary WordPress accounts; no separate WordPress site/account was created. Existing local-site and build checks do not prove this acceptance test.
- [x] T021 [US3] Fix any gap found in T020 and re-verify — **DONE (2026-10-10)**: README and quickstart now use the separate theme/plugin Composer projects, the theme npm project, the actual Local workflow, and accurate staging/deployment blockers. Reinstalled npm dependencies with `npm.cmd ci`; CSS/JS lint and Vite build pass. PHP 8.3 plugin tests (66/66), theme getter tests (6/6), PHPStan level 6, and PHPCS pass. Fresh-machine acceptance remains tracked as partial under T020.

**Checkpoint**: All three user stories independently functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

- [~] T022 [P] Document the hosting/version decisions actually used in `docs/adr/0001-sage-version.md` and `docs/adr/0012-hosting-and-caching.md` (mark VERIFIED, not PROPOSED) — **PARTIAL**: Sage 11/Acorn version verification is recorded in ADR 0001; hosting provider and production cache deployment decisions remain blocked on owner selection/provisioning under T001/T002, so ADR 0012 is not marked VERIFIED.
- [x] T023 Run `docs/architecture/wordpress-structure.md`'s WordPress Clone Readiness checklist against the empty skeleton (valid theme header, functions.php bootstrap, no stock skill-repo folder under `wp-content/themes`) — **DONE (2026-10-10)**: verified the WordPress theme header fields in `got-sage/style.css`, Composer/Acorn bootstrapping and failure messages in `functions.php`, and that `wp-content/themes/` contains only `got-sage` (no stock skill-repo folder). The live local homepage had previously rendered successfully.
- [~] T024 Run quickstart.md validation end to end — **PARTIAL (2026-10-10)**: current local environment, EGP/Cairo and HPOS configuration, theme render, PHP tests/static analysis/coding standards, frontend lint, and Vite build have local evidence. GitHub PR checks are pending the workflow push/Actions run; staging and production steps are blocked by T001/T002/T011; clean-machine acceptance remains pending T020. No staging/production result is inferred from local checks.

## Dependencies & Execution Order

- **Setup (Phase 1)**: No dependencies — start immediately.
- **Foundational (Phase 2)**: Depends on Phase 1 (hosting account, repo) — BLOCKS every user story below and every later feature (002 is the root of the dependency graph).
- **User Story 1 (P1)**: Depends only on Phase 2.
- **User Story 2 (P2)**: Depends only on Phase 2 (CI config); can run in parallel with User Story 1 once Phase 2 lands.
- **User Story 3 (P3)**: Depends on User Story 1 being demonstrably working (there must be something to document accurately).
- **Polish**: Depends on all three user stories.

## Parallel Example

```bash
# Phase 2, once hosting/repo exist:
Task: "Scaffold got-sage theme skeleton"
Task: "Scaffold got-commerce plugin skeleton"
Task: "Configure Vite entry points"
Task: "Configure CI lint/build workflow"
```

## Implementation Strategy

MVP = User Story 1 only (a working, reachable staging environment). User Story 2 (CI safety net) should follow immediately after, given the single-developer risk profile — do not treat it as optional polish. User Story 3 (handoff documentation) can trail slightly but must complete before this feature is marked done, since Feature 017 (production acceptance) assumes it exists.
