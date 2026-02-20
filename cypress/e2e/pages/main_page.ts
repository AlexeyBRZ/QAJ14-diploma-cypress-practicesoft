export class MainPage {
  productNameFromCardLocator = '[data-test="product-name"]';
  sortedProductsLocator = '[data-test="sorting_completed"]';
  productPriceFromCardLocator = '[data-test="product-price"]';
  searchCompletedLocator = '[data-test="search_completed"]';
  filterCompletedLocator = "filter_completed";
  ecoBadgeLocator = '[data-test="eco-badge"]';
  co2RatingBadgeLocator = '[data-test="co2-rating-badge"]';
  cardImageLocator = '[class="card-img-top"]';
  productCardLocator = "a.card";
  paginator = "ul.pagination";
  activePageInPaginator = "li.page-item.active a.page-link";
  outOfStockProductLocator = '[data-test="out-of-stock"]';

  getProductNameFromCard() {
    return cy.get(this.productNameFromCardLocator);
  }

  clickOutOfStockProductCard() {
    return cy.get(this.outOfStockProductLocator).click();
  }

  getSearchCompleted() {
    return cy.get(this.searchCompletedLocator);
  }

  getFilterCompletedElement() {
    return cy.get(this.filterCompletedLocator);
  }

  goToPageFromPaginator(pageNumber: number) {
    cy.get(this.paginator)
      .contains("a.page-link", new RegExp(`^${pageNumber}$`))
      .click();

    cy.waitForAngular();
    // cy.intercept('GET', '**/products*').as('getProducts')
    // cy.wait('@getProducts')

    cy.get("li.page-item.active a.page-link", { timeout: 15000 }).should(
      "have.text",
      pageNumber.toString(),
    );
  }

  selectProductByIndex(index: number) {
    cy.get(this.productCardLocator)
      .should("have.length.greaterThan", index)
      .eq(index)
      .click();
  }
}
