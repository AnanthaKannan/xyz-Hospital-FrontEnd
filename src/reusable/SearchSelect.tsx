/* eslint-disable react/forbid-prop-types */
import Select from "react-select";
import PropTypes from "prop-types";

const SearchSelect = ({
  heading = "",
  className = "",
  id,
  options = [],
  required = false,
  parameter,
  setFieldValue,
  placeholder = "",
}) => {
  const { values, touched, errors } = parameter;
  // const options = [
  //   { value: 'chocolate', label: 'Chocolate' },
  //   { value: 'strawberry', label: 'Strawberry' },
  //   { value: 'vanilla', label: 'Vanilla' },
  // ];
  const handleChange = (selectedOption) => {
    setFieldValue(id, selectedOption.value);
  };

  return (
    <div className="mb-3">
      <label
        className={`text-muted ${required ? "required" : ""}`}
        htmlFor={id}
      >
        {heading}
      </label>
      <Select
        id={id}
        placeholder={placeholder}
        className={`mt-2 mb-1 ${className}`}
        value={options.find((obj) => obj.value === values[id]) || ""}
        onChange={handleChange}
        options={[...options, { values: "", label: "" }]}
      />
      {touched[id] && errors[id] && (
        <div id={`error-${id}`} className="text-danger">
          {errors[id]}
        </div>
      )}
    </div>
  );
};

const optionShape = PropTypes.shape({
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
});

SearchSelect.propTypes = {
  heading: PropTypes.string, // Add this line to define the PropTypes for 'heading'
  className: PropTypes.string,
  id: PropTypes.string.isRequired, // You can specify required props using .isRequired
  options: PropTypes.arrayOf(optionShape), // Use the custom PropTypes shape here
  required: PropTypes.bool,
  parameter: PropTypes.shape({
    values: PropTypes.object, // Specify the shape of the 'values' property
    touched: PropTypes.object, // Specify the shape of the 'touched' property
    errors: PropTypes.object, // Specify the shape of the 'errors' property
  }).isRequired,
  setFieldValue: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

SearchSelect.defaultProps = {
  heading: "",
  className: "",
  options: [],
  required: false,
  placeholder: "",
};

export default SearchSelect;
