import React from 'react';
import faker from 'faker';

export default function DropDown({
  className, heading, errorMsg, list = [], onChange, id = '', placeholder = '', value, required = false,
}: any) {
  return (
    <>

      <label className={`text-muted ${required ? 'required' : ''}`} htmlFor={id}>{heading}</label>
      <select
        key={faker.datatype.uuid()}
        defaultValue=""
        id={id}
        className={`form-control mt-2 mb-1 ${className}`}
        onChange={onChange}
        value={value}
      >
        <option value="" disabled selected hidden>
          {placeholder}
        </option>
        {
          list.map((obj: any) => (
            <option key={obj.value} value={obj.value}>
              {' '}
              {obj.label}
              {' '}
            </option>
          ))
}
      </select>
      {/* <span className="error-txt">{errorMsg}</span> */}
      {errorMsg && <div id={`error-${id}`} className="text-danger">{errorMsg}</div>}
    </>
  );
}
