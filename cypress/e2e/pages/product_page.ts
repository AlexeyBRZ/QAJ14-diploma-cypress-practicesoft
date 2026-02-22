export class ProductPage {
  addToCartButtonLocator = '[data-test="add-to-cart"]';
  increaseQuantityButtonLocator = '[data-test="increase-quantity"]';
  addToFavouritesButtonLocator = '[data-test="add-to-favorites"]';
  relatedProductsHeaderLocator = "Related products";
  productNameLocator = '[data-test="product-name"]';
  imageOfRelatedProductCardLocator = "a.card img.card-img-top";
  nameOfRelatedProduct = "a.card h5.card-title";
  moreInforLinkInCardOfRelatedProducts = "a.card a, More information";
  productDescriptionChapterLocator = '[data-test="product-description"]';

  clickIncreaseQuantutyButton() {
    return cy.get(this.increaseQuantityButtonLocator).click();
  }

  clickAddToCartButton() {
    return cy.get(this.addToCartButtonLocator).click();
  }

  clickAddToFavoritesButton() {
    return cy.get(this.addToFavouritesButtonLocator).click();
  }

  selectImageOfRelatedProductByIndex(index: number) {
    cy.get(this.imageOfRelatedProductCardLocator)
      .should("have.length.greaterThan", index)
      .eq(index)
      .click();
  }

  clickOnMoreInfoOfCertainRelatedProduct(index: number) {
    cy.get(this.moreInforLinkInCardOfRelatedProducts)
      .should("have.length.greaterThan", index)
      .eq(index)
      .click();
  }

  getNameOfRelatedProductname(index: number) {
    cy.get(this.nameOfRelatedProduct)
      .should("have.length.greaterThan", index)
      .eq(index)
      .invoke("text")
      .as("productName");
  }
}
