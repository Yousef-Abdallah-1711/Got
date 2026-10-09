# Implementation Plan: Production Deployment and Launch Acceptance

**Branch**: `017-deployment-production-acceptance` | **Date**: 2026-10-09 | **Spec**: [spec.md](./spec.md)

## Summary

Provision production to the staging specification, execute the production smoke test, perform and verify a real backup-restore drill, migrate the early-access list, verify monitoring/alerting, and gate the Store Mode switch behind the brand owner's written approval.

## Technical Context

**Language/Version**: No new code beyond small migration/verification scripts — this feature is primarily an operational procedure, not a software feature.
**Primary Dependencies**: The production hosting account (ADR 0012), the chosen email-marketing tool (ADR 0011).
**Storage**: N/A — this feature moves existing data (early-access list) and verifies existing backup mechanisms.
**Testing**: The production smoke test and backup-restore drill are themselves this feature's primary tests.
**Target Platform**: Production environment, for the first time in the project.
**Performance Goals**: Same targets as Feature 016, now verified on production rather than staging.
**Constraints**: Constitution Principle 20 — no deployment without explicit owner approval; this feature's entire purpose is satisfying that gate correctly.
**Scale/Scope**: One production cutover event.

## Constitution Check

| Principle | Check | Status |
|---|---|---|
| 18 — Staging before production | This feature only runs after Feature 016's staging-validated hardening gate | PASS |
| 20 — No deployment without approval | Store Mode switch explicitly gated on written brand-owner approval | PASS |

No violations.

## Project Structure

### Documentation (this feature)
```text
specs/017-deployment-production-acceptance/
├── plan.md
├── research.md
├── quickstart.md
└── tasks.md
# No data-model.md or contracts/ — operational/procedural feature, no new software entities or APIs.
```

### Source Code
```text
.github/workflows/production-deploy.yml   # manual-approval-gated deploy workflow (extends Feature 002's CI)
scripts/backup-restore-drill.sh             # scripted restore-to-scratch-environment verification
scripts/early-access-migration.php          # one-time migration script, run once, then retired
```

**Structure Decision**: Minimal new code — this feature is mostly process execution against infrastructure built in earlier features, consistent with its procedural nature.

## Complexity Tracking
*No violations.*
