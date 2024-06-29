"use client";
import { Avatar } from "@repo/ui/avatar";
import { deleteGig } from "../../lib/actions/deletegig";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { GigStatus } from "@prisma/client";
import { useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../@/components/ui/tooltip"
import {
  ArrowRightIcon,
  CalendarDays,
  Clock7,
  Hourglass,
  Pencil,
  Trash,
} from "lucide-react";
import { ScrollArea, ScrollBar } from "../../../@/components/ui/scroll-area";
import {
  Month,
  SessionTime,
  formatTime,
} from "../../lib/actions/ConvertgigInfo";
import { Button } from "../ui/button";
import { GigsInterface } from "../../(dashboard)/explore/page";
import { useSession } from "next-auth/react";
import AcceptedBy from "./AcceptedBy";
import EditDeleteCard from "./EditDeletecard";

interface User {
  userImage: string;
  name: string;
  
}

interface MygigCardProps {
  gigs: GigsInterface[];
}

export default function MygigCard({ gigs }: { gigs: GigsInterface[] } , {session}: {session: any}) {
  const router = useRouter();
  
  return (
    <div className="group/mygiggs space-y-4 p-3 transition duration-200">
      {Array.isArray(gigs) && gigs.length > 0 ? (
        gigs.map((gig) => (
          <div
            key={gig.id}
            className="flex w-full flex-col rounded-lg border border-gray-300 dark:border-2 dark:border-gray-800 p-3 shadow-md transition duration-200 hover/mygiggs:translate-x-2 dark:bg-[#020817]"
          >
            <div className="flex w-full justify-between">
              <div className="flex space-x-1">
                <Avatar
                  name={session?.user.name}
                  photo={session?.user.userImage}
                  classname="size-10 text-sm mr-3"
                />
                <div className="self-center">
                  <span className="md:text-md text-sm text-gray-500">
                    {session?.user.name}
                  </span>
                </div>
              </div>
              <div className="flex self-center">
                <EditDeleteCard gig={gig} />
              </div>
            </div>
            <hr className="my-1 dark:border-gray-800" />
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
                <div className="my-1 flex place-content-start items-center p-2 sm:my-2 md:my-0">
                <Clock7
                    className="mr-3 size-5 cursor-pointer text-xl font-medium text-gray-400 dark:text-white md:size-6"
                    strokeWidth={1.5}
                    absoluteStrokeWidth
                  />
                  <div className="text-sm font-medium text-gray-400 lg:text-base">
                    {`${Month(gig.startDateTime)} ${gig.startDateTime.getDate()} - ${Month(gig.endDateTime)} ${gig.endDateTime.getDate()}`}
                  </div>
                </div>
                <div className="my-1 flex place-content-start items-center py-2 pl-2 sm:my-2 md:my-0">
                  <Hourglass
                    className="mr-3 size-5 cursor-pointer text-xl font-medium dark:text-white md:size-6"
                    strokeWidth={1.5}
                    absoluteStrokeWidth
                  />
                  <div className="font-base text-xs sm:text-sm lg:text-base">
                    {`${formatTime(gig.startDateTime)} - ${formatTime(gig.endDateTime)}`}
                  </div>
                </div>
                <div className="my-1 flex place-content-start items-center p-2 sm:my-2 md:my-0">
                <CalendarDays
                    className="mr-3 size-5 cursor-pointer text-xl font-medium text-gray-400 dark:text-white md:size-6"
                    strokeWidth={1.5}
                    absoluteStrokeWidth
                  />
                  <div className="text-sm font-medium text-gray-400 md:text-base">
                    {SessionTime(Number(gig.timeneeded))}
                  </div>
                </div>
                {gig.status === GigStatus.CONFIRMED ? (
                  <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                  <Button
                    className="w-full bg-black text-white hover:bg-black dark:bg-white dark:text-black hover:dark:bg-white"
                    Icon={ArrowRightIcon}
                    iconPlacement="right"
                    variant="gooeyLeft"
                    onClick={() => router.push(`/Meetingpage`)}
                  >
                    Booked 🎉
                  </Button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-black text-white dark:bg-white dark:text-black">
                      <p>Check out Calendar</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
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
