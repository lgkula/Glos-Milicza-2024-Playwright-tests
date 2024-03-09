import { expect } from "@playwright/test";
import { TabItem } from "../../../sanity/fetchTabs";
import { checkBreadcrumbs } from "../components/checkBreadcrumbs";

export const checkTabPage = async (page: any, tab: TabItem) => {
  console.log(`Checking tab ${tab.name}`);

  await page.getByTestId(`navigation-item-${tab.tabSlug}`).click();

  await expect(page, `Check page title for tab ${tab.name}`).toHaveTitle(
    `${tab.name} | Głos Milicza`,
  );

  await checkBreadcrumbs(page, [tab.name]);

  console.log(`Tab ${tab.name} is fine! 🦄`);
};
