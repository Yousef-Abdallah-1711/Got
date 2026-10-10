# Risks and Blockers (Consolidated)

De-duplicated across `GOT-Store-PRD.md` §14 Risk Register, `.html-to-sage/RISKS.md`/`BLOCKERS.md` scaffolding, and this planning session's own audit findings. Each item states what decision or input is needed from whom — these are owner-facing, not just an engineering list.

## Tier 1 — blocks the roadmap from even starting cleanly

| Item | What's needed | From whom | Source |
|---|---|---|---|
| **C-01 — Acid Lime vs. silver accent** | **RESOLVED 2026-10-09:** Acid Lime approved for the primary CTA/focus/announcement-bar treatment; retain silver as an opt-in source override | Resolved by brand owner | `docs/audit/source-conflicts.md` |
| **C-02 — Inline PDP checkout scope** | Confirm whether feature 009 ships in v1 | Brand/product owner | `docs/audit/source-conflicts.md`, ADR 0006 |
| **C-03 — BOGO scope** | Confirm whether BOGO ships in v1, v1.1, or stays dormant | Brand/product owner | `docs/audit/source-conflicts.md`, ADR 0009 |
| **Sage version verification (ADR 0001)** | Run the version-confirmation checklist at Phase 1 kickoff | Dev lead | `docs/architecture/tech-stack.md` §6 |
| **Hosting provider selection (ADR 0012)** | Choose a managed host meeting the stated criteria | Dev lead + brand owner (budget) | PRD Dependencies table |
| **Email provider selection (ADR 0011)** | Choose marketing + transactional vendors | Brand owner (budget/preference) | PRD §9 |

## Tier 2 — blocks specific features, not the whole roadmap (PRD §14, VERIFIED, highest-scored first)

| PRD ID | Description | Score | Mitigation (as the PRD states it) |
|---|---|---|---|
| R-001 | Brand assets incomplete (logo, product photos, prices) delay Phase 2 | 9 (High×High) | Request full asset list Week 1; agree a fallback date; placeholder content flagged non-public |
| R-002 | Launch date set before products/legal text ready | 6 | Store-mode switch blocked until product guard passes; launch date confirmed only after Phase 4 review |
| R-003 | Overselling on drop day | 6 | Stock reduced at order creation; manual review above threshold; documented queue plan |
| R-004 | Email deliverability (confirmation emails land in spam) | 6 | SPF/DKIM/DMARC configured + tested in Phase 1 (feeds ADR 0011) |
| R-005 | Traffic spike on drop announcement overloads hosting | 4 | Full-page caching, CDN, load test to 10× baseline (feeds ADR 0012) |
| R-006 | Plugin conflicts with Sage 10/WooCommerce updates | 4 | Cap at 15 plugins, pin versions, staging test every update |
| R-007 | COD fraud / non-delivery cost | 4 | Phone verification at checkout; confirmation call above a threshold; clear return policy |
| R-008 | Data-protection non-compliance | 3 | Double opt-in, consent logging, legal review before launch |
| R-009 | Dark/light palette fails contrast on some product photography | 2 | Contrast audit Phase 1; photography brief for both modes |
| R-010 | Domain/DNS/IDN issues | 3 | Verify ownership Week 1; Punycode/redirect test on staging |
| R-011 | Social handles inconsistent, broken QR links | 4 | Verify all handles/QR destinations Phase 4 |
| R-012 | Single key-person dependency (WordPress/Sage knowledge) | 4 | Document setup in repo README; knowledge-transfer session before launch |

## Tier 3 — this planning session's own additional findings

| Item | Risk | Mitigation path |
|---|---|---|
| C-05 — `--got-ash` source token | **RESOLVED 2026-10-10:** `colors.css` defines `--got-ash: #A3A3A3`; preserve it when porting (see `docs/audit/source-conflicts.md`) |
| C-06 — wishlist guest-gate ambiguity | Minor UX inconsistency risk if unresolved before 012 ships | Brand/product owner decision, low urgency (P1 feature) |
| C-07 — EarlyAccessForm missing WhatsApp/first-name fields | Minor — PRD's optional fields not yet in the component contract | No decision needed, just an implementation task in feature 005 |
| C-08 — social handle spelling inconsistencies | Could publish a broken link on packaging QR codes (physical, hard to fix post-print) | Brand owner must verify before Phase 4, already a PRD Phase 4 task |
| No dedicated roadmap slot for P1-F005 (Product Reviews) | Minor planning gap | Assign to feature 015 or add a future feature 018 before Phase 3 planning begins in earnest |

## How this feeds the rest of planning

Tier 1 items are reproduced as the "Unresolved decisions and blockers" section of this project's final report. Tier 2/3 items are reproduced in each relevant feature brief's own Risk Register (`docs/planning/feature-briefs/*.md`) rather than only living here, so they're visible at the point of actual implementation planning, not just in one central list that's easy to forget.
