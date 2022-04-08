/// <reference types="cypress" /> 
//  the above line used to auto suggestion for cypress


describe('Patient Crate', () => {

  // beforeEach(() => {
  //   // Cypress starts out with a blank slate for each test
  //   // so we must tell it to visit our website with the `cy.visit()` command.
  //   // Since we want to visit the same URL at the start of all our tests,
  //   // we include it in our beforeEach function so that it runs before each test
  //   cy.visit('http://recordhospital.surge.sh/create-patient')
  // })


  it('Verify title of the page', () => {
    cy.title().should('eq', 'Create Patient')
  })

  it('Verify the required field' , () => {
    cy.get('#patient-submit > .MuiButton-label').click();  // click the submit button
    cy.get(':nth-child(1) > .mb-3 > .text-danger').should('have.text', 'name is a required field');
    cy.get(':nth-child(2) > .mb-3 > .text-danger').should('have.text', 'Email is required');
    cy.get(':nth-child(4) > .mb-3 > .text-danger').should('have.text', 'Age is required');
    cy.get(':nth-child(5) > .mb-3 > .text-danger').should('have.text', 'Phone is required');
    cy.get('#patient-cancel > .MuiButton-label').click()
    cy.get(':nth-child(1) > .mb-3 > .text-danger').should('not.exist');
    cy.get(':nth-child(2) > .mb-3 > .text-danger').should('not.exist');
    cy.get(':nth-child(4) > .mb-3 > .text-danger').should('not.exist');
    cy.get(':nth-child(5) > .mb-3 > .text-danger').should('not.exist');
  })

  it('create a patient with proper data', () => {
    cy.get('#name').type('ananthakannan@gmail.com')
    cy.get('#email').type('Kannan$7500')
    cy.get('#age').type('7500')
    cy.get('#phone').type('Kannan$7500')
    cy.get('.react-datepicker__input-container > .form-control').type('01/01/2020')
    cy.get('#patient-cancel > .MuiButton-label').click()
    // cy.wait(200)
  })


  // it('With proper user name and password login the page', () => {
  //   cy.get('#email').type('sreeananthakannan@gmail.com')
  //   cy.get('#password').type('Kannan$7500')
  //   cy.get('.MuiButtonBase-root').click()
  // })

  // it('type the password in the login page', () => {
    
  //   // .should('have.value', 'Kannan$7500');
  // })

  // it('.submit() - submit a form', () => {
  //   cy.get('[type="submit"]').submit()
  //     .next().should('contain', 'Your form has been submitted!')
  // })

})