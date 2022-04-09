import React from "react";
import DropDown from "../reusable/DropDown";
import { timeList } from "../lib/times";

export default function TimePickerRe({ index, setSelectedTime, selectedTime, setFieldValue }: { index: number; setSelectedTime: Function; selectedTime: { from: number; to: number }[]; setFieldValue: Function; }) {
  const timeList_ = timeList.map((obj) => {
    return {
      value: obj.index,
      label: `${obj.hour}: ${obj.minute} ${obj.ampm}`,
    };
  });

  const onChange = (e: any, state: string) => {
    const { value } = e.target;
    console.log("value", value);
    let time = selectedTime;
    let timeObj = selectedTime[index];
    timeObj[state] = value;
    time[index] = timeObj;
    setSelectedTime([...time]);
    setFieldValue('availableTime', [...time])
  };

  const getTimeList = (timeIndex: number, state: "from" | "to") => {
    // console.log("timeIndex", timeIndex, "index", index);
    // console.log("state", state);

    if (state === "from") {
      if(index !== 0){
      timeIndex = selectedTime[index - 1].to;
      // console.log('first timeIndex', timeIndex)
      const lastSelectedTime = timeList_.filter(
        (obj) => obj.value > timeIndex
      );
      return lastSelectedTime;
      }
        return timeList_;
    }

    if (state === "to") {
      if (selectedTime[index].from === null) return [];
      return timeList_.filter((obj) => {
        return obj.value > timeIndex;
      });
    }
  };

  return (
    <div className="row">
      <div className="col-md-6">
        <DropDown
          key={`index-a${index}`}
          className="mt-2 mb-2"
          list={getTimeList(selectedTime[index].to, "from")}
          value={selectedTime[index].from}
          heading="Start Time"
          id={`startTime${index}`}
          onChange={(e: any) => onChange(e, "from")}
        />
      </div>
      <div className="col-md-6">
        <DropDown
          key={`index-b${index}`}
          className="mt-2 mb-3"
          list={getTimeList(selectedTime[index].from, "to")}
          heading="End Time"
          value={selectedTime[index].to}
          id={`endTime${index}`}
          onChange={(e: any) => onChange(e, "to")}
        />
      </div>
    </div>
  );
}
