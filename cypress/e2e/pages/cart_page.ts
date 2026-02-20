export class CartPage {
  proceedToCheckoutButtonLocator = '[data-test="proceed-1"]';
  continueShoppingButtonLocator = '[data-test="continue-shopping"]';

  clickProceedToCheckoutButton() {
    return cy.get(this.proceedToCheckoutButtonLocator).click();
  }
}
