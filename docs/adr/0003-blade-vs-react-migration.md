# ADR 0003 — Blade vs. React Component Migration Strategy

## Status
PROPOSED (methodology decision; low controversy, but recorded since the original project brief explicitly asked "do not assume every React component requires a one-to-one JavaScript rewrite").

## Context

25 React components exist in `GØT Design System (2)/components/`, each documented with a `.d.ts` prop contract. Per ADR 0002, none of these ship as React in production. The question is *how* each gets reimplemented: a straight line-by-line Blade port, a generic rewrite, or something in between.

## Options

1. **Literal line-by-line translation of JSX to Blade**, preserving exact DOM structure and class names, replacing `useState`/event handlers with Alpine `x-data`/`x-on` where interactivity is needed, and nothing else.
2. **Full rewrite "in the spirit of" the component**, re-deriving markup/behavior from the `.d.ts` contract and `DESIGN.md`'s component rules, without being anchored to the exact JSX implementation.
3. **Hybrid, component-by-component**: purely presentational components (Badge, Price, Wordmark, Skeleton) get literal translation since there's nothing to "rewrite"; stateful components (AnnouncementBar, QuantityStepper, Header's mobile menu, CartDrawer, Accordion) get a deliberate Alpine.js re-implementation driven by the `.d.ts` contract's documented states/props, not a line-by-line port of React hooks into Alpine syntax (which produces awkward, hard-to-maintain Alpine code).

## Trade-offs

- Option 1 is fast for simple components but produces poor Alpine.js code for stateful ones (React's hook model and Alpine's reactive-attribute model are different enough that literal translation fights the grain of both).
- Option 2 risks silent visual/behavioral drift from the reference, which violates the constitution's "100% visual parity unless explicitly approved" rule.
- Option 3 gets the benefit of both: fidelity is anchored to the `.d.ts` contract + `DESIGN.md`'s component rules (the actual source of truth for *behavior*), while markup/class structure is still checked against the rendered `.jsx` reference for visual parity.

## Decision

**Hybrid (Option 3).** For every component in `docs/design/component-mapping.md`:
- Presentational, stateless components → Blade component (`<x-got.badge>` style), markup closely mirrors the JSX.
- Stateful/interactive components → Blade markup + a scoped Alpine.js `x-data` component, whose reactive contract is derived from the `.d.ts` props/callbacks (e.g. `QuantityStepper`'s `value/min/max/onChange` becomes an Alpine component with the same clamp logic, not a reimplementation of React's `useState`).
- Any component whose state needs to persist or sync across page loads (theme, wishlist, cart count) is backed by a small vanilla-JS module (mirroring `wishlist-store.js`'s already-correct pattern) rather than Alpine component-local state.

## Consequences

- Visual parity review (per `docs/design/visual-parity-matrix.md`) checks against the **rendered** reference screens, not the React source code — this ADR's hybrid approach makes that the correct review target regardless of which translation style was used underneath.
- Engineers are explicitly freed from needing to reproduce React internals (refs, effects, intersection observers) exactly — e.g. `Product.jsx`'s `IntersectionObserver`-driven sticky CTA can be reimplemented with a simpler scroll-based Alpine directive or native CSS `position: sticky` + `IntersectionObserver` in vanilla JS, as long as the *documented behavior* (CTA hidden while hero/inline-checkout visible) is preserved.

## Approval status

PROPOSED — low-risk methodology call, does not require owner sign-off, but documented so engineers don't default to a line-by-line React→Alpine transliteration that would produce fragile code.
