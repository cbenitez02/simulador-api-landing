import { expect, test } from '@playwright/test';

import { stabilizePage } from './_helpers/stabilize-page';

test('captures the approved landing baseline for /', async ({ page }) => {
  await page.goto('/', { waitUntil: 'load' });
  await stabilizePage(page);

  await expect(page).toHaveScreenshot('home-desktop-chromium.png', {
    animations: 'disabled',
    caret: 'hide',
    fullPage: true,
  });
});

test('captures the approved pricing baseline for /pricing', async ({ page }) => {
  await page.goto('/pricing', { waitUntil: 'load' });
  await stabilizePage(page);

  await expect(page).toHaveScreenshot('pricing-desktop-chromium.png', {
    animations: 'disabled',
    caret: 'hide',
    fullPage: true,
  });
});
