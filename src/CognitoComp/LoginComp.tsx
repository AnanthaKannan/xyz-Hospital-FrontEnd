import React, { useEffect } from "react";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SubmitButton } from "../reusable/Button";
import TextBox from "../reusable/TextBox";
import UserPool, { forgotPassword } from "../lib/UserPool";
import LoginBackground from "../reusable/LoginBackground";
import { loginValidation } from "../lib/validationSchema";
import { setStorageDetails } from "../lib";
import { useState } from "react";

const LoginComp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.clear();
  }, []);

  const onSubmit = (values: any, { setErrors }: any) => {
    setLoading(true);
    const { email, password } = values;
    const user = new CognitoUser({ Username: email, Pool: UserPool });
    const authenticationData = { Username: email, Password: password };
    const authenticationDetails = new AuthenticationDetails(authenticationData);
    user.authenticateUser(authenticationDetails, {
      onSuccess: (result: any) => {
        setLoading(false);
        console.log("result", result);
        const idToken = result.idToken.jwtToken;
        // const refreshToken = result.refreshToken.token;
        const { payload } = result.idToken;
        const storageData = {
          token: idToken,
          hospitalMailId: email,
          _hospitalId: payload.sub,
          hospitalName: payload.name,
          hospitalPhone: payload["custom:phone"],
          hospitalAddress: payload["custom:address"],
          hospitalPicture: payload.picture,
        };
        setStorageDetails(storageData);
        navigate("/dashboard");
      },
      onFailure: (err: any) => {
        setLoading(false);
        console.log("err", err);
        console.log("err.message", err.message);
        try {
          if (err.message.includes("User is not confirmed")) {
            navigate("/confirmation-code");
          }
        } catch (e) {
          console.log(e);
        }
        setErrors({ password: err.message });
      },
      newPasswordRequired(userAttributes, requiredAttributes) {
        console.log("userAttributes", userAttributes);
        console.log("requiredAttributes", requiredAttributes);
      },
    });
  };

  const onHandleForgotPassword = (values, setErrors) => {
    console.log("values", values);
    if (!values.email) {
      toast.error("Please enter email");
      setErrors({ email: "Email is required" });
    } else {
      forgotPassword(values.email);
      navigate("/forgot-password", { state: { email: values.email } });
    }
  };

  return (
    <div>
      <LoginBackground title="Login">
        <Formik
          initialValues={{
            email: "sreetest@mailinator.com",
            password: "YNJes$12345",
          }}
          // initialValues={{ email: '', password: '' }}
          validationSchema={loginValidation}
          onSubmit={onSubmit}
        >
          {({ handleSubmit, setErrors, ...parameter }) => (
            <form onSubmit={handleSubmit}>
              <TextBox heading="Email" id="email" parameter={parameter} />
              <br />
              <TextBox
                heading="Password"
                id="password"
                type="password"
                parameter={parameter}
              />
              <br />
              <SubmitButton
                id="login-submit"
                isDisable={loading}
                text={loading ? "Loading..." : "LOGIN"}
                className="w-100"
                color="primary"
              />

              <div className="d-flex justify-content-between mt-2">
                <Link to="/sing-up">
                  <label className="link" id="signup">
                    {" "}
                    Not a user? sing up
                  </label>
                </Link>
                {/* <Link onClick={() =>onHandleForgotPassword(values, setErrors)} to="/" >  */}
                <label
                  className="link mt-1"
                  id="forgot-password"
                  onClick={() =>
                    onHandleForgotPassword(parameter.values, setErrors)
                  }
                >
                  {" "}
                  Forgot password{" "}
                </label>
                {/* </Link> */}
              </div>
            </form>
          )}
        </Formik>
      </LoginBackground>
      {/* <ConfirmationCodeComp />
    <ForgotPasswordComp />
    <ChangePassword /> */}
      {/* <SignUpComp /> */}
    </div>
  );
};

export default LoginComp;
