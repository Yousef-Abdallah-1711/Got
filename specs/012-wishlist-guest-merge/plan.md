# Implementation Plan: Wishlist and Guest-to-Account Merge

**Branch**: `012-wishlist-guest-merge` | **Date**: 2026-10-09 | **Spec**: [spec.md](./spec.md)

## Summary

Guest wishlist via cookie/localStorage (de-duplicated product-ID list, mirroring the existing `wishlist-store.js` pattern), authenticated wishlist via WordPress user meta (ADR 0007), merge-on-login in `got-commerce`, and a synchronized heart control across header/card/PDP/wishlist page via a small shared Alpine store.

## Technical Context

**Language/Version**: PHP 8.2+ (merge/validation logic), Alpine.js + a small vanilla-JS guest-storage module.
**Primary Dependencies**: WordPress user meta, WooCommerce product/stock lookups (for live availability).
**Storage**: User meta (`_got_wishlist`) for authenticated users; cookie/localStorage for guests — no new database table.
**Testing**: Playwright E2E (guest persistence, authenticated persistence, merge-with-overlap, move-to-cart validation, removed-product handling).
**Target Platform**: Same as prior.
**Constraints**: Store canonical product references only, never copied product data (constitution-adjacent "never trust/cache stale commerce data" principle).
**Scale/Scope**: Reused across header, product card, PDP, and the dedicated wishlist page.

## Constitution Check

| Principle | Check | Status |
|---|---|---|
| 16 — No fabricated claims | Price/availability always read live, never cached in the wishlist record | PASS |
| 9 — Avoid unnecessary dependencies | User meta chosen over a new table/plugin for this scale | PASS |

No violations.

## Project Structure

### Documentation (this feature)
```text
specs/012-wishlist-guest-merge/
├── plan.md
├── research.md
├── data-model.md
├── contracts/
│   └── wishlist-api.md
├── quickstart.md
└── tasks.md
```

### Source Code
```text
wp-content/plugins/got-commerce/src/Wishlist/
  WishlistService.php        # add/remove/list/merge, authenticated + guest-reconciliation logic
  RestController.php          # /wp-json/got/v1/wishlist (add/remove), /merge
wp-content/themes/got-sage/
  resources/js/wishlist-store.js   # guest cookie/localStorage module (ports the existing correct pattern) + shared Alpine store for cross-component sync
  resources/views/components/product-card.blade.php  # heart control, reused
  resources/views/pages/wishlist.blade.php
```

**Structure Decision**: Persistence/merge logic in the plugin; the heart control and its cross-tab/cross-component sync behavior in the theme, since that's pure presentation state mirroring server truth.

## Complexity Tracking
*No violations.*
