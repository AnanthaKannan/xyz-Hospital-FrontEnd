import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { CgLogOut } from 'react-icons/cg';
import { RiDashboardFill, RiLockPasswordLine, RiStethoscopeFill } from 'react-icons/ri';
import { MdFeedback, MdOutlineDeleteOutline } from 'react-icons/md';
import { BiMessageAltDetail } from 'react-icons/bi';
import { BsInfo } from 'react-icons/bs';
import { ImEnter } from 'react-icons/im';
import { FaUsers } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { GrAddCircle, GrSubtractCircle } from 'react-icons/gr';
import { IoClose } from 'react-icons/io5';
import { iconType } from '../type/type';

const SIZE = 25;

export const Icons = ({
  size = SIZE, onClick = null, className = '', icon, id = '',
}: iconType) => {
  switch (icon) {
    case 'edit':
      return (
        <FiEdit
          id={`${icon}-${id}`}
          onClick={() => onClick && onClick()}
          className={`pointer ${className}`}
          size={size}
        />
      );
    case 'delete':
      return (
        <MdOutlineDeleteOutline
          id={`${icon}-${id}`}
          onClick={() => onClick && onClick()}
          className={`pointer ${className}`}
          size={size}
        />
      );
    case 'info':
      return (
        <BsInfo
          id={`${icon}-${id}`}
          onClick={() => onClick && onClick()}
          className={`pointer ${className}`}
          size={size}
        />
      );
    case 'hamburger':
      return (
        <GiHamburgerMenu
          id={`${icon}-${id}`}
          onClick={() => onClick && onClick()}
          className={`pointer ${className}`}
          size={size}
        />
      );
    case 'view':
      return (
        <BiMessageAltDetail
          id={`${icon}-${id}`}
          onClick={() => onClick && onClick()}
          size={size}
          className="pointer"
        />
      );
    case 'changePassword':
      return (
        <RiLockPasswordLine
          id={`${icon}-${id}`}
          onClick={() => onClick && onClick()}
          className={`pointer ${className}`}
          size={size}
        />
      );
    case 'logout':
      return (
        <CgLogOut
          id={`${icon}-${id}`}
          onClick={() => onClick && onClick()}
          className={`pointer ${className}`}
          size={size}
        />
      );
    case 'entry':
      return (
        <ImEnter
          id={`${icon}-${id}`}
          onClick={() => onClick && onClick()}
          className={`pointer ${className}`}
          size={size}
        />
      );
    case 'stethoscope':
      return (
        <RiStethoscopeFill
          id={`${icon}-${id}`}
          onClick={() => onClick && onClick()}
          className={`pointer ${className}`}
          size={size}
        />
      );
    case 'feedback':
      return (
        <MdFeedback
          id={`${icon}-${id}`}
          onClick={() => onClick && onClick()}
          className={`pointer ${className}`}
          size={size}
        />
      );
    case 'arrowRight':
      return (
        <AiOutlineArrowRight
          id={`${icon}-${id}`}
          onClick={() => onClick && onClick()}
          className={`pointer ${className}`}
          size={size}
        />
      );
    case 'users':
      return (
        <FaUsers
          id={`${icon}-${id}`}
          onClick={() => onClick && onClick()}
          className={`pointer ${className}`}
          size={size}
        />
      );
    case 'addCircle':
      return (
        <GrAddCircle
          id={`${icon}-${id}`}
          onClick={() => onClick && onClick()}
          className={`pointer ${className}`}
          size={size}
        />
      );
    case 'subCircle':
      return (
        <GrSubtractCircle
          id={`${icon}-${id}`}
          onClick={() => onClick && onClick()}
          className={`pointer ${className}`}
          size={size}
        />
      );
    case 'dashboard':
      return (
        <RiDashboardFill
          id={`${icon}-${id}`}
          onClick={() => onClick && onClick()}
          className={`pointer ${className}`}
          size={size}
        />
      );
    case 'close':
      return (
        <IoClose
          id={`${icon}-${id}`}
          onClick={() => onClick && onClick()}
          className={`pointer ${className}`}
          size={size}
        />
      );
    default:
      return (<div />);
  }
};

export default Icons;
