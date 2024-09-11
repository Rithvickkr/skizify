import { GigStatus } from "@repo/store/types";
import { Avatar } from "@repo/ui/avatar";

import { CalendarRange, Clock7Icon, EditIcon, TrashIcon } from "lucide-react";
import { Card } from "../../../@/components/ui/card";
import { ToolTip } from "@repo/ui/tooltip";

// import { useRouter } from "next/navigation";
import { GigsInterface } from "@repo/store/types";
import { CalendarClock, Clock7 } from "lucide-react";
import { ScrollArea, ScrollBar } from "../../../@/components/ui/scroll-area";
import {
  Month,
  SessionTime,
  formatTime,
} from "../../lib/actions/ConvertgigInfo";
import { Button } from "../ui/button";
import AcceptedBy from "./AcceptedBy";
import EditDeleteCard from "./EditDeletecard";
import RedirectToMeetingPage from "./RedirectingMeetingButton";

interface User {
  userImage: string;
  name: string;
}

interface MygigCardProps {
  gigs: GigsInterface[];
}

export function MygigCard({
  gigs,
  session,
}: {
  gigs: GigsInterface[];
  session: any;
}) {
  // const router = useRouter();
  return (
    <div className="group/mygiggs space-y-4 pl-3 transition duration-200">
      {Array.isArray(gigs) && gigs.length > 0 ? (
        gigs.map((gig) => (
          <div
            key={gig.id}
            className="-800 flex w-full flex-col rounded-md rounded-tl-3xl border border-neutral-300 p-3 shadow-md transition duration-200 hover/mygiggs:translate-x-2 dark:border-2 dark:border-neutral-600 dark:bg-black"
          >
            <div className="flex w-full justify-between">
              <div className="flex space-x-1">
                <Avatar
                  name={session?.user.name}
                  photo={session?.user.userImage}
                  classname="size-10 text-sm mr-3"
                />
                <div className="self-center">
                  <span className="text-sm text-neutral-500 md:text-base">
                    {session?.user.name}
                  </span>
                </div>
              </div>
              <div className="flex self-center">
                <EditDeleteCard gig={gig} />
              </div>
            </div>
            <hr className="my-1 dark:border-neutral-600" />
            <div className="my-3 flex">
              <div className="flex flex-1 flex-col shadow-sm-light">
                <div className="ml-2 font-display text-lg md:text-xl">
                  <h1>{gig.title || "Title"}</h1>
                </div>
                <div className="h-full">
                  <ScrollArea className="h-full w-full truncate text-wrap rounded-md border p-2 px-2 text-sm">
                    {gig.content}
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                </div>
              </div>
              <div className="grid flex-1 grid-cols-1 py-2 pl-2 md:grid-cols-2">
                <div className="my-1 flex cursor-pointer place-content-start items-center rounded-lg p-2 hover:dark:bg-v0dark sm:my-2 md:my-0">
                  <Clock7
                    className="mr-3 size-5 cursor-pointer text-xl font-medium text-neutral-400 dark:text-white md:size-6"
                    strokeWidth={1.5}
                    absoluteStrokeWidth
                  />
                  <div className="text-sm font-medium text-neutral-400 lg:text-base">
                    {`${Month(gig.startDateTime)} ${gig.startDateTime.getDate()} - ${Month(gig.endDateTime)} ${gig.endDateTime.getDate()}`}
                  </div>
                </div>
                <div className="my-1 flex cursor-pointer place-content-center items-center rounded-lg py-2 pl-2 hover:dark:bg-v0dark sm:my-2 md:my-0">
                  <CalendarClock
                    className="mr-3 size-5 cursor-pointer text-xl font-medium dark:text-white md:size-6"
                    strokeWidth={1.5}
                    absoluteStrokeWidth
                  />
                  <div className="font-base text-xs sm:text-sm lg:text-base">
                    {`${formatTime(gig.startDateTime)} - ${formatTime(gig.endDateTime)}`}
                  </div>
                </div>
                <div className="my-1 flex cursor-pointer place-content-start items-center rounded-lg p-2 hover:dark:bg-v0dark sm:my-2 md:my-0">
                  <CalendarRange
                    className="mr-3 size-5 cursor-pointer text-xl font-medium text-neutral-400 dark:text-white md:size-6"
                    strokeWidth={1.5}
                    absoluteStrokeWidth
                  />
                  <div className="text-sm font-medium text-neutral-400 md:text-base">
                    {SessionTime(Number(gig.timeneeded))}
                  </div>
                </div>
                {gig.status === GigStatus.CONFIRMED ? (
                  <RedirectToMeetingPage confirmId={gig.confirmUserId} />
                ) : (
                  <AcceptedBy gig={gig} />
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>No gigs available</div>
      )}
    </div>
  );
}

export function MygigCard2({
  gigs,
  session,
}: {
  gigs: GigsInterface[];
  session: any;
}) {
  return (
    <div className="space-y-4 pl-3 transition duration-200">
      {Array.isArray(gigs) && gigs.length > 0 ? (
        gigs.map((gig, index) => (
          <Card
            key={index}
            className="group relative w-full overflow-hidden bg-neutral-100 text-white shadow-2xl dark:bg-black"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 via-neutral-100 to-neutral-50 opacity-50 dark:from-neutral-800 dark:via-black dark:to-neutral-700" />
            <div className="absolute inset-0 backdrop-blur-[2px]" />
            <div className="relative z-10 p-2 sm:p-3 md:p-4">
              <div className="mb-3 flex flex-col items-center justify-between space-y-4 sm:mb-5 sm:flex-row sm:items-center sm:space-y-0">
                <div className="flex flex-col items-center space-y-1 sm:flex-row sm:items-start sm:space-x-4 sm:space-y-0">
                  <div className="relative">
                    <Avatar
                      name={session?.user.name}
                      photo={session?.user.userImage}
                      classname="sm:size-16 size-14 sm:rounded-xl rounded-lg border-4 border-white dark:border-neutral-800 shadow-xl transition-all duration-500 ease-in-out group-hover:scale-105 group-hover:rotate-6 "
                    />
                  </div>
                  <div>
                    <h2 className="mb-1 bg-gradient-to-r from-neutral-400 to-neutral-500 bg-clip-text text-xl font-semibold text-transparent dark:to-neutral-200 sm:text-2xl">
                      {session?.user.name}
                    </h2>
                    {/* <p className="text-sm text-neutral-400">@johndoe</p> */}
                  </div>
                </div>
                <div className="absolute right-4 top-2 flex items-center space-x-2 sm:top-6">
                  <EditDeleteCard gig={gig} />
                </div>
              </div>

              <div className="relative mb-3 overflow-hidden rounded-lg bg-gradient-to-br from-white/80 to-neutral-100/40 px-3 pb-2 pt-3 shadow-md backdrop-blur-sm transition-all duration-500 ease-in-out group-hover:shadow-lg dark:from-neutral-900/80 dark:to-neutral-800/40 sm:px-6 sm:pt-6">
                <div className="absolute -right-4 -top-4 size-16 rounded-full bg-neutral-200/50 transition-all duration-500 ease-in-out group-hover:scale-150 group-hover:bg-neutral-300/50 dark:bg-neutral-700/50 dark:group-hover:bg-neutral-600/50" />
                <h4 className="mb-2 max-w-[700px] truncate text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                  {gig.title}
                </h4>
                <div className="text-sm leading-relaxed text-neutral-600 transition-all duration-500 ease-in-out dark:text-neutral-400">
                  <ScrollArea className="h-12 w-full border-0 rounded-md shadow-none">
                    <p className="whitespace-normal break-words pr-4">
                      {gig.content}
                    </p>
                    <ScrollBar orientation="vertical" />
                  </ScrollArea>
                </div>
              </div>

              <div className="p-1 duration-400  mb-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="shadow-sm mx-1 border dark:border-0 transform cursor-pointer rounded-lg bg-white bg-opacity-5 p-2 backdrop-filter transition-transform duration-300 hover:scale-105 sm:p-4">
                  <div className="mb-2 flex items-center text-sm">
                    <CalendarRange className="mr-2 size-4 text-neutral-800 opacity-85 hover:opacity-100 dark:text-neutral-400" />
                    <span className="font-medium text-neutral-800 opacity-85 hover:opacity-100 dark:text-neutral-200">
                      Date Range
                    </span>
                  </div>
                  <p className="text-xs text-neutral-800 opacity-85 hover:opacity-100 dark:text-neutral-300">
                    {`${Month(gig.startDateTime)} ${gig.startDateTime.getDate()} - ${Month(gig.endDateTime)} ${gig.endDateTime.getDate()}`}
                  </p>
                </div>
                <div className="shadow-sm mx-1 border dark:border-0 transform cursor-pointer rounded-lg bg-white bg-opacity-5 p-2 backdrop-filter transition-transform duration-300 hover:scale-105 sm:p-4">
                  <div className="mb-2 flex items-center text-sm">
                    <Clock7Icon className="mr-2 size-4 text-neutral-800 opacity-85 hover:opacity-100 dark:text-neutral-400" />
                    <span className="font-medium text-neutral-800 opacity-85 hover:opacity-100 dark:text-neutral-200">
                      Time
                    </span>
                  </div>
                  <p className="text-xs text-neutral-800 opacity-85 hover:opacity-100 dark:text-neutral-300">
                    {`${formatTime(gig.startDateTime)} - ${formatTime(gig.endDateTime)}`}
                  </p>
                </div>
              </div>

              <div className=" cursor-pointer  shadow-md hover:shadow-lg  mb-3 transform rounded-lg bg-neutral-200 from-lightdark to-mediumdark p-2 transition-all duration-300 hover:scale-100    dark:bg-gradient-to-r">
                <div className="flex flex-col flex-wrap items-center gap-1 text-xs sm:flex-row sm:justify-around sm:gap-2">
                  <div className="bg-gradient-to-r flex-1 sm:flex-initial from-black to-v0dark bg-clip-text text-base font-semibold text-transparent dark:from-neutral-300 dark:to-white sm:text-lg">
                    Session Details
                  </div>
                  <div>
                    <span className="text-neutral-800 dark:text-neutral-400">
                      Session Duration:
                    </span>
                    <span className="ml-1 text-neutral-800 dark:text-neutral-200">
                      {SessionTime(gig.timeneeded) == "1 Hr"
                        ? "60"
                        : SessionTime(gig.timeneeded).slice(0, 2)}{" "}
                      minutes
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-800 dark:text-neutral-400">
                      Category:
                    </span>
                    <span className="ml-1 text-neutral-800 dark:text-neutral-200">
                      {gig.category}
                    </span>
                  </div>
                </div>
              </div>

              <div className="relative">
                {/* <details className="group">
                  <summary className="flex w-full cursor-pointer items-center justify-between rounded-lg bg-white bg-opacity-5 p-2 text-left text-neutral-400 transition-colors duration-300 hover:bg-opacity-10 hover:text-white">
                    <span className="flex items-center">
                      <UserCheckIcon className="mr-2 size-4 text-neutral-400" />
                      Accepted by
                    </span>
                    <ChevronDownIcon className="size-4 transition-transform duration-300 group-open:rotate-180" />
                  </summary>
                  <div className="flex flex-wrap gap-2 px-2 pb-2 pt-4">
                    {[
                      "Alice Smith",
                      "Bob Johnson",
                      "Carol Williams",
                      "David Brown",
                      "Eva Davis",
                    ].map((name, index) => (
                      <span
                        key={index}
                        className="rounded-full bg-gradient-to-r from-neutral-800 to-neutral-900 px-3 py-1 text-xs font-medium text-white"
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                </details> */}
                {gig.status === GigStatus.CONFIRMED ? (
                  <RedirectToMeetingPage confirmId={gig.confirmUserId} />
                ) : (
                  <AcceptedBy gig={gig} />
                )}
              </div>
            </div>
            <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-neutral-500 via-neutral-600 to-neutral-700" />
          </Card>
        ))
      ) : (
        <div>No gigs available</div>
      )}
    </div>
  );
}
