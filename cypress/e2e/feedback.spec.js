/* eslint-disable no-undef */
/* eslint-disable testing-library/await-async-utils */
/// <reference types="cypress" /> 
//  the above line used to auto suggestion for cypress
import faker from 'faker';

describe('Feedback', () => {
  let feedbackId = null
  before(() => {
    cy.intercept('GET', `${Cypress.env('apiUrl')}/feedback?project=message,createdAt&filter=isDeleted:eq:false&limit=2&skip=0`).as('feedback')
    cy.login();
    cy.get('#feed-back').click()
    cy.wait('@feedback')
  })

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it('Text validation', () => {
    cy.get('h4').contains('Share your feedback')
  })

  it('All field should be empty', () => {
    cy.get('.ql-editor > p').should('not.have.value')
  });

  it('Add feedback', () => {
    cy.intercept('POST', `${Cypress.env('apiUrl')}/feedback`).as('postFeedback')
    cy.intercept('GET', `${Cypress.env('apiUrl')}/feedback?project=message,createdAt&filter=isDeleted:eq:false&limit=2&skip=0`).as('feedback')

    const text = faker.lorem.paragraph()
    cy.get('.ql-editor > p').type(text)
    cy.get('.ql-editor > p').contains(text)
    cy.get('#submit').click()
    cy.wait('@postFeedback')
    cy.get('@postFeedback').then(res => {
      feedbackId = res.response.body._id
    });
    cy.get('.ql-editor > p').should('have.text', '');
    cy.contains('successfully added')
    cy.wait('@feedback')
    cy.contains(text)
  })

  it('Cancel feedback', () => {
    const text = faker.lorem.paragraph()
    cy.get('.ql-editor > p').type(text)
    cy.get('.ql-editor > p').contains(text)
    cy.get('#patient-cancel').click()
    cy.get('.ql-editor > p').should('have.text', '');
  });


  it('Delete feedback', () => {
    cy.intercept('PUT', `${Cypress.env('apiUrl')}/feedback/${feedbackId}`).as('updateFeedback')
    
    cy.get('#delete-').click()
    cy.get('.swal2-popup').should('exist')
    cy.get('.swal2-cancel').click()
    cy.get('.swal2-popup').should('not.exist')

    cy.get('#delete-').click()
    cy.get('.swal2-popup').should('exist')
    cy.get('.swal2-confirm').click()
    cy.wait('@updateFeedback')
    cy.contains('successfully deleted')
    cy.get('.swal2-popup').should('not.exist')
  });


})