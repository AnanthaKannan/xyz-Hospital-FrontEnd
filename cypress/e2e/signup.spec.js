/* eslint-disable no-undef */
/// <reference types="cypress" />
//  the above line used to auto suggestion for cypress
import faker from "faker";

describe("Signup", () => {
  beforeEach(() => {
    cy.launchPortal();
    cy.get("#signup").click();
  });

  it("Error validation", () => {
    // before click submit the error should not present
    cy.get("#error-email").should("not.exist");
    cy.get("#error-name").should("not.exist");
    cy.get("#error-address").should("not.exist");
    cy.get("#error-phone_number").should("not.exist");
    cy.get("#error-password").should("not.exist");

    cy.get("#signup-submit").click(); // click the submit button

    cy.get("#error-email").should("have.text", "Required");
    cy.get("#error-name").should("have.text", "Required");
    cy.get("#error-address").should("have.text", "Required");
    cy.get("#error-phone_number").should("have.text", "Phone is required");
    cy.get("#error-password").should("have.text", "Required");
  });

  it("Error validation by submit wrong value", () => {
    cy.get("#email").type("emailId");
    cy.get("#name").type("ho");
    cy.get("#address").type("add");
    cy.get("#phone_number").type("1234");
    cy.get("#password").type("pass");

    cy.get("#signup-submit").click(); // click the submit button

    cy.get("#error-email").should("have.text", "Invalid email");
    cy.get("#error-name").should(
      "have.text",
      "Name must be at least 6 characters"
    );
    cy.get("#error-address").should(
      "have.text",
      "Address must be at least 6 characters"
    );
    cy.get("#error-phone_number").should(
      "have.text",
      "Phone Number must be at least 6 digit"
    );
    cy.get("#error-password").should(
      "have.text",
      "Password must be at least 6 characters"
    );
  });

  it("Failed signup", () => {
    const errorMessage = "Invalid phone number format.";
    cy.intercept(
      "POST",
      "https://cognito-idp.us-east-1.amazonaws.com/",
      (req) => {
        req.reply({
          statusCode: 400,
          body: {
            __type: "InvalidParameterException",
            message: errorMessage,
          },
        });
      }
    ).as("signup");

    cy.get("#email").type(
      faker.internet.email(undefined, undefined, "example.com")
    );
    cy.get("#name").type("test-hospital");
    cy.get("#address").type("test-address");
    cy.get("#phone_number").type("9042141081212");
    cy.get("#password").type("Ty@mM12354");

    cy.get("#signup-submit").click(); // click the submit button
    cy.wait("@signup");

    cy.get("#error-address").should("have.text", errorMessage);
    cy.contains(errorMessage);
  });

  it("Successfully signup", () => {
    cy.intercept(
      "POST",
      "https://cognito-idp.us-east-1.amazonaws.com/",
      (req) => {
        // mock the response
        req.reply({
          CodeDeliveryDetails: {
            AttributeName: "email",
            DeliveryMedium: "EMAIL",
            Destination: "s***@m***",
          },
          UserConfirmed: false,
          UserSub: "1000",
        });
      }
    ).as("signup");

    cy.get("#email").type(
      faker.internet.email(undefined, undefined, "example.com")
    );
    cy.get("#name").type("test-hospital");
    cy.get("#address").type("test-address");
    cy.get("#phone_number").type("904214108");
    cy.get("#password").type("sree@Password123");

    cy.get("#signup-submit").click(); // click the submit button
    cy.wait("@signup");

    cy.contains("Sign up successful");
    cy.url().should("eq", `${Cypress.config("baseUrl")}/confirmation-code`);
  });
});

describe("Confirmation", () => {
  beforeEach(() => {
    cy.launchPortal();
    cy.get("#signup").click();
    cy.get("#confirmation-code").click();
  });

  it("Error validation", () => {
    cy.get("#error-email").should("not.exist");
    cy.get("#error-code").should("not.exist");

    cy.get("#confirmation-code-submit").click(); // click the submit button

    cy.get("#error-email").should("have.text", "Required");
    cy.get("#error-code").should("have.text", "Required");
  });

  it("Error validation by submit wrong value", () => {
    cy.get("#email").type("emailId");
    cy.get("#code").type("12");

    cy.get("#confirmation-code-submit").click(); // click the submit button

    cy.get("#error-email").should("have.text", "Invalid email");
    cy.get("#error-code").should("have.text", "Invalid code");
  });

  it("Failed with not found email Id", () => {
    cy.intercept(
      "POST",
      "https://cognito-idp.us-east-1.amazonaws.com/",
      (req) => {
        req.reply({
          statusCode: 400,
          body: {
            __type: "UserNotFoundException",
            message: "Username/client id combination not found",
          },
        });
      }
    ).as("callCode");

    cy.get("#email").type(
      faker.internet.email(undefined, undefined, "example.com")
    );
    cy.get("#code").type("12345");

    cy.get("#confirmation-code-submit").click(); // click the submit button
    cy.wait("@callCode");

    cy.get("#error-email").should("have.text", "Email is not valid");
  });

  it("Failed with Invalid verification", () => {
    cy.intercept(
      "POST",
      "https://cognito-idp.us-east-1.amazonaws.com/",
      (req) => {
        req.reply({
          statusCode: 400,
          body: {
            __type: "UserNotFoundException",
            message: "Invalid verification code provided",
          },
        });
      }
    ).as("callCodeSubmit");

    cy.get("#email").type(
      faker.internet.email(undefined, undefined, "example.com")
    );
    cy.get("#code").type("12345");

    cy.get("#confirmation-code-submit").click(); // click the submit button
    cy.wait("@callCodeSubmit");

    cy.get("#error-code").should("have.text", "Code is not valid");
  });

  it("Sucess code submission", () => {
    cy.intercept(
      "POST",
      "https://cognito-idp.us-east-1.amazonaws.com/",
      (req) => {
        req.reply({});
      }
    ).as("callCodeSubmit");

    cy.get("#email").type(
      faker.internet.email(undefined, undefined, "example.com")
    );
    cy.get("#code").type("12345");

    cy.get("#confirmation-code-submit").click(); // click the submit button
    cy.wait("@callCodeSubmit");
    cy.contains("Successfully confirmed");
  });
});

describe("ForgotPassword", () => {
  describe("ForgotPasswordFailed", () => {
    beforeEach(() => {
      cy.launchPortal();
    });

    it("Should fail with out emailId", () => {
      cy.get("#email").clear();
      cy.get("#forgot-password").click();
      cy.contains("Please enter email");
    });

    it("Should fail with wrong email Id", () => {
      const message = "Invalid verification code provided, please try again.";
      cy.intercept(
        "POST",
        "https://cognito-idp.us-east-1.amazonaws.com/",
        (req) => {
          req.reply({
            statusCode: 400,
            body: { __type: "CodeMismatchException", message: message },
          });
        }
      ).as("callCode");

      cy.get("#forgot-password").click();
      cy.wait("@callCode");
      cy.contains(message);
    });
  });

  describe("ForgotPasswordAllScenario", () => {
    beforeEach(() => {
      cy.launchPortal();
      cy.intercept(
        "POST",
        "https://cognito-idp.us-east-1.amazonaws.com/",
        (req) => {
          req.reply({
            statusCode: 200,
            body: {
              CodeDeliveryDetails: {
                AttributeName: "email",
                DeliveryMedium: "EMAIL",
                Destination: "s***@m***",
              },
            },
          });
        }
      ).as("requestedCode");
      cy.get("#forgot-password").click();
      cy.wait("@requestedCode");
      cy.contains("Verification Code has been sent to your email");
    });

    it("Error validation", () => {
      cy.get("#error-code").should("not.exist");
      cy.get("#error-password").should("not.exist");
      cy.get("#error-confirmPassword").should("not.exist");

      cy.get("#forgot-password-submit").click(); // click the submit button

      cy.get("#error-code").should("have.text", "Required");
      cy.get("#error-password").should("have.text", "Required");
      cy.get("#error-confirmPassword").should("have.text", "Required");
    });

    it("Error validation by submit wrong value", () => {
      cy.get("#code").type("12");
      cy.get("#password").type("password");
      cy.get("#confirmPassword").type("123");

      cy.get("#forgot-password-submit").click(); // click the submit button

      cy.get("#error-code").should("have.text", "confirmation code not valid");
      cy.get("#error-password").should(
        "have.text",
        "Password must contain at least one number, one lowercase letter, one uppercase letter, and one special character"
      );
      cy.get("#error-confirmPassword").should(
        "have.text",
        "Passwords must match"
      );
    });

    it("Failed with Invalid verification code", () => {
      const message = "Invalid verification code provided, please try again.";
      cy.intercept(
        "POST",
        "https://cognito-idp.us-east-1.amazonaws.com/",
        (req) => {
          req.reply({
            statusCode: 400,
            body: { __type: "CodeMismatchException", message: message },
          });
        }
      ).as("callCodeFail");

      cy.get("#code").type("12345");
      cy.get("#password").type("Qwed$1209");
      cy.get("#confirmPassword").type("Qwed$1209");

      cy.get("#forgot-password-submit").click(); // click the submit button
      cy.wait("@callCodeFail");
      cy.contains(message);
    });

    it("Resent code", () => {
      cy.intercept(
        "POST",
        "https://cognito-idp.us-east-1.amazonaws.com/",
        (req) => {
          req.reply({});
        }
      ).as("callCode");

      cy.get("#code").type("12345");
      cy.get("#password").type("Qwed$1209");
      cy.get("#confirmPassword").type("Qwed$1209");

      cy.get("#forgot-password-submit").click(); // click the submit button
      cy.wait("@callCode");
      cy.contains("Verification Code has been sent to your email");
    });

    it("Sucess code submission", () => {
      cy.intercept(
        "POST",
        "https://cognito-idp.us-east-1.amazonaws.com/",
        (req) => {
          req.reply({});
        }
      ).as("callCodeSubmit");

      cy.get("#code").type("12345");
      cy.get("#password").type("Qwed$1209");
      cy.get("#confirmPassword").type("Qwed$1209");

      cy.get("#forgot-password-submit").click(); // click the submit button
      cy.wait("@callCodeSubmit");

      cy.contains("Password changed successfully");
    });
  });
});
