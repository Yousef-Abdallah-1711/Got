# FINAL REPORT

Every converted WordPress/Sage/ACF section must match the original HTML section 100% in layout, spacing, typography, colors, responsive behavior, animations, image ratios, hover states, and visual hierarchy unless the user explicitly approves a change.

All meaningful content from the original HTML must be editable through ACF fields or justified CPT fields. Templates may contain structure, layout, and behavior hooks, but must not hardcode client-editable content.

For multi-page HTML websites, generate .html-to-sage/PAGES.md showing every WordPress page, the exact ACF block order, the field groups used, and the original HTML source section for each block.

Header, footer, navigation, and other site-wide repeated elements should become Sage template parts or layout partials by default, not normal ACF blocks. Keep editable global data in menus, options, Customizer, theme options, or approved plugins, not page-local ACF fields.

Global ACF option fields should be optional when frontend defaults/fallbacks exist. Do not block saving header/footer/logo/contact/schema settings because one logo, link, footer item, or schema value is empty.

Global option pages must be lean: use WordPress menus for header/footer link columns, seed default menus idempotently when original menus exist, avoid ACF repeaters for normal label/URL menus, and remove unused, duplicate, speculative, or non-rendered global fields. Every global option field must have a render location or approved integration and must be verified by changing it in the admin.

When a global settings/options page exists, add optional menu selector fields for each global menu area. Selectors must choose existing WordPress menus by menu ID, seed once from assigned default menus when empty, fall back to Appearance > Menus location assignments when blank, and never hardcode menu IDs.

The delivered theme must work when cloned into wp-content/themes/<theme-slug> and activated: valid style.css theme header, functions.php bootstrap, render templates or verified Sage/Acorn routing, documented required plugins and install/build commands, ignored local agent/skill/cache/dependency folders, no html-to-wordpress-converter skill repo inside wp-content/themes, and final report notes for checks that could not run.

Generate ready-pages/ with one paste-ready .md file per WordPress page. Each file must contain the exact Gutenberg ACF block comments in the correct page order.

Client-editable media from the original HTML must be imported or seedable into the WordPress Media Library and referenced through ACF attachment/file/gallery fields, options, menus, CPT fields, or other documented WordPress data. Do not rely on permanent hardcoded stock/ or theme asset URLs for editable images, icons, logos, background images, videos, documents, or galleries.

Page templates must render WordPress editor/block content as the single source of truth. Do not hardcode converted homepage/page sections in front-page.php, page.php, index.php, Blade page templates, CPT templates, or fallback templates. A neutral index.php empty-state or maker-credit fallback is allowed only when no content exists and it must not contain converted client website sections.

When posts, blog, news, articles, or press content are in scope, include branded WordPress post templates: home.php for the Posts page, archive.php for post archives, single.php for individual posts, shared post card/pagination partials, and matching Sage Blade views when resources/views exists. Templates must render real WordPress post data/editor content and reuse the converted site's colors, fonts, cards, buttons, spacing, responsive behavior, and global header/footer.

Record completed implementation, WordPress clone-readiness, required plugins, install/build commands, activation checks, visual checks, and any skipped checks with reasons.
