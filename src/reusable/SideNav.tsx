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
          <MenuItem icon={<RiHospitalLine />}>Doctor <Link to="/" /> </MenuItem>
          {/* <MenuItem icon={<RiHospitalLine />}>Patient<Link to="/sdfsd" /></MenuItem> */}
          <MenuItem active={true} icon={<RiHospitalLine />}>Dashboard 2</MenuItem>
          <MenuItem icon={<RiHospitalLine />}>Dashboard 3</MenuItem>
          <MenuItem icon={<RiHospitalLine />}>Dashboard 4</MenuItem>
          <SubMenu title="Patient" icon={<FaUsers />}>
            <MenuItem> New Patient</MenuItem>
            <MenuItem>List Patient</MenuItem>
            <MenuItem>Appoinment</MenuItem>
          </SubMenu>
        </Menu>
      </ProSidebar>
      <div className='m-4 w-100'>
            {children}
      </div>
    </div>
    </div>
  )
}

export default SideNav;