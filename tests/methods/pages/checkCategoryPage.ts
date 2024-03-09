import { expect } from "@playwright/test";
import { CategoryItem, TabItem } from "../../../sanity/fetchTabs";
import { checkBreadcrumbs } from "../components/checkBreadcrumbs";
import { checkTabPage } from "./checkTabPage";

export const checkCategoriesPagesForTab = async (page: any, tab: TabItem) => {
  console.log(`Checking categories for tab ${tab.name}`);

  if (tab.categories.length === 1) {
    await page.getByTestId(`navigation-item-${tab.tabSlug}`).click();
    await checkTabPage(page, tab); // there is no category page, so we check the tab page
  } else {
    for (const category of tab.categories) {
      await page.getByTestId(`navigation-item-${tab.tabSlug}`).hover();
      await page
        .getByTestId(`navigation-item-sub-menu-item-${category.slug}`)
        .click();
      await checkCategoryPage(page, tab.name, category);
    }
  }
  console.log(`Categories for tab ${tab.name} are fine! 🦄`);
};

const checkCategoryPage = async (
  page: any,
  tabName: string,
  category: CategoryItem,
) => {
  console.log(`Checking category ${category.name}`);

  await expect(
    page,
    `Check page title for category ${category.name}`,
  ).toHaveTitle(`${category.name} | Głos Milicza`);

  await checkBreadcrumbs(page, [tabName, category.name]);

  console.log(`Category ${category.name} is fine! 🦄`);
};
