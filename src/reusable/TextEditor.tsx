import React, { useState } from 'react'
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css'; // ES6

const TextEditor = ({text, setText}: any) => {

  

  const handleChange = (value: any) => {
    // console.log(value)
    setText(value)
  }


  return (
    <div>
      <ReactQuill value={text}
      theme="snow" 
      placeholder='Write your description here'
    
      onChange={handleChange} />
    </div>
  )
}

export default TextEditor