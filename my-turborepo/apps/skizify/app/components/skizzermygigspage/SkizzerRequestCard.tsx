import { GiguserContent } from "./SkizzerrequestPage";
import { Avatar } from "@repo/ui/avatar";
import { cn } from "../../utils/cn";
import { Card, CardContent, CardFooter } from "../../../@/components/ui/card";
import { ScrollArea, ScrollBar } from "../../../@/components/ui/scroll-area";
import { Button as ButtonE } from "../ui/button";
import { CalendarRange, Clock7 } from "lucide-react";
import {
  Month,
  SessionTime,
  formatTime,
} from "../../lib/actions/ConvertgigInfo";

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
  return (
    <div
      className={cn(
        "group/bento shadow-input row-span-1 flex w-full cursor-pointer items-center justify-center space-y-4 rounded-xl border border-[#d1d5d8] bg-white p-3 transition duration-200 hover:shadow-lg dark:border-gray-800 dark:bg-[#020817] dark:shadow-none",
        className,
      )}
    >
      <div className="w-full transition duration-200 group-hover/bento:translate-x-2">
        <Card className="mx-auto w-full max-w-lg">
          <CardContent className="grid w-full grid-cols-2 space-x-2">
            <div className="flex flex-col">


              <div className="flex justify-between truncate overflow-hidden">
                <div className="flex space-x-1">
                  <Avatar
                    name={request.user.name}
                    photo={request.user.userImage}
                    classname="size-8 text-sm"
                  />
                    <div className="text-sm text-gray-500 truncate overflow-hidden self-center">
                      {request.user.name}
                    </div>
                </div>
              </div>


              <div className="w-full">
                <div className="my-4 flex items-center justify-between">
                  <div className="mr-3 flex gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <div className="self-center">
                      <Clock7 className="size-4" />
                    </div>
                    <div className="self-center text-sm">{`${finalTime}`}</div>
                  </div>
                  <div className="flex items-center">
                    <CalendarRange className="mr-2 h-5 w-5" />
                    <span className="text-sm">{`${finalDate} ${request.finalDateTime.getDate()}`}</span>
                  </div>
                </div>
              </div>


              <div className="mr-2 flex gap-2 text-sm text-gray-500 dark:text-gray-400">
                <div className="self-center">
                  <Clock7 className="size-4" />
                </div>
                <div className="self-center">{sessionTime}</div>
              </div>
            </div>

            <div className="my-2 flex flex-col bg-white dark:bg-transparent">
              <div className="ml-2 h-5 justify-items-center font-display text-md font-medium truncate">
                {request.gig.title || "Title"}
              </div>
              <ScrollArea className="w-full truncate text-wrap rounded-md border p-2 px-2 text-sm">
                {request.gig.content}
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex space-x-4">
              <div className="flex-1"></div>
              <ButtonE className="col-span-1 flex-1 bg-white text-black shadow hover:bg-white">
                Message
              </ButtonE>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
