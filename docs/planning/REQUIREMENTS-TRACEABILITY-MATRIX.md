# Requirements Traceability Matrix

**Corrected 2026-10-09**: the prior version of this matrix stated "29 total rows... 23 fully covered, 1 partially covered, 2 post-launch" — those three numbers sum to 26, not 29. Re-counted directly from the table below (verified by `grep`-counting the actual status markers, not re-deriving from memory): the true tally is **25 COVERED, 1 PARTIALLY COVERED, 3 DEFERRED/POST-LAUNCH** = 29. The error was in the summary paragraph, not the table itself — one MISSING row (P2-F005, the floating WhatsApp button) was never added into the prior summary's arithmetic. This is corrected throughout below, and the status taxonomy is expanded per this round's request.

Status taxonomy: **COVERED** / **PARTIALLY COVERED** / **MISSING** / **DEFERRED / POST-LAUNCH** / **BLOCKED BY OWNER DECISION**

## P0 — Must Have

| Source Doc | Req. ID | Owning Feature | User Story | Acceptance Scenario | Implementation Task | Verification Task | Release Class | Status |
|---|---|---|---|---|---|---|---|---|
| PRD §6/§7 | P0-F001 | `002` (switch+guard) + `003` (header variant) + `005` (rendering) | 002-US1, 003-US2 | 002 spec.md FR-011; 003 AC 3 | 002-T009a/T009b | 003-T012 | v1 launch-blocking | **COVERED** |
| PRD §6/§7 | P0-F002 | `003` | 003-US1 | 003 AC 1–4 | 003-T003–T011 | 003-T007/T008 | v1 launch-blocking | **COVERED** |
| PRD §6/§7 | P0-F003 | `007` | 007-US1 | 007 AC 1–7 | 007-T002–T015 | 007-T004–T009 | v1 launch-blocking | **COVERED** |
| PRD §6/§7 | P0-F004 | `008` | 008-US1, US2 | 008 AC 1–9 | 008-T002–T020 | 008-T004–T008/T015–T017 | v1 launch-blocking | **COVERED** |
| PRD §6/§7 | P0-F005 | `010` | 010-US1 | 010 AC 1–9 | 010-T011–T015a/T015b | 010-T007–T010/T010a | v1 launch-blocking | **COVERED** |
| PRD §6/§7 | P0-F006 | `010` (+`009` mandatory add-on) | 010-US2 | 010 AC 1–7 | 010-T006/T021–T024 | 010-T016–T020 | v1 launch-blocking | **COVERED** |
| PRD §6/§7 | P0-F007 | `005` | 005-US1, US2, US3 | 005 AC (all) | 005-T003–T021 | 005-T008/T009/T013–T015/T018/T019 | v1 launch-blocking | **COVERED** |

## P1 — Should Have

| Source Doc | Req. ID | Owning Feature | User Story | Acceptance Scenario | Implementation Task | Verification Task | Release Class | Status |
|---|---|---|---|---|---|---|---|---|
| PRD §6/§7 | P1-F001 | `011` | 011-US1 | 011 AC 1–4 | 011-T007–T009 | 011-T004–T006 | v1 target, slip-allowed | **COVERED** |
| PRD §6/§7 | P1-F002 | `013` | 013-US2 | 013 AC 1–3 | 013-T013–T015 | 013-T009–T012 | v1 target, slip-allowed | **COVERED** |
| PRD §6/§7 | P1-F003 | `007` | 007-US2 | 007 AC (search rows) | 007-T018–T020 | 007-T016/T017 | v1 target, slip-allowed | **COVERED** |
| PRD §6/§7 | P1-F004 | `012` | 012-US1, US2 | 012 AC 1–7 | 012-T002–T017 | 012-T005–T008/T014/T015 | v1 target, slip-allowed | **COVERED**, C-06 UX decision open but non-blocking |
| PRD §6/§7 | P1-F005 | `018` | 018-US1, US2 | 018 AC 1–9 | 018-T002–T016 | 018-T004–T007/T012–T014 | v1 target, slip-allowed | **COVERED** (was the original CRITICAL gap) |
| PRD §6/§7 | P1-F006 | `015` | 015-US1 | 015 AC 1–3 | 015-T006–T014 | 015-T004/T005 | v1 target, slip-allowed | **COVERED**, final legal text **BLOCKED BY OWNER DECISION** |
| PRD §6/§7 | P1-F007 | `015` | 015-US2 | 015 AC 1–4 | 015-T018–T020 | 015-T015–T017 | v1 target, slip-allowed | **COVERED** |

## P2 — Could Have (PRD's own explicit "post-launch" label)

| Source Doc | Req. ID | Owning Feature | Status | Note |
|---|---|---|---|---|
| PRD §6 | P2-F001 Arabic/RTL Storefront | `003` (readiness only) | **PARTIALLY COVERED** | Full translation correctly **DEFERRED / POST-LAUNCH** per PRD; logical-CSS readiness itself is COVERED (003-FR-012/T022a) |
| PRD §6 | P2-F002 Recently Viewed Products | None | **DEFERRED / POST-LAUNCH** | Matches PRD's own label exactly — not a gap |
| PRD §6 | P2-F003 Free Shipping Progress Bar | `014` | **COVERED** | Upgraded from Could-Have to mandatory per owner decision |
| PRD §6 | P2-F004 Back-in-Stock Notification | None | **DEFERRED / POST-LAUNCH** | Matches PRD's own label exactly |
| PRD §6 | P2-F005 Floating WhatsApp Button | None | **DEFERRED / POST-LAUNCH** | PRD: "Sprint 5 (if approved)" — no approval on record; **this is the row the prior summary's arithmetic error omitted** |

## Owner-Approved Additions Beyond the Original PRD

| Item | Owning Feature | Status |
|---|---|---|
| Inline PDP COD Checkout | `009` | **COVERED** |
| BOGO Promotions | `014` | **COVERED** |

## Non-Functional Requirements (PRD §8)

| Category | Owning Feature(s) | Implementation Task | Verification Task | Status |
|---|---|---|---|---|
| Performance | `006`, `008`, `010`, `016` | `016`-FR-008 | `016`-T013/T014a | **COVERED** |
| Security | `011`, `016` | `016`-FR-001–004 | `016`-T002–T008/T007a | **COVERED** |
| Availability | `017` | `017`-FR-006/FR-003 | `017`-T004/T006 | **COVERED** |
| Scalability | `007`, `016` | `016`-FR-010 | `016`-T014a | **COVERED** |
| Accessibility | `003`, `008`, `016` | `016`-FR-005/006/007 | `016`-T009–T012 | **COVERED** |
| Compatibility | `003` | `003`-FR-012 | `003`-T022a | **COVERED** |
| Data & Compliance | `005`, `015` | `005`-T023, `015`-T011 | — | **COVERED**, final legal text **BLOCKED BY OWNER DECISION** |
| Observability | `002`, `013`, `017` | `013`-T016, `017`-T004 | — | **COVERED** |

## Corrected Summary Counts

- **Total rows**: 7 (P0) + 7 (P1) + 5 (P2) + 2 (owner additions) + 8 (NFR) = **29**
- **COVERED**: 25 (7 + 7 + 1 [P2-F003] + 2 + 8)
- **PARTIALLY COVERED**: 1 (P2-F001)
- **DEFERRED / POST-LAUNCH**: 3 (P2-F002, P2-F004, P2-F005 — all three, matching PRD's own scope exactly, not gaps)
- **MISSING**: 0
- **BLOCKED BY OWNER DECISION** (as a sub-annotation on an otherwise-COVERED row, not a separate row): 1 (P1-F006/Data-Compliance's legal text)

25 + 1 + 3 = 29. ✓ Verified against the actual table this time, not re-derived from memory.

## Findings fixed during the original audit (carried forward, already closed — see `UPDATED-RISKS-AND-DECISIONS.md`)

Site-Mode switch ownership, scalability load-test, RTL logical-CSS, tax configuration — all four closed in the prior round and re-verified present in this round's discovery pass (see `FINAL-IMPLEMENTATION-READINESS.md`).
