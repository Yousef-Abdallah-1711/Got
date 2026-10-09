# Dark / Light Token Table — Implementation-Ready

Source: `GØT Design System (2)/tokens/colors.css` (VERIFIED, read in full) reconciled against `DESIGN.md` §3 (VERIFIED). Where the two disagree, both values are shown and the conflict is cross-referenced to `docs/audit/source-conflicts.md`. This table is what the Sage Tailwind config (`tailwind.config.js` theme extension reading CSS custom properties) should consume directly.

## Raw palette (theme-independent)

```css
:root {
  --got-obsidian: #080808;
  --got-packaging: #111111;
  --got-graphite: #202020;
  --got-rule: #303030;
  --got-steel: #777777;      /* decorative only — never body text */
  --got-silver: #BFC0C2;
  --got-offwhite: #F2F2F0;
  --got-white: #FFFFFF;
  --got-lime: #C2FF3D;       /* UNAPPROVED — see conflict C-01, gate behind data-accent */
  --got-elevated: #141414;   /* implementation-only; drifts from documented #111111 surface */
}
```

## Semantic tokens

| Token | Dark (implemented) | Dark (DESIGN.md) | Light (implemented) | Light (DESIGN.md) | Flag |
|---|---|---|---|---|---|
| `--got-bg` | `#080808` | `#080808` | `#F4F4F1` | `#F2F2F0` | Light bg: minor drift |
| `--got-surface` | `#141414` | `#111111` | `#FFFFFF` | `#FFFFFF` | Dark surface: minor drift |
| `--got-surface-2` | `#202020` | `#202020` | `#E9E9E5` | `#E6E6E4` | Light surface-2: minor drift |
| `--got-border` | `#303030` | `#303030` | `#D0D0CE` | `#D0D0CE` | ✅ match |
| `--got-text` | `#F2F2F0` | `#F2F2F0` | `#080808` | `#080808` | ✅ match |
| `--got-text-muted` | `var(--got-ash)` *(undefined in `colors.css` — see C-05)* | `#A3A3A3` | `#555555` | `#555555` | **Dark value needs verification** (C-05) |
| `--got-accent` | `#C2FF3D` (lime) | `#BFC0C2` (silver) | `#3D5200` (olive) | `#3A3A3C` (gunmetal) | ❌ **C-01, REQUIRES APPROVAL** |
| `--got-cta-bg` | `#C2FF3D` (lime) | `#F2F2F0` (off-white) | `#C2FF3D` (lime, same both themes) | `#080808` | ❌ **C-01, REQUIRES APPROVAL** |
| `--got-cta-text` | `#080808` | `#080808` | `#080808` *(both via `on-accent`)* | `#F2F2F0` | Value coincidentally matches dark; **light-mode CTA text does not match DESIGN.md at all** once lime is in play — needs re-derivation once C-01 resolves |
| `--got-logo` | `#FFFFFF` | `#FFFFFF` | `#080808` | `#080808` | ✅ match |
| `--color-focus` | `#C2FF3D` (lime) | not a literal hex in DESIGN.md, but implied silver-family | `#080808` (obsidian) | — | Tied to C-01 |

## Production-ready alternative: the already-built silver revert

```css
html[data-accent="silver"] {
  --accent: var(--got-silver);
  --accent-ink: var(--got-silver);
  --color-focus: var(--got-silver);
}
html[data-accent="silver"][data-theme="light"] {
  --accent-ink: var(--got-gunmetal); /* #3A3A3C */
  --color-focus: var(--got-gunmetal);
}
```

**Recommendation (PROPOSED, pending owner approval via C-01):** ship with `data-accent="silver"` as the default `<html>` attribute (i.e., default to the DESIGN.md-documented, brand-identity-consistent silver treatment), and only drop the attribute (reverting to lime) if the brand owner explicitly approves Acid Lime after seeing both options rendered side by side. This recommendation reverses the design system's own current default (lime) in favor of the two documents the project's own source-priority order ranks higher (DESIGN.md/brand identity over an unreviewed design-system addition) — flagged clearly as a recommendation, not a unilateral decision.

## Status colors (implementation-only; DESIGN.md asks for these without specifying values)

| Token | Dark | Light |
|---|---|---|
| Error | `#FF7A6E` | `#B3261E` |
| Success | `#6FCF8E` | `#1E7A3C` |
| Warning | `#E8B85A` | `#8A5A00` |

These must still be run through an automated contrast checker against their respective surface colors before sign-off (DESIGN.md §9 requirement) — not yet done in this planning pass.

## Typography tokens (per DESIGN.md §4, VERIFIED by quote; not independently re-checked against `typography.css`'s literal values in this pass)

Inter Tight (display/headings, 600–700 weight), Inter (body/UI, 400–600), IBM Plex Mono (eyebrows/prices/mono labels, 400–500). Clamp-based fluid sizing per the table in `docs/audit/visual-baseline.md` §2.

## Spacing/motion tokens

Reproduced from `docs/audit/visual-baseline.md` §3–4 — 4px base scale (4·8·12·16·24·32·48·64·96·128), `cubic-bezier(.2,.7,.2,1)` easing, 120–180ms controls / 200–320ms panels / 400–600ms reveals.
