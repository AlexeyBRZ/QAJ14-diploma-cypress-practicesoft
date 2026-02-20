export class ProductPage {
  addToCartButtonLocator = '[data-test="add-to-cart"]';
  increaseQuantityButtonLocator = '[data-test="increase-quantity"]';
  addToFavouritesButtonLocator = '[data-test="add-to-favorites"]';
  relatedProductsHeaderLocator = "Related products";

  clickIncreaseQuantutyButton() {
    return cy.get(this.increaseQuantityButtonLocator).click();
  }

  clickAddToCartButton() {
    return cy.get(this.addToCartButtonLocator).click();
  }

  clickAddToFavoritesButton() {
    return cy.get(this.addToFavouritesButtonLocator).click();
  }
}
