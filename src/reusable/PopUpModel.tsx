// import * as React from 'react';
// import Button from '@mui/material/Button';
// import { styled } from '@mui/material/styles';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';
// import IconButton from '@mui/material/IconButton';
// // import CloseIcon from '@mui/icons-material/Close';
// import Typography from '@mui/material/Typography';
// import Icons from './Icons';

// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//   '& .MuiDialogContent-root': {
//     padding: theme.spacing(2),
//   },
//   '& .MuiDialogActions-root': {
//     padding: theme.spacing(1),
//   },
// }));

// export interface DialogTitleProps {
//   id: string;
//   children?: React.ReactNode;
//   onClose: () => void;
// }

// const BootstrapDialogTitle = (props: DialogTitleProps) => {
//   const { children, onClose, ...other } = props;

//   return (
//     <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
//       {children}
//       {onClose ? (
//         <IconButton
//           aria-label="close"
//           onClick={onClose}
//           sx={{
//             position: 'absolute',
//             right: 8,
//             top: 8,
//             color: (theme) => theme.palette.grey[500],
//           }}
//         >
//           <Icons icon='info' />
//         </IconButton>
//       ) : null}
//     </DialogTitle>
//   );
// };

// export default function PopUpModel({ tittle, children, setIsOpen, isOpen }: any) {
  
//   const handleClickOpen = () => {
//     setIsOpen(true);
//   };
//   const handleClose = () => {
//     setIsOpen(false);
//   };

//   return (
//     <div className='w-100'>
//       <BootstrapDialog
//         onClose={handleClose}
//         aria-labelledby="customized-dialog-title"
//         open={isOpen}
//       >
//         <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
//           { tittle }
//         </BootstrapDialogTitle>
//         <DialogContent dividers>
//           { children }
//         </DialogContent>
//         <DialogActions>
//           <Button autoFocus onClick={handleClose}>
//             Close
//           </Button>
//         </DialogActions>
//       </BootstrapDialog>
//     </div>
//   );
// }




import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Switch from '@mui/material/Switch';

export default function PopUpModel({ tittle, children, setIsOpen, isOpen }: any) {

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        fullWidth={true}
        maxWidth='md'
        open={isOpen}
        onClose={handleClose}
      >
        <DialogTitle>{tittle}</DialogTitle>
        <DialogContent>
          {  children }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
