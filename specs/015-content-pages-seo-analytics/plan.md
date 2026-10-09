# Implementation Plan: Content Pages, SEO, and Consent-Gated Analytics

**Branch**: `015-content-pages-seo-analytics` | **Date**: 2026-10-09 | **Spec**: [spec.md](./spec.md)

## Summary

Build the 8 remaining content pages as ordinary WordPress Pages (reusing Feature 004's ACF blocks where applicable), a small custom consent banner writing a first-party cookie that gates a Google Tag Manager container, and baseline technical SEO (canonical URLs, JSON-LD, Open Graph, sitemap, robots).

## Technical Context

**Language/Version**: PHP 8.3+ (raised 2026-10-09 for Sage 11/Acorn v6, see docs/adr/0001-sage-version.md)/Blade for pages; vanilla JS for the consent banner (must run before GTM loads).
**Primary Dependencies**: Google Tag Manager, an SEO plugin or minimal custom meta output (choice deferred to task level — not an architectural decision).
**Storage**: Consent choice stored as a first-party cookie (`got_consent`), not server-side.
**Testing**: Playwright E2E (consent gating verified at network level, event-fires-once-per-order), SEO schema/sitemap validation, broken-link check.
**Target Platform**: Same as prior.
**Constraints**: Zero non-essential network requests before consent (constitution + PRD, verified at the network level, not just a policy statement).
**Scale/Scope**: 8 pages + a site-wide consent/analytics layer.

## Constitution Check

| Principle | Check | Status |
|---|---|---|
| 15 — Security/privacy architectural | Consent gating enforced at the network-request level | PASS |
| 16 — No fabricated claims | About-page content review step included | PASS |

No violations.

## Project Structure

### Documentation (this feature)
```text
specs/015-content-pages-seo-analytics/
├── plan.md
├── research.md
├── quickstart.md
└── tasks.md
# No data-model.md (ordinary WordPress Pages) or contracts/ (GTM/consent are client-side, no new server API).
```

### Source Code
```text
wp-content/themes/got-sage/resources/views/
  pages/{about,contact,faq,shipping-policy,returns-exchanges,privacy-policy,terms-conditions,cookie-policy}.blade.php
  components/consent-banner.blade.php
wp-content/themes/got-sage/resources/js/consent.js    # writes got_consent cookie, gates GTM container load
app/Support/Seo.php                                      # canonical URL, JSON-LD, Open Graph output helpers
```

**Structure Decision**: Consent/analytics gating is a small enough client-side concern to keep in the theme (no server-side business logic); SEO metadata output is a thin theme-level helper, not a plugin concern, since it has no persisted state of its own beyond what WordPress/WooCommerce already store.

## Complexity Tracking
*No violations.*
