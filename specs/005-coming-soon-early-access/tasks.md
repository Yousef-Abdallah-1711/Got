---
description: "Task list for Feature 005 — Coming Soon and Early-Access Workflow"
---

# Tasks: Coming Soon and Early-Access Workflow

**Input**: Design documents from `/specs/005-coming-soon-early-access/` (spec.md, plan.md, research.md, data-model.md, contracts/)

**Tests**: Included — security/abuse-resistance is a core user story here.

## Phase 1: Setup

- [ ] T001 Confirm Features 003/004 (global UI + ACF) are available so the Coming Soon page shell exists
- [ ] T002 [P] Select and provision a sandbox/test credential for the chosen email-marketing tool (or a mock provider for development) per ADR 0011

## Phase 2: Foundational

- [ ] T003 Create the `got_early_access` table migration (`wp-content/plugins/got-commerce/src/EarlyAccess/Migrations/CreateEarlyAccessTable.php`), run idempotently on plugin activation
- [ ] T004 [P] Implement `EarlyAccessService::validate()` (email format, honeypot check, consent presence) in `src/EarlyAccess/EarlyAccessService.php`
- [ ] T005 [P] Implement the rate-limiter (hashed-IP, rolling 1-hour window, cap 5) as a reusable helper (future features — e.g. order tracking — reuse the same rate-limit helper)
- [ ] T006 Implement `ConfirmationToken` issue/verify/expire logic in `src/EarlyAccess/ConfirmationToken.php`
- [ ] T007 Register the three REST routes (`RestController.php`) per `contracts/early-access-api.md`, each with an explicit `permission_callback`

**Checkpoint**: Backend service ready — frontend and resilience work can now build on it.

## Phase 3: User Story 1 - Visitor signs up and confirms (Priority: P1) 🎯 MVP

### Tests for User Story 1

- [ ] T008 [P] [US1] Playwright E2E: submit valid signup → confirmation email received (sandbox) → click link → "on the list" state
- [ ] T009 [P] [US1] Playwright E2E: expired-token path → "link expired" message, not an error page

### Implementation for User Story 1

- [ ] T010 [US1] Build `resources/views/components/early-access-form.blade.php` with the first-name/WhatsApp optional fields added (closes gap C-07)
- [ ] T011 [US1] Build the Alpine component (`resources/js/early-access-form.js`) for idle/loading/success/error states, submitting to `POST /wp-json/got/v1/early-access`
- [ ] T012 [US1] Wire the confirmation-link landing state and the expired-link state as their own simple Blade views

**Checkpoint**: User Story 1 independently testable end to end.

---

## Phase 4: User Story 2 - Form resists spam/abuse (Priority: P2)

### Tests for User Story 2

- [ ] T013 [P] [US2] PHP unit test: honeypot-filled submission creates no record, sends no email
- [ ] T014 [P] [US2] PHP unit test: 6th submission from the same hashed IP within an hour is rejected
- [ ] T015 [P] [US2] PHP unit test: duplicate submission of an already-confirmed email is a no-op with the correct response

### Implementation for User Story 2

- [ ] T016 [US2] Wire the honeypot field into the form markup (visually hidden, not `display:none` alone — use an accessible-hiding technique that still fools basic bots) and the service-side check (T004)
- [ ] T017 [US2] Wire the rate-limiter (T005) into the REST controller's request handling before any database write

**Checkpoint**: User Stories 1 and 2 both independently functional.

---

## Phase 5: User Story 3 - Survives an email-tool outage (Priority: P3)

### Tests for User Story 3

- [ ] T018 [P] [US3] Integration test: `EmailSync` call fails → subscriber status becomes `sync_pending`, visitor still sees success
- [ ] T019 [P] [US3] Integration test: retry job run with the provider now reachable → status flips to `confirmed`/synced

### Implementation for User Story 3

- [ ] T020 [US3] Implement `EmailSync::sync()` against the chosen (or mocked) provider's API, behind the internal interface from `research.md`
- [ ] T021 [US3] Register a WP-Cron job running every 15 minutes, retrying `sync_pending` records for up to 24 hours from `created_at`, then flagging for manual attention if still failing

**Checkpoint**: All three user stories independently functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

- [ ] T022 [P] Configure SPF/DKIM/DMARC on the sending domain (shared infrastructure task, also benefits Feature 013's transactional emails)
- [ ] T023 Register the 30-day unconfirmed-record cleanup WP-Cron job
- [ ] T024 Run quickstart.md validation end to end

## Dependencies & Execution Order

- Setup/Foundational block all three user stories.
- User Story 1 is the MVP; User Stories 2 and 3 are additive hardening layers around it and can proceed in parallel once Phase 2 is done.
- T022 (SPF/DKIM/DMARC) should happen early since it affects deliverability testing for User Story 1's own E2E test (T008).
