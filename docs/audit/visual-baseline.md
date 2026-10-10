# Visual Baseline

Status: VERIFIED — all values below are quoted directly from `GØT Design System (2)/tokens/colors.css` (32 lines, read in full) cross-referenced against `DESIGN.md` §3–§5 and `GOT_Complete_Brand_Identity.md` §4.2.

## 1. Color tokens — as actually implemented (`tokens/colors.css`)

### Raw palette (`:root`, theme-independent)

| Token | Value | Source note |
|---|---|---|
| `--got-obsidian` | `#080808` | Matches DESIGN.md/brand doc "Obsidian Black" |
| `--got-packaging` | `#111111` | Matches "Packaging Black" |
| `--got-graphite` | `#202020` | Matches |
| `--got-rule` | `#303030` | Matches `--got-border` |
| `--got-steel` | `#777777` | Matches "Steel Gray" — brand doc explicitly: decorative only, not body text |
| `--got-silver` | `#BFC0C2` | Matches "Brushed Silver" |
| `--got-offwhite` | `#F2F2F0` | Matches |
| `--got-white` | `#FFFFFF` | Matches |
| **`--got-lime`** | **`#C2FF3D`** | **Not in DESIGN.md or the brand-identity doc at all.** Design-system-only addition. |
| `--got-elevated` | `#141414` | Not in the brand doc's 7-token table; an implementation-only intermediate surface shade. |
| status bases | red/green/amber 400 & 700 pairs | Implementation-only; DESIGN.md asks for these to be "chosen and contrast-tested" without specifying values — these are the design system's own proposal. |

### Semantic tokens — dark (`:root`, default)

| Token | Value / reference | DESIGN.md §3 table says | Match? |
|---|---|---|---|
| `--got-bg` | `var(--got-obsidian)` = `#080808` | `#080808` | ✅ |
| `--got-surface` | `var(--got-elevated)` = `#141414` | `#111111` | ⚠️ **Mismatch** — implementation uses a slightly lighter `#141414`, not the documented `#111111`. |
| `--got-surface-2` | `var(--got-graphite)` = `#202020` | `#202020` | ✅ |
| `--got-border` | `var(--got-rule)` = `#303030` | `#303030` | ✅ |
| `--got-text` | `var(--got-offwhite)` = `#F2F2F0` | `#F2F2F0` | ✅ |
| `--got-text-muted` | `var(--got-ash)`; `--got-ash: #A3A3A3` is defined in `colors.css` raw palette (verified 2026-10-10; see resolved C-05). | `#A3A3A3` | ✅ Source value verified; preserve when tokens are ported. |
| **`--got-accent`** | `var(--accent-ink)` → `var(--got-lime)` = **`#C2FF3D`** | `#BFC0C2` (silver) | ❌ **Direct conflict** — see §3 below. |
| `--got-logo` | `var(--got-white)` = `#FFFFFF` | `#FFFFFF` | ✅ |
| **`--got-cta-bg`** | `var(--accent)` = **`#C2FF3D`** (lime) | `#F2F2F0` (off-white) | ❌ **Direct conflict** — see §3 below. |
| `--got-cta-text` | `var(--on-accent)` = `var(--got-obsidian)` = `#080808` | `#080808` | ✅ (value matches, but the *reasoning path* now flows through the accent/lime system, not an independent token) |
| `--color-focus` | `var(--got-lime)` = **`#C2FF3D`** | not specified as a literal hex in DESIGN.md (DESIGN.md says "choose and contrast-test"), but §9 implies the accent/silver base | ⚠️ Focus ring color is lime by default. |

### Semantic tokens — light (`[data-theme="light"]`)

| Token | Value | DESIGN.md says | Match? |
|---|---|---|---|
| `--got-bg` | `var(--got-offwhite-2)` = `#F4F4F1` | `#F2F2F0` | ⚠️ Minor mismatch (off-white-2 vs documented off-white). |
| `--got-surface` | `var(--got-white)` = `#FFFFFF` | `#FFFFFF` | ✅ |
| `--got-surface-2` | `#E9E9E5` (literal, inline) | `#E6E6E4` | ⚠️ Minor mismatch. |
| `--got-border` | `var(--got-paper-rule)` = `#D0D0CE` | `#D0D0CE` | ✅ |
| `--got-text` | `var(--got-obsidian)` = `#080808` | `#080808` | ✅ |
| `--got-text-muted` | `var(--got-ink-muted)` = `#555555` | `#555555` | ✅ |
| `--got-accent` | `var(--accent-ink)` = `#3D5200` (a dark olive, computed to contrast against lime) | `#3A3A3C` (gunmetal) | ❌ **Conflict** — a different color family entirely (olive-green vs. gunmetal-gray), downstream of the same lime-vs-silver decision. |
| `--got-cta-bg` | `var(--accent)` = `#C2FF3D` (lime, **same value as dark mode** — not re-themed) | `#080808` | ❌ **Conflict.** |

### Accent opt-out mechanism (already implemented)

```css
[data-accent="silver"]{--accent:var(--got-silver);--accent-ink:var(--got-silver);--color-focus:var(--got-silver)}
[data-accent="silver"][data-theme="light"]{--accent-ink:var(--got-gunmetal);--color-focus:var(--got-gunmetal)}
```

The design system **already ships a documented revert path** (`html[data-accent="silver"]`) that restores the DESIGN.md-documented silver accent/CTA/focus treatment. This is good engineering — the conflict is real but trivially reversible by a single HTML attribute, not a deep rewrite.

## 2. Typography (per DESIGN.md §4, not independently re-verified against `tokens/typography.css` in this pass — flagged PROPOSED for the exact clamp() values)

| Style | Desktop | Weight/leading |
|---|---|---|
| Display hero | `clamp(3.5rem, 8vw, 8rem)` | 600–700 / 0.92–1.02 |
| H1 | `clamp(2.75rem, 5vw, 5.5rem)` | 600 / 1.05 |
| H2 | `clamp(2rem, 3.5vw, 4rem)` | 600 / 1.1 |
| H3/card | 1.25–1.75rem | 500–600 / 1.2 |
| Body | 1–1.125rem | 400 / 1.5–1.65 |
| Eyebrow | 0.75–0.875rem | 500 / 1.3, mono, uppercase |

Font families: Inter Tight (display), Inter (body/UI), IBM Plex Mono (eyebrows/prices/drop IDs) — VERIFIED consistent across `readme.md`, `DESIGN.md`, and PRD §9.

## 3. Spacing (DESIGN.md §5, VERIFIED by direct quote)

4px base unit: `4, 8, 12, 16, 24, 32, 48, 64, 96, 128`. Max content width `1440px`; gutters `20px` mobile / `32px` tablet / `48–72px` desktop. Grid: 4 cols mobile / 8 tablet / 12 desktop; catalog 2/3/4-up. Radius: mostly 0–4px; pill only for small tags. Border: 1px.

## 4. Motion (DESIGN.md §8, VERIFIED)

`cubic-bezier(.2,.7,.2,1)`; 120–180ms controls, 200–320ms panels, 400–600ms one-time editorial reveals. `prefers-reduced-motion: reduce` disables nonessential motion/parallax — this is independently confirmed as implemented behavior in `Product.jsx` (`const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;` gates all `scrollTo`/`scrollIntoView` smooth-behavior calls).

## 5. Breakpoints / viewports (DESIGN.md §10, VERIFIED)

Required test widths: **360, 390, 768, 1024, 1440, 1920px**, in both themes, across Coming Soon/Home/Shop/PDP/Cart/Checkout/Account/Search/Policies/404 plus modal/empty/error/loading/success states.

## 6. Headline conclusion

The implemented token set is **90% faithful** to the documented DESIGN.md baseline, with one high-impact, systemic divergence (the lime accent/CTA/focus system replacing the documented silver/off-white system) and a small number of low-impact value drifts (`--got-surface` dark `#141414` vs documented `#111111`; light-mode background/surface-2 off-by-a-shade). None of these are catastrophic, but **the lime-vs-silver divergence affects the single most visible interactive element on the site (primary CTA buttons) and the focus ring used for all keyboard navigation** — it must be a REQUIRES APPROVAL decision before implementation, not something quietly carried forward. See `source-conflicts.md` for the full conflict writeup and `docs/design/dark-light-tokens.md` for the implementation-ready token table.
