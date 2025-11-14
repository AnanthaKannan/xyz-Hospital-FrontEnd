import { type FC } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgLogOut } from "react-icons/cg";
import {
  RiDashboardFill,
  RiLockPasswordLine,
  RiStethoscopeFill,
} from "react-icons/ri";
import { MdFeedback, MdOutlineDeleteOutline } from "react-icons/md";
import { BiMessageAltDetail } from "react-icons/bi";
import { BsInfo } from "react-icons/bs";
import { ImEnter } from "react-icons/im";
import { FaUsers } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { AiOutlineArrowRight, AiOutlineLoading3Quarters } from "react-icons/ai";
import { GrAddCircle, GrSubtractCircle } from "react-icons/gr";
import { IoClose } from "react-icons/io5";
import { IoIosSave } from "react-icons/io";
import { iconType } from "../type/type";

const Icons: FC<iconType> = ({ size, onClick, className, icon, id }) => {
  const commonProps = {
    id: `${icon}-${id}`,
    onClick,
    className: `pointer ${className}`,
    size,
  };

  switch (icon) {
    case "edit":
      return <FiEdit {...commonProps} />;
    case "save":
      return <IoIosSave {...commonProps} />;
    case "loader":
      return (
        <AiOutlineLoading3Quarters
          {...commonProps}
          className={`loading-process ${className}`}
        />
      );
    case "delete":
      return <MdOutlineDeleteOutline {...commonProps} />;
    case "info":
      return <BsInfo {...commonProps} />;
    case "hamburger":
      return <GiHamburgerMenu {...commonProps} />;
    case "view":
      return <BiMessageAltDetail {...commonProps} />;
    case "changePassword":
      return <RiLockPasswordLine {...commonProps} />;
    case "logout":
      return <CgLogOut {...commonProps} />;
    case "entry":
      return <ImEnter {...commonProps} />;
    case "stethoscope":
      return <RiStethoscopeFill {...commonProps} />;
    case "feedback":
      return <MdFeedback {...commonProps} />;
    case "arrowRight":
      return <AiOutlineArrowRight {...commonProps} />;
    case "users":
      return <FaUsers {...commonProps} />;
    case "addCircle":
      return <GrAddCircle {...commonProps} />;
    case "subCircle":
      return <GrSubtractCircle {...commonProps} />;
    case "dashboard":
      return <RiDashboardFill {...commonProps} />;
    case "close":
      return <IoClose {...commonProps} />;
    default:
      return <div />;
  }
};

export default Icons;
