import { type Locator, type Page } from '@playwright/test';

export class RightBarComponent {
  readonly page: Page;

  readonly firstPageImgLocator: Locator;

  readonly pageTitle: string;

  constructor(page: Page) {
    this.page = page;
    this.firstPageImgLocator = page.getByTestId("first-site").locator("img");

    this.pageTitle = "Głos Milicza";
  }
}
