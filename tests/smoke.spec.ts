/* eslint-disable playwright/expect-expect */
/* eslint-disable playwright/no-conditional-expect */
import { test, expect } from "@playwright/test";
import { MainPage } from "../pages/main.page";
import { articles, pinedArticle } from "../test-data/articles.data";
import { ArticlePage } from "../pages/article.page";
import { NewsPage } from "../pages/news.page";

test.describe("Smoke tests", () => {
  let pinedArticleHeader: string;
  let pinedArticleSubHeader: string;
  let firstThumbnailArticleHeader: string;

  test("Visibility elements on main page test", async ({ page }) => {
    const mainPage = new MainPage(page);
    const articlePage = new ArticlePage(page);
    const newsPage = new NewsPage(page);

    console.log(`Start test on ${process.env.ENV} environment`);

    await test.step("Run app - open main page", async () => {
      await mainPage.openMainPage(page);
      await expect(page, "Check page title").toHaveTitle(mainPage.pageTitle);

      await expect(
        mainPage.topBarComponent.logoImgLocator,
        "Check that logo is visible",
      ).toBeVisible();
      await expect(
        mainPage.topBarComponent.subtitleHeaderLocator,
        "Check that subtitle header is visible",
      ).toBeVisible();
      await expect(
        mainPage.topBarComponent.subtitleHeaderLocator,
        "Check that subtitle header has correct text",
      ).toHaveText(mainPage.topBarComponent.subtitleHeaderText);
      await expect(
        mainPage.topBarComponent.hotNewsHeaderLocator,
        "Check that hot news header is visible",
      ).toBeVisible();
      await expect(
        mainPage.topBarComponent.newsMainMenuLocator,
        "Check that news main menu is visible",
      ).toBeVisible();
      await expect(
        mainPage.topBarComponent.sportMainMenuLocator,
        "Check that sport main menu is visible",
      ).toBeVisible();
      await expect(
        mainPage.topBarComponent.peopleMainMenuLocator,
        "Check that people main menu is visible",
      ).toBeVisible();
      await expect(
        mainPage.rightBarComponent.firstPageImgLocator,
        "Check that first page image is visible",
      ).toBeVisible();
      await expect(mainPage.pinedArticleContainerLocator).toBeVisible();
    });

    await test.step("Check pinned article", async () => {
      await expect(mainPage.pinedArticleImgLocator).toBeVisible();
      await expect(mainPage.pinedArticleHeaderLocator).toBeVisible();
      await expect(mainPage.pinedArticleSubHeaderLocator).toBeVisible();
      await expect(mainPage.pinedArticleButtonLocator).toBeVisible();

      await expect(
        mainPage.pinedArticleHeaderLocator,
        "Check pined article header",
      ).not.toHaveText("");
      await expect(
        mainPage.pinedArticleSubHeaderLocator,
        "Check pined article subtitle",
      ).not.toHaveText("");

      pinedArticleHeader = await mainPage.pinedArticleHeaderLocator.innerText();
      pinedArticleSubHeader =
        await mainPage.pinedArticleSubHeaderLocator.innerText();
    });

    await test.step("Check article thumbnails visibility", async () => {
      await expect(
        mainPage.articlesContainerLocator,
        "Check that container for articles thumbnails is visible",
      ).toBeVisible();
      await expect(
        mainPage.firstArticlesContainerLocator,
        "Check that article thumbnail is visible",
      ).toBeVisible();
      await expect(
        mainPage.secondArticlesContainerLocator,
        "Check that article thumbnail is visible",
      ).toBeVisible();

      for (let i = 0; i < 29; i++) {
        await expect(
          mainPage.articlesThumbnailsLocator.nth(i),
          "Check that article thumbnail is visible",
        ).toBeVisible();
      }
      for (let i = 0; i < 29; i++) {
        await expect(
          mainPage.articleTitlesThumbnailsLocator.nth(i),
          "Check that article thumbnail is visible",
        ).not.toHaveText("");
      }
      for (let i = 0; i < 29; i++) {
        await expect(
          mainPage.articleViewsCounterThumbnailsLocator.nth(i),
          "Check that article thumbnail is visible",
        ).not.toHaveText("");
      }
    });

    await test.step("Check first article thumbnail data", async () => {
      firstThumbnailArticleHeader =
        await mainPage.articleTitlesThumbnailsLocator.nth(0).innerText();
      expect(
        firstThumbnailArticleHeader.length,
        "Check first article thumbnail title length",
      ).toBeGreaterThan(5);
      await expect(
        mainPage.articleTitlesThumbnailsLocator.nth(0),
        "Check that first article thumbnail title",
      ).toHaveText(firstThumbnailArticleHeader);
    });

    await test.step("Display pined article", async () => {
      await mainPage.pinedArticleButtonLocator.click();
      await expect(page, "Check page title").toHaveTitle(
        pinedArticleHeader + articlePage.pageTitleSuffix,
      );
      await expect(
        articlePage.breadcrumbsContainerLocator,
        "Check that breadcrumbs are visible",
      ).toBeVisible();
      await expect(
        articlePage.articleHeaderLocator,
        "Check that article header is visible",
      ).toBeVisible();
      await expect(
        articlePage.articleHeaderLocator,
        "Check that article header is correct",
      ).toHaveText(pinedArticleHeader);
      await expect(
        articlePage.articleSubHeaderLocator,
        "Check that article header is visible",
      ).toBeVisible();
      await expect(
        articlePage.articleSubHeaderLocator,
        "Check that article lead is correct",
      ).toHaveText(pinedArticleSubHeader);

      await articlePage.mainPageBreadcrumbsContainerLocator.click();
      await expect(
        page,
        "Check that breadcrumbs redirect to main page",
      ).toHaveTitle(mainPage.pageTitle);

      await mainPage.pinedArticleImgLocator.click();
      await expect(page, "Check page title").toHaveTitle(
        pinedArticleHeader + articlePage.pageTitleSuffix,
      );
      await articlePage.topBarComponent.logoImgLocator.click();
      await expect(page, "Check that logo redirect to main page").toHaveTitle(
        mainPage.pageTitle,
      );

      await mainPage.pinedArticleHeaderLocator.click();
      await expect(page, "Check page title").toHaveTitle(
        pinedArticleHeader + articlePage.pageTitleSuffix,
      );
      await page.goBack();
      await expect(page, "Check redirect to main page").toHaveTitle(
        mainPage.pageTitle,
      );

      await mainPage.pinedArticleSubHeaderLocator.click();
      await expect(page, "Check page title").toHaveTitle(mainPage.pageTitle);

      await mainPage.pinedArticleButtonLocator.click();
      await expect(page, "Check page title").toHaveTitle(
        pinedArticleHeader + articlePage.pageTitleSuffix,
      );
      await page.goBack();
      await expect(page, "Check redirect to main page").toHaveTitle(
        mainPage.pageTitle,
      );
    });

    await test.step("Display first article", async () => {
      await mainPage.firstArticlesContainerLocator.click();
      await expect(page, "Check page title").toHaveTitle(
        firstThumbnailArticleHeader + articlePage.pageTitleSuffix,
      );
      await expect(
        articlePage.articleHeaderLocator,
        "Check that article header is correct",
      ).toHaveText(firstThumbnailArticleHeader);

      await articlePage.topBarComponent.newsMainMenuLocator.click();
      await expect(
        page,
        "Check that news main menu redirect to news page",
      ).toHaveTitle(newsPage.pageTitle);
    });
  });

  test("Open directly news page", async ({ page }) => {
    const newsPage = new NewsPage(page);
    const articlePage = new ArticlePage(page);

    await newsPage.openNewsPage(page);
    await expect(page, "Check page title").toHaveTitle(newsPage.pageTitle);

    await expect(
      newsPage.firstArticlesContainerLocator,
      "Check that article thumbnail is visible",
    ).toBeVisible();
    await expect(
      newsPage.secondArticlesContainerLocator,
      "Check that article thumbnail is visible",
    ).toBeVisible();

    const firstArticleTitle = await newsPage.articleTitlesThumbnailsLocator
      .nth(0)
      .innerText();

    await newsPage.firstArticlesContainerLocator.click();
    await expect(page, "Check page title").toHaveTitle(
      firstArticleTitle + articlePage.pageTitleSuffix,
    );
    await expect(
      articlePage.articleHeaderLocator,
      "Check that article header is correct",
    ).toHaveText(firstArticleTitle);
  });

  test("Open directly pined article", async ({ page }) => {
    const articlePage = new ArticlePage(page);
    const articleHeader: string =
      "Niemal miliard złotych na pożyczki dla dolnośląskich przedsiębiorców";

    await page.goto(
      "article/niemal-miliard-zlotych-na-pozyczki-dla-dolnoslaskich-przedsiebiorcow/",
    );
    await expect(page, "Check page title").toHaveTitle(
      articleHeader + articlePage.pageTitleSuffix,
    );
    await expect(
      articlePage.articleHeaderLocator,
      "Check that article header is correct",
    ).toHaveText(articleHeader);
  });

  /* test.fixme('Open directly first article', async ({ page }) => {
        const articlePage = new ArticlePage(page);
        const articleHeaderTransformed: string = firstThumbnailArticleHeader
            .toLowerCase()
            .replace(/ /g, '-');
        const pinedArticleUrl: string = 'article/' + articleHeaderTransformed;

        await page.goto(articles[0].link);
        await expect(page, 'Check page title').toHaveTitle(
            firstThumbnailArticleHeader + articlePage.pageTitleSuffix,
        );
        await expect(page).toHaveURL(process.env.BASE_URL + articles[0].link);
        await expect(
            articlePage.articleHeaderLocator,
            'Check that article header is correct',
        ).toHaveText(firstThumbnailArticleHeader);
    }); */
});
