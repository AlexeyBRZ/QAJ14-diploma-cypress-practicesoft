/// <reference types="cypress" />
Cypress.Commands.add("navigate", () => {
  //cy.visit("https://practicesoftwaretesting.com/", {
  cy.visit("/", {
    failOnStatusCode: false,
  });
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

declare global {
  namespace Cypress {
    interface Chainable {
      navigate(): Chainable<void>;
      login(): Chainable<void>;
      logout(): Chainable<void>;

      collectProductNames(selector: string): Chainable<string[]>;
      waitForAngular(): Chainable<void>;
    }
  }
}
