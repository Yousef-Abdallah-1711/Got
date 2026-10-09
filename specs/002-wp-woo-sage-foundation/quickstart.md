# Quickstart: WordPress, WooCommerce, and Sage Foundation

Use this checklist to verify the local foundation. The repository's [README](../../README.md) is the setup guide and contains the exact dependency, Local, and Windows link commands.

## Local verification

1. Clone the repository and install dependencies using the README's project-specific Composer and npm commands. There are no root-level `composer.json` or `package.json` files.
2. Create/start a local WordPress site in Local with PHP 8.3 or newer. Link `wp-content/themes/got-sage` and `wp-content/plugins/got-commerce` into that site's `wp-content` directory as described in the README.
3. In WordPress Admin, install WooCommerce and activate WooCommerce, GOT Commerce, and GOT Sage.
4. Confirm WooCommerce uses Egypt and EGP, tax calculation is explicitly disabled pending the accountant's direction, and HPOS is enabled under **WooCommerce → Settings → Advanced → Features**.
5. Visit the local homepage and confirm it renders without a PHP fatal error.
6. Run the PHP tests, PHPStan, PHPCS, Stylelint, ESLint, and Vite build using the README's commands.

## CI and deployment verification

7. Open a throwaway pull request containing a deliberate PHPCS violation. Confirm the GitHub Actions check fails, remove the violation, and confirm the checks pass. **Pending** until `.github/workflows/ci.yml` is pushed with a GitHub credential authorized to write workflow files and an actual Actions run is available.
8. Confirm merge to `main` deploys the change to staging, and confirm production requires a manual approval gate. **Blocked** until a staging/production host and deployment configuration are selected and authorized (T001, T002, T011).
9. Have a second developer, or perform a fresh-eyes README-only setup review after a break, and record whether they reach the working local site without questions (T020).

## Completion status

The local verification steps can be completed independently. The quickstart is fully validated only after the CI/PR check, staging deployment, production approval-gate, and setup-guide acceptance checks above have real evidence. A local substitute does not count as staging or production evidence.
