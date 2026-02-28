import { TestContext } from "../support/testContext";

beforeEach(() => {
  cy.navigate();
  cy.clearLocalStorage();
  cy.clearCookies();
});

describe("E2E tests of practicesoftwaretesting site", () => {
  const ctx = new TestContext();

  describe("tests of product page", () => {
    it("check alert if add products to favorites with unauthorized user", () => {
      ctx.mainPage.selectProductByIndex(2);
      ctx.productPage.clickAddToFavoritesButton();
      cy.get(ctx.header.alertLocator).should(
        "have.text",
        " Unauthorized, can not add product to your favorite list. ",
      );
    });

    it("check alert if product is added to cart", () => {
      ctx.mainPage.selectProductByIndex(5);
      ctx.productPage.clickAddToCartButton();
      cy.get(ctx.header.alertLocator).should(
        "have.text",
        " Product added to shopping cart. ",
      );
    });

    it("check alert if product is added to favorites", () => {
      cy.login();
      ctx.header.clickHomeTab();
      ctx.mainPage.goToPageFromPaginator(2);
      ctx.mainPage.selectProductByIndex(5);
      cy.get(ctx.productPage.productNameLocator)
        .invoke("text")
        .then((text) => text.trim())
        .as("productName");
      ctx.productPage.clickAddToFavoritesButton();
      cy.get(ctx.header.alertLocator).should(
        "have.text",
        " Product added to your favorites list. ",
      );
      ctx.header.clickMyAccountOptionsDropDown();
      ctx.header.clickMyFavorites();
      cy.get<string>("@productName").then((productName) => {
        ctx.favoritesPage.clickDeleteBtnNextToCertainProduct(
          productName as string,
        );
        cy.intercept("DELETE", "**/favorites/**").as("deleteFavorite");

        ctx.favoritesPage.clickDeleteBtnNextToCertainProduct(productName);

        cy.wait("@deleteFavorite");

        cy.contains("h5", productName).should("not.exist");
        cy.logout();
      });
    });

    it("check alert if product is alsready added to favorites", () => {
      cy.login();
      ctx.header.clickHomeTab();
      ctx.mainPage.goToPageFromPaginator(2);
      ctx.mainPage.selectProductByIndex(6);
      cy.intercept("POST", "**/favorites").as("addToFavorites");
      ctx.productPage.clickAddToFavoritesButton();
      cy.wait("@addToFavorites");
      ctx.productPage.clickAddToFavoritesButton();
      cy.get(ctx.header.alertLocator).should(
        "contain.text",
        " Product already in your favorites list. ",
      );
    });

    it("check out of stock product", () => {
      ctx.mainPage.clickOutOfStockProductCard();
      cy.get(ctx.productPage.addToCartButtonLocator).should("be.disabled");
      cy.get(ctx.productPage.increaseQuantityButtonLocator).should(
        "be.disabled",
      );
      cy.get(ctx.productPage.addToFavouritesButtonLocator).should("be.enabled");
    });

    it("check if there are related products on product page", () => {
      ctx.mainPage.goToPageFromPaginator(3);
      ctx.mainPage.selectProductByIndex(3);
      cy.contains(ctx.productPage.relatedProductsHeaderLocator)
        .should("be.visible")
        .parent()
        .within(() => {
          cy.get("a.card")
            .should("have.length.at.least", 1)
            .each(($card) => {
              cy.wrap($card)
                .should("have.attr", "href")
                .and("include", "/product/");
            });
        });
    });

    it("Check alert that only one Thor Hammer can be added to the cart", () => {
      cy.get(ctx.sideBar.searchFieldLocator).clear().type("Thor Hammer");
      ctx.sideBar.clickSearchButton();
      cy.get(ctx.mainPage.searchCompletedLocator, { timeout: 15000 }).should(
        "be.visible",
      );
      ctx.mainPage.selectProductByIndex(0);
      ctx.productPage.clickIncreaseQuantutyButton();
      ctx.productPage.clickAddToCartButton();
      cy.get(ctx.header.alertLocator).should(
        "have.text",
        " You can only have one Thor Hammer in the cart. ",
      );
    });

    it("check if image from Related products is clickable", () => {
      ctx.mainPage.goToPageFromPaginator(4);
      ctx.mainPage.selectProductByIndex(7);
      ctx.productPage.getNameOfRelatedProductname(2);
      ctx.productPage.selectImageOfRelatedProductByIndex(2);
      cy.get("@productName").then((savedName) => {
        cy.get(ctx.productPage.productNameLocator).should(
          "have.text",
          savedName,
        );
      });
    });

    it("check if More information link from Related products is clickable", () => {
      ctx.mainPage.goToPageFromPaginator(1);
      ctx.mainPage.selectProductByIndex(7);
      ctx.productPage.getNameOfRelatedProductname(1);
      ctx.productPage.clickOnMoreInfoOfCertainRelatedProduct(1);
      cy.get("@productName").then((savedName) => {
        cy.get(ctx.productPage.productNameLocator).should(
          "have.text",
          savedName,
        );
      });
    });

    it("check if product description contains text", () => {
      ctx.mainPage.goToPageFromPaginator(1);
      ctx.mainPage.selectProductByIndex(2);
      cy.get(ctx.productPage.productDescriptionChapterLocator).should(
        "not.be.empty",
      );
    });
  });

  describe("test of purchasing with different methods", () => {
    beforeEach(() => {
      cy.login();
    });
    it("check payment with cash in delivery method", () => {
      ctx.header.clickHomeTab();
      ctx.mainPage.goToPageFromPaginator(3);
      ctx.mainPage.selectProductByIndex(4);
      ctx.productPage.clickAddToCartButton();
      ctx.header.clickCartIconInHeader();
      ctx.cartPage.clickProceedToCheckoutButtonFromCartTab();
      ctx.cartPage.clickProceedToCheckoutWithSignedUser();
      ctx.cartPage.fillInBillingAddressForm(
        "test Street 33",
        "Libreville",
        "State",
        "Gabon",
        "34CT",
      );
      ctx.cartPage.clickProceedToCheckoutWithFilledBillingAddressForm();
      ctx.cartPage.choosePaymentMethod("cashOnDelivery");
      ctx.cartPage.clickConfirmButton();
      cy.get(ctx.cartPage.paymentSuccessmessageLocator).should(
        "have.text",
        "Payment was successful",
      );
    });

    it("check payment with bank transfer", () => {
      ctx.header.clickHomeTab();
      ctx.mainPage.goToPageFromPaginator(3);
      ctx.mainPage.selectProductByIndex(5);
      ctx.productPage.clickAddToCartButton();
      ctx.header.clickCartIconInHeader();
      ctx.cartPage.clickProceedToCheckoutButtonFromCartTab();
      ctx.cartPage.clickProceedToCheckoutWithSignedUser();
      ctx.cartPage.fillInBillingAddressForm(
        "test Street 33",
        "Libreville",
        "State",
        "Gabon",
        "34CT",
      );
      ctx.cartPage.clickProceedToCheckoutWithFilledBillingAddressForm();
      ctx.cartPage.choosePaymentMethod("bankTransfer");
      ctx.cartPage.fillInBankTransferForm(
        "myBank",
        "testAccountName",
        565647348,
      );
      ctx.cartPage.clickConfirmButton();
      cy.get(ctx.cartPage.paymentSuccessmessageLocator).should(
        "have.text",
        "Payment was successful",
      );
    });

    it("check payment with credit card", () => {
      ctx.header.clickHomeTab();
      ctx.mainPage.goToPageFromPaginator(3);
      ctx.mainPage.selectProductByIndex(6);
      ctx.productPage.clickAddToCartButton();
      ctx.header.clickCartIconInHeader();
      ctx.cartPage.clickProceedToCheckoutButtonFromCartTab();
      ctx.cartPage.clickProceedToCheckoutWithSignedUser();
      ctx.cartPage.fillInBillingAddressForm(
        "test Street 33",
        "Libreville",
        "State",
        "Gabon",
        "34CT",
      );
      ctx.cartPage.clickProceedToCheckoutWithFilledBillingAddressForm();
      ctx.cartPage.choosePaymentMethod("creditCard");
      ctx.cartPage.fillInCreditCardForm(
        "1234-1234-1234-1234",
        "12/2028",
        442,
        "Strannyy personazh",
      );
      ctx.cartPage.clickConfirmButton();
      cy.get(ctx.cartPage.paymentSuccessmessageLocator).should(
        "have.text",
        "Payment was successful",
      );
    });

    it("check buy now pay later payment", () => {
      ctx.header.clickHomeTab();
      ctx.mainPage.goToPageFromPaginator(3);
      ctx.mainPage.selectProductByIndex(6);
      ctx.productPage.clickAddToCartButton();
      ctx.header.clickCartIconInHeader();
      ctx.cartPage.clickProceedToCheckoutButtonFromCartTab();
      ctx.cartPage.clickProceedToCheckoutWithSignedUser();
      ctx.cartPage.fillInBillingAddressForm(
        "test Street 33",
        "Libreville",
        "State",
        "Gabon",
        "34CT",
      );
      ctx.cartPage.clickProceedToCheckoutWithFilledBillingAddressForm();
      ctx.cartPage.choosePaymentMethod("buyNowPayLater");
      ctx.cartPage.chooseMonthlyInstallments("sixMonths");
      ctx.cartPage.clickConfirmButton();
      cy.get(ctx.cartPage.paymentSuccessmessageLocator).should(
        "have.text",
        "Payment was successful",
      );
    });

    it("check payment with gift card", () => {
      ctx.header.clickHomeTab();
      ctx.mainPage.goToPageFromPaginator(3);
      ctx.mainPage.selectProductByIndex(6);
      ctx.productPage.clickAddToCartButton();
      ctx.header.clickCartIconInHeader();
      ctx.cartPage.clickProceedToCheckoutButtonFromCartTab();
      ctx.cartPage.clickProceedToCheckoutWithSignedUser();
      ctx.cartPage.fillInBillingAddressForm(
        "test Street 33",
        "Libreville",
        "State",
        "Gabon",
        "34CT",
      );
      ctx.cartPage.clickProceedToCheckoutWithFilledBillingAddressForm();
      ctx.cartPage.choosePaymentMethod("giftCard");
      ctx.cartPage.fillInGiftCardForm("565656565", "34343434");
      ctx.cartPage.clickConfirmButton();
      cy.get(ctx.cartPage.paymentSuccessmessageLocator).should(
        "have.text",
        "Payment was successful",
      );
    });
    afterEach(() => {
      cy.logout();
    });
  });

  describe("check sorting of products", () => {
    it("check sorting by eco-friendly label", () => {
      ctx.sideBar.clickEcoFriendlyCheckBox();
      cy.intercept("GET", "**/products?*eco_friendly=true*").as("ecoFilter");
      cy.wait("@ecoFilter");
      cy.get(ctx.mainPage.productCardLocator)
        .should("have.length.greaterThan", 0)
        .each(($card) => {
          cy.wrap($card).find(ctx.mainPage.ecoBadgeLocator).should("exist");
        });

      cy.get(ctx.mainPage.co2RatingBadgeLocator)
        .should("have.length.greaterThan", 0)
        .each(($card) => {
          cy.wrap($card).find(".co2-letter.active").should("have.text", "B");
        });
    });

    it("check A-Z filter of products", () => {
      cy.intercept("GET", "**/products*", (req) => {
        if (req.url.includes("sort=name,asc")) {
          req.alias = "sortedProducts";
        }
      });
      ctx.sideBar.selectSortOption("name,asc");
      cy.wait("@sortedProducts");
      cy.collectProductNames(ctx.mainPage.productNameFromCardLocator).should(
        (names) => {
          const sortedNames = [...names].sort((a, b) =>
            a.localeCompare(b, undefined, { sensitivity: "base" }),
          );
          expect(names).to.deep.equal(sortedNames);
        },
      );
    });

    it("[Flacky] check Z-A filter of products", () => {
      cy.intercept("GET", "**/products*", (req) => {
        if (req.url.includes("sort=name,desc")) {
          req.alias = "sortedProducts";
        }
      });
      ctx.sideBar.selectSortOption("name,desc");
      cy.wait("@sortedProducts");

      cy.collectProductNames(ctx.mainPage.productNameFromCardLocator).should(
        (names) => {
          const sortedNames = [...names].sort((a, b) =>
            b.localeCompare(a, undefined, { sensitivity: "base" }),
          );
          expect(names).to.deep.equal(sortedNames);
        },
      );
    });

    it("[Flacky] check High to Low filter of products", () => {
      cy.intercept("GET", "**/products*", (req) => {
        if (req.url.includes("sort=price,desc")) {
          req.alias = "sortedProducts";
        }
      });
      ctx.sideBar.selectSortOption("price,desc");
      cy.wait("@sortedProducts");
      cy.collectProductNames(ctx.mainPage.productPriceFromCardLocator).then(
        (prices) => {
          const numbers = prices.map((p) => Number(p.replace("$", "").trim()));
          const sortedNumbers = [...numbers].sort((a, b) => b - a);
          expect(numbers).to.deep.equal(sortedNumbers);
        },
      );
    });

    it("check Low to High filter of products", () => {
      cy.intercept("GET", "**/products*", (req) => {
        if (req.url.includes("sort=price,asc")) {
          req.alias = "sortedProducts";
        }
      });
      ctx.sideBar.selectSortOption("price,asc");
      cy.wait("@sortedProducts");
      cy.collectProductNames(ctx.mainPage.productPriceFromCardLocator).then(
        (prices) => {
          const numbers = prices.map((p) => Number(p.replace("$", "").trim()));
          const sortedNumbers = [...numbers].sort((a, b) => a - b);
          expect(numbers).to.deep.equal(sortedNumbers);
        },
      );
    });
  });

  describe("simple tests", () => {
    it("check site logo visible on the main page", () => {
      ctx.header.getSiteTitle().should("be.visible");
    });

    it("[Flacky] check searching by name of product", () => {
      cy.get(ctx.sideBar.searchFieldLocator).clear().type("Cordless");
      ctx.sideBar.clickSearchButton();
      cy.get(ctx.mainPage.searchCompletedLocator, { timeout: 15000 }).should(
        "be.visible",
      );
      cy.get(ctx.mainPage.productNameFromCardLocator)
        .should("have.length.greaterThan", 0)
        .each(($card) => {
          const name = $card.text().toLowerCase().trim();
          expect(name).to.include("cordless");
        });
    });

    it("check possibilty to come back shopping from cart", () => {
      ctx.mainPage.goToPageFromPaginator(4);
      ctx.mainPage.selectProductByIndex(4);
      ctx.productPage.clickIncreaseQuantutyButton();
      ctx.productPage.clickAddToCartButton();
      ctx.header.clickCartIconInHeader();
      cy.get(ctx.cartPage.continueShoppingButtonLocator).should("be.enabled");
    });

    it("check possibility to clean search field by x button", () => {
      cy.get(ctx.sideBar.searchFieldLocator)
        .clear()
        .type("testInput")
        .should("have.value", "testInput");
      ctx.sideBar.clickSearchResetBtn();
      cy.get(ctx.sideBar.searchResetBtnLocator).should("have.value", "");
    });

    it("check if site logo is clickable from product page", () => {
      ctx.mainPage.selectProductByIndex(6);
      cy.get(ctx.header.siteTitleLocator).click();
      cy.url().should("eq", "https://practicesoftwaretesting.com/");
    });
  });

  describe("validate Billing Address mandatory fields to be filled", () => {
    beforeEach(() => {
      cy.login();
    });

    it("check Billing Address form without street", () => {
      ctx.header.clickHomeTab();
      ctx.mainPage.goToPageFromPaginator(3);
      ctx.mainPage.selectProductByIndex(4);
      ctx.productPage.clickAddToCartButton();
      ctx.header.clickCartIconInHeader();
      ctx.cartPage.clickProceedToCheckoutButtonFromCartTab();
      ctx.cartPage.clickProceedToCheckoutWithSignedUser();
      ctx.cartPage.fillInBillingAddressForm(
        "Street",
        "City 1",
        "State 1",
        "Gabon",
        "11111",
      );
      cy.get(ctx.cartPage.yourStreetFieldInBillingAddressFormLocator).clear();
      cy.get(ctx.cartPage.proceedToCheckoutWithFilledBillingAddressForm).should(
        "be.disabled",
      );
    });

    it("check Billing Address form without city", () => {
      ctx.header.clickHomeTab();
      ctx.mainPage.goToPageFromPaginator(3);
      ctx.mainPage.selectProductByIndex(4);
      ctx.productPage.clickAddToCartButton();
      ctx.header.clickCartIconInHeader();
      ctx.cartPage.clickProceedToCheckoutButtonFromCartTab();
      ctx.cartPage.clickProceedToCheckoutWithSignedUser();
      ctx.cartPage.fillInBillingAddressForm(
        "Street 1",
        "City",
        "State 1",
        "Gabon",
        "11111",
      );
      cy.get(ctx.cartPage.yourCityFieldInBillingAddressFormLocator).clear();
      cy.get(ctx.cartPage.proceedToCheckoutWithFilledBillingAddressForm).should(
        "be.disabled",
      );
    });
    it("check Billing Address form without state", () => {
      ctx.header.clickHomeTab();
      ctx.mainPage.goToPageFromPaginator(3);
      ctx.mainPage.selectProductByIndex(4);
      ctx.productPage.clickAddToCartButton();
      ctx.header.clickCartIconInHeader();
      ctx.cartPage.clickProceedToCheckoutButtonFromCartTab();
      ctx.cartPage.clickProceedToCheckoutWithSignedUser();
      ctx.cartPage.fillInBillingAddressForm(
        "Street 1",
        "City 1",
        "State",
        "Gabon",
        "11111",
      );
      cy.get(ctx.cartPage.stateFieldInBillingAddressFormLocator).clear();
      cy.get(ctx.cartPage.proceedToCheckoutWithFilledBillingAddressForm).should(
        "be.disabled",
      );
    });
    it("check Billing Address form without country", () => {
      ctx.header.clickHomeTab();
      ctx.mainPage.goToPageFromPaginator(3);
      ctx.mainPage.selectProductByIndex(4);
      ctx.productPage.clickAddToCartButton();
      ctx.header.clickCartIconInHeader();
      ctx.cartPage.clickProceedToCheckoutButtonFromCartTab();
      ctx.cartPage.clickProceedToCheckoutWithSignedUser();
      ctx.cartPage.fillInBillingAddressForm(
        "Street 1",
        "City 1",
        "State 1",
        "Gabon",
        "11111",
      );
      cy.get(ctx.cartPage.yourCountryFieldInBillingAddressFormLocator).clear();
      cy.get(ctx.cartPage.proceedToCheckoutWithFilledBillingAddressForm).should(
        "be.disabled",
      );
    });
    it("check Billing Address form without zipCode", () => {
      ctx.header.clickHomeTab();
      ctx.mainPage.goToPageFromPaginator(3);
      ctx.mainPage.selectProductByIndex(4);
      ctx.productPage.clickAddToCartButton();
      ctx.header.clickCartIconInHeader();
      ctx.cartPage.clickProceedToCheckoutButtonFromCartTab();
      ctx.cartPage.clickProceedToCheckoutWithSignedUser();
      ctx.cartPage.fillInBillingAddressForm(
        "Street 1",
        "City 1",
        "State 1",
        "Gabon",
        "76767",
      );
      cy.get(ctx.cartPage.yourPostcodeFieldInBillingAddressFormLocator).clear();
      cy.get(ctx.cartPage.proceedToCheckoutWithFilledBillingAddressForm).should(
        "be.disabled",
      );
    });
  });
});
