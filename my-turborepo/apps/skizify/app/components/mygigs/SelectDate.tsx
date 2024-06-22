"use client";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../@/components/ui/select";
import { Label } from "../../../@/components/ui/label";
import { Month } from "../../lib/actions/ConvertgigInfo";
import { Button } from "../ui/button";
import { Datetimepackage } from "./Bentogrid";
import Slider from "rc-slider";
import Tooltip from "rc-tooltip";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import { CheckCheck } from "lucide-react";
import { acceptGig } from "../../lib/actions/Skizzer-accept-gig";
import { GigsInterface } from "../../(dashboard)/explore/page";

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
export function SelectDATE({
  Datetimepackage,
  gig,
}: {
  Datetimepackage: Datetimepackage;
  gig: GigsInterface;
}) {
  const [selectedDate, setSelectedDate] = useState(""); // gives us selected Date in the form of Jun 26 , 2024
  const [selectedTime, setSelectedTime] = useState<number>(0); //These are in minutes  // gives us time in the form of the Slider
  const [maxTime, setMaxTime] = useState<number>(0);
  const [endTimeInMinutes, setEndTimeInMinutes] = useState<number>(0);
  const [budget, setBudget] = useState<number>(0);
  const [finaltime, setfinaltime] = useState("");
  const [finaldate, setfinaldate] = useState("");

  useEffect(() => {
    if (Datetimepackage.startTime && Datetimepackage.endTime) {
      const endTimeMinutes = parseTimeToMinutes(Datetimepackage.endTime);
      const maxAllowedTime = endTimeMinutes - Datetimepackage.timeneeded;
      setSelectedTime(parseTimeToMinutes(Datetimepackage.startTime));
      setMaxTime(maxAllowedTime);
      setEndTimeInMinutes(endTimeMinutes);
    }
  }, [
    Datetimepackage.startTime,
    Datetimepackage.endTime,
    Datetimepackage.timeneeded,
  ]);
  const parseTimeToMinutes = (time: string): number => {
    // Convert this format 10:30 AM into minutes and find minutes
    const [hoursStr, minutesStr, period] = time.split(/[:\s]/);
    const hours = hoursStr ? parseInt(hoursStr, 10) : 0;
    const minutes = minutesStr ? parseInt(minutesStr, 10) : 0;

    let totalMinutes = hours * 60 + minutes;
    if (period && period.toLowerCase() === "pm" && hours !== 12) {
      totalMinutes += 12 * 60;
    } else if (period && period.toLowerCase() === "am" && hours === 12) {
      totalMinutes -= 12 * 60;
    }
    return totalMinutes;
  };

  const formatTime = (minutes: number): string => {
    //Convert the minutes from parseTimeToMinutes into again in the form of AM and PM, it is exactly reverse
    const hour = Math.floor(minutes / 60) % 12 || 12;
    const minute = minutes % 60;
    const period = minutes < 12 * 60 ? "AM" : "PM";
    return `${hour}:${minute < 10 ? "0" : ""}${minute} ${period}`;
  };

  //Convert Final time like if it is in 7:40 then convert to 07:40
  function formatFinalTime(time: string | undefined): string {
    if (!time) {
      return "00:00";
    }
    const [hour, minute] = time.split(":");
    const paddedHour = (hour ?? "00").padStart(2, "0");
    const paddedMinute = (minute ?? "00").padStart(2, "0");
    return `${paddedHour}:${paddedMinute}`;
  }

  


  const handleChange = (value: number | number[] | undefined) => {
    if (typeof value === "number") {
      setSelectedTime(value <= maxTime ? value : maxTime); // Ensure the value does not exceed maxTime
    } else if (Array.isArray(value)) {
      setSelectedTime(value[0] !== undefined && value[0] <= maxTime ? value[0] : maxTime); // Ensure value[0] does not exceed maxTime
    }
  };
  
  const handleFinalChange = (value: number | number[] | undefined) => {
    if (typeof value === "number") {
      setSelectedTime(value <= maxTime ? value : maxTime); // Ensure the value does not exceed maxTime
    } else if (Array.isArray(value)) {
      setSelectedTime(value[0] !== undefined && value[0] <= maxTime ? value[0] : maxTime); // Ensure value[0] does not exceed maxTime
    }
  };

  if (!Datetimepackage.startTime || !Datetimepackage.endTime) {
    return <div>Invalid time range</div>;
  }

  // Determine if dark mode is active
  const isDarkMode = document.documentElement.classList.contains("dark");

  const handleValueChange = (value: string) => {
    setSelectedDate(value);
  };

  const startDate = new Date(Datetimepackage.startDateTime);
  const endDate = new Date(Datetimepackage.endDateTime);

  const daysArray = getDatesBetweenDates(startDate, endDate);

  return (
    <div>
      <div>
        <div className="flex flex-col">
          <div className="font-serif mb-4 text-base font-medium">
            Meeting Starts from:
          </div>
          <div className="">
            <div className="flex flex-col items-center justify-center px-2">
              <div className="relative mx-2 w-full">
                <Tooltip
                  overlay={
                    <span style={{ color: "#000000" }}>
                      {formatTime(selectedTime)}
                    </span>
                  }
                  placement="top"
                  visible={true}
                  overlayInnerStyle={{
                    backgroundColor: "#ffffff", // Set background color to white
                    color: "#000000", // Set text color to black for visibility
                    padding: "7px",
                    borderRadius: "4px",
                    border: "1px solid #d9d9d9",
                    boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
                  }}
                  overlayStyle={{
                    opacity: 1,
                  }}
                >
                  <Slider
                    min={parseTimeToMinutes(Datetimepackage.startTime)}
                    max={maxTime} // Set max to maxTime to prevent thumb from going beyond this point
                    value={selectedTime}
                    onChange={handleChange}
                    onAfterChange={handleFinalChange}
                    trackStyle={{
                      backgroundColor: isDarkMode ? "#f4f4f5" : "#18181b",
                      height: "8px", // Adjust track height
                    }}
                    handleStyle={{
                      backgroundColor: isDarkMode ? "#18181b" : "#ffffff",
                      border: `2px solid ${isDarkMode ? "#f4f4f5" : "#18181b"}`,
                      width: "24px",
                      height: "24px",
                      opacity: 1,
                      marginTop: "-8px", // Center the thumb
                      outline: "none", // Remove blue ring on focus
                      boxShadow: "none",
                    }}
                    railStyle={{
                      backgroundColor: isDarkMode ? "#18181b" : "#f4f4f5",
                      height: "8px", // Adjust rail height
                    }}
                    marks={{
                      [maxTime]: {
                        style: {
                          color: isDarkMode ? "#f4f4f5" : "#18181b",
                        },
                      },
                    }}
                  />
                </Tooltip>
              </div>
              <div className="mt-2 flex w-full items-center justify-between px-1 text-sm text-gray-500 dark:text-gray-400">
                <span>{Datetimepackage.startTime}</span>
                <span>{formatTime(maxTime)}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="my-3"></div>
        <div>
          <Label htmlFor="date-range">Meeting date</Label>
          <div className="mt-2 flex items-center gap-4">
            <Button
              variant="outline"
              className="h-auto w-full flex-col items-start bg-transparent hover:bg-[#f4f4f5] hover:dark:bg-transparent"
            >
              <span className="text-[0.65rem] font-semibold uppercase">
                Start date
              </span>
              <span className="font-normal">{`${Datetimepackage.startDATEmonth} ${Datetimepackage.startDATEday}, ${Datetimepackage.startDateTime.getFullYear()}`}</span>
            </Button>

            <Button
              variant="outline"
              className="h-auto w-full flex-col items-start bg-transparent hover:bg-[#f4f4f5] hover:dark:bg-transparent"
            >
              <span className="text-[0.65rem] font-semibold uppercase">
                End date
              </span>
              <span className="font-normal">{`${Datetimepackage.endDATEmonth} ${Datetimepackage.endDATEday}, ${Datetimepackage.endDateTime.getFullYear()}`}</span>
            </Button>
          </div>
        </div>
      </div>
      <div>
        <Label>Select a date</Label>
        <Select onValueChange={handleValueChange}>
          <SelectTrigger className="mt-2 hover:shadow-md">
            <SelectValue placeholder="Select a date" />
          </SelectTrigger>
          <SelectContent className="border bg-white dark:bg-white dark:text-black">
            {daysArray.map((date) => (
              <SelectItem
                key={date.toISOString()}
                className="cursor-pointer"
                value={`${date.toISOString().split("T")[0]}`}
              >
                {`${Month(date)} ${date.getDate()}, ${date.getFullYear()}`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="mt-3 flex cursor-pointer flex-col">
        <Label htmlFor="date-range" className="my-2">
          Propose Budget {`(in $)`}
        </Label>

        <Button className="h-9 rounded border bg-transparent p-0 text-black hover:bg-transparent hover:shadow hover:ring-black dark:bg-transparent dark:text-white dark:hover:text-black dark:hover:ring-white">
          <input
            className="h-full w-full rounded border-0 text-sm text-black placeholder-black placeholder:text-sm placeholder:font-extralight focus:border-transparent focus:outline-none focus:ring-0 dark:border dark:border-white dark:bg-transparent dark:text-white placeholder:dark:text-white"
            type="text"
            placeholder="Budget"
            required
            onChange={(e) => {
              try {
                setBudget(Number(e.target.value));
              } catch (err) {
                console.log("", err);
              }
            }}
          />
          {/*Enter the Zod validation , user can put*/}
        </Button>
      </div>
      <div className="mt-3 flex justify-between space-x-4">
        {/* <CredenzaClose asChild>
              <button>Close</button>
            </CredenzaClose> */}
        <Button
          className="m-1 flex-1 bg-white text-black shadow hover:bg-white hover:ring-black dark:bg-white dark:text-black dark:hover:bg-white dark:hover:text-black dark:hover:ring-white"
          variant="ringHover"
        >
          Message
        </Button>
        <Button
          onClick={async () => {
            const finalTime = formatTime(selectedTime).split(" ")[0];
            const formattedTime: string = formatFinalTime(finalTime);
            const finalDateTime: string = `${selectedDate}T${formatFinalTime(formatTime(selectedTime).split(" ")[0])}:00Z`;
            // Date should look like 2024-06-12 and time in this format 22:06 , selectedDate is in the Form of that
            try {
              const message = await acceptGig({ gig, budget, finalDateTime });
              alert(message);
            } catch (err) {
              alert("Failed");
            }
          }}
          className="my-1 mr-1 flex-1 bg-black text-white hover:bg-black hover:ring-black dark:bg-white dark:text-black dark:hover:bg-white dark:hover:text-black dark:hover:ring-white"
          variant="ringHover"
        >
          <CheckCheck className="mr-2 size-4" />
          Accept
        </Button>
      </div>
    </div>
  );
}
