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
  console.log(session);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(session);

    if (session) {
      try {
      
        await GigSet(title, description, date, time, endDate, endTime, session);
        console.log("Gig set successfully!");
      } catch (error) {
        console.error("Error setting gig:", error);
      }
    } else {
      console.error("No session found");
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
                placeholder="Title of project"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="This is my description"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="Date of event"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="Time of event"
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
                placeholder="End date of event"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="endTime">End Time</Label>
              <Input
                id="endTime"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                placeholder="End time of event"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button type="submit" onClick={handleSubmit}>Post</Button>
      </CardFooter>
    </Card>
  );
}
