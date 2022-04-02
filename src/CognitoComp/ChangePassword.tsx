import React, { useEffect } from 'react'
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { Formik } from 'formik'
import * as Yup from 'yup'
import{ SubmitButton } from '../reusable/Button'
import TextBox from '../reusable/TextBox';
import UserPool from '../lib/UserPool';
import { Link } from 'react-router-dom';

const ChangePassword = () => {

  const onSubmit = (values:any, { setErrors }:any) => {
    
    const { oldPassword, newPassword } = values;

    console.log('vlaues', values);
    const cognitoUser = new CognitoUser({ Username: 'sreeananthakannan@gmail.com', Pool: UserPool });

      const authenticationData = {
        Username: 'sreeananthakannan@gmail.com',
        Password: oldPassword,
      };
      const authenticationDetails = new AuthenticationDetails(authenticationData);
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result:any) => {
          console.log('result', result);
          cognitoUser.changePassword(oldPassword, newPassword, function(err:any, result:any) {
            if (err) {
              console.log('err', err);
            }
            console.log('result', result);
          });
        },
        onFailure: (err:any) => {
          console.log('err', err);
        },
      });
  }

  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string()
      .required('Required')
      .min(6, 'Password must be at least 6 characters')
      .max(20, 'Password must be less than 20 characters'),
    newPassword: Yup.string()
      .required('Required')
      .min(6, 'Password must be at least 6 characters')
      .max(20, 'Password must be less than 20 characters')
  });

  return (
    <div>
      
    <Formik
      initialValues={{ oldPassword: '', newPassword: '' }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, errors, touched, handleChange, handleSubmit, }) => (
        <form onSubmit={handleSubmit}>
          <TextBox
          heading="oldPassword"
          id="oldPassword"
          value={values.oldPassword}
          onChange={handleChange}
          errorMsg={touched.oldPassword && errors.oldPassword}
          />
          <br />
          <TextBox
          heading="newPassword"
          id="newPassword"
          value={values.newPassword}
          onChange={handleChange}
          errorMsg={touched.newPassword && errors.newPassword}
          />
      <br />
      <SubmitButton className='w-100' type="submit" color='primary' text='LOGIN'/>
      </form>
      )}
    </Formik>

    </div>
  )
}

export default ChangePassword