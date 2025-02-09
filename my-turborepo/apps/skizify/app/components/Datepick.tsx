"use client";
import React from "react";
import { DateRangePicker } from "@nextui-org/date-picker";
import { DateValue, parseAbsoluteToLocal } from "@internationalized/date";
import { RangeValue } from "@react-types/shared";

export default function Datepick() {
  let [date, setDate] = React.useState<RangeValue<DateValue>|null >({
    start: parseAbsoluteToLocal("2024-04-01T18:45:22Z"),
    end: parseAbsoluteToLocal("2024-04-08T19:15:22Z"),
  });

  return (
    <div className="flex flex-col items-start gap-4">
      <DateRangePicker
        fullWidth
        granularity="second"
        label="Date and time range"
        value={date}
        onChange={(value: RangeValue<DateValue> | null) => setDate(value ?? { start: parseAbsoluteToLocal("0000-01-01T00:00:00Z"), end: parseAbsoluteToLocal("9999-12-31T23:59:59Z") })}
      />
    </div>
  );
}   
