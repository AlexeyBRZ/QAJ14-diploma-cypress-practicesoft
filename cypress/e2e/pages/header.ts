export class Header {
  cartIconLocator = '[data-test="nav-cart"]';
  siteTitleLocator = "[class=navbar-brand]";
  alertLocator = '[role="alert"]';

  getSiteTitle() {
    return cy.get(this.siteTitleLocator);
  }

  clickCartIconInHeader() {
    return cy.get(this.cartIconLocator).click();
  }
}
