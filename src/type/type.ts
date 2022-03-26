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

export type agGirdReactType = {
  columnDefs: object[],
  onCellClicked: Function,
  frameworkComponents?: object,
  rowData: object[]
}

type availableDayType = {
  sunday: boolean,
  monday: boolean,
  tuesday: boolean,
  wednesday: boolean,
  thursday: boolean,
  friday: boolean,
  saturday: boolean
}

type availableTimeType = [{
  from: string,
  to: string
}]

export type patientValueType = {
  _hospitalId: string,
  name: string,
  availableTime: availableTimeType,
  availableDay: availableDayType,
  timePerPatient: string,
  specialist: string
}


// {        "_id": "{{$guid}}",
//         "_hospitalId":"623092db3378b2575cb96ecd",
//         "name":"{{$randomFullName}}",
//        "availableTime":[{
//       "from": "7",
//       "to": "10"
//     }],
//      "availableDay": {
//       "sunday": "true",
//       "monday": "true",
//       "tuesday": "true",
//       "wednesday": "true",
//       "thursday": "true",
//       "friday": "true",
//       "saturday": "true"
//     },
//         "timePerPatient":"10",
//         "specialist":"ganesh"
        
// }