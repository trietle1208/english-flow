import { test, expect } from "@playwright/test";
import { registerAndEnterApp } from "./helpers";

async function answerCurrentQuestion(page: import("@playwright/test").Page) {
  const blank = page.getByLabel("Your answer");
  if ((await blank.count()) > 0) {
    await blank.fill("answer");
    return;
  }
  // QuizRunner binds keys 1–4 to selectChoice (more reliable than sr-only radios).
  await page.keyboard.press("1");
}

test.describe("7. Complete quiz", () => {
  test("answers every question and reaches the result page", async ({ page }) => {
    await registerAndEnterApp(page);
    await page.goto("/quiz");
    await expect(page.getByRole("heading", { name: "Quiz", exact: true })).toBeVisible();

    await page.getByRole("link", { name: "Start quiz" }).first().click();
    await expect(page).toHaveURL(/\/quiz\/[^/]+$/);
    await expect(page.getByText(/Question \d+ of \d+/)).toBeVisible();

    for (let i = 0; i < 20; i++) {
      if (page.url().includes("/result")) {
        break;
      }

      await answerCurrentQuestion(page);

      const submit = page.getByRole("button", { name: "Submit quiz" });
      const next = page.getByRole("button", { name: "Next" });

      if (await submit.isVisible()) {
        await expect(submit).toBeEnabled({ timeout: 5_000 });
        await submit.click();
        break;
      }

      await expect(next).toBeEnabled({ timeout: 5_000 });
      await next.click();
      await expect(page.getByText(/Question \d+ of \d+/)).toBeVisible();
    }

    await expect(page).toHaveURL(/\/quiz\/.+\/result/, { timeout: 30_000 });
    await expect(
      page
        .getByText(
          /Outstanding|Great job|Nice effort|Keep practicing|Don't give up|Score|Correct/i,
        )
        .first(),
    ).toBeVisible();
  });
});

test.describe("8. View progress", () => {
  test("shows the Progress page for a signed-in learner", async ({ page }) => {
    await registerAndEnterApp(page);
    await page.goto("/progress");
    await expect(page.getByRole("heading", { name: "Progress", level: 1 })).toBeVisible();
    await expect(
      page.getByText(/streak|skill|activity|achievement|lesson/i).first(),
    ).toBeVisible();
  });
});
