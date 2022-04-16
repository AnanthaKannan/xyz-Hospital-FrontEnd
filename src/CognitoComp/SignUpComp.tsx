import React, { useEffect } from 'react'
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { Formik } from 'formik'
import * as Yup from 'yup'
import{ SubmitButton } from '../reusable/Button'
import TextBox from '../reusable/TextBox';
import UserPool from '../lib/UserPool'
import LoginBackground from '../reusable/LoginBackground';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { signUpValidation } from '../lib/validationSchema';
import SignUpForm  from './SignUpForm'

const SignUpComp = () => {

  const navigate = useNavigate();

  const onSubmit = (values:any, { setErrors }:any) => {
    console.log('values', values);
    
    const { email, password } = values;
    UserPool.signUp(email, password, [], null, (err:any, result:any) => {
      if (err) {
        console.log('err', err);
        setErrors({ email: err.message });
        }
        else
          console.log('result', result);
          toast.success('Sign up successful');
          navigate('/confirmation-code')
      });

  }

  return (
    <div>
    <LoginBackground title={'Sign Up'}>
      <SignUpForm isSignUp={true} />
    {/* <Formik
      initialValues={{ email: '', password: '', confirmPassword: '' }}
      validationSchema={signUpValidation}
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
          <TextBox
          heading="Re-enter Password"
          id="confirmPassword"
          value={values.confirmPassword}
          onChange={handleChange}
          errorMsg={touched.confirmPassword && errors.confirmPassword}
          />
      <br />
      <SubmitButton id='signup-submit' className='w-100' color='primary' text='Sing up'/>

      


      </form>
      )}
    </Formik> */}
    <div className='d-flex justify-content-between mt-2'>
      <Link to="/login">
        <label className='link'> Already Have a account? Login</label>
        </Link>
        <Link to="/forgot-password" > 
        <label className='link'> Forgot password </label>
        </Link>
       
      </div>
    </LoginBackground >
    </div>
  )
}

export default SignUpComp