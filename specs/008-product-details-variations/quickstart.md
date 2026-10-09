# Quickstart: Product Detail, Variations, Inventory

1. Open a test product with 2 colors × 3 sizes, varying stock levels → confirm gallery, name, price, variation selectors all render.
2. Select a color with its own images → confirm the gallery updates to that color's images.
3. Select a size → confirm price/stock update within ~200ms, no full reload.
4. Set one size's stock to 0 in WooCommerce → reload → confirm that size is struck through and unselectable.
5. Try "Add to cart" with no size selected → confirm the inline "select a size" message and no cart addition.
6. Select a valid size, set quantity above current stock → confirm it's capped with an "only N left" message.
7. Add a valid selection to cart → confirm the cart count updates and the exact variation/quantity is confirmed visually.
8. Simulate a network failure during add-to-cart (devtools offline mode) → confirm a clear retry message and that the selection is preserved.
9. Validate the page's JSON-LD against a schema validator → confirm it passes and matches the currently displayed price/availability.
10. Tab through color/size selection and Add to Cart using only the keyboard → confirm every control is reachable and its state is announced correctly.

**Done when**: all 10 steps pass.
