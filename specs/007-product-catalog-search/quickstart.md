# Quickstart: Product Catalog, Categories, Filters, Search

1. Open `/shop/` → confirm 12 products per page desktop / 8 mobile, newest-first.
2. Apply a size filter → confirm the grid updates within ~300ms to only in-stock-in-that-size products.
3. Sort by "Price: low to high" → confirm ordering by lowest variation price.
4. Scroll to the bottom, click "Load more" → confirm the next page appends with no full reload.
5. Apply a filter, then press the browser back button → confirm the prior (or restored) state matches.
6. Open a category with zero published products → confirm the "no products in this collection yet" message and a link to the full shop.
7. Apply a filter combination that matches nothing → confirm the "no products match these filters" message and a working "clear all filters" action.
8. Search for a known product's exact name → confirm it appears within 1 second; search for its SKU and its category name → confirm both also match.
9. Search for gibberish → confirm a clear "no results for [term]" message, not an error.
10. Submit an empty search → confirm no request is sent and no results page appears.

**Done when**: all 10 steps pass.
