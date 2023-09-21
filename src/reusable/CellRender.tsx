import Icons from './Icons';

const dateFn = require('date-fn');

const size = 20;

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

export const DeleteCellRender = (props: any) => <Icons icon="delete" size={size} />;

export const EditCellRender = (props: any) => <Icons icon="edit" size={size} />;

export const ViewCellRender = (props: any) => <Icons icon="view" size={size} />;

export const RecordCellRender = (props: any) => <Icons icon="entry" size={size} />;
