/* eslint-disable dot-notation */
import { useEffect, useState, ReactNode } from 'react';
import {
  SidebarHeader, ProSidebar, Menu, MenuItem, SubMenu,
} from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import 'react-pro-sidebar/dist/css/styles.css';

import Icons from './Icons';
import './css/sidenavbar.css';
import TopNavBar from './TopNavBar';
import Router from '../Router';
import hospitalLogo from '../assets/hospitalLogo.jpg'; // Import the image using import

const SideNav = ({ children }: { children: ReactNode}) => {
  const [path, setPath] = useState({
    ...Router.reduce((acc, value) => ({
      ...acc,
      [value.PATH.slice(1)]: false,
    }), {}),
  });
  const [collapsed, setCollapsed] = useState(false);

  const navigate = () => {
    const url = window.location.href;
    const splitUrl = url.split('/');
    const endPath = splitUrl[splitUrl.length - 1];
    const pathObj = { ...path, [endPath]: true };
    // console.log('pathObj', pathObj)
    setPath(pathObj);
  };

  useEffect(() => {
    navigate();
  }, []);

  return (
    <div className="app">
      <ProSidebar className="side-nav-fix border-right shadow" collapsed={collapsed} breakPoint="md" toggled={false}>
        <SidebarHeader>
          <div className="d-flex align-items-center justify-content-center m-2">
            <Avatar
              alt="Remy Sharp"
              className="ml-2"
              sx={{ width: 40, height: 40 }}
              src={hospitalLogo}
            />
            {
              collapsed === false
         && <h6 className="mb-0 mx-3"> Digital Hospital </h6>

            }

          </div>
        </SidebarHeader>
        <Menu iconShape="circle" innerSubMenuArrows>
          <MenuItem active={path['dashboard']} icon={<Icons icon="dashboard" size={18} />}>
            Dashboard
            <Link to="/dashboard" />
          </MenuItem>
          <SubMenu title="Doctor" icon={<Icons icon="stethoscope" size={18} />} defaultOpen>
            <MenuItem id="create-doctor" active={path['create-doctor']} icon={<Icons icon="arrowRight" size={18} />}>
              {' '}
              <Link to="/create-doctor" />
              {' '}
              Create Doctor
            </MenuItem>
            <MenuItem id="list-doctor" active={path['list-doctor']} icon={<Icons icon="arrowRight" size={18} />}>
              {' '}
              <Link to="/list-doctor" />
              List Doctor
            </MenuItem>
          </SubMenu>
          <SubMenu title="Patient" icon={<Icons icon="users" size={18} />} defaultOpen>
            <MenuItem id="create-patient" active={path['create-patient']} icon={<Icons icon="arrowRight" size={18} />}>
              {' '}
              <Link to="/create-patient" />
              {' '}
              New Patient
            </MenuItem>
            <MenuItem id="list-patient" active={path['list-patient']} icon={<Icons icon="arrowRight" size={18} />}>
              {' '}
              <Link to="/list-patient" />
              {' '}
              List Patient
            </MenuItem>
            <MenuItem id="add-appoinment" active={path['add-appoinment']} icon={<Icons icon="arrowRight" size={18} />}>
              {' '}
              <Link to="/add-appoinment" />
              {' '}
              Add Appoinment
            </MenuItem>
          </SubMenu>
          <MenuItem id="feed-back" active={path['feed-back']} icon={<Icons icon="feedback" size={18} />}>
            FeedBack
            <Link to="/feed-back" />
          </MenuItem>
        </Menu>
      </ProSidebar>

      <div className="container-fluid mx-0 px-0">
        <TopNavBar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
        <div className="m-4">
          {children}

        </div>
      </div>
    </div>
  );
};

export default SideNav;
