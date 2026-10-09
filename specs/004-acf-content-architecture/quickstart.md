# Quickstart: ACF Content Architecture

1. In WP Admin, create or edit a Page; confirm all 9 block types are available in the block inserter under a "GØT" category.
2. Add a Hero block, leave the headline empty, save, view the page live → confirm the Hero section does not render at all.
3. Fill in the headline, save, view live → confirm it now renders.
4. Add a second block (e.g., Manifesto) below the Hero, then drag it above the Hero in the editor, save → confirm the live page reflects the new order.
5. Add a Drop Intro block and link it to a real (or test) WooCommerce product → confirm the live page shows that product's current price/image, not a stale copy, by changing the product's price in WooCommerce and reloading.
6. Build the full homepage by composing multiple blocks in sequence → confirm it renders as an ordinary page composition, not a special hardcoded template.
7. Confirm no block renders any lorem-ipsum/placeholder text anywhere when left empty.

**Done when**: all 7 steps pass for every one of the 9 block types (step 2–3's "empty vs. filled" pair repeated for each block's own minimum-content rule from `data-model.md`).
