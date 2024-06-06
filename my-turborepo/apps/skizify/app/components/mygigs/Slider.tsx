"use client";
import React, { useState, useEffect } from "react";
import Slider from "rc-slider";
import Tooltip from "rc-tooltip";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";

interface TimeSliderProps {
  startTime: string;
  endTime: string;
  timeneeded: number; // New prop for extra minutes
}

const TimeSlider: React.FC<TimeSliderProps> = ({ startTime, endTime , timeneeded}) => {
  const [selectedTime, setSelectedTime] = useState<number>(0);
  const [maxTime, setMaxTime] = useState<number>(0);
  const [endTimeInMinutes, setEndTimeInMinutes] = useState<number>(0);

  useEffect(() => {
    const endTimeMinutes = parseTimeToMinutes(endTime);
    const maxAllowedTime = endTimeMinutes - timeneeded;
    setSelectedTime(parseTimeToMinutes(startTime));
    setMaxTime(maxAllowedTime);
    setEndTimeInMinutes(endTimeMinutes);
  }, [startTime, endTime, timeneeded]);

  const parseTimeToMinutes = (time: string): number => {
    const [hours, minutes, period] = time.split(/[:\s]/);
    let totalMinutes = parseInt(hours || "0", 10) * 60 + parseInt(minutes || "0", 10);
    if (period && period.toLowerCase() === "pm" && hours !== "12") {
      totalMinutes += 12 * 60;
    }
    return totalMinutes;
  };

  const handleChange = (value: number | number[] | undefined) => {
    if (typeof value === "number") {
      setSelectedTime(value);
    } else if (Array.isArray(value)) {
      setSelectedTime(value[0] ?? 0); // Ensure value[0] is not undefined
    }
  };

  const handleFinalChange = (value: number | number[] | undefined) => {
    if (typeof value === "number") {
      setSelectedTime(value);
    } else if (Array.isArray(value)) {
      setSelectedTime(value[0] ?? 0); // Ensure value[0] is not undefined
    }
  };

  const formatTime = (minutes: number): string => {
    const hour = Math.floor(minutes / 60) % 12 || 12;
    const minute = minutes % 60;
    const period = minutes < 12 * 60 ? "AM" : "PM";
    return `${hour}:${minute < 10 ? "0" : ""}${minute} ${period}`;
  };

  if (!startTime || !endTime) {
    return <div>Invalid time range</div>;
  }

  // Determine if dark mode is active
  const isDarkMode = document.documentElement.classList.contains("dark");

  return (
    <div className="flex flex-col items-center justify-center px-4">
      <div className="mx-4 w-full relative">
        <Tooltip
          overlay={`${formatTime(selectedTime)}`}
          placement="top"
          visible={true}
          overlayStyle={{ opacity: 1 , color: "#ffffff" }} // Adjust the opacity here
          
        >
          <Slider
            min={parseTimeToMinutes(startTime)}
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
                }
              },
            }}
          />
        </Tooltip>
      </div>
      <div className="flex w-full items-center justify-between px-1 text-gray-500 dark:text-gray-400 mt-4 text-base ">
        <span>{startTime}</span>
        <span>{formatTime(maxTime)}</span>
      </div>
    </div>
  );
};

export default TimeSlider;
