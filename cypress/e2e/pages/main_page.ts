export class MainPage {
  siteTitle = "[class=navbar-brand]";
  productNameFromCard = '[data-test="product-name"]';
  sortedProducts = '[data-test="sorting_completed"]';
  productPriceFromCard = '[data-test="product-price"]';
  searchCompleted = '[data-test="search_completed"]'

  getSiteTitle() {
    return cy.get(this.siteTitle);
  }

  getProductNameFromCard() {
    return cy.get(this.productNameFromCard)
  }

   getSearchCompleted() {
    return cy.get(this.searchCompleted)
  }
}

