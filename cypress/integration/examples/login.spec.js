/// <reference types="cypress" /> 
//  the above line used to auto suggestion for cypress


describe('my test suite', () => {

  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('http://recordhospital.surge.sh/')
  })


  it('Verify title of the page', () => {
    cy.title().should('eq', 'XYZ HOSPITAL')
  })

  it('Verify the required field' , () => {
    cy.get('.MuiButtonBase-root').click();  // click the submit button
    cy.get(':nth-child(1) > .text-danger').should('have.text', 'Required');
    cy.get(':nth-child(3) > .text-danger').should('have.text', 'Required');
  })

  it('With Invalid user name and password login the page', () => {
    cy.get('#email').type('ananthakannan@gmail.com')
    cy.get('#password').type('Kannan$7500')
    cy.get('.MuiButtonBase-root').click()
    cy.get('.text-danger').should('have.text', 'Invalid email or password')
    // cy.wait(200)
  })


  it('With proper user name and password login the page', () => {
    cy.get('#email').type('sreeananthakannan@gmail.com')
    cy.get('#password').type('Kannan$7500')
    cy.get('.MuiButtonBase-root').click()
    cy.wait(500)
    cy.get('#create-patient').click()
    // cy.get('[aria-colindex="8"] > div > .pointer').click()
    // cy.get('.swal2-cancel').click()
    // cy.get('[aria-colindex="8"] > div > .pointer').click()
    // cy.get('.swal2-confirm').click()
  })


})