/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Link } from 'react-router-dom';
import LoginBackground from '../reusable/LoginBackground';
import SignUpForm from './SignUpForm';

const SignUpComp = () => (
  <div>
    <LoginBackground classNameA='col-md-6' classNameB='col-md-5' title="Sign Up">
      <SignUpForm isSignUp={true} />
      <div className="d-flex justify-content-between mt-2">
        <Link to="/login">
          <label className="link" id="login"> Already Have a account? Login</label>
        </Link>
        <Link to="/confirmation-code">
          <label className="link" id="confirmation-code"> Already Sign up? code </label>
        </Link>
      </div>
    </LoginBackground>
  </div>
);

export default SignUpComp;
