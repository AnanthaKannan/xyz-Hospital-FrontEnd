import React from "react";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import { useNavigate } from "react-router-dom";

import { Formik } from "formik";
import { toast } from "react-toastify";
import { SubmitButton, ClickButton } from "../reusable/Button";
import TextBox from "../reusable/TextBox";
import UserPool from "../lib/UserPool";
import { changePasswordValidation } from "../lib/validationSchema";
import Hb from "../reusable/Hb";

const ChangePasswordComp = () => {
  const navigate = useNavigate();

  const onSubmit = (values: any, { setErrors }: any) => {
    const { oldPassword, newPassword } = values;
    const hospitalMailId = localStorage.getItem("hospitalMailId");

    console.log("vlaues", values, hospitalMailId);
    const cognitoUser = new CognitoUser({
      Username: hospitalMailId,
      Pool: UserPool,
    });

    const authenticationData = {
      Username: hospitalMailId,
      Password: oldPassword,
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result: any) => {
        console.log("result", result);
        cognitoUser.changePassword(
          oldPassword,
          newPassword,
          (err: any, data: any) => {
            if (err) {
              console.log("err", err);
              setErrors({ newPassword: err.message });
            } else {
              console.log("result", data);
              toast.success("Password changed successfully");
              navigate("/");
            }
          }
        );
      },
      onFailure: (err: any) => {
        console.log("err", err);
        setErrors({ oldPassword: "Incorrect password" });
      },
    });
  };

  return (
    <div>
      <Hb text="Change Password" />
      <Formik
        initialValues={{
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        }}
        validationSchema={changePasswordValidation}
        onSubmit={onSubmit}
      >
        {({ handleSubmit, resetForm, ...parameter }) => (
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-3">
                <TextBox
                  heading="oldPassword"
                  id="oldPassword"
                  parameter={parameter}
                  type="password"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-3">
                <TextBox
                  heading="New Password"
                  id="newPassword"
                  type="password"
                  parameter={parameter}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-3">
                <TextBox
                  heading="Confirm Password"
                  id="confirmPassword"
                  type="password"
                  parameter={parameter}
                />
              </div>
            </div>
            <br />

            <div className="row">
              <div className="col-md-1">
                <ClickButton
                  onClick={() => resetForm()}
                  text="Cancel"
                  id="patient-cancel"
                />
              </div>
              <div className="col-md-1" />
              <div className="col-md-1">
                <SubmitButton
                  id="change-password-submit"
                  color="primary"
                  text="Submit"
                />
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default ChangePasswordComp;
