
import { TextBoxType } from '@type/type';

const TextBox = ({onChange, value, className='', readOnly=false, type='text', errorMsg='', heading='', id}: any) => {
  return (
    <div className='mb-3'>
      <label className='text-muted' htmlFor={id}>{heading}</label>
      <input
        className={`form-control mt-2 mb-1${className}`}
        type={type}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        autoComplete='off'
        id={id}
      />
      {errorMsg && <div id={`error-${id}`} className='text-danger'>{errorMsg}</div>}
    </div>
  )
}

export default TextBox