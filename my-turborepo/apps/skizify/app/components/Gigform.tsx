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
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../../@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "../../@/components/ui/select";
import { ChevronDownIcon } from "lucide-react";
import { useToast } from "../../@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";

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
  const [Timeneed, setTimeneed] = useState<number>(0);
  const [selectedTime, setSelectedTime] = useState<number | null>(null);
  const { toast } = useToast();

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

  const validateDates = (date: string, endDate: string): boolean => {
    if (date && endDate) {
      const startDate = new Date(date);
      const endDateValue = new Date(endDate);
      const maxEndDate = new Date(startDate);
      maxEndDate.setDate(startDate.getDate() + 2);
      if (endDateValue > maxEndDate) {
        window.alert("End date cannot be more than 2 days after the start date.");
        return false;
      }
    }
    return true;
  };

  const validateTimes = (date: string, time: string, endDate: string, endTime: string): boolean => {
    if (date && time && endDate && endTime) {
      const startDateTime = new Date(`${date}T${time}`);
      const endDateTime = new Date(`${endDate}T${endTime}`);
      if (endDateTime <= startDateTime) {
        window.alert("End time must be greater than start time.");
        setEndTime("");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (session) {
      const isValidDates = validateDates(date, endDate);
      if (!isValidDates) {
        setEndDate(""); // Reset endDate if the dates are invalid
        return;
      }

      const isValidTimes = validateTimes(date, time, endDate, endTime);
      if (!isValidTimes) {
        return;
      }

      const interval = calculateTimeInterval(time, endTime);
      const startDateTime = new Date(`${date}T${time}:00`).toISOString();
      const endDateTime = new Date(`${endDate}T${endTime}:00`).toISOString();
      try {
        
        await GigSet(
          title,
          description,
          startDateTime,
          endDateTime, 
          session,
          interval,
          Timeneed,
          "education" // Add the missing argument here
        );
        setTitle("");
        setDescription("");
        setDate("");
        setTime("");
        setEndDate("");
        setEndTime("");
        setTimeneed(0);
        setSelectedTime(null);
        // toast({
        //   title: "Event created successfully",
        //   description: "Your event has been created successfully.",
          
        // });
      } catch (error) {
        console.error("Error posting gig:", error);
        // toast({
        //   variant: "destructive",
        //   title: "Uh oh! Something went wrong.",
        //   description: "There was a problem with your request.",
        //   action: <ToastAction altText="Try again">Try again</ToastAction>,
        // })
      }
    }
  };
  if (session?.user.role === UserRole.SKIZZER) {
    router.push("/explore");
    return <div></div>;
  }

  return (
    <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 dark:bg-[#020817] md:rounded-2xl md:p-8 ">
      
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
        <LabelInputContainer>
          <Label htmlFor="timeneeded">Slot</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="m-2 w-full">
                <div className="flex items-center justify-between">
                  <span>
                    {selectedTime
                      ? `${selectedTime} mins selected`
                      : "Select a time"}
                  </span>
                  <ChevronDownIcon className="h-4 w-4" />
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="space-y-4 border border-[#d1d5d8] bg-white p-4 transition duration-200 hover:shadow-xl dark:border-gray-800 hover:bg-black dark:bg-[#020817] dark:shadow-none">
              <div className="grid grid-cols-3 gap-2">
                {[30, 45, 60].map((time) => (
                  <Button
                    key={time}
                    variant="default"
                    className={`border-[#d1d5d8] px-2 py-1 text-xs ${
                      selectedTime === time
                        ? "bg-black text-white dark:bg-white dark:text-black hover:bg-black"
                        : "bg-white text-black dark:bg-gray-800 dark:text-white hover:bg-black"
                    }`}
                    onClick={() => {
                      setTimeneed(time);
                      setSelectedTime(time);
                    }}
                  >
                    {time} mins
                  </Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
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
                validateTimes(date, time, endDate, e.target.value);
              }}
              placeholder="Select End Time"
            />
          </LabelInputContainer>
        </div>
        <div className="mt-5 flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button variant="default" className="bg-black text-white dark:bg-white dark:text-black" onClick={handleSubmit}>
            Post
          </Button>
        </div>
      </form>
    </div>
  );
}
