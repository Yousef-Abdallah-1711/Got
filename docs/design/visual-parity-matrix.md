# Visual Parity Matrix

This is a **planning checklist** defining what "100% visual parity" means concretely and how it will be verified once implementation begins — it is not an executed QA report, and no claim here should be read as "already passed." Methodology per DESIGN.md §10 and the constitution's visual-parity-first principle.

## What "parity" means, per dimension

| Dimension | Verification method |
|---|---|
| Layout/grid | Side-by-side screenshot diff at each of the 6 required widths, both themes, against the rendered prototype screen (not the JSX source). |
| Spacing | Same screenshot diff; spot-check computed spacing values against the 4px token scale (`docs/audit/visual-baseline.md` §3). |
| Typography | Font family/weight/size/leading match at each breakpoint's clamp() value; verify no FOUT/FOIT regression once fonts are self-hosted (pending `docs/audit/missing-assets.md`). |
| Colors | Computed `background-color`/`color`/`border-color` match the token table in `dark-light-tokens.md`; use the owner-approved Acid Lime treatment recorded in resolved C-01. |
| Responsive behavior | Explicit test at 360, 390, 768, 1024, 1440, 1920px per DESIGN.md §10, both themes. |
| Animation/motion | Duration/easing match (`cubic-bezier(.2,.7,.2,1)`, documented ms ranges); `prefers-reduced-motion` zeroes non-essential motion — spot-checked against `Product.jsx`'s `matchMedia` pattern as the reference implementation. |
| Image aspect ratios | 4:5 product listing/gallery; 16:9 desktop / 4:5 mobile full-bleed editorial bands — verified via `aspect-ratio`/explicit width+height to prevent CLS. |
| Hover/focus states | Keyboard-only pass (Tab through every interactive element) at each breakpoint; visible 2px+ focus ring in both themes. |

## Per-page checklist template (apply once per page in `docs/design/page-mapping.md`)

- [ ] Reference captured from the rendered prototype (`ui_kits/storefront/*.html` opened in a real browser) at all 6 widths, both themes — screenshots stored alongside this doc once captured (not yet done — planning only).
- [ ] Layout structure documented (grid columns, gutters, max-width).
- [ ] Components/tokens mapped (cross-reference `component-mapping.md`/`dark-light-tokens.md`).
- [ ] Blade/Alpine implementation built.
- [ ] Rendered result captured at the same 6 widths/both themes.
- [ ] Diff reviewed; discrepancies fixed or explicitly logged as an "approved difference" (with owner sign-off) below.
- [ ] Dark and light themes both re-verified after any fix.
- [ ] Mobile/tablet/desktop keyboard + reduced-motion + 200% zoom pass.

## Approved differences log (empty — none approved yet; this is where owner-approved deviations get recorded once implementation starts)

| Page/component | Deviation from reference | Reason | Approved by | Date |
|---|---|---|---|---|
| *(none yet)* | | | | |

## Known pre-existing risks to the "100%" standard (flagged now, not yet resolved)

1. **`--got-surface`/light-mode background value drift** (`docs/audit/visual-baseline.md` §1) — the implemented token (`#141414` dark surface, `#F4F4F1`/`#E9E9E5` light bg/surface-2) differs slightly from DESIGN.md's documented values (`#111111`, `#F2F2F0`, `#E6E6E4`). Feature 003 research records the implemented values as the approved working baseline; compare against `dark-light-tokens.md` and preserve that decision.
2. **Remaining brand assets** (editable logo vector master, real icon sprite, licensed fonts, and product photography) leave some final-brand parity unresolved. The supplied raster sword logo is used by the current Coming Soon page; see `docs/audit/missing-assets.md`.
3. **Pages with no prototype reference at all** (Cart, Search, About, Contact, FAQ, policy pages, 404 — per `docs/design/page-mapping.md`'s "extension requiring review" rows) have no baseline to diff against; these are reviewed against DESIGN.md's component contracts and overall editorial tone instead, and explicitly flagged to the owner as "design extension, not a verified port" when first built.

## Definition of Done for "visual parity" sign-off (per page)

All checklist items ticked, all known risks above either resolved or explicitly logged as an approved difference, and a brand-owner visual sign-off recorded per the PRD's phase-gate approval table (`docs/architecture/deployment.md`).
