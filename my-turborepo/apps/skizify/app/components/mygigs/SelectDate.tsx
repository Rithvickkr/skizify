"use client"
import React, { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../@/components/ui/select";
import { Label } from "../../../@/components/ui/label";
import { Month } from "../../lib/actions/ConvertgigInfo";

function getDatesBetweenDates(startDate: Date, endDate: Date): Date[] {
  const days: Date[] = [];
  let currentDate = new Date(startDate);
  // if (startDate.getDate() === endDate.getDate()) {
  //   days.push(startDate); // If start time and end time are the same, add the single date to the array
  // }else{
    while (currentDate <= endDate) {
      days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
  // }
  return days;
}

export function SelectDATE({ startTime, endTime }: any) {
  const [selectedDate, setSelectedDate] = useState("");

  const handleValueChange = (value: string) => {
    setSelectedDate(value);
  };

  const startDate = new Date(startTime);
  const endDate = new Date(endTime);


  const daysArray = getDatesBetweenDates(startDate, endDate);
  

  return (
    <div>
      <Label>Select a date</Label>
      <Select onValueChange={handleValueChange}>
        <SelectTrigger className="mt-2">
          <SelectValue placeholder="Select a date" />
        </SelectTrigger>
        <SelectContent className="bg-white dark:bg-white dark:text-black border">
          {daysArray.map((date) => (
            <SelectItem key={date.toISOString()} className="cursor-pointer" value={`${date.toISOString().split("T")[0]}`}>
              {`${Month(date) } ${date.getDate()}, ${date.getFullYear()}`}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
