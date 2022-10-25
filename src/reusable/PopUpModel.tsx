import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Icons from '../reusable/Icons'


export default function PopUpModel({ tittle, children, setIsOpen, isOpen }: any) {

  const handleClose = () => {
    setIsOpen(false);
  };

  const closeBtn = () => {
    return handleClose ? 
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
       <Icons icon="close" size={24} className='text-dark' />
      </IconButton>
     : null
  }

  return (
    <React.Fragment>
      <Dialog
        fullWidth={true}
        maxWidth='md'
        open={isOpen}
        onClose={handleClose}
        id='popupModel'
      >
        <DialogTitle>
          {tittle}
          { closeBtn() }
        </DialogTitle>
        <DialogContent>
          {  children }
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
