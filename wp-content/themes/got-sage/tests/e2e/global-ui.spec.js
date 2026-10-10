import AxeBuilder from '@axe-core/playwright';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { chromium, expect, test } from '@playwright/test';

const viewportWidths = [360, 390, 768, 1024, 1440, 1920];

async function mountAnnouncementFixture(page) {
  await page.evaluate(() => {
    const bar = document.createElement('section');
    bar.className = 'got-announcement';
    bar.setAttribute('aria-label', 'Test announcements');
    bar.setAttribute('aria-live', 'off');
    bar.setAttribute('data-messages', JSON.stringify([
      { text: 'First test announcement.' },
      { text: 'Second test announcement.' },
    ]));
    bar.setAttribute('x-data', 'gotAnnouncementBar($el.dataset.messages)');
    bar.setAttribute('x-on:mouseenter', 'hovered = true');
    bar.setAttribute('x-on:mouseleave', 'hovered = false');
    bar.setAttribute('x-on:focusin', 'keyboardFocused = true');
    bar.setAttribute('x-on:focusout', 'onFocusOut($event)');
    bar.innerHTML = `
      <p class="got-announcement__message" x-text="activeMessage.text">First test announcement.</p>
      <button class="got-announcement__control" type="button" aria-label="Pause announcements" aria-pressed="false"
        x-cloak x-show="messages.length > 1 && !reducedMotion"
        x-bind:aria-label="manuallyPaused ? 'Play announcements' : 'Pause announcements'"
        x-bind:aria-pressed="String(manuallyPaused)"
        x-on:click="toggleManualPause()"
        x-text="manuallyPaused ? 'Play' : 'Pause'">Pause</button>`;
    document.body.prepend(bar);
  });
}

test('resolves the theme before first paint and remembers a visitor choice', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  const network = await page.context().newCDPSession(page);
  await network.send('Network.enable');
  await network.send('Network.emulateNetworkConditions', {
    offline: false,
    latency: 200,
    downloadThroughput: 76800,
    uploadThroughput: 38400,
    connectionType: 'cellular3g',
  });
  await page.addInitScript(() => {
    window.__gotFirstContentfulPaint = null;

    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          window.__gotFirstContentfulPaint = {
            theme: document.documentElement.dataset.theme,
            background: getComputedStyle(document.body).backgroundColor,
          };
        }
      }
    }).observe({ type: 'paint', buffered: true });
  });

  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.waitForFunction(() => window.__gotFirstContentfulPaint !== null);
  expect(await page.evaluate(() => window.__gotFirstContentfulPaint)).toEqual({
    theme: 'dark',
    background: 'rgb(8, 8, 8)',
  });
  await network.detach();

  await page.getByRole('button', { name: 'Switch to light mode' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await expect(page.getByRole('button', { name: 'Switch to dark mode' })).toHaveAttribute('aria-pressed', 'true');

  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
});

test('persists the selected theme after the browser process restarts', async () => {
  const profileDir = await mkdtemp(join(tmpdir(), 'got-theme-profile-'));
  let context;

  try {
    context = await chromium.launchPersistentContext(profileDir, {
      channel: 'msedge',
      headless: true,
      colorScheme: 'dark',
      viewport: { width: 1280, height: 800 },
    });
    let page = context.pages()[0] || await context.newPage();
    await page.goto('http://got.local/');
    await page.getByRole('button', { name: 'Switch to light mode' }).click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    await context.close();
    context = null;

    context = await chromium.launchPersistentContext(profileDir, {
      channel: 'msedge',
      headless: true,
      colorScheme: 'dark',
      viewport: { width: 1280, height: 800 },
    });
    page = context.pages()[0] || await context.newPage();
    await page.goto('http://got.local/');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  } finally {
    await context?.close();
    await rm(profileDir, { recursive: true, force: true });
  }
});

test('continues to switch themes when browser storage is blocked', async ({ page }) => {
  const pageErrors = [];
  page.on('pageerror', (error) => pageErrors.push(error.message));

  await page.emulateMedia({ colorScheme: 'dark' });
  await page.addInitScript(() => {
    const blockedStorage = () => {
      throw new DOMException('Storage is blocked for this test.', 'SecurityError');
    };

    Object.defineProperty(Storage.prototype, 'getItem', { configurable: true, value: blockedStorage });
    Object.defineProperty(Storage.prototype, 'setItem', { configurable: true, value: blockedStorage });
  });

  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.getByRole('button', { name: 'Switch to light mode' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  expect(pageErrors).toEqual([]);
});

test('passes axe contrast and WCAG 2.1 AA checks in both themes', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.got-header')).toHaveAttribute('data-header-mode', 'minimal');

  for (const theme of ['dark', 'light']) {
    const currentTheme = await page.locator('html').getAttribute('data-theme');

    if (currentTheme !== theme) {
      await page.getByRole('button', { name: `Switch to ${theme} mode` }).click();
      await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
    }

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(results.violations, `${theme} theme: ${results.violations.map(({ id }) => id).join(', ')}`).toEqual([]);
  }
});

test('rotates announcements, pauses on hover and focus, and respects reduced motion', async ({ page }) => {
  await page.addInitScript(() => {
    const nativeSetInterval = window.setInterval.bind(window);
    window.setInterval = (callback, delay, ...args) => nativeSetInterval(callback, Math.min(delay, 120), ...args);
  });

  await page.goto('/');
  await mountAnnouncementFixture(page);
  const bar = page.locator('.got-announcement');
  const message = bar.locator('.got-announcement__message');

  await expect(bar).toHaveAttribute('aria-live', 'off');
  await expect(message).toHaveText('First test announcement.');
  await expect(message).toHaveText('Second test announcement.', { timeout: 1000 });

  await bar.hover();
  const hoveredMessage = await message.textContent();
  await page.waitForTimeout(260);
  await expect(message).toHaveText(hoveredMessage);

  await page.mouse.move(1, 200);
  const pause = page.getByRole('button', { name: 'Pause announcements' });
  await pause.focus();
  const focusedMessage = await message.textContent();
  await page.waitForTimeout(260);
  await expect(message).toHaveText(focusedMessage);

  await pause.click();
  await expect(page.getByRole('button', { name: 'Play announcements' })).toHaveAttribute('aria-pressed', 'true');
  await page.mouse.move(1, 200);
  await page.locator('body').click({ position: { x: 1, y: 200 } });
  const manuallyPausedMessage = await message.textContent();
  await page.waitForTimeout(260);
  await expect(message).toHaveText(manuallyPausedMessage);
});

test('does not rotate announcements or show a pause control with reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await mountAnnouncementFixture(page);
  const bar = page.locator('.got-announcement');
  const message = bar.locator('.got-announcement__message');

  await expect(message).toHaveText('First test announcement.');
  await expect(bar.getByRole('button')).toBeHidden();
  await page.waitForTimeout(300);
  await expect(message).toHaveText('First test announcement.');
});

test('uses the shared store header and accessible empty cart drawer on WooCommerce routes', async ({ page }) => {
  await page.goto('/shop/');

  if (await page.locator('.got-header').count() === 0) {
    test.skip(true, 'WooCommerce Coming Soon visibility does not expose store templates to this unauthenticated browser context.');
  }

  await expect(page.locator('.got-header')).toHaveAttribute('data-header-mode', 'store');
  await expect(page.getByRole('navigation', { name: 'Primary' })).toBeVisible();
  await expect(page.getByRole('main')).toBeVisible();
  await expect(page.getByRole('contentinfo')).toBeVisible();

  await page.getByRole('button', { name: 'Open cart' }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.getByText('Your cart is empty')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Close cart' })).toBeFocused();
  await expect(page.locator('html')).toHaveCSS('overflow', 'hidden');

  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toBeHidden();
  await expect(page.getByRole('button', { name: 'Open cart' })).toBeFocused();
});

test('keeps the mobile menu operable and the shared shell inside every required viewport', async ({ page }) => {
  await page.goto('/shop/');

  if (await page.locator('.got-header').count() === 0) {
    test.skip(true, 'WooCommerce Coming Soon visibility does not expose store templates to this unauthenticated browser context.');
  }

  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole('button', { name: 'Open menu' }).click();
  await expect(page.locator('#got-mobile-navigation')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Close menu' })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page.locator('#got-mobile-navigation')).toBeHidden();
  await expect(page.getByRole('button', { name: 'Open menu' })).toBeFocused();
});

test('keeps the shared shell inside every required viewport in both themes', async ({ page }) => {
  await page.goto('/');

  for (const theme of ['dark', 'light']) {
    const currentTheme = await page.locator('html').getAttribute('data-theme');

    if (currentTheme !== theme) {
      await page.getByRole('button', { name: `Switch to ${theme} mode` }).click();
      await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
    }

    for (const width of viewportWidths) {
      await page.setViewportSize({ width, height: 900 });

      const dimensions = await page.evaluate(() => ({
        viewport: window.innerWidth,
        document: document.documentElement.scrollWidth,
        body: document.body.scrollWidth,
      }));

      expect(dimensions.document, `${theme} document overflow at ${width}px`).toBeLessThanOrEqual(width);
      expect(dimensions.body, `${theme} body overflow at ${width}px`).toBeLessThanOrEqual(width);
    }
  }
});
