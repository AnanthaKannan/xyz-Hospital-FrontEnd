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
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';
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
