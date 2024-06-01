"use client";
import React from "react";
import {DateRangePicker} from "@nextui-org/date-picker";
import {parseZonedDateTime} from "@internationalized/date";

export default function Datepick() {
  return (
    <div className="w-full max-w-xl flex flex-row gap-4 ">
      <DateRangePicker
        label="Event duration"
        hideTimeZone
        visibleMonths={2}
        defaultValue={{
          start: parseZonedDateTime("2024-04-01T00:45[America/Los_Angeles]"),
          end: parseZonedDateTime("2024-04-08T11:15[America/Los_Angeles]"),
        }}
      />
    </div>
  );
}
