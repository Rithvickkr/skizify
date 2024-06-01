"use client";
import React from "react";
import {DateRangePicker} from "@nextui-org/date-picker";
import {DateValue, parseAbsoluteToLocal} from "@internationalized/date";
import {RangeValue} from "@react-types/shared";

export default function Datepick() {
  let [date, setDate] = React.useState<RangeValue<DateValue>>({
    start: parseAbsoluteToLocal("2024-04-01T18:45:22Z"),
    end: parseAbsoluteToLocal("2024-04-08T19:15:22Z"),
  });

  return (
    <div className=" flex flex-col items-start gap-4">
      <DateRangePicker
        fullWidth
        granularity="second"
        label="Date and time range"
        value={date}
        onChange={setDate}
      />

    </div>
  );
}
