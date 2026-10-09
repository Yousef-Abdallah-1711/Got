# Implementation Plan: Design Tokens and Global UI

**Branch**: `003-design-tokens-global-ui` | **Date**: 2026-10-09 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/003-design-tokens-global-ui/spec.md`

## Summary

Port the dark/light CSS token system (with Acid Lime now the approved, resolved accent) into Tailwind-consumable custom properties, build the no-flash theme-bootstrap script, and implement the three global template parts (Header in 3 modes, Footer, AnnouncementBar, ThemeToggle) plus the empty CartDrawer shell, per `docs/design/dark-light-tokens.md` and `docs/design/component-mapping.md`.

## Technical Context

**Language/Version**: PHP 8.2+/Blade (Sage 10); vanilla JS for the pre-paint theme script (must run before Alpine initializes); Alpine.js 3.x for the toggle/menu/drawer interactivity.

**Primary Dependencies**: Tailwind CSS 3.x (theme extended from CSS custom properties), Alpine.js, WordPress nav menus (for Footer/Header links).

**Storage**: N/A (theme preference is `localStorage`, not server-persisted) — WordPress menus for navigation content.

**Testing**: Visual parity per `docs/design/IMPLEMENTATION-VISUAL-CONTRACT.md` (procedure, viewport matrix, tolerances — not restated here), tooling details in `docs/testing/visual-regression-plan.md`; axe-core automated contrast/accessibility scan; manual keyboard walkthrough.

**Target Platform**: Browser-rendered, server-templated (no change from Feature 002's platform).

**Performance Goals**: No layout shift from theme application; no render-blocking delay from the no-flash script beyond what's strictly necessary to read `localStorage` and set `data-theme`.

**Constraints**: The no-flash script must execute before Alpine.js loads (constitution-adjacent UX requirement, not a formal principle, but a hard PRD AC) — implemented as an inline, non-deferred `<script>` in `<head>`, not an Alpine directive.

**Scale/Scope**: Every page on the site inherits this feature's output — highest blast radius of any single feature in the project.

## Constitution Check

| Principle | Check | Status |
|---|---|---|
| 1 — Existing design is visual source of truth | Tokens ported from `GØT Design System (2)/tokens/colors.css`, reconciled with the approved accent decision | PASS |
| 2 — No unapproved visual redesign | Accent change is now an *approved* decision (not unapproved) — proceeding is explicitly authorized | PASS |
| 13 — Responsive/theme validation per page | Visual regression plan covers both themes at 6 breakpoints | PASS |
| 14 — Accessibility is a release requirement | axe-core + manual keyboard/screen-reader pass included in this feature's testing | PASS |

No violations.

## Project Structure

### Documentation (this feature)

```text
specs/003-design-tokens-global-ui/
├── plan.md
├── research.md
├── quickstart.md
└── tasks.md
# No data-model.md (no new domain entities) or contracts/ (no new APIs) for this feature.
```

### Source Code (repository root)

```text
wp-content/themes/got-sage/
  resources/
    css/tokens.css              # dark/light custom properties, Acid Lime accent resolved
    css/app.css                  # Tailwind entry importing tokens.css
    js/app.js                    # Alpine bootstrap (toggle, menu, announcement pause, drawer shell)
    views/
      layouts/app.blade.php      # includes the inline no-flash <script> in <head>
      partials/
        header.blade.php         # mode: store | minimal | checkout
        footer.blade.php
        announcement-bar.blade.php
        theme-toggle.blade.php
        cart-drawer.blade.php    # empty-state shell only; wired to real data in Feature 010
  tailwind.config.js             # theme.extend reading the CSS custom properties
```

**Structure Decision**: Global template parts live in `resources/views/partials/`, not inside any page-level ACF block, per the constitution's global-template-parts rule — they are included by `layouts/app.blade.php` on every page by default.

## Complexity Tracking

*No violations.*
