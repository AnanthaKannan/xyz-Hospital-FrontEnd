import { type FC } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export type YearsRange = {
  start: number;
  end: number;
};

type DatePickerProps = {
  onChange: (id: string, date: Date) => void;
  heading: string;
  id: string;
  yearsRange: YearsRange;
  className?: string;
  required?: boolean;
  parameter: any;
  minDate: Date;
  maxDate: Date;
};

const DatePickerRe: FC<DatePickerProps> = ({
  onChange,
  heading,
  id,
  yearsRange,
  className = "",
  required = false,
  parameter,
  minDate,
  maxDate,
}: DatePickerProps) => {
  const { values, touched, errors } = parameter;

  const getYear = (date: Date) => date.getFullYear();

  const range = (start: number, end: number, step: number) => {
    const length = Math.floor((end - start) / step);
    return Array.from({ length }, (_, i) => start + i * step);
  };

  const years = range(yearsRange.start, yearsRange.end, 1);

  const getMonth = (date: Date) => date.getMonth();

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
    <>
      <label
        className={`text-muted ${required ? "required" : ""}`}
        htmlFor={id}
      >
        {heading}
      </label>
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
        }: {
          date: Date;
          changeYear: (year: number) => void;
          changeMonth: (month: number) => void;
        }) => (
          <div
            style={{
              margin: 10,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <select
              className="form-control-sm mx-2"
              id={`${id}-year`}
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
              className="form-control-sm mx-2"
              id={`${id}-month`}
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
          </div>
        )}
        selected={values[id]}
        onChange={(date: Date) => onChange(id, date)}
      />
      {touched[id] && errors[id] && (
        <div id={`error-${id}`} className="text-danger">
          {errors[id]}
        </div>
      )}
    </>
  );
};

export default DatePickerRe;
