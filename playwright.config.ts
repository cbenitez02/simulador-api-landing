import { defineConfig, devices } from '@playwright/test';

const VISUAL_HOST = '127.0.0.1';
const VISUAL_PORT = 4322;
const VISUAL_BASE_URL = `http://${VISUAL_HOST}:${VISUAL_PORT}`;

export default defineConfig({
  testDir: './tests/visual',
  fullyParallel: false,
  forbidOnly: Boolean(process.env.CI),
  retries: 0,
  reporter: 'list',
  snapshotPathTemplate: '{testDir}/__screenshots__/{arg}{ext}',
  use: {
    ...devices['Desktop Chrome'],
    baseURL: VISUAL_BASE_URL,
    browserName: 'chromium',
    deviceScaleFactor: 1,
    headless: true,
    viewport: { width: 1440, height: 3200 },
  },
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
      },
    },
  ],
  webServer: {
    command: `node ./node_modules/astro/astro.js dev --host ${VISUAL_HOST} --port ${VISUAL_PORT} --strictPort`,
    url: VISUAL_BASE_URL,
    reuseExistingServer: !process.env.CI,
    stdout: 'pipe',
    stderr: 'pipe',
    timeout: 120000,
  },
});
