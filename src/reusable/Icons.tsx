import React from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { CgLogOut } from 'react-icons/cg'
import { RiLockPasswordLine, RiStethoscopeFill } from 'react-icons/ri'
import { MdFeedback, MdOutlineDeleteOutline } from "react-icons/md";
import { BiMessageAltDetail } from 'react-icons/bi';
import { BsInfo } from "react-icons/bs";
import { ImEnter } from "react-icons/im";
import { iconType } from '../type/type';
import {  FaUsers } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { GrAddCircle, GrSubtractCircle } from 'react-icons/gr';

const size_ = 25;

export const Icons = ({ size = size_, onClick = null, className = '', icon }: iconType) => {

  const onClick_ = () => {
    if (!onClick) return;
    onClick();
  }

  if (icon === 'edit')
    return <FiEdit onClick={onClick_} className={`pointer ${className}`} size={size} />
  if (icon === 'delete')
    return <MdOutlineDeleteOutline onClick={onClick_} className={`pointer ${className}`} size={size} />
  if (icon === 'info')
    return <BsInfo onClick={onClick_} className={`pointer ${className}`} size={size} />
  if (icon === 'hamburger')
    return <GiHamburgerMenu onClick={onClick_} className={`pointer ${className}`} size={size} />
  if (icon === 'view')
    return <BiMessageAltDetail onClick={onClick_} size={size} className='pointer' />
  if (icon === 'changePassword')
    return <RiLockPasswordLine onClick={onClick_} className={`pointer ${className}`} size={size} />
  if (icon === 'logout')
    return <CgLogOut onClick={onClick_} className={`pointer ${className}`} size={size} />
  if (icon === 'entry')
    return <ImEnter onClick={onClick_} className={`pointer ${className}`} size={size} />
  if (icon === 'stethoscope')
    return <RiStethoscopeFill onClick={onClick_} className={`pointer ${className}`} size={size} />
  if (icon === 'feedback')
    return <MdFeedback onClick={onClick_} className={`pointer ${className}`} size={size} />
  if (icon === 'arrowRight')
    return <AiOutlineArrowRight onClick={onClick_} className={`pointer ${className}`} size={size} />
  if (icon === 'users')
    return <FaUsers onClick={onClick_} className={`pointer ${className}`} size={size} />
  if (icon === 'addCircle')
    return <GrAddCircle onClick={onClick_} className={`pointer ${className}`} size={size} />
  if (icon === 'subCircle')
    return <GrSubtractCircle onClick={onClick_} className={`pointer ${className}`} size={size} />



  return (<div></div>)
}

export default Icons;