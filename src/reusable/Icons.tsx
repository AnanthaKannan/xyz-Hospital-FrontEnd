import React from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { CgLogOut } from 'react-icons/cg'
import { RiLockPasswordLine } from 'react-icons/ri'

export const GiHamburgerMenuIcon = ({onClick, size=20, className='pointer'}) => {
  return (
    <GiHamburgerMenu onClick={onClick} className={className} size={size} />
  )
}

export const LogoutIcon = ({size=20, className='pointer'}) => {
  return (
    <CgLogOut className={className} size={size} />
  )
}

export const ChangePasswordIcon = ({size=20, className='pointer'}) => {
  return (
    <RiLockPasswordLine className={className} size={size} />
  )
}

