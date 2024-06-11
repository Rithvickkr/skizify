"use client";
import { Avatar } from "@repo/ui/avatar";
import { deleteGig } from "../../lib/actions/deletegig";
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

interface User {
  userImage: string;
  name: string;
}

interface MygigCardProps {
  gigs: GigsInterface[];
  session: any;
}

export default function MygigCard({ gigs, session }: MygigCardProps) {
  // const deleteGig = async (id: string, session: any) => {
  //   try {
  //     await deleteGig(id, session);
  //   } catch (error) {
  //     console.error("Error deleting gig:", error);
  //     throw new Error("There was an error deleting the gig");
  //   }
  const deleteGigs= async (id: string, session: any) => {

       await deleteGig(id, session);
      window.alert("Gig deleted successfully");
      window.location.reload();
  }

  return (
    <div className="group/mygiggs space-y-4 p-3 transition duration-200">
      {Array.isArray(gigs) && gigs.length > 0 ? (
        gigs.map((gig) => (
          <div
            key={gig.id}
            className="flex w-full flex-col rounded-lg border border-gray-300 p-3 shadow-md transition duration-200 hover/mygiggs:translate-x-2"
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
                <div className="m-1 self-center truncate p-1 text-xs text-gray-500 md:text-sm">
                  Posted on{" "}
                  {`${formatTime(gig.createdAt)} ${Month(gig.createdAt)} ${gig.createdAt.getDay()}`}
                </div>
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
                    onClick={() => {
                      deleteGigs(gig.id, session);
                      // window.location.reload();
                      // window.alert("Gig deleted successfully");
                    }}
                  />
                </div>
              </div>
            </div>
            <hr className="my-1" />
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
                  <CalendarDays
                    className="mr-3 size-5 cursor-pointer text-xl font-medium text-gray-400 dark:text-white md:size-6"
                    strokeWidth={1.5}
                    absoluteStrokeWidth
                  />
                  <div className="text-sm font-medium text-gray-400 lg:text-base">
                    {`${Month(gig.startDateTime)} ${gig.startDateTime.getDay()} - ${Month(gig.endDateTime)} ${gig.endDateTime.getDay()}`}
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
                  <Clock7
                    className="mr-3 size-5 cursor-pointer text-xl font-medium text-gray-400 dark:text-white md:size-6"
                    strokeWidth={1.5}
                    absoluteStrokeWidth
                  />
                  <div className="text-sm font-medium text-gray-400 md:text-base">
                    {SessionTime(Number(gig.timeneeded))}
                  </div>
                </div>
                {/* <AcceptedBy gig={gig} /> */}
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
