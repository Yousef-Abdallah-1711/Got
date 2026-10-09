# ADR 0007 — Wishlist Persistence Model

## Status
PROPOSED.

## Context

PRD P1-F004: wishlist persists across sessions for logged-in customers; guests get a temporary local-storage-based list (30 days, per the alternate flow). Catalog scale per PRD §8 is "up to 100 products at launch... design for 1,000" — small enough that wishlist storage has no meaningful performance concern either way.

## Options

1. **WordPress user meta** — a single serialized array (or multiple meta rows) per user, keyed `_got_wishlist`.
2. **Custom table** (`got_wishlist_items`: user_id, product_id, variation_id, created_at).
3. **A third-party wishlist plugin** (e.g. a popular WooCommerce wishlist extension).

## Trade-offs

- Option 1: zero schema migration, trivially backed up with the rest of `wp_usermeta`, simplest to reason about at this scale; con: slightly less queryable (can't easily "find all users who wishlisted product X" without a meta query, which is rarely needed here).
- Option 2: better queryability, more "correct" relationally; con: a new table to migrate/maintain for a feature with no projected need for that queryability, and adds a dependency the constitution's "avoid unnecessary schema" principle (9) argues against at this scale.
- Option 3: fastest to ship, but a third-party plugin adds to the capped 15-plugin budget (PRD §9), is an unnecessary third-party dependency (Principle 9) for a feature this small and already fully specified by the design system's own components, and risks HPOS/theme-conflict issues outside the team's control.

## Decision

**Option 1 (WordPress user meta)** for authenticated wishlist storage; **cookie/localStorage** (mirroring `wishlist-store.js`'s already-correct, de-duplicated, try/catch-wrapped pattern) for guest storage, reconciled via a merge routine on login per `docs/architecture/wishlist-flow.md`. Revisit only if usage data post-launch shows a real need for cross-user wishlist queries (e.g. "most-wishlisted product" reporting) that user meta can't serve efficiently.

## Consequences

- No new database table, no migration to write/test/roll back.
- Wishlist data is automatically included in standard WordPress user-data export/deletion tools (constitution/PRD data-compliance requirement), since it's ordinary user meta.
- If "most-wishlisted product" reporting is ever requested, it would require either a meta-query-based report (slow at scale, acceptable at this catalog size) or revisiting this ADR.

## Approval status

PROPOSED — technical implementation choice, does not require owner sign-off; the *feature's* v1 inclusion is already approved as P1 per the PRD, only this storage mechanism is this ADR's subject.
