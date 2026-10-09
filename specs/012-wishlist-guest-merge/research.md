# Phase 0 Research: Wishlist and Guest-to-Account Merge

## Decision: Storage mechanism (ADR 0007)

**Decision**: WordPress user meta for authenticated users; cookie/localStorage for guests.
**Rationale**: At this catalog/usage scale, a new custom table adds maintenance cost with no queryability benefit actually needed; user meta is automatically covered by WordPress's own data export/deletion tools.
**Alternatives considered**: Custom table (rejected for now, see ADR 0007); third-party wishlist plugin (rejected — unnecessary dependency, the feature is already fully specified).

## Decision: Cross-component sync mechanism

**Decision**: A single small Alpine store (or equivalent shared reactive state) hydrated from a server-rendered initial wishlist state, updated on every add/remove action's response, with a `storage` event listener for guest cross-tab sync.
**Rationale**: Mirrors the prototype's own "one React state, synchronizes across same-origin tabs" design intent, achievable without a client-side framework.
**Alternatives considered**: Independent per-component fetches with no shared state (rejected — risks the header count and a product card disagreeing momentarily, which is the exact UX bug this feature's SC-001 is written to prevent).

## Decision: Merge-on-login timing

**Decision**: The guest list (read from the browser) is sent to the server as part of the login/registration success flow (a small JS call immediately following successful auth), merged server-side, then the guest store is cleared.
**Rationale**: Keeps the merge server-side (so dedup logic lives in one place, testable with PHP unit tests) while still being triggered by the client at the only moment it has both pieces of information (the just-authenticated session and the guest's local list).

## Dependencies confirmed from prior planning

`docs/architecture/wishlist-flow.md` (full flow diagram already drawn there), `docs/audit/interaction-inventory.md` (confirms `wishlist-store.js`'s existing correct de-dup/try-catch pattern to preserve).
