import React, { useEffect, useState } from 'react';
import { containerType } from '@type/type';
import LoadingOverlay from 'react-loading-overlay-ts';
import { useNavigate } from 'react-router-dom';
import LoaderContext from './LoaderContext';
import SideNav from './SideNav';

const Container = ({ children, title }: containerType) => {
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = title;
    if (!localStorage.getItem('_hospitalId')) navigate('/login', { replace: true });
  }, [title]);

  return (
    <div className="bg-light">
      <LoaderContext.Provider value={{ loader, setLoader }}>
        <LoadingOverlay
          active={loader}
          spinner
          text="Loading..."
        >
          <SideNav>
            {children}
          </SideNav>
        </LoadingOverlay>
      </LoaderContext.Provider>
    </div>
  );
};

export default Container;
