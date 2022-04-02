import React, { useEffect } from 'react'
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { Formik } from 'formik'
import * as Yup from 'yup'
import{ SubmitButton, ClickButton } from '../reusable/Button'
import TextBox from '../reusable/TextBox';
import UserPool from '../lib/UserPool';
import { Link } from 'react-router-dom';


const ForgotPasswordComp = () => {

  const onSubmit = (values:any, { setErrors }:any) => {
    
    forgotPassword()
  
  }

  const validationSchema = Yup.object().shape({
    code: Yup.string()
      .required('Required')
      .min(3, ' confirmation code not valid')
  });

  const forgotPassword = () => {
    const cognitoUser = new CognitoUser({ Username: 'sreeananthakannan@gmail.com', Pool: UserPool });
    cognitoUser.forgotPassword({
      onSuccess: function (data:any) {
        console.log('CodeDeliveryData from forgotPassword:' + data);
      },
      onFailure: function (err:any) {
        console.log('error: ' + err);
      },
      // inputVerificationCode() {
      //   const verificationCode = prompt('Please input verification code ' ,'');
      //   const newPassword = prompt('Enter new password ' ,'');
      //   cognitoUser.confirmPassword(verificationCode, newPassword, this);
      // }
    });
  }

  const confirmPassword = (username, verificationCode, newPassword) =>{
    const cognitoUser = new CognitoUser({
        Username: 'sreeananthakannan@gmail.com',
        Pool: UserPool
    });

    return new Promise((resolve, reject) => {
        cognitoUser.confirmPassword(verificationCode, newPassword, {
            onFailure(err) {
                // reject(err);
                console.log('failure', err);
            },
            onSuccess() {
                console.log('success')
            },
        });
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
       
        <SubmitButton className='w-100' type="submit" color='primary' text='Forgot password'/>
      </div>
      <div className='d-flex justify-content-between mt-2'>
        <label className='link'> <Link to="/login" /> login</label>
      </div>
      </form>
      )}
    </Formik>
  )
}

export default ForgotPasswordComp