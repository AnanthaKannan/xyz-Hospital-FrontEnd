import React from 'react'
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import { Link } from 'react-router-dom';
import Icons from './Icons'
import AccountMenu from './AccountMenu';


const TopNavBar = ({ collapsed, setCollapsed}) => {
  return (
    <div className='border-bottom border-left shadow-sm px-3 '>
          <div className='d-flex align-items-center p-2 justify-content-between'>
            <div>
              <Icons icon='hamburger' onClick={() => setCollapsed(!collapsed)} size={25} />
            </div>
           {/* <Tooltip title="Logout">
             <Link to='/' className=''>
          <h4 className='m-1 pointer d-flex align-content-center'> <ImExit className='active'/>   </h4>  
          </Link>
          </Tooltip> */}
          <div>
          <AccountMenu />
          </div>
         
          </div>
        </div> 
  )
}

export default TopNavBar