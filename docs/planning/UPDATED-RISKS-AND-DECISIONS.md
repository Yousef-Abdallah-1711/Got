# Updated Risks and Decisions Register

Supersedes `docs/planning/risks-and-blockers.md` as the current register (that file remains as historical record of what was already resolved this round). Status reflects the owner decisions made since that document was written (Acid Lime approved, inline checkout mandatory, BOGO/free-shipping mandatory) and the new findings from this audit.

## Resolved since the last register (do not re-open)

| Item | Resolution | Evidence |
|---|---|---|
| C-01 Acid Lime vs. silver accent | Owner-approved: Acid Lime is the accent, monochrome base preserved | `specs/003-.../spec.md` FR-011, `research.md` |
| C-02 Inline PDP checkout scope | Owner-approved: mandatory in v1 | `specs/009-.../spec.md`, ADR 0006 |
| C-03 BOGO/free-shipping scope | Owner-approved: mandatory, display-gated on real eligibility | `specs/014-.../spec.md`, ADR 0009 |
| E1 "Out for Delivery" status mapping | Resolved: one custom status (`wc-out-for-delivery`); "Delivered" = native `Completed` | ADR 0016 |
| C1 Product Reviews had no feature | Resolved: Feature 018 created in full | `specs/018-product-reviews/` |
| G1 Cart drawer had no wiring task | Resolved: tasks T010a/T015a/T015b added to Feature 010 | `specs/010-.../tasks.md` |
| D1 Inconsistent performance-criteria rigor | Resolved: Feature 016's spec now inlines the same numeric targets as 006/008/010 | `specs/016-.../spec.md` |
| D2 Feature briefs vs. formal specs duplication risk | Resolved: all 16 briefs marked superseded-but-preserved | `docs/planning/feature-briefs/0*.md` |
| F2 Misleading CheckoutService wording | Resolved: Feature 009's T002 reworded; Feature 010's T006 carries the authoritative cross-reference | `specs/009-.../tasks.md`, `specs/010-.../tasks.md` |
| Scalability load-test gap (found this audit) | Resolved: task added to Feature 016 | `specs/016-.../tasks.md` T014a |
| **C1-ARCH ACF composition conflict** (found via Codex review, this round) | Resolved: Flexible Content field removed, all sections now native ACF Blocks | `docs/architecture/ACF-CONTENT-RENDERING-DECISION.md` |
| **C2-CHECKOUT order-creation layering + idempotency ordering** (found via Codex review, this round) | Resolved: `CheckoutService` is validation-only; order creation split by flow; `IdempotencyGuard` moved earlier | `docs/architecture/CHECKOUT-AND-ORDER-LIFECYCLE.md` |
| **C3-PROMO BOGO stock-reduction defect** (found via Codex review, this round) | Resolved: BOGO realized as a real zero-priced line item, not a cart fee | `docs/architecture/PROMOTIONS-AND-PRICING.md` |
| RTL logical-CSS gap (found this audit) | Resolved: task added to Feature 003 | `specs/003-.../tasks.md` T022a |
| Tax-configuration ownership gap (found this audit) | Resolved: task added to Feature 002 | `specs/002-.../tasks.md` T008a |
| Site Mode admin switch had no task owner (found this audit) | Resolved: tasks added to Feature 002 | `specs/002-.../tasks.md` T009a/T009b |

## True Blockers (cannot proceed past a specific point without these)

| Decision/Prerequisite | Blocks | Owner | Status |
|---|---|---|---|
| **Hosting environment selection** | Feature 002 (cannot provision without a chosen host meeting ADR 0012's criteria) | Brand owner (budget) + dev lead | **BLOCKED — unresolved** |
| **Email provider selection** (marketing + transactional, ADR 0011) | Feature 005 (early-access sync), Feature 013 (transactional emails), Feature 018 (review-request emails) | Brand owner | **BLOCKED — unresolved** |
| **WordPress/Sage/PHP version live verification** (ADR 0001) | Feature 002's first task — nothing else starts until this runs | Dev lead | **BLOCKED — requires running `composer create-project roots/sage` against the live current release, which this offline planning session cannot do.** This round's Codex review added a specific concern to verify: current Roots Acorn documentation (per Codex's model knowledge, not a live check) may require PHP 8.3, which would conflict with this project's documented PHP 8.2+ floor — confirm this specifically during the live scaffold check, not just versions in general. |
| **Kimi Code CLI monthly quota exhausted** (this round) | Kimi's assigned cross-feature-audit scope could not run at all | Brand owner (billing) | **BLOCKED — 403 billing error.** Owner directed proceeding with Codex only for this round; the orchestrator performed Kimi's intended audit scope directly instead (see `docs/planning/PRE-IMPLEMENTATION-ARCHITECTURE-REMEDIATION.md`'s K-prefixed findings). Not a re-opened blocker for future rounds unless Kimi delegation is specifically requested again before the quota refreshes or is topped up. |
| **ACF Pro license/availability** | Feature 004 (every ACF block registration depends on it existing) | Dev lead / brand owner (purchase) | **BLOCKED — not yet confirmed procured** |
| **Shipping zone fees (real EGP values)** | Feature 010's final sign-off, Feature 014's BOGO/shipping testing with real numbers | Brand owner | **BLOCKED — currently placeholder, engineering can proceed, sign-off cannot** |
| **Confirmed Drop 01 product data, photography, prices** | Feature 006/007/008's content, Feature 017's launch gate | Brand owner | **BLOCKED — explicit PRD dependency, unchanged** |
| **Legal-reviewed policy text** (Privacy, Terms, Returns, Shipping, Cookie) | Feature 015's final publish, Feature 017's launch gate | Brand owner + legal reviewer | **BLOCKED — explicit PRD Phase 4 gate, unchanged** |
| **Confirmed launch date (written)** | Feature 017's Store-Mode switch | Brand owner | **BLOCKED — explicit PRD/constitution gate, unchanged** |

## Decisions that can safely wait (do not block earlier features)

| Decision | Can wait until | Why it's safe to defer |
|---|---|---|
| C-06 wishlist guest-gate UX (prompt vs. silent) | Feature 012's own implementation start | Both answers fit the already-built architecture (`docs/architecture/wishlist-flow.md`) without a redesign |
| Final COD business rules beyond what's specified (e.g., an order-value threshold requiring a confirmation call, per PRD Risk R-007) | Feature 010/017, pre-launch | The core checkout mechanics don't change based on this threshold; it's an operational policy layered on top |
| Whether a dedicated SEO plugin is added alongside the custom JSON-LD helper (`015`'s research.md) | Feature 015's implementation start | Either choice slots into the same architecture; no re-planning needed |
| Bedrock vs. conventional root layout (ADR 0013) | Jointly with hosting selection | Reversible, low-stakes, and genuinely coupled to which host is chosen |
| Specific 2FA plugin choice (Feature 016) | Feature 016's implementation start | Any well-maintained 2FA plugin satisfies FR-001 identically from the spec's point of view |

## Never Invented — Explicitly Left Open

Per instruction, no business value was invented anywhere in this audit. The following remain exactly as unresolved as before, with no placeholder treated as real:
- Shipping fee amounts (EGP per zone)
- Tax rate/status (pending accountant direction — Feature 002-T008a explicitly configures "disabled" rather than a guessed rate if direction isn't available by then)
- Drop 01 product names, sizes, prices, stock quantities
- Launch date
- Final legal policy wording
- Verified social-media handle spellings (brand identity doc flags 3 inconsistent spellings — still unresolved)

## Risk Register (carried forward, re-scored where this audit changed the picture)

| ID | Description | Likelihood | Impact | Score | Current Mitigation Status |
|---|---|---|---|---|---|
| R-001 | Brand assets incomplete delays build | High | High | 9 | Unchanged — still the top risk; nothing in this audit reduces it, since it's entirely owner-side |
| R-003 | Overselling on drop day | Medium | High | 6 | **Improved**: Feature 016's newly-added load test (T014a) now explicitly verifies no duplicate/corrupted orders under 10× load, directly testing this risk's failure mode for the first time |
| R-004 | Email deliverability | Medium | High | 6 | Unchanged — blocked on email provider selection |
| R-005 | Traffic spike overloads hosting | Medium | Medium | 4 | **Improved**: same load-test addition as R-003 now gives this risk a real test, not just a documented mitigation plan |
| R-012 | Single key-person dependency | Medium | Medium | 4 | Unchanged |

All other previously-scored risks (R-002, R-006–R-011) are unchanged by this audit and remain as recorded in `docs/planning/risks-and-blockers.md`.

## Decision Approval Status Snapshot

| Decision | Status |
|---|---|
| Acid Lime accent | ✅ APPROVED |
| Inline PDP checkout | ✅ APPROVED (mandatory) |
| BOGO / free shipping | ✅ APPROVED (mandatory, display-gated) |
| Hosting provider | ❌ OPEN |
| Email provider(s) | ❌ OPEN |
| Sage/PHP version (live verification) | ❌ OPEN (requires a live run, not an owner decision) |
| C-06 wishlist guest-gate | ❌ OPEN (non-blocking) |
| Launch date | ❌ OPEN |
| ACF composition model (ADR 0004) | ✅ RESOLVED (corrected this round) |
| Standard checkout integration (ADR 0005) | ✅ RESOLVED |
| Inline checkout mechanism (ADR 0006) | ✅ RESOLVED (corrected this round) |
| BOGO/promotion mechanism (ADR 0009) | ✅ RESOLVED (corrected this round) |
| Order status mapping (ADR 0016) | ✅ RESOLVED (prior round) |
