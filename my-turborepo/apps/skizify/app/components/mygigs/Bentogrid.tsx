import { cn } from "../../utils/cn";
import { GigsInterface } from "../../(dashboard)/explore/page";
import { Avatar } from "@repo/ui/avatar";
import { JSX, SVGProps } from "react";
import { Card, CardContent } from "../../../@/components/ui/card";
import { ScrollArea, ScrollBar } from "../../../@/components/ui/scroll-area";
import { Button as ButtonE } from "../ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../../../@/components/ui/popover";
import { Button } from "../../../@/components/ui/button";
import { Clock7 } from "lucide-react";
import { BookButton2 } from "./Booking2.0";
import MygigCard from "../mygigspage/Mygigcard";
import {
  Month,
  SessionTime,
  formatTime,
} from "../../lib/actions/ConvertgigInfo";
// {
//   id: string;
//   title: string;
//   content: string;
//   startDateTime: Date;
//   endDateTime: Date;
//   createdAt: Date;
//   updatedAt: Date;
//   authorId: string;
//   Interval: any; //as it is a JSON vlaue
//   status: GigStatus;
// }

export interface Datetimepackage {
  startDATEmonth: string | undefined; //contains start day month
  startDATEday: number; //conatins start date date
  endDATEmonth: string | undefined;
  endDATEday: number;
  sessionTime: string; // will be a String Convert timeneeded into 30min | 45min | 1Hr
  startTime: string; // has start time
  endTime: string;
  timeneeded: number; // this is Duration of the meeting
  startDateTime: Date; //has original Date and Time
  endDateTime: Date;
}

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  gig,
  poster,
}: {
  className?: string;
  gig: GigsInterface;
  poster: any;
}) => {
  const startDATEmonth = Month(gig.startDateTime);
  const startDATEday = gig.startDateTime.getDate();
  const endDATEmonth = Month(gig.endDateTime);
  const endDATEday = gig.endDateTime.getDate();
  const sessionTime = SessionTime(gig.timeneeded);
  const startTime = formatTime(gig.startDateTime);
  const endTime = formatTime(gig.endDateTime);
  const timeneeded = gig.timeneeded;
  const startDateTime = gig.startDateTime;
  const endDateTime = gig.endDateTime;
  const datetimepackage: Datetimepackage = {
    startDATEmonth,
    startDATEday,
    endDATEmonth,
    endDATEday,
    sessionTime,
    startTime,
    endTime,
    timeneeded,
    startDateTime,
    endDateTime,
  };
  // "rc-tooltip": "^6.2.0",
  return (
    <div
      className={cn(
        "group/bento shadow-input row-span-1 flex w-full cursor-pointer items-center justify-center space-y-4 rounded-xl border border-[#d1d5d8] bg-white p-3 transition duration-200 hover:shadow-lg dark:border-gray-800 dark:bg-[#020817] dark:shadow-none",
        className,
      )}
    >
      <div className="w-[90%] transition duration-200 group-hover/bento:translate-x-2">
        {/* <div className="flex gap-10">
          <div><Avatar name={poster.name} photo={poster.userImage}/></div>
          <div>{poster.name}</div>
        </div>
        <div className="font-sans mb-2 mt-2 font-bold text-neutral-600 dark:text-neutral-200">
          {gig.title}
        </div>
        <div className="font-sans text-xs font-normal text-neutral-600 dark:text-neutral-300">
          {gig.content}
        </div> */}
        <Card className="mx-auto w-full max-w-md">
          <CardContent className="grid w-full">
            <div className="flex justify-between">
              <div className="flex space-x-1">
                <Avatar
                  name={poster.name}
                  photo={poster.userImage}
                  classname="size-8 text-sm"
                />
                <div className="self-center">
                  <h3 className="text-sm text-gray-500">{poster.name}</h3>
                </div>
              </div>

              <div className="mr-2 flex gap-2 text-sm text-gray-500 dark:text-gray-400">
                <div className="self-center">
                  <Clock7 className="size-4" />
                </div>
                <div className="self-center">{sessionTime}</div>
              </div>
            </div>

            <div className="w-full">
              <div className="my-2 flex flex-col">
                <div className="ml-2 h-7 justify-items-center font-display text-xl font-medium">
                  {gig.title || "Title"}
                </div>
                <ScrollArea className="w-full truncate text-wrap rounded-md border p-2 px-2 text-sm">
                  {gig.content}
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </div>

              <div className="my-4 flex items-center justify-between">
                <div className="mr-3 flex gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <div className="self-center">
                    <Clock7 className="size-4" />
                  </div>
                  <div className="self-center text-sm">{`${startTime} - ${endTime}`}</div>
                </div>
                <div className="flex items-center">
                  <CalendarIcon className="mr-1 h-5 w-5" />
                  <span className="text-sm">{`${startDATEmonth} ${startDATEday} - ${endDATEmonth} ${endDATEday}`}</span>
                </div>
              </div>
            </div>
            {/* <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="my-2 w-full dark:bg-[#020817]"
                >
                  <div className="flex items-center justify-between">
                    <span>Select a time</span>
                    <ChevronDownIcon className="h-4 w-4" />
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="space-y-4 border border-[#d1d5d8] bg-white p-4 transition duration-200 hover:shadow-xl dark:border-gray-800 dark:bg-[#020817] dark:shadow-none">
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant="default"
                    className="border-[#d1d5d8] bg-black px-2 py-1 text-xs text-white hover:bg-white hover:text-black dark:bg-white dark:text-black hover:dark:bg-black hover:dark:text-white"
                  >
                    9:00 AM
                  </Button>
                  <Button
                    variant="default"
                    className="border-[#d1d5d8] bg-black px-2 py-1 text-xs text-white hover:bg-white hover:text-black dark:bg-white dark:text-black hover:dark:bg-black hover:dark:text-white"
                  >
                    10:00 AM
                  </Button>
                  <Button
                    variant="default"
                    className="border-[#d1d5d8] bg-black px-2 py-1 text-xs text-white hover:bg-white hover:text-black dark:bg-white dark:text-black hover:dark:bg-black hover:dark:text-white"
                  >
                    11:00 AM
                  </Button>
                  <Button
                    variant="default"
                    className="border-[#d1d5d8] bg-black px-2 py-1 text-xs text-white hover:bg-white hover:text-black dark:bg-white dark:text-black hover:dark:bg-black hover:dark:text-white"
                  >
                    1:00 PM
                  </Button>
                  <Button
                    variant="default"
                    className="border-[#d1d5d8] bg-black px-2 py-1 text-xs text-white hover:bg-white hover:text-black dark:bg-white dark:text-black hover:dark:bg-black hover:dark:text-white"
                  >
                    2:00 PM
                  </Button>
                  <Button
                    variant="default"
                    className="border-[#d1d5d8] bg-black px-2 py-1 text-xs text-white hover:bg-white hover:text-black dark:bg-white dark:text-black hover:dark:bg-black hover:dark:text-white"
                  >
                    3:00 PM
                  </Button>
                </div>
              </PopoverContent>
            </Popover> */}
            <div className="flex space-x-4">
              <div className="flex-1">
                <BookButton2
                  gig={gig}
                  poster={poster}
                  Datetimepackage={datetimepackage}
                />
              </div>
              <ButtonE className="col-span-1 m-1 flex-1 bg-white text-black shadow hover:bg-white">
                Message
              </ButtonE>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

function CalendarIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>,
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function ChevronDownIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>,
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
