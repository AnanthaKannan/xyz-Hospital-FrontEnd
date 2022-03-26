import React from 'react'

const DropDown = () => {
  return (
    <div>DropDown</div>
  )
}

export default DropDown
// import React from "react";

// export default function DropDown({ className, heading, errorMsg, list = [], onChange, id='' }) {
//   return (
//     <React.Fragment>
//       <span className="txt-sm">{heading}</span>
//       <select id={id} className={`form-control ${className}`} onChange={onChange}>
//         <option value="" hidden>
//         </option>
//         {list.map((obj) => (
//           <option key={obj.value} value={obj.value}> {obj.label} </option>
//         ))}
//       </select>
//       <span className="error-txt">{errorMsg}</span>
//     </React.Fragment>
//   );
// }
