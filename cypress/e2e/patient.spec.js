/* eslint-disable no-undef */
/* eslint-disable testing-library/await-async-utils */
/// <reference types="cypress" /> 
//  the above line used to auto suggestion for cypress
import faker from 'faker';

describe('Patient Create', () => {

  before(() => {
    // cy.login();
    cy.visit('http://localhost:3000/create-doctor');
  })


  it('testcasetest', () => {
    const gender = ['male', 'female']
    cy.get('#country > .css-1s2u09g-control > .css-319lph-ValueContainer > .css-6j8wv5-Input')
      .type(`India{enter}{enter}`);
    cy.wait(500)

    cy.get('#state > .css-1s2u09g-control > .css-319lph-ValueContainer > .css-6j8wv5-Input')
      .type(`Tamil Nadu{enter}{enter}`);
    cy.wait(500)

    cy.get('#state > .css-1s2u09g-control > .css-319lph-ValueContainer > .css-6j8wv5-Input')
      .type(`Chennai{enter}{enter}`);



    // it('works when type on the input element', function () {
    //   cy
    //     .visit('http://jedwatson.github.io/react-select/')
    //     // comparing to OLD VERSION that doesn't work as below comment line
    //     // .get('div.Select-control:first').click()
    //     // the key of the trick is to type on the input element
    //     .get(`div.Select-control input`).first().type('V')
    //     .get('.Select-option:contains(Victoria)')
    //     .click();
    // });


    // cy.get('#gender > .css-1s2u09g-control > .css-319lph-ValueContainer > .css-6j8wv5-Input').should('have.value', '');
  })
  // it('Verify title of the page', function(){
  //   console.log('ourLocalStorage', this.localStoagedata)
  //   // setCookies(this.localStoagedata);

  //   // cy.wait(50000)
  //   // cy.get('#create-patient').click()
  //   // cy.title().should('eq', 'Create Patient');
  // });


  // it('With proper user name and password login the page', () => {
  //   cy.visit('http://localhost:3000/create-patient');
  //   cy.get('#email').clear().type('sreeananthakannan@gmail.com')
  //   cy.get('#password').clear().type('Kannan$7500')
  //   cy.get('.MuiButtonBase-root').click()
  //   cy.wait(500)
  //   cy.get('#create-patient').click()

  //   cy.get('#patient-submit').click();  // click the submit button
  //   cy.get(':nth-child(1) > .mb-3 > .text-danger').should('have.text', 'name is a required field');
  //   cy.get(':nth-child(2) > .mb-3 > .text-danger').should('have.text', 'Email is required');
  //   cy.get(':nth-child(4) > .mb-3 > .text-danger').should('have.text', 'Age is required');
  //   cy.get(':nth-child(5) > .mb-3 > .text-danger').should('have.text', 'Phone is required');
  //   cy.get('#patient-cancel').click()
  //   cy.get(':nth-child(1) > .mb-3 > .text-danger').should('not.exist');
  //   cy.get(':nth-child(2) > .mb-3 > .text-danger').should('not.exist');
  //   cy.get(':nth-child(4) > .mb-3 > .text-danger').should('not.exist');
  //   cy.get(':nth-child(5) > .mb-3 > .text-danger').should('not.exist');

  //   for (let index = 0; index < 20; index++) {

  //     cy.get('#name').type(faker.name.firstName())
  //     cy.get('#email').type(faker.internet.email())
  //     cy.get('#age').type(faker.random.number())
  //     cy.get('#phone').type(faker.phone.phoneNumber())
  //     cy.get('.react-datepicker__input-container > .form-control').focus();
  //     cy.get('.react-datepicker__day--015').click();
  //     cy.get('#patient-submit').click()
  //     cy.wait(200)

  //   }
  // })

})