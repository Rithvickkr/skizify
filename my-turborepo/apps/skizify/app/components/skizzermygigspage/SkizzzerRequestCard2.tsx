import React from "react";
import { Avatar } from "@repo/ui/avatar";
import { Badge } from "../../../@/components/ui/badge";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../../../@/components/ui/card";
import { Separator } from "../../../@/components/ui/separator";
import {
  CalendarIcon,
  CalendarRange,
  ClockIcon,
  DollarSignIcon,
  TagIcon,
  UserIcon,
  VideoIcon,
} from "lucide-react";
import { GiguserContent } from "@repo/store/types";
import { GigStatus } from "@repo/store/types";
import {
  Month,
  SessionTime,
  formatTime,
} from "../../lib/actions/ConvertgigInfo";
import { ScrollArea, ScrollBar } from "../../../@/components/ui/scroll-area";
import ViewProfile from "../mygigspage/viewProfile";
import { ToolTip } from "@repo/ui/tooltip";
import JoinButton from "./JoinButton";

// export interface GiguserContent {
//   id: string,
//   gigId: string,
//   skizzerId: string,
//   UserId: string,
//   status: GigStatus,
//   budget: number,
//   finalDateTime: Date,
//   gig: {
//     title: string;
//     content: string;
//     timeneeded: number;
//   };
//   user: {
//     name: string | null,
//     userImage: string | null
//   };
// }

// Helper functions (you'll need to implement these)

// This would typically be fetched from an API in a real server component

export default function EnhancedGigCard({
  gig,
}: {
  gig: GiguserContent;
}): JSX.Element {
  const statusColor =
    gig.status === GigStatus.CONFIRMED
      ? "bg-gradient-to-r from-emerald-400 via-lime-300 to-green-500 dark:from-emerald-500 dark:via-lime-500 dark:to-green-600"
      : gig.status === GigStatus.PENDING
        ? "bg-gradient-to-r from-amber-500 via-yellow-300 to-orange-400 dark:from-amber-400 dark:via-yellow-500 dark:to-orange-500"
        : "bg-gradient-to-r from-red-300 via-rose-200 to-red-500 dark:from-red-500 dark:via-rose-500 dark:to-red-700";
  const sessionTime = SessionTime(gig.gig.timeneeded);
  const finalTime = formatTime(gig.finalDateTime);
  const finalMonth = Month(gig.finalDateTime);

  //   <Avatar
  //   name={gig.user.name || "User"}
  //   photo={gig.user.userImage}
  //   classname="h-16 w-16 shadow-md ring-2 ring-neutral-700/20 transition-all duration-300 group-hover:ring-neutral-600/40"
  // />

  return (
    <Card className="group w-full overflow-hidden rounded-xl border border-neutral-200 bg-white text-neutral-800 shadow-md backdrop-blur-md transition-all duration-300 ease-in-out hover:shadow-lg dark:border-neutral-800/50 dark:bg-neutral-900/60 dark:text-neutral-200 dark:shadow-lg dark:hover:shadow-xl">
      <div className="absolute inset-0 bg-gradient-to-r from-neutral-200/60 via-transparent to-neutral-300/60 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100 dark:from-neutral-800/10 dark:to-neutral-700/10" />
      <CardHeader className="relative p-3">
        <div className="flex items-center space-x-4">
          <Avatar
            name={gig.user.name || "User"}
            photo={gig.user.userImage}
            classname="size-14 rounded-xl border-4 border-white dark:border-neutral-800 shadow-xl transition-all duration-500 ease-in-out group-hover:scale-105 group-hover:rotate-3"
          />
          <div className="flex-grow space-y-1">
            <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100">
              {gig.user.name || "Anonymous"}
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Tech Innovator & AI Specialist
            </p>
          </div>
          <Badge
            className={`${statusColor} rounded-full px-3 py-1 text-xs font-medium text-neutral-800 shadow-sm transition-all duration-300 group-hover:scale-105 dark:text-neutral-100`}
          >
            {gig.status}
          </Badge>
        </div>
      </CardHeader>
      <Separator className="mx-4 my-2 bg-neutral-200 dark:bg-neutral-800" />
      <CardContent className="relative space-y-4 p-3">
        <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-white/80 to-neutral-100/40 p-6 shadow-md backdrop-blur-sm transition-all duration-500 ease-in-out group-hover:shadow-lg dark:from-neutral-900/80 dark:to-neutral-800/40">
          <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-neutral-200/50 transition-all duration-500 ease-in-out group-hover:scale-150 group-hover:bg-neutral-300/50 dark:bg-neutral-700/50 dark:group-hover:bg-neutral-600/50" />
          <h4 className="mb-2 truncate text-lg sm:text-xl font-semibold text-neutral-900 dark:text-neutral-100">
            {gig.gig.title}
          </h4>
          <div className="text-sm leading-relaxed text-neutral-600 transition-all duration-500 ease-in-out dark:text-neutral-400">
            <ScrollArea className="h-12 w-full border-0 shadow-none">
              <p className="whitespace-normal break-words pr-4">
                {gig.gig.content}
              </p>
              <ScrollBar orientation="vertical" />
            </ScrollArea>
          </div>
        </div>
        <Separator className="my-2 bg-neutral-200 dark:bg-neutral-800" />
        <div className="grid grid-cols-2 gap-1 p-1 text-sm font-medium">
          <div className="flex cursor-pointer items-center space-x-2 rounded-md p-2 text-neutral-500 transition-all duration-300 hover:bg-neutral-200 group-hover:text-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:group-hover:text-neutral-200">
            <CalendarRange className="h-4 w-4 text-neutral-400 transition-colors duration-300 dark:text-neutral-500" />
            <ToolTip name="Meeting Date">
              <span>
                {finalMonth} {gig.finalDateTime.getDate()}
              </span>
            </ToolTip>
          </div>
          <div className="flex cursor-pointer items-center space-x-2 rounded-md p-2 text-neutral-500 transition-all duration-300 hover:bg-neutral-200 group-hover:text-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:group-hover:text-neutral-200">
            <ClockIcon className="h-4 w-4 text-neutral-400 transition-colors duration-300 dark:text-neutral-500" />
            <ToolTip name="Meeting Time">
              <span>{finalTime}</span>
            </ToolTip>
          </div>
          <div className="flex cursor-pointer items-center space-x-2 rounded-md p-2 text-neutral-500 transition-all duration-300 hover:bg-neutral-200 group-hover:text-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:group-hover:text-neutral-200">
            <DollarSignIcon className="h-4 w-4 text-neutral-400 transition-colors duration-300 dark:text-neutral-500" />
            <ToolTip name="Buget">
              <span>{gig.budget}</span>
            </ToolTip>
          </div>
          <div className="flex cursor-pointer items-center space-x-2 rounded-md p-2 text-neutral-500 transition-all duration-300 hover:bg-neutral-200 group-hover:text-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:group-hover:text-neutral-200">
            <TagIcon className="h-4 w-4 text-neutral-400 transition-colors duration-300 dark:text-neutral-500" />
            <ToolTip name="Session Duration">
              <span>
                {sessionTime == "1 Hr" ? "60" : sessionTime.slice(0, 2)} minutes
              </span>
            </ToolTip>
          </div>
        </div>
      </CardContent>
      <div className="flex items-center justify-between border-t border-neutral-200 p-6 dark:border-neutral-800/50">
        <ViewProfile
          id={gig.gig.authorId}
          classname="flex items-center space-x-2 rounded-full border border-neutral-500 bg-v0dark px-4 py-2 text-sm text-white shadow-md transition-all duration-300 hover:shadow-lg  dark:border-0 dark:bg-neutral-800/90 dark:text-neutral-100 dark:shadow-md dark:hover:bg-neutral-700 dark:hover:shadow-lg"        />
        <JoinButton />
      </div>
    </Card>
  );
}
