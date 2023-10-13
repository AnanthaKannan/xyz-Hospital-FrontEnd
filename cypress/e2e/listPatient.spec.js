/* eslint-disable no-undef */
/// <reference types="cypress" />
//  the above line used to auto suggestion for cypress

describe('List Patient', () => {
  before(() => {
    cy.intercept('GET', `${Cypress.env('apiUrl')}/patient`).as('getPatientList');

    cy.login();
    cy.get('#list-patient').click();
    cy.wait('@getPatientList');
    cy.wait(1000); // Wait for 1 seconds
  });

  beforeEach(() => {
    cy.get('.ag-body-horizontal-scroll-viewport').scrollTo('right');
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it('should render ag-gird', () => {
    // ensures that the ag-grid has rendered
    cy.get('.ag-root-wrapper').should('be.visible');
  });

  it('Patient Detail view popup model should open', () => {
    // click the view
    cy.get('[aria-rowindex="3"] > [aria-colindex="9"] > #view-').should('be.visible').click({ multiple: true });
    cy.get('#popupModel').should('exist');
    cy.get('#mui-3').contains('Patient Details');

    for (let i = 1; i <= 9; i++) {
      for (let j = 1; j <= 4; j++) {
        cy.get(`tbody > :nth-child(${i}) > :nth-child(${j})`).should('exist');
      }
    }

    // click the close button
    cy.get('.MuiButtonBase-root > .pointer > path').click();
    cy.get('#popupModel').should('not.exist');
  });

  // context('delete popup', () => {
  //   before(() => {
  //     cy.intercept('DELETE', `${Cypress.env('apiUrl')}/patient/*`).as('deletePatient')
  //     cy.intercept('GET', `${Cypress.env('apiUrl')}/patient`).as('getPatientListAfterDelete')
  //   })

  //   beforeEach(() => {
  //     // click the delete button on the first row
  //     cy.get('.ag-row-first > [aria-colindex="11"]')
  // .should('be.visible').click({ multiple: true });
  //     cy.get('.swal2-popup').should('exist');
  //   });

  //   it('should not delete patient', () => {
  //     cy.get('.swal2-cancel').click()
  //     cy.get('.swal2-popup').should('not.exist');
  //   })

  //   it('should delete patient', () => {
  //     cy.get('.swal2-confirm').click()

  //     cy.wait('@deletePatient')
  //     cy.wait('@getPatientListAfterDelete')

  //     cy.get('.swal2-popup').should('not.exist');
  //     cy.get('.Toastify__toast-body').should('contain', 'Patient deleted successfully')
  //   })
  // })
});
