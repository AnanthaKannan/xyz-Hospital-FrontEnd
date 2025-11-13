import { type FC, type ChangeEvent } from "react";

export type Option = {
  value: string | number;
  label: string;
};

type DropDownProps = {
  className?: string;
  heading?: string;
  errorMsg?: string;
  list: Option[];
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  id?: string;
  placeholder?: string;
  value: string | number;
  required?: boolean;
};

const DropDown: FC<DropDownProps> = ({
  className = "",
  heading,
  errorMsg,
  list = [],
  onChange,
  id = "",
  placeholder = "",
  value,
  required = false,
}) => {
  return (
    <>
      <label
        className={`text-muted ${required ? "required" : ""}`}
        htmlFor={id}
      >
        {heading}
      </label>
      <select
        defaultValue=""
        id={id}
        className={`form-control mt-2 mb-1 ${className}`}
        onChange={onChange}
        value={value}
      >
        <option value="" disabled selected hidden>
          {placeholder}
        </option>
        {list.map((item: Option) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>

      {errorMsg && (
        <div id={`error-${id}`} className="text-danger">
          {errorMsg}
        </div>
      )}
    </>
  );
};

export default DropDown;
