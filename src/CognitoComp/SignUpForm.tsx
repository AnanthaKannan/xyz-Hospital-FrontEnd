import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { CognitoUser, CognitoUserAttribute, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { profileDetailsType, localStorageType } from '@type/type';

import { SubmitButton } from '../reusable/Button';
import TextBox from '../reusable/TextBox';
import UserPool from '../lib/UserPool';
import { profileDetailsValidation } from '../lib/validationSchema';
import { getStorageDetails, setStorageDetails, onlyNumbers } from '../lib';

const initValues: profileDetailsType = {
  email: '',
  name: '',
  picture: '',
  phone_number: '',
  address: '',
  password: '',
};

const SignUpForm = ({ isSignUp }) => {
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(initValues);

  useEffect(() => {
    const storageObj: localStorageType = getStorageDetails();
    const updatedInitialValue = {
      address: storageObj.hospitalAddress,
      email: storageObj.hospitalMailId,
      name: storageObj.hospitalName,
      phone_number: storageObj.hospitalPhone,
      picture: storageObj.hospitalPicture,
      password: '',
    };
    console.log('updatedInitialValue', updatedInitialValue);
    setInitialValues({ ...updatedInitialValue });
  }, []);

  const covertFromObjToArray = (obj: any) => {
    // password should not send in the request
    const attributeList: any[] = [];
    Object.keys(obj).forEach((key) => {
      if (key !== 'password') {
        let value = obj[key];
        if (key === 'phone_number') value = `+91${obj[key]}`;
        const attributeObj = {
          Name: key,
          Value: value,
        };
        const attribute = new CognitoUserAttribute(attributeObj);
        attributeList.push(attribute);
      }
    });
    return attributeList;
  };

  const updateUserAttribute = (values: profileDetailsType, attributeList: any) => {
    const { email, password } = values;
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: UserPool,
    });

    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });
    cognitoUser.authenticateUser(authDetails, {
      onSuccess: () => {
        console.log('User authenticated');
        cognitoUser.updateAttributes(attributeList, (err, result) => {
          if (err) {
            console.log(err.message || JSON.stringify(err));
            toast.error(err.message || JSON.stringify(err));
            return;
          }
          console.log(`call result: ${result}`);
          const storageData = {
            hospitalName: values.name,
            hospitalPhone: values.phone_number,
            hospitalAddress: values.address,
            hospitalPicture: values.picture,
          };
          setStorageDetails(storageData);
          toast.success('Profile Updated Successfully');
        });
      },
      onFailure: (error) => {
        console.log('An error happened', error);
        toast.error(error.message || JSON.stringify(error));
      },
    });
  };

  const signUp = (values, attributeList, setErrors: Function) => {
    const { email, password } = values;
    UserPool.signUp(email, password, attributeList, null, (err: any, result: any) => {
      if (err) {
        console.log('err', err);
        setErrors({ address: err.message });
        return toast.error(err.message);
      }

      console.log('result', result);
      toast.success('Sign up successful');
      return navigate('/confirmation-code');
    });
  };

  const onSubmit = (values: any, { setErrors }: any) => {
    values.picture = 'picture';
    console.log('values', values);
    const attributeList: any = covertFromObjToArray(values);
    console.log('attributeList', attributeList);
    if (isSignUp) {
      signUp(values, attributeList, setErrors);
    } else {
      updateUserAttribute(values, attributeList);
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={profileDetailsValidation}
        enableReinitialize
        onSubmit={onSubmit}
      >
        {({ handleSubmit, ...parameter }) => (
          <form onSubmit={handleSubmit}>
            <div className="row mt-3">
              <div className="col-md-6">
                <TextBox
                  heading="Hospital Email"
                  id="email"
                  readOnly={!isSignUp}
                  parameter={parameter}
                  required
                />
              </div>
              <br />
              <div className="col-md-6">
                <TextBox
                  heading="Hospital Name"
                  id="name"
                  parameter={parameter}
                  required
                />
              </div>
              <br />
            </div>
            <div className="row">
              <div className="col-md-6">
                <TextBox
                  heading="Phone Number"
                  id="phone_number"
                  parameter={parameter}
                  required
                  customValueFn={onlyNumbers}
                />
              </div>
              <div className="col-md-6">
                <TextBox
                  heading="Passwrod"
                  id="password"
                  type="password"
                  parameter={parameter}
                  required
                />
              </div>
              <br />
            </div>
            <div className="row mb-2">
              {/* <div className="col-md-12">
                <TextBox
                  heading="Hospital Logo"
                  id="picture"
                  parameter={parameter}
                />
              </div> */}
              <div className="col-md-12">
                <TextBox
                  heading="Address"
                  id="address"
                  parameter={parameter}
                  required
                />
              </div>
              <br />
            </div>

            <div className="row">
              <div className="col-md-12">
                <SubmitButton id="signup-submit" className="w-100" color="primary" text={isSignUp ? 'Sing up' : 'Update'} />
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

SignUpForm.propTypes = {
  isSignUp: PropTypes.bool.isRequired,
};

export default SignUpForm;
