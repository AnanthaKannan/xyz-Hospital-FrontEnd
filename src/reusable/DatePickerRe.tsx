import React from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

type DatePickerType = {
    onChange: (id:string, date: any) => void,
    heading: string,
    errorMsg?: string | undefined | false | Date,
    value: any,
    id: string,
}

export default function DatePickerRe({onChange, heading, errorMsg, value, id}: any) {
    return (
        <React.Fragment>
              <label className='text-muted' htmlFor={id}>{heading}</label>
             <div>
             <DatePicker 
             selected={value}
             className='form-control'
              onChange={(date: any) => onChange(id, date)} />
              </div>
             
             <span className="text-danger">{errorMsg}</span>
        </React.Fragment>
    )
}