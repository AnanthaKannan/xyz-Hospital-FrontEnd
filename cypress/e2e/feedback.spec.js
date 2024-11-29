/* eslint-disable no-undef */
/// <reference types="cypress" />
//  the above line used to auto suggestion for cypress
import faker from "faker";

describe("Feedback", () => {
  let feedbackId = null;

  beforeEach(() => {
    cy.setupIntercepts();
  });

  before(() => {
    cy.login();
    cy.get("#feed-back").click();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  // this test case should be first. because @feedback is waiting in the beginning only
  it("Text validation", () => {
    cy.wait("@feedback");
    cy.get("h4").contains("Share your feedback");
  });

  it("All field should be empty", () => {
    cy.get(".ql-editor > p").should("not.have.value");
  });

  it("Add feedback", () => {
    const text = faker.lorem.paragraph();
    cy.get(".ql-editor > p").type(text);
    cy.get(".ql-editor > p").contains(text);
    cy.get("#submit").click();
    cy.wait("@postFeedback");
    cy.get("@postFeedback").then((res) => {
      // eslint-disable-next-line no-underscore-dangle
      feedbackId = res.response.body._id;
    });
    cy.get(".ql-editor > p").should("have.text", "");
    cy.contains("successfully added");
    cy.wait("@feedback");
    cy.contains(text);
  });

  it("Cancel feedback", () => {
    const text = faker.lorem.paragraph();
    cy.get(".ql-editor > p").type(text);
    cy.get(".ql-editor > p").contains(text);
    cy.get("#patient-cancel").click();
    cy.get(".ql-editor > p").should("have.text", "");
  });

  it("Delete feedback", () => {
    cy.setupInterceptsId(feedbackId);

    cy.get("#delete-").click();
    cy.get(".swal2-popup").should("exist");
    cy.get(".swal2-cancel").click();
    cy.get(".swal2-popup").should("not.exist");

    cy.get("#delete-").click();
    cy.get(".swal2-popup").should("exist");
    cy.get(".swal2-confirm").click();
    cy.wait("@updateFeedback");
    cy.contains("successfully deleted");
    cy.get(".swal2-popup").should("not.exist");
  });
});
