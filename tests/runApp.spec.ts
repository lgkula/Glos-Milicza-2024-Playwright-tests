import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/main.page';

test('Run Glos Milicza app', async ({ page }) => {
    const mainPage = new MainPage(page);
    
    await mainPage.openMainPage(page);
    await expect(page, 'Check page title').toHaveTitle(mainPage.pageTitle);

    await expect(
        mainPage.topBarComponent.logoImgLocator,
        'Check that logo is visible',
    ).toBeVisible();
})
