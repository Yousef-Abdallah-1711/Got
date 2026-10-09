# ADR 0012 — Hosting and Caching

## Status
BLOCKED — hosting provider is `[TBD]` in the PRD; the caching *pattern* is decided regardless of provider.

## Context

PRD §9 requires "Managed WordPress hosting with PHP 8.2+, MySQL 8 or MariaDB 10.6+, HTTPS, daily backups, and staging environment," plus Cloudflare for DNS/CDN/WAF. PRD §8 Scalability requires full-page caching for public pages, object caching (Redis-compatible) for WooCommerce queries, and explicit drop-day traffic-spike handling (up to 10× baseline).

## Options

**Hosting:**
1. A managed WooCommerce-specialist host (e.g. a host that ships WooCommerce-aware object caching and a staging/backup workflow out of the box).
2. A generic managed WordPress host + self-configured object cache (Redis plugin) and backup solution.
3. Self-managed VPS — rejected: contradicts "managed... with... daily backups" requirement and adds operational burden the single-developer risk profile (R-012) can't absorb.

**Caching:**
1. Full-page cache (host-level or a caching plugin) for all public, non-personalized pages + Cloudflare CDN in front, with WooCommerce fragments (mini-cart count) loaded via AJAX/Store API so cached HTML stays valid for every visitor.
2. No caching, relying on PHP/MySQL performance alone — rejected: cannot plausibly meet the PRD's LCP <2.5s / TTFB <200ms targets under a 10× drop-day traffic spike on a modest managed host.

## Trade-offs

- A WooCommerce-specialist host (Option 1) typically pre-solves the object-cache-exclusion-for-cart/checkout problem (constitution/PRD: never cache personalized cart/checkout/account HTML) and reduces Phase 1 configuration risk; con: potentially higher cost than a generic host.
- A generic host + manual Redis/caching-plugin setup (Option 2) is cheaper but pushes correct cache-exclusion configuration onto the dev team, with real risk of a misconfiguration serving stale prices/stock (a direct constitution violation if it happens).

## Decision

**Hosting vendor selection is deferred to the owner** (genuinely `[TBD]`, no PRD lean), but the **non-negotiable selection criteria** are fixed by this ADR: PHP 8.2+ support, native or well-documented object-cache support, a real staging environment, daily automated backups with tested restore, and either built-in WooCommerce-aware full-page caching or clearly documented manual cache-exclusion rules for cart/checkout/account routes. **Caching pattern**: full-page cache + CDN for public pages, object cache for WooCommerce queries, AJAX/Store-API-loaded cart fragments on cached pages, zero public caching of personalized routes — matching `docs/architecture/overview.md` §3's request-flow diagram exactly.

## Consequences

- Load testing to 10× baseline traffic (PRD Phase 4 task) must be run against whichever host is chosen before launch, not assumed from generic benchmarks.
- Whoever evaluates hosting candidates should explicitly check "does this host's caching layer already exclude WooCommerce cart/checkout/account cookies," since a host that doesn't will require more manual configuration work.

## Approval status

**REQUIRES APPROVAL** (specific hosting vendor) — caching pattern is PROPOSED and architecturally fixed regardless of vendor chosen.
