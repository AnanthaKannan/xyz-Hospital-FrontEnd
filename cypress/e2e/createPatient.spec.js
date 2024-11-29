/* eslint-disable no-undef */
/// <reference types="cypress" />
//  the above line used to auto suggestion for cypress
import faker, { random } from "faker";
const common = require("../fixtures/common.json");

describe("Patient Create", () => {
  before(() => {
    cy.login();
    cy.get("#create-patient").click();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.setupIntercepts();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  function checkAllFieldsEmpty() {
    // check all the field are cleared
    cy.get("#firstName").should("have.value", "");
    cy.get("#middleName").should("have.value", "");
    cy.get("#lastName").should("have.value", "");
    cy.get(`#gender > ${common.dropDownCss}`).should("have.value", "");

    cy.get("#dob").should("have.value", "");
    cy.get("#age").should("have.value", "");
    cy.get("#phone").should("have.value", "");
    cy.get("#email").should("have.value", "");

    cy.get("#aadhaarNumber").should("have.value", "");
    cy.get(`#martialStatus > ${common.dropDownCss}`).should("have.value", "");
    cy.get("#occupation").should("have.value", "");
    cy.get("#idenityNo").should("have.value", "");

    // address field
    cy.get("#address").should("not.have.value");
    cy.get(`#country > ${common.dropDownCss}`).should("have.value", "");
    cy.get(`#state > ${common.dropDownCss}`).should("have.value", "");
    cy.get(`#city > ${common.dropDownCss}`).should("have.value", "");
    cy.get("#zipCode").should("not.have.value");
  }

  it("All field should be empty", () => {
    cy.wait("@getCountry");
    checkAllFieldsEmpty();
  });

  it("total input fields count", () => {
    // get the count of text boxes
    cy.get("input:visible").should("have.length", 17);
  });

  it("Patient validation", () => {
    cy.get("#patient-submit").click(); // click the submit button

    cy.get("#error-firstName").should(
      "have.text",
      "firstName is a required field"
    );
    cy.get("#error-gender").should("have.text", "gender is a required field");

    cy.get("#error-dob").should("have.text", "Date of birth is required");
    cy.get("#error-phone").should("have.text", "Phone is required");
    cy.get("#error-martialStatus").should(
      "have.text",
      "Martial status is required"
    );
    cy.get("#error-address").should("have.text", "address is a required field");
    cy.get("#error-country").should("have.text", "country is a required field");
    cy.get("#error-state").should("have.text", "state is a required field");
    cy.get("#error-city").should("have.text", "city is a required field");

    cy.get("#patient-cancel").click(); // click the cancel button
    cy.get("#error-firstName").should("not.exist");
    cy.get("#error-gender").should("not.exist");

    cy.get("#error-dob").should("not.exist");
    cy.get("#error-phone").should("not.exist");
    cy.get("#error-martialStatus").should("not.exist");
    cy.get("#error-address").should("not.exist");
    cy.get("#error-country").should("not.exist");
    cy.get("#error-state").should("not.exist");
    cy.get("#error-city").should("not.exist");
  });

  describe("Aaadhaar number validation", () => {
    beforeEach(() => {
      cy.get("#patient-cancel").click();
    });

    it("should show the error message with invalid Aadhaar Number", () => {
      cy.get("#aadhaarNumber").type("12121");
      cy.get("#patient-submit").click();
      cy.get("#error-aadhaarNumber").should(
        "have.text",
        "Aadhaar number must be at least 12 characters"
      );
    });

    it("should not allow characters", () => {
      cy.get("#aadhaarNumber").type("abcdefgh");
      cy.get("#aadhaarNumber").should("have.text", "");
    });

    it("should allow only numbers", () => {
      cy.get("#aadhaarNumber").type("abcd111111fish");
      cy.get("#aadhaarNumber").should("have.value", "111111");
    });
  });

  describe("Phone number validation", () => {
    beforeEach(() => {
      cy.get("#patient-cancel").click();
    });

    it("should not allow characters", () => {
      cy.get("#phone").type("abcdefgh");
      cy.get("#phone").should("have.text", "");
    });

    it("should allow only numbers", () => {
      cy.get("#phone").type("abcd111111fish");
      cy.get("#phone").should("have.value", "111111");
    });
  });

  const getYearAndMonth = () => {
    const { number } = random;
    const date = number({ min: 10, max: 28 });
    const month = number({ min: 0, max: 11 });
    const year = number({ min: 1970, max: new Date().getFullYear() - 1 });
    return `${date}/${month}/${year}`;
  };

  it("Text contain validation", () => {
    cy.contains("Patient Registration");
    cy.contains("First Name");
    cy.contains("Middle Name");
    cy.contains("Last Name");
    cy.contains("Gender");
    cy.contains("Date Of Birth");
    cy.contains("Age");
    cy.contains("Phone");
    cy.contains("Email Id");
    cy.contains("Aadhaar Number");
    cy.contains("Martial status");
    cy.contains("Occupation");
    cy.contains("Idenity No");
    cy.contains("Address (House No.)");
    cy.contains("Country");
    cy.contains("State");
    cy.contains("City");
    cy.contains("Pin code");
  });

  it("Create Patient with all the fields", () => {
    cy.get("#firstName").type(faker.name.firstName());
    cy.get("#middleName").type(faker.name.firstName());
    cy.get("#lastName").type(faker.name.lastName());
    cy.gender(`#gender > ${common.dropDownCss}`);

    cy.get("#dob").type(getYearAndMonth());
    cy.get("#phone").type(faker.phone.phoneNumber());
    cy.get("#email").type(faker.internet.email());

    cy.get("#aadhaarNumber").type(
      faker.random.number({ min: 1000000000000, max: 9999999999999 })
    );
    cy.get(`#martialStatus > ${common.dropDownCss}`).type(
      "single{enter}{enter}"
    );
    cy.get("#occupation").type(faker.name.firstName());
    cy.get("#idenityNo").type(faker.name.firstName());

    // address
    cy.address();

    // submit button
    cy.get("#patient-submit").click();
    cy.wait("@postCreatePatient");
    cy.contains("Patient created successfully");
    cy.get(".Toastify__close-button").click();
    checkAllFieldsEmpty();
  });

  it("Create the Patient with mandatory fields", () => {
    cy.get("#firstName").type(faker.name.firstName());
    cy.gender(`#gender > ${common.dropDownCss}`);

    cy.get("#dob").type(getYearAndMonth());
    cy.contains("Phone");
    cy.get("#phone").type(faker.phone.phoneNumber());

    cy.contains("Martial status");
    cy.get(`#martialStatus > ${common.dropDownCss}`).type(
      "single{enter}{enter}"
    );

    // address
    cy.address(false);

    // submit button
    cy.get("#patient-submit").click();
    cy.wait("@postCreatePatient");
    cy.contains("Patient created successfully");

    checkAllFieldsEmpty();
  });
});
