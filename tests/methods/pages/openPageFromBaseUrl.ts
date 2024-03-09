import { chromium, expect } from "@playwright/test";

export const openPageFromBaseUrl = async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(process.env.BASE_URL ?? "", {
    waitUntil: "networkidle",
  });

  await expect(page, `Check page title for main site`).toHaveTitle(
    `Głos Milicza`,
  );

  return page;
};
