
import React from "react";
import faker from "faker";

export default function DropDown({ className, heading, errorMsg, list = [], onChange, id='', placeholder='', value }: any) {
  return (
    <React.Fragment>
      
      <span className="txt-sm">{heading}</span>
      <select key={faker.datatype.uuid()} defaultValue={""} id={id} className={`form-control ${className}`} onChange={onChange} value={value}>
        <option value="" disabled selected hidden>
          { placeholder }
        </option>
        {
        list.map((obj: any) => (
          <option key={obj.value} value={obj.value}> {obj.label} </option>
        ))}
      </select>
      <span className="error-txt">{errorMsg}</span>
    </React.Fragment>
  );
}
