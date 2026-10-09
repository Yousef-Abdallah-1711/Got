---
name: html-to-wordpress-sage-setup
description: Sage setup instructions for installing Roots Sage, configuring Acorn/Blade/Vite/SCSS, creating the custom framework layer, verifying build assets, and preparing WordPress theme structure for ACF blocks.
---

# Sage Setup

Read `../../references/enterprise-html-to-acf-rules.md` before setup decisions.

Use after planning approval, not during planning-only mode unless verification requires it.

Required setup:

```bash
composer create-project roots/sage <theme-name>
npm install
npm run build
```

Verify `public/build/manifest.json` exists. Then create:

```text
framework/
  builder/
    acf-blocks/
    front-end/
    blocks.php
    index.php
  post-type/
  taxonomies/
  custom-fields/
  actions/
  hooks/
  utilities/
resources/css/blocks/
resources/css/layout/
resources/css/components/
resources/css/common/
resources/js/
```

Write `.html-to-sage/SAGE-SETUP.md` with commands, results, failures, and manual WordPress requirements.

When adding WordPress fallback templates for activation readiness, keep page content editor-owned. `index.php`, `page.php`, and any optional `front-page.php` must render `the_content()` or the Sage equivalent and shared global layout. Do not hardcode converted homepage/page sections in fallback templates. A neutral `index.php` empty state is allowed only when no content exists.
