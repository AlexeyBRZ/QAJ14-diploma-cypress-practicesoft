export class FavoritesPage {
  clickDeleteBtnNextToCertainProduct(productName: string) {
    cy.contains("h5", productName)
      .closest("div.row.no-gutters")
      .find('[data-test="delete"]')
      .click();
  }
}
