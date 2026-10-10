# GØT Coming Soon Implementation and Visual Audit

**Date:** 2026-10-10
**Scope:** Diagnose the local homepage render, implement the local Coming Soon and early-access work, compare anonymous Edge captures with the approved design, and record acceptance gaps. All existing uncommitted work was preserved.

## Executive summary

The stale skeleton was an old in-memory Edge document. The LocalWP theme junction points to this repository’s Sage theme. A normal reload and fresh anonymous requests served the current Blade layout and compiled Vite assets with HTTP 200; no duplicate checkout or server-side stale template source was found. The smallest correction was reloading the existing page.

The Coming Soon page and a safe, local Feature 005 integration boundary are implemented. The story uses an optimized generated WebP visual concept, and the supplied transparent sword/wordmark PNG has been optimized to a 193 KB WebP used across the hero, header, and footer. All 126 supplied design-token names are defined and exposed to Tailwind utilities. Screenshots cover eight viewport widths in both themes and pass the horizontal-overflow check. The 1280 by 800 hero and full-page composition were compared directly with the approved prototype. Remaining inputs include the editable logo vector master, real product photography, licensed display fonts, the optional contact-field disclosure, and complete WordPress footer menus. This is local implementation evidence, not final brand-owner or production sign-off.

## Root cause

- The active LocalWP theme path is a directory junction to this workspace’s wp-content/themes/got-sage folder.
- The initial Edge tab briefly showed an older Feature 002 skeleton document. Reloading that same tab replaced it with the current layout, and a fresh anonymous HTTP request returned the new Coming Soon page and current Vite assets.
- The theme source, Acorn view cache, and fresh server response agreed after reload. No second/stale theme checkout or server-side stale template was identified.
- No WordPress mode/settings change was needed. The existing administrator tab was retained.

## Approved reference and visual evidence

- Approved source: GØT Design System (2)/ui_kits/storefront/coming-soon.html and ComingSoon.jsx.
- The prototype was served read-only over local HTTP at 127.0.0.1:8765 during screenshot capture. Its source files were not changed.
- Evidence directory: docs/reviews/coming-soon-evidence/
- The Playwright/Edge run produced 40 PNGs: reference/current screenshots at 360, 375, 390, 768, 1024, 1280, 1440, and 1920px in dark and light themes, plus full-page reference/current captures at 390px and 1280px in both themes. Current-page captures were regenerated after adding the generated concept image and optimized supplied logo asset.
- The six widths in the Feature 003 visual contract are included. The added 375px and 1280px widths cover the requested mobile and 1280×800 reference checks. Every current-page capture passed the horizontal-overflow check.
- The automated screenshot run hid only the prototype’s fixed kit navigation. No page content was removed from the reference.
- The 1280px comparison confirms the supplied sword logo, social/theme controls, location eyebrow, two-line headline, Drop 01 message, email/CTA proportions, consent row, and story/footer order. The hero layout remains close to the approved capture after the visual adjustment pass.

### Confirmed remaining visual differences

| Area | Current local render | Approved reference | Status |
|---|---|---|---|
| Sword mark | Optimized transparent 193 KB WebP based on supplied 1254px square logo PNG, used in hero/header/footer | The provided prototype still shows a sword placeholder | Current raster is in use; editable SVG/AI master remains open |
| Packaging story image | Generated, optimized 140.6 KB WebP; visibly captioned “Drop 01 / Visual concept” | The rendered prototype's image slot | Concept art only; replace with approved product photography when it exists |
| Display font | Existing token stack with local fallbacks | Prototype’s display font rendering | Licensed Inter Tight/Inter/IBM Plex Mono files are not supplied; font metrics still differ slightly |
| Optional name/WhatsApp | Collapsed “Add details (optional)” disclosure after consent | No optional-fields disclosure | Required by Feature 005; retained as a documented interaction addition |
| Footer menus | WordPress-menu-sourced columns; current Shop has Shop/Cart, Help is empty, Follow has current social links | Populated Shop, Help, Follow, and legal links | Content gap; menus/pages were not edited or fabricated |

The design source has no countdown. None was added. The announcement bar is intentionally omitted from the Coming Soon root because it is absent from the approved composition.

## Implemented local work

- Root route: dedicated Coming Soon Blade composition, minimal header, story section, and route-specific omission of the announcement bar.
- Brand tokens: all 126 unique supplied custom-property names are present in `resources/css/tokens.css`; Tailwind v4 utility aliases in `resources/css/app.css` cover colors, type, spacing, layout, radii, focus, motion, elevation, and stacking.
- Homepage visual: generated Drop 01 garment-box concept is emitted as a 140.6 KB WebP through Vite's hashed manifest. The supplied 1254px transparent logo PNG is optimized to a 193 KB WebP and also emitted through Vite, used by the reusable `x-wordmark` component with a light-theme contrast adjustment and descriptive hero alt text.
- Form: required email and consent, optional first-name/WhatsApp disclosure, honeypot, keyboard-visible focus, inline validation and live status/error messages.
- Feature 005 boundary: local persistence/schema migration code, hashed confirmation/unsubscribe tokens, 48-hour confirmation flow, consent timestamp/text, hashed-IP limit of five attempts per hour, same-origin and REST nonce checks, confirmed-only provider payload, unsubscribe handling, 15-minute retry hook, 24-hour manual-attention state, and 30-day pending-record cleanup hook.
- Provider: ADR 0011 still has no vendor or credentials. The implementation exposes a provider callback/filter and tests it with a fake provider. It does not call an external marketing API.
- No live signup was submitted, no subscriber/customer record was created, and no live wp_mail message was sent. Email/provider stubs are used only in the PHP test harness.

## Verification

- Vite production build: passed.
- Stylelint and ESLint: passed.
- PHP 8.3 syntax checks: passed for all new EarlyAccess PHP files and plugin bootstrap.
- PHPStan level 6 and the full configured PHPCS/WPCS scan across plugin and theme PHP: passed.
- Existing GOT Commerce PHP harness: 76 passed, 0 failed.
- Early-access fake-WordPress harness: 31 passed, 0 failed.
- Full Edge/Playwright run after the image update: 11 passed, 2 skipped. The run refreshed 40 reference/current screenshots and asserted the generated image loads at its intrinsic 1024×1536 dimensions. The skips are the existing WooCommerce store-route tests gated by Coming Soon visibility.
- Axe accessibility scan: zero violations on the Coming Soon page; both theme scans passed.
- A read-only WordPress database probe could not run because the bundled PHP CLI lacks the mysqli extension. The migration and activation/plugins_loaded hooks are implemented, but live table/version presence was not directly verified. No database reset or reinstall was attempted.

## Acceptance and preserved state

- Feature 003 T023 is complete as a local visual-regression run; see specs/003-design-tokens-global-ui/tasks.md. Its recorded differences are not treated as exact parity.
- Feature 005 implementation tasks are checked only where source and test evidence exists. Inbox-based signup/expiry E2E, provider outage/retry integration, live schema verification, DNS authentication, and quickstart delivery acceptance remain open; see specs/005-coming-soon-early-access/tasks.md.
- Feature 004 ACF content architecture remains incomplete, so the new Coming Soon page is a code-owned Blade page and is not yet editor-composable through ACF.
- Coming Soon mode and existing WordPress settings, user accounts, and products were preserved. Product 12 remains in Trash.
- No WordPress setting, user, or product data was changed; Product 12 remains in Trash.
