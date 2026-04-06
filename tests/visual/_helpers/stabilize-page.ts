import { readFile } from 'node:fs/promises';

import type { Page } from '@playwright/test';

const stableScreenshotCssUrl = new URL('../stable-screenshot.css', import.meta.url);

let stableScreenshotCssPromise: Promise<string> | undefined;

function getStableScreenshotCss() {
  stableScreenshotCssPromise ??= readFile(stableScreenshotCssUrl, 'utf8');
  return stableScreenshotCssPromise;
}

export async function stabilizePage(page: Page) {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.waitForLoadState('load');
  await page.evaluate(async () => {
    if ('fonts' in document) {
      await document.fonts.ready;
    }
  });
  await page.addStyleTag({ content: await getStableScreenshotCss() });
  await page.evaluate(() => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  });
  await page.waitForTimeout(100);
}
