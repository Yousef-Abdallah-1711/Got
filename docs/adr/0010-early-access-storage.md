# ADR 0010 — Early-Access Subscriber Storage

## Status
PROPOSED (PRD itself defers this decision to Phase 1 — this ADR pre-answers it so Phase 1 doesn't stall).

## Context

PRD §9 Database Architecture proposes a custom table `got_early_access` but immediately hedges: "Alternatively, early-access records are stored as a custom post type or in the email tool; the decision is recorded in Phase 1. Where possible, use WordPress options and post meta to avoid custom schema changes." Required fields: id, email (unique), first_name, whatsapp, status (pending/confirmed/sync_pending/unsubscribed), consent_text, consent_at, confirmed_at, ip_hash, created_at.

## Options

1. **Custom table `got_early_access`** — as literally drafted in the PRD.
2. **Custom post type** (`early_access_subscriber`), fields as post meta.
3. **Email-tool-only** (no local WordPress storage at all; the email marketing tool is the sole source of truth).

## Trade-offs

- Option 1 is the most queryable/performant for rate-limiting checks ("more than 5 submissions per IP per hour," PRD A5) and consent-audit queries, and is explicitly the PRD's first-choice draft; con: one small, well-justified custom table (acceptable under Principle 9 — "only when content is... independently managed... requires its own... workflow," which a consent/compliance record genuinely does).
- Option 2 (CPT) adds WP-admin-native browsing/search for free (useful for the Shop Manager/Content Editor persona checking signups) but post-meta storage is slower for the rate-limiting/duplicate-email lookups this feature performs on every submission, and a "subscriber" isn't really editorial content — using a CPT for it is a mild misuse of the CPT justification rule (`docs/adr` CPT guidance / HTML-to-Sage Principle V).
- Option 3 removes the "email tool outage → sync_pending retry" resilience the PRD explicitly requires (A6: "Email tool unavailable: Subscriber is saved locally... retry job runs every 15 minutes") — this option is incompatible with the PRD's own alternate flow and is effectively ruled out by the PRD itself, not by this ADR.

## Decision

**Option 1 — a small custom table `got_early_access`**, exactly as PRD §9 drafts it, including the unique index on `email` for idempotent duplicate handling and an index on `created_at`/`status` for the 30-day unconfirmed-subscriber cleanup job (PRD §8 Data and Compliance: "unconfirmed subscribers deleted after 30 days"). This is a justified exception to "avoid custom schema" because: it's a compliance-sensitive consent record requiring fast duplicate/rate-limit lookups, it needs a retry queue the email tool can't hold during an outage, and it needs scheduled deletion logic a CPT would make more awkward to query efficiently.

## Consequences

- One new table, one migration, to document in the plugin's activation hook (idempotent — `dbDelta()`-style create-if-not-exists).
- The 30-day unconfirmed-cleanup and 15-minute retry-sync jobs are both WP-Cron tasks owned by `got-commerce`.
- Table schema and retention logic must be reflected in the eventual Privacy Policy content.

## Approval status

PROPOSED — pre-answers a decision the PRD defers to Phase 1; still logged as REQUIRES APPROVAL in the sense that the dev lead/owner should explicitly confirm this before Phase 1 begins, but no conflicting requirement exists to resolve.
