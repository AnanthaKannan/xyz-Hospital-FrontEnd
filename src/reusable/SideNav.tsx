import { SidebarHeader, ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { RiHospitalLine } from 'react-icons/ri';
import { FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import 'react-pro-sidebar/dist/css/styles.css';


const SideNav = ({ children }: { children: React.ReactNode}) => {
  return (
    <div>
        <div className='bg-primary px-2'>
          <div className='d-flex align-items-center p-2'>
          <RiHospitalLine size={40} />  <h4 className='m-0 text-white p-2'>Hospital Name</h4>
          </div>

          <div>

          </div>
        </div>
   
    <div className='app'>
      <ProSidebar collapsed={false} >
        <SidebarHeader>
          {/* <div className='d-flex align-items-center'>
          
          <h5 className='m-0 p-0'>Temporry Hospital of Inidia</h5>
          </div> */}
         
        </SidebarHeader>
        <Menu iconShape="square">
          <MenuItem icon={<RiHospitalLine />}>Dashboard <Link to="/" /> </MenuItem>
          <SubMenu title="Doctor" icon={<FaUsers />}>
            <MenuItem > <Link to="/create-doctor" /> Create Doctor</MenuItem>
            <MenuItem> <Link to="/list-doctor" />List Doctor</MenuItem>
          </SubMenu>
          <SubMenu title="Patient" icon={<FaUsers />}>
            <MenuItem> <Link to="/create-patient" /> New Patient</MenuItem>
            <MenuItem> <Link to="/list-patient" /> List Patient</MenuItem>
          </SubMenu>
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