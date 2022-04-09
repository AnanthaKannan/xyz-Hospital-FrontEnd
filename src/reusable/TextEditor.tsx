import React, { useState } from 'react'
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css'; // ES6

const TextEditor = ({text, setText, placeholder = ""}: any) => {

  

  const handleChange = (value: any) => {
    // console.log(value)
    setText(value)
  }


  return (
    <div className='bg-white'>
      <ReactQuill value={text}
      theme="snow" 
      placeholder={placeholder}

      onChange={handleChange} />
    </div>
  )
}

export default TextEditor