# GOT Ecommerce

WordPress and WooCommerce store project. The theme and companion plugin live in `wp-content/`.

## Prerequisites

- [Local by WP Engine](https://localwp.com/) to run the local WordPress site.
- Node.js `^20.19.0 || >=22.12.0` and npm for theme assets.
- PHP 8.3+ and Composer 2 for theme/plugin dependency management. This development host does not have PHP or Composer installed; run those commands in the project's approved Docker-based tooling environment.

## Local setup

1. Create a site in Local and start it.
2. Link the repository theme and plugin folders into that site's `app/public/wp-content/` directory. In Local's site shell on Windows, create junctions (adjust the Local site path and repository path):

   ```cmd
   mklink /J "C:\path\to\Local Site\app\public\wp-content\themes\got-sage" "C:\path\to\got ecommerce\wp-content\themes\got-sage"
   mklink /J "C:\path\to\Local Site\app\public\wp-content\plugins\got-commerce" "C:\path\to\got ecommerce\wp-content\plugins\got-commerce"
   ```

3. Install WooCommerce from **Plugins → Add New Plugin** in WordPress.
4. Activate **GOT Sage**, **GOT Commerce**, and **WooCommerce** in the WordPress admin. Install the theme's Composer dependencies before activation using the project's approved Composer tooling.

## Theme assets

From `wp-content/themes/got-sage/`, install JavaScript dependencies and build the assets:

```sh
npm install
npm run build
```

For Vite development with hot reload, use `npm run dev`.

## Deployment

Staging and production deployment are **BLOCKED pending a hosting decision**. See [docs/adr/0012-hosting-and-caching.md](docs/adr/0012-hosting-and-caching.md). No deployment target is configured or implied by this repository.
