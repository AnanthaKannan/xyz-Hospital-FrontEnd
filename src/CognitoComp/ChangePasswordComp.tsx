import React, { useEffect } from 'react'
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { Formik } from 'formik'
import * as Yup from 'yup'
import { SubmitButton } from '../reusable/Button'
import TextBox from '../reusable/TextBox';
import UserPool from '../lib/UserPool';
import { Link } from 'react-router-dom';
import { changePasswordValidation } from '../lib/validationSchema';
import { toast } from 'react-toastify';
import Hb from "../reusable/Hb";

const ChangePasswordComp = () => {

  const onSubmit = (values: any, { setErrors }: any) => {

    const { oldPassword, newPassword } = values;
    const hospitalMailId = localStorage.getItem('hospitalMailId');


    console.log('vlaues', values, hospitalMailId);
    const cognitoUser = new CognitoUser({ Username: hospitalMailId, Pool: UserPool });

    const authenticationData = {
      Username: hospitalMailId,
      Password: oldPassword,
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result: any) => {
        console.log('result', result);
        cognitoUser.changePassword(oldPassword, newPassword, function (err: any, result: any) {
          if (err) {
            console.log('err', err);
            setErrors({ 'newPassword': err.message });
          } else {
            console.log('result', result);
            toast.success('Password changed successfully');
          }
        });
      },
      onFailure: (err: any) => {
        console.log('err', err);
        setErrors({ 'oldPassword': 'Incorrect password' });
      },
    });
  }



  return (
    <div>
      <Hb text="Change Password" />
      <Formik
        initialValues={{ oldPassword: '', newPassword: '', confirmPassword: '' }}
        validationSchema={changePasswordValidation}
        onSubmit={onSubmit}
      >
        {({ values, errors, touched, handleChange, handleSubmit, }) => (
          <form onSubmit={handleSubmit}>
            <div className="row">
              {/* <div className="col-md-4"></div> */}
              <div className="col-md-3">
                <TextBox
                  heading="oldPassword"
                  id="oldPassword"
                  value={values.oldPassword}
                  type="password"
                  onChange={handleChange}
                  errorMsg={touched.oldPassword && errors.oldPassword}
                />
                <br />
              </div>
             

            </div>

            <div className="row">
            {/* <div className="col-md-4"></div> */}
            <div className="col-md-3">
                <TextBox
                heading="New Password"
                id="newPassword"
                type="password"
                value={values.newPassword}
                onChange={handleChange}
                errorMsg={touched.newPassword && errors.newPassword}
              />
              </div>
            </div>

            <div className="row">
            {/* <div className="col-md-4"></div> */}
            <div className="col-md-3"> 
               <TextBox
                heading="Confirm Password"
                id="confirmPassword"
                type="password"
                value={values.confirmPassword}
                onChange={handleChange}
                errorMsg={touched.confirmPassword && errors.confirmPassword}
              />
              </div>
            </div>


            <br />

            <div className="row">
            {/* <div className="col-md-4"></div> */}
              <div className="col-md-3">
              <SubmitButton id='change-password-submit' className='w-100' color='primary' text='Submit' />

              </div>
            </div>
          </form>
        )}
      </Formik>

    </div>
  )
}

export default ChangePasswordComp