import { Avatar } from "@repo/ui/avatar";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import getgigs from "../../lib/actions/getgigs";
import {
  ArrowRightIcon,
  CalendarDays,
  Clock7,
  Hourglass,
  Pencil,
  Trash,
  Trash2,
} from "lucide-react";
import { ScrollArea, ScrollBar } from "../../../@/components/ui/scroll-area";
import {
  Month,
  SessionTime,
  formatTime,
} from "../../lib/actions/ConvertgigInfo";
import { Button } from "../ui/button";
import AcceptedBy from "./AcceptedBy";

//This will take content,
export default async function MygigCard() {
  const session = await getServerSession(authOptions);
  const gigs = await getgigs();

  return (
    <div className="group/mygiggs space-y-4 p-3 transition duration-200">
      {gigs.map((gig) => {
        return (
          <div className="flex w-full flex-col rounded-lg border border-gray-300 p-3 shadow-md transition duration-200 hover/mygiggs:translate-x-2">
            <div className="flex w-full justify-between">
              <div className="flex space-x-1">
                <Avatar
                  name={session?.user.name}
                  photo={session?.user.userImage}
                  classname="size-10 text-sm"
                />
                <div className="self-center">
                  <span className="text-md text-gray-500">
                    {session?.user.name}
                  </span>
                </div>
              </div>
              <div className="flex self-center">
                <div className="m-1 cursor-pointer rounded p-1 text-gray-500 shadow">
                  <Pencil
                    className="size-4 text-black dark:text-white md:size-6"
                    strokeWidth={1.3}
                    absoluteStrokeWidth
                  />
                </div>
                <div className="m-1 cursor-pointer rounded p-1 text-red-500 shadow">
                  <Trash
                    className="size-4 md:size-6"
                    color="#ff0000"
                    strokeWidth={1.5}
                    absoluteStrokeWidth
                  />
                </div>
              </div>
            </div>

            <div className="my-3 flex">
              <div className="flex flex-1 flex-col">
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
                <div className="my-1 flex place-content-start items-center p-2 sm:my-2 md:my-0">
                  <div>
                    <CalendarDays
                      className="mr-3 size-5 cursor-pointer text-xl font-medium text-gray-400 dark:text-white md:size-6"
                      strokeWidth={1.5}
                      absoluteStrokeWidth
                    />
                  </div>
                  <div className="text-sm font-medium text-gray-400 lg:text-base">{`${Month(gig.startDateTime)} ${gig.startDateTime.getDay()} - ${Month(gig.endDateTime)} ${gig.endDateTime.getDay()}`}</div>
                </div>
                <div className="my-1 flex place-content-start items-center py-2 pl-2 sm:my-2 md:my-0">
                  <div>
                    <Hourglass
                      className="mr-3 size-5 cursor-pointer text-xl font-medium dark:text-white md:size-6"
                      strokeWidth={1.5}
                      absoluteStrokeWidth
                    />
                  </div>
                  <div className="text-xs font-medium sm:text-sm lg:text-base">{`${formatTime(gig.startDateTime)} - ${formatTime(gig.endDateTime)}`}</div>
                </div>
                <div className="my-1 flex place-content-start items-center p-2 sm:my-2 md:my-0">
                  <div>
                    <Clock7
                      className="mr-3 size-5 cursor-pointer text-xl font-medium text-gray-400 dark:text-white md:size-6"
                      strokeWidth={1.5}
                      absoluteStrokeWidth
                    />
                  </div>
                  <div className="text-sm font-medium text-gray-400 md:text-base">
                    {SessionTime(gig.timeneeded)}
                  </div>
                </div>
                <AcceptedBy gig={gig} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

//space-x,y-2/3/4 to give space b/w it's children
