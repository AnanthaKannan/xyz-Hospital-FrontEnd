import React from 'react'
import SideNav from './SideNav';
import { containerType } from '@type/type'

const Container = ({ children, title}: containerType) => {
  return (
    <div>
      <SideNav children={children}/>
      {/* { children } */}
    </div>
  )
}

export default Container