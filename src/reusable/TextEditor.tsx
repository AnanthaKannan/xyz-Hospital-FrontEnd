import React, { FC } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // ES6

interface TextEditorProps {
  value?: string;
  id: string;
  placeholder?: string;
  handleChange: (content: string) => void;
  errorMsg?: string;
}

const TextEditor: FC<TextEditorProps> = ({
  value,
  placeholder = "",
  id = "",
  handleChange,
  errorMsg = "",
}: any) => (
  <div className="bg-white">
    <ReactQuill
      value={value}
      id={id}
      theme="snow"
      placeholder={placeholder}
      onChange={handleChange}
    />
    {errorMsg && (
      <div
        id={`error-${id}`}
        data-testid={`error-${id}`}
        className="text-danger"
      >
        {errorMsg}
      </div>
    )}
  </div>
);

export default TextEditor;
