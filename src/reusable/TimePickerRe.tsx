import React, { useState, useEffect } from "react";
import DropDown from "./DropDown";
import TimePicker from 'react-times';
// use material theme
import 'react-times/css/material/default.css';
// or you can use classic theme
import 'react-times/css/classic/default.css';

export default function TimePickerRe({ index, setSelectedTime, selectedTime}: any) {

  const [from, setFrom] = useState([]);
  const [to, setTo] = useState<any>([]);

  useEffect(() => {
    onInit();
  }, []);

  const onInit = async () => {
    const fromData = await getTimeByBetween(15);

    // setFrom([...fromData]);
  };

  const getTimeByBetween = async (timeInterval: any, from = 0, to = 1440) => {
    const sendData = {
      timeInterval,
      from,
      to,
    };
    // const result = await timeService.getTimeByBetween(sendData);
    // console.log("result", result);
    // if (result.status !== 200) {
    //   return [];
    // }
    const data:any = [{  }] //result.data.data;
    const updatedData = data.map((obj: any) => ({
      value: obj.value,
      label: `${obj.hour}:${obj.minute} ${obj.period}`,
    }));
    return updatedData;
  };

  const getToValue = async (from: any) => {
    const toData = await getTimeByBetween(15, from);
    setTo([...toData]);
  };

  const onHandleDropDown = (e: any, status: any) => {
    console.log("dropDown", e.target.value, status);
    const value = e.target.value;
    if (status === "from") {
      getToValue(value);
    }
    const updatedSelectedTime = selectedTime;
    updatedSelectedTime[index][status] = value;
    setSelectedTime([...updatedSelectedTime]);
  };

  const onTimeChange = (options) => {
    // you can get hour, minute and meridiem here
    // const {
    //   hour,
    //   minute,
    //   meridiem 
    // } = options;
    console.log('first', options);
  }

  return (
    <div className="row mb-2">
      <div className="col-md-6">
      <TimePicker theme="classic"
          timeMode="12" // use 24 or 12 hours mode, default 24
          time="11:00"
          onTimeChange={onTimeChange}
          timeConfig={{
            from: '08:00 AM',
            to: '08:00 PM',
            step: 30,
            unit: 'minutes'
          }}
      />

        {/* <DropDown
          list={from}
          heading="Time From"
          onChange={(e: any) => onHandleDropDown(e, "from")}
        /> */}
      </div>
      <div className="col-md-6">
      <TimePicker theme="classic"
          timeMode="12" // use 24 or 12 hours mode, default 24
          time="11:00" // initial time, default current time
      />
        {/* <DropDown
          list={to}
          heading="Time To"
          onChange={(e: any) => onHandleDropDown(e, "to")}
        /> */}
      </div>
    </div>
  );
}
