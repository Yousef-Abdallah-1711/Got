# WordPress / Sage / Plugin Structure

Status tags: VERIFIED / PROPOSED / BLOCKED / REQUIRES APPROVAL. This is the file/folder architecture for the theme (`got-sage`) and companion plugin (`got-commerce`), adapted from `GOT-Store-PRD.md` §9's documented structure and the constitution's theme/plugin boundary principle. **PROPOSED** throughout — no code has been written yet; this is the target shape.

## Monorepo layout (conceptual — not yet created)

```text
web/
  app/                              # WordPress app directory (Bedrock-style, if used — see docs/adr/0013)
  wp/                               # WordPress core (not modified — constitution principle 10)
  wp-content/
    themes/
      got-sage/                    # Presentation only
        app/
          Providers/ThemeServiceProvider.php
          Support/SiteMode.php           # Coming Soon / Store switch (reads from plugin-owned option)
        resources/
          css/tokens.css                # Dark/light design tokens as CSS custom properties
          css/app.css                   # Tailwind entry + component primitives
          js/app.js                     # Alpine bootstrap, theme-toggle no-flash script, cart-drawer island
          views/
            layouts/app.blade.php
            partials/{header,footer,theme-toggle,announcement-bar}.blade.php
            components/                 # Blade ports of the 25 design-system components
            sections/                   # Homepage/editorial sections (hero, manifesto, featured-drop, ...)
            woocommerce/                 # Template overrides: archive-product, single-product, cart, checkout, myaccount
          images/
        public/build/                   # Vite output
        style.css                       # WordPress theme header (required for clone-readiness)
        functions.php                   # Composer autoload + Acorn bootstrap
    plugins/
      got-commerce/                 # Business logic + persistence
        src/
          SiteMode/                 # Coming Soon / Store switch, activity log, product-count guard
          EarlyAccess/               # Subscriber capture, double opt-in, email-tool sync, retry queue
          Checkout/                  # Inline-PDP + standard checkout shared service layer (pending ADR 0006)
          Wishlist/                  # Guest/auth wishlist persistence + merge
          Promotions/                # BOGO/free-shipping logic (pending ADR 0009 — may remain unbuilt in v1)
          OrderTracking/             # Non-enumerating order lookup by number + billing email
          Settings/                  # Admin settings pages (Site Mode, Early Access config)
          Integrations/              # Email marketing connector, GA4/GTM, SMS/WhatsApp link config
          Security/                  # Rate limiting, honeypot, nonce helpers shared across forms
        tests/
          Unit/
          Integration/
```

## Why Acorn/Sage over a Bedrock-style `web/app` + `web/wp` split

PRD §9 documents Sage 10 + Acorn but does not confirm a Bedrock root structure. **PROPOSED**: a conventional single-root WordPress install (`wp-content/themes/got-sage`, `wp-content/plugins/got-commerce`) is sufficient and lower-risk for a single-brand store with one developer of record (PRD Persona 3, Risk R-012). Bedrock's `web/app`/`web/wp` split is optional tooling, not required by Sage/Acorn itself — flagged **REQUIRES APPROVAL** if the dev lead prefers Bedrock for environment-variable-based config management.

## `got-sage` theme responsibilities (constitution-bound)

- All Blade views, partials, and WooCommerce template overrides.
- All CSS/Tailwind/design tokens, both themes (dark/light).
- `SiteMode.php` is a thin *reader* of the mode flag (for template branching) — the mode **value itself**, its validation guard (≥1 published in-stock product), and its activity-log write live in the `got-commerce` plugin per the theme/plugin boundary (`docs/architecture/theme-plugin-boundaries.md`).
- ACF Block registration + field groups for editorial content (hero, manifesto, featured-drop, packaging, brand-story, social, FAQ, newsletter) — never for WooCommerce product/order data.

## `got-commerce` plugin responsibilities (constitution-bound)

- Site Mode switch: capability check (`got_manage_site_mode`), product-count guard, cache purge, activity-log write.
- Early-access subscriber capture: validation, honeypot/rate-limit, consent-text/timestamp persistence, double-opt-in token issuance/verification, email-tool sync with retry queue.
- Checkout business-rule service layer: whatever `docs/adr/0006-inline-checkout-architecture.md` decides, shared by both the standard checkout and (if approved) the inline PDP checkout — **one implementation, two entry points**, never two parallel order-creation code paths (constitution Commerce Principle 5/6).
- Wishlist persistence (guest cookie/localStorage reconciliation + authenticated user-meta/custom-table storage, guest-to-account merge).
- Order tracking lookup (non-enumerating, rate-limited).
- Admin settings screens for everything above.
- All REST/Store-API-adjacent custom endpoints (early-access submit/confirm/unsubscribe, order tracking) with proper `permission_callback`s — never `__return_true` on anything that touches personal data.

## WordPress clone-readiness checklist (tracked here, verified at implementation time — not yet executed)

- [ ] `style.css` has a valid WordPress theme header.
- [ ] `functions.php` bootstraps Composer/Acorn.
- [ ] A working render path exists after activation (`index.php`/`header.php`/`footer.php`/`page.php` or verified Sage/Acorn Blade routing).
- [ ] `front-page.php` (if present at all) renders editor/block content, never a hardcoded homepage rebuild.
- [ ] Blog templates (`home.php`/`archive.php`/`single.php`) are included **only if** a blog/news/press area is in scope — currently **not** in `GOT-Store-PRD.md`'s scope, so these are deferred unless the owner adds a blog requirement.
- [ ] Header/footer/nav render by default from theme layout, not page-level ACF blocks.
- [ ] Required plugins and install/build commands documented in `README.md`.
- [ ] `ready-pages/` generated with one paste-ready Gutenberg/ACF markup file per WordPress page.

This checklist is reproduced in full in `.html-to-sage/BLOCKERS.md`'s companion scaffolding and must be satisfied before any "WordPress Clone Readiness Gate" sign-off per the `html-to-wordpress-converter` skill's rules.
