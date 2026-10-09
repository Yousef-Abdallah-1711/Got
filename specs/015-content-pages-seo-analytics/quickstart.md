# Quickstart: Content Pages, SEO, and Consent-Gated Analytics

1. Open the footer from any page → confirm links to About, Contact, FAQ, Shipping Policy, Returns & Exchanges, Privacy Policy, Terms and Conditions, and Cookie Policy all resolve to real published pages.
2. Open checkout → confirm the terms/privacy reference is linked and reachable without losing cart contents.
3. Load the site fresh (no consent cookie) with network inspection open → browse several pages → confirm zero GTM/analytics requests fire.
4. Reject consent via the banner → repeat the browse → confirm still zero requests.
5. Accept consent → view a product, add to cart, begin checkout, complete a purchase → confirm `view_item`, `add_to_cart`, `begin_checkout`, and `purchase` each fire, with the purchase event containing order ID/value/items but no personal data.
6. Refresh the confirmation page after a purchase → confirm the purchase event does NOT fire a second time.
7. Use the footer's consent-settings link → confirm the choice can be changed at any time.
8. Run a schema validator against the About/Product/Homepage pages → confirm no duplicate or conflicting schema output.
9. Check the sitemap and robots.txt → confirm they're present and correctly structured.

**Done when**: all 9 steps pass.
