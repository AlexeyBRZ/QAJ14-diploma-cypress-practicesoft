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

Cypress.Commands.add("collectProductNames", (selector: string) => {
  return cy.get(selector).then(($els) => {
    return [...$els].map((el) => el.innerText.trim());
  });
});

Cypress.Commands.add("logout", () => {
  cy.visit("https://practicesoftwaretesting.com/account");
  cy.get('[data-test="nav-menu"]').click();
  cy.get('[data-test="nav-sign-out"]').click();
});

// Cypress.Commands.add("login", (email: string, password: string) => {
//   cy.get('[data-test="email"]').type(email);
//   cy.get('[data-test="password"]').type(password);
//   cy.get('[data-test="login-submit"]').click();
// });

Cypress.Commands.add("login", () => {
  cy.visit("https://practicesoftwaretesting.com/auth/login");
  cy.get('[data-test="email"]').type(Cypress.env("jackHoweEmail"));
  cy.get('[data-test="password"]').type(Cypress.env("jackHowePassword"));
  cy.get('[data-test="login-submit"]').click();
  cy.intercept("GET", "**/account*").as("loggedIn");
  cy.wait("@loggedIn");
});

Cypress.Commands.add("waitForAngular", () => {
  cy.window({ log: false }).then((win: any) => {
    return new Cypress.Promise((resolve) => {
      if (!win.getAllAngularTestabilities) {
        resolve(null);
        return;
      }

      const testabilities = win.getAllAngularTestabilities();
      let count = testabilities.length;

      const decrement = () => {
        count--;
        if (count === 0) {
          resolve(null);
        }
      };

      testabilities.forEach((testability: any) => {
        testability.whenStable(decrement);
      });
    });
  });
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
      login(): Chainable<void>;
      logout(): Chainable<void>;

      //  login(email: string, password: string): Chainable<void>;
      collectProductNames(selector: string): Chainable<string[]>;
      waitForAngular(): Chainable<void>;

      //       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      //       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      //       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
    }
  }
}
