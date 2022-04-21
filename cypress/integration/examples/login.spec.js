/* eslint-disable testing-library/await-async-utils */
/* eslint-disable no-undef */
/// <reference types="cypress" /> 
//  the above line used to auto suggestion for cypress


describe('my test suite', () => {

  beforeEach(() => {
    const url = Cypress.env('url')
    cy.visit(url)
  })


  it('Verify title of the page', () => {
    cy.title().should('eq', 'Digital HOSPITAL')
  });

  it('Verify the required field' , () => {
    cy.get('#login-submit').click();  // click the submit button
    cy.get('#error-email').should('have.text', 'Required');
    cy.get('#error-password').should('have.text', 'Required');
  });

  it('With Invalid user name and password login the page', () => {
    cy.get('#email').type('testmail@gmail.com')
    cy.get('#password').type('Password$7500')
    cy.get('#login-submit').click()
    cy.get('#error-password').should('have.text', 'Invalid email or password')
    cy.wait(300)
  });


  it('With proper user name and password login the page', () => {
    cy.get('#email').type('sreeananthakannan@gmail.com')
    cy.get('#password').type('Kannan$7500')
    cy.get('#login-submit').click()
    cy.wait(500)
    // cy.get('#create-patient').click()
  })


})