# Implementation Visual Contract

The single, shared procedure every feature's `plan.md`/`tasks.md` refers to when it says "visual parity" — owned by Feature 001 (`docs/planning/FEATURE-001-TASK-MIGRATION.md` migrated `stock/`-comparison tasks T020–T022 into this document, correcting the comparison target in the process). No feature should restate this procedure; they reference it and add only their own page-specific reference-route row.

## What "faithful to the prototype" means here

The React prototype (`GØT Design System (2)/`) is the **approved visual reference** — never the production runtime (ADR 0002). "Visual parity" means the **rendered output** of the prototype's HTML shells, not its source code, is what gets compared against. This corrects a real error in the original converter scaffold, which told reviewers to compare against `stock/` — a backup copy of source *files*, not a renderable target.

## Reference routes (source of truth for each page)

| Page | Reference artifact | Implementation owner |
|---|---|---|
| Coming Soon | `GØT Design System (2)/ui_kits/storefront/coming-soon.html` rendered in a browser | 005 |
| Homepage (Store mode) | `.../index.html` (Home screen) | 004, 006 |
| Shop / category | `.../index.html` (Shop screen) | 007 |
| Product detail | `.../product.html` | 008 |
| Inline checkout | `DirectCheckout.jsx` section within `product.html` | 009 |
| Cart drawer / page | `CartDrawer` component + `Checkout.jsx`'s summary column | 010 |
| Checkout | `.../index.html` (Checkout screen) | 010 |
| Account | `.../index.html` (Account screen) | 011 |
| Wishlist | `.../index.html?screen=wishlist` | 012 |
| Confirmation / tracking | `ThankYou.jsx` / `Confirmation.jsx` screens | 013, 009 |
| PDP rating display | N/A — no prototype reference; new per `specs/018` | 018 |
| About/Contact/FAQ/Policies/404/Search/Cart page | **No 1:1 prototype reference** — per `docs/design/page-mapping.md`'s "extension requiring review" rows | 007 (search, cart), 015 (content pages) |

For every route with no prototype reference, "visual parity" does not apply in the comparison sense — instead, the build is reviewed against DESIGN.md §7.10's described tone/structure and the brand owner signs off on it as a design extension, logged below, not silently invented.

## Viewport test matrix (DESIGN.md §10, unchanged from prior planning)

**360, 390, 768, 1024, 1440, 1920px**, in both dark and light themes. Every reference route above is captured and compared at all 12 combinations (6 widths × 2 themes), plus a representative subset for modal/drawer-open, empty, error, loading, and success states.

## Comparison procedure

1. Capture the reference: open the prototype HTML shell in a real browser at each width/theme combination; screenshot.
2. Build the Blade/Alpine implementation per the owning feature's tasks.
3. Capture the rendered result at the identical width/theme combinations.
4. Run an automated pixel diff (per `docs/testing/visual-regression-plan.md`'s tooling) with reduced-motion forced on and fonts awaited before capture (to avoid flaky false positives).
5. Any diff above the page's tolerance (see below) is a **failed task**, not a style note — fix and recapture.
6. Any deliberate, brand-owner-approved deviation is logged in the Approved Differences table below, together with the new rendered state becoming the new baseline.

## Tolerance

- Solid-color/flat sections: near-zero pixel tolerance (anti-aliasing only).
- Text-heavy sections: a looser tolerance to absorb sub-pixel font-rendering differences across browsers, calibrated per page during that page's first comparison pass, not globally pre-set.
- Cross-browser testing (Chrome 110+, Safari 16+, Firefox 110+, Samsung Internet 21+, Edge 110+, per PRD §8 Compatibility) is **not** held to pixel-identical standards across browsers — it is held to "no layout break, no clipped content, no contrast failure," which is a functional check, not a pixel-diff check. This document does not promise literal 100% pixel equality across every browser; it promises measurable fidelity at the reference viewports against the primary rendering target (Chrome, the browser the reference was authored and captured in) and functional correctness everywhere else.

## Accessibility requirements folded into this contract

Every capture in the matrix above is also checked for: visible 2px+ focus ring in both themes, 4.5:1 text contrast / 3:1 large-text and UI-component contrast, and correct behavior under `prefers-reduced-motion`. A page that is pixel-perfect but fails these is still a **failed** visual-contract check, per constitution Principle 14 (accessibility is a release requirement, not separable from "looks right").

## Known differences requiring approval (carried from `docs/audit/source-conflicts.md`, not duplicated — referenced)

- Acid Lime accent: **RESOLVED** — owner-approved, no longer a pending deviation.
- `--got-surface`/light-mode background minor value drift (implemented design-system values vs. DESIGN.md's documented values): **carried as an accepted baseline**, per `docs/design/dark-light-tokens.md` — the implemented values are the production baseline, not a deviation needing fresh approval each time.
- Remaining brand assets (editable logo vector, icon sprite, licensed fonts, and photography): the supplied raster logo is now in use, while other missing assets still limit exact parity with final brand intent. This is a content gap, not a visual-contract failure.

## Approved Differences Log (empty — none logged yet; filled in during actual implementation, not during planning)

| Page/component | Deviation | Reason | Approved by | Date |
|---|---|---|---|---|
| *(none yet — this planning session built no code to compare)* | | | | |
