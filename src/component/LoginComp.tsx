import React, { useEffect } from 'react'
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { Formik } from 'formik'
import * as Yup from 'yup'
import{ SubmitButton } from '../reusable/Button'
import TextBox from '../reusable/TextBox';
import UserPool from '../lib/UserPool'


const LoginComp = () => {

  useEffect(() => {
    // singOut()
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
        // history.push('/')
      },
      onFailure: (err:any) => {
        console.log('err', err);
        console.log('err.message', err.message);
        setErrors({ password: 'Invalid email or password' });
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
      </form>
      )}
    </Formik>
  )
}

export default LoginComp