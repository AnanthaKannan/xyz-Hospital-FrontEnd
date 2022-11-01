import React from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";


export default function DatePickerRe({onChange, heading, errorMsg, id, yearsRange,
  className='', required=false, parameter, minDate, maxDate}: any) {
    
    const { values, touched, errors } = parameter;

    const getYear = (date: Date) => {
        return date.getFullYear();
    }

    const range = (start: number, end: number, step: number) => {
        const length = Math.floor((end - start) / step);
        return Array.from({ length }, (_, i) => start + (i * step));
    }
      
    const years = range(yearsRange.start, yearsRange.end, 1);


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
        autoComplete="off"
        id={id}
        minDate={minDate}
        maxDate={maxDate}
        className={`form-control mt-2 mb-1 ${className}`}
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
        selected={values[id]}
        onChange={(date: any) => onChange(id, date)}
      />
       {touched[id] && errors[id] && <div id={`error-${id}`} className='text-danger'>{errors[id]}</div>}
      </React.Fragment>
    );
  };