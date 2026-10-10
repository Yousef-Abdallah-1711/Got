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
- [~] T009a Build the Site Mode admin settings screen (`got_manage_site_mode` capability, Administrator/Shop Manager only): current-mode display, published-product count, the >=1-published-in-stock-product guard blocking the Coming-Soon->Store switch, cache purge on change, and an activity-log write with actor+timestamp (PRD P0-F001) — **PARTIAL — BLOCKED BY EXECUTION POLICY (2026-10-10)**: the PHP 8.3 isolated API-adapter harness passes 76/76, including Shop Manager-shaped authorization, Subscriber/signed-out denial, nonce cases, guard, audit and cache invalidation hooks. These are test-adapter results, not an isolated WordPress integration test. Real Edge verified Administrator access, 0/0 counts, no-stock guard, valid transitions, audit persistence, missing-nonce rejection, and homepage rendering; a prior live Edge console capture recorded zero errors. Shop Manager, Subscriber, and signed-out role sessions remain unverified in Edge. A clean isolated WordPress integration environment was not created because execution policy blocked the attempt; no restriction was bypassed. Invalid nonce rejection is verified only by the adapter. No full-page cache provider/drop-ins exist, so provider-specific purge verification is deferred; provider-agnostic invalidation hooks are adapter-tested. Site Mode remains Coming Soon, counts 0/0. Users contains only the existing Administrator; no test account was created. Product ID 12 intentionally remains in Trash per owner direction, is not publicly purchasable (both no-cookie product routes return 404), and does not count toward Store eligibility. The two audit rows remain as acceptance evidence. Do not mark T009a complete until the mandated role/security cases have isolated WordPress integration evidence or approved browser-role evidence.
- [x] T009b `SiteMode.php` (theme) exposes a read-only getter consumed by Feature 003's header-variant logic and Feature 005/006's homepage branch — the getter reads the option T009a's settings screen writes; no feature other than this one writes that option (theme/plugin boundary: the plugin owns the flag, the theme only reads it) — **DONE 2026-10-10**: `App\Support\SiteMode::get_mode()` reads `got_site_mode`, returns only `coming_soon` or `store`, and defaults safely to Coming Soon; the PHP 8.3 isolated test passes 6/6 cases and source/test lint cleanly. No Feature 003 consumer was added.
- [~] T010 [P] Configure `.github/workflows/ci.yml`: PHPStan (level 6+), PHPCS (WordPress Coding Standards), Stylelint, ESLint, and `npm run build` on every pull request — **LOCAL WORKFLOW VERIFIED (2026-10-10), REMOTE CHECK DEFERRED BY SCOPE**: local workflow YAML parses; the PHP 8.3 plugin harness passes 76/76, getter tests 6/6, PHPStan/PHPCS, Stylelint/ESLint, Vite build and Composer/npm setup checks pass. No push, authentication change, or GitHub Actions run was made under this local-only closure. Treat remote PR check evidence as pending, not passed. `npm audit` reports seven high-severity development-dependency paths rooted in `braces@3.0.3`; no patched release is available and npm's proposed fix is an incompatible Stylelint downgrade to 7.7.0, which was not applied.
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

- [~] T020 [US3] Have a second person (or a fresh-eyes self-review after a break) follow `README.md` only, with no questions asked, to reach a working local environment — **PARTIAL — BLOCKED BY EXECUTION POLICY (2026-10-10)**: documented plugin/theme Composer validate+install, theme `npm ci`, local WordPress boot/admin, active theme/plugins, and WooCommerce settings were rechecked. A clean isolated WordPress site was not provisioned; the isolated-copy attempt was rejected before creating files or a site, and no workaround was used. Therefore this evidence does not satisfy the clean-install/fresh-eyes criterion.
- [x] T021 [US3] Fix any gap found in T020 and re-verify — **DONE LOCALLY (2026-10-10)**: README and quickstart commands match the separate theme/plugin Composer projects and the theme npm project. Rechecked clean theme `npm ci`, both Composer validations/installs, PHP 8.3 plugin harness (76/76), theme getter tests (6/6), PHPStan, PHPCS, Stylelint, ESLint, Vite development entry endpoints, and production build. No inaccurate root-level npm project instructions were found.

**Checkpoint**: All three user stories independently functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

- [~] T022 [P] Document the hosting/version decisions actually used in `docs/adr/0001-sage-version.md` and `docs/adr/0012-hosting-and-caching.md` (mark VERIFIED, not PROPOSED) — **PARTIAL**: Sage 11/Acorn version verification is recorded in ADR 0001; hosting provider and production cache deployment decisions remain blocked on owner selection/provisioning under T001/T002, so ADR 0012 is not marked VERIFIED.
- [x] T023 Run `docs/architecture/wordpress-structure.md`'s WordPress Clone Readiness checklist against the empty skeleton (valid theme header, functions.php bootstrap, no stock skill-repo folder under `wp-content/themes`) — **DONE (2026-10-10)**: verified the WordPress theme header fields in `got-sage/style.css`, Composer/Acorn bootstrapping and failure messages in `functions.php`, and that `wp-content/themes/` contains only `got-sage` (no stock skill-repo folder). The live local homepage had previously rendered successfully.
- [~] T024 Run quickstart.md validation end to end — **VERIFIED LOCALLY, FULL QUICKSTART PARTIAL (2026-10-10)**: quickstart local steps 1–6 (local site, theme/plugin activation, store settings, PHP suites, Composer/npm, lint/build) passed. Step 7 remote CI, step 8 deployment, and step 9 clean-site/fresh-eyes validation remain open under T010/T020/T001/T002/T011. No staging/production result is inferred from local evidence.

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

## Verification classification (2026-10-10)

| Task | Classification | Current evidence / remaining gate |
|---|---|---|
| T001 | BLOCKED | No hosting provider/account or staging site. |
| T002 | BLOCKED | DNS/SSL depends on T001 and owner-controlled domain changes. |
| T003 | VERIFIED COMPLETELY | Repository initialized and pushed in prior authorized work; current local main and origin/main tracking refs match. |
| T004 | VERIFIED COMPLETELY | Sage/Acorn/Vite/Tailwind version probe and ADR recorded. |
| T005 | VERIFIED COMPLETELY | Sage theme scaffold exists and boots locally. |
| T005a | VERIFIED LOCALLY | Theme/plugin Composer projects and theme npm project install/build from lockfiles. |
| T005b | VERIFIED COMPLETELY | Required framework directories exist. |
| T006 | VERIFIED LOCALLY | GOT Commerce plugin scaffold is active on got.local. |
| T007 | VERIFIED COMPLETELY | Vite entries and production manifest/assets verified. |
| T008 | VERIFIED LOCALLY | Local WordPress/WooCommerce configuration verified; staging installation remains blocked. |
| T008a | VERIFIED COMPLETELY | Tax calculation explicitly disabled pending accountant direction. |
| T009 | VERIFIED LOCALLY | HPOS is selected on got.local; staging check remains blocked. |
| T009a | BLOCKED BY EXECUTION POLICY | Admin Edge checks and 76 adapter tests pass, but role/security cases lack isolated WordPress integration or role-browser evidence. Product 12 intentionally stays in Trash. No cache provider exists; real-provider verification is deferred. |
| T009b | VERIFIED COMPLETELY | Read-only theme getter and 6/6 PHP 8.3 checks. |
| T010 | VERIFIED LOCALLY | Workflow YAML and required equivalent local checks pass; remote Actions run is deferred under local-only scope. |
| T011 | BLOCKED | No staging/production target or deployment credentials. |
| T012 | VERIFIED COMPLETELY | README documents prerequisites, local setup, checks, and deployment dependency. |
| T012a | VERIFIED COMPLETELY | Required ignore rules are present. |
| T013 | VERIFIED LOCALLY | Theme/plugin active on got.local; staging activation is pending. |
| T014 | DEFERRED — EXTERNAL DEPENDENCY | HTTPS/mixed-content verification requires staging. |
| T015 | VERIFIED LOCALLY | Live Edge homepage renders the Sage Blade placeholder; staging render is pending. |
| T016 | DEFERRED — EXTERNAL DEPENDENCY | Deliberate PR failure test requires a pushed workflow and GitHub Actions. |
| T017 | DEFERRED — EXTERNAL DEPENDENCY | Passing PR check requires T016 and remote Actions. |
| T018 | DEFERRED — EXTERNAL DEPENDENCY | Staging deploy test requires host and deployment workflow. |
| T019 | DEFERRED — EXTERNAL DEPENDENCY | Production approval-gate test requires deployment environment. |
| T020 | BLOCKED BY EXECUTION POLICY | Documented local setup checks pass; clean isolated site/fresh-eyes criterion remains unverified because isolated setup was blocked. |
| T021 | VERIFIED LOCALLY | README/quickstart corrections and all current local checks reverified. |
| T022 | DEFERRED — EXTERNAL DEPENDENCY | Sage ADR is verified; hosting/cache-provider decision requires owner selection. |
| T023 | VERIFIED COMPLETELY | Clone-readiness checklist verified. |
| T024 | VERIFIED LOCALLY / PARTIAL OVERALL | Local quickstart steps 1–6 pass; steps 7–9 remain open under T010/T020 and external deployment dependencies. |

**Local foundation checks:** verified where indicated above. **Feature 002 local acceptance:** remains partial because T009a role/security integration evidence and T020 clean-site/fresh-eyes evidence are blocked. **Full infrastructure/production acceptance:** remains pending the external tasks above. Product 12 in Trash is an intentional retained test fixture, not a cleanup blocker.
