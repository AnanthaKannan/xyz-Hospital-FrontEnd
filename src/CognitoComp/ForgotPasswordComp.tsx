import React, { useEffect, useState } from 'react'
import { CognitoUser } from 'amazon-cognito-identity-js';
import { Formik } from 'formik'
import { SubmitButton } from '../reusable/Button'
import TextBox from '../reusable/TextBox';
import UserPool from '../lib/UserPool';
import { Link } from 'react-router-dom';
import LoginBackground from '../reusable/LoginBackground';
import { forgotPasswordValidation } from '../lib/validationSchema';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from "react-router-dom";


const ForgotPasswordComp = () => {

  const [hospitalEmail, setHospitalEmail] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const state: any = location.state;
    if (state && state.email) {
      setHospitalEmail(state.email);
    }
    else{
      navigate('/login');
    }
  }, [location.state, navigate])

  const onSubmit = (values: any, { setErrors }: any) => {

    console.log(values);
    const cognitoUser = new CognitoUser({
      Username: hospitalEmail,
      Pool: UserPool
    });

    cognitoUser.confirmPassword(values.code, values.password, {
      onFailure(err) {
        toast.error(err.message);
        console.log('failure', err);
      },
      onSuccess() {
        console.log('success');
        toast.success('Password changed successfully');
        navigate('/login');
      },
    });
  }


  return (
    <LoginBackground title={'Forgot Password'}>

      <Formik
        initialValues={{ code: '', password: '', confirmPassword: '' }}
        validationSchema={forgotPasswordValidation}
        onSubmit={onSubmit}
      >
        {({ handleSubmit, ...parameter}) => (
          <form onSubmit={handleSubmit}>
            <TextBox
              heading="Confirmation code"
              id="code"
              parameter={parameter}
            />
            <TextBox
              heading="New Password"
              id="password"
              type='password'
              parameter={parameter}
            />
            <TextBox
              heading="Re-enter Password"
              id="confirmPassword"
              type='password'
              parameter={parameter}
            />
            <br />
            <div className='d-flex justify-content-between'>
              <SubmitButton id='forgot-password-submit' className='w-100' color='primary' text='Submit' />
            </div>
          </form>
        )}
      </Formik>


      <div className='d-flex justify-content-between mt-2'>
        <Link to="/login">
          <label className='link'> Already Have a account? Login</label>
        </Link>
        {/* <Link to="/sing-up" > 
        <label className='link'> Not a user? sing up</label>
        </Link> */}
      </div>
    </LoginBackground >
  )
}

export default ForgotPasswordComp