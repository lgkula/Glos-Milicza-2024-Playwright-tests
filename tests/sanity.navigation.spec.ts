import { test } from "@playwright/test";
import { fetchTabs } from "../sanity/fetchTabs";
import { checkTabPage } from "./methods/pages/checkTabPage";
import { openPageFromBaseUrl } from "./methods/pages/openPageFromBaseUrl";
import { checkCategoriesPagesForTab } from "./methods/pages/checkCategoryPage";

test.describe("Test navigation with data from Sanity", () => {
  test("Navigation tests", async () => {
    const page = await openPageFromBaseUrl();
    const tabs = await fetchTabs();

    await test.step("Navigation - tabs", async () => {
      for (const tab of tabs) {
        await checkTabPage(page, tab);
      }
    });

    await test.step("Navigation - category", async () => {
      for (const tab of tabs) {
        await checkCategoriesPagesForTab(page, tab);
      }
    });

    await page.close();
  });
});
