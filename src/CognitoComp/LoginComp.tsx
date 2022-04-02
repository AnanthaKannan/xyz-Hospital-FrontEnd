import React, { useEffect } from 'react'
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { Formik } from 'formik'
import * as Yup from 'yup'
import{ SubmitButton } from '../reusable/Button'
import TextBox from '../reusable/TextBox';
import UserPool from '../lib/UserPool';
import { Link } from 'react-router-dom';
import ConfirmationCodeComp from './ConfirmationCodeComp';
import ForgotPasswordComp from './ForgotPasswordComp'
import ChangePassword from './ChangePassword';
import SignUpComp from './SignUpComp';
import LoginBackground from '../reusable/LoginBackground';


const LoginComp = () => {

  useEffect(() => {
    // singOut()
  }, [])

  const onSubmit = (values:any, { setErrors }:any) => {
    
    const { email, password } = values;
    const user = new CognitoUser({ Username: email, Pool: UserPool });
    const authenticationData = { Username: email, Password: password };
    const authenticationDetails = new AuthenticationDetails(authenticationData);
    console.log('eeeeeeeeeeeeeee')
    user.authenticateUser(authenticationDetails, {
      onSuccess: (result:any) => {
        console.log('result', result);
        const idToken = result.idToken.jwtToken;
        const refreshToken = result.refreshToken.token;
        localStorage.setItem('token', idToken);
        // history.push('/')
      },
      onFailure: (err:any) => {
        console.log('err', err);
        console.log('err.message', err.message);
        setErrors({ password: 'Invalid email or password' });
      },
      newPasswordRequired: function(userAttributes, requiredAttributes) {
        // User was signed up by an admin and must provide new
        // password and required attributes, if any, to complete
        // authentication.
        console.log('userAttributes', userAttributes);
        console.log('requiredAttributes', requiredAttributes);
        // the api doesn't accept this field back
        // delete userAttributes.email_verified;

        // store userAttributes on global variable
        // sessionUserAttributes = userAttributes;
    }
    });

  }

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .required('Required'),
    password: Yup.string()
      .required('Required')
      .min(6, 'Password must be at least 6 characters')
      .max(20, 'Password must be less than 20 characters')
  });

  return (
    <div>
       <LoginBackground />
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, errors, touched, handleChange, handleSubmit, }) => (
        <form onSubmit={handleSubmit}>
          <TextBox
          heading="Email"
          id="email"
          value={values.email}
          onChange={handleChange}
          errorMsg={touched.email && errors.email}
          />
          <br />
          <TextBox
          heading="Password"
          id="password"
          value={values.password}
          onChange={handleChange}
          errorMsg={touched.password && errors.password}
          />
      <br />
      <SubmitButton className='w-100' type="submit" color='primary' text='LOGIN'/>

      <div className='d-flex justify-content-between mt-2'>
        <label className='link'> <Link to="/sing-up" /> Not a user? sing up</label>
        <label className='link'> <Link to="/forgot-password" /> Forgot password </label>
       
      </div>
      </form>
      )}
    </Formik>

    {/* <ConfirmationCodeComp />
    <ForgotPasswordComp />
    <ChangePassword /> */}

    <SignUpComp />
   

    </div>
  )
}

export default LoginComp