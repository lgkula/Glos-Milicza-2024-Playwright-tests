import { type Locator, type Page } from '@playwright/test';
import { TopBarComponent } from '../component/topBar.component';
import { RightBarComponent } from '../component/rightBar.component';

export class NewsPage {
  readonly page: Page;
  readonly topBarComponent: TopBarComponent;
  readonly rightBarComponent: RightBarComponent;
  readonly breadcrumbsContainerLocator: Locator;
  readonly mainPageBreadcrumbsContainerLocator: Locator;
  // readonly articlesContainerLocator: Locator;
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

  constructor(page: Page) {
    this.page = page;
    this.topBarComponent = new TopBarComponent(this.page);
    this.rightBarComponent = new RightBarComponent(this.page);

    this.breadcrumbsContainerLocator = page.getByTestId('breadcrumbs');
    this.mainPageBreadcrumbsContainerLocator = page.getByTestId('breadcrumb-0');
    // Do poprawy
    // this.articlesContainerLocator = page.getByTestId(
    //   'articles-overview-box-latest',
    // );
    // this.articlesThumbnailsLocator = this.articlesContainerLocator.getByTestId('article-box');
    this.articlesThumbnailsLocator = page.getByTestId('article-box');
    this.articleImagesThumbnailsLocator = page.getByTestId('article-box-image');
    this.articleTitlesThumbnailsLocator = page.getByTestId('article-box-title');
    this.articleMetaBarThumbnailsLocator = page.getByTestId('metadata-bar');
    this.articleStatisticBarThumbnailsLocator =
      page.getByTestId('statistic-bar');
    this.articleViewsCounterThumbnailsLocator =
      page.getByTestId('views-counter');
    this.articleCommentsCounterThumbnailsLocator =
      page.getByTestId('statistic-bar');
    this.articleLikesCounterThumbnailsLocator =
      page.getByTestId('likes-counter');
    this.articleDislikeCounterThumbnailsLocator =
      page.getByTestId('dislikes-counter');


    this.pageTitle = 'Wiadomości | Głos  Milicza';
  }

  async openNewsPage(page: Page) {
    await page.goto('tab/wiadomosci/');
  }
}
