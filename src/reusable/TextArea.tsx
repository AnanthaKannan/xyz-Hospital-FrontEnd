import React from 'react';
import { TextAreaType } from '@type/type';

const TextArea = ({
  onChange, value, className = '', readOnly = false, errorMsg = '', heading = '', id, rows = 5,
}: TextAreaType) => (
  <div>
    <label className="text-muted" htmlFor={id}>{heading}</label>
    <textarea
      className={`form-control ${className}`}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      autoComplete="off"
      id={id}
      rows={rows}
    />
    {errorMsg && <div className="text-danger">{errorMsg}</div>}
  </div>
);

export default TextArea;
