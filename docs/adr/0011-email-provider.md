# ADR 0011 — Email Provider(s)

## Status
BLOCKED — both the marketing and transactional provider are literally `[TBD]` in the PRD.

## Context

PRD §9 External Integrations lists "Email marketing tool (Mailchimp, MailerLite, or equivalent — TBD)" for early-access/drop announcements, and a separate "Transactional email provider (SMTP or API)" for order/account emails, explicitly kept separate per constitution governance ("Keep marketing and transactional messaging separate," also stated independently in `PRODUCT.md` §7). PRD Risk R-004 flags deliverability (SPF/DKIM/DMARC) as a scored risk requiring Phase 1 testing.

## Options

**Marketing/early-access list:**
1. Mailchimp — mature API, broad familiarity.
2. MailerLite — lower cost, simpler API, good for a single-brand small list.
3. A WordPress-native newsletter plugin storing subscribers locally only — rejected per ADR 0010's reasoning (resilience/retry requirement assumes an external tool exists to sync to).

**Transactional (order/account emails):**
1. Managed WordPress host's built-in SMTP.
2. A dedicated transactional API (e.g. Postmark, SendGrid, Amazon SES) via an SMTP plugin, for better deliverability monitoring and the PRD's "≥98% delivery within 2 minutes" target.

## Trade-offs

- Marketing-tool choice has no architectural consequence beyond the `got-commerce` sync-service's API client — swappable later without a redesign, since the plugin's `Integrations/EmailSync.php` (per `docs/architecture/wordpress-structure.md`) is the only place that would change.
- Transactional-email choice matters more for the uptime/deliverability metrics the PRD explicitly scores (R-004, §12 "Order confirmation email delivery ≥98% within 2 min") — host-default SMTP is often the weakest link for deliverability (shared IP reputation); a dedicated transactional API gives better delivery guarantees and logs/monitoring, directly supporting PRD §8's "email delivery monitoring... alert below 98%."

## Decision

**Deferred to the owner** for the specific vendor names (both are genuinely `[TBD]` with no documented lean toward one), but the **architecture decision** is fixed regardless of vendor: (1) marketing and transactional messaging use **two separate integrations**, never one combined tool sending both; (2) the transactional path uses a dedicated SMTP/API provider (not bare host SMTP) specifically to meet the PRD's quantified deliverability target, configured with SPF/DKIM/DMARC on the sending domain in Phase 1 per PRD Risk R-004's mitigation; (3) both integrations live behind a thin interface in `got-commerce/src/Integrations/`, so swapping either vendor later is a config change, not a code change scattered across the plugin.

## Consequences

- Phase 1 task list (already in PRD §10) must include SPF/DKIM/DMARC configuration and a deliverability test against major providers before sign-off — already explicitly listed in the PRD, just reiterated here as an architectural consequence of this decision.
- No code is blocked by the vendor choice remaining open — the interface/abstraction can be built and tested with a sandbox/test provider while the owner decides.

## Approval status

**REQUIRES APPROVAL** (vendor selection for both marketing and transactional email) — architecture pattern above is PROPOSED and does not itself require sign-off.
