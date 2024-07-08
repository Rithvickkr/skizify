"use client"
import { GiguserContent } from "./SkizzerrequestPage";
import { Avatar } from "@repo/ui/avatar";
import { cn } from "../../utils/cn";
import { Card, CardContent, CardFooter } from "../../../@/components/ui/card";
import { ScrollArea, ScrollBar } from "../../../@/components/ui/scroll-area";
import { Button as ButtonE } from "../ui/button";
import { CalendarRange, Clock7, Pencil, Trash } from "lucide-react";
import { GigStatus } from "@prisma/client";
import {
  Month,
  SessionTime,
  formatTime,
} from "../../lib/actions/ConvertgigInfo";
import { ToolTip } from "../ui/Tooltip";
import { useRouter } from "next/navigation";

//name //title //content //
export default function SkizzerRequestCard({
  request,
  className,
}: {
  request: GiguserContent;
  className?: string;
}) {
  const sessionTime = SessionTime(request.gig.timeneeded);
  const finalTime = formatTime(request.finalDateTime);
  const finalDate = Month(request.finalDateTime);
  const router = useRouter();
  return (
    <div
      className={cn(
        "group/bento shadow-input row-span-1 flex w-full cursor-pointer items-center justify-center space-y-4 rounded-xl border bg-white p-3 transition duration-200 hover:shadow-lg dark:border-gray-800 dark:bg-[#020817] dark:shadow-none ",
        className,
      )}
    >
      <div className="w-full transition duration-200 group-hover/bento:translate-x-2">
        <Card className="mx-auto w-full max-w-lg">
          <CardContent className="grid w-full grid-cols-2 space-x-2">
            <div className="mb-2 grid grid-rows-3">
              <div className="row-span-1 mb-1 flex justify-between overflow-hidden truncate rounded border border-black dark:border-gray-800  p-1">
                <div className="flex space-x-1">
                  <Avatar
                    name={request.user.name}
                    photo={request.user.userImage}
                    classname="size-8 text-sm p-1 "
                  />
                  <div className="self-center overflow-hidden truncate text-sm text-gray-500">
                    {request.user.name}
                  </div>
                </div>
              </div>

              <div className="mb-1 grid grid-cols-2 gap-x-1 text-xs">
                <div className="flex items-center justify-center rounded border border-black p-1 dark:border-gray-800">
                  <div className="flex gap-1 text-gray-500 dark:text-gray-400">
                    <div className="self-center">
                      <Clock7 className="size-4" />
                    </div>
                    <div className="self-center">{`${finalTime}`}</div>
                  </div>
                </div>

                <div className="flex items-center justify-center rounded border border-black p-1 dark:border-gray-800">
                  <div className="flex items-center">
                    <CalendarRange className="mr-1 h-5 w-5" />
                    <span className="font-medium">{`${finalDate} ${request.finalDateTime.getDate()}`}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-1 text-xs">
                <div className="flex items-center justify-center rounded border border-black p-1 dark:border-gray-800">
                  <div className="mr-2 flex gap-2 text-gray-500 dark:text-gray-400">
                    <div className="self-center">
                      <Clock7 className="size-4" />
                    </div>
                    <div className="self-center">{sessionTime}</div>
                  </div>
                </div>
                <div className="flex items-center justify-center rounded border border-black p-1 font-medium dark:border-gray-800">
                  $ {request.budget}
                </div>
              </div>
            </div>

            <div className="mb-2 grid grid-rows-3 bg-white dark:bg-transparent">
              <div className="text-md row-span-1 mb-1 justify-items-center truncate rounded border border-black pl-1 pt-1 font-display font-medium dark:border-gray-800">
                {request.gig.title || "Title"}
              </div>
              <ScrollArea className="row-span-2 w-full truncate text-wrap rounded-md border border-black p-2 px-2 text-sm dark:border-gray-800">
                {request.gig.content}
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
          </CardContent>
          <CardFooter className="grid grid-cols-2 space-x-1">
            <div className="col-span-1">
              <ButtonE
                className="col-span-1 w-full border border-black bg-white text-black shadow hover:border hover:border-black hover:bg-white hover:ring-2 hover:ring-white dark:bg-gray-200 hover:dark:border-white"
                variant="ringHover"
              >
                Message
              </ButtonE>
            </div>

            <div className="grid grid-cols-2">
              <div className="col-span-1 ml-1 w-full">
                {request.status === GigStatus.CONFIRMED ? (
                  <ButtonE
                    className="w-full border bg-neutral-800 text-white shadow dark:border-white dark:bg-transparent"
                    variant="gooeyLeft"
                    onClick={() => router.push(`/Meetingpage`)}
                  >
                    Join
                  </ButtonE>
                ) : (
                  <div></div>
                )}
              </div>

              <div className="col-span-1 flex justify-end">
                <ToolTip name={"Edit"}>
                  <div className="mr-1 cursor-pointer self-end rounded p-1 text-gray-500 shadow dark:border dark:border-gray-800">
                    <Pencil
                      className="size-4 text-black dark:text-white"
                      strokeWidth={1.3}
                      absoluteStrokeWidth
                    />
                  </div>
                </ToolTip>
                <ToolTip
                  name="Delete"
                  className="bg-red-500 dark:bg-red-500 dark:text-white"
                >
                  <div className="cursor-pointer self-end rounded p-1 text-red-500 shadow dark:border dark:border-gray-800">
                    <Trash
                      className="size-4"
                      color="#ff0000"
                      strokeWidth={1.5}
                      absoluteStrokeWidth
                    />
                  </div>
                </ToolTip>
                <ToolTip
                  name={request.status}
                  className={`${request.status === GigStatus.CONFIRMED ? "bg-green-500 dark:bg-green-500" : "bg-yellow-300 dark:bg-yellow-300"} dark:text-white`}
                >
                  <div
                    className={`ml-1 h-3 w-3 self-end rounded-full ${request.status === GigStatus.CONFIRMED ? "bg-green-500 dark:bg-green-500" : "bg-yellow-300 dark:bg-yellow-300"}`}
                  ></div>
                </ToolTip>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

