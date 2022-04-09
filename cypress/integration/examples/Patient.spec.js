/* eslint-disable no-undef */
/* eslint-disable testing-library/await-async-utils */
/// <reference types="cypress" /> 
//  the above line used to auto suggestion for cypress
import faker from 'faker';

describe('Patient Create', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000');
  })

  

  it('With proper user name and password login the page', () => {
    cy.visit('http://localhost:3000/create-patient');
    cy.get('#email').clear().type('sreeananthakannan@gmail.com')
    cy.get('#password').clear().type('Kannan$7500')
    cy.get('.MuiButtonBase-root').click()
    cy.wait(500)
    cy.get('#create-patient').click()

    cy.get('#patient-submit').click();  // click the submit button
    cy.get(':nth-child(1) > .mb-3 > .text-danger').should('have.text', 'name is a required field');
    cy.get(':nth-child(2) > .mb-3 > .text-danger').should('have.text', 'Email is required');
    cy.get(':nth-child(4) > .mb-3 > .text-danger').should('have.text', 'Age is required');
    cy.get(':nth-child(5) > .mb-3 > .text-danger').should('have.text', 'Phone is required');
    cy.get('#patient-cancel').click()
    cy.get(':nth-child(1) > .mb-3 > .text-danger').should('not.exist');
    cy.get(':nth-child(2) > .mb-3 > .text-danger').should('not.exist');
    cy.get(':nth-child(4) > .mb-3 > .text-danger').should('not.exist');
    cy.get(':nth-child(5) > .mb-3 > .text-danger').should('not.exist');
    
    for (let index = 0; index < 20; index++) {
   
      cy.get('#name').type(faker.name.firstName())
      cy.get('#email').type(faker.internet.email())
      cy.get('#age').type(faker.random.number())
      cy.get('#phone').type(faker.phone.phoneNumber())
      cy.get('.react-datepicker__input-container > .form-control').focus();
      cy.get('.react-datepicker__day--015').click();
      cy.get('#patient-submit').click()
      cy.wait(200)
    
    }
  })

})