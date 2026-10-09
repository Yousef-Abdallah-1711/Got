# ADR 0013 — Deployment Architecture

## Status
PROPOSED.

## Context

PRD §9 fixes Git-based deployment, Composer/npm builds in CI (not on the server), GitHub Actions for lint/build on every PR, auto-deploy to staging on merge to `main`, and manual-approval deploy to production. The only open structural question is whether the WordPress install uses a conventional single-root layout or a Bedrock-style `web/app` + `web/wp` split (raised in `docs/architecture/wordpress-structure.md`).

## Options

1. **Conventional WordPress root** (`wp-content/themes/got-sage`, `wp-content/plugins/got-commerce` inside a standard `wp-content` tree) — what most managed WordPress hosts expect by default.
2. **Bedrock-style split root** (`web/wp` for WordPress core, `web/app` for content, environment-variable-based config via `.env`) — a popular Roots-ecosystem pairing with Sage, but an additional structural layer not mentioned anywhere in the PRD.

## Trade-offs

- Option 1 is simplest to deploy to a typical managed WordPress host (which may not support Bedrock's non-standard document root out of the box) and matches what the PRD's own file-structure snippets imply (`resources/`, `app/` directly under the theme, not a project-root `web/` split).
- Option 2 gives cleaner environment-variable-based secrets management (database credentials, API keys) and a more explicit "WordPress core is vendor code" separation, but adds a dependency on the chosen host supporting a non-standard document root (relevant to ADR 0012's hosting choice) and is not requested anywhere in the project's own documents.

## Decision

**Option 1 (conventional root)**, unless the eventual hosting-provider selection (ADR 0012) specifically supports and the dev lead prefers Bedrock's environment-config ergonomics — in which case this ADR should be revisited together with ADR 0012, not decided in isolation. Secrets (API keys for email/analytics integrations) are managed via a standard WordPress-constants-in-a-gitignored-`wp-config.php`-include approach regardless of root layout choice, never committed to the repository.

## Consequences

- Deployment scripts/CI steps target a standard `wp-content` path.
- If a future host constrains this choice, revisiting is a configuration change, not a code architecture change, since the theme/plugin internals (Blade views, PHP classes) don't reference the document-root layout directly.

## Approval status

PROPOSED — low-stakes, reversible choice; flagged for joint review with ADR 0012 at hosting-selection time.
