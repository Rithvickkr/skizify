"use client";
import { Avatar, AvatarImage, AvatarFallback } from "../../../@/components/ui/avatar";

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
import {
  format, //give shape to the Date&Time by getting month, year and many more //https://date-fns.org/v3.6.0/docs/format
} from "date-fns";

import { SessionTime } from "../../lib/actions/ConvertgigInfo";
import { meetingsInfo_interface } from "@repo/store/types";
import { UserRole } from "@repo/store/types";
import { useSession } from "next-auth/react";
import { ScrollArea, ScrollBar } from "../../../@/components/ui/scroll-area";
import { useRouter } from "next/navigation";
import {
  CalendarClock,
  CalendarRange,
  CircleDollarSign,
  Clock7,
  Video,
} from "lucide-react";
import { JSX, SetStateAction, SVGProps, useState } from "react";

export default function JoinMeetingPage({
  meeting,
}: {
  meeting: meetingsInfo_interface;
}) {
  const Router = useRouter();
  const session = useSession();
  const [mode, setmode] = useState(null);

  const handleClick = (button: any) => {
    setmode(button);
  };
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
        <CredenzaContent className="min-h-[40%] min-w-[55%] border-2 border-black ring-4 ring-white dark:border dark:border-gray-200">
          <CredenzaBody className="flex flex-col rounded">
            <div className="grid grid-cols-2 grid-rows-5 gap-1 rounded">
              <div className="truncate rounded">
                <div className="flex flex-col gap-1">
                  <div className="pl-1 font-display text-3xl font-semibold md:text-4xl">
                    Join Meeting
                  </div>
                </div>
                <div className="pl-1 text-xs text-neutral-400">
                  <p>Watch out the details then Go on</p>
                </div>
              </div>
              <div className="row-span-3 grid grid-rows-7 truncate rounded border border-black dark:border-white bg-neutral-100">
                <div className="mt-2 pl-3 font-display text-2xl font-semibold">
                  {meeting.gig.title || "Title"}
                </div>
                <div className="row-span-6 flex items-center px-2 pb-1 shadow transition-shadow duration-500 hover:shadow-xl">
                  <ScrollArea className="h-[90%] w-full truncate text-wrap rounded-md border border-black p-2 px-2 text-base dark:border-white">
                    {meeting.gig.content}
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                </div>
              </div>
              <div className="row-span-4 flex flex-col justify-evenly truncate rounded border border-black dark:border-white bg-neutral-100">
                <div className="m-3 grid grid-cols-[auto_1fr] rounded border border-black p-2 dark:border-white">
                  <div className="m-1 rounded border-2 border-black p-1 dark:border-white">
                    <CalendarRange />
                  </div>
                  <div className="my-auto text-sm font-medium ml-2">
                    <span>{format(meeting.finalDateTime,"MMM Mo yyyy")}</span>
                  </div>
                </div>
                <div className="m-3 grid grid-cols-[auto_1fr] rounded border border-black p-2 dark:border-white">
                  <div className="m-1 rounded border-2 border-black p-1 dark:border-white">
                    <CalendarClock />
                  </div>
                  <div className="my-auto text-sm font-medium ml-2">
                    <span>{format(meeting.finalDateTime,"p")}</span>
                  </div>
                </div>
                <div className="m-3 grid grid-cols-[auto_1fr] rounded border border-black p-2 dark:border-white">
                  <div className="m-1 rounded border-2 border-black p-1 dark:border-white">
                    <Clock7 />
                  </div>
                  <div className="my-auto text-sm font-medium ml-2">
                    <span>{SessionTime(meeting.gig.timeneeded)}</span>
                  </div>
                </div>
                <div className="m-3 grid grid-cols-[auto_1fr] rounded border border-black p-2 dark:border-white">
                  <div className="m-1 rounded border-2 border-black p-1 dark:border-white">
                    <CircleDollarSign />
                  </div>
                  <div className="my-auto text-sm font-medium ml-2">
                    <span>{meeting.budget}</span>
                  </div>
                </div>
              </div>
              <div className="row-span-2 flex flex-col truncate rounded border border-black px-1 dark:border-white bg-neutral-100">
                <div className="ml-3 mt-3 text-center font-display text-lg font-semibold dark:text-white">
                  <span>Select mode of meeting</span>
                </div>
                <div className="grid h-full grid-cols-3 gap-1 md:gap-2">
                  <div
                    onClick={() => handleClick("videoCall")}
                    className={`mx-1 mb-9 mt-3 flex cursor-pointer flex-col items-center justify-center rounded-md border ${mode === "videoCall" ? "border-2 border-black dark:border-white" : "border-neutral-700"} hover:bg-neutral-200 dark:hover:bg-neutral-800`}
                  >
                    <div>
                      <VideoIcon />
                    </div>
                    <div className="mt-2 text-xs font-medium">VideoCall</div>
                    <span className="sr-only">VideoCall</span>
                  </div>
                  <div
                    onClick={() => handleClick("voiceCall")}
                    className={`mx-1 mb-9 mt-3 flex cursor-pointer flex-col items-center justify-center rounded-md border ${mode === "voiceCall" ? "border-2 border-black dark:border-white" : "border-neutral-700"} hover:bg-neutral-200 dark:hover:bg-neutral-800`}
                  >
                    <div>
                      <MicIcon />
                    </div>
                    <div className="mt-2 text-xs font-medium">VoiceCall</div>
                    <span className="sr-only">VoiceCall</span>
                  </div>
                  <div
                    onClick={() => handleClick("screenShare")}
                    className={`mx-1 mb-9 mt-3 flex cursor-pointer flex-col items-center justify-center rounded-md border ${mode === "screenShare" ? "border-2 border-black dark:border-white" : "border-neutral-700"} hover:bg-neutral-200 dark:hover:bg-neutral-800`}
                  >
                    <div>
                      <ScreenShareIcon />
                    </div>
                    <div className="mt-2 text-[10px] font-medium lg:text-xs">
                      ScreenShare
                    </div>
                    <span className="sr-only">ScreenShare</span>
                  </div>
                </div>
              </div>
            </div>
            <CredenzaFooter className="mt-2 grid grid-cols-2 rounded border border-black p-2 px-1 dark:border-white bg-zinc-100 ">
              <div>
                <div className="m-1 flex rounded border border-black p-1 px-2 dark:border-white">
                  <div className="pr-2 pt-1">
                    {session.data?.user.role === UserRole.SKIZZER ? (
                      <Avatar className="size-8 ring-2 ring-black dark:ring-white">
                        <AvatarImage src={meeting.user.userImage || ""} alt={meeting.user.name || "User"} />
                        <AvatarFallback>{(meeting.user.name || "User").charAt(0)}</AvatarFallback>
                      </Avatar>
                    ) : (
                      <Avatar className="size-8 ring-2 ring-black dark:ring-white">
                        <AvatarImage src={meeting.Skizzer.userImage || ""} alt={meeting.Skizzer.name || "User"} />
                        <AvatarFallback>{(meeting.Skizzer.name || "User").charAt(0)}</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <div className="font-medium">
                      {session.data?.user.role === UserRole.SKIZZER
                        ? meeting.user.name
                        : meeting.Skizzer.name}
                    </div>
                    <div
                      className="cursor-pointer text-xs text-neutral-500 hover:underline dark:text-gray-500"
                      onClick={() => {
                        session.data?.user.role === UserRole.USER
                          ? Router.push(`/About/${meeting.skizzerId}`)
                          : Router.push(`/About/${meeting.UserId}`);
                      }}
                    >
                      View Profile {">"}
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 truncate rounded-md">
                <div className="col-span-1 place-content-center outline-1">
                  <Button className="h-[85%] w-full border border-black bg-neutral-100 text-black shadow hover:bg-white hover:shadow-sm hover:outline-1 hover:outline-stone-950 dark:border-white">
                    Message
                  </Button>
                </div>
                <div className="col-span-1 place-content-center outline-1">
                  <Button
                    variant="gooeyLeft"
                    className="h-[85%] w-full border bg-black"
                    onClick={() => {
                      session.data?.user.role === UserRole.USER
                        ? Router.push(`/Meetings/${meeting.skizzerId}`)
                        : Router.push(`/meetings/${meeting.UserId}`);
                    }}
                  >
                    Join
                  </Button>
                </div>
              </div>
            </CredenzaFooter>
            {/* <div className="flex w-full items-center">
              <div className="flex w-full gap-2 truncate rounded-md border border-white p-2 dark:border-white">
                <div className="flex">
                  <div className="p-2">
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
                  <div className="flex flex-col">
                    <div className="text-md">
                      {session.data?.user.role === UserRole.SKIZZER
                        ? meeting.user.name
                        : meeting.Skizzer.name}
                    </div>
                    <div
                      className="cursor-pointer text-sm hover:underline dark:text-gray-500"
                      onClick={() => {
                        session.data?.user.role === UserRole.USER
                          ? Router.push(`/About/${meeting.skizzerId}`)
                          : Router.push(`/About/${meeting.UserId}`);
                      }}
                    >
                      View Profile {">"}
                    </div>
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
                    className="w-full border bg-black ring-1 ring-white dark:ring-white"
                    onClick={() => {
                      session.data?.user.role === UserRole.USER
                        ? Router.push(`/Meetings/${meeting.skizzerId}`)
                        : Router.push(`/meetings/${meeting.UserId}`);
                    }}
                  >
                    Join
                  </Button>
                </div>
              </div>
            </div> */}
          </CredenzaBody>
        </CredenzaContent>
      </Credenza>
    </div>
  );
}
function MicIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
  );
}

function ScreenShareIcon(
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
      <path d="M13 3H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3" />
      <path d="M8 21h8" />
      <path d="M12 17v4" />
      <path d="m17 8 5-5" />
      <path d="M17 3h5v5" />
    </svg>
  );
}

function VideoIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
      <rect x="2" y="6" width="14" height="12" rx="2" />
    </svg>
  );
}
