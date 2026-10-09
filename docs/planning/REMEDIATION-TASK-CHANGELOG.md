# Remediation Task Changelog

Every file changed in this remediation round (2026-10-09, third audit round — the one that added real delegation via Codex), in the order it happened.

## 1. Delegation setup and execution

- Verified `.specify`/git state: this repository is **not** a git repository (confirmed via `git rev-parse --is-inside-work-tree`) — both delegation tools' git-repo prerequisite was bypassed via `--skip-git-repo-check` (Codex) / noted as `touchedFiles: null` (Kimi, N/A since it never ran).
- Verified `codex.exe` (not on PATH by default on this machine — located at `C:\Users\yosea\AppData\Local\OpenAI\Codex\bin\8aaf1547b825b104\codex.exe`, version `codex-cli 0.160.0`) and confirmed `gpt-6-luna` present in `~/.codex/models_cache.json` per the standing Codex-delegation instruction.
- Verified `kimi` CLI (version 2.1.1, on PATH).
- Dispatched Codex read-only (`--sandbox read-only`, `--model gpt-6-luna`, `--effort high`) with a brief covering 4 architecture questions (ACF composition, checkout integration, BOGO mechanism, Sage/Acorn version compatibility). **Completed successfully, zero files touched (sandbox-enforced).**
- Dispatched Kimi with a brief covering 5 cross-feature consistency questions. **Failed immediately**: `provider.auth_error: 403 — monthly usage limit reached`. Reported to the owner, who directed: proceed with Codex's findings only; the orchestrator performs Kimi's intended scope directly.

## 2. Architecture corrections (the 3 confirmed defects)

### C1-ARCH — ACF content-rendering model
- `docs/architecture/ACF-CONTENT-RENDERING-DECISION.md` (new)
- `docs/adr/0004-acf-block-strategy.md` (status PROPOSED → RESOLVED, Option 2 → Option 4, Decision text corrected)
- `specs/004-acf-content-architecture/{plan.md,research.md,tasks.md,data-model.md}` (Flexible Content field removed, T003 retired, T004/T020 reworded)
- `specs/006-homepage-editorial-sections/{plan.md,research.md,tasks.md}` (commerce sections converted from hardcoded Blade order to real ACF Blocks, T006–T010 reworded, the "..." leftover-reasoning artifact in the old T010 also cleaned up)

### C2-CHECKOUT — order-creation layering + idempotency ordering
- `docs/architecture/CHECKOUT-AND-ORDER-LIFECYCLE.md` (new, with 7 Mermaid sequence diagrams)
- `docs/adr/0005-woocommerce-checkout-integration.md` (status PROPOSED → RESOLVED, one Consequences line corrected)
- `docs/adr/0006-inline-checkout-architecture.md` (status BLOCKED → RESOLVED, Decision section rewritten)
- `specs/010-cart-standard-checkout/{plan.md,tasks.md,contracts/checkout-api.md}` (`CheckoutService` redefined as validation-only; `IdempotencyGuard` moved from T023 to T003a; T006/T021/T022/T024/T026 reworded; duplicate T023 retired)
- `specs/009-inline-pdp-cod-checkout/{plan.md,research.md,tasks.md,contracts/inline-checkout-api.md}` (controller now calls validation methods + its own `wc_create_order()`, not a shared order-creation method)

### C3-PROMO — BOGO stock-reduction mechanism
- `docs/architecture/PROMOTIONS-AND-PRICING.md` (new)
- `docs/adr/0009-promotion-implementation.md` (status BLOCKED → RESOLVED, Option 2/Decision corrected)
- `specs/014-shipping-promotions-bogo/{research.md,data-model.md,plan.md,tasks.md}` (`CartFeeHook.php` → `BogoLineItemHook.php`, T004/T017 reworded, T013's significance annotated)

## 3. New consolidated reference

- `docs/architecture/WOOCOMMERCE-INTEGRATION-STRATEGY.md` (new) — one table, every commerce feature, mechanism/owner/data-source/extension-point/compatibility/testing columns.

## 4. Cross-feature audit (performed directly, in place of Kimi)

- 6 explicitly-named ownership pairs checked (003/010 drawer, 008/012 wishlist heart, 009/010 checkout, 011/013 order authorization, 013/018 status hooks, 018/016 hardening inclusion) — 5 clean, 1 minor file-sequencing clarification.
- Dependency graph re-traced by hand against every feature's own stated dependencies (not the roadmap's own prior claims) — confirmed still acyclic, no new artificial edges introduced by this round's corrections.
- 5 traceability-matrix rows spot-checked against actual task-ID content — all 5 verified accurate.
- Task-quality re-scan of every task touched this round — no vague/unverifiable phrasing introduced.

## 5. Register and policy documents

- `docs/planning/PRE-IMPLEMENTATION-ARCHITECTURE-REMEDIATION.md` (new) — the master findings register, 14 rows.
- `docs/planning/DELEGATION-AND-EXECUTION-POLICY.md` (updated — added the K2-OWNERSHIP(b) file-sequencing note).
- This changelog.

## 6. What was deliberately NOT changed

- No approved business/scope decision was reopened.
- Features 002, 003 (beyond the ACF-adjacent note), 005, 007, 008 (beyond the color-swatch note already present), 011, 012, 013 (beyond ADR 0016 cross-references, already resolved last round), 015, 016, 017, 018 were **not** found to have any CONFIRMED defect this round and were left exactly as they stood, per the explicit instruction not to rewrite what isn't broken.
- `stock/`, `GØT Design System (2)/`, and every prior round's already-resolved findings (C1 Product Reviews, G1 cart drawer, D1 performance criteria, D2 superseded briefs, E1 Out-for-Delivery status, F2 original wording issue) were re-verified intact, not re-litigated.
- No application code was written. No git commit, push, or deployment occurred (the repository still has no `.git` directory — nothing was committed by either delegation tool, consistent with their own "orchestrator commits, never the implementer" design, and the orchestrator did not commit anything either since there is no implementation to commit).
