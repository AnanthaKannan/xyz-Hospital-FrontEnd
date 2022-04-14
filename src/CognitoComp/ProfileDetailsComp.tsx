import React, { useEffect } from 'react'
import { Formik } from 'formik'
import { SubmitButton } from '../reusable/Button'
import TextBox from '../reusable/TextBox';
import UserPool from '../lib/UserPool'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { profileDetailsValidation } from '../lib/validationSchema';
import { CognitoUser, CognitoUserAttribute, AuthenticationDetails } from 'amazon-cognito-identity-js';

const ProfileDetailsComp = () => {

  const navigate = useNavigate();

  const onSubmit = (values: any, { setErrors }: any) => {
    // console.log('values', values);
    var attributeList = [];
    var attributeObj = {
      Name: 'nickname',
      Value: 'joe',
    };
    var attribute = new CognitoUserAttribute(attributeObj);
    attributeList.push(attribute);
    
    console.log('attributeList', attributeList)

    values = {
      email: "sreeananthakannan@gmail.com",
      password: "Kannan$7500",
    }

    const { email, password } = values;
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: UserPool
    });

    
    const authDetails = new AuthenticationDetails({
      Username: email,
      Password : password,
    })
    cognitoUser.authenticateUser(authDetails, {
      onSuccess: () => {
        console.log("User authenticated")
        
      },
      onFailure: (error) => {
        console.log("An error happened")
      },
    })
    
    // cognitoUser.deleteAttributes(['nickname'], function(err, result) {
    //   if (err) {
    //     alert(err.message || JSON.stringify(err));
    //     return;
    //   }
    //   console.log('call result: ' + result);
    // });
    // cognitoUser.updateAttributes(attributeList, function(err, result) {
    //   if (err) {
    //     // alert(err.message || JSON.stringify(err));
    //     console.log(err.message || JSON.stringify(err))
    //     return;
    //   }
    //   console.log('call result: ' + result);
    // });

  }

  return (
    <div>
      <Formik
        initialValues={{ email: localStorage.getItem('hospitalMailId'), name: '', imgUrl: '' }}
        validationSchema={profileDetailsValidation}
        onSubmit={onSubmit}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <TextBox
              heading="Email"
              id="email"
              readOnly={true}
              value={values.email}
              onChange={handleChange}
              errorMsg={touched.email && errors.email}
            />

            <br />

            <TextBox
              heading="Name"
              id="name"
              value={values.name}
              onChange={handleChange}
              errorMsg={touched.name && errors.name}
            />

            <br />

            <TextBox
              heading="Logo"
              id="imgUrl"
              value={values.imgUrl}
              onChange={handleChange}
              errorMsg={touched.imgUrl && errors.imgUrl}
            />

            <br />
            <SubmitButton id='signup-submit' className='w-100' color='primary' text='Update' />

          </form>
        )}
      </Formik>
    </div>
  )
}

export default ProfileDetailsComp