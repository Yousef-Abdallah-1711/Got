---
name: html-to-wordpress-acf-block-mapper
description: Map static HTML sections to ACF Block contracts with code-owned ACF fields, frontend templates, SCSS files, optional JS modules, editor preview behavior, and mandatory visual parity checklists.
---

# ACF Block Mapper

Read `../../references/enterprise-html-to-acf-rules.md`, `../../references/full-acf-editability-rules.md`, `../../references/media-library-seeding-rules.md`, and `../../references/global-template-parts-rules.md` before mapping blocks.

Classify each HTML section. Prefer ACF blocks for editable page sections. Use global template parts for header/footer/navigation. Use reusable components for small repeated UI primitives.

Every ACF block must define:

- registration in `framework/builder/blocks.php`
- fields in `framework/builder/acf-blocks/<block>.php`
- frontend template in `framework/builder/front-end/block-content-<block>.php`
- SCSS in `resources/css/blocks/_<block>.scss`
- optional JS in `resources/js/<block>.js`
- editor preview behavior
- visual parity checklist

Do not create one giant block, bloated unrelated fields, dashboard-only ACF field groups, or templates with hardcoded editable content.

All meaningful content from the original HTML must be editable through ACF fields or justified CPT fields. Templates may contain structure, layout, and behavior hooks, but must not hardcode client-editable content.

Image, file, gallery, icon, logo, video, and background-image fields that represent client-editable original media must reference WordPress Media Library attachments. Do not show one hardcoded asset on the frontend while leaving the ACF media field empty in the editor preview.

Do not map wrappers, CSS classes, layout containers, animation hooks, or JS hooks into fields just because they exist in the HTML. Keep those in the template unless the editor genuinely needs to control them.

Do not map header, footer, navigation, mobile menu, or site-wide repeated UI as normal ACF blocks unless page-level editor control is explicitly approved. Map them to global template parts/layout partials and document them in `.html-to-sage/GLOBAL-TEMPLATE-PARTS.md`.

Keep those global elements out of page ACF block order. Their editable values should be sourced from WordPress menus, ACF options pages, theme options, Customizer, or approved plugins, not page-local block fields.

Use `../../templates/acf-block-contract.md` per block and write `.html-to-sage/ACF-BLOCKS.md`.
