import { MdOutlineDeleteOutline, MdOutlineEditNote } from 'react-icons/md';
import { BiMessageAltDetail } from 'react-icons/bi';
const size = 20

// export const ImageCellRender = ({}) => {
//   return (
//     <div className='text-center'>
//       <img 
//       width={50}
//       height={50}
//       src={require('../../assets/images/doctor.png')} 
//       alt='doctor' />
//     </div>
//   );
//   }

export const  DeleteCellRender = (props: any) => {
    return (
        <div>
            <MdOutlineDeleteOutline size={size} className='pointer' />
        </div>
    );
};

export const  EditCellRender = (props: any) => {
  return (
      <div>
          <MdOutlineEditNote size={size} className='pointer' />
      </div>
  );
};

export const  ViewCellRender = (props: any) => {
    return (
        <div>
            <BiMessageAltDetail size={size} className='pointer' />
        </div>
    );
  };
  