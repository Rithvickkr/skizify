import { cn } from "../../utils/cn";
import { GigsInterface } from "@repo/store/types";
import { Avatar } from "@repo/ui/avatar";
import ViewProfile from "../mygigspage/viewProfile";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../../../@/components/ui/card";
import { ScrollArea, ScrollBar } from "../../../@/components/ui/scroll-area";
import { Button as ButtonE } from "../ui/button";
import { CalendarRange, Clock7, MapPin, Tags } from "lucide-react";
import { BookButton2 } from "./Booking2.0";
import {
  Month,
  SessionTime,
  formatTime,
} from "../../lib/actions/ConvertgigInfo";
import { GigStatus, UserRole } from "@prisma/client";
import { Datetimepackage } from "@repo/store/types";
import { Badge } from "../../../@/components/ui/badge";

export function EnhancedLuxuryMeetingCard2({
  className,
  gig,
  poster,
  status,
  authorid
}: {
  className?: string;
  gig: GigsInterface;
  poster: any;
  status: UserRole | undefined;
  authorid: string;
}) {
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
  return (
    <div
      className={cn(
        "group/bento min-w-xl shadow-input row-span-1 flex w-full flex-1 cursor-pointer items-center justify-center space-y-4 rounded-xl border border-[#d1d5d8] bg-white from-black from-90% to-[#191919] p-3 transition duration-200 hover:shadow-lg dark:border-neutral-700 dark:bg-gradient-to-r dark:shadow-none",
        className,
      )}
    >
      <div className="w-[95%] flex-1 transition duration-200 group-hover/bento:translate-x-2">
        <Card className="group relative w-full overflow-hidden bg-gradient-to-br from-neutral-50 via-neutral-100 to-neutral-100 p-3 shadow-lg transition-all duration-500 ease-in-out hover:shadow-2xl dark:from-black dark:to-v0dark">
          {/* <div className="absolute inset-0 z-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay" /> */}
          {/* <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-gradient-to-br from-neutral-200 via-neutral-300 to-neutral-400 blur-3xl transition-all duration-700 ease-in-out group-hover:opacity-70 dark:from-neutral-700 dark:via-neutral-600 dark:to-neutral-500" />  
          //This is a Good Strategy to add Spotlight*/}
          <CardHeader className="relative z-10 pb-0">
            <div className="absolute right-4 top-2">
              <Badge
                variant={"default"}
                className="bg-white/80 text-black backdrop-blur-sm hover:bg-black hover:text-white dark:bg-black/80 dark:text-white dark:hover:bg-white dark:hover:text-black"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-1 text-neutral-700 dark:text-neutral-300"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                Featured
              </Badge>
            </div>
            <div className="flex flex-col items-center space-y-4 sm:flex-row sm:justify-between sm:space-y-0">
              <Avatar
                name={poster.name}
                photo={poster.userImage}
                classname="size-12 rounded-xl border-4 border-white dark:border-neutral-800 shadow-xl transition-all duration-500 ease-in-out group-hover:scale-105 group-hover:rotate-3"
              />
              <div className="text-center sm:text-right">
                <h3 className="bg-gradient-to-r from-neutral-700 via-neutral-900 to-black bg-clip-text text-2xl font-bold text-transparent transition-all duration-500 ease-in-out group-hover:tracking-wider dark:from-neutral-300 dark:via-neutral-100 dark:to-white">
                  {poster.name}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Tech Innovator & AI Specialist
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="relative z-10 mt-6 grid gap-6">
            <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-white/80 to-neutral-100/40 p-6 shadow-md backdrop-blur-sm transition-all duration-500 ease-in-out group-hover:shadow-lg dark:from-neutral-900/80 dark:to-neutral-800/40">
              <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-neutral-200/50 transition-all duration-500 ease-in-out group-hover:scale-150 group-hover:bg-neutral-300/50 dark:bg-neutral-700/50 dark:group-hover:bg-neutral-600/50" />
              <h4 className="mb-2 truncate text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                {gig.title}
              </h4>
              <div className="text-sm leading-relaxed text-neutral-600 transition-all duration-500 ease-in-out dark:text-neutral-400">
                <ScrollArea className="h-12 w-full">
                  <p className="whitespace-normal break-words pr-4">
                    {gig.content}
                  </p>
                  <ScrollBar orientation="vertical" />
                </ScrollArea>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              {[
                {
                  icon: "calendar",
                  text: `${startDATEmonth} ${startDATEday} - ${endDATEmonth} ${endDATEday}`,
                },
                { icon: "clock", text: `${startTime} - ${endTime}` },
                { icon: "map-pin", text: "Virtual Event" },
                { icon: "tag", text: `${gig.category}` },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 transition-all duration-500 ease-in-out group-hover:translate-x-2"
                >
                  <div className="rounded-md bg-neutral-200 p-2 transition-all duration-500 ease-in-out group-hover:bg-neutral-300 dark:bg-neutral-800 dark:group-hover:bg-neutral-700">
                    {item.icon === "calendar" && (
                      <CalendarRange strokeWidth={1.5} />
                    )}
                    {item.icon === "clock" && <Clock7 strokeWidth={1.5} />}
                    {item.icon === "map-pin" && <MapPin strokeWidth={1.5} />}
                    {item.icon === "tag" && <Tags strokeWidth={1.5} />}
                  </div>
                  <span className="relative overflow-hidden">
                    <span className="relative z-10 text-neutral-700 dark:text-neutral-300">
                      {item.text}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="relative z-10 mt-2 flex items-center justify-between rounded-lg bg-gradient-to-r from-white/80 to-neutral-100/40 p-5 backdrop-blur-sm dark:from-neutral-900/80 dark:to-neutral-800/40">
            <div>
              <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                {sessionTime == "1 Hr" ? "60" : sessionTime.slice(0, 2)} minutes
              </p>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                Session Duration
              </p>
            </div>
            {status === UserRole.SKIZZER ? (
              <BookButton2
                gig={gig}
                poster={poster}
                Datetimepackage={datetimepackage}
              />
            ) : (
              <ViewProfile id={authorid} />
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
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
        "group/bento min-w-xl shadow-input row-span-1 flex w-full max-w-3xl flex-1 cursor-pointer items-center justify-center space-y-4 rounded-xl border border-[#d1d5d8] bg-white from-black from-90% to-[#191919] p-3 transition duration-200 hover:shadow-lg dark:border-neutral-700 dark:bg-gradient-to-r dark:shadow-none",
        className,
      )}
    >
      <div className="w-[90%] flex-1 transition duration-200 group-hover/bento:translate-x-2">
        <Card className="mx-auto w-full">
          <CardContent className="grid w-full">
            <div className="flex justify-between">
              <div className="grid grid-cols-6 space-x-1">
                <Avatar
                  name={poster.name}
                  photo={poster.userImage}
                  classname="size-8 text-sm col-span-1"
                />
                <div className="col-span-4 self-center">
                  <h3 className="max-w-30 truncate text-sm text-neutral-500">
                    {poster.name}
                  </h3>
                </div>
              </div>

              <div className="z-10 mr-1 flex gap-1 text-xs text-neutral-500 dark:text-neutral-400">
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
                <ScrollArea className="h-20 w-full truncate text-wrap rounded-md border p-2 px-2 text-sm opacity-60">
                  {gig.content}
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </div>

              <div className="my-4 flex items-center justify-between">
                <div className="mr-3 flex gap-2 text-xs text-neutral-500 dark:text-neutral-400">
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
              className={`m-1 flex-1 ${status === UserRole.SKIZZER ? "bg-white text-black shadow hover:bg-white hover:ring-black" : "bg-black text-white"} dark:bg-neutral-200 dark:bg-opacity-95 dark:text-black dark:hover:bg-white dark:hover:text-black dark:hover:ring-white`}
              variant={`${status === UserRole.SKIZZER ? "ringHover" : "gooeyLeft"}`}
            >
              Message
            </ButtonE>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
