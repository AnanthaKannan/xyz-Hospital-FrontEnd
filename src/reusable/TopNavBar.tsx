import React from 'react'
import Icons from './Icons'
import AccountMenu from './AccountMenu';


const TopNavBar = ({ collapsed, setCollapsed}) => {

  return (
    <div className='border-bottom border-left shadow-sm px-3 '>
          <div className='d-flex align-items-center p-2 justify-content-between'>
            <div>
              <Icons icon='hamburger' onClick={() => setCollapsed(!collapsed)} size={25} />
            </div>
          <div className='d-flex align-items-center'>
          {/* <h6 className='mb-0'>{ getStorageDetails()?.hospitalName }</h6> */}
          <AccountMenu />
          </div>
         
          </div>
        </div> 
  )
}

export default TopNavBar