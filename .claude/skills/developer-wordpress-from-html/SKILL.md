---
name: developer-wordpress-from-html
description: Command workflow for planning and optionally implementing static HTML/CSS/JS website conversion into a WordPress Sage theme using real Spec Kit commands, ACF Blocks, Sage/Acorn/Blade/Vite/SCSS, justified CPTs/taxonomies, stock-folder preservation, and mandatory visual parity.
---

# Developer WordPress From HTML

Use this as `/developer-wordpress-from-html`, `/html-to-wordpress`, `/html-to-sage`, `$developer-wordpress-from-html`, `$html-to-wordpress`, or `$html-to-sage`. It coordinates the full workflow but must keep Spec Kit as the source planning engine.

## Start

1. Ask only the mandatory blocking intake questions before prepare:
   - WordPress install path, if implementation may follow.
   - Final Sage theme slug, if the default `mei-sage` is not acceptable.
   - Whether to allow the default `stock/` move-source behavior.
   Use defaults for the rest and record them in `.html-to-sage/INTAKE.md`.
2. Read `../references/enterprise-html-to-acf-rules.md` and enforce it throughout the workflow.
3. Read `../references/full-acf-editability-rules.md` and enforce full ACF editability.
4. Read `../references/media-library-seeding-rules.md` and enforce Media Library seeding for editable source media.
5. Read `../references/global-template-parts-rules.md` and enforce template-part handling for header/footer/navigation.
6. Confirm these defaults unless the user overrides them:
   - pixel-perfect conversion: yes
   - visual improvements allowed: no
   - all editable content in ACF: yes
   - CPTs only when justified: yes
   - preserve originals in `stock/`: yes
6. Run the end-to-end prepare helper from the target project root:

   ```bash
   python <skill>/scripts/workflow.py prepare --source . --project . --theme-name <theme-name> --wp-path <wordpress-path>
   ```

   If `--wp-path` is unknown, omit it. The command must still generate the planning artifacts and write `.html-to-sage/BLOCKERS.md`; stop and ask the user before implementation.

The prepare helper owns:

- source audit
- `stock/` preservation and root source cleanup
- real Spec Kit check/install/init
- `.specify/memory/constitution.md`
- `specs/<feature>/spec.md`
- `specs/<feature>/plan.md`
- `specs/<feature>/research.md`
- `specs/<feature>/data-model.md`
- `specs/<feature>/quickstart.md`
- `specs/<feature>/tasks.md`
- `.html-to-sage/SPECKIT-ANALYZE.md`
- `.html-to-sage/PREPARE-SUMMARY.md`

## Spec Kit Foundation

The prepare helper calls the Spec Kit setup helper. To rerun only Spec Kit setup:

```bash
python <skill>/scripts/workflow.py speckit --project . --integration codex --skills --install --init
```

This must write `.html-to-sage/SPECKIT-RUNS.md` from real command output.

The helper performs:

```bash
specify --version
```

If unavailable and `--install` is set, it attempts:

```bash
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git
```

Initialize with the current agent integration in the current project:

```bash
specify init --here --force --integration codex --integration-options="--skills"
```

Then use real Spec Kit commands with the prompts in `../templates/`:

```text
/speckit.constitution
/speckit.specify
/speckit.clarify
/speckit.plan
/speckit.tasks
/speckit.analyze
```

Only run `/speckit.implement` after explicit user approval.

If the current agent session cannot see newly installed `$speckit-*` skills until restart, continue using the generated Spec Kit artifacts from `prepare`; do not fake or skip them.

## Required Persistent State

Create and maintain:

```text
stock/
.html-to-sage/
  INTAKE.md
  PAGES.md
  HTML-AUDIT.md
  SECTION-MAP.md
  GLOBAL-TEMPLATE-PARTS.md
  CPT-TAXONOMY-MAP.md
  ACF-BLOCKS.md
  ASSET-MAP.md
  MEDIA-LIBRARY-SEED.md
  JS-BEHAVIOR-MAP.md
  PERFORMANCE-RISKS.md
  SECURITY-CHECKLIST.md
  VISUAL-QA.md
  SAGE-SETUP.md
  SPECKIT-RUNS.md
  RISKS.md
  DECISIONS.md
.specify/
specs/
```

## Section Classification

Classify every HTML section as one of:

- ACF Block
- Global template part
- CPT archive/single template
- reusable component

Every ACF block must include registration, code-owned fields, frontend template, SCSS file, optional JS module, editor preview behavior, and a visual parity checklist.

Never flatten the full page into one block, never put all CSS/JS into global files without ownership, never remove behavior hooks/classes randomly, and never hardcode editable content in templates.

All meaningful content from the original HTML must be editable through ACF fields or justified CPT fields. Templates may contain structure, layout, and behavior hooks, but must not hardcode client-editable content.

All original client-editable media must be imported or seedable into the WordPress Media Library. ACF image/file/gallery fields, global options, menus, CPT fields, or documented WordPress data must reference Media Library attachments, not permanent hardcoded paths from `stock/` or theme assets. Purely technical decorative SVG/CSS assets may stay in theme resources only when they are not client-editable content.

Header, footer, navigation, mobile menus, global CTAs, and site-wide repeated UI must be mapped as global template parts/layout partials by default. Use ACF blocks only when the user explicitly wants page-level editor control.

Keep global site chrome out of page ACF block order. Store editable global data in WordPress menus, ACF options pages, theme options, Customizer, or approved plugins, and document those sources in `.html-to-sage/GLOBAL-TEMPLATE-PARTS.md` and `.html-to-sage/DECISIONS.md`.

Use native WordPress menus for header navigation and footer link columns. If the original HTML includes menu links, register menu locations and seed default menus on activation/admin init in an idempotent way. Do not use ACF repeaters for normal menu/link columns unless the section requires non-menu metadata that Appearance > Menus cannot represent.

If the theme has a global settings/options page, add optional menu selector fields for every global menu area. Those selectors must choose existing WordPress menus by menu ID, seed once from assigned default menus when empty, let editors switch header/footer menu sources without code changes, and fall back to Appearance > Menus location assignments when blank. Never hardcode menu IDs.

Header and footer must show by default from the theme layout on every applicable page. Do not require editors to add header/footer blocks manually. Their meaningful content, images, links, schema data, and contact data must be editable through global options, menus, theme settings, Customizer, or approved plugins.

Global option pages must stay lean. Add only fields that are actually rendered or required by an approved integration. Do not add duplicate menu fields, unused schema fields, icon/class fields, or speculative settings. Every global option field must be verified by changing it in the admin and confirming the frontend changes.

When global options have frontend defaults/fallbacks, do not mark those ACF option fields as required. Editors must be able to save partial header/footer/logo/contact/schema settings without filling every field.

Page templates must keep WordPress editor content as the single source of truth. Do not rebuild converted homepage/page sections in `front-page.php`, `page.php`, Blade page templates, CPT templates, or fallback templates. Those templates may load global header/footer/layout and call `the_content()` or the Sage equivalent; they must not contain hidden hardcoded copies of ACF block sections. If `index.php` needs an empty-site fallback, it may show only a neutral placeholder/credit screen when no posts or page content exist.

When standard posts, a blog, news, articles, press updates, or source content mapped to posts are in scope, include branded post templates in the plan and implementation: `home.php`, `archive.php`, `single.php`, shared post card/pagination partials, and matching Sage Blade views when the theme uses `resources/views`. They must reuse the converted brand colors, fonts, cards, buttons, spacing, responsive rules, and global header/footer.

## WordPress Clone Readiness

Before final delivery, make the theme usable when cloned into `wp-content/themes/<theme-slug>` and activated:

- Ensure `style.css` has a valid WordPress theme header.
- Ensure `functions.php` loads Composer when present and boots theme setup/framework files.
- Ensure a valid frontend render path exists after activation. Add standard WordPress fallbacks (`index.php`, `header.php`, `footer.php`, `page.php`) when the project cannot rely on fully verified Sage/Acorn Blade routing in the target environment. Only add `front-page.php` when there is an explicit need, and it must render editor/block content rather than hardcoded converted sections.
- Ensure header/footer/global UI render by default from layout/templates.
- Verify page/editor content changes affect the frontend on the Home page and normal pages; fail delivery if a hardcoded fallback template overrides or bypasses the editor.
- Add and document branded blog index, archive, and single post templates when posts/blog content is in scope.
- Register and seed default WordPress menus for header/footer links when the source has them, without overwriting editor-assigned menus.
- Add global settings menu selectors when a global options page exists, while preserving Appearance > Menus as the menu item editor and fallback assignment source.
- Keep global option field groups limited to real rendered fields and remove unused or duplicate fields.
- Document required plugins and install/build commands in `README.md`.
- Provide a Media Library seed/import path for original client media, with a manifest from original `stock/` file to attachment target and block/options field usage. Default ACF block previews must not be empty solely because source images were left as theme-only assets.
- Ignore local agent folders, skill folders, uv caches, dependency folders, and generated build folders unless the user explicitly wants them committed.
- Never copy or clone the reusable skill repository `html-to-wordpress-converter` into `wp-content/themes`. Only the generated WordPress theme belongs there. If WordPress reports a broken theme named `html-to-wordpress-converter` with "Stylesheet is missing", instruct the user to delete that wrong folder from `wp-content/themes` and clone the actual theme repo/folder instead.
- Create `ready-pages/` with one paste-ready `.md` file per WordPress page. Each file must contain the exact Gutenberg ACF block comments in the correct order so the user can paste it into the WordPress Code Editor.
- Update `.html-to-sage/FINAL-REPORT.md` with activation readiness and any checks that could not be run.

## Stop Conditions

Stop before implementation unless the user explicitly asks for implementation. If `.html-to-sage/BLOCKERS.md` contains unresolved items, ask the user for those answers and do not implement. Treat visual mismatch as failed work.
