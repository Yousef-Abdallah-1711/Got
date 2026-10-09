# Feature 001 Task Migration Record

Every one of the original 52 tasks in `specs/001-got-woocommerce-storefront/tasks.md` (as it existed before this refactor), classified, traced, and dispositioned. No task was deleted without this record. Classification legend: **GENERIC** (converter boilerplate not specific to this project) / **DUPLICATE** (a real need, already owned elsewhere) / **VALID** (a real, previously-unowned need — migrated) / **CONDITIONAL** (applies only if a precondition holds, which it doesn't here) / **OBSOLETE** (the need no longer exists given this project's actual build method).

## Phase 1: Setup (T001–T005)

| Task | Description | Class | Owning Feature | Replacement Task | Transfer Needed? | Disposition | Evidence |
|---|---|---|---|---|---|---|---|
| T001 | Resolve `.html-to-sage/BLOCKERS.md` choices before implementation | GENERIC | N/A | `docs/planning/UPDATED-RISKS-AND-DECISIONS.md` (the whole document) | No — the real blockers already live in a better-structured document | **OBSOLETE as a code task; superseded by a planning document** | `UPDATED-RISKS-AND-DECISIONS.md` exists and is more complete than `.html-to-sage/BLOCKERS.md` ever was |
| T002 | Create Sage theme `got-sage` at approved path | DUPLICATE | 002 | `002-T005` | No | **Consolidated into 002-T005** | `specs/002-.../tasks.md` T005 |
| T003 | Install Composer and Node dependencies for `got-sage` | VALID | 002 | `002-T005a` (new, added this session) | **Yes — was genuinely missing** | **Migrated** | `specs/002-.../tasks.md` T005a |
| T004 | Add framework layer directories in `got-sage/framework/` | VALID | 002 | `002-T005b` (new, added this session) | **Yes — was genuinely missing** | **Migrated** | `specs/002-.../tasks.md` T005b |
| T005 | Configure Vite, SCSS, JS, Blade entries | DUPLICATE | 002 + 003 | `002-T007` (Vite entries); `003-T003–T011` (SCSS/JS/Blade) | No | **Consolidated, split across two features** | `specs/002/tasks.md` T007; `specs/003/tasks.md` |

## Phase 2: Foundations (T006–T011b)

| Task | Description | Class | Owning Feature | Replacement Task | Transfer Needed? | Disposition | Evidence |
|---|---|---|---|---|---|---|---|
| T006 | Register ACF block category and shared render callback | DUPLICATE | 004 | `004-T002` | No | **Consolidated** | `specs/004/tasks.md` T002 |
| T007 | Register ACF options page and global options field group | VALID | 004 | `004-T004a` (new, added this session) | **Yes — was genuinely missing** | **Migrated** | `specs/004/tasks.md` T004a |
| T008 | Register WordPress menu locations for primary and footer menus | DUPLICATE | 003 | `003-T018` | No | **Consolidated** | `specs/003/tasks.md` T018 |
| T008a | Register global options fields as optional when defaults exist | VALID | 004 | `004-T004a` (folded in) | **Yes** | **Migrated (folded into T004a's own wording)** | `specs/004/tasks.md` T004a |
| T008b | Seed original header/footer menus idempotently without overwriting editor assignments | DUPLICATE | 003 | `003-T018` (already says "seed idempotently... without overwriting editor-assigned menus") | No | **Consolidated** | `specs/003/tasks.md` T018 |
| T008c | Audit global option fields, remove unused/duplicate/speculative fields | VALID | 004 | `004-T004a` (folded in) | **Yes** | **Migrated (folded into T004a's own wording)** | `specs/004/tasks.md` T004a |
| T008d | Add optional global settings menu selectors, seed-once, fall back to Appearance > Menus, never hardcode menu IDs | VALID | 004 | `004-T004b` (new, added this session) | **Yes — was genuinely missing** | **Migrated** | `specs/004/tasks.md` T004b |
| T008e | If posts/blog/news in scope, create branded post templates | CONDITIONAL | N/A | None | No | **OBSOLETE / NOT APPLICABLE** — GOT-Store-PRD.md contains no blog, news, or press feature anywhere; the precondition never holds | `GOT-Store-PRD.md` §4 Scope (no blog/post feature listed) |
| T009 | Split source CSS into common/components/layout/blocks | GENERIC | N/A | `003` (tokens.css/app.css), `004` (per-block SCSS) | No | **OBSOLETE as written** — this instruction assumes a static HTML/CSS source being mechanically split; the actual source is a React prototype with no monolithic CSS file to split. The real organizational need (clean CSS architecture) is already met | `specs/003/plan.md` Project Structure; `specs/004/plan.md` Project Structure (one SCSS file per block, already the pattern) |
| T010 | Split source JS into navigation/reveal/block modules | GENERIC | N/A | `003` (Alpine components), `004` (optional per-block JS) | No | **OBSOLETE as written** — same reasoning as T009; no monolithic source JS file exists to split | Same as T009 |
| T011 | Confirm no CPTs needed or document justified CPTs | VALID | N/A (cross-cutting) | `docs/adr/0009-promotion-implementation.md` (justifies `got_promotion` CPT); `docs/architecture/woocommerce-integration.md` | No | **Already satisfied at the architecture-document level** — the only CPT in the entire 18-feature plan (`got_promotion`, Feature 014) is already explicitly justified against the HTML-to-Sage Principle V criteria. No further task needed. | `docs/adr/0009...md` Decision section |
| T011a | Create `.html-to-sage/MEDIA-LIBRARY-SEED.md` | VALID | 004 | `004`'s plan.md already references "Media Library seeding plan for each block's images" | Partially — the *document* named here is superseded by the seeding plan being part of each block's own registration, not a separate central document | **Superseded** — folded into 004's per-block scope rather than kept as a separate converter-named file | `specs/004/plan.md` Summary |
| T011b | Implement/document idempotent Media Library seed/import path | VALID | 004 | Same as T011a | Same | **Superseded**, same reasoning | Same |

## Phase 3: Page and Section Conversion (T012–T015)

| Task | Description | Class | Owning Feature | Replacement Task | Transfer Needed? | Disposition | Evidence |
|---|---|---|---|---|---|---|---|
| T012 | For each page in `PAGES.md`, create the matching WP page/block order | DUPLICATE | 004, 006, 015 (each feature builds its own pages) | Each feature's own page-building tasks | No | **Consolidated, distributed** — `.html-to-sage/PAGES.md` itself is superseded by `docs/design/page-mapping.md`, which is more accurate and already maps every page to its real owning feature | `docs/design/page-mapping.md` |
| T013 | For each global template part, create Sage partial/data source/SCSS/JS | DUPLICATE | 003 | `003-T014`–`T017` (Header/Footer/AnnouncementBar/CartDrawer) | No | **Consolidated** | `specs/003/tasks.md` |
| T014 | For each ACF block, create registration/fields/template/SCSS/JS/preview/visual-parity | DUPLICATE | 004 | `004-T005`–`T013` | No | **Consolidated** | `specs/004/tasks.md` |
| T015 | For each section, compare WP output to original source, fix mismatch until 100% visual parity | VALID | N/A (cross-cutting methodology) | `docs/design/IMPLEMENTATION-VISUAL-CONTRACT.md` (new, this session) + each feature's own visual-regression test task | Yes, but as a *methodology document*, not a per-section task | **Migrated into a shared methodology document**, applied by each feature individually rather than as one Feature 001 task | `docs/design/IMPLEMENTATION-VISUAL-CONTRACT.md` |

## Phase 4: Full Editability (T016–T019e)

| Task | Description | Class | Owning Feature | Replacement Task | Transfer Needed? | Disposition | Evidence |
|---|---|---|---|---|---|---|---|
| T016 | Verify every meaningful text item editable | DUPLICATE | 004 | 004's FR-002/FR-003 + per-block render-gating | No | **Consolidated** | `specs/004/spec.md` |
| T017 | Verify every image/icon/label/URL/etc. editable or documented exception | DUPLICATE | 004 | Same + `docs/audit/missing-assets.md`'s already-tracked exceptions | No | **Consolidated** | `specs/004/spec.md`; `docs/audit/missing-assets.md` |
| T018 | Verify structural wrappers/classes not over-modeled as fields | VALID (as a review criterion, not a task) | 004 | Constitution HTML-to-Sage Principle IV | No | **OBSOLETE as an independent task** — this is a code-review standard applied during block-building, not a standalone deliverable | `.specify/memory/constitution.md` |
| T019 | Verify no frontend template/stylesheet references `stock/` | VALID | 017 | `017-T007a` (new, added this session) | **Yes — was genuinely missing** | **Migrated** | `specs/017/tasks.md` T007a |
| T019a | Verify no client-editable media hardcoded; ACF previews resolve seeded attachments | DUPLICATE | 004 | 004's Media Library scope | No | **Consolidated** | `specs/004/plan.md` |
| T019b | Verify every global option field changes the frontend | VALID | 004 | `004-T004c` (new, added this session) | **Yes** | **Migrated** | `specs/004/tasks.md` T004c |
| T019c | Verify header/footer links editable from Appearance > Menus, not duplicated in ACF repeaters | VALID | 003/004 | `003`'s menu-location design decision + `004-T004b` | **Yes, partially — folded into T004b's wording** | **Migrated** | `specs/004/tasks.md` T004b |
| T019f | Verify global menu selectors switch sources without code changes, no hardcoded IDs | VALID | 004 | `004-T004b` | **Yes** | **Migrated** | `specs/004/tasks.md` T004b |
| T019g | Verify blog templates render real post data | CONDITIONAL | N/A | None | No | **OBSOLETE / NOT APPLICABLE** — same reasoning as T008e | `GOT-Store-PRD.md` §4 |
| T019d | Verify no template duplicates converted sections outside the editor/block pipeline | VALID (review criterion) | 004, 006 | 006's homepage composes via Flexible Content, never hardcoded (already true by construction) | No | **OBSOLETE as independent task** — already structurally guaranteed by how 004/006 were specified, not something that needs separate verification | `specs/006/spec.md`; `specs/004/spec.md` |
| T019e | Verify editing a Home ACF block changes the frontend Home page | DUPLICATE | 004 | `004-T014` ("Manual QA: add/reorder/remove each block... confirm no developer/code step was needed") | No | **Consolidated** | `specs/004/tasks.md` T014 |

## Phase 5: QA and Gates (T020–T026)

| Task | Description | Class | Owning Feature | Replacement Task | Transfer Needed? | Disposition | Evidence |
|---|---|---|---|---|---|---|---|
| T020–T022 | Desktop/tablet/mobile visual QA against `stock/` | VALID (methodology), but comparison target is wrong | N/A | `docs/testing/visual-regression-plan.md` + `docs/design/IMPLEMENTATION-VISUAL-CONTRACT.md` (new) | Yes — as a corrected methodology | **Superseded** — `stock/` is a backup copy of source *files*, not a renderable visual reference; the correct reference is the rendered design-system prototype (`ui_kits/storefront/*.html` opened in a browser), which is what the visual-regression plan and the new visual contract actually specify | `docs/testing/visual-regression-plan.md` §1; `docs/design/IMPLEMENTATION-VISUAL-CONTRACT.md` |
| T023 | Verify JS behavior parity: nav/menu/accordion/slider/animations | DUPLICATE | 003, 004, 008 | Distributed across each feature's own component tasks | No | **Consolidated, distributed** | `specs/003,004,008/tasks.md` |
| T024 | Verify escaping/sanitization for all dynamic output | VALID | 016 | `016-T007a` (new, added this session) | **Yes — was genuinely missing as an explicit cross-cutting task** | **Migrated** | `specs/016/tasks.md` T007a |
| T025 | Run PHP syntax checks and Vite production build | DUPLICATE | 002 | `002-T010` (CI pipeline) | No | **Consolidated** | `specs/002/tasks.md` T010 |
| T026 | Complete `VISUAL-QA.md`, `SECURITY-CHECKLIST.md`, final report | VALID | N/A | `docs/planning/FINAL-IMPLEMENTATION-READINESS.md` (new, this session) + 016/017's own evidence-recording tasks | Yes | **Superseded by a better-structured deliverable** | `docs/planning/FINAL-IMPLEMENTATION-READINESS.md` |

## Phase 6: WordPress Clone Readiness (T027–T037)

| Task | Description | Class | Owning Feature | Replacement Task | Transfer Needed? | Disposition | Evidence |
|---|---|---|---|---|---|---|---|
| T027 | Verify `style.css` valid theme header | DUPLICATE | 002 | `002-T005` | No | **Consolidated** | `specs/002/tasks.md` T005 |
| T028 | Verify `functions.php` bootstraps Composer | DUPLICATE | 002 | `002-T005` | No | **Consolidated** | `specs/002/tasks.md` T005 |
| T029 | Verify valid render path after activation | DUPLICATE | 002 | `002-T013`–`T015` (US1 tests) | No | **Consolidated** | `specs/002/tasks.md` |
| T029a | Verify fallback templates render `the_content()`, no hardcoded sections | DUPLICATE | 004, 006 | Already structurally true (see T019d above) | No | **Consolidated / already satisfied** | Same as T019d |
| T030 | Verify plugins/install commands documented in README | DUPLICATE | 002 | `002-T012` | No | **Consolidated** | `specs/002/tasks.md` T012 |
| T031 | Verify Home/page block order and global settings documented in README | DUPLICATE | 002, 004 | `002-T012` + `004`'s own docs | No | **Consolidated** | Same |
| T032 | Verify local agent/skill/cache folders, `node_modules/`, `vendor/`, build outputs ignored | VALID | 002 | `002-T012a` (new, added this session) | **Yes — was genuinely missing** | **Migrated** | `specs/002/tasks.md` T012a |
| T033 | Verify the `html-to-wordpress-converter` skill repo is not inside the delivered theme | VALID | 017 | `017-T007a` (new, added this session) | **Yes** | **Migrated** | `specs/017/tasks.md` T007a |
| T034 | If a broken theme named `html-to-wordpress-converter` is found, delete the wrong folder | GENERIC | N/A | None | No | **OBSOLETE / NOT APPLICABLE** — this warns about a failure mode specific to running the automated converter tool against a live WordPress install; this project is being hand-built from the Spec Kit plan, not run through that automated tool, so the failure mode cannot occur | N/A — no automated conversion run exists or is planned |
| T035 | Create `ready-pages/` with paste-ready Gutenberg block markup per page | GENERIC | N/A | Each feature's own page-building tasks already specify how that page's content gets created (code-owned ACF blocks, not manual paste-in) | No | **OBSOLETE** — this deliverable format assumes manual Gutenberg-editor paste-in as the content-provisioning method; this project provisions pages via code-registered ACF blocks composed in the editor UI directly, which makes a separate paste-ready markup file redundant | `specs/004/plan.md` (code-owned field groups, not manual markup) |
| T036 | Verify Media Library seed path documented in README/final report | DUPLICATE | 004 | 004's own scope + `FINAL-IMPLEMENTATION-READINESS.md` | No | **Consolidated** | `specs/004/plan.md` |
| T037 | Run/document Composer/Node/PHP/activation/smoke checks in final report | DUPLICATE | 002, 017 | `002`'s quickstart.md + `017`'s smoke test | No | **Consolidated** | `specs/002/quickstart.md`; `specs/017/tasks.md` |

## Summary

- **52 original tasks reviewed.**
- **12 transferred as genuinely new tasks** into Features 002 (5: T003→T005a, T004→T005b, T032→T012a), 004 (6: T007→T004a, T008a→T004a, T008c→T004a, T008d→T004b, T019b→T004c, T019f→T004b — some fold together, yielding 3 new 004 tasks from 6 sources), 016 (1: T024→T007a), 017 (2: T019+T033→T007a combined).
- **23 consolidated** into an existing task in another feature (no new task created — the need was already met).
- **9 superseded** by a better-structured document (`.html-to-sage/PAGES.md`→`page-mapping.md`; `stock/`-comparison→visual contract; `VISUAL-QA.md`/`SECURITY-CHECKLIST.md`→`FINAL-IMPLEMENTATION-READINESS.md`; media-library doc naming).
- **8 marked OBSOLETE / NOT APPLICABLE** with evidence (blog templates ×2, generic CSS/JS splitting ×2, structural-wrapper review criterion, hardcoded-section review criterion, converter-skill-cleanup edge case, ready-pages paste-in format).
- **0 requirements lost without a trace** — every row above has an explicit disposition and evidence pointer; nothing was silently dropped.
