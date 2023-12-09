import React from 'react';
import Button from '@mui/material/Button';
import { ButtonType, SubmitButtonType } from '../type/type';
import LoadingButton from '@mui/lab/LoadingButton';
import Icons from './Icons'

export const ClickButton = ({
  onClick, className = '', id = '', isDisable = false, text = 'click', color = 'info',
}: ButtonType) => (
  <Button
    className={className}
    id={id}
    onClick={onClick}
    disabled={isDisable}
    variant="contained"
    type="button"
    color={color}
  >
    {text}
  </Button>
);

export function SubmitButton({
  onSubmit, className = '', id = '', isDisable = false, text = 'SUBMIT', color = 'primary',
}: SubmitButtonType) {
  return (
    <Button
      className={className}
      type="submit"
      id={id}
      onSubmit={onSubmit}
      disabled={isDisable}
      variant="contained"
      color={color}
    >
      {text}
    </Button>
  );
}


export const LoadingClickButton = ({
  onClick, className = '', id = '', isDisable = false, text = 'click', color = 'info', loading = false
}: any) => (
  <LoadingButton
    className={className}
    id={id}
    onClick={onClick}
    disabled={isDisable}
    variant="contained"
    type="button"
    color={color}
    startIcon={<Icons icon='save' />  }
    loading={loading}
    loadingPosition="start"
  >
    {text}
  </LoadingButton>
);