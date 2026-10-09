**Status: PROPOSED feature brief — not yet run through full Spec Kit specify/plan/tasks workflow. Run `/speckit.specify` when this feature is scheduled to start.**

**Superseded for implementation purposes by `specs/003-design-tokens-global-ui/spec.md`, `plan.md`, and `tasks.md`** (generated via the real Spec Kit workflow). This brief is kept as the original planning rationale and is not updated further; treat the Spec Kit artifacts as authoritative for scope, acceptance criteria, and tasks.

# 003 — Design Tokens and Global UI

## Summary
Implement the dark/light CSS token system, and the global template parts (Header in its 3 modes, Footer, AnnouncementBar, ThemeToggle, CartDrawer shell) per `docs/design/dark-light-tokens.md` and `docs/design/component-mapping.md`. Corresponds to PRD P0-F001 (mode-aware header rendering) and P0-F002 (dark/light mode) in full.

## Scope
**In**: `tokens.css` port (resolving the Acid Lime vs. silver decision first), Tailwind theme config consuming the tokens, no-flash theme-bootstrap inline script, Header (3 modes)/Footer/AnnouncementBar/ThemeToggle/CartDrawer Blade partials + Alpine islands.
**Out**: page content (004+), product/cart data wiring (CartDrawer ships with empty-state only here, wired to real cart in 010).

## Dependencies
Hard: 002. Soft: the Acid Lime decision (C-01) should resolve before this feature is marked done, though scaffolding can start with a placeholder.

## Acceptance Criteria
(Verbatim from PRD P0-F002) No flash of incorrect theme on hard reload, either mode, verified on 3G-throttled profile; all text meets 4.5:1 contrast (large text/UI 3:1) in both modes; theme toggle keyboard-operable with visible focus ring; stored preference persists across navigation and browser restart; toggle has a dynamic accessible name.

## Risk Register
- C-01 unresolved at feature-start — mitigation: do not hardcode lime as a "temporary" default (see `docs/planning/implementation-order.md`'s explicit warning).
- C-05 (`--got-ash` undefined variable) — verify/fix during token porting, not after.
- R-009 (palette fails contrast on some product photography) — contrast audit required before Phase 1 sign-off (PRD).

## Testing Requirements
Visual regression (dark+light, 6 breakpoints); automated contrast check (axe-core or equivalent) on every token pairing; manual keyboard-only pass on Header/ThemeToggle/mobile menu; reduced-motion verification on AnnouncementBar.

## Visual Parity Requirements
Full — this is the foundational visual layer every other feature inherits; any drift here propagates everywhere. See `docs/design/visual-parity-matrix.md`.

## Definition of Done
Contrast audit shows zero failing pairs either mode; no theme flash on reload; all 3 header modes render correctly; Footer links read from WordPress menus (not hardcoded); AnnouncementBar pause/reduced-motion behavior verified.
