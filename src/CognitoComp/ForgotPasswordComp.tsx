/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { Formik } from 'formik';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { SubmitButton } from '../reusable/Button';
import TextBox from '../reusable/TextBox';
import UserPool, { forgotPassword } from '../lib/UserPool';
import LoginBackground from '../reusable/LoginBackground';
import { forgotPasswordValidation } from '../lib/validationSchema';

const ForgotPasswordComp = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const state: any = location.state;
    if (!state && !state.email) {
      navigate('/login');
    }
  }, [location.state, navigate]);

  const onSubmit = (values: any) => {
    console.log(values);
    const cognitoUser = new CognitoUser({
      Username: location.state.email,
      Pool: UserPool,
    });

    cognitoUser.confirmPassword(values.code, values.password, {
      onFailure(err) {
        toast.error(err.message);
        console.log('failure', err);
      },
      onSuccess() {
        console.log('success');
        toast.success('Password changed successfully');
        navigate('/login');
      },
    });
  };

  return (
    <LoginBackground title="Forgot Password">

      <Formik
        initialValues={{ code: '', password: '', confirmPassword: '' }}
        validationSchema={forgotPasswordValidation}
        onSubmit={onSubmit}
      >
        {({ handleSubmit, ...parameter }) => (
          <form onSubmit={handleSubmit}>
            <TextBox
              heading="Confirmation code"
              id="code"
              parameter={parameter}
            />
            <TextBox
              heading="New Password"
              id="password"
              type="password"
              parameter={parameter}
            />
            <TextBox
              heading="Re-enter Password"
              id="confirmPassword"
              type="password"
              parameter={parameter}
            />
            <label className='mb-2 send-code'> Resend Verification code : 
             <label className='link' onClick={() => forgotPassword(location.state.email)} > SEND </label> </label>
            <div className="d-flex justify-content-between">
              <SubmitButton id="forgot-password-submit" className="w-100" color="primary" text="Submit" />
            </div>
          </form>
        )}
      </Formik>

      <div className="d-flex justify-content-between mt-2">
        <Link to="/login">
          <label className="link"> Already Have a account? Login</label>
        </Link>
        {/* <Link to="/sing-up" >
        <label className='link'> Not a user? sing up</label>
        </Link> */}
      </div>
    </LoginBackground>
  );
};

export default ForgotPasswordComp;
