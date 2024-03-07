// /* eslint-disable playwright/expect-expect */
// /* eslint-disable playwright/no-conditional-expect */
// import { test, expect } from '@playwright/test';
// import { chromium } from 'playwright';
// import { TemplatePage } from '../pages/template.page';

// test.describe('Nazwa setu testów', () => {
//     test.beforeAll('Prepare environment to test', async () => {
//         const browser = await chromium.launch();
//         const context = await browser.newContext();
//         const page = await context.newPage();

//         const templatePage = new TemplatePage(page);

//         console.log(`Start test on ${process.env.ENV} environment`);

//         await test.step('Nazwa test step', async () => {});

//         await page.close();
//         console.log('Environment prepared to test');
//     });

//     test('Nazwa testu', async () => {
//         const browser = await chromium.launch();
//         const context = await browser.newContext();

//         const page = await context.newPage();
//         const templatePage = new TemplatePage(page);

//         await test.step('Nazwa stepu', async () => {});

//         await page.close();
//         console.log('End of Scenario 4');
//     });

//     test('Nazwa testu z fixture', async ({ page }) => {});
// });
