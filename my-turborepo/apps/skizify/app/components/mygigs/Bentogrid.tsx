import { cn } from "../../utils/cn";
import { GigsInterface } from "../../(dashboard)/explore/page";
import { Avatar } from "@repo/ui/avatar";
import { Card, CardContent, CardFooter } from "../../../@/components/ui/card";
import { ScrollArea, ScrollBar } from "../../../@/components/ui/scroll-area";
import { Button as ButtonE } from "../ui/button";
import { CalendarRange, Clock7 } from "lucide-react";
import { BookButton2 } from "./Booking2.0";
import {
  Month,
  SessionTime,
  formatTime,
} from "../../lib/actions/ConvertgigInfo";
import { GigStatus, UserRole } from "@prisma/client";
import { Button } from "../../../@/components/ui/button";

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
  status,
}: {
  className?: string;
  gig: GigsInterface;
  poster: any;
  status: UserRole | undefined;
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
        "group/bento max-w-3xl min-w-xl shadow-input row-span-1 flex-1 flex w-full cursor-pointer items-center justify-center space-y-4 rounded-xl border border-[#d1d5d8] bg-white from-themeblue from-80% to-gray-900 p-3 transition duration-200 hover:shadow-lg dark:border-gray-800 dark:bg-gradient-to-r dark:shadow-none",
        className,
      )}
    >
      <div className="w-[90%] flex-1 transition duration-200 group-hover/bento:translate-x-2">
        <Card className="mx-auto w-full ">
          <CardContent className="grid w-full">
            <div className="flex justify-between">
              <div className="grid grid-cols-6 space-x-1">
                <Avatar
                  name={poster.name}
                  photo={poster.userImage}
                  classname="size-8 text-sm col-span-1"
                />
                <div className="col-span-4 self-center">
                  <h3 className="max-w-30 truncate text-sm text-gray-500">
                    {poster.name}
                  </h3>
                </div>
              </div>

              <div className="z-10 mr-1 flex gap-1 text-xs text-gray-500 dark:text-gray-400">
                <div className="self-center">
                  <Clock7 className="size-4" />
                </div>
                <div className="w-12 self-center">{sessionTime}</div>
              </div>
            </div>

            <div className="w-full">
              <div className="my-2 flex flex-col">
                <div className="ml-2 h-7 max-w-64 justify-items-center overflow-hidden truncate font-display text-xl font-medium">
                  {gig.title || "Title"}
                </div>
                <ScrollArea className="h-20 w-full truncate text-wrap rounded-md border p-2 px-2 text-sm">
                  {gig.content}
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </div>

              <div className="my-4 flex items-center justify-between">
                <div className="mr-3 flex gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <div className="self-center">
                    <Clock7 className="size-4" />
                  </div>
                  <div className="self-center text-sm">{`${startTime} - ${endTime}`}</div>
                </div>
                <div className="flex items-center">
                  <CalendarRange className="mr-1 size-5 lg:size-4 xl:size-5" />
                  <span className="text-sm">{`${startDATEmonth} ${startDATEday} - ${endDATEmonth} ${endDATEday}`}</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter
            className={`grid ${status === UserRole.SKIZZER ? "grid-cols-2" : "grid-cols-1"} space-x-2`}
          >
            {status === UserRole.SKIZZER ? (
              <BookButton2
                gig={gig}
                poster={poster}
                Datetimepackage={datetimepackage}
              />
            ) : (
              ""
            )}
            <ButtonE
              className="m-1 flex-1 bg-white text-black shadow hover:bg-white hover:ring-black dark:bg-gray-200 dark:text-black dark:hover:bg-white dark:hover:text-black dark:hover:ring-white"
              variant="ringHover"
            >
              Message
            </ButtonE>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
