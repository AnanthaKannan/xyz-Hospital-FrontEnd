import React from 'react'
import Avatar from '@mui/material/Avatar';
import { ImExit } from 'react-icons/im';
import Tooltip from '@mui/material/Tooltip';
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi'


const TopNavBar = ({ collapsed, setCollapsed}) => {
  return (
    <div className='border-bottom border-left shadow-sm px-2'>
          <div className='d-flex align-items-center p-2 justify-content-between'>
            <div>
              <GiHamburgerMenu onClick={() => setCollapsed(!collapsed)} className='pointer' size={24} />
            </div>
           <Tooltip title="Logout">
             <Link to='/' className=''>
          <h4 className='m-1 pointer d-flex align-content-center'> <ImExit className='active'/>   </h4>  
          </Link>
          </Tooltip>
          </div>
        </div> 
  )
}

export default TopNavBar