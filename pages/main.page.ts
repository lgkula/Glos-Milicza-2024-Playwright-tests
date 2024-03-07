import { type Locator, type Page } from '@playwright/test';
import { TopBarComponent } from '../component/topBar.component';
import { RightBarComponent } from '../component/rightBar.component';

export class MainPage {
    readonly page: Page;
    readonly topBarComponent: TopBarComponent;
    readonly rightBarComponent: RightBarComponent;
    readonly pinedArticleContainerLocator: Locator;
    readonly pinedArticleImgLocator: Locator;
    readonly pinedArticleHeaderLocator: Locator;
    readonly pinedArticleHeader1Locator: Locator;
    readonly pinedArticleSubHeaderLocator: Locator;
    readonly pinedArticleButtonLocator: Locator;
    readonly articlesContainerLocator: Locator;
    readonly articlesThumbnailsLocator: Locator;
    readonly firstArticlesContainerLocator: Locator;
    readonly secondArticlesContainerLocator: Locator;

    readonly pageTitle: string;
    readonly pinedArticleButtonText: string;

    constructor(page: Page) {
        this.page = page;
        this.topBarComponent = new TopBarComponent(this.page);
        this.rightBarComponent = new RightBarComponent(this.page);

        this.pinedArticleContainerLocator =
            page.getByTestId('pinned-article-box');
        this.pinedArticleImgLocator = page
            .getByTestId('pinned-article-box')
            .locator('img');
        this.pinedArticleHeaderLocator = page.locator(
            '[data-testid="pinned-article-box"] > div > div:nth-child(2) > div > a:first-child',
        );
        this.pinedArticleHeader1Locator = page
            .getByTestId('pinned-article-box')
            .locator('> div > div:nth-child(2) > div > a:first-child');
        this.pinedArticleSubHeaderLocator = page.locator(
            '[data-testid="pinned-article-box"] > div > div:nth-child(2) > div > p',
        );
        this.pinedArticleButtonLocator = page.locator(
            '[data-testid="pinned-article-box"] > div > div:nth-child(2) > div > a:last-child',
        );
        this.articlesContainerLocator = page.getByTestId(
            'articles-overview-box-latest',
        );
        this.articlesThumbnailsLocator = this.articlesContainerLocator.locator(
            'div[data-testid^="article-box"]',
        );
        this.firstArticlesContainerLocator = page.getByTestId('article-box-0');
        this.secondArticlesContainerLocator = page.getByTestId('article-box-1');

        this.pinedArticleButtonText = 'Wyświetl artykuł';

        this.pageTitle = 'Głos Milicza';
    }

    async openMainPage(page: Page) {
        await page.goto('/');
    }

    async articleThumbnailsLocator(index: number) {
        return this.articlesThumbnailsLocator.nth(index);
    }
    
    



}
