import React from 'react'
import LoginBackground from '../reusable/LoginBackground';
import { Link } from 'react-router-dom';
import SignUpForm  from './SignUpForm'

const SignUpComp = () => {

  return (
    <div>
    <LoginBackground title={'Sign Up'}>
      <SignUpForm isSignUp={true} />
    {/* <Formik
      initialValues={{ email: '', password: '', confirmPassword: '' }}
      validationSchema={signUpValidation}
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
          <TextBox
          heading="Re-enter Password"
          id="confirmPassword"
          value={values.confirmPassword}
          onChange={handleChange}
          errorMsg={touched.confirmPassword && errors.confirmPassword}
          />
      <br />
      <SubmitButton id='signup-submit' className='w-100' color='primary' text='Sing up'/>

      


      </form>
      )}
    </Formik> */}
    <div className='d-flex justify-content-between mt-2'>
      <Link to="/login">
        <label className='link'> Already Have a account? Login</label>
        </Link>
        <Link to="/forgot-password" > 
        <label className='link'> Forgot password </label>
        </Link>
       
      </div>
    </LoginBackground >
    </div>
  )
}

export default SignUpComp