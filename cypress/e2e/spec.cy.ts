import { TestContext } from "./testContext";

beforeEach(() => {
  cy.navigate();
  cy.clearLocalStorage();
  cy.clearCookies();
});

describe("E2E tests of practicesoftwaretesting site", () => {
  const ctx = new TestContext();

  it("check site logo visible on the main page", async () => {
    ctx.header.getSiteTitle().should("be.enabled");
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

    it.only("Check alert that only one Thor Hammer can be added to the cart", () => {
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
});
