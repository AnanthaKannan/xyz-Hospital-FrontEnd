import { type FC, type ChangeEvent } from "react";
import DropDown, { Option as OptionType } from "./DropDown";
import { timeList } from "../lib/times";

export default function TimePickerRe({
  index,
  setSelectedTime,
  selectedTime,
  setFieldValue,
}: {
  index: number;
  setSelectedTime: Function;
  selectedTime: { from: number; to: number }[];
  setFieldValue: Function;
}) {
  const timeList_: OptionType[] = timeList.map((obj) => ({
    value: obj.index,
    label: `${obj.hour}: ${obj.minute} ${obj.ampm}`,
  }));

  const onChange = (e: any, state: string) => {
    const { value } = e.target;
    console.log("value", value);
    const time = selectedTime;
    const timeObj = selectedTime[index];
    timeObj[state] = value;
    time[index] = timeObj;
    setSelectedTime([...time]);
    setFieldValue("availableTime", [...time]);
  };

  const getTimeList = (
    timeIndex: number,
    state: "from" | "to"
  ): OptionType[] => {
    let ti = timeIndex;
    if (state === "from") {
      if (index !== 0) {
        ti = selectedTime[index - 1].to;
        const lastSelectedTime = timeList_.filter((obj) => obj.value > ti);
        return lastSelectedTime;
      }
      return timeList_;
    }

    if (state === "to") {
      if (selectedTime[index].from === null) return [];
      return timeList_.filter((obj) => obj.value > ti);
    }
    return [];
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
          onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange(e, "from")}
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
          onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange(e, "to")}
        />
      </div>
    </div>
  );
}
