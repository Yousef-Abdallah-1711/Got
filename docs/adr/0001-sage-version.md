# ADR 0001 — Sage Version

## Status
PROPOSED (default decision made; REQUIRES APPROVAL to formally ratify, and REQUIRES VERIFICATION against live Roots release notes before Phase 1 tooling install).

## Context

`GOT-Store-PRD.md` §1 and §9 and `PRODUCT.md` §2 both explicitly and repeatedly specify **"Roots Sage 10 theme on Acorn"** as a fixed implementation decision. The broader project brief that initiated this planning session separately raised a concern that "newer architecture suggestions may refer to Sage 11" and asked for an explicit ADR rather than a silent upgrade. No Sage 11 is referenced anywhere in the project's own source documents — the concern is externally sourced caution, not a documented requirement.

This planning session has no live internet access to check the current Roots Sage release line, changelog, or compatibility matrix against WordPress/WooCommerce/ACF/PHP versions at the moment of writing. Any specific version-number claim below is a **starting hypothesis**, not a verified fact.

## Options

1. **Sage 10 (documented baseline)** — matches every project document, matches the `.html-to-sage/` scaffolding's assumed `app/`/`framework/` convention, zero re-planning cost.
2. **Sage 11 (if it exists and is current at build time)** — potentially newer tooling/Acorn/Vite defaults, but completely unverified against this project's PHP/WooCommerce/ACF requirements, and contradicts every explicit project document.
3. **A non-Sage Blade-capable alternative** (e.g. raw Acorn without Sage's starter theme, or a different Laravel-for-WordPress bridge) — rejected outright; not requested anywhere and would re-open the "Blade vs. React" and theme-structure questions for no documented benefit.

## Trade-offs

- Defaulting to Sage 10 risks building on a line that may be superseded by the time implementation starts (weeks/months after this planning session).
- Switching to a newer Sage line without verification risks breaking the documented `resources/{css,js,views}` + `app/Providers` structure assumed throughout the PRD, DESIGN.md, and the `.html-to-sage/` scaffolding — all of which quote Sage-10-shaped paths.

## Decision

**Default to Sage 10**, per every project document, with a **mandatory version-confirmation checklist** (documented in `docs/architecture/tech-stack.md` §6) to be run by the dev lead at the start of Phase 1, before any tooling is installed: scaffold a throwaway Sage project with `composer create-project roots/sage`, record the actual Sage/Acorn/Vite/Tailwind versions it produces, and update this ADR with the VERIFIED outcome. **Do not silently upgrade to a newer Sage line** even if one is offered as the installer default — if the installer's current default is no longer "Sage 10," stop and bring the discrepancy back to the owner as a REQUIRES APPROVAL decision, per the original project brief's explicit instruction not to silently change frameworks.

## Consequences

- Planning documents written now (file structure, theme-plugin boundary, ACF block registration pattern) are safe to proceed on, since they're written at the level of Sage's stable conventions (Blade views, Acorn service container, Vite build), which are unlikely to change radically between minor Sage lines.
- A version mismatch discovered at Phase 1 kickoff costs, at most, updating path assumptions in a handful of planning docs — not a re-architecture.

## Approval status

REQUIRES APPROVAL (to ratify "Sage 10 unless the Phase 1 checklist says otherwise" as the official project policy) + REQUIRES VERIFICATION (the actual version-confirmation checklist run, which cannot happen in this offline planning session).
