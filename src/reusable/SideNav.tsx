import { SidebarHeader, ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { RiHospitalLine, RiDashboardFill, RiStethoscopeFill } from 'react-icons/ri';
import { MdFeedback } from 'react-icons/md';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';

import 'react-pro-sidebar/dist/css/styles.css';
import TopNavBar from './TopNavBar';

const SideNav = ({ children }: { children: React.ReactNode}) => {
  return (
    <div>
    <div className='app'>
      <ProSidebar collapsed={false} breakPoint={'md'} toggled={false}>
        <SidebarHeader>
          <div className='d-flex align-items-center my-2'>
          
           <Avatar alt="Remy Sharp"
           className='ml-2' 
            sx={{ width: 40, height: 40 }}
            src={require("../assets/hospitalLogo.jpg")} />
         <h6 className='mb-0 mx-3'>{ localStorage.getItem('HospitalMailId')}</h6>

         </div>
        </SidebarHeader>
        <Menu iconShape="circle" innerSubMenuArrows={false} >
          <MenuItem icon={<RiDashboardFill />} >Dashboard <Link to="/dashboard" /> </MenuItem>
          <SubMenu title="Doctor" icon={<RiStethoscopeFill />} defaultOpen={true}>
            <MenuItem icon={ <AiOutlineArrowRight />} > <Link to="/create-doctor" /> Create Doctor</MenuItem>
            <MenuItem icon={ <AiOutlineArrowRight />}> <Link to="/list-doctor" />List Doctor</MenuItem>
          </SubMenu>
          <SubMenu title="Patient" icon={<FaUsers />} defaultOpen={true}>
            <MenuItem icon={ <AiOutlineArrowRight />}> <Link to="/create-patient" /> New Patient</MenuItem>
            <MenuItem icon={ <AiOutlineArrowRight />}> <Link to="/list-patient" /> List Patient</MenuItem>
          </SubMenu>
          <MenuItem icon={<MdFeedback />}>FeedBack <Link to="/feed-back" /> </MenuItem>
        </Menu>
      </ProSidebar>
      {/* <div>
        
      </div> */}
      <div className='container-fluid mx-0 px-0'>
      <TopNavBar />
        <div className='m-4'>
        {children}

        </div>
      </div>
    </div>
    </div>
  )
}

export default SideNav;