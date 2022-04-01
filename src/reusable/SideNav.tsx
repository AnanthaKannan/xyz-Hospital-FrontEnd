import { SidebarHeader, ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { RiHospitalLine } from 'react-icons/ri';
import { FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';


import 'react-pro-sidebar/dist/css/styles.css';


const SideNav = ({ children }: { children: React.ReactNode}) => {
  return (
    <div>
        <div className='bg-primary px-2'>
          <div className='d-flex align-items-center p-2'>
          {/* <RiHospitalLine size={40} />  */}
          {/* <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar> */}
          <Avatar alt="Remy Sharp" 
            sx={{ width: 50, height: 50 }}
            src={require("../assets/hospitalLogo.jpg")} />


           <h4 className='m-0 text-white p-2'>Hospital Name</h4>
          </div>

          <div>

          </div>
        </div>
   
    <div className='app'>
      <ProSidebar collapsed={false} breakPoint={'md'} toggled={false}>
        <SidebarHeader>
          {/* <div className='d-flex align-items-center'>
          
          <h5 className='m-0 p-0'>Temporry Hospital of Inidia</h5>
          </div> */}
         
        </SidebarHeader>
        <Menu iconShape="circle" innerSubMenuArrows={false} >
          <MenuItem icon={<RiHospitalLine />}>Dashboard <Link to="/" /> </MenuItem>
          <SubMenu title="Doctor" icon={<FaUsers />} defaultOpen={true}>
            <MenuItem icon={ <FaUsers />} > <Link to="/create-doctor" /> Create Doctor</MenuItem>
            <MenuItem> <Link to="/list-doctor" />List Doctor</MenuItem>
          </SubMenu>
          <SubMenu title="Patient" icon={<FaUsers />} defaultOpen={true}>
            <MenuItem> <Link to="/create-patient" /> New Patient</MenuItem>
            <MenuItem> <Link to="/list-patient" /> List Patient</MenuItem>
          </SubMenu>
          <MenuItem icon={<RiHospitalLine />}>FeedBack <Link to="/feed-back" /> </MenuItem>
        </Menu>
      </ProSidebar>
      <div className='container-fluid mt-3'>
            {children}
      </div>
    </div>
    </div>
  )
}

export default SideNav;