import { type Locator, type Page } from "@playwright/test";
import { TopBarComponent } from "../component/topBar.component";
import { RightBarComponent } from "../component/rightBar.component";

export class MainPage {
  readonly page: Page;
  readonly topBarComponent: TopBarComponent;
  readonly rightBarComponent: RightBarComponent;
  readonly pinedArticleContainerLocator: Locator;
  readonly pinedArticleImgLocator: Locator;
  readonly pinedArticleHeaderLocator: Locator;
  readonly pinedArticleSubHeaderLocator: Locator;
  readonly pinedArticleButtonLocator: Locator;
  readonly articlesContainerLocator: Locator;
  readonly articlesThumbnailsLocator: Locator;
  readonly articleImagesThumbnailsLocator: Locator;
  readonly articleTitlesThumbnailsLocator: Locator;
  readonly articleMetaBarThumbnailsLocator: Locator;
  readonly articleStatisticBarThumbnailsLocator: Locator;
  readonly articleViewsCounterThumbnailsLocator: Locator;
  readonly articleCommentsCounterThumbnailsLocator: Locator;
  readonly articleLikesCounterThumbnailsLocator: Locator;
  readonly articleDislikeCounterThumbnailsLocator: Locator;

  readonly pageTitle: string;
  readonly pinedArticleButtonText: string;

  constructor(page: Page) {
    this.page = page;
    this.topBarComponent = new TopBarComponent(this.page);
    this.rightBarComponent = new RightBarComponent(this.page);

    this.pinedArticleContainerLocator = page.getByTestId("pinned-article-box");
    this.pinedArticleImgLocator =
      this.pinedArticleContainerLocator.locator("img");
    this.pinedArticleHeaderLocator = page.getByTestId(
      "pinned-article-box-title",
    );
    this.pinedArticleSubHeaderLocator =
      this.pinedArticleContainerLocator.locator(
        "> div > div:nth-child(2) > div > p",
      );
    this.pinedArticleButtonLocator = page.getByTestId(
      "pinned-article-box-link",
    );
    this.articlesContainerLocator = page.getByTestId(
      "articles-overview-box-latest",
    );
    this.articlesThumbnailsLocator = this.articlesContainerLocator.getByTestId('article-box'),
    this.articleImagesThumbnailsLocator = page.getByTestId("article-box-image");
    this.articleTitlesThumbnailsLocator = page.getByTestId("article-box-title");
    this.articleMetaBarThumbnailsLocator = page.getByTestId("metadata-bar");
    this.articleStatisticBarThumbnailsLocator =
      page.getByTestId("statistic-bar");
    this.articleViewsCounterThumbnailsLocator =
      page.getByTestId("views-counter");
    this.articleCommentsCounterThumbnailsLocator =
      page.getByTestId("statistic-bar");
    this.articleLikesCounterThumbnailsLocator =
      page.getByTestId("likes-counter");
    this.articleDislikeCounterThumbnailsLocator =
      page.getByTestId("dislikes-counter");

    this.pinedArticleButtonText = "Wyświetl artykuł";
    this.pageTitle = "Głos Milicza";
  }

  async openMainPage(page: Page) {
    await page.goto("/");
  }

  async articleThumbnailsLocator(index: number) {
    return this.articlesThumbnailsLocator.nth(index);
  }
}
