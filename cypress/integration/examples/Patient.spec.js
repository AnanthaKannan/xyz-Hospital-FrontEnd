/* eslint-disable no-undef */
/* eslint-disable testing-library/await-async-utils */
/// <reference types="cypress" /> 
//  the above line used to auto suggestion for cypress
import faker from 'faker';

describe('Patient Create', () => {




  before(function(){
    cy.fixture('example').then(function(data){
      this.data = data;
      this.localStoagedata = {}
    });
    cy.visit(Cypress.env('url'));
  });

  function setCookies(localStoagedata){
    // console.log('before', this.localStoagedata);
    
    // if(!this.localStoagedata.token){
    //   this.localStoagedata = { ...localStorage };
    // }

    const data = localStoagedata;
    console.log('storage data', data)
    const storage = window.localStorage;
    for (let key in data) {
      storage.setItem(key, data[key]);
    }
  }


  // beforeEach(() => {
  //   setCookies();
  // })

  // afterEach(() => {
  //   cy.saveLocalStorage();
  // });

  it('With proper user name and password login the page', function(){
    cy.log(this.localStoagedata)
    cy.get('#email').type(this.data.email);
    cy.get('#password').type(this.data.password);
    cy.get('#login-submit').click();
    // setCookies({ ...localStorage });
    cy.wait(5000)
    cy.log({...localStorage})
    this.localStoagedata = { ...localStorage };
    cy.log(this.localStoagedata)
  });

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