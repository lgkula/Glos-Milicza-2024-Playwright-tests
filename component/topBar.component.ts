import { type Locator, type Page } from '@playwright/test';

export class TopBarComponent {
  readonly page: Page;

  readonly logoImgLocator: Locator;
  readonly subtitleHeaderLocator: Locator;
  readonly hotNewsHeaderLocator: Locator;
  readonly newsMainMenuLocator: Locator;
  readonly sportMainMenuLocator: Locator;
  readonly peopleMainMenuLocator: Locator;

  readonly pageTitle: string;
  readonly subtitleHeaderText: string;

  constructor(page: Page) {
    this.page = page;
    this.logoImgLocator = page.getByTestId("desktop-logo-bar").locator("img");
    this.subtitleHeaderLocator = page.getByTestId("subtitle-bar");
    this.hotNewsHeaderLocator = page.getByTestId("title-bar");

    this.newsMainMenuLocator = page.getByTestId("navigation-item").nth(0);
    this.sportMainMenuLocator = page.getByTestId("navigation-item").nth(1);
    this.peopleMainMenuLocator = page.getByTestId("navigation-item").nth(2);

    this.subtitleHeaderText =
      "Niezależny tygodnik powiatowy gmin: Cieszków, Krośnice, Milicz";
    this.pageTitle = "Głos Milicza";
  }
}
