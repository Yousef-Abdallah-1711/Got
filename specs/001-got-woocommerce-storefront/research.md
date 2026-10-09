# Research: HTML to Sage WordPress Conversion

**Historical reference only** — preserved as-is from the original auto-generated scaffold. As of the 2026-10-09 refactor, this feature no longer implements anything itself (see `spec.md`/`plan.md`); its decisions below were superseded feature-by-feature (e.g. the CPT decision below is now formally justified per-CPT in `docs/adr/0009-promotion-implementation.md` for the one CPT the whole project actually uses). Kept for audit trail, not as an active instruction.

---

## Decision: Use ACF repeaters for page-local repeated content

Rationale: Use CPTs only when content needs archive/single/filter/search/reuse/admin workflow.

## Decision: Use global template parts for site chrome

Rationale: Header/footer/navigation/global CTA/schema are site-wide concerns and must not be repeated as page-local ACF blocks.

## Decision: Use WordPress menus for header and footer link columns

Rationale: Normal label/URL navigation belongs in Appearance > Menus. ACF option repeaters should not duplicate menu management or create extra non-working admin fields.

## Decision: Split CSS and JS by ownership

Rationale: Preserve maintainability while keeping visual output identical.

## Decision: Preserve original source in stock

Rationale: `stock/` is the immutable source of visual truth and QA comparison baseline.

## Decision: Seed client-editable media into WordPress Media Library

Rationale: Editors must be able to replace and restore original images/icons/videos/documents from WordPress. ACF previews should not be empty because defaults were left as hardcoded theme assets.
