# Quickstart: WordPress, WooCommerce, and Sage Foundation

Local verification steps for this feature once implemented.

1. **Clone and install dependencies**:
   ```bash
   git clone <repo-url> && cd got-ecommerce
   composer install
   npm install
   ```
2. **Bring up a local WordPress environment** (Docker/Lando — exact tool per the dev lead's choice, not fixed by this feature) pointed at `wp-content/themes/got-sage` and `wp-content/plugins/got-commerce`.
3. **Activate**: in WP Admin → Plugins, activate `got-commerce`; in Appearance → Themes, activate `got-sage`.
4. **Verify WooCommerce**: WooCommerce → Settings → General confirms currency is EGP; WooCommerce → Settings → Advanced → Features confirms "High-Performance Order Storage" is enabled.
5. **Verify theme renders**: visit the homepage locally — should render WordPress/WooCommerce defaults without a PHP fatal error (no custom design yet — that's Feature 003+).
6. **Verify the build**: `npm run build` completes without error and produces `public/build/` assets.
7. **Verify CI**: open a throwaway pull request with a deliberate lint violation; confirm the GitHub Actions check fails; fix it; confirm it passes and that merging deploys to staging automatically (check the staging URL for the change).
8. **Verify the setup guide**: hand the README to someone who hasn't set this up before and confirm they reach step 5 above without asking a question (User Story 3's acceptance test).

**Done when**: steps 1–7 all succeed and step 8's dry run has been performed at least once.
