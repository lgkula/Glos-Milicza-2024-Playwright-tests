import { type Locator, type Page } from '@playwright/test';
import { TopBarComponent } from '../component/topBar.component';
import { RightBarComponent } from '../component/rightBar.component';

export class NewsPage {
    readonly page: Page;
    readonly topBarComponent: TopBarComponent;
    readonly rightBarComponent: RightBarComponent;
    readonly breadcrumbsContainerLocator: Locator;
    readonly mainPageBreadcrumbsContainerLocator: Locator;
    readonly articlesContainerLocator: Locator;
    readonly articlesThumbnailsLocator: Locator;
    readonly firstArticlesContainerLocator: Locator;
    readonly secondArticlesContainerLocator: Locator;

    readonly pageTitle: string;

    constructor(page: Page) {
        this.page = page;
        this.topBarComponent = new TopBarComponent(this.page);
        this.rightBarComponent = new RightBarComponent(this.page);

        this.breadcrumbsContainerLocator = page.getByTestId('breadcrumbs');
        this.mainPageBreadcrumbsContainerLocator =
            this.breadcrumbsContainerLocator.locator('a').nth(0);
        this.articlesContainerLocator = page.getByTestId(
            'articles-overview-box-latest',
        );
        this.articlesThumbnailsLocator = this.articlesContainerLocator.locator(
            'div[data-testid^="article-box"]',
        );
        this.firstArticlesContainerLocator = page.getByTestId('article-box-0');
        this.secondArticlesContainerLocator = page.getByTestId('article-box-1');

        this.pageTitle = 'Wiadomości | Głos  Milicza';
    }

    async openNewsPage(page: Page) {
        await page.goto('tab/wiadomosci/');
    }
}
