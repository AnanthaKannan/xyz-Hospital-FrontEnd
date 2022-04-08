import React, { useEffect } from 'react'
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { Formik } from 'formik'
import faker from 'faker';
import * as Yup from 'yup'
import{ SubmitButton } from '../reusable/Button'
import TextBox from '../reusable/TextBox';
import UserPool from '../lib/UserPool';
import { Link, useNavigate } from 'react-router-dom';
import ConfirmationCodeComp from './ConfirmationCodeComp';
import ForgotPasswordComp from './ForgotPasswordComp'
import ChangePassword from './ChangePassword';
import SignUpComp from './SignUpComp';
import LoginBackground from '../reusable/LoginBackground';



const LoginComp = () => {

  const navigate = useNavigate();

  useEffect(() => {
    // localStorage.removeItem('HospitalName')
    // localStorage.removeItem('HospitalMailId')
    // localStorage.removeItem('_hospitalId')
  }, [])

  const onSubmit = (values:any, { setErrors }:any) => {
    
    const { email, password } = values;
    const user = new CognitoUser({ Username: email, Pool: UserPool });
    const authenticationData = { Username: email, Password: password };
    const authenticationDetails = new AuthenticationDetails(authenticationData);
    user.authenticateUser(authenticationDetails, {
      onSuccess: (result:any) => {
        console.log('result', result);
        const idToken = result.idToken.jwtToken;
        const refreshToken = result.refreshToken.token;
        localStorage.setItem('token', idToken);
        localStorage.setItem('HospitalMailId', email);
        localStorage.setItem('_hospitalId', result.idToken.payload.sub);
        navigate('/list-patient')
      },
      onFailure: (err:any) => {
        console.log('err', err);
        console.log('err.message', err.message);
        try{
            if(err.message.includes('User is not confirmed')){
              navigate('/confirmation-code')
            }
        } 
        catch(e){}
        setErrors({ password: 'Invalid email or password' });
      },
      newPasswordRequired: function(userAttributes, requiredAttributes) {
        console.log('userAttributes', userAttributes);
        console.log('requiredAttributes', requiredAttributes);
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
       <LoginBackground title="Login"> 
    <Formik
      initialValues={{ email: 'sreeananthakannan@gmail.com', password: 'Kannan$7500' }}
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
          type='password'
          value={values.password}
          onChange={handleChange}
          errorMsg={touched.password && errors.password}
          />
      <br />
      <SubmitButton className='w-100' type="submit" color='primary' text='LOGIN'/>

      <div className='d-flex justify-content-between mt-2'>
      <Link to="/sing-up">
        <label className='link'>  Not a user? sing up</label>
        </Link>
        <Link to="/forgot-password" > 
        <label className='link'> Forgot password </label>
        </Link>
       
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
  )
}

export default LoginComp