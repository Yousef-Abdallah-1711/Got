import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const referenceUrl = process.env.GOT_REFERENCE_URL || 'http://127.0.0.1:8765/ui_kits/storefront/coming-soon.html';
const currentFile = fileURLToPath(import.meta.url);
const evidenceDir = path.resolve(path.dirname(currentFile), '../../../../../docs/reviews/coming-soon-evidence');
const viewportWidths = [360, 375, 390, 768, 1024, 1280, 1440, 1920];

test('anonymous visitor gets the Coming Soon page, accessible form and working theme toggle', async ({ page }) => {
  const consoleErrors = [];
  const failedThemeAssets = [];
  page.on('pageerror', (error) => consoleErrors.push(error.message));
  page.on('response', (response) => {
    if (response.url().includes('/wp-content/themes/got-sage/public/build/assets/') && response.status() >= 400) {
      failedThemeAssets.push(`${response.status()} ${response.url()}`);
    }
  });

  await page.goto('/');

  await expect(page.locator('header[data-header-mode="minimal"]')).toBeVisible();
  await expect(page.locator('.got-coming-soon__hero')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Forged to be different' })).toBeVisible();
  await expect(page.locator('.got-announcement')).toHaveCount(0);
  await expect(page.locator('#wpadminbar')).toHaveCount(0);
  await expect(page.locator('#got-early-access-email')).toBeVisible();
  await expect(page.locator('#got-early-access-consent')).toBeVisible();
  await expect(page.getByRole('contentinfo')).toBeVisible();

  const brandLogo = page.locator('.got-coming-soon__mark');
  await expect(brandLogo).toBeVisible();
  await expect(brandLogo).toHaveAttribute('alt', 'GØT sword logo');
  await expect.poll(() => brandLogo.evaluate((image) => [image.naturalWidth, image.naturalHeight])).toEqual([1254, 1254]);

  const storyImage = page.locator('.got-coming-soon__story-image img');
  await storyImage.scrollIntoViewIfNeeded();
  await expect(storyImage).toBeVisible();
  await expect(storyImage).toHaveAttribute('alt', /visual concept/i);
  await expect(page.locator('.got-coming-soon__image-label')).toHaveText('Drop 01 / Visual concept');
  await expect.poll(() => storyImage.evaluate((image) => [image.naturalWidth, image.naturalHeight])).toEqual([1024, 1536]);

  const runtime = await page.evaluate(() => ({
    alpine: Boolean(window.Alpine),
    theme: document.documentElement.dataset.theme,
    appStylesheet: [...document.styleSheets].some((sheet) => sheet.href?.includes('/public/build/assets/app-')),
    background: getComputedStyle(document.body).backgroundColor,
  }));
  expect(runtime.alpine).toBe(true);
  expect(runtime.appStylesheet).toBe(true);
  expect(runtime.background).not.toBe('rgba(0, 0, 0, 0)');
  expect(failedThemeAssets).toEqual([]);

  const initialTheme = runtime.theme;
  await page.locator('.got-theme-toggle button').click();
  const nextTheme = initialTheme === 'dark' ? 'light' : 'dark';
  await expect.poll(() => page.locator('html').getAttribute('data-theme')).toBe(nextTheme);
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', nextTheme);

  expect(consoleErrors).toEqual([]);
});

test('client-side form validation announces errors without sending a request', async ({ page }) => {
  let signupRequests = 0;
  page.on('request', (request) => {
    if (request.url().includes('/wp-json/got/v1/early-access') && request.method() === 'POST') {
      signupRequests++;
    }
  });

  await page.goto('/');
  await page.locator('#got-early-access-email').fill('invalid-address');
  await page.getByRole('button', { name: 'Get early access' }).click();

  await expect(page.locator('#got-early-access-email')).toHaveAttribute('aria-invalid', 'true');
  await expect(page.getByText('Enter a valid email address.')).toBeVisible();
  await expect(page.locator('#got-early-access-consent')).toHaveAttribute('aria-invalid', 'true');
  await expect(page.getByText('Please agree before requesting early access.')).toBeVisible();
  expect(signupRequests).toBe(0);
});

test('Coming Soon page has no automated accessibility violations', async ({ page }) => {
  await page.goto('/');
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});

test('capture matching Edge reference and anonymous page screenshots across breakpoints and themes', async ({ browser }) => {
  test.setTimeout(180_000);
  fs.mkdirSync(evidenceDir, { recursive: true });

  for (const theme of ['dark', 'light']) {
    for (const width of viewportWidths) {
      const viewport = { width, height: 800 };
      const context = await browser.newContext({
        viewport,
        colorScheme: theme,
        reducedMotion: 'reduce',
        deviceScaleFactor: 1,
      });
      await context.addInitScript((selectedTheme) => {
        try {
          window.localStorage.setItem('got-theme', selectedTheme);
        } catch {
          // The test navigates before selecting an origin for local storage.
        }
      }, theme);

      const reference = await context.newPage();
      await reference.goto(referenceUrl, { waitUntil: 'networkidle' });
      await reference.addStyleTag({ content: '.kitnav { display: none !important; }' });
      await reference.evaluate(() => document.fonts.ready);

      const current = await context.newPage();
      await current.goto('http://got.local/', { waitUntil: 'networkidle' });
      await current.evaluate(() => document.fonts.ready);
      await expect(current.locator('.got-coming-soon__hero')).toBeVisible();

      const overflow = await current.evaluate(() => ({
        pageWidth: document.documentElement.scrollWidth,
        viewportWidth: document.documentElement.clientWidth,
        elements: [...document.querySelectorAll('body *')]
          .map((element) => {
            const rect = element.getBoundingClientRect();

            return {
              tag: element.tagName,
              className: typeof element.className === 'string' ? element.className : '',
              text: (element.textContent || '').trim().slice(0, 40),
              left: Math.round(rect.left),
              right: Math.round(rect.right),
              scrollWidth: element.scrollWidth,
              clientWidth: element.clientWidth,
            };
          })
          .filter((element) => element.left < -1 || element.right > window.innerWidth + 1 || element.scrollWidth > element.clientWidth + 1)
          .slice(0, 12),
      }));
      expect(overflow.pageWidth > overflow.viewportWidth, `${width}px ${theme}: ${JSON.stringify(overflow)}`).toBe(false);

      const base = `${width}x800-${theme}`;
      await reference.screenshot({ path: path.join(evidenceDir, `${base}-reference.png`) });
      await current.screenshot({ path: path.join(evidenceDir, `${base}-current.png`) });

      if (width === 390 || width === 1280) {
        await reference.screenshot({ path: path.join(evidenceDir, `${base}-reference-full.png`), fullPage: true });
        await current.screenshot({ path: path.join(evidenceDir, `${base}-current-full.png`), fullPage: true });
      }

      await context.close();
    }
  }
});
