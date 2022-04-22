import React, { useEffect, useState } from 'react'
import './css/fileUpload.css'
import maleAvatar from '../assets/male_avatar.png'
import { imagePath } from '../lib'
import { avatarUploadType } from '../type/type'

const FileUpload = ({ onChange, value, readOnly = false, errorMsg = '', heading = '', id }) => {
  return (
    <>
      <span className='txt-sm'>{heading}</span>
      <div className='custom-file'>
        <input
          type='file'
          className='form-control'
          id={id}
          onChange={onChange}
          disabled={readOnly}
        />
        <label className='custom-file-label' htmlFor={id}>
          {value ? value : 'Choose file'}
        </label>

      </div>
      <span className='error-txt'>{errorMsg}</span>
    </>
  )
}

const initialState = {
  file: null,
  imagePreviewUrl: maleAvatar
}

const AvatarUpload = ({ id, parameter, setFieldValue, className='', code }: avatarUploadType ) => {

  const { values } = parameter;
  const [fileState, setFileState] = useState<any>(initialState)

  useEffect(() => {
      if(values.fileName){
        const imagePreviewUrl = imagePath(code, values.fileName).getUrl;
        setFileState({
          file: null,
          imagePreviewUrl
        })
      }
  }, [])

  useEffect(() => {
    if(!values.fileName){
      setFileState(initialState)
    }
  }, [values.fileName])

  const photoUpload = (e) => {
    console.log('e', e)
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      setFileState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }
    reader.readAsDataURL(file);
    values.file = e.target.files[0];
    // setFieldValue('fileName', e.target.files[0].name)
    setFieldValue('fileName', Date.now())

  }


  return (
    <div className={className}>
      <label htmlFor={id} className="custom-file-upload fas">
        <div className="img-wrap img-upload" >
          <img className='profile-img' src={fileState.imagePreviewUrl} />
        </div>
        <input className='d-none' id={id} type="file" onChange={photoUpload} />
      </label>
    </div>
  )
}

export default AvatarUpload

// Reference for the FileUpload component
// https://codepen.io/OlgaKoplik/pen/ZdyKGY