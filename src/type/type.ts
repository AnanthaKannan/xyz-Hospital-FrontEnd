
import { MuiColor as MuiColorEnum } from '@/lib/enum'

export type dataType = object | null;

export type FeedBackArg = {
  project: string,
  filter: string,
  limit: number,
  skip: number
}

export type HospitalDetailsType = {
  email: string,
  phoneNumber: string,
  hospitalName: string,
  address: string,
  picture: string,
}

export type TextBoxType = {
  onChange: () => void,
  value: string,
  className?: string | '',
  readOnly?: boolean,
  type?: string,
  errorMsg?: string | undefined | false,
  heading: string,
  id: string
}

export type TextAreaType = {
  onChange: () => void,
  value: string,
  className: string,
  readOnly: boolean,
  type: string,
  errorMsg: string,
  heading: string,
  id: string,
  rows: number
}



export type ButtonColor = 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';

export type containerType = {
  children: any,
  title: string
}

export type MuiColor =
  | "primary"
  | "secondary"
  | "error"
  | "info"
  | "success"
  | "warning"
  | "default";

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
  zipCode?: string,
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
  // eslint-disable-next-line camelcase
  phone_number: string,
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

type icon = 'edit' | 'delete' | 'info' | 'close' | 'hamburger' | 'view' | 'logout' | 'save' | 'loader'
  | 'dashboard' | 'changePassword' | 'entry' | 'stethoscope' | 'feedback' | 'arrowRight' | 'users' | 'addCircle' | 'subCircle'
export type iconType = {
  icon: icon,
  className?: string,
  size?: number,
  onClick?: any,
  id?: string,
}

export type imageUploadCodeType = 'patient' | 'doctor'

export type imagePathType = {
  code: imageUploadCodeType,
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
