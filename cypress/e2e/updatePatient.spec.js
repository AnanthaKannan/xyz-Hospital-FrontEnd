/* eslint-disable no-undef */
/// <reference types="cypress" />
//  the above line used to auto suggestion for cypress
import faker from 'faker';

describe('Patient Update', () => {
  const updateName = faker.name.firstName();
  before(() => {
    cy.login();
    cy.setupIntercepts();
    cy.get('#list-patient').click();
    cy.wait('@getPatientList');
  });

  beforeEach(() => {
    cy.setupIntercepts();
    cy.wait(1000); // Wait for 1 seconds to list all the users
    cy.get('.ag-body-horizontal-scroll-viewport').scrollTo('right');
    cy.wait(3000);
    cy.get('.ag-row-last > [aria-colindex="12"] > #edit-').should('be.visible').click({ multiple: true });
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it('update the values', () => {
    cy.get('.swal2-confirm').click();
    cy.wait('@getAddress');
    cy.get('#firstName').then(($input) => {
      cy.log(`Is the element disabled? ${$input.prop('disabled')}`);
      // ... rest of your test script
    });
    cy.wait(1000);
    cy.get('#firstName').clear().type(updateName);
    cy.get('#patient-submit').click();
    cy.wait('@putUpdatePatient');
    cy.contains('Patient updated successfully');
    cy.wait('@getPatientList');
    cy.url().should('eq', `${Cypress.config('baseUrl')}/list-patient`);
    cy.contains(updateName);
  });

  it('should not update the value', () => {
    cy.get('.swal2-confirm').click();
    cy.wait('@getAddress');
    cy.get('#patient-cancel').click();
    cy.url().should('eq', `${Cypress.config('baseUrl')}/list-patient`);
  });
});
