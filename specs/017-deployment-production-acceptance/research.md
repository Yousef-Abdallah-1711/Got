# Phase 0 Research: Production Deployment and Launch Acceptance

## Decision: Smoke test scope

**Decision**: The production smoke test covers exactly the 7 flows named in the PRD's own Phase 4 validation step (homepage, shop, product, cart, COD checkout, confirmation email, early-access sign-up) — not the full regression suite, which already ran on staging in Feature 016.
**Rationale**: Running the entire test suite against production is unnecessary duplication; the smoke test exists to catch production-environment-specific issues (DNS, SSL, environment config) that staging testing cannot catch by definition.
**Alternatives considered**: Full regression suite on production (rejected — redundant with Feature 016, and riskier to run destructively against a real environment).

## Decision: Backup-restore drill environment

**Decision**: Restore to a separate, disposable scratch environment — never restore-test against production or staging directly.
**Rationale**: A restore operation is itself destructive to its target; testing it against a live environment would be reckless.

## Decision: Early-access migration approach

**Decision**: A one-time migration script reading all `confirmed` records from `got_early_access` (Feature 005) and pushing them to the production email tool via the same `EmailSync` interface already built, then the script is retired (not a recurring job).
**Rationale**: Reuses existing integration code rather than building a separate one-off export mechanism.

## Decision: Launch approval gate

**Decision**: A literal, dated, written confirmation from the brand owner (not implied by scheduling) is the explicit precondition for flipping Store Mode to live — recorded alongside the deployment, not just assumed from a calendar date.
**Rationale**: Directly implements constitution Principle 20 and PRD's explicit "launch date only confirmed after Phase 4 review" rule.

## Dependencies confirmed from prior planning

`docs/architecture/deployment.md`, PRD §10 Phase 4 task list and validation step, PRD §15 Approval Gates table.
