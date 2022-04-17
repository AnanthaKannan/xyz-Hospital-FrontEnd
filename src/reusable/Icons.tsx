import React from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { CgLogOut } from 'react-icons/cg'
import { RiLockPasswordLine } from 'react-icons/ri'
import { MdOutlineDeleteOutline } from "react-icons/md";
import { BsInfo } from "react-icons/bs";
const size_ = 25;

export const GiHamburgerMenuIcon = ({onClick, size=size_, className='pointer'}) => {
  return (
    <GiHamburgerMenu onClick={onClick} className={className} size={size} />
  )
}

export const LogoutIcon = ({size=size_, className='pointer'}) => {
  return (
    <CgLogOut className={className} size={size} />
  )
}

export const ChangePasswordIcon = ({size=size_, className='pointer'}) => {
  return (
    <RiLockPasswordLine className={className} size={size} />
  )
}

export const DeleteIcon = ({size=size_, onClick, className='pointer'}) => {
  return (
    <MdOutlineDeleteOutline onClick={onClick} className={className} size={size} />
  )
}

export const InfoIcon = ({size=size_, className='pointer'}) => {
  return (
    <BsInfo className={className} size={size} />
  )
}