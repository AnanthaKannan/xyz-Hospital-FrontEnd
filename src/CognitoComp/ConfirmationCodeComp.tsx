import React from 'react'
import { CognitoUser } from 'amazon-cognito-identity-js';
import { Formik } from 'formik'
import * as Yup from 'yup'
import{ SubmitButton } from '../reusable/Button';
import LoginBackground from '../reusable/LoginBackground';
import TextBox from '../reusable/TextBox';
import UserPool from '../lib/UserPool';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const ConfirmationCodeComp = () => {

  const navigate = useNavigate();

  const onSubmit = (values:any, { setErrors }:any) => {
    
    const { code, email } = values;
    const cognitoUser = new CognitoUser({ Username: email, Pool: UserPool });
    cognitoUser.confirmRegistration(code, true, function(err:any, result:any) {
      if (err) {
        console.log('err', err);
        if(err.message.includes('Username/client id combination not found')){
          setErrors({ email: 'Email is not valid' });
        }
        else if(err.message.includes('Invalid verification code provided')){
          setErrors({ code: 'Code is not valid' });
        }
      
      }
      else {
      console.log('result', result);
      toast.success('Successfully confirmed');
      navigate('/login')
      }
    });
  
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Required')
      .email('Invalid email'),
    code: Yup.string()
      .required('Required')
      .min(3, 'Invalid code')
  });

  return (
    <LoginBackground title={'Confirmation'}>
    <Formik
      initialValues={{ email: '', code: '' }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, ...parameter}) => (
        <form onSubmit={handleSubmit}>
           <TextBox
          heading="Email"
          id="email"
          parameter={parameter}
          />
          <br />
          <TextBox
          heading="Confirmation code"
          id="code"
          parameter={parameter}
          />
      <br />
      <div className='d-flex justify-content-between'>
        {/* <SubmitButton className='w-100' type="submit" color='primary' text='Resend'/>
        <div className="mx-2"></div> */}
        <SubmitButton id='confirmation-code-submit' className='w-100' color='primary' text='Confirm'/>
      </div>

      <div className='d-flex justify-content-between mt-2'>
      <Link to="/login">
        <label className='link'> Already you confirmed? Login</label>
        </Link>
        <Link to="/sing-up">
        <label className='link'>  Not a user? sing up</label>
        </Link>
      </div>
      </form>
      )}
    </Formik>
    </LoginBackground >
  )
}

export default ConfirmationCodeComp