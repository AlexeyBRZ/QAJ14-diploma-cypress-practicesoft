export class SideBar {
  sortDropDown = "[data-test=sort]";
  sortFromAtoZ = '[value="name,asc"]';
  sortFromZtoA = '[value="name,desc"]';
  sortFromHighToLowPrice = '[value="price,desc"]';
  sortFromLowToHighPrice = '[value="price,asc"]';
  searchField = '[data-test="search-query"]'
  checkBoxAllPowerTools = '[data-test="category-01KHH7BKN3C3FPGAGDECYGBS98"]'
  searchButton = '[data-test="search-submit"]'

  openSortDropDown() {
    return cy.get(this.sortDropDown).click();
  }

  clickSortFromAtoZ() {
    return cy.get(this.sortFromAtoZ).click();
  }

  clickSortFromZtoA() {
    return cy.get(this.sortFromZtoA).click();
  }

  clickCheckBoxAllPowerTools() {
    return cy.get(this.checkBoxAllPowerTools).click()
  }

  typeInsideSearchField(data: string) {
    return cy.get(this.searchField).type(data)
  }

  clickSearchButton() {
    return cy.get(this.searchButton).click()
  }
}
