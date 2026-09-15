import { expect, type Page } from "@playwright/test";

export function uniqueEmail(prefix = "e2e"): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}@example.com`;
}

export const TEST_PASSWORD = "Testpass1";

/** Register a fresh user and land on /placement-test. */
export async function registerUser(
  page: Page,
  opts?: { name?: string; email?: string; password?: string },
): Promise<{ email: string; password: string; name: string }> {
  const name = opts?.name ?? "E2E Learner";
  const email = opts?.email ?? uniqueEmail();
  const password = opts?.password ?? TEST_PASSWORD;

  await page.goto("/register");
  await page.getByLabel("Name").fill(name);
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password", { exact: true }).fill(password);
  await page.getByLabel("Confirm password").fill(password);
  await page.getByRole("button", { name: "Create Account" }).click();
  await expect(page).toHaveURL(/\/placement-test/, { timeout: 20_000 });

  return { email, password, name };
}

/** Skip placement and go to dashboard. */
export async function skipPlacement(page: Page): Promise<void> {
  await page.getByRole("link", { name: /Skip for now/i }).click();
  await expect(page).toHaveURL(/\/dashboard/, { timeout: 15_000 });
}

export async function registerAndEnterApp(page: Page) {
  const user = await registerUser(page);
  await skipPlacement(page);
  return user;
}

export async function loginUser(
  page: Page,
  email: string,
  password: string = TEST_PASSWORD,
): Promise<void> {
  await page.goto("/login");
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password", { exact: true }).fill(password);
  await page.getByRole("button", { name: "Sign In" }).click();
  await expect(page).toHaveURL(/\/dashboard/, { timeout: 20_000 });
}

/** Open Everyday English and start the first unlocked lesson. */
export async function openFirstLesson(page: Page): Promise<void> {
  await page.goto("/courses");
  await expect(page.getByRole("heading", { name: "Courses" })).toBeVisible();
  await page.getByRole("link", { name: /Everyday English/i }).first().click();
  await expect(page).toHaveURL(/\/courses\//);
  await page.getByRole("link", { name: /01 —/ }).click();
  await expect(page).toHaveURL(/\/lessons\//, { timeout: 15_000 });
}
