/* eslint-disable no-undef */

/// <reference types="cypress" />
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
// Cypress.Commands.add('login', (email, password) => { ... })
//
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
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options:
//  Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

const LOCAL_STORAGE_MEMORY = {};
const apiUrl = Cypress.env("apiUrl");
// eslint-disable-next-line import/no-extraneous-dependencies
const faker = require("faker");
const common = require("../fixtures/common.json");

Cypress.Commands.add("saveLocalStorage", () => {
  Object.keys(localStorage).forEach((key) => {
    LOCAL_STORAGE_MEMORY[key] = localStorage[key];
  });
});

Cypress.Commands.add("restoreLocalStorage", () => {
  Object.keys(LOCAL_STORAGE_MEMORY).forEach((key) => {
    localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
  });
});

Cypress.Commands.add("login", () => {
  cy.visit(Cypress.config("baseUrl"));
  cy.intercept("POST", "").as("postLogin");
  cy.get("#email").clear().type(Cypress.env("email"));
  cy.get("#password").clear().type(Cypress.env("password"));
  cy.get(".MuiButtonBase-root").click();

  cy.wait("@postLogin");
});

Cypress.Commands.add("launchPortal", () => {
  cy.visit(Cypress.config("baseUrl"));
});

Cypress.Commands.add("address", (apiCall = true) => {
  // address
  cy.get("#zipCode").type(faker.phone.phoneNumber());
  cy.get("#address").type(faker.address.streetName());
  cy.get(`#country > ${common.dropDownCss}`)
    .type("India{downArrow}")
    .trigger("keydown", { keyCode: 13, which: 13, key: "Enter" });
  apiCall && cy.wait("@getState");
  cy.get(`#state > ${common.dropDownCss}`)
    .type("Tamil Nadu", { delay: 200 })
    .trigger("keydown", { keyCode: 13, which: 13, key: "Enter" });
  apiCall && cy.wait("@getCity");
  cy.get(`#city > ${common.dropDownCss}`)
    .type("chennai", { delay: 200 })
    .click()
    .type("{enter}");
});

Cypress.Commands.add("gender", (id) => {
  const gender = ["male", "female", "others"];
  cy.get(id).type(`${gender[faker.random.number(2)]}{enter}{enter}`);
});

Cypress.Commands.add("setupIntercepts", () => {
  cy.intercept("GET", `${Cypress.env("apiUrl")}/patient`).as("getPatientList");
  cy.intercept("PUT", `${Cypress.env("apiUrl")}/patient/*`).as(
    "putUpdatePatient"
  );
  cy.intercept("POST", `${Cypress.env("apiUrl")}/patient`).as(
    "postCreatePatient"
  );

  cy.intercept("GET", `${Cypress.env("apiUrl")}/address?*`).as("getCountry");
  cy.intercept("GET", `${Cypress.env("apiUrl")}/address?*`).as("getState");
  cy.intercept("GET", `${Cypress.env("apiUrl")}/address?*`).as("getCity");

  cy.intercept("GET", `${Cypress.env("apiUrl")}/feedback?*`).as("feedback");
  cy.intercept("POST", `${Cypress.env("apiUrl")}/feedback`).as("postFeedback");
});

Cypress.Commands.add("setupInterceptsId", (id) => {
  cy.intercept("PUT", `${Cypress.env("apiUrl")}/feedback/${id}`).as(
    "updateFeedback"
  );
});
