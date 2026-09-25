import { test, expect } from "@playwright/test";
import { openFirstLesson, registerAndEnterApp } from "./helpers";

test.describe("4–6. Vocabulary", () => {
  test("save, mark learned, and remove a word", async ({ page }) => {
    await registerAndEnterApp(page);
    await openFirstLesson(page);

    await expect(
      page.getByRole("heading", { name: "Vocabulary", exact: true }),
    ).toBeVisible();

    const saveButton = page.getByRole("button", { name: "Save vocabulary" }).first();
    await expect(saveButton).toBeVisible();
    await saveButton.click();
    await expect(page.getByText(/Vocabulary saved/i)).toBeVisible({ timeout: 10_000 });
    await expect(
      page.getByRole("button", { name: "Remove from vocabulary" }).first(),
    ).toBeVisible({ timeout: 10_000 });

    await page.goto("/vocabulary");
    await expect(page.getByRole("heading", { name: "My Vocabulary" })).toBeVisible();
    // Card buttons are labelled per word ("Mark wake up as learned").
    const markLearned = page.getByRole("button", { name: /^Mark .+ as learned$/ }).first();
    await expect(markLearned).toBeVisible({ timeout: 20_000 });
    await markLearned.click();
    await expect(
      page.getByRole("button", { name: /^Mark .+ as not learned$/ }).first(),
    ).toBeVisible({ timeout: 10_000 });

    await page.getByRole("button", { name: "Remove" }).first().click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await dialog.getByRole("button", { name: "Remove" }).click();
    await expect(page.getByText(/haven't saved any vocabulary yet/i)).toBeVisible({
      timeout: 15_000,
    });
  });
});
