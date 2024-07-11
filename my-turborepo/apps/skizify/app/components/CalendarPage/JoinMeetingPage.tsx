"use client";
import { Avatar } from "@repo/ui/avatar";

import { Button } from "../ui/button";
import {
  Credenza,
  CredenzaBody,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "../ui/Credenza";
import { meetingsInfo_interface } from "../../lib/actions/getcalendarMeetings";
import { UserRole } from "@prisma/client";
import { useSession } from "next-auth/react";
import { ScrollArea, ScrollBar } from "../../../@/components/ui/scroll-area";
import  { useRouter } from "next/navigation";

export default function JoinMeetingPage({
  meeting,
}: {
  meeting: meetingsInfo_interface;
}) {
  const Router = useRouter(); 
  const session = useSession();
  return (
    <div className="">
      <Credenza>
        <CredenzaTrigger asChild>
          <div className="p-2">
            <Button
              variant="gooeyLeft"
              className="bg-black dark:bg-white dark:text-black"
             
            >
              Join
            </Button>
          </div>
        </CredenzaTrigger>
        <CredenzaContent className="min-h-[40%] min-w-[55%] border-2 border-black dark:border dark:border-gray-200">
          <CredenzaBody className="grid grid-cols-2 grid-rows-6 gap-1 divide-x-1">
            <div className="truncate rounded border border-black">
              <div className="flex flex-col gap-1">
                <div className="pl-1 font-display text-3xl font-semibold md:text-4xl">
                  Join Meeting
                </div>
              </div>
              <div className="pl-1 text-xs text-neutral-400">
                <p>Watch out the details then Go on</p>
              </div>
            </div>
            <div className="row-span-3 grid grid-rows-7 truncate rounded border border-black">
              <div className="mt-2 pl-3 font-display text-2xl font-semibold">
                {meeting.gig.title || "Title"}
              </div>
              <div className="row-span-6 p-2">
                <ScrollArea className="h-full w-full truncate text-wrap rounded-md border p-2 px-2 text-base">
                  {meeting.gig.content}
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </div>
            </div>
            <div className="row-span-4 truncate rounded border border-black">
              Hello3
            </div>
            <div className="row-span-2 truncate rounded border border-black">
              Hello4
            </div>
            <div className="w-full">
              <div className="grid h-full w-full grid-cols-[auto_1fr] gap-2 truncate rounded-md border-2 border-black p-2 dark:border-white">
                <div className="place-content-center p-2">
                  {session.data?.user.role === UserRole.SKIZZER ? (
                    <Avatar
                      photo={meeting.user.userImage}
                      name={meeting.user.name}
                      classname="size-8 ring-2 ring-black dark:ring-white"
                    />
                  ) : (
                    <Avatar
                      photo={meeting.Skizzer.userImage}
                      name={meeting.Skizzer.name}
                      classname="size-8 ring-2 ring-black dark:ring-white"
                    />
                  )}
                </div>
                <div className="flex flex-col place-content-center">
                  <div className="text-md">
                    {session.data?.user.role === UserRole.SKIZZER
                      ? meeting.user.name
                      : meeting.Skizzer.name}
                  </div>
                  <div className="cursor-pointer text-sm hover:underline dark:text-gray-500">
                    View Profile {">"}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full truncate rounded p-1">
              <div className="grid h-full w-full grid-cols-2 gap-2 truncate rounded-md p-2 dark:ring-2 dark:ring-white">
                <div className="col-span-1 place-content-center outline-1">
                  <Button className="w-full border-2 border-black bg-neutral-100 text-black shadow hover:bg-white hover:shadow-sm hover:outline-1 hover:outline-stone-950 dark:border-white">
                    Message
                  </Button>
                </div>
                <div className="col-span-1 place-content-center outline-1">
                  <Button
                    variant="gooeyLeft"
                    className="w-full bg-black ring-2 ring-black dark:ring-white"
                    onClick={() => { UserRole.USER ? Router.push(`/Meetings/${meeting.skizzerId}`) : Router.push(`/meetings/${meeting.UserId}`)}}
                  >
                    Join
                  </Button>
                </div>
              </div>
            </div>
          </CredenzaBody>
        </CredenzaContent>
      </Credenza>
    </div>
  );
}
