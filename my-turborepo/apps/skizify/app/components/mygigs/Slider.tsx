"use client";
import React, { useState, useEffect } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

interface TimeSliderProps {
  startTime: string;
  endTime: string;
}

const TimeSlider: React.FC<TimeSliderProps> = ({ startTime, endTime }) => {
  const [selectedTime, setSelectedTime] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    setSelectedTime([
      parseTimeToMinutes(startTime),
      parseTimeToMinutes(endTime),
    ]);
  }, [startTime, endTime]);

  const parseTimeToMinutes = (time: string): number => {
    const [hours, minutes, period] = time.split(/[:\s]/);
    let totalMinutes =
      parseInt(hours || "0", 10) * 60 + parseInt(minutes || "0", 10);
    if (period && period.toLowerCase() === "pm") {
      totalMinutes += 12 * 60;
    }
    return totalMinutes;
  };

  const handleChange = (value: number | number[] | undefined) => {
    const newValue = typeof value === "number" ? value : 0;
    setSelectedTime([newValue, selectedTime[1] || 0]);
  };

  const handleFinalChange = (value: number | number[] | undefined) => {
    if (Array.isArray(value)) {
      setSelectedTime([value[0] ?? 0, value[1] ?? 0]); // Ensure value[1] is a number
    } else {
      const newValue = value !== undefined ? value : 0; // Assign a default value if value is undefined
      setSelectedTime([newValue, selectedTime[1] || 0]); // Ensure newValue is a number
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
      <div className="mx-4 w-full">
        <Slider
          min={parseTimeToMinutes(startTime)}
          max={parseTimeToMinutes(endTime)}
          value={selectedTime[0]}
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
        />
      </div>
      {formatTime(selectedTime[0])}
    </div>
  );
};

export default TimeSlider;
