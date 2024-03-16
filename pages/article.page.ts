import { type Locator, type Page } from "@playwright/test";
import { TopBarComponent } from "../component/topBar.component";
import { RightBarComponent } from "../component/rightBar.component";

export class ArticlePage {
  readonly page: Page;
  readonly topBarComponent: TopBarComponent;
  readonly rightBarComponent: RightBarComponent;
  readonly breadcrumbsContainerLocator: Locator;
  readonly mainPageBreadcrumbsContainerLocator: Locator;
  readonly articleContainerLocator: Locator;
  readonly articleHeaderLocator: Locator;
  readonly articleSubHeaderLocator: Locator;
  readonly articleMetaBarLocator: Locator;
  readonly articleStatisticBarLocator: Locator;
  readonly articleViewsCounterLocator: Locator;
  readonly articleCommentsCounterLocator: Locator;
  readonly articleLikesCounterLocator: Locator;
  readonly articleDislikesCounterLocator: Locator;

  readonly pageTitleSuffix: string;

  constructor(page: Page) {
    this.page = page;
    this.topBarComponent = new TopBarComponent(this.page);
    this.rightBarComponent = new RightBarComponent(this.page);

    this.breadcrumbsContainerLocator = page.getByTestId("breadcrumbs");
    this.mainPageBreadcrumbsContainerLocator = page.getByTestId("breadcrumb-0");
    this.articleContainerLocator = page.getByTestId("full-article");
    this.articleHeaderLocator = this.articleContainerLocator.locator("h1").nth(0);
    this.articleMetaBarLocator =
      this.articleContainerLocator.getByTestId("metadata-bar");
    this.articleStatisticBarLocator =
      this.articleContainerLocator.getByTestId("statistic-bar");
    this.articleViewsCounterLocator =
      this.articleStatisticBarLocator.getByTestId("views-counter");
    this.articleCommentsCounterLocator =
      this.articleStatisticBarLocator.getByTestId("comments-counter");
    this.articleLikesCounterLocator =
      this.articleStatisticBarLocator.getByTestId("likes-counter");
    this.articleDislikesCounterLocator =
      this.articleStatisticBarLocator.getByTestId("dislikes-counter");
    this.articleSubHeaderLocator = this.articleContainerLocator.getByTestId('lead');

    this.pageTitleSuffix = " | Głos  Milicza";
  }
}
