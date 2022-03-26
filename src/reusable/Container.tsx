import React, { useEffect, useState } from 'react'
import SideNav from './SideNav';
import { containerType } from '@type/type'
import LoadingOverlay from 'react-loading-overlay-ts';
import LoaderContext from './LoaderContext';

const Container = ({ children, title}: containerType) => {

  const [loader, setLoader] = useState(false);

  useEffect(() => {
    document.title = title;
  },[title])

  return (
    <div>
      <LoaderContext.Provider value={{loader, setLoader}}>
      <LoadingOverlay
        active={loader}
        spinner
        text='Loading...'
        >
      <SideNav children={children}/>
      </LoadingOverlay>
      </LoaderContext.Provider>
    </div>
  )
}

export default Container