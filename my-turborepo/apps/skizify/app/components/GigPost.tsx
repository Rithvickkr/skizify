"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";

import { Button } from "../../@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../@/components/ui/card";

import { Input } from "../../@/components/ui/input";
import { Label } from "../../@/components/ui/label";
import { GigSet } from "../lib/actions/gigset";

export function GigPost() {
  const { data: session } = useSession();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");

  function calculateTimeInterval(startDateTime: string, endDateTime: string) {
    // Convert ISO strings to Date objects
    const startDate = new Date(startDateTime);
    const endDate = new Date(endDateTime);
  
    // Calculate the difference in milliseconds
    const differenceInMilliseconds = endDate.getTime() - startDate.getTime();
  
    // Convert milliseconds to other units
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
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (session) {
      // Format date and time to ISO-8601
      const startDateTime = new Date(`${date}T${time}:00`).toISOString();
      const endDateTime = new Date(`${endDate}T${endTime}:00`).toISOString();
      const interval = calculateTimeInterval(startDateTime, endDateTime);
      
      await GigSet(title, description, startDateTime, endDateTime, session, interval);
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

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Post your gig</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="title of project"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="this is my description"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="date of event"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="time of event"
              />
            </div>
            <div className="flex items-center justify-center">
              <Label htmlFor="endTimeslot">To</Label>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                placeholder="end date of event"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="endTime">End Time</Label>
              <Input
                id="endTime"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                placeholder="end time of event"
              />
            </div>
          </div>
          <CardFooter className="flex justify-between mt-5">
            <Button variant="outline">Cancel</Button>
            <Button type="submit">Post</Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
