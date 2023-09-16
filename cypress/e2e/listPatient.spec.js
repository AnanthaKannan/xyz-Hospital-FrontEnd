/* eslint-disable no-undef */
/* eslint-disable testing-library/await-async-utils */
/// <reference types="cypress" /> 
//  the above line used to auto suggestion for cypress

describe('List Patient', () => {
  before(() => {
    cy.intercept('GET', `${Cypress.env('apiUrl')}/patient`).as('getPatientList')
    cy.login();
    cy.get('#list-patient').click()
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it('Patient Detail view popup model should open', () => {
    cy.wait('@getPatientList')
    cy.get('.ag-body-horizontal-scroll-viewport').scrollTo('right')
    cy.wait(200)
    cy.get('.ag-row-hover > [aria-colindex="9"]').click({ multiple: true });
    cy.get('#popupModel').should('exist')
    cy.get('#mui-3').contains('Patient Details');

    for (let i = 1; i <= 9; i++) {
      for (let j = 1; j <= 4; j++) {
        cy.get(`tbody > :nth-child(${i}) > :nth-child(${j})`).should('exist')
      }
    }

    // click the close button
    cy.get('.MuiButtonBase-root > .pointer > path').click()
    cy.get('#popupModel').should('not.exist')
  });
})