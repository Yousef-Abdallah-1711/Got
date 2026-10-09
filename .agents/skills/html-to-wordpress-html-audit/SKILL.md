---
name: html-to-wordpress-html-audit
description: Audit static HTML/CSS/JS/assets before converting to Sage WordPress, preserving originals in stock, identifying sections, dependencies, forms, animations, responsive behavior, and visual parity risks.
---

# HTML Audit

Read `../../references/enterprise-html-to-acf-rules.md`, `../../references/full-acf-editability-rules.md`, `../../references/media-library-seeding-rules.md`, and `../../references/global-template-parts-rules.md` before auditing.

Inspect source files without changing them. Copy all original HTML/CSS/JS/assets into `stock/` before migration. Treat `stock/` as read-only.

Create `.html-to-sage/HTML-AUDIT.md` with:

- HTML files and page roles
- section inventory
- CSS files and likely scope
- JS files and dependencies
- images, fonts, videos, SVGs, icons
- forms and validation behavior
- animations and interactive widgets
- responsive breakpoints
- visual parity risk notes
- asset ownership and image ratio risks
- Media Library seed candidates for client-editable images, icons, logos, background images, videos, documents, and galleries
- JS behavior ownership and hover/animation risks
- multi-page page inventory for `.html-to-sage/PAGES.md`
- meaningful content inventory that must become ACF or justified CPT fields
- global template part inventory for header, footer, navigation, global CTA, and site-wide repeated UI

Use `scripts/workflow.py audit --source <source> --project <target>` for a safe first pass.
