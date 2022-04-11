import React from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";


export default function DatePickerRe({onChange, heading, errorMsg, value, id, className='', required=false}: any) {
    
    const getYear = (date: Date) => {
        return date.getFullYear();
    }

    const range = (start: number, end: number, step: number) => {
        const length = Math.floor((end - start) / step);
        return Array.from({ length }, (_, i) => start + (i * step));
    }
      
    const years = range(1970, getYear(new Date()) + 1, 1);

    const getMonth = (date: Date) => {
        return date.getMonth();
    }


    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return (
        <React.Fragment>
            <label className={`text-muted ${required ? 'required' : ''}`} htmlFor={id}>{heading}</label>
      <DatePicker
        maxDate={new Date()}
        className={`form-control ${className}`}
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div
            style={{
              margin: 10,
              display: "flex",
              justifyContent: "center",
            }}
          >
            {/* <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
              {"<"}
            </button> */}
            <select
            className='form-control-sm mx-2'
              value={getYear(date)}
              onChange={({ target: { value } }) => changeYear(Number(value))}
            >
              {years.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
  
            <select
            className='form-control-sm mx-2'
              value={months[getMonth(date)]}
              onChange={({ target: { value } }) =>
                changeMonth(months.indexOf(value))
              }
            >
              {months.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {/* <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
              {">"}
            </button> */}
          </div>
        )}
        selected={value}
        onChange={(date: any) => onChange(id, date)}
      />
       <span className="text-danger">{errorMsg}</span>
      </React.Fragment>
    );
  };