const TextBox = ({
  className = "",
  readOnly = false,
  type = "text",
  heading = "",
  id,
  required = false,
  parameter,
  customValueFn = null,
}: any) => {
  const { values, touched, errors, handleChange } = parameter;
  return (
    <div className="mb-3">
      <label
        className={`text-muted ${required ? "required" : ""}`}
        htmlFor={id}
      >
        {heading}
      </label>
      <input
        className={`form-control mt-2 mb-1${className}`}
        type={type}
        value={customValueFn ? customValueFn(values[id]) : values[id]}
        onChange={handleChange}
        readOnly={readOnly}
        autoComplete="off"
        id={id}
      />
      {touched[id] && errors[id] && (
        <div id={`error-${id}`} className="text-danger">
          {errors[id]}
        </div>
      )}
    </div>
  );
};

export default TextBox;
