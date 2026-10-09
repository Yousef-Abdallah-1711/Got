# Data Model: Product Detail, Variations, Inventory

This feature introduces exactly one small extension to WooCommerce's native model; every other entity (Product, Variation, Attribute, Stock) is WooCommerce-native and unmodified.

## `pa_color` term meta extension

| Field | Type | Notes |
|---|---|---|
| `hex` | string (CSS hex color) | Attached via `add_term_meta($term_id, 'hex', $value)` on each color attribute term; read by `ColorSelector` to render the swatch. Falls back to a neutral gray swatch if unset, rather than erroring. |

## Relationships (all WooCommerce-native, unmodified)

Product 1 → many Variations; Variation → one Size attribute value + one Color attribute value; Color attribute value → one optional `hex` term-meta value (this feature's extension).

## Validation rules

- `hex` must be a valid 3- or 6-digit hex color string when set; invalid values are rejected at the admin-UI level (Appearance's attribute-term edit screen gets a small validation script), not silently stored and broken on the frontend.
