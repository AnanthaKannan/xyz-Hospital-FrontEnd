/* eslint-disable no-undef */
/// <reference types="cypress" />
//  the above line used to auto suggestion for cypress
import faker from 'faker';
const common = require('../fixtures/common.json')

describe('Doctor Create', () => {
  before(() => {
    cy.login();
    cy.intercept('GET', `${Cypress.env('apiUrl')}/address`).as('getAddress');
    cy.get('#create-doctor').click();
    cy.wait('@getAddress');
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  function checkAllFieldsEmpty() {
    // check all the field are cleared
    cy.get('#name').should('have.value', '');
    cy.get('#specialist').should('have.value', '');
    cy.get('#licenseNo').should('have.value', '');
    cy.get('#licenseExpiryDate').should('have.value', '');
    cy.get(`#gender > ${common.dropDownCss}`).should('have.value', '');
    cy.get('#phone').should('have.value', '');
    cy.get('#email').should('have.value', '');
    cy.get('#alternatePhone').should('have.value', '');

    // select days
    for (let index = 0; index < 6; index += 1) {
      const daysId = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
      cy.get(`#${daysId[index]}`).should('not.be.checked');
    }

    // address field
    cy.get('#address').should('not.have.value');
    cy.get(`#country > ${common.dropDownCss}`).should('have.value', '');
    cy.get(`#state > ${common.dropDownCss}`).should('have.value', '');
    cy.get(`#city > ${common.dropDownCss}`).should('have.value', '');
    cy.get('#zipCode').should('not.have.value');

    // start time and end time
    cy.get('#endTime0').find('option:selected').should('have.text', '');
    cy.get('#startTime0').find('option:selected').should('have.text', '');
  }

  it('All field should be empty', () => {
    checkAllFieldsEmpty();
  });

  it('total input fields count', () => {
    // get the count of text boxes
    cy.get('input:visible').should('have.length', 13);
    cy.get('select:visible').should('have.length', 2);
    cy.get('input[type=checkbox]').should('have.length', 7);
  });

  it('Doctor validation', () => {
    cy.get('#doctor-submit').click(); // click the submit button
    cy.get('#error-name').should('have.text', 'name is a required field');
    cy.get('#error-specialist').should('have.text', 'specialist is a required field');

    cy.get('#error-days').should('have.text', 'Please select at least one day');
    cy.get('#error-time-piker').should('have.text', 'Please select doctor available time');
    cy.get('#doctor-cancel').click();
    cy.get('#error-name').should('not.exist');
    cy.get('#error-days').should('not.exist');
    cy.get('#error-time-piker').should('not.exist');
  });

  it('License Expiry Date should not be select past dates', () => {
    const todayDate = `00${new Date().getDate()}`;
    cy.get('#licenseExpiryDate').click().get(`.react-datepicker__day--${todayDate.slice(todayDate.length - 3)}`).click({ multiple: true });
    cy.get('#licenseExpiryDate').should('have.value', '');
  });

  it('Create Doctor with all the fields', () => {
    cy.intercept('POST', `${Cypress.env('apiUrl')}/doctor`).as('postCreateDoctor');
    cy.get('#name').type(faker.name.firstName());
    cy.get('#specialist').type(faker.name.lastName());
    const gender = ['male', 'female', 'others'];
    cy.get(`#gender > ${common.dropDownCss}`)
      .type(`${gender[faker.random.number(2)]}{enter}{enter}`);
    cy.get('#phone').type(faker.phone.phoneNumber());
    cy.get('#licenseNo').type(faker.finance.account());
    const tomorrow = `00${new Date(new Date().getTime() + (24 * 60 * 60 * 1000)).getDate()}`;
    cy.get('#licenseExpiryDate').click().get(`.react-datepicker__day--${tomorrow.slice(tomorrow.length - 3)}`).click({ multiple: true });
    cy.get('#email').type(faker.internet.email());
    cy.get('#alternatePhone').type(faker.phone.phoneNumber());

    // address
    cy.address();
    // doctor available time
    cy.get('#startTime0').focus().select('5'); // 5 is the value of the time
    cy.wait(500);
    cy.get('#endTime0').focus().select('10');
    cy.get('#time-add').click();
    cy.get('#startTime1').focus().select('15');
    cy.wait(500);
    cy.get('#endTime1').focus().select('25');

    // select the days
    for (let index = 0; index < 6; index++) {
      const daysId = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
      cy.get(`#${daysId[faker.random.number({ min: 1, max: 6 })]}`).click();
    }

    // submit button
    cy.get('#doctor-submit').click();
    cy.wait('@postCreateDoctor');
    cy.contains('Doctor created successfully');

    checkAllFieldsEmpty();
  });

  it('Create the doctor with mandatory fields', () => {

  });
});
