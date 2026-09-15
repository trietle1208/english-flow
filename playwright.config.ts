import { defineConfig, devices } from "@playwright/test";

const PORT = Number(process.env.E2E_PORT ?? 3100);
const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ?? `http://127.0.0.1:${PORT}`;
const TEST_DATABASE_URL =
  process.env.TEST_DATABASE_URL ??
  "postgresql://postgres:postgres@localhost:5432/english_learning_test";

/**
 * Playwright E2E (spec §37). Uses `english_learning_test` — run
 * `npm run test:e2e:prepare` once before the suite (or rely on globalSetup).
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
  timeout: 60_000,
  expect: { timeout: 15_000 },
  globalSetup: "./e2e/global-setup.ts",
  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        // Local fallback when `npx playwright install` can't download browsers:
        //   PW_CHANNEL=chrome npx playwright test
        ...(process.env.PW_CHANNEL === "chrome" ? { channel: "chrome" as const } : {}),
      },
    },
    {
      name: "mobile",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 390, height: 844 },
        isMobile: true,
        hasTouch: true,
        ...(process.env.PW_CHANNEL === "chrome" ? { channel: "chrome" as const } : {}),
      },
    },
  ],
  webServer: {
    command: `npx next start -p ${PORT}`,
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: {
      ...process.env,
      DATABASE_URL: TEST_DATABASE_URL,
      NEXT_PUBLIC_APP_URL: BASE_URL,
      BETTER_AUTH_URL: BASE_URL,
      BETTER_AUTH_SECRET:
        process.env.BETTER_AUTH_SECRET ??
        "e2e-test-secret-must-be-at-least-32-chars",
      PORT: String(PORT),
    },
  },
});
