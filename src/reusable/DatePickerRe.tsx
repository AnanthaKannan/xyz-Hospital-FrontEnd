import React from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

type DatePickerType = {
    onChange: (id:string, date: any) => void,
    heading: string,
    errorMsg?: string | undefined | false,
    value: any,
    id: string,
}

export default function DatePickerRe({onChange, heading, errorMsg, value, id}: DatePickerType) {

    return (
        <React.Fragment>
             <span className="txt-sm">{heading}</span>

             <div>
             <DatePicker selected={value}
             className='form-control'
              onChange={(date: any) => onChange(id, date)} />
              </div>
             
             <span className="error-txt">{errorMsg}</span>
        </React.Fragment>
    )
}