# Source Inventory

Status tags: **VERIFIED** (I opened and read the file) / **PROPOSED** / **BLOCKED** / **REQUIRES APPROVAL**.

## Source priority order (per project instructions)

1. Explicit approved owner decisions — **none recorded yet**; all `[TBD]` fields in the PRD are open.
2. `GOT-Store-PRD.md` (approved PRD) and `PRODUCT.md` (product blueprint).
3. `DESIGN.md` (UI/UX spec) and `GOT_Complete_Brand_Identity.md` (brand guidelines).
4. Actual working UI source: `GØT Design System (2)/` (components, tokens, `ui_kits/storefront/`) and its own screenshots/specimens (`guidelines/*.html`, `thumbnail.html`).
5. `GØT Design System (2)/IMPLEMENTATION-REPORT.md` and `ui_kits/storefront/HOMEPAGE-AUDIT.md` (implementation reports).
6. Proposed improvements requiring approval (e.g. Acid Lime accent, BOGO/promotion UI, inline PDP checkout) — present in the design system but not confirmed owner decisions.

## Root-level documents (project root)

| File | Role | Status |
|---|---|---|
| `GOT-Store-PRD.md` (1233 lines) | **Primary source of truth.** Full PRD: identity, goals, MoSCoW scope (P0–P3), 7 functional-requirement specs with user stories/flows/AC, NFRs, technical architecture, phased plan (8 weeks), risk register, approvals. | VERIFIED |
| `PRODUCT.md` (151 lines) | Product blueprint restating PRD scope as fixed implementation decisions, IA/routes, end-to-end flow contracts (F01–F07), component behavior matrix, open decisions. States it defers to PRD on conflict. | VERIFIED |
| `DESIGN.md` (237 lines) | UI/UX and visual-system spec: color system (dual theme tokens), typography, grid/spacing, component design contracts, page-by-page blueprints (§7.1–7.10), motion, accessibility, Sage/Blade implementation map, copywriting rules, acceptance gates, approval-needed items. Explicitly: "proposed tokens are not officially approved brand standards." | VERIFIED |
| `GOT_Complete_Brand_Identity.md` (428 lines) | Brand strategy/voice/palette/logo/packaging/socials, with explicit **Observed / Recommended / Unverified** source classification on every claim. States the `®` is unverified, the logo is "raster mockups," hex values are "recommended approximations." | VERIFIED |

## `GØT Design System (2)/` (the design archive — a folder, already extracted, not a `.rar`)

| Path | Role | Status |
|---|---|---|
| `readme.md` | Design system index and content/visual-foundation summary; documents the "v1.1 update" (Acid Lime accent, announcement bar, compact header) as **not brand-approved**. | VERIFIED |
| `SKILL.md` | Short skill description for AI agents working with this design system (9 lines). | VERIFIED |
| `IMPLEMENTATION-REPORT.md` (52 lines) | Implementation notes for the design-system build itself (component coverage), not a WordPress implementation report. | VERIFIED (exists; see `production-gaps.md` for what it does/doesn't cover) |
| `styles.css` | Entry point importing `tokens/*.css` and `components/components.css`. | VERIFIED (referenced; not itself a content source) |
| `tokens/{base,colors,effects,fonts,spacing,typography}.css` | Dual-theme design tokens (dark default, `[data-theme="light"]` override). | VERIFIED (colors.css content reflected in `docs/design/dark-light-tokens.md`) |
| `components/{core,forms,feedback,navigation,commerce}/*.jsx` + matching `*.d.ts` + `*.prompt.md` | 25 React reference components, each with a TypeScript prop contract and a generation prompt. **Reference/behavior spec only — not production WordPress code.** | VERIFIED — all 25 `.d.ts` files read in full |
| `guidelines/*.html` (18 files) | Foundation specimen cards: colors (brand/accent/cta/semantic-dark/semantic-light/status), type (display/headings/body/mono), spacing (layout/radii/scale), effects (elevation/motion), brand (iconography/imagery/lines/wordmark). | VERIFIED (existence, filenames); not deep-read line-by-line |
| `ui_kits/storefront/*.jsx`, `*.html`, `*.css`, `data.js`, `home-content.js`, `wishlist-store.js` | The click-through storefront prototype: `ComingSoon`, `Home`/`HomeSections`, `Shop`, `Product`/`DirectCheckout`, `Checkout`, `ThankYou`, `Confirmation`, `Account`, `Wishlist`, `Promo` (BOGO/free-shipping UI). | VERIFIED — all screen files read in full except `Home.jsx`/`HomeSections.jsx` (covered via `HOMEPAGE-AUDIT.md`, itself read in full) and `image-slot.js` (1225-line image-placeholder utility, not content-bearing) |
| `ui_kits/storefront/README.md` | States explicitly: "no production UI existed"; this is sample/placeholder data (Unsplash photos, sample prices); checkout/account/wishlist are non-functional previews. | VERIFIED |
| `ui_kits/storefront/HOMEPAGE-AUDIT.md` | A **prior gap analysis already done by a previous design-system iteration**, for the homepage only. Explicitly states: "There is no WordPress / Sage 10 / Blade / Tailwind / WooCommerce code to audit or modify." | VERIFIED |
| `assets/icons/*.svg` (32 files) | Lucide SVGs (ISC license) used as an explicit **substitute** for the brand's own icon sprite, which was never supplied. | VERIFIED (per readme.md; not opened file-by-file — SVGs are binary/markup, not prose) |
| `uploads/{DESIGN.md,GOT-Store-PRD.md,GOT_Complete_Brand_Identity.md,PRODUCT.md}` | Duplicate copies of the four root documents, mounted inside the design-system folder. Confirmed identical in purpose to the root copies (not diffed byte-for-byte). | PROPOSED (assumed identical; not byte-diffed) |
| `_ds_manifest.json`, `_ds_bundle.js` | Build/bundle artifacts for the design-system viewer app itself. Treated as supporting evidence only, per project instructions — not a substitute for the source files above. | VERIFIED (existence); not parsed as content |
| `thumbnail.html`, `_adherence.oxlintrc.json` | Design-system viewer thumbnail and a lint config for the design-system repo itself; not project content. | VERIFIED (existence only) |

## What is explicitly absent (see `missing-assets.md` for full detail)

- No WordPress, Sage, Acorn, Blade, WooCommerce, or any PHP code anywhere in the project directory.
- No approved logo vector (SVG/AI) — only raster mockups referenced in the brand identity doc, and a typeset `Wordmark` placeholder in the design system.
- No licensed font binaries — fonts are loaded from Google Fonts as a stand-in.
- No real product photography — all images are desaturated Unsplash stock placeholders with photographer credit overlays.
- No `.rar` archive was found or needed extraction; "GØT Design System (2)" is already a plain folder.

## Source conflicts

Logged separately in `source-conflicts.md` — do not treat this inventory as a resolution of those conflicts.
