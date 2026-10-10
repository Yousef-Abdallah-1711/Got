---
description: "Task list for Feature 005 — Coming Soon and Early-Access Workflow"
---

# Tasks: Coming Soon and Early-Access Workflow

**Input**: Design documents from `/specs/005-coming-soon-early-access/` (spec.md, plan.md, research.md, data-model.md, contracts/)

**Tests**: Included — security/abuse-resistance is a core user story here.

## Phase 1: Setup

- [ ] T001 Confirm Features 003/004 (global UI + ACF) are available so the Coming Soon page shell exists — **PARTIAL**: the local Feature 003 shell is implemented; Feature 004 ACF content architecture is not complete.
- [x] T002 [P] Select and provision a sandbox/test credential for the chosen email-marketing tool (or a mock provider for development) per ADR 0011 — **LOCAL MOCK ONLY**: the unit harness injects a fake provider. No vendor, credentials, or live sandbox are selected.

## Phase 2: Foundational

- [ ] T003 Create the `got_early_access` table migration (`wp-content/plugins/got-commerce/src/EarlyAccess/Migrations/CreateEarlyAccessTable.php`), run idempotently on plugin activation
- [x] T004 [P] Implement `EarlyAccessService::validate()` (email format, honeypot check, consent presence) in `src/EarlyAccess/EarlyAccessService.php`
- [x] T005 [P] Implement the rate-limiter (hashed-IP, rolling 1-hour window, cap 5) as a reusable helper (future features — e.g. order tracking — reuse the same rate-limit helper)
- [x] T006 Implement `ConfirmationToken` issue/verify/expire logic in `src/EarlyAccess/ConfirmationToken.php`
- [x] T007 Register the three REST routes (`RestController.php`) per `contracts/early-access-api.md`, each with an explicit `permission_callback`

**Checkpoint**: Backend service ready — frontend and resilience work can now build on it.

## Phase 3: User Story 1 - Visitor signs up and confirms (Priority: P1) 🎯 MVP

### Tests for User Story 1

- [ ] T008 [P] [US1] Playwright E2E: submit valid signup → confirmation email received (sandbox) → click link → "on the list" state
- [ ] T009 [P] [US1] Playwright E2E: expired-token path → "link expired" message, not an error page

### Implementation for User Story 1

- [x] T010 [US1] Build `resources/views/components/early-access-form.blade.php` with the first-name/WhatsApp optional fields added (closes gap C-07)
- [x] T011 [US1] Build the Alpine component (`resources/js/early-access-form.js`) for idle/loading/success/error states, submitting to `POST /wp-json/got/v1/early-access`
- [x] T012 [US1] Wire the confirmation-link landing state and the expired-link state as their own simple Blade views

**Checkpoint**: User Story 1 independently testable end to end.

---

## Phase 4: User Story 2 - Form resists spam/abuse (Priority: P2)

### Tests for User Story 2

- [x] T013 [P] [US2] PHP unit test: honeypot-filled submission creates no record, sends no email
- [x] T014 [P] [US2] PHP unit test: 6th submission from the same hashed IP within an hour is rejected
- [x] T015 [P] [US2] PHP unit test: duplicate submission of an already-confirmed email is a no-op with the correct response

### Implementation for User Story 2

- [x] T016 [US2] Wire the honeypot field into the form markup (visually hidden, not `display:none` alone — use an accessible-hiding technique that still fools basic bots) and the service-side check (T004)
- [x] T017 [US2] Wire the rate-limiter (T005) into the REST controller's request handling before any database write

**Checkpoint**: User Stories 1 and 2 both independently functional.

---

## Phase 5: User Story 3 - Survives an email-tool outage (Priority: P3)

### Tests for User Story 3

- [ ] T018 [P] [US3] Integration test: `EmailSync` call fails → subscriber status becomes `sync_pending`, visitor still sees success
- [ ] T019 [P] [US3] Integration test: retry job run with the provider now reachable → status flips to `confirmed`/synced

### Implementation for User Story 3

- [x] T020 [US3] Implement `EmailSync::sync()` against the chosen (or mocked) provider's API, behind the internal interface from `research.md` — **LOCAL BOUNDARY**: provider callback/filter plus fake-provider unit coverage; no real provider adapter is enabled.
- [x] T021 [US3] Register a WP-Cron job running every 15 minutes, retrying `sync_pending` records for up to 24 hours from `created_at`, then flagging for manual attention if still failing

**Checkpoint**: All three user stories independently functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

- [ ] T022 [P] Configure SPF/DKIM/DMARC on the sending domain (shared infrastructure task, also benefits Feature 013's transactional emails)
- [x] T023 Register the 30-day unconfirmed-record cleanup WP-Cron job
- [ ] T024 Run quickstart.md validation end to end

## Dependencies & Execution Order

- Setup/Foundational block all three user stories.
- User Story 1 is the MVP; User Stories 2 and 3 are additive hardening layers around it and can proceed in parallel once Phase 2 is done.
- T022 (SPF/DKIM/DMARC) should happen early since it affects deliverability testing for User Story 1's own E2E test (T008).

## Local implementation evidence — 2026-10-10

- Implemented the Coming Soon Blade page, minimal header route, confirmation/expired/unsubscribe views, accessible signup form, Alpine request states, local tables/migration hooks, nonce/origin checks, hashed-IP attempt limiter, double-opt-in token flow, provider callback boundary, retry/retention schedules, and unsubscribe flow.
- Verification: PHP 8.3 plugin harness **76 passed**; early-access fake-WordPress harness **31 passed**; PHP syntax checks, configured PHPCS for `src/EarlyAccess`, Vite build, Stylelint, ESLint, and full Playwright suite pass. Playwright reports **11 passed, 2 skipped**; the two store-route tests remain gated by WooCommerce Coming Soon visibility. Axe reports zero violations for the Coming Soon page and both theme scans.
- Visual evidence: anonymous Edge screenshots at 360, 375, 390, 768, 1024, 1280, 1440, and 1920px in dark and light modes; no horizontal overflow. See `docs/reviews/COMING-SOON-VISUAL-AUDIT.md` and `docs/reviews/coming-soon-evidence/`.
- **Still open:** T001 (Feature 004 ACF architecture is incomplete), T003 (migration code and hooks exist, but the local database schema/version could not be directly read-verified because the bundled CLI PHP lacks `mysqli`), T008/T009 (no sandbox inbox/browser email-flow acceptance), T018/T019 (no real WordPress database/provider outage-and-retry integration run), T022 (sending-domain DNS is owner/infrastructure work), and T024 (quickstart end-to-end blocked by the unselected provider and inbox acceptance).
- **Provider acceptance remains blocked:** ADR 0011 still has no vendor or credentials. The website does not call an external marketing API. No live signup was submitted and no live `wp_mail` message was sent. The fake mail/provider transports are test-only. Do not mark delivery, DNS authentication, or marketing sync acceptance complete until the owner selects/configures a provider and a sandbox inbox is verified.
- WordPress Site Mode, user accounts, products, and Product 12 in Trash were preserved. No database reset, WordPress reinstall, commit, push, or deploy occurred.
