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



export default function DatePickerRe({onChange, heading, errorMsg, value, id, className='', required=false}: any) {

    const addMonths = (date: Date, days: number) => {
        const newDate = new Date(date);
        newDate.setMonth(newDate.getMonth() + days);
        return newDate;
    }
    // return new Date(date.getFullYear(), date.getMonth() + 1, date.getDate());


    return (
        <React.Fragment>
              <label className={`text-muted ${required ? 'required' : ''}`} htmlFor={id}>{heading}</label>
             <div>
             <DatePicker 
             selected={value}
             maxDate={new Date()}
             className={`form-control required ${className}`}
              onChange={(date: any) => onChange(id, date)} />
              </div>
             
             <span className="text-danger">{errorMsg}</span>
        </React.Fragment>
    )
}