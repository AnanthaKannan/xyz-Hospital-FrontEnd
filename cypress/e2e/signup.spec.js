/* eslint-disable no-undef */
/* eslint-disable testing-library/await-async-utils */
/// <reference types="cypress" /> 
//  the above line used to auto suggestion for cypress
import faker from 'faker';

describe('Signup', () => {

  beforeEach(() => {
    cy.launchPortal();
    cy.get('#signup').click();
  });

  it('Error validation', () => {
    // before click submit the error should not present
    cy.get('#error-email').should('not.exist');
    cy.get('#error-name').should('not.exist');
    cy.get('#error-address').should('not.exist');
    cy.get('#error-phone').should('not.exist');
    cy.get('#error-password').should('not.exist');

    cy.get('#signup-submit').click();  // click the submit button

    cy.get('#error-email').should('have.text', 'Required');
    cy.get('#error-name').should('have.text', 'Required');
    cy.get('#error-address').should('have.text', 'Required');
    cy.get('#error-phone').should('have.text', 'Phone is required');
    cy.get('#error-password').should('have.text', 'Required');
  })

  it('Error validation by submit wrong value', () => {

    cy.get('#email').type('emailId')
    cy.get('#name').type('hos')
    cy.get('#address').type('add')
    cy.get('#phone').type('phone')
    cy.get('#password').type('pass')

    cy.get('#signup-submit').click();  // click the submit button

    cy.get('#error-email').should('have.text', 'Invalid email');
    // cy.get('#error-name').should('have.text', 'Required');
    cy.get('#error-address').should('have.text', 'Password must be at least 6 characters');
    // cy.get('#error-phone').should('have.text', 'Phone is required');
    cy.get('#error-password').should('have.text', 'Password must be at least 6 characters');
  })

  it('Failed signup', () => {
    cy.intercept('POST', 'https://cognito-idp.us-east-1.amazonaws.com/').as('signup')

    cy.get('#email').type(faker.internet.email(undefined, undefined, 'example.com'));
    cy.get('#name').type('test-hospital')
    cy.get('#address').type('test-address')
    cy.get('#phone').type('904214108')
    cy.get('#password').type('test-password')

    cy.get('#signup-submit').click();  // click the submit button
    cy.wait('@signup')

    cy.get('#error-email').should('have.text', 'Password did not conform with policy: Password must have uppercase characters');
    cy.contains('Password did not conform with policy: Password must have uppercase characters');
  })

  it.only('Successfully signup', () => {
    cy.intercept('POST', 'https://cognito-idp.us-east-1.amazonaws.com/', (req) => {
      // mock the response
      req.reply({
        "CodeDeliveryDetails": {
          "AttributeName": "email",
          "DeliveryMedium": "EMAIL", "Destination": "s***@m***"
        },
        "UserConfirmed": false, "UserSub": "1000"
      })
    }).as('signup')

    cy.get('#email').type(faker.internet.email(undefined, undefined, 'example.com'));
    cy.get('#name').type('test-hospital')
    cy.get('#address').type('test-address')
    cy.get('#phone').type('904214108')
    cy.get('#password').type('sree@Password123')

    cy.get('#signup-submit').click();  // click the submit button
    cy.wait('@signup')

    cy.contains('Sign up successful');
    cy.url().should('eq', `${Cypress.config('baseUrl')}/confirmation-code`);
  })
})