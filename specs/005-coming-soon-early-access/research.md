# Phase 0 Research: Coming Soon and Early-Access Workflow

## Decision: Subscriber storage mechanism

**Decision**: Custom table `got_early_access` (not a CPT, not email-tool-only).
**Rationale**: Needs fast unique-email lookups (duplicate detection) and fast rate-limit queries (by IP/time window) that a CPT's post-meta model handles poorly at any real volume; needs to survive an email-tool outage, which rules out "email-tool-only."
**Alternatives considered**: CPT (rejected — post-meta query performance for rate-limiting is the deciding factor); email-tool-only (rejected — incompatible with the outage-resilience requirement, which the PRD itself specifies).
**Reference**: `docs/adr/0010-early-access-storage.md`.

## Decision: Rate-limiting key

**Decision**: Rate limit by a hashed IP address (`ip_hash` field, not raw IP, to minimize PII retention) within a rolling one-hour window, capped at 5 submissions.
**Rationale**: Matches the PRD's literal rule ("more than 5 submissions per IP per hour") while minimizing stored personal data (constitution: data minimization).
**Alternatives considered**: Rate-limit by email only (rejected — doesn't stop a bot cycling through many emails from one source); by session cookie only (rejected — trivially bypassed by clearing cookies, unlike an IP-based limit).

## Decision: Confirmation token design

**Decision**: A single-use, randomly generated token string, stored alongside the subscriber record with an explicit expiry timestamp (created_at + 48h), checked and invalidated atomically on use.
**Rationale**: Standard, simple, auditable; no external dependency needed.
**Alternatives considered**: JWT-based stateless tokens (rejected — adds a verification-library dependency for no benefit at this scale, and stateless tokens are harder to make genuinely single-use without also tracking state anyway).

## Decision: Email-tool vendor

**Decision**: Deferred (ADR 0011) — the `EmailSync` service is built against a small internal interface (`sync(Subscriber $s): bool`), so the concrete vendor integration is a swap-in implementation, not a redesign.
**Status**: BLOCKED pending owner selection.

## Dependencies confirmed from prior planning

`docs/architecture/checkout-flow.md` (pattern reference for idempotency/validation discipline, reused here for signup), `docs/audit/interaction-inventory.md` (confirms `EarlyAccessForm`'s existing idle/loading/success/error state contract).
