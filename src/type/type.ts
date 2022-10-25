import { type } from "os";

export type dataType = object | null;

export type TextBoxType = {
  onChange: (e: React.FormEvent<HTMLInputElement>) => void,
  value: string,
  className?: string | "",
  readOnly?: boolean,
  type?: string,
  errorMsg?: string | undefined | false,
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

type color = "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
export type ButtonType = {
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  className?: string,
  isDisable?: boolean,
  id: string,
  text?: string,
  color?: color
}


export type SubmitButtonType = {
  onSubmit?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  className?: string,
  isDisable?: boolean,
  id: string,
  text?: string,
  color?: color
}

export type containerType = {
  children: React.ReactNode,
  title: string
}

export type targetType = { target: HTMLInputElement }

export type agGirdReactType = {
  columnDefs: object[],
  onCellClicked: Function,
  frameworkComponents?: object,
  rowData: object[]
}

export type availableDayType = {
  sunday: boolean,
  monday: boolean,
  tuesday: boolean,
  wednesday: boolean,
  thursday: boolean,
  friday: boolean,
  saturday: boolean
}

type availableTimeType = [{
  from: number,
  to: number
}]

export type doctorValueType = {
  _id?: number,
  name: string,
  availableTime: availableTimeType,
  availableDay: availableDayType,
  timePerPatient: string,
  specialist: string,
  address: string,
  licenseExpiryDate?: Date | string,
  licenseNo?: string,
  email?: string,
  gender: string,
  phone: string,
  alternatePhone?: string,
  fileName?: string,
  zipCode?: string
}

export type patientDetailsType = {
  _id?: number,
  firstName: string,
  lastName?: string,
  middleName?: string,
  gender: string,
  martialStatus?: string,

  age: string,
  email: string,
  phone: string,
  dob: Date | string,
  aadhaarNumber?: string,
  idenityNo?: string,
  occupation?: string,
  address: string,
  city: string,
  state: string,
  country: string,
  zipCode? : string,
  fileName?: string,
  file?: File | null,
}

export type patientRecordType = {
  diagnosis: String,
  description: String,
  admittedOn: Date,
  roomNo: String,
  isAdmitted: Boolean,
  _doctorId: string,
  status: Boolean
}

export type profileDetailsType = {
  email: string,
  name: string,
  phone: string,
  picture: string,
  address: string,
  password: string,
}

export type localStorageType = {
  token?: string,
  hospitalMailId?: string,
  _hospitalId?: string,
  hospitalName?: string,
  hospitalPhone?: string,
  hospitalAddress?: string,
  hospitalPicture?: string
}

type icon = "edit" | "delete" | "info" | "close" | "hamburger" | "view" | "logout" | 'dashboard' | "changePassword" | 'entry' | 'stethoscope' | 'feedback' | 'arrowRight' | 'users' | 'addCircle' | 'subCircle'
export type iconType = {
  icon: icon,
  className?: string,
  size?: number,
  onClick?: any,
}

export type imageUploadCodeType = "patient" | "doctor"

export type imagePathType = {
  code : imageUploadCodeType,
  fileName: string
}

export type parameter = any;
export type setFieldValue = any;
export type className = string;

export type avatarUploadType = {
  id: string,
  parameter: parameter,
  setFieldValue: setFieldValue,
  className: className,
  code: imageUploadCodeType
}

export type imagePathResponseType = { setUrl: string, getUrl: string }

export type widgetType = {
  icon: icon,
  color?: string,
  total: string,
  title: string
}