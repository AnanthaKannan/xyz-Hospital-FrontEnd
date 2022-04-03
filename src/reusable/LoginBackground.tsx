import React from 'react'
import Ha from './Ha'
import Hl from './Hl'

const LoginBackground = ({ children, title }) => {
  return (
    <div className='bg-image container-fluid'>
      <div>
      <div className="row no-flip login-height">
        <div className="col-md-6">

        </div>
        <div className="col-md-1">

        </div>
        <div className="col-md-3 d-flex align-items-center">
          <div className='border shadow p-5 rounded border border-light'>
            <Ha  text={title} className='text-center' />
            { children }
            </div>
            </div>
            <div className="col-md-1">

</div>
      </div>
    </div>
    </div>
  )
}

export default LoginBackground