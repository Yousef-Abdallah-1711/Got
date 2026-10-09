# Quickstart: Design Tokens and Global UI

1. Build the theme (`npm run build`) and load any page locally.
2. **No-flash check**: with dark OS preference and no stored choice, hard-reload on a throttled (3G) network profile — confirm no flash of light mode before dark renders.
3. **Toggle check**: click the theme toggle — confirm instant switch, no page reload, and that the toggle's accessible name updates (inspect via screen reader or the accessibility tree in devtools).
4. **Persistence check**: reload the page and restart the browser — confirm the chosen theme persists.
5. **Blocked-storage check**: disable site data/cookies for the domain (or use a private window with storage blocked) — confirm the page still renders a theme correctly for that view, with no JS error in the console.
6. **Header-variant check**: visit an ordinary page (full header), the checkout page (distraction-free header), and the Coming-Soon homepage (minimal header) — confirm each shows the correct variant.
7. **Announcement bar check**: with 2+ messages configured, confirm auto-rotation every ~4.5s, pause on hover/focus/Pause button, and zero rotation with `prefers-reduced-motion` enabled (OS-level setting or devtools emulation).
8. **Contrast check**: run an automated axe-core scan against both themes — zero contrast failures.
9. **Keyboard check**: Tab through the entire header (logo, nav, search, account, cart, wishlist, theme toggle) and the footer — confirm every control is reachable and operable with Enter/Space, with a visible focus ring in both themes.

**Done when**: all 9 checks pass in both themes.
