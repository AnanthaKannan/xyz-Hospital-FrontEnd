import React from 'react'
import LoginComp from '../CognitoComp/LoginComp'

const Login = () => {
  return (
    <div className="container">
      <div className="d-flex align-items-center login-height justify-content-center">
        <div className='border shadow p-5 rounded'>
    <LoginComp />

        </div>
      </div>
    </div>
  )
}

export default Login