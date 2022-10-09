/* eslint-disable no-undef */
/* eslint-disable testing-library/await-async-utils */
/// <reference types="cypress" /> 
//  the above line used to auto suggestion for cypress
import faker from 'faker';
import msg from '.../../../src/lib/msg'

describe('Doctor Create', () => {

  before(() => {
    cy.login();
  })

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });


  it('Doctor validation', () => {
    checkAllFieldsEmpty();
    cy.get('#doctor-submit').click();  // click the submit button
    cy.get('#error-name').should('have.text', msg.ERR01);
    cy.get('#error-specialist').should('have.text', msg.ERR02);

    cy.get('#error-days').should('have.text', msg.ERR03);
    cy.get('#error-time-piker').should('have.text', msg.ERR04);
    cy.get('#doctor-cancel').click()
    cy.get('#error-name').should('not.exist');
    cy.get('#error-days').should('not.exist');
    cy.get('#error-time-piker').should('not.exist');

  })

  it.only('Create Doctor with all the fields', () => {
    cy.get('#name').type(faker.name.firstName())
    cy.get('#specialist').type(faker.name.lastName())
    const gender = ['male', 'female', 'others']
    cy.get('#gender > .css-1s2u09g-control > .css-319lph-ValueContainer > .css-6j8wv5-Input')
      .type(`${gender[faker.random.number(2)]}{enter}{enter}`);
    cy.get('#phone').type(faker.phone.phoneNumber())
    cy.get('#licenseNo').type(faker.finance.account())
    cy.get('#licenseExpiryDate').click().get('.react-datepicker__day--008').click()
    cy.get('#email').type(faker.internet.email())
    cy.get('#alternatePhone').type(faker.phone.phoneNumber())

    // doctor available time
    cy.get('#startTime0').focus().select("5") // 5 is the value of the time
    cy.wait(500)
    cy.get('#endTime0').focus().select("10")
    cy.get('#time-add').click()
    cy.get('#startTime1').focus().select("15")
    cy.wait(500)
    cy.get('#endTime1').focus().select("25")

    // address
    // cy.get('#address').type(faker.address.streetName())
    // cy.get('#country > .css-1s2u09g-control > .css-319lph-ValueContainer > .css-6j8wv5-Input')
    //   .type(`ndia{enter}{enter}`);
    // cy.wait(500)
    // cy.get('#state > .css-1s2u09g-control > .css-319lph-ValueContainer > .css-6j8wv5-Input')
    //   .type(`Tamil Nadu{enter}{enter}`);
    // cy.wait(500)
    // cy.get('#state > .css-1s2u09g-control > .css-319lph-ValueContainer > .css-6j8wv5-Input')
    //   .type(`Chennai{enter}{enter}`);

    // select the days
    for (let index = 0; index < 6; index++) {
      const daysId = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
      cy.get(`#${daysId[faker.random.number({ 'min': 1, 'max': 6 })]}`).click()
    }

    // submit button
    cy.get('#doctor-submit').click()
    cy.wait(1200)
    cy.contains('Doctor created successfully')

    checkAllFieldsEmpty()
  });

  it('Create the doctor with mandatory fields', () => {

  });


  function checkAllFieldsEmpty() {
    // check all the field are cleared
    cy.get('#name').should('have.value', '');
    cy.get('#specialist').should('have.value', '');
    cy.get('#licenseNo').should('have.value', '');
    cy.get('#licenseExpiryDate').should('have.value', '');
    cy.get('#gender > .css-1s2u09g-control > .css-319lph-ValueContainer > .css-6j8wv5-Input').should('have.value', '');
    cy.get('#phone').should('have.value', '');
    cy.get('#email').should('have.value', '');
    cy.get('#alternatePhone').should('have.value', '');

    // select days
    for (let index = 0; index < 6; index++) {
      const daysId = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
      cy.get(`#${daysId[index]}`).should('not.be.checked');
    }

    // address field
    cy.get('#address').should('not.have.value');
    cy.get('#country > .css-1s2u09g-control > .css-319lph-ValueContainer > .css-6j8wv5-Input').should('have.value', '');
    cy.get('#state > .css-1s2u09g-control > .css-319lph-ValueContainer > .css-6j8wv5-Input').should('have.value', '');
    cy.get('#city > .css-1s2u09g-control > .css-319lph-ValueContainer > .css-6j8wv5-Input').should('have.value', '');
    cy.get('#zipCode').should('not.have.value')

    // start time and end time
    cy.get('#endTime0').find('option:selected').should('have.text', '')
    cy.get('#startTime0').find('option:selected').should('have.text', '')
  }

})