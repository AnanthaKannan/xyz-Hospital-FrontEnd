import { useEffect } from 'react';
import Select from 'react-select';

const SearchSelect = ({ heading='', className='', id, options=[], required=false, parameter, setFieldValue, placeholder=''}) => {

  const { values, touched, errors } = parameter;
  // const options = [
  //   { value: 'chocolate', label: 'Chocolate' },
  //   { value: 'strawberry', label: 'Strawberry' },
  //   { value: 'vanilla', label: 'Vanilla' },
  // ];
  const handleChange = (selectedOption) => {
    setFieldValue(id, selectedOption.value)
  };

  // useEffect(() => {
  //   options.push({ value: '', label: '' })
  // }, [])
  
  return (
    <div className='mb-3'>
         <label className={`text-muted ${required ? 'required' : ''}`} htmlFor={id}>{heading}</label>
      <Select
        placeholder={placeholder}
        className={`mt-2 mb-1 ${className}`}
        value={options.find(obj => obj.value === values[id]) || ""}
        onChange={handleChange}
        options={ [...options, {values: "", label: ""}] }
      />
         {touched[id] && errors[id] && <div id={`error-${id}`} className='text-danger'>{errors[id]}</div>}
    </div>
  )
}

export default SearchSelect