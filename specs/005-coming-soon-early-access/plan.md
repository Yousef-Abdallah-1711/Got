# Implementation Plan: Coming Soon and Early-Access Workflow

**Branch**: `005-coming-soon-early-access` | **Date**: 2026-10-09 | **Spec**: [spec.md](./spec.md)

## Summary

Build the `got-commerce` `EarlyAccess` service (validation, honeypot, rate limit, consent persistence, double-opt-in token issue/verify, email-tool sync + retry queue) behind a custom REST endpoint, and the `EarlyAccessForm` Blade+Alpine port (plus the first-name/WhatsApp fields missing from the current component contract, gap C-07) on the Coming Soon page.

## Technical Context

**Language/Version**: PHP 8.2+ (plugin service + REST controller), Alpine.js (form state).
**Primary Dependencies**: WordPress REST API, WP-Cron (retry job), chosen email-marketing tool's API client (vendor TBD, ADR 0011).
**Storage**: New custom table `got_early_access` (ADR 0010).
**Testing**: Playwright E2E (double opt-in happy path, rate-limit trigger, expired-link path, outage/retry path with a mocked provider); PHP unit tests for the validation/rate-limit/token logic.
**Target Platform**: Same as prior features.
**Performance Goals**: Form submission responds within 1s under normal conditions (no PRD-stated target specific to this form; inherits the general "loading state within 100ms" UX rule).
**Constraints**: Marketing and transactional email are kept as separate integrations (constitution); no third-party marketing call before consent.
**Scale/Scope**: One form, reused on the Coming Soon page; the backend service is also reusable if a standalone `/early-access/` page is later built (per `docs/design/page-mapping.md`'s noted gap).

## Constitution Check

| Principle | Check | Status |
|---|---|---|
| 4 — Server-side validation mandatory | Email format, honeypot, rate limit all re-checked server-side, not just client-side | PASS |
| 15 — Security/privacy are architectural | Consent text+timestamp persisted; rate limiting; no PII in logs beyond what's needed | PASS |
| 17 — Integrations need failure-state handling | Email-tool outage → sync_pending + retry, not a lost signup or a visitor-facing error | PASS |

No violations.

## Project Structure

### Documentation (this feature)
```text
specs/005-coming-soon-early-access/
├── plan.md
├── research.md
├── data-model.md
├── contracts/
│   └── early-access-api.md
├── quickstart.md
└── tasks.md
```

### Source Code
```text
wp-content/plugins/got-commerce/
  src/EarlyAccess/
    EarlyAccessService.php      # validation, honeypot, rate limit, consent persistence
    ConfirmationToken.php       # issue/verify 48h single-use tokens
    EmailSync.php                # provider API client + retry queue
    RestController.php           # /api/v1/early-access, /confirm/{token}, /unsubscribe
    Migrations/CreateEarlyAccessTable.php
wp-content/themes/got-sage/
  resources/views/components/early-access-form.blade.php   # + first-name/WhatsApp fields (C-07)
  resources/js/early-access-form.js                          # Alpine component: idle/loading/success/error states
```

**Structure Decision**: All business logic in `got-commerce` per the theme/plugin boundary; the theme only owns the form markup and submits to the plugin's REST endpoint.

## Complexity Tracking
*No violations.*
