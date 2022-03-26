import React from 'react'
import { Button } from '@material-ui/core'
import { ButtonType, SubmitButtonType } from '../type/type'

export const ClickButton = ({ onClick, className='', id='', isDisable=false, text="click", color='primary'}: ButtonType) => {
  return (
    <Button
      className={className}
      id={id}
      onClick={onClick}
      disabled={isDisable}
      variant="contained"
      type='button'
      color={color}
    >
      {text}
    </Button>

  )
}


export function SubmitButton({ onSubmit, className='', id='', isDisable=false, text="click", color='primary'}: any){
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
  )
}