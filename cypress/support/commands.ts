/// <reference types="cypress" />
/// <reference types="cypress-real-events" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add("navigate", () => {
  cy.visit("https://practicesoftwaretesting.com/");
});

// Collects products names into Array
Cypress.Commands.add("collectProductNames", (selector: string) => {
  const names: string[] = [];
  return cy
    .get(selector)
    .each(($el) => {
      names.push($el.text().trim());
    })
    .then(() => {
      return cy.wrap(names);
    });
});

Cypress.Commands.add("login", (email: string, password: string) => {
  cy.get("#user-name").type(email);
  cy.get("#password").type(password);
  cy.get("#login-button").click();
});
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
declare global {
  namespace Cypress {
    interface Chainable {
      navigate(): Chainable<void>;
      login(email: string, password: string): Chainable<void>;
      collectProductNames(selector: string): Chainable<string[]>;
      //       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      //       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      //       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
    }
  }
}
