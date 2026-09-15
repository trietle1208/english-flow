import { test, expect } from "@playwright/test";
import {
  loginUser,
  registerAndEnterApp,
  registerUser,
  skipPlacement,
  TEST_PASSWORD,
} from "./helpers";

test.describe("1. Register", () => {
  test("creates an account and reaches the placement test", async ({ page }) => {
    await registerUser(page, { name: "Register Flow" });
    await expect(page.getByRole("heading", { name: "Find your level" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Skip for now" })).toBeVisible();
  });
});

test.describe("2. Login", () => {
  test("signs in an existing user to the dashboard", async ({ page }) => {
    const { email } = await registerUser(page);
    await skipPlacement(page);
    await page.goto("/settings");
    // Log out via settings Account section
    await page.getByRole("button", { name: "Log out" }).click();
    await expect(page).toHaveURL(/\/login/, { timeout: 15_000 });
    await loginUser(page, email, TEST_PASSWORD);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/Good/);
  });
});

test.describe("3. Start lesson", () => {
  test("opens the first Everyday English lesson", async ({ page }) => {
    await registerAndEnterApp(page);
    await page.goto("/courses");
    await page.getByRole("link", { name: /Everyday English/i }).first().click();
    await page.getByRole("link", { name: /01 —/ }).click();
    await expect(page).toHaveURL(/\/lessons\//);
    await expect(page.getByRole("heading", { name: /Morning Routine|Vocabulary/i }).first()).toBeVisible();
  });
});
