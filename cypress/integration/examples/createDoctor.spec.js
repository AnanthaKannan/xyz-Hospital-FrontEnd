/* eslint-disable no-undef */
/* eslint-disable testing-library/await-async-utils */
/// <reference types="cypress" /> 
//  the above line used to auto suggestion for cypress
import faker from 'faker';
import msg from '.../../../src/lib/msg'

describe('Patient Create', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3001');
  })

  

  it('Doctor validation', () => {

    cy.get('#email').clear().type('sreeananthakannan@gmail.com')
    cy.get('#password').clear().type('Kannan$7500')
    cy.get('.MuiButtonBase-root').click()
    
    cy.wait(500)
    cy.get('#create-doctor').click()

    cy.get('#doctor-submit').click();  // click the submit button
    cy.get('#error-name').should('have.text', msg.ERR01);
    cy.get('#error-specialist').should('have.text', msg.ERR02);
    cy.get('#error-days').should('have.text', msg.ERR03);
    cy.get('#error-time-piker').should('have.text', msg.ERR04);
    cy.get('#doctor-cancel').click()
    cy.get('#error-name').should('not.exist');
    cy.get('#error-days').should('not.exist');
    cy.get('#error-time-piker').should('not.exist');
      
    for (let index = 0; index < 10; index++) {

      cy.get('#name').type(faker.name.firstName())
      cy.get('#specialist').type(faker.name.jobTitle())
      cy.get('#tuesday').click()
      cy.get('#startTime0').focus().select("5") // 5 is the value of the time
      cy.wait(500)
      cy.get('#endTime0').focus().select("10") 
      cy.get('#time-add').click()
      cy.get('#startTime1').focus().select("15") 
      cy.wait(500)
      cy.get('#endTime1').focus().select("25") 

      cy.get('#doctor-submit').click()
      cy.wait(1200)
          
    }
  })

})