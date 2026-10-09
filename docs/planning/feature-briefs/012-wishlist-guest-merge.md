**Status: PROPOSED feature brief — not yet run through full Spec Kit specify/plan/tasks workflow. Run `/speckit.specify` when this feature is scheduled to start.**

**Superseded for implementation purposes by `specs/012-wishlist-guest-merge/spec.md`, `plan.md`, and `tasks.md`** (generated via the real Spec Kit workflow). This brief is kept as the original planning rationale and is not updated further; treat the Spec Kit artifacts as authoritative for scope, acceptance criteria, and tasks.

# 012 — Wishlist and Guest-to-Account Merge

## Summary
Implements PRD **P1-F004** per `docs/architecture/wishlist-flow.md` and ADR 0007: heart icon across header/product-card/PDP/wishlist page, guest localStorage persistence, authenticated user-meta persistence, guest-to-account merge on login.

## Scope
**In**: `/wishlist/` page (port of `Wishlist.jsx`), heart icon wiring across `ProductCard`/PDP/`Account.jsx`'s wishlist tab, guest cookie/localStorage mechanism (mirroring `wishlist-store.js`'s de-duplication/try-catch pattern), merge-on-login routine.
**Out**: the C-06 guest-gate decision (log in prompt vs. silent guest) is a **REQUIRES APPROVAL** input to this feature, not something this feature resolves itself.

## Dependencies
Hard: 008 (needs products to wishlist), ADR 0007. Soft: 011 (merge-on-login needs accounts to exist and be testable).

## Acceptance Criteria
(Verbatim, PRD P1-F004) Wishlist persists across sessions for logged-in customers; moving an item to cart validates stock/variation availability; heart icon state announced to screen readers ("Saved"/"Save to wishlist").

## Risk Register
- C-06 unresolved — feature cannot be marked "done" (only "built pending a UX branch point") until the owner decides guest-gate behavior.
- Stale wishlist entries for removed/discontinued products — must show the "no longer available" state already correctly designed in `Wishlist.jsx`, not a broken card.

## Testing Requirements
E2E: guest wishlist persistence (30 days, cross-tab sync), authenticated wishlist persistence, guest-to-account merge with no duplicates, move-to-cart stock re-validation, removed-product graceful degradation.

## Visual Parity Requirements
Full — against `Wishlist.jsx` and the wishlist-tab panel in `Account.jsx`.

## Definition of Done
All PRD P1-F004 AC pass; C-06 resolved and implemented accordingly; merge-on-login produces zero duplicate entries in every tested ordering (guest-wishlists-then-registers vs. guest-wishlists-then-logs-into-existing-account).
