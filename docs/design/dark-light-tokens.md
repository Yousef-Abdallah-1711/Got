# Dark / Light Token Table — Implementation-Ready

Source: `GØT Design System (2)/tokens/colors.css` (VERIFIED, read in full) reconciled against `DESIGN.md` §3 (VERIFIED). Where the two disagree, both values are shown and the conflict is cross-referenced to `docs/audit/source-conflicts.md`. The token system is implemented by Sage's CSS-first Tailwind theme in `wp-content/themes/got-sage/resources/css/app.css`, with source values in `wp-content/themes/got-sage/resources/css/tokens.css`.

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
  --got-lime: #C2FF3D;       /* owner-approved primary accent — see resolved conflict C-01 */
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
| `--got-text-muted` | `var(--got-ash)` (`--got-ash: #A3A3A3` is defined in `colors.css`; see resolved C-05) | `#A3A3A3` | `#555555` | `#555555` | Source token verified; port the value from the source |
| `--got-accent` | `#C2FF3D` (lime) | `#BFC0C2` (silver) | `#3D5200` (olive) | `#3A3A3C` (gunmetal) | Source/design-guide difference recorded under resolved C-01; preserve the approved source mapping |
| `--got-cta-bg` | `#C2FF3D` (lime) | `#F2F2F0` (off-white) | `#C2FF3D` (lime, same both themes) | `#080808` | Acid Lime treatment is owner-approved under C-01 |
| `--got-cta-text` | `#080808` | `#080808` | `#080808` *(both via `on-accent`)* | `#F2F2F0` | Preserve source mapping; verify contrast during implementation |
| `--got-logo` | `#FFFFFF` | `#FFFFFF` | `#080808` | `#080808` | ✅ match |
| `--color-focus` | `#C2FF3D` (lime) | not a literal hex in DESIGN.md | `#080808` (obsidian) | — | Acid Lime treatment is owner-approved under C-01; preserve the source mapping |

## Optional existing silver override

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

The owner-approved default is the Acid Lime treatment recorded in C-01 and the Feature 003 research. The design system retains `data-accent="silver"` as an opt-in override; this table documents it without changing the approved default.

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

## Implemented reusable token API

`resources/css/tokens.css` defines all 126 unique custom-property names from the supplied colors, typography, spacing, and effects token files. The `--scrim-bottom` gradient is included with motion and elevation tokens. Theme changes update semantic custom properties in place, so components can use the same names in dark and light modes.

The `@theme inline` block in `resources/css/app.css` exposes the tokens through Tailwind v4 utilities:

- Colors: `bg-got-page`, `text-got-lime`, `border-got-border`, `text-got-error`, and the other `got-*` palette and semantic names.
- Font families, sizes, line heights, weights, and tracking: `font-got-display`, `text-got-h1`, `leading-got-body`, `font-got-semibold`, and `tracking-got-caps`.
- Spacing, sizing, containers, aspect ratios, and radii: `gap-got-6`, `px-got-gutter`, `max-w-got-content`, `aspect-got-card`, and `rounded-got-card`.
- Motion, elevation, and stacking: `ease-got-mechanical`, `duration-(--dur-control)`, `shadow-got-panel`, and `z-(--z-drawer)`.
- Responsive variants: `got-tablet:*`, `got-desktop:*`, and `got-wide:*`. Tailwind needs literal media-query thresholds, which mirror the `--bp-*` custom properties in `tokens.css`.

Border width and focus-ring thickness, transition durations, stacking levels, and the image scrim remain direct CSS custom properties because Tailwind v4 does not define theme namespaces for those token types. Use `var(--border-w)`, `var(--focus-w)`, `var(--focus-offset)`, `var(--dur-*)`, `var(--z-*)`, and `var(--scrim-bottom)` in component CSS or the `duration-(--dur-control)` / `z-(--z-drawer)` utilities where appropriate.

For component CSS, use the original custom properties directly, for example `color: var(--got-text)` or `padding: var(--space-4)`. Avoid adding local palette, type, spacing, radius, or motion values where an approved token exists. Font files are not supplied; the current font-family tokens keep their documented fallback stacks until licensed files are available.
