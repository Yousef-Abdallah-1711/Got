# Feature Specification: WordPress, WooCommerce, and Sage Foundation

**Feature Branch**: `002-wp-woo-sage-foundation`

**Created**: 2026-10-09

**Status**: Draft

**Input**: User description: "WordPress, WooCommerce, and Sage theme foundation: provision environment, install WordPress, WooCommerce with HPOS, Roots Sage 10 on Acorn, Vite, Tailwind, and set up the got-sage theme and got-commerce plugin skeletons with CI."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Developer provisions a working staging environment (Priority: P1)

As the developer of record, I need a staging environment with WordPress, WooCommerce, and the theme/plugin skeleton running, so that every subsequent feature has somewhere real to build against instead of a local-only guess.

**Why this priority**: Nothing else in the project (homepage, catalog, checkout, accounts) can be built, demoed, or tested without this existing first. It is the literal foundation.

**Independent Test**: Visit the staging URL over HTTPS; WordPress admin login works; WooCommerce is active with Egyptian Pound (EGP) as store currency; the `got-sage` theme is active and renders a default page without PHP errors.

**Acceptance Scenarios**:

1. **Given** a fresh managed-hosting account, **When** the environment is provisioned, **Then** the site is reachable over HTTPS with a valid SSL certificate and no mixed-content warnings.
2. **Given** WooCommerce is installed, **When** an administrator checks Settings → Advanced → Features, **Then** High-Performance Order Storage (HPOS) is enabled.
3. **Given** the `got-sage` theme is activated, **When** any page is requested, **Then** it renders without a PHP fatal error or a white screen.

---

### User Story 2 - Developer gets fast, safe feedback on every change (Priority: P2)

As the developer of record, I need every code change checked automatically before it reaches staging, so that a mistake is caught in minutes, not discovered by a customer.

**Why this priority**: This project has a single-developer risk profile (no second reviewer by default) — automated checks are the primary safety net.

**Independent Test**: Open a pull request with an intentional lint violation; confirm the automated check fails and blocks merge; fix it; confirm the check passes and the change deploys to staging automatically.

**Acceptance Scenarios**:

1. **Given** a pull request is opened, **When** the automated checks run, **Then** PHP static analysis, PHP coding-standards, CSS/JS linting, and the frontend build all run and report pass/fail.
2. **Given** all checks pass and the pull request is merged, **When** the merge completes, **Then** the change is automatically deployed to the staging environment without manual steps.
3. **Given** a check fails, **When** the pull request is reviewed, **Then** the failure is visible before merge is possible.

---

### User Story 3 - Future maintainer can set the project up from scratch (Priority: P3)

As a future developer who is not the original builder, I need a documented setup process, so that the single-key-person risk this project has identified does not become a project-ending event if the original developer becomes unavailable.

**Why this priority**: Lower urgency than having the environment itself, but required before the project can be considered safely handed off at any point.

**Independent Test**: A second person, following only the README, successfully stands up a local copy of the project without asking the original developer a question.

**Acceptance Scenarios**:

1. **Given** a clean machine with the documented prerequisites installed, **When** a new contributor follows the README, **Then** they reach a locally running copy of the site within the documented steps, with no missing instructions.

### Edge Cases

- What happens when the chosen hosting provider's PHP version is lower than required? → Provisioning must be rejected/corrected before any further feature work begins; this is a hard precondition, not a workaround.
- How does the system handle a WooCommerce or theme-framework version that no longer matches what was planned? → The version actually installed must be recorded and compared against the planning assumption; a mismatch is flagged, not silently accepted (see `docs/adr/0001-sage-version.md`).
- What happens if the automated checks pipeline itself fails to run (e.g., CI outage)? → Merging to the main branch must remain blocked until checks can run; there is no "merge anyway" path.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The environment MUST provide HTTPS with a valid certificate on both staging and (later) production, with HTTP requests redirected to HTTPS.
- **FR-002**: The environment MUST run WordPress and WooCommerce with store currency set to EGP, base country set to Egypt, tax configuration explicitly set (per the accountant's direction, or explicitly disabled pending it — never left at an unexamined default), and High-Performance Order Storage (HPOS) enabled before any order-related feature is built.
- **FR-003**: The environment MUST run on the theme framework version confirmed by the project's version-decision record, not a silently different version.
- **FR-004**: The system MUST separate presentation code (theme) from business-logic code (plugin) into two independently identifiable units from the first commit, per the project's theme/plugin boundary rule.
- **FR-005**: Every code change MUST pass automated static-analysis, coding-standard, and build checks before it can be merged.
- **FR-006**: Every change merged to the main line MUST deploy to a staging environment automatically, without manual file copying.
- **FR-007**: Deployment to the production environment MUST require a manual, explicit approval step and MUST NOT happen automatically on merge.
- **FR-008**: The project MUST maintain a written setup guide sufficient for a new contributor to reach a working local environment without asking the original developer.
- **FR-009**: The system MUST NOT modify WordPress or WooCommerce core files under any circumstance.
- **FR-010**: Database and media files MUST NOT be pushed from a developer's local machine to staging or production as part of the deployment process.
- **FR-011**: The environment MUST provide a single, capability-gated admin control that switches the public site between Coming Soon and Store presentation, which MUST refuse the switch to Store while zero products are published and in stock, and MUST record every switch with the acting user and timestamp — this requirement was found to have no task owner anywhere in the original 16 features during the traceability-matrix audit and is added here as part of that remediation.

### Key Entities

- **Environment**: a named deployment target (local, staging, production) with its own URL, credentials, and configuration; exactly one is "live" (production) at a time.
- **Theme**: `got-sage` — the presentation unit; owns templates, styles, and client-side behavior.
- **Plugin**: `got-commerce` — the business-logic unit; owns persistence, validation, and integrations, independent of which theme is active.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A new visitor can reach the staging site over a secure connection with zero certificate warnings, 100% of the time.
- **SC-002**: A code change with an introduced defect is caught by automated checks before merge in 100% of cases where the defect is of a kind the checks cover (syntax, style, build failure).
- **SC-003**: A merged, check-passing change appears on staging within the same deployment cycle (minutes, not hours) without any manual intervention.
- **SC-004**: A second developer, given only the written setup guide, reaches a working local environment without external help, verified by a dry run before this feature is considered done.
- **SC-005**: Zero production deployments occur without an explicit, recorded approval step.

## Assumptions

- The hosting provider and the exact theme-framework version are confirmed via the project's own decision process (`docs/adr/0001-sage-version.md`, `docs/adr/0012-hosting-and-caching.md`) before this feature's work begins; this spec does not re-decide them.
- A single developer is the primary builder at this stage (per the project's documented risk profile), so the setup-documentation requirement (User Story 3) is a safeguard, not evidence that a second developer is currently active.
- "Production" environment provisioning itself (DNS, go-live) is addressed by the later production-acceptance feature; this feature's scope is the environment existing and working, not the final cutover.
