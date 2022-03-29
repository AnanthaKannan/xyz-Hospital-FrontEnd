import React, { useState } from 'react'
import ReactQuill from 'react-quill'; // ES6
// import * as ReactQuill from 'react-quill'; // Typescript
// const ReactQuill = require('react-quill'); // CommonJS
import 'react-quill/dist/quill.snow.css'; // ES6

const TextEditor = () => {

  const [text, setText] = useState('')

  const handleChange = (value: any) => {
    console.log(value)
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