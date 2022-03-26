import React from 'react'

const TimePicker = () => {
  return (
    <div>TimePicker</div>
  )
}

export default TimePicker

// import React, { useState, useEffect } from "react";
// import DropDown from "../reusable/DropDown";
// import timeService from "../service/time.service";

// export default function TimePicker({ index, setSelectedTime, selectedTime}) {

//   const [from, setFrom] = useState([]);
//   const [to, setTo] = useState([]);
//   // const [selectedTime, setSelectedTime] = useState({
//   //   from: null,
//   //   to: null,
//   // });

//   useEffect(() => {
//     onInit();
//   }, []);

//   const onInit = async () => {
//     const fromData = await getTimeByBetween(15);

//     setFrom([...fromData]);
//   };

//   const getTimeByBetween = async (timeInterval, from = 0, to = 1440) => {
//     const sendData = {
//       timeInterval,
//       from,
//       to,
//     };
//     const result = await timeService.getTimeByBetween(sendData);
//     console.log("result", result);
//     if (result.status !== 200) {
//       return [];
//     }
//     const data = result.data.data;
//     const updatedData = data.map((obj) => ({
//       value: obj.value,
//       label: `${obj.hour}:${obj.minute} ${obj.period}`,
//     }));
//     return updatedData;
//   };

//   const getToValue = async (from) => {
//     const toData = await getTimeByBetween(15, from);
//     setTo([...toData]);
//   };

//   const onHandleDropDown = (e, status) => {
//     console.log("dropDown", e.target.value, status);
//     const value = e.target.value;
//     if (status === "from") {
//       getToValue(value);
//     }
//     const updatedSelectedTime = selectedTime;
//     updatedSelectedTime[index][status] = value;
//     setSelectedTime([...updatedSelectedTime]);
//   };

//   return (
//     <div className="row mb-2">
//       <div className="col-md-6">
//         <DropDown
//           list={from}
//           heading="Time From"
//           onChange={(e) => onHandleDropDown(e, "from")}
//         />
//       </div>
//       <div className="col-md-6">
//         <DropDown
//           list={to}
//           heading="Time To"
//           onChange={(e) => onHandleDropDown(e, "to")}
//         />
//       </div>
//     </div>
//   );
// }
