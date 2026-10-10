# Phase 0 Research: Design Tokens and Global UI

## Decision: Accent color (resolves prior conflict C-01)

**Decision**: Acid Lime `#C2FF3D` is the approved primary accent, applied to `--got-cta-bg` (primary button), `--color-focus` (focus ring), and the `AnnouncementBar`'s default treatment, in both themes, while the surface/text palette remains monochrome (obsidian/graphite/silver/off-white) — the accent highlights, it does not replace the base palette.
**Rationale**: Explicit owner approval (2026-10-09), superseding the earlier flagged conflict between the design system's own default (lime) and the documented brand guide (silver).
**Alternatives considered**: Silver/gunmetal accent (the previous DESIGN.md-documented default, now not chosen); a user-switchable accent (`data-accent="silver"` override) — the underlying CSS mechanism for this already exists in the ported tokens and is retained as a low-cost, unused escape hatch, not exposed to visitors.
**Action**: C-01 is recorded RESOLVED in `docs/audit/source-conflicts.md`; `docs/design/dark-light-tokens.md` should preserve the approved semantic mapping and note the optional silver override.

## Decision: Dark-surface/light-background token value drift

**Decision**: Use the *implemented* design-system values (`--got-surface: #141414` dark; light bg/surface-2 at `#F4F4F1`/`#E9E9E5`) as the production baseline, not the slightly different values documented in `DESIGN.md` (`#111111`/`#F2F2F0`/`#E6E6E4`), since the owner's approval of the design system's accent treatment implies acceptance of its token set as the working baseline.
**Rationale**: The drift is minor (single-shade differences) and re-deriving a third, blended value set would add risk for no clear benefit; the design system's values are what was actually built and reviewed.
**Alternatives considered**: Reconciling to the DESIGN.md values exactly (rejected — no owner signal requested this, and it would be rework without a stated reason).

## Decision: `--got-ash` source token verification (C-05)

**Decision**: The source file `GØT Design System (2)/tokens/colors.css` defines `--got-ash: #A3A3A3`; preserve that token when porting and confirm the resulting muted-text value.
**Rationale**: Direct source inspection on 2026-10-10 resolved C-05; this is no longer an undefined-variable investigation.

## Decision: No-flash theme script placement

**Decision**: A small, non-module, synchronous inline `<script>` in `<head>`, executed before any CSS/Alpine loads, reads `localStorage['got-theme']` → falls back to `prefers-color-scheme` → falls back to dark, and sets `data-theme` on `<html>` before first paint.
**Rationale**: This is the only mechanism that can prevent a flash of the wrong theme — Alpine.js (or any deferred/module script) initializes too late.
**Alternatives considered**: CSS-only `prefers-color-scheme` media query with no manual override (rejected — PRD explicitly requires a manual toggle that persists and overrides the OS setting).

## Dependencies confirmed from prior planning

`docs/design/dark-light-tokens.md`, `docs/design/component-mapping.md` (Header/Footer/AnnouncementBar/ThemeToggle/CartDrawer rows), `docs/design/responsive-contracts.md`.
