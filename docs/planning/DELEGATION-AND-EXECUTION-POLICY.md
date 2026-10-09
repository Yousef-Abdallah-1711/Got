# Delegation and Execution Policy

**Purpose**: How implementation work is safely split across the main orchestrator agent and delegate tools (Kimi Delegate, Codex Delegate) once implementation is approved. This is a policy document, not a trigger — nothing here authorizes starting Feature 002 or invoking any delegate now.

**Verification note on available tooling**: this session confirmed the Spec Kit skills (`speckit-specify`, `speckit-plan`, `speckit-tasks`, `speckit-analyze`) and the HTML-to-Sage converter skill are installed and real. `kimi-delegate` and `codex-delegate` are listed among this environment's available skills (confirmed by name in the skill listing), but **their actual availability/configuration was not invoked or tested in this planning-only session** — this policy assumes they exist per the user's own statement and the skill listing, without claiming to have run them.

## Task ownership rules

| Work type | Who does it | Why |
|---|---|---|
| Architecture coherence (theme/plugin boundary, `CheckoutService` contract, data model) | **Orchestrator only** | A delegate working from a single feature's `tasks.md` cannot see cross-feature contract implications; only the orchestrator holds the whole graph |
| Final code integration / merge decisions | **Orchestrator only** | Prevents two delegates' independently-correct changes from silently conflicting at merge time |
| Cross-feature contracts (`contracts/*.md` files) | **Orchestrator only**, delegates implement *against* them, never redefine them | A contract is only safe to delegate around if it's frozen before delegation starts |
| Acceptance-gate sign-off (marking a feature's phase DONE) | **Orchestrator only** | Per `MASTER-IMPLEMENTATION-ROADMAP.md`'s gate sequence — a delegate reports evidence, the orchestrator judges it against the gate |
| Resolving two delegates' disagreeing outputs on the same shared file | **Orchestrator only** | This is exactly the scenario file-ownership boundaries (below) exist to prevent in the first place; if it happens anyway, only the orchestrator has the context to arbitrate |
| Preventing duplicated implementation (e.g., a second order-creation path) | **Orchestrator only**, enforced by the file-ownership boundaries below plus a pre-merge check against `specs/010-.../contracts/checkout-api.md` | This is the single highest-consequence failure mode in the whole project (per the F2 remediation) |
| A single feature's own scoped implementation tasks, once its Foundational phase's contracts are frozen | **Delegate-safe** (Kimi or Codex) | Each feature's `tasks.md` already names concrete files and a bounded scope — exactly what a delegate needs to work independently |
| Read-only review of a delegate's diff against its feature's acceptance criteria | **Either** — a second delegate instance may review, but the orchestrator makes the final call | Matches this environment's own stated pattern: "the orchestrator does not write the implementation itself... it reviews the diff" |

## File-sequencing note found during the 2026-10-09 remediation (K2-OWNERSHIP finding b)

Feature 012's T009 (wishlist heart wiring) edits `product-card.blade.php` and the PDP template, both of which Feature 008 creates. This is not a parallel-ownership conflict (Feature 008 must simply finish those files first), but it means **Feature 012 cannot be delegated to a parallel task group alongside Feature 008's own PDP-template tasks** — treat this as a hard sequential dependency for delegation purposes specifically, even though the feature-level dependency graph only lists it as "needs products to wishlist," which understates the file-level ordering.

## Safe parallelization rules

1. **Never delegate two features that share a hard dependency to two different delegates at the same time** unless the upstream feature's relevant contract is already frozen and merged. Example: Feature 009 and Feature 010 must not run in parallel on two delegates — 010's `CheckoutService` (T006) must land and be contract-stable (per `MASTER-IMPLEMENTATION-ROADMAP.md` §3) before 009 is even handed to a delegate.
2. **File ownership is exclusive per delegation run.** No two delegates may hold the same file in-flight at once — this project's own global instruction already states "no two agents editing the same file," and that rule is adopted here without exception for Spec Kit features too.
3. **Up to 3 delegates in parallel, maximum**, each on a different feature or a different non-overlapping task group within one feature, matching this environment's own standing delegation-count rule.
4. **A feature's own Setup/Foundational phase is never delegated in parallel with that same feature's User Story phases** — Foundational must complete and be reviewed by the orchestrator first, since every User Story phase in every `tasks.md` in this project explicitly depends on it.
5. **Tasks marked `[P]` within one phase may go to the same delegate run sequentially or be split across delegates** — they're independent by construction (different files, per the Spec Kit task convention), so this is safe by design, not something that needs case-by-case orchestrator judgment.

## Expected delegate output

For every delegated task group, the delegate must return:
- The diff (not a description of the diff).
- Which specific task IDs from the feature's `tasks.md` it addresses.
- Confirmation that it did **not** touch any file outside its assigned ownership boundary.
- Test results for the tasks it implemented (not just "should pass" — actual run output).

## Review requirements (orchestrator-side, before accepting any delegate's work)

1. Diff review against the specific task IDs claimed.
2. Confirmation the diff does not touch a file owned by a concurrently-running delegate or by the orchestrator's own reserved architecture files (`contracts/*.md`, `docs/architecture/*`, `.specify/memory/constitution.md`).
3. Re-run the relevant test tasks live (per this project's `superpowers:verification-before-completion`-style discipline already in force for this session) — a delegate's self-reported "tests pass" is not accepted without the orchestrator re-running them.
4. Check against the feature's actual acceptance criteria in `spec.md`, not just "code looks reasonable."
5. Only then mark the task IDs complete.

## Integration gates (ties to `MASTER-IMPLEMENTATION-ROADMAP.md`'s 11-step sequence)

A delegated feature is not "done" until it passes the same gate every non-delegated feature passes: verify prerequisites → review spec/AC → implement scoped tasks → unit tests → integration tests → E2E tests where applicable → design fidelity/accessibility check against `docs/design/IMPLEMENTATION-VISUAL-CONTRACT.md` → security/regression check → evidence recorded → orchestrator marks complete → proceed to the next dependency-ready feature. Delegation changes *who writes the code*, never *what counts as done*.

## Conflict handling

If two delegates' outputs conflict (should not happen given the file-ownership rule, but if it does): the orchestrator reverts both to the last known-good state, re-examines the file-ownership assignment that failed to prevent the overlap, and re-delegates with a corrected boundary — it does not attempt to manually merge two independently-written implementations of the same logic, since that is exactly the "duplicated responsibility" risk this whole policy exists to avoid.

## Delegates must not independently modify shared architecture

No delegate may change: `contracts/*.md` files, `docs/architecture/*`, any ADR, `.specify/memory/constitution.md`, or any `plan.md`'s Constitution Check table. If a delegate's implementation reveals that one of these needs to change, it reports that finding back to the orchestrator — it does not make the change itself.
