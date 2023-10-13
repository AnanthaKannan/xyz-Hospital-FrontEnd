/* eslint-disable no-undef */
/// <reference types="cypress" />
//  the above line used to auto suggestion for cypress
import { expect } from 'chai';

describe('#List Doctor', () => {
  let [doctorList, docTotalCount] = [[], null];
  before(() => {
    cy.login();
    cy.intercept('GET', `${Cypress.env('apiUrl')}/doctor?limit=10&skip=0`).as('getDoctorList');
    cy.get('#list-doctor').click();
    cy.wait('@getDoctorList');
    cy.get('@getDoctorList').then((xhr) => {
      const { statusCode, body, headers } = xhr.response;
      expect(statusCode).to.equal(200);
      doctorList = body;
      docTotalCount = Number(headers['x-total-count']);
    });
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it('Table column names should be exist', () => {
    const headers = ['Doctor Id', 'Name', 'Specialist', 'Available Days', 'Available Time', 'Record created', 'Update', 'Delete'];
    for (let i = 0; i < headers.length; i++) {
      cy.get(`thead > tr > :nth-child(${i + 1})`).contains(headers[i]);
    }
  });

  it('Doctor total count', () => {
    if (docTotalCount > 10) cy.get('#totalCount').contains(`Total Records ${docTotalCount}`);
    else cy.get('#totalCount').should('not.exist');
  });

  it('First row values', () => {
    const firstRow = doctorList[0];

    cy.get('tbody > :nth-child(1) > th').contains(firstRow.id);
    cy.get('tbody > :nth-child(1) > :nth-child(2)').contains(firstRow.name);
    cy.get('tbody > :nth-child(1) > :nth-child(3)').contains(firstRow.specialist);
    cy.get('tbody > :nth-child(1) > :nth-child(4)').should('exist');
    cy.get('tbody > :nth-child(1) > :nth-child(5)').should('exist');
    cy.get('tbody > :nth-child(1) > :nth-child(6)').should('exist');
    cy.get('tbody > :nth-child(1) > :nth-child(7)').should('exist');
    cy.get('tbody > :nth-child(1) > :nth-child(8)').should('exist');
  });

  it('Delete the doctor', () => {
    cy.get(':nth-child(1) > :nth-child(8) > .pointer').click();
    cy.get('.swal2-popup').should('exist');
    cy.get('.swal2-confirm').click();
    cy.contains('Doctor deleted successfully');
    cy.get('.swal2-popup').should('not.exist');
  });

  it('Should not delete the doctor', () => {
    cy.get(':nth-child(1) > :nth-child(8) > .pointer').click();
    cy.get('.swal2-popup').should('exist');
    cy.get('.swal2-cancel').click();
    cy.get('.swal2-popup').should('not.exist');
  });
});
