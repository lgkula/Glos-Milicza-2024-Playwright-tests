import { type Locator, type Page } from '@playwright/test';
import { TemplateComponent } from '../component/template.component';

export class TemplatePage {
    readonly page: Page;
    readonly templateComponent: TemplateComponent;
    readonly xxxHeaderLocator: Locator;

    readonly pageTitle: string;
    readonly xxxHeaderText: string;

    constructor(page: Page) {
        this.page = page;
        this.templateComponent = new TemplateComponent(this.page);
        this.xxxHeaderLocator = page.getByTestId('xxxx');
        this.xxxHeaderText = 'xxx';
        this.pageTitle = 'xxx';
    }

    async openXxxPage(page: Page) {
        await page.goto('xxx');
    }
}
