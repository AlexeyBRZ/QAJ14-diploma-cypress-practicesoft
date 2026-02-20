export class SideBar {
  sortDropDownLocator = "[data-test=sort]";
  sortFromAtozLocator = '[value="name,asc"]';
  sortFromZtoaLocator = '[value="name,desc"]';
  sortFromHighToLowPriceLocator = '[value="price,desc"]';
  sortFromLowToHighPriceLocator = '[value="price,asc"]';
  searchFieldLocator = '[data-test="search-query"]';
  checkBoxAllPowerToolsLocator =
    '[data-test="category-01KHH7BKN3C3FPGAGDECYGBS98"]';
  searchButtonLocator = '[data-test="search-submit"]';
  ecoFriendlyCheckBoxLocator = '[data-test="eco-friendly-filter"]';
  searchResetBtnLocator = '[data-test="search-reset"]';

  openSortDropDown() {
    return cy.get(this.sortDropDownLocator).click();
  }

  clickSearchResetBtn() {
    return cy.get(this.searchResetBtnLocator).click();
  }

  clickSortFromAtoZ() {
    return cy.get(this.sortFromAtozLocator).click();
  }

  clickSortFromZtoA() {
    return cy.get(this.sortFromZtoaLocator).click();
  }

  clickCheckBoxAllPowerTools() {
    return cy.get(this.checkBoxAllPowerToolsLocator).click();
  }

  typeInsideSearchField(data: string) {
    return cy.get(this.searchFieldLocator).type(data);
  }

  clickSearchButton() {
    return cy.get(this.searchButtonLocator).click();
  }

  clickEcoFriendlyCheckBox() {
    return cy.get(this.ecoFriendlyCheckBoxLocator).click();
  }

  selectSortOption(value: string) {
    cy.get(this.sortDropDownLocator)
      .should("exist")
      .and("not.be.disabled")
      .select(value);
  }
}
