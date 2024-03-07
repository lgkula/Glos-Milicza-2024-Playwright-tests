import { type Locator, type Page } from '@playwright/test';
import { TopBarComponent } from '../component/topBar.component';
import { RightBarComponent } from '../component/rightBar.component';

export class ArticlePage {
    readonly page: Page;
    readonly topBarComponent: TopBarComponent;
    readonly rightBarComponent: RightBarComponent;
    readonly breadcrumbsContainerLocator: Locator;
    readonly mainPageBreadcrumbsContainerLocator: Locator;
    readonly articleContainerLocator: Locator;
    readonly articleHeaderLocator: Locator;
    readonly articleSubHeaderLocator: Locator;

    readonly pageTitleSuffix: string;

    constructor(page: Page) {
        this.page = page;
        this.topBarComponent = new TopBarComponent(this.page);
        this.rightBarComponent = new RightBarComponent(this.page);

        this.breadcrumbsContainerLocator = page.getByTestId('breadcrumbs');
        this.mainPageBreadcrumbsContainerLocator = this.breadcrumbsContainerLocator
            .locator('a')
            .nth(0);
        this.articleContainerLocator = page.getByTestId('full-article');
        this.articleHeaderLocator = this.articleContainerLocator.locator('h1');
        this.articleSubHeaderLocator = this.articleContainerLocator.locator('');

        this.pageTitleSuffix = ' | Głos  Milicza';
    }

}
