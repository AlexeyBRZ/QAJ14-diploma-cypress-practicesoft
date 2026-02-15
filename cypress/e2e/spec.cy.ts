import { TestContext } from "./testContext";

beforeEach(() => {
  cy.navigate();
});

describe("E2E tests of practicesoftwaretesting site", () => {
  const ctx = new TestContext();

  it("check site logo visible on the main page", async () => {
    ctx.mainPage.getSiteTitle().should("be.enabled");
  });

  it("check search by name of product", () => {
    cy.get(ctx.sideBar.searchField).clear()
    .type("Cordless")
    ctx.sideBar.clickSearchButton()
    cy.get(ctx.mainPage.searchCompleted, {timeout: 15000}).should('be.visible').should('have.length.greaterThan', 0)
    cy.get(ctx.mainPage.searchCompleted)
    .each(($el) => {
      const name = $el.text().toLowerCase().trim();
      expect(name).to.include('cordless');
    });


  })

  describe("check sorting of products", () => {
    it("check A-Z filter of products", async () => {
      cy.get(ctx.sideBar.sortDropDown).select(ctx.sideBar.sortFromAtoZ);

      // cy.get(ctx.sideBar.sortDropDown).select(ctx.sideBar.sortFromAtoZ);
      cy.get(ctx.mainPage.sortedProducts).should("be.visible");
      cy.collectProductNames(ctx.mainPage.productNameFromCard).then((names) => {
        const sortedNames = [...names].sort((a, b) =>
          a.localeCompare(b, undefined, { sensitivity: "base" }),
        );
        expect(names).to.deep.equal(sortedNames);
      });
    });

    it("check Z-A filter of products", async () => {
      
   //   cy.get(':nth-child(3) > .input-group').realClick();
      cy.get(ctx.sideBar.sortDropDown).realClick();
      cy.get(ctx.sideBar.sortFromZtoA).realClick(), {timeout: 15000}; // убил уйму времени... не знаю как нужно нажимать так чтоб товары действительно сортировались
      cy.get(ctx.mainPage.sortedProducts).should("be.visible");
      cy.collectProductNames(ctx.mainPage.productNameFromCard).then((names) => {
        const sortedNames = [...names].sort((a, b) =>
          b.localeCompare(a, undefined, { sensitivity: "base" }),
        );
        expect(names).to.deep.equal(sortedNames);
      });
    });

    it("check High to Low filter of products", async () => {
      cy.get(ctx.sideBar.sortDropDown).select(
        ctx.sideBar.sortFromLowToHighPrice,
      );
      cy.get(ctx.mainPage.sortedProducts).should("be.visible");
      cy.collectProductNames(ctx.mainPage.productPriceFromCard).then(
        (prices) => {
          const numbers = prices.map((p) => Number(p.replace("$", "").trim()));
          cy.log("Numbers:", numbers);
          const sortedNumbers = [...numbers].sort((a, b) => b - a);
          cy.log("Sorted:", sortedNumbers);
          expect(numbers).to.deep.equal(sortedNumbers);
        },
      );
    });

    it("check Low to High filter of products", async () => {
      cy.get(ctx.sideBar.sortDropDown).select(
        ctx.sideBar.sortFromLowToHighPrice,
      );
      cy.get(ctx.mainPage.sortedProducts).should("be.visible");
      cy.collectProductNames(ctx.mainPage.productPriceFromCard).then(
        (prices) => {
          const numbers = prices.map((p) => Number(p.replace("$", "").trim()));
          cy.log("Numbers:", numbers);
          const sortedNumbers = [...numbers].sort((a, b) => a - b);
          cy.log("Sorted:", sortedNumbers);
          expect(numbers).to.deep.equal(sortedNumbers);
        },
      );
    });
  });


});
