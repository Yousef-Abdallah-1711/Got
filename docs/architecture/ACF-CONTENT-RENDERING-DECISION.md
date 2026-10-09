# ACF Content Rendering Decision

**Status**: Corrects finding C1-ARCH (`docs/planning/PRE-IMPLEMENTATION-ARCHITECTURE-REMEDIATION.md`) — an independent Codex review found that Feature 004 (`page_sections` ACF Flexible Content field) and Feature 006 (homepage composed from Feature 004's blocks **plus** separately-coded, hardcoded-order Blade commerce sections) establish two different page-composition models operating at once: one where editors reorder layouts inside a Flexible Content field, and one where the homepage's commerce sections exist in a fixed code-defined order outside that field entirely. Verified against the actual files (`specs/004/plan.md`, `specs/004/tasks.md` T003–T004, `specs/006/plan.md`, `specs/006/tasks.md` T006–T010) — the conflict is real.

## The chosen model: ACF Blocks only, composed natively in the WordPress block editor — no Flexible Content field

**Decision**: Remove the `page_sections` Flexible Content field entirely. Every section — editorial (Hero, Manifesto, Packaging Story, etc., from Feature 004) **and** commerce-driven (Featured Drop, New Arrivals, Shop by Category, Spotlight, from Feature 006) — is its own registered ACF Block (`acf_register_block_type()`), placed directly in the page's native Gutenberg block editor content, in whatever order the editor drags them into. `front-page.php`/`page.php` simply render `the_content()` — the block sequence itself IS the page composition; there is no second, parallel ordering mechanism.

## Why this is the right choice (not just "pick one arbitrarily")

| Consideration | Flexible Content field | ACF Blocks only (chosen) |
|---|---|---|
| How an editor adds/reorders a section | Edit the Flexible Content field's layout list (a custom, ACF-specific UI, separate from the main editor canvas) | Drag the block directly in the main editor canvas — the same interaction every editor already knows from using any WordPress block |
| Can commerce-driven sections (Feature 006) participate in the same reordering? | No — Feature 006's prior design placed them outside the field entirely, in a fixed Blade order (the actual conflict) | Yes — they're ACF Blocks like any other, reorderable identically |
| Matches constitution's "page templates render editor content as the single source of truth, never hardcode converted sections" (HTML-to-Sage Principle IV, quoted directly in the constitution) | Partially — the Flexible-Content-composed sections satisfy this, but Feature 006's hardcoded commerce-section order did not | Fully — there is exactly one content pipeline, and it's the editor's own block sequence |
| Editor training/support burden | Two UIs to learn (main editor + Flexible Content field) | One UI (the block editor itself) |
| Preview fidelity in wp-admin | ACF Blocks already render live previews in the editor (Feature 004's existing requirement); a Flexible Content field's layout preview is a separate, often less faithful rendering path | ACF Blocks' native editor preview applies uniformly to every section |

This also directly satisfies PRD/`PRODUCT.md`'s stated goal (Content Editor role: "publish a page composition change without a developer") more simply than the two-model version did.

## What changes in Feature 004

- `page_sections` Flexible Content field registration (`specs/004/tasks.md` T003) is **removed**.
- The 9 editorial blocks (T005–T013) are unaffected in their own registration — they were already real ACF Blocks; only the *composition wrapper* around them is removed.
- Feature 004's spec.md User Story 1 ("Editor builds/reorders a page") is satisfied by the native block editor instead of a Flexible Content field — the acceptance criteria (add/reorder/remove, under 10 minutes) are unchanged in substance.

## What changes in Feature 006

- The commerce-driven sections (Featured Drop, New Arrivals, Shop by Category, Spotlight) move from "hardcoded Blade sections assembled in `front-page.blade.php` in a fixed order" to **their own ACF Blocks**, registered the same way as Feature 004's editorial blocks (own fields for editorial framing text, own Blade template, own render callback that calls `HomepageQueries` for live WooCommerce data).
- `front-page.blade.php`'s Site-Mode branch (Store vs. Coming Soon) is unaffected — it still decides which *template* to use; what changes is that the Store-mode template now just renders `the_content()` instead of hardcoding a specific section sequence.
- The homepage's "14 sections" are now **all** ACF Blocks the editor composes via the block editor, with no sections living outside that mechanism.

## What stays exactly the same

- ACF Blocks never model WooCommerce product/price/stock/order data (constitution rule, unaffected).
- The "render nothing unless required content/data exists" guard (Feature 004's FR-002/FR-003, Feature 006's FR-004) is unaffected — each block's render callback keeps its own per-block guard regardless of how it's composed on the page.
- The Global ACF Options page (Feature 004's T004a, added in a prior round) is unrelated to this decision — options pages and Flexible Content fields are different ACF mechanisms, and only the latter is being removed.
