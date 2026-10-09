# GOT Ecommerce

WordPress and WooCommerce store project. The theme and companion plugin live in `wp-content/`.

## Prerequisites

- [Local by WP Engine](https://localwp.com/) for a local WordPress site.
- PHP 8.3 or newer and Composer 2 for the theme and plugin dependencies.
- Node.js `^20.19.0 || >=22.12.0` and npm for theme assets.
- Git.

The repository has separate Composer projects for the theme and plugin, and an npm project for the theme. Run commands from each project's directory as shown below; there is no root-level Composer or npm project.

## Install project dependencies

From the repository root, run:

```sh
composer --working-dir=wp-content/plugins/got-commerce install --no-interaction
composer --working-dir=wp-content/themes/got-sage install --no-interaction
npm --prefix wp-content/themes/got-sage ci
npm --prefix wp-content/themes/got-sage run build
```

On Windows PowerShell installations that block the `npm.ps1` shim, use `npm.cmd` in the same commands.

## Set up a local WordPress site

1. Create and start a site in Local. Choose PHP 8.3 or newer and the standard single-site WordPress environment. Use the WordPress admin login that Local displays for the site.
2. From the repository root, link the theme and plugin into that site's `app/public/wp-content/` directory. On Windows, open PowerShell, set the two paths, and create junctions:

   ```powershell
   $repoPath = (Get-Location).Path
   $sitePath = 'C:\path\to\Local Site'
   New-Item -ItemType Junction -Path "$sitePath\app\public\wp-content\themes\got-sage" -Target "$repoPath\wp-content\themes\got-sage"
   New-Item -ItemType Junction -Path "$sitePath\app\public\wp-content\plugins\got-commerce" -Target "$repoPath\wp-content\plugins\got-commerce"
   ```

   On macOS or Linux, open a terminal at the repository root, set the Local site path, and create symbolic links:

   ```sh
   repoPath="$(pwd)"
   sitePath="/path/to/Local Site"
   ln -s "$repoPath/wp-content/themes/got-sage" "$sitePath/app/public/wp-content/themes/got-sage"
   ln -s "$repoPath/wp-content/plugins/got-commerce" "$sitePath/app/public/wp-content/plugins/got-commerce"
   ```
3. In WordPress Admin, install WooCommerce, then activate WooCommerce, GOT Commerce, and GOT Sage. Install both Composer projects before activating the theme/plugin.
4. In WooCommerce settings, set the store country to Egypt and currency to EGP. Keep tax calculation explicitly disabled until the accountant provides the tax configuration. Confirm HPOS is enabled under **WooCommerce → Settings → Advanced → Features**.
5. Visit the local homepage and confirm it renders without a PHP fatal error.

## Run checks

Run from the repository root:

```sh
composer --working-dir=wp-content/plugins/got-commerce test
composer --working-dir=wp-content/plugins/got-commerce analyse
composer --working-dir=wp-content/plugins/got-commerce lint
php wp-content/themes/got-sage/tests/SiteModeTest.php
npm --prefix wp-content/themes/got-sage run lint:css
npm --prefix wp-content/themes/got-sage run lint:js
npm --prefix wp-content/themes/got-sage run build
```

The PHP commands require PHP 8.3+ and the installed Composer dependencies. The frontend commands require `npm ci` from the dependency-install section.

## Deployment

Staging and production deployment are blocked pending a hosting decision and target credentials. No deployment target or deployment workflow is configured yet. See [ADR 0012: Hosting and Caching](docs/adr/0012-hosting-and-caching.md). Production deployment must use an explicit approval gate once a target is selected.
