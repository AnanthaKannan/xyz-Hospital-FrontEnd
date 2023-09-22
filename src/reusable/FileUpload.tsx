import React, { useEffect, useState } from 'react';
import './css/fileUpload.css';
import maleAvatar from '../assets/male_avatar.png';
import { imagePath } from '../lib';
import { avatarUploadType } from '../type/type';

// const FileUpload = ({
//   // eslint-disable-next-line react/prop-types
//   onChange, value, readOnly = false, errorMsg = '', heading = '', id,
// }) => (
//   <>
//     <span className="txt-sm">{heading}</span>
//     <div className="custom-file">
//       <input
//         type="file"
//         className="form-control"
//         id={id}
//         onChange={onChange}
//         disabled={readOnly}
//       />
//       <label className="custom-file-label" htmlFor={id}>
//         {value || 'Choose file'}
//       </label>

//     </div>
//     <span className="error-txt">{errorMsg}</span>
//   </>
// );

const initialState = {
  file: null,
  imagePreviewUrl: maleAvatar,
};

const AvatarUpload = ({
  id, parameter, setFieldValue, className = '', code,
}: avatarUploadType) => {
  const { values } = parameter;
  const [fileState, setFileState] = useState<any>(initialState);

  // useEffect(() => {
  //   console.log('valiues', values)
  //     if(values.fileName){
  //       const imagePreviewUrl = imagePath(code, values.fileName).getUrl;
  //       console.log('imagePreviewUrl', imagePreviewUrl)
  //       setFileState({
  //         file: null,
  //         imagePreviewUrl
  //       })
  //     }
  // }, [])

  useEffect(() => {
    if (!values.fileName) {
      setFileState(initialState);
    } else if (values.fileName && !fileState.fileName) {
      const imagePreviewUrl = imagePath(code, values.fileName).getUrl;
      console.log('imagePreviewUrl', imagePreviewUrl);
      setFileState({
        file: null,
        imagePreviewUrl,
      });
    }
  }, [values.fileName]);

  const photoUpload = (e) => {
    console.log('e', e);
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      setFileState({
        file,
        imagePreviewUrl: reader.result,
      });
    };
    reader.readAsDataURL(file);
    // eslint-disable-next-line prefer-destructuring
    values.file = e.target.files[0];
    // setFieldValue('fileName', e.target.files[0].name)
    setFieldValue('fileName', Date.now());
  };

  return (
    <div className={className}>
      <label htmlFor={id} className="custom-file-upload fas">
        <div className="img-wrap img-upload">
          <img className="profile-img" alt="profile-img" src={fileState.imagePreviewUrl} />
        </div>
        <input className="d-none" id={id} type="file" onChange={photoUpload} />
      </label>
    </div>
  );
};

export default AvatarUpload;

// Reference for the FileUpload component
// https://codepen.io/OlgaKoplik/pen/ZdyKGY
