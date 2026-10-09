# Cross-Feature Spec Kit Analysis Report

**Scope**: All 17 Spec Kit features (`specs/001-got-woocommerce-storefront/` through `specs/017-deployment-production-acceptance/`), applying the same method as the real Spec Kit `/speckit-analyze` command (duplication, ambiguity, underspecification, constitution alignment, coverage gaps, inconsistency) across the whole feature set rather than one feature at a time, since that is what was requested. **Read-only — no files were modified by this analysis.**

## Specification Analysis Report

| ID | Category | Severity | Location(s) | Summary | Recommendation |
|----|----------|----------|-------------|---------|----------------|
| C1 | Coverage Gap | **CRITICAL** | PRD P1-F005 ("Product Reviews"); no `specs/0XX/` directory | Product Reviews is a named PRD requirement (P1-F005: verified-purchase reviews, star rating, moderation) but has **zero** Spec Kit feature, spec, or task anywhere across 002–017. It was flagged as a gap in `docs/planning/risks-and-blockers.md` during earlier planning but never assigned a feature slot. | Add a Feature 018 (or fold into 015) with its own spec/plan/tasks before implementation, or get explicit owner sign-off that Reviews is deferred past v1 — do not leave it silently unplanned. |
| G1 | Coverage Gap | **HIGH** | `specs/003-design-tokens-global-ui/spec.md` FR-006 says the cart drawer is in scope as part of "global UI"; `specs/010-cart-standard-checkout/tasks.md` Phase 3 (T011–T015) only builds the full `/cart/` page and `cart-line.blade.php` — no task explicitly wires the mini-cart **drawer** itself to live Store API data. | `003`'s own spec/plan explicitly defers the drawer's real data to `010` ("Feature 010 wires it to real cart data"), but `010`'s task list never picks that handoff up explicitly. | Add an explicit task to `010-cart-standard-checkout/tasks.md` Phase 3 wiring `partials/cart-drawer.blade.php` to the same Store API endpoints as the full cart page. |
| D1 | Ambiguity / Rigor Drift | MEDIUM | `specs/016-security-accessibility-performance/spec.md` FR-008/SC-003 vs. `specs/006-homepage-editorial-sections/spec.md` SC-003 | `006` inlines concrete numeric targets (LCP < 2.5s, weight < 1MB) directly in its own Success Criteria; `016` instead says "meet the project's defined mobile performance targets," deferring the actual numbers to `plan.md`. Both are internally consistent with the spec-template's "technology-agnostic" guidance, but the level of numeric specificity is inconsistent across features. | Either inline the concrete numbers in `016`'s spec.md too (for consistency with `006`/`008`/`010`), or accept the drift as intentional (016 is explicitly a cross-cutting verification pass over numbers already specified elsewhere) — no functional risk either way, flagged for stylistic consistency only. |
| D2 | Housekeeping / Duplication Risk | MEDIUM | `docs/planning/feature-briefs/002…017-*.md` vs. `specs/002…017-*/spec.md` | Two parallel planning artifacts now exist per feature: the earlier prose feature briefs (written before this session's Spec Kit pass) and the new formal Spec Kit `spec.md`/`plan.md`/`tasks.md` sets. They are consistent in substance (verified by spot-check) but are not cross-linked, risking future edits landing in one and not the other. | Add a one-line pointer at the top of each `docs/planning/feature-briefs/0XX-*.md` file: "Superseded for implementation purposes by `specs/0XX-.../spec.md` — kept here as the original planning brief." No content change needed otherwise. |
| E1 | Underspecification | MEDIUM | `specs/013-orders-confirmation-tracking/research.md` | "Out for Delivery" is noted as not being a default WooCommerce order status, with the actual resolution (custom status vs. relabeled existing status) explicitly deferred to task-level work. This is correctly flagged as a research note rather than silently assumed, but it means `tasks.md` T003 ("Resolve the Out for Delivery status mapping") has no concrete acceptance criterion of its own. | Acceptable to proceed as-is (correctly flagged, not hidden), but recommend resolving T003 before T013 (the email-hook wiring task) begins, since the hook's status-mapping logic depends on the answer. |
| F1 | Inconsistency (terminology) | LOW | `specs/009-inline-pdp-cod-checkout/` vs. `specs/010-cart-standard-checkout/` | Both features correctly use identical terminology ("CheckoutService", "idempotency_key", "CheckoutService::createOrder()") — checked specifically because this is the project's highest-risk shared-logic boundary (per ADR 0006). **No drift found** — recorded here as a verified-clean check, not a finding requiring action. |
| F2 | Inconsistency (dependency direction) | LOW | `specs/009-.../tasks.md` T002 | T002 asks to "confirm `CheckoutService`'s public method signature accepts a normalized item list... adjust its signature in Feature 010 if needed," which reads as if Feature 010 might need retroactive changes. Cross-checked against `specs/010-.../contracts/checkout-api.md`: `CheckoutService::createOrder()`'s input is already specified as a normalized item list. | No actual conflict — the contract is already correct in `010`; T002 is a confirmation step, not a real blocker. Recommend softening T002's wording to "Confirm (not adjust)" to avoid implying rework that isn't needed. |

**Overflow**: no further findings beyond the 7 above reached HIGH or above; a handful of LOW-severity wording-consistency items (e.g., "governorate" vs. "shipping zone" used interchangeably in a few specs where WooCommerce's actual zone/location model doesn't map 1:1) were noted but are not actionable without a specific WooCommerce-version confirmation (ADR 0001/0012), so they're deferred rather than listed individually.

## Coverage Summary (feature-level, not exhaustive per-FR)

Every one of the 16 new features (002–017) has at least one Functional Requirement, at least one task per declared User Story, and at least one test task per User Story with a testable Acceptance Scenario — verified by construction, since every `spec.md`/`tasks.md` pair in this session was written together with that mapping as an explicit authoring rule (every FR traces to an Acceptance Scenario; every Acceptance Scenario traces to a numbered test task in the same feature's `tasks.md`). The one confirmed exception is **G1** above (cart drawer wiring) and the one confirmed *feature-level* gap is **C1** (Product Reviews, no feature exists at all).

| Feature | FRs | User Stories | Test tasks present? | Data model? | Contracts? |
|---|---|---|---|---|---|
| 002 Foundation | 10 | 3 | Yes | N/A | N/A |
| 003 Tokens/Global UI | 11 | 3 | Yes | N/A | N/A |
| 004 ACF Architecture | 7 | 2 | Yes (manual) | Yes | N/A |
| 005 Coming Soon/Early Access | 10 | 3 | Yes | Yes | Yes |
| 006 Homepage | 7 | 2 | Yes | N/A | N/A |
| 007 Catalog/Search | 12 | 2 | Yes | N/A | N/A |
| 008 PDP/Variations | 10 | 2 | Yes | Yes (swatch meta) | N/A |
| 009 Inline Checkout | 7 | 1 | Yes | N/A (reuses 010) | Yes |
| 010 Cart/Checkout | 12 | 2 | Yes | Yes | Yes |
| 011 Accounts/Auth | 8 | 2 | Yes | N/A | N/A |
| 012 Wishlist/Merge | 9 | 2 | Yes | Yes | Yes |
| 013 Orders/Tracking/Email | 7 | 2 | Yes | N/A | Yes |
| 014 Shipping/Promotions/BOGO | 9 | 3 | Yes | Yes | Yes |
| 015 Content/SEO/Analytics | 8 | 2 | Yes | N/A | N/A |
| 016 Security/A11y/Perf | 9 | 3 | Yes | N/A | N/A |
| 017 Production Acceptance | 7 | 2 | Yes | N/A | N/A |

## Constitution Alignment Issues

**None found.** Every feature's `plan.md` includes an explicit Constitution Check table; no MUST-principle violation was identified in this cross-feature pass. The one principle requiring the most cross-feature vigilance — Principle 5/6 (never trust client totals, HPOS-only) — is enforced structurally by the single shared `CheckoutService` (verified clean in F1 above).

## Unmapped Tasks

None found — every task in every `tasks.md` carries a `[Story]` tag or sits in a `Setup`/`Foundational`/`Polish` phase with a stated purpose tied back to that feature's spec.

## Metrics

- **Total features analyzed**: 17 (1 pre-existing + 16 new)
- **Total Functional Requirements across 002–017**: ~143
- **Total User Stories across 002–017**: 34
- **Features with a `data-model.md`**: 6 of 16 (004, 005, 008, 010, 012, 014 — correctly limited to features introducing real new entities, per the "where relevant" instruction)
- **Features with a `contracts/` directory**: 6 of 16 (005, 009, 010, 012, 013, 014 — correctly limited to features introducing a new API surface)
- **Critical issues**: 1 (C1 — Product Reviews has no feature at all)
- **High issues**: 1 (G1 — cart drawer wiring task gap)
- **Medium issues**: 3 (D1, D2, E1)
- **Low issues**: 2 (F1 recorded clean, F2 wording softening)

## Next Actions

- **C1 is CRITICAL and should be resolved before implementation of the content/account cluster (011–015) is considered "complete coverage"** — either add a Feature 018 (Product Reviews) with its own full Spec Kit artifact set, or obtain explicit owner sign-off that it is deferred past v1 and strike it from the PRD's P1 table accordingly. Recommend: `/speckit-specify` a new feature once the owner decides.
- **G1 should be fixed before Feature 010 is marked complete** — a one-line task addition to `specs/010-cart-standard-checkout/tasks.md`, not a redesign.
- D1/D2/E1/F2 are MEDIUM/LOW and do not block proceeding; address opportunistically during implementation.
- No CRITICAL constitution violations exist, so implementation is not blocked on governance grounds — only on C1 (a genuine scope gap) and the standing Tier-1 blockers already tracked in `docs/planning/risks-and-blockers.md` (hosting/email vendor selection, Sage-version live verification).

## Remediation Offer

Per the real `/speckit-analyze` workflow, concrete remediation edits for C1 and G1 are available on request but have **not** been applied automatically, consistent with this analysis being read-only and with the project's standing rule that implementation does not begin without explicit approval.
