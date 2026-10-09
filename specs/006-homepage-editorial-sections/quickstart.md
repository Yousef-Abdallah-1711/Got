# Quickstart: Homepage and Editorial Sections

1. With Store Mode active and at least 3 published products in at least 2 categories, load the homepage → confirm Featured Drop, New Arrivals, and Shop by Category all show real current data.
2. Change a product's price in WooCommerce admin, reload the homepage → confirm the new price appears (no stale cached price).
3. Reduce published categories to 1 → confirm Shop by Category disappears entirely.
4. With no Craftsmanship copy and no completed sales, load the homepage → confirm both sections are absent and the page still looks complete.
5. On a 390px mobile viewport, load the homepage → confirm the brand line and a shop CTA are both visible without scrolling.
6. Run a Lighthouse mobile/4G-simulated audit → confirm LCP < 2.5s and total transfer < 1MB (excluding any video).
7. Confirm the hero image has no `loading="lazy"` attribute, while every section below the fold does.

**Done when**: all 7 steps pass.
