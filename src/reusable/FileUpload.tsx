import React from 'react'

const FileUpload = ({ onChange, value, readOnly=false, errorMsg='', heading='', id}) => {
  return (
   <>
   <span className='txt-sm'>{ heading }</span>
   <div className='custom-file'>
      <input
        type='file'
        className='custom-file-input'
        id={id}
        onChange={onChange}
        disabled={readOnly}
      />
      <label className='custom-file-label' htmlFor={id}>
        {value ? value : 'Choose file'}
      </label>

   </div>
   <span className='error-txt'>{ errorMsg }</span>
   </>
  )
}

export default FileUpload