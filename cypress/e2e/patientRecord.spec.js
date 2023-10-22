/* eslint-disable no-undef */
/// <reference types="cypress" />
//  the above line used to auto suggestion for cypress
import faker from 'faker';

describe('Patient Record', () => {
  before(() => {
    cy.login();
    cy.setupIntercepts();
    cy.get('#list-patient').click();
    cy.wait('@getPatientList');

    cy.get('.ag-body-horizontal-scroll-viewport').scrollTo('right');
    cy.wait(3000);
    cy.get('.ag-row-last > [aria-colindex="10"] > #entry-').should('be.visible').click({ multiple: true });
    cy.wait('@getDoctorList');
    cy.wait('@getPatientRecordList');
  });

  beforeEach(() => {
    cy.setupIntercepts();
    cy.wait(1000); // Wait for 1 seconds to list all the users
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it('show give the validation error', () => {
    cy.get('#patient-record-submit').click();
    cy.get('#error-_doctorId').should('have.text', 'Doctor is required');
    cy.get('#error-diagnosis').should('have.text', 'diagnosis is a required field');
    cy.get('#error-description').should('have.text', 'Description is required');

    cy.get('#patient-record-clear').click();
    cy.get('#error-_doctorId').should('not.exist');
    cy.get('#error-diagnosis').should('not.exist');
    cy.get('#error-description').should('not.exist');
  });

  describe('Button action in patient record', () => {
    const text = faker.lorem.paragraph();
    const diagnosis = faker.name.firstName();
    let patientId = '';

    it('should crete patient record', () => {
      cy.get('#_doctorId').find('option').its('length').then((optionCount) => {
        const randomIndex = Math.floor(Math.random() * optionCount);
        cy.get('#_doctorId').select(randomIndex);
      });
      cy.get('#diagnosis').type(diagnosis);
      cy.get('.ql-editor > p').type(text);
      cy.get('#patient-record-submit').click();
      cy.wait('@postPatientRecord');
      cy.wait('@getPatientRecordList').then((result) => {
        // eslint-disable-next-line no-underscore-dangle
        patientId = result.response.body[0]._id;
      });
    });

    it('should be there in the first record which one recently added', () => {
      cy.contains(text);
      cy.contains(diagnosis);
    });

    it('should delete the patient record', () => {
      cy.get(`#delete-${patientId}`).click();
      cy.wait('@deletePatientRecord');
      cy.contains('successfully deleted');
    });

    it('should go back to list user', () => {
      cy.scrollTo('top');
      cy.get('#patient-record-cancel').click();
      cy.url().should('eq', `${Cypress.config('baseUrl')}/list-patient`);
    });
  });
});
