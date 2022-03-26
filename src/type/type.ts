import { type } from "os";

export type dataType = object | null;

export type TextBoxType = {
  onChange: (e: React.FormEvent<HTMLInputElement>) => void,
  value: string,
  className?: string | "",
  readOnly?: boolean,
  type?: string,
  errorMsg: string | undefined | false,
  heading: string,
  id: string
}

export type TextAreaType = {
  onChange: (e: React.FormEvent<HTMLTextAreaElement>) => void,
  value: string,
  className: string,
  readOnly: boolean,
  type: string,
  errorMsg: string,
  heading: string,
  id: string,
  rows: number
}

export type ButtonType = {
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  className ?: string,
  isDisable ?: boolean,
  id: string,
  text?: string,
  color?: 'inherit' | 'primary' | 'secondary' | 'default';
}


export type SubmitButtonType = {
  onSubmit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  className: string,
  type: string,
  value: string,
  isDisable: boolean,
  id: string,
  text: string,
  color: 'inherit' | 'primary' | 'secondary' | 'default';
}

export type containerType = {
  children: React.ReactNode,
  title: string
}

export type targetType = { target: HTMLInputElement }