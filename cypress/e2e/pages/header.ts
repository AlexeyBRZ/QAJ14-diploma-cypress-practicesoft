export class Header {
  cartIconLocator = '[data-test="nav-cart"]';
  siteTitleLocator = "[class=navbar-brand]";
  alertLocator = '[role="alert"]';
  HomeTabLocator = '[data-test="nav-home"]';
  signInTabLocator = '[data-test="nav-sign-in"]';
  accountNameLocator = '[data-test="nav-menu"]';
  myFavouritesLocator = '[data-test="nav-my-favorites"]';

  getSiteTitle() {
    return cy.get(this.siteTitleLocator);
  }

  clickCartIconInHeader() {
    return cy.get(this.cartIconLocator).click();
  }

  clickHomeTab() {
    return cy.get(this.HomeTabLocator).click();
  }

  clickMyAccountOptionsDropDown() {
    return cy.get(this.accountNameLocator).click();
  }

  clickMyFavorites() {
    return cy.get(this.myFavouritesLocator).click();
  }

  clickSignInTab() {
    return cy.get(this.signInTabLocator).click();
  }
}
