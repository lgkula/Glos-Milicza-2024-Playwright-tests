import { Page, expect } from "@playwright/test";
import { RecommendationsPanelPage } from "../../pages/recommendationsPanel.page";
import {
  deleteRecommendationsResponse,
  lastValidationErrorsTimeFromResponse,
  recommendationLockerResponse,
} from "../../tools/masspaymentsApiResponses";
import {
  scrollLeftHorizontalTableScroll,
  scrollRightHorizontalTableScroll,
} from "../../tools/scrollHorizontalTableScroll";
import { UserResponse } from "../../types/UserResponse";

export const recommendationsPanelPageSteps = () => {
  const showMyRecommendationsInRecommendationPanel = async (
    page: Page,
    recommendationsPanelPage: RecommendationsPanelPage,
    userName: string,
    param?: { expectedNumberRows: number },
  ) => {
    await recommendationsPanelPage.showMyButtonLocator.click();
    await expect(
      recommendationsPanelPage.showAllButtonLocator,
      "Check button label",
    ).toHaveText(recommendationsPanelPage.showAllButtonText);

    await recommendationsPanelPage.waitUntilDataHasFinishedLoadingIntoTheTable(
      page,
    );
    await expect(
      recommendationsPanelPage.rowsTableLocator,
      "Check that all rows are displayed in the table",
    ).toHaveCount(
      recommendationsPanelPage.numberElementsInTableFromPaginatorDigit,
    );
    if (param) {
      await expect(
        recommendationsPanelPage.rowsTableLocator,
        "Check that the list of items in the table is equal to the number of recommendations added",
      ).toHaveCount(param.expectedNumberRows);
    }
    if (recommendationsPanelPage.numberElementsInTableFromPaginatorDigit > 0) {
      expect(
        recommendationsPanelPage.usersInTable.filter(
          (user) => user !== userName,
        ).length,
        "Checking that all recommendations shown were created by the current user",
      ).toBe(0);
    }
  };

  const checkRecommendationsInRecommendationPanel = async (
    page: Page,
    recommendationsPanelPage: RecommendationsPanelPage,
    currentNumberTestedRecommendationInRecommendationPanel: number,
    currentCaseNumbersTestedRecommendationInRecommendationPanel: string[],
    currentUser: UserResponse,
    categoryOptionName1: string,
    categoryOptionName2: string = "",
  ) => {
    await recommendationsPanelPage.navigationMenu.recommendationsMainMenuLocator.click();

    await expect(page, "Check page title").toHaveTitle(
      recommendationsPanelPage.pageTitle,
    );

    // The 'Move to Payment Panel' button is specific to the Recommendation Panel so based on that, I check that the correct panel is displayed
    await expect(
      recommendationsPanelPage.moveToPaymentPanelButtonLocator,
      "Check button label",
    ).toHaveText(recommendationsPanelPage.moveToPaymentPanelButtonText);

    await showMyRecommendationsInRecommendationPanel(
      page,
      recommendationsPanelPage,
      currentUser.userName,
      {
        expectedNumberRows:
          currentNumberTestedRecommendationInRecommendationPanel,
      },
    );

    expect(
      recommendationsPanelPage.usersInTable.filter(
        (user) => user !== currentUser.userName,
      ).length,
      "Checking that all recommendations shown were created by the current user",
    ).toBe(0);

    for (const caseNumber of currentCaseNumbersTestedRecommendationInRecommendationPanel) {
      await expect(
        await recommendationsPanelPage.caseNumberColumnTableLocator.allInnerTexts(),
        "Check case numbers of recommendations in Recommendation Panel",
      ).toContain(`${caseNumber}`);
    }

    const recommendationsInTable: string[] =
      await recommendationsPanelPage.recommendationsColumnTableLocator.allInnerTexts();

    await expect(
      await recommendationsInTable.filter(
        (recommendation) =>
          recommendation !== categoryOptionName1 &&
          recommendation !== categoryOptionName2,
      ).length,
      "Checking that added recommendations have the correct category",
    ).toBe(0);
  };

  const checkRefreshValidationErrorsTime = async (
    page: Page,
    recommendationsPanelPage: RecommendationsPanelPage,
  ) => {
    const originalValidationErrorsTimeFromApi: Date =
      await lastValidationErrorsTimeFromResponse(
        async () =>
          await recommendationsPanelPage.reloadRecommendationsPanelPage(page),
        page,
      );
    await recommendationsPanelPage.readErrorsValidationTimeFromPage();

    expect(
      recommendationsPanelPage.errorRefreshTimeMessageDateFromPage,
      "Checking that the message about the last time to refresh the errors is correct",
    ).toEqual(originalValidationErrorsTimeFromApi);

    const refreshedValidationErrorsTimeFromApi: Date =
      await lastValidationErrorsTimeFromResponse(
        async () => await recommendationsPanelPage.refreshErrorsValidation(),
        page,
        originalValidationErrorsTimeFromApi,
      );

    expect(
      originalValidationErrorsTimeFromApi <
        refreshedValidationErrorsTimeFromApi,
      "Checking that validation errors time after refresh is newer than the original time",
    ).toBeTruthy();
  };

  const checkRecommendationErrorsMessages = async (
    page: Page,
    recommendationsPanelPage: RecommendationsPanelPage,
    userName: string,
    expectedRecommendationsErrorsArray: string[],
  ) => {
    await scrollRightHorizontalTableScroll(page);
    await recommendationsPanelPage.errorsColumnHeaderTableLocator.waitFor({
      state: "visible",
    });

    let recommendationsErrorsInRecommendationPanelTable: string[] =
      await recommendationsPanelPage.errorsColumnTableLocator.allInnerTexts();
    recommendationsErrorsInRecommendationPanelTable =
      recommendationsErrorsInRecommendationPanelTable.filter((x) => x);

    expect(
      recommendationsErrorsInRecommendationPanelTable,
      `Check that recommendations have errors equal to array: ${expectedRecommendationsErrorsArray}.`,
    ).toStrictEqual(expectedRecommendationsErrorsArray);

    await scrollLeftHorizontalTableScroll(page);
  };

  const transferOfRecommendationsToPaymentPanel = async (
    page: Page,
    recommendationsPanelPage: RecommendationsPanelPage,
    userName: string,
    {
      expectedNumberRecommendationInRecommendationPanelAfterTransfer,
      expectedCaseNumberRecommendationInRecommendationPanelAfterTransfer,
    }: {
      expectedNumberRecommendationInRecommendationPanelAfterTransfer: number;
      expectedCaseNumberRecommendationInRecommendationPanelAfterTransfer: string[];
    },
  ) => {
    await recommendationsPanelPage.moveToPaymentPanelButtonLocator.click();
    await expect(
      recommendationsPanelPage.modalComponent.confirmationModalHeaderLocator,
    ).toHaveText(
      recommendationsPanelPage.transferPaymentPanelConfirmationMessageLabel,
    );

    const moveRecommendationsToPaymentPanelApiConfirmation: string =
      await recommendationLockerResponse(
        async () =>
          await recommendationsPanelPage.yesConfirmationMoveToPaymentPanel(),
        page,
      );
    expect(moveRecommendationsToPaymentPanelApiConfirmation).toBe(
      recommendationsPanelPage.moveToPaymentPanelApiResponseConfirmationMessage,
    );

    await showMyRecommendationsInRecommendationPanel(
      page,
      recommendationsPanelPage,
      userName,
      {
        expectedNumberRows:
          expectedNumberRecommendationInRecommendationPanelAfterTransfer,
      },
    );
    await expect(
      recommendationsPanelPage.rowsTableLocator,
      `Checking that there is ${expectedNumberRecommendationInRecommendationPanelAfterTransfer} recommendation in the Recommendation Panel`,
    ).toHaveCount(
      expectedNumberRecommendationInRecommendationPanelAfterTransfer,
    );
    await expect(
      await recommendationsPanelPage.caseNumberColumnTableLocator.allInnerTexts(),
      "Checking that recommendation in the Recommendation Panel has correct case number",
    ).toStrictEqual(
      expectedCaseNumberRecommendationInRecommendationPanelAfterTransfer,
    );
  };

  const additionalChecksDuringRemoveRecommendationsInRecommendationPanel =
    async (
      page: Page,
      recommendationsPanelPage: RecommendationsPanelPage,
      currentNumberTestedRecommendationInRecommendationPanel: number,
      currentCaseNumbersTestedRecommendationInRecommendationPanel: string[],
      userName: string,
    ) => {
      await recommendationsPanelPage.checkboxFirstRowTableLocator.check();
      await expect(
        recommendationsPanelPage.checkboxFirstRowTableLocator,
        "Checking that the checkbox from the first row of the table is checked",
      ).toBeChecked();

      await recommendationsPanelPage.removeButtonLocator.click();
      await expect(
        recommendationsPanelPage.modalComponent.confirmationModalHeaderLocator,
        "Checking modal label text",
      ).toHaveText(recommendationsPanelPage.removeConfirmationMessageLabel);
      await recommendationsPanelPage.modalComponent.noConfirmationModalButtonLocator.click();
      await expect(
        recommendationsPanelPage.rowsTableLocator,
        `Checking that there are still ${currentNumberTestedRecommendationInRecommendationPanel} recommendations in the table`,
      ).toHaveCount(currentNumberTestedRecommendationInRecommendationPanel);
      for (const caseNumber of currentCaseNumbersTestedRecommendationInRecommendationPanel) {
        await expect(
          await recommendationsPanelPage.caseNumberColumnTableLocator.allInnerTexts(),
          "Check case numbers of recommendations in Recommendation Panel",
        ).toContain(`${caseNumber}`);
      }
      await recommendationsPanelPage.removeButtonLocator.click();

      await expect(
        recommendationsPanelPage.modalComponent.confirmationModalHeaderLocator.first(),
        `Checking that modal label text is - ${recommendationsPanelPage.removeConfirmationMessageLabel}`,
      ).toHaveText(recommendationsPanelPage.removeConfirmationMessageLabel);
      await recommendationsPanelPage.modalComponent.yesConfirmationModalButtonLocator
        .first()
        .click();
      await expect(
        recommendationsPanelPage.rowsTableLocator,
        "Checking that the number of recommendations displayed in the table is less by one",
      ).toHaveCount(currentNumberTestedRecommendationInRecommendationPanel - 1);
      await recommendationsPanelPage.navigationMenu.paymentPanelMainMenuLocator.click();
      await page
        .getByText(recommendationsPanelPage.removeConfirmationMessageLabel)
        .waitFor({ state: "detached" });
      await expect(
        recommendationsPanelPage.modalComponent.confirmationModalHeaderLocator,
        `Checking that modal label text is - ${recommendationsPanelPage.modalComponent.saveWarningConfirmationMessageLabel}`,
      ).toHaveText(
        recommendationsPanelPage.modalComponent
          .saveWarningConfirmationMessageLabel,
      );
      await recommendationsPanelPage.modalComponent.noConfirmationModalButtonLocator.click();
      await expect(
        page,
        "Confirmation of the current page title - that we have not been redirected to the Payment Panel",
      ).toHaveTitle(recommendationsPanelPage.pageTitle);
      await expect(
        recommendationsPanelPage.rowsTableLocator,
        "Checking that still the number of recommendations displayed in the table is less by one",
      ).toHaveCount(currentNumberTestedRecommendationInRecommendationPanel - 1);
      await recommendationsPanelPage.reloadRecommendationsPanelPage(page);
      await expect(
        page,
        `Confirmation of the current page title - ${recommendationsPanelPage.pageTitle}`,
      ).toHaveTitle(recommendationsPanelPage.pageTitle);
      await showMyRecommendationsInRecommendationPanel(
        page,
        recommendationsPanelPage,
        userName,
        {
          expectedNumberRows:
            currentNumberTestedRecommendationInRecommendationPanel,
        },
      );
      await expect(
        recommendationsPanelPage.rowsTableLocator,
        `Checking that there are still ${currentNumberTestedRecommendationInRecommendationPanel} recommendations in the table`,
      ).toHaveCount(currentNumberTestedRecommendationInRecommendationPanel);
      for (const caseNumber of currentCaseNumbersTestedRecommendationInRecommendationPanel) {
        await expect(
          await recommendationsPanelPage.caseNumberColumnTableLocator.allInnerTexts(),
          "Check case numbers of recommendations in Recommendation Panel",
        ).toContain(`${caseNumber}`);
      }
    };

  const removeOneRecommendationsInRecommendationPanel = async (
    page: Page,
    recommendationsPanelPage: RecommendationsPanelPage,
    currentNumberTestedRecommendationInRecommendationPanel: number,
    currentCaseNumbersTestedRecommendationInRecommendationPanel: string[],
    userName: string,
    {
      caseNumberToRemove,
      rowNumberIndexToRemove,
    }: { caseNumberToRemove: string; rowNumberIndexToRemove: number },
  ) => {
    await expect(
      recommendationsPanelPage.caseNumberColumnTableLocator.nth(
        rowNumberIndexToRemove,
      ),
      `Checking that recommendation for cease number ${caseNumberToRemove} is shown in the ${rowNumberIndexToRemove + 1} row of the table`,
    ).toContainText(caseNumberToRemove);
    const usersInRecommendationsTable: string[] =
      await recommendationsPanelPage.userColumnTableLocator.allInnerTexts();
    const userInRecommendationForRemove: string =
      usersInRecommendationsTable[rowNumberIndexToRemove];
    expect(
      userInRecommendationForRemove,
      "Checking that the recommendation to be removed was created by the current user",
    ).toBe(userName);

    await recommendationsPanelPage.rowsTableLocator
      .nth(rowNumberIndexToRemove)
      .locator("input")
      .check();
    await expect(
      recommendationsPanelPage.rowsTableLocator
        .nth(rowNumberIndexToRemove)
        .locator("input"),
      `Checking that the checkbox from the ${rowNumberIndexToRemove + 1} row of the table is checked`,
    ).toBeChecked();
    await recommendationsPanelPage.removeButtonLocator.click();

    await expect(
      recommendationsPanelPage.modalComponent.confirmationModalHeaderLocator,
      `Checking that modal label text is - ${recommendationsPanelPage.removeConfirmationMessageLabel}`,
    ).toHaveText(recommendationsPanelPage.removeConfirmationMessageLabel);
    await recommendationsPanelPage.modalComponent.yesConfirmationModalButtonLocator.click();

    // ----
    const deleteRecommendationsResponseConfirmation: string =
      await deleteRecommendationsResponse(
        () => recommendationsPanelPage.saveRemovedRecommendations(),
        page,
      );
    expect(
      deleteRecommendationsResponseConfirmation,
      "Checking that API confirms deletion of recommendation",
    ).toBe("true");

    await showMyRecommendationsInRecommendationPanel(
      page,
      recommendationsPanelPage,
      userName,
    );

    await expect(
      recommendationsPanelPage.rowsTableLocator,
      "Check that the list of items in the table is equal to the number of recommendations added minus one deleted",
    ).toHaveCount(currentNumberTestedRecommendationInRecommendationPanel - 1);
    expect(
      await recommendationsPanelPage.caseNumberColumnTableLocator.allInnerTexts(),
      `Check that deleted recommendation, for case number ${caseNumberToRemove}, is not in the table`,
    ).not.toContain(caseNumberToRemove);

    const expectedCaseNumbersInTable =
      currentCaseNumbersTestedRecommendationInRecommendationPanel.filter(
        (item) => item !== caseNumberToRemove,
      );

    for (const caseNumber of expectedCaseNumbersInTable) {
      expect(
        await recommendationsPanelPage.caseNumberColumnTableLocator.allInnerTexts(),
        "Checking that recommendations that were not to be removed are still in the table",
      ).toContain(caseNumber);
    }
  };

  const removeAllRecommendationsInRecommendationPanel = async (
    page: Page,
    recommendationsPanelPage: RecommendationsPanelPage,
    currentUser: UserResponse,
  ) => {
    recommendationsPanelPage.navigationMenu.recommendationsMainMenuLocator.click();
    await expect(page, "Check page title").toHaveTitle(
      recommendationsPanelPage.pageTitle,
    );

    await showMyRecommendationsInRecommendationPanel(
      page,
      recommendationsPanelPage,
      currentUser.userName,
    );

    if (recommendationsPanelPage.numberElementsInTableFromPaginatorDigit > 0) {
      await recommendationsPanelPage.selectAllTableCheckboxLocator.check();
      await expect(
        recommendationsPanelPage.selectAllTableCheckboxLocator,
        "Check if header checkbox is selected",
      ).toBeChecked();
      const numberOfRows: number =
        await recommendationsPanelPage.rowsTableLocator.count();
      for (let i = 0; i < numberOfRows; i++) {
        await expect(
          recommendationsPanelPage.rowsTableLocator.nth(i).locator("input"),
          "Check that all checkbox in the table are checked",
        ).toBeChecked();
      }

      await recommendationsPanelPage.removeButtonLocator.click();
      await expect(
        recommendationsPanelPage.modalComponent.confirmationModalHeaderLocator,
        `Check that modal label text is - ${recommendationsPanelPage.removeConfirmationMessageLabel}`,
      ).toHaveText(recommendationsPanelPage.removeConfirmationMessageLabel);

      await recommendationsPanelPage.modalComponent.yesConfirmationModalButtonLocator.click();

      const deleteRecommendationsResponseConfirmation: string =
        await deleteRecommendationsResponse(
          () => recommendationsPanelPage.saveRemovedRecommendations(),
          page,
        );
      expect(
        deleteRecommendationsResponseConfirmation,
        "Checking that API confirms deletion of recommendation",
      ).toBe("true");

      await showMyRecommendationsInRecommendationPanel(
        page,
        recommendationsPanelPage,
        currentUser.userName,
        { expectedNumberRows: 0 },
      );

      await recommendationsPanelPage.reloadRecommendationsPanelPage(page);
      await expect(page, "Check page title").toHaveTitle(
        recommendationsPanelPage.pageTitle,
      );
      await showMyRecommendationsInRecommendationPanel(
        page,
        recommendationsPanelPage,
        currentUser.userName,
        { expectedNumberRows: 0 },
      );
    }
  };

  return {
    showMyRecommendationsInRecommendationPanel,
    checkRecommendationsInRecommendationPanel,
    checkRefreshValidationErrorsTime,
    checkRecommendationErrorsMessages,
    transferOfRecommendationsToPaymentPanel,
    additionalChecksDuringRemoveRecommendationsInRecommendationPanel,
    removeOneRecommendationsInRecommendationPanel,
    removeAllRecommendationsInRecommendationPanel,
  };
};
