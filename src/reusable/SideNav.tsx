import { SidebarHeader, ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { RiHospitalLine, RiDashboardFill, RiStethoscopeFill } from 'react-icons/ri';
import { MdFeedback } from 'react-icons/md';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { FaUsers } from 'react-icons/fa';
import { Link, Navigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { useEffect, useState } from 'react';
import './css/sidenavbar.css'

import 'react-pro-sidebar/dist/css/styles.css';
import TopNavBar from './TopNavBar';
import Router from '../Router'

const SideNav = ({ children }: { children: React.ReactNode}) => {

  const [path, setPath] = useState({...Router.reduce((acc, value) => ({ ...acc, [value.PATH.slice(1)]: false}), {})})
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    navigate();
  }, [])
  
  const navigate = () => {
    const url = window.location.href;
    const splitUrl = url.split('/');
    const endPath = splitUrl[splitUrl.length -1];
    let pathObj = {...path, [endPath]:true};
    console.log('pathObj', pathObj)
    setPath(pathObj)
  }

  return (
    <div>
    <div className='app'>
      <ProSidebar className='border-right' collapsed={collapsed} breakPoint={'md'} toggled={false}>
        <SidebarHeader>
          <div className='d-flex align-items-center justify-content-between m-2'>
           <Avatar alt="Remy Sharp"
           className='ml-2' 
            sx={{ width: 40, height: 40 }}
            src={require("../assets/hospitalLogo.jpg")} />
            {
              collapsed === false &&
         <h6 className='mb-0 mx-3'>{ localStorage.getItem('HospitalMailId')?.slice(0, 18) }</h6>

            }

         </div>
        </SidebarHeader>
        <Menu iconShape="circle" innerSubMenuArrows={true} >
          {/* <MenuItem active={path['dashboard']} icon={<RiDashboardFill size={18} />} >Dashboard <Link to="/dashboard" /> </MenuItem> */}
          <SubMenu title="Doctor" icon={<RiStethoscopeFill  size={18} />} defaultOpen={true}>
            <MenuItem id='create-doctor' active={path['create-doctor']} icon={ <AiOutlineArrowRight size={18} />} > <Link to="/create-doctor" /> Create Doctor</MenuItem>
            <MenuItem id='list-doctor' active={path['list-doctor']} icon={ <AiOutlineArrowRight size={18} />}> <Link to="/list-doctor" />List Doctor</MenuItem>
          </SubMenu>
          <SubMenu title="Patient" icon={<FaUsers size={18} />} defaultOpen={true}>
            <MenuItem id='create-patient' active={path['create-patient']} icon={ <AiOutlineArrowRight size={18} />}> <Link to="/create-patient" /> New Patient</MenuItem>
            <MenuItem  id='list-patient' active={path['list-patient']} icon={ <AiOutlineArrowRight  size={18} />}> <Link to="/list-patient" /> List Patient</MenuItem>
          </SubMenu>
          <MenuItem active={path['feed-back']} icon={<MdFeedback size={18} />}>FeedBack <Link to="/feed-back" /> </MenuItem>
        </Menu>
      </ProSidebar>

      <div className='container-fluid mx-0 px-0'>
      <TopNavBar 
      collapsed={collapsed}
       setCollapsed={setCollapsed}
      />
        <div className='m-4'>
        {children}

        </div>
      </div>
    </div>
    </div>
  )
}

export default SideNav;