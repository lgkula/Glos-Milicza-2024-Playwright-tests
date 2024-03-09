import { expect } from "@playwright/test";

export const checkBreadcrumbs = async (page: any, names: string[]) => {
  const length = names.length;
  const listOfBreadcrumbsItems = page.getByTestId(/^breadcrumb-/);

  await expect(listOfBreadcrumbsItems).toHaveCount(length + 1);
  await expect(page.getByTestId("breadcrumb-0")).toHaveText("Strona Główna");

  for (var i = 1; i < length - 1; i++) {
    await expect(page.getByTestId(`breadcrumb-${i}`)).toHaveText(names[i - 1]);
  }

  await expect(page.getByTestId("breadcrumb-current")).toHaveText(
    names[length - 1],
  );
};
