import React, { useEffect } from 'react'
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { Formik } from 'formik'
import * as Yup from 'yup'
import{ SubmitButton } from '../reusable/Button'
import TextBox from '../reusable/TextBox';
import UserPool from '../lib/UserPool';
import { Link, useNavigate } from 'react-router-dom';
import LoginBackground from '../reusable/LoginBackground';
import { loginValidation } from '../lib/validationSchema';
import { toast } from 'react-toastify';


const LoginComp = () => {

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('hospitalName')
    localStorage.removeItem('hospitalMailId')
    localStorage.removeItem('_hospitalId')
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
        localStorage.setItem('hospitalMailId', email);
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

  const forgotPassword = (email) => {
    const cognitoUser = new CognitoUser({ Username: email, Pool: UserPool });
    cognitoUser.forgotPassword({
      onSuccess: function (data:any) {
        console.log('CodeDeliveryData from forgotPassword:' + data);
        toast.success('Verification Code has been sent to your email')
      },
      onFailure: function (err:any) {
        console.log('error: ' + err);
        toast.error(err.message);
      }
    });
  }

  const onHandleForgotPassword = (values, setErrors) => {
    console.log('values', values);
    if(!values.email){
      toast.error('Please enter email');
      setErrors({ email: 'Email is required' });
    }
    else{
      forgotPassword(values.email);
      navigate('/forgot-password', { state: { email: values.email } });
    }
  }

  return (
    <div>
       <LoginBackground title="Login"> 
    <Formik
      initialValues={{ email: 'sreeananthakannan@gmail.com', password: 'Kannan$7500' }}
      validationSchema={loginValidation}
      onSubmit={onSubmit}
    >
      {({ values, errors, touched, handleChange, handleSubmit, setErrors }) => (
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
      <SubmitButton id='login-submit' className='w-100' color='primary' text='LOGIN'/>

      <div className='d-flex justify-content-between mt-2'>
      <Link to="/sing-up">
        <label className='link'>  Not a user? sing up</label>
        </Link>
        {/* <Link onClick={() =>onHandleForgotPassword(values, setErrors)} to="/" >  */}
          <label className='link' onClick={() =>onHandleForgotPassword(values, setErrors)}> Forgot password </label>
        {/* </Link> */}
       
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