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
  // const onClick_ = () => {
  //   if (!onClick) return;
  //   onClick();
  // };

  if (icon === 'edit') return <FiEdit id={`edit-${id}`} onClick={onClick && onClick()} className={`pointer ${className}`} size={size} />;
  if (icon === 'delete') return <MdOutlineDeleteOutline id={`delete-${id}`} onClick={onClick && onClick()} className={`pointer ${className}`} size={size} />;
  if (icon === 'info') return <BsInfo id={`info-${id}`} onClick={onClick && onClick()} className={`pointer ${className}`} size={size} />;
  if (icon === 'hamburger') return <GiHamburgerMenu id={`hamburger-${id}`} onClick={onClick && onClick()} className={`pointer ${className}`} size={size} />;
  if (icon === 'view') return <BiMessageAltDetail id={`view-${id}`} onClick={onClick && onClick()} size={size} className="pointer" />;
  if (icon === 'changePassword') return <RiLockPasswordLine id={`changePassword-${id}`} onClick={onClick && onClick()} className={`pointer ${className}`} size={size} />;
  if (icon === 'logout') return <CgLogOut id={`logout-${id}`} onClick={onClick && onClick()} className={`pointer ${className}`} size={size} />;
  if (icon === 'entry') return <ImEnter id={`entry-${id}`} onClick={onClick && onClick()} className={`pointer ${className}`} size={size} />;
  if (icon === 'stethoscope') return <RiStethoscopeFill id={`stethoscope-${id}`} onClick={onClick && onClick()} className={`pointer ${className}`} size={size} />;
  if (icon === 'feedback') return <MdFeedback id={`feedback-${id}`} onClick={onClick && onClick()} className={`pointer ${className}`} size={size} />;
  if (icon === 'arrowRight') return <AiOutlineArrowRight id={`arrowRight-${id}`} onClick={onClick && onClick()} className={`pointer ${className}`} size={size} />;
  if (icon === 'users') return <FaUsers id={`users-${id}`} onClick={onClick && onClick()} className={`pointer ${className}`} size={size} />;
  if (icon === 'addCircle') return <GrAddCircle id={`addCircle-${id}`} onClick={onClick && onClick()} className={`pointer ${className}`} size={size} />;
  if (icon === 'subCircle') return <GrSubtractCircle id={`subCircle-${id}`} onClick={onClick && onClick()} className={`pointer ${className}`} size={size} />;
  if (icon === 'dashboard') return <RiDashboardFill id={`dashboard-${id}`} onClick={onClick && onClick()} className={`pointer ${className}`} size={size} />;
  if (icon === 'close') return <IoClose id={`close-${id}`} onClick={onClick && onClick()} className={`pointer ${className}`} size={size} />;

  return (<div />);
};

export default Icons;
