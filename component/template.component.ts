import { type Locator, type Page } from '@playwright/test';

export class TemplateComponent {
    readonly page: Page;
    readonly xxxHeaderLocator: Locator;

    readonly pageTitle: string;
    readonly xxxHeaderText: string;

    constructor(page: Page) {
        this.page = page;
        this.xxxHeaderLocator = page.getByTestId('xxxx');
        this.xxxHeaderText = 'xxx';
        this.pageTitle = 'xxx';
    }
}
