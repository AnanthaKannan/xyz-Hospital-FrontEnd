/* eslint-disable no-undef */
/* eslint-disable testing-library/await-async-utils */
/// <reference types="cypress" /> 
//  the above line used to auto suggestion for cypress
import faker from 'faker';

describe('#List Doctor', () => {
  before(() => {
    cy.login();
    cy.get('#list-doctor').click()
  })

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it('Header names should be exist', () => {
    const headers = ['Doctor Id', 'Name', 'Specialist', 'Available Days', 'Available Time', 'Record created', 'Update', 'Delete']
    for (let i = 0; i < headers.length; i++) {
      cy.get(`thead > tr > :nth-child(${i + 1})`).contains(headers[i]);
    }
  });
})
