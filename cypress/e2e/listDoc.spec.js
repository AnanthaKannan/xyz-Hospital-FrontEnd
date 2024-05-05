/* eslint-disable no-undef */
/// <reference types="cypress" />
//  the above line used to auto suggestion for cypress
import { expect } from 'chai';

describe('#List Doctor', () => {
  let [doctorList, docTotalCount] = [[], null];
  before(() => {
    cy.login();
    cy.intercept('GET', `${Cypress.env('apiUrl')}/doctor?limit=10&skip=0`).as('getDoctorList');
    cy.intercept('PUT', `${Cypress.env('apiUrl')}/doctor/*`).as('updateDoctor');
    cy.intercept('GET', `${Cypress.env('apiUrl')}/address`).as('getAddress');
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
    const headers = ['Doctor Id', 'Name', 'Specialist', 'Available Days', 'Available Time', 'Edit', 'Delete'];
    for (let i = 0; i < headers.length; i++) {
      cy.get('.MuiDataGrid-columnHeaderTitle').contains(headers[i])
    }
  });

  it('Should check the total count', () => {
    cy.get('.MuiTablePagination-displayedRows').contains(docTotalCount)
  })

  it('First row values', () => {
    // const firstRow = doctorList[0];
    cy.get('.MuiDataGrid-row--firstVisible > [data-field="id"]').should('exist');
    cy.get('.MuiDataGrid-row--firstVisible > [data-field="name"]').should('exist');
    cy.get('.MuiDataGrid-row--firstVisible > [data-field="specialist"]').should('exist');
    cy.get('.MuiDataGrid-row--firstVisible > [data-field="availableDayConvert"]').should('exist');
    cy.get('.MuiDataGrid-row--firstVisible > [data-field="availableTimeConvert"]').should('exist');
    cy.get('.MuiDataGrid-row--firstVisible > [data-field="edit"]').should('exist');
    cy.get('.MuiDataGrid-row--firstVisible > [data-field="delete"]').should('exist');
  });

  it('Delete the doctor', () => {
    cy.intercept('DELETE', `${Cypress.env('apiUrl')}/doctor/*`).as('deleteDoctor');
    cy.get(':nth-child(1) > :nth-child(8) > .pointer').click();
    cy.get('.swal2-popup').should('exist');
    cy.get('.swal2-confirm').click();
    cy.wait('@deleteDoctor')
    cy.contains('Doctor deleted successfully');
    cy.get('.swal2-popup').should('not.exist');
  });

  it('Should not delete the doctor', () => {
    cy.get(':nth-child(1) > :nth-child(8) > .pointer').click();
    cy.get('.swal2-popup').should('exist');
    cy.get('.swal2-cancel').click();
    cy.get('.swal2-popup').should('not.exist');
  });

  it('Should go to edit page', () => {
    cy.get('.MuiDataGrid-row--firstVisible > [data-field="edit"]').click();
    cy.get('.swal2-popup').should('exist');
    cy.get('.swal2-confirm').click();
    cy.url().should('eq', `${Cypress.config('baseUrl')}/create-doctor`);
    // cy.wait('@getAddress');
    cy.get('#doctor-cancel').click()
    // TODO: submit action need to add. ISSUE in back end 
    // https://github.com/AnanthaKannan/xyzHospital-backend/issues/74
    // cy.wait('@updateDoctor');
    cy.url().should('eq', `${Cypress.config('baseUrl')}/list-doctor`);
  })
});
