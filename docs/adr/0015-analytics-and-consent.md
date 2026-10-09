# ADR 0015 — Analytics and Consent Management

## Status
PROPOSED.

## Context

PRD P1-F007: GA4 (via GTM) events for `view_item`, `add_to_cart`, `begin_checkout`, `purchase` (once per order, including order ID/value/item list), gated behind a consent banner; no non-essential analytics request before consent; consent choice changeable from a footer link. Meta Pixel is explicitly "Optional, decision by brand" in PRD §9's integrations table. Constitution requires consent-aware analytics and no personal data in analytics payloads.

## Options

**Consent mechanism:**
1. A dedicated consent-management plugin.
2. A small custom consent banner + cookie, built into `got-commerce` (the banner is simple: accept/reject non-essential, essential-only cookies always allowed).

**Analytics transport:**
1. Google Tag Manager container gating GA4 (and optionally Meta Pixel) firing behind the consent cookie's state.
2. Direct GA4 gtag.js integration without GTM.

## Trade-offs

- A dedicated consent-management plugin (Option 1) covers more jurisdictions/edge cases out of the box but is another third-party dependency competing for the 15-plugin budget (PRD §9) for a requirement that, per PRD's own scope (GA4 + optional Meta Pixel, consent banner blocking non-essential tracking), is simple enough to build directly.
- GTM (transport Option 1) is explicitly named in PRD §9's integration table and gives the brand/marketing team the ability to add/adjust tags later without a code deploy — directly useful given PRD Persona 3 (low-to-medium tech-level operator) and P1-F007's requirement to add Meta Pixel "optionally" later.

## Decision

**A small custom consent banner in `got-commerce`** (Option 2 for consent mechanism — avoids spending a plugin slot on a requirement this contained), paired with **Google Tag Manager** (Option 1 for transport, matching PRD §9 exactly) gating all GA4 (and optional Meta Pixel) tags behind the stored consent state. The banner writes a simple first-party cookie (`got_consent: essential|all`) that GTM's trigger conditions read; rejecting analytics means the GTM container never fires the GA4 tag at all, not just that GA4 is told to anonymize — "no non-essential analytics request" must be literally true at the network level, not merely policy-compliant in spirit.

## Consequences

- Purchase event fires exactly once per order, server-confirmed (not optimistically on client-side form submit) — tied to the order-confirmation page render, consistent with "never show a success state before persistence is confirmed."
- No personal data (name, email, address) is ever included in any analytics payload — only order ID, EGP value, and item list, per PRD AC.
- Meta Pixel remains a GTM-container-level addition the brand owner can approve later without further engineering — already anticipated by using GTM instead of direct gtag.js.

## Approval status

PROPOSED — technical pattern does not require sign-off; whether Meta Pixel is actually added is explicitly "decision by brand" per PRD §9, tracked as an open item, not decided by this ADR.
