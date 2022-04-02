import React, { useEffect } from 'react'
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { Formik } from 'formik'
import * as Yup from 'yup'
import{ SubmitButton, ClickButton } from '../reusable/Button'
import TextBox from '../reusable/TextBox';
import UserPool from '../lib/UserPool';
import { Link } from 'react-router-dom';


const ConfirmationCodeComp = () => {

  const onSubmit = (values:any, { setErrors }:any) => {
    
    const { code } = values;
    const cognitoUser = new CognitoUser({ Username: 'sreeananthakannan@gmail.com', Pool: UserPool });
    cognitoUser.confirmRegistration(code, true, function(err:any, result:any) {
      if (err) {
        console.log('err', err);
        // err NotAuthorizedException: User cannot be confirmed. Current status is CONFIRMED
      }
      console.log('result', result);
    });
  
  }

  const validationSchema = Yup.object().shape({
    code: Yup.string()
      .required('Required')
      .min(3, ' confirmation code not valid')
  });

  const resendCode = () => {
    const cognitoUser = new CognitoUser({ Username: 'sreeananthakannan@gmail.com', Pool: UserPool });
    cognitoUser.resendConfirmationCode(function(err:any, result:any) {
      if (err) {
        console.log('err', err);
        // err InvalidParameterException: User is already confirmed.
      }
      console.log('result', result);
    });
  }

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, errors, touched, handleChange, handleSubmit, }) => (
        <form onSubmit={handleSubmit}>
          <TextBox
          heading="Confirmation code"
          id="code"
          value={values.code}
          onChange={handleChange}
          errorMsg={touched.code && errors.code}
          />
      <br />
      <div className='d-flex justify-content-between'>
        <ClickButton className='w-100' onClick={resendCode} color='primary' text='Resend Code' id='resend-code'/>
        <SubmitButton className='w-100' type="submit" color='primary' text='LOGIN'/>
      </div>
      <div className='d-flex justify-content-between mt-2'>
        <label className='link'> <Link to="/login" /> login</label>
      </div>
      </form>
      )}
    </Formik>
  )
}

export default ConfirmationCodeComp