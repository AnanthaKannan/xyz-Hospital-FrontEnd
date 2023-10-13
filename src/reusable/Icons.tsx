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
          id={`edit-${id}`}
          onClick={() => onClick && onClick()}
          className={`pointer ${className}`}
          size={size}
        />
      );
    case 'delete':
      return (
        <MdOutlineDeleteOutline
          id={`delete-${id}`}
          onClick={() => onClick && onClick()}
          className={`pointer ${className}`}
          size={size}
        />
      );
    case 'info':
      return (
        <BsInfo
          id={`info-${id}`}
          onClick={() => onClick && onClick()}
          className={`pointer ${className}`}
          size={size}
        />
      );
    case 'hamburger':
      return (
        <GiHamburgerMenu
          id={`hamburger-${id}`}
          onClick={() => onClick && onClick()}
          className={`pointer ${className}`}
          size={size}
        />
      );
    case 'view':
      return (
        <BiMessageAltDetail
          id={`view-${id}`}
          onClick={() => onClick && onClick()}
          size={size}
          className="pointer"
        />
      );
    case 'changePassword':
      return (
        <RiLockPasswordLine
          id={`changePassword-${id}`}
          onClick={() => onClick && onClick()}
          className={`pointer ${className}`}
          size={size}
        />
      );
    case 'logout':
      return (
        <CgLogOut
          id={`logout-${id}`}
          onClick={() => onClick && onClick()}
          className={`pointer ${className}`}
          size={size}
        />
      );
    case 'entry':
      return (
        <ImEnter
          id={`entry-${id}`}
          onClick={() => onClick && onClick()}
          className={`pointer ${className}`}
          size={size}
        />
      );
    case 'stethoscope':
      return (
        <RiStethoscopeFill
          id={`stethoscope-${id}`}
          onClick={() => onClick && onClick()}
          className={`pointer ${className}`}
          size={size}
        />
      );
    case 'feedback':
      return (
        <MdFeedback
          id={`feedback-${id}`}
          onClick={() => onClick && onClick()}
          className={`pointer ${className}`}
          size={size}
        />
      );
    case 'arrowRight':
      return (
        <AiOutlineArrowRight
          id={`arrowRight-${id}`}
          onClick={() => onClick && onClick()}
          className={`pointer ${className}`}
          size={size}
        />
      );
    case 'users':
      return (
        <FaUsers
          id={`users-${id}`}
          onClick={() => onClick && onClick()}
          className={`pointer ${className}`}
          size={size}
        />
      );
    case 'addCircle':
      return (
        <GrAddCircle
          id={`addCircle-${id}`}
          onClick={() => onClick && onClick()}
          className={`pointer ${className}`}
          size={size}
        />
      );
    case 'subCircle':
      return (
        <GrSubtractCircle
          id={`subCircle-${id}`}
          onClick={() => onClick && onClick()}
          className={`pointer ${className}`}
          size={size}
        />
      );
    case 'dashboard':
      return (
        <RiDashboardFill
          id={`dashboard-${id}`}
          onClick={() => onClick && onClick()}
          className={`pointer ${className}`}
          size={size}
        />
      );
    case 'close':
      return (
        <IoClose
          id={`close-${id}`}
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
