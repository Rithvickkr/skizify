"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { UserRole } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Button } from "../../@/components/ui/button";
import { Input } from "../../@/components/ui/input";
import { Label } from "../../@/components/ui/label";
import { GigSet } from "../lib/actions/setgig";
import { cn } from "../utils/cn";

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2 p-2", className)}>
      {children}
    </div>
  );
};

export function GigForm() {
  const router = useRouter();
  const { data: session } = useSession();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");

  function calculateTimeInterval(startTime: string, endTime: string) {
    const date = new Date().toISOString().split("T")[0];
    const startDateTime1 = new Date(`${date}T${startTime}:00`);
    const endDateTime1 = new Date(`${date}T${endTime}:00`);

    const differenceInMilliseconds =
      endDateTime1.getTime() - startDateTime1.getTime();
    const differenceInSeconds = differenceInMilliseconds / 1000;
    const differenceInMinutes = differenceInSeconds / 60;
    const differenceInHours = differenceInMinutes / 60;

    return {
      milliseconds: differenceInMilliseconds,
      seconds: differenceInSeconds,
      minutes: differenceInMinutes,
      hours: differenceInHours,
    };
  }

  const validateDates = (date: any, endDate: any) => {
    if (date && endDate) {
      const startDate = new Date(date);
      const endDateValue = new Date(endDate);

      const maxEndDate = new Date(startDate);
      maxEndDate.setDate(startDate.getDate() + 2);
      if (endDateValue > maxEndDate) {
        window.alert(
          "End date cannot be more than 2 days after the start date.",
        );
        setEndDate("");
        throw new Error("End date cannot be more than 2 days after the start date.");
      }
    }
  };

  const validateTimes = (
    date: String,
    time: String,
    endDate: String,
    endTime: String,
  ) => {
    if (date && time && endDate && endTime) {
      const startDateTime = new Date(`${date}T${time}`);
      const endDateTime = new Date(`${endDate}T${endTime}`);

      if (endDateTime <= startDateTime) {
        window.alert("End time must be greater than start time.");
        setEndTime("");
        throw new Error("End time must be greater than start time.");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (session) {
      const interval = calculateTimeInterval(time, endTime);
      const startDateTime = new Date(`${date}T${time}:00`).toISOString();
      const endDateTime = new Date(`${endDate}T${endTime}:00`).toISOString();
      validateDates(date, endDate);
      validateTimes(date, time, endDate, endTime);
      await GigSet(
        title,
        description,
        startDateTime,
        endDateTime,
        session,
        interval,
      );

      setTitle("");
      setDescription("");
      setDate("");
      setTime("");
      setEndDate("");
      setEndTime("");
      window.alert("Gig posted successfully");
    }

    console.log({
      title,
      description,
      date,
      time,
      endDate,
      endTime,
    });
  };

  if (session?.user.role === UserRole.SKIZZER) {
    router.push("/explore");
    return <div></div>;
  }

  return (
    <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 dark:bg-black md:rounded-2xl md:p-8">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Create Event
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        Fill out the details for your event.
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer>
          <Label htmlFor="title">Title</Label>
          <Input
            required={true}
            minLength={1}
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Event Title"
          />
        </LabelInputContainer>
        <LabelInputContainer>
          <Label htmlFor="description">Description</Label>
          <textarea
            required={true}
            minLength={1}
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Event Description"
            className="w-full rounded border p-2"
          />
        </LabelInputContainer>
        <div className="flex space-x-2">
          <LabelInputContainer className="flex-1">
            <Label htmlFor="date">Start Date</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
              placeholder="Select Start Date"
            />
          </LabelInputContainer>
          <LabelInputContainer className="flex-1">
            <Label htmlFor="endDate">End Date</Label>
            <Input
              id="endDate"
              type="date"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
              }}
              placeholder="Select End Date"
            />
          </LabelInputContainer>
        </div>
        <div className="flex space-x-2">
          <LabelInputContainer className="flex-1">
            <Label htmlFor="time">Start Time</Label>
            <Input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="Select Start Time"
            />
          </LabelInputContainer>
          <LabelInputContainer className="flex-1">
            <Label htmlFor="endTime">End Time</Label>
            <Input
              id="endTime"
              type="time"
              value={endTime}
              onChange={(e) => {
                setEndTime(e.target.value);
                validateTimes(date, time, endDate, endTime);
              }}
              placeholder="Select End Time"
            />
          </LabelInputContainer>
        </div>
        <div className="mt-5 flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button type="submit" onClick={handleSubmit}>
            Post
          </Button>
        </div>
      </form>
    </div>
  );
}
