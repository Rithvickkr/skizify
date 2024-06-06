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
} from "./Credenza";
import { CalendarIcon, CheckCheck, Clock7 } from "lucide-react";
import { GigsInterface } from "../../(dashboard)/explore/page";
import { Datetimepackage } from "./Bentogrid";
import { Button } from "../../../@/components/ui/button";
import TimeSlider from "./Slider";
import { Avatar } from "@repo/ui/avatar";
import { ScrollArea } from "../../../@/components/ui/scroll-area";

export function BookButton2({
  gig,
  poster,
  Datetimepackage,
}: {
  gig: GigsInterface;
  poster: any;
  Datetimepackage: Datetimepackage;
}) {
  return (
    <div>
      <Credenza>
        <CredenzaTrigger asChild>
        <Button className="m-1 w-full col-span-1 bg-black text-white dark:border dark:border-white dark:bg-[#020817]">
          Book
        </Button>
        </CredenzaTrigger>
        <CredenzaContent>
          <CredenzaHeader>
            <CredenzaTitle>
            <div className="flex justify-between">
            <div className="flex items-center space-x-2">
              <Avatar
                name={poster.name}
                photo={poster.userImage}
                classname="size-12 text-md"
              />
              <div>
                <h3 className="text-base font-medium">{poster.name}</h3>
              </div>
            </div>

            <div className=" flex gap-2 text-sm text-gray-500 dark:text-gray-400 mr-6 items-center">
                <div className="">
                  <Clock7 className="size-6" />
                </div>
                <div className="text-lg font-normal">{Datetimepackage.sessionTime}</div>
              </div>

            </div>
            </CredenzaTitle>
            <CredenzaDescription>
            <div className="my-2 flex flex-col">
              <div className="mb-1 ml-2 h-7 justify-items-center font-display text-2xl font-semibold">
                {gig.title || "Title"}
              </div>
              <ScrollArea className="w-full truncate text-wrap rounded-md border p-2 px-2 text-sm">
                {gig.content}
              </ScrollArea>
            </div>
            </CredenzaDescription>
          </CredenzaHeader>
          <CredenzaBody>


          <div className="my-4 flex items-center justify-between px-2">
          <div className="mr-3 flex gap-2 text-sm text-gray-500 dark:text-gray-400">
            <div className="self-center">
              <Clock7 className="size-6" />
            </div>
            <div className="self-center text-base font-normal">{`${Datetimepackage.startTime} - ${Datetimepackage.endTime}`}</div>
          </div>
          <div className="flex items-center">
            <CalendarIcon className="mr-1 size-7" />
            <span className="text-base font-medium">{`${Datetimepackage.startDATEmonth} ${Datetimepackage.startDATEday} - ${Datetimepackage.endDATEmonth} ${Datetimepackage.endDATEday}`}</span>
          </div>
        </div>
        <div className="my-4">
          <div>
            <TimeSlider
              startTime={Datetimepackage.startTime}
              endTime={Datetimepackage.endTime}
            />
          </div>
          <div className="flex items-center justify-between px-2 text-sm text-gray-500 dark:text-gray-400">
            <span>{Datetimepackage.startTime}</span>
            <span>{Datetimepackage.endTime}</span>
          </div>
        </div>


          </CredenzaBody>
          <CredenzaFooter className="flex justify-between space-x-4">
            {/* <CredenzaClose asChild>
              <button>Close</button>
            </CredenzaClose> */}
            <Button className="m-1 flex-1 bg-white text-black">Message</Button>
            <Button className="my-1 mr-1 flex-1 bg-black text-white dark:border dark:border-white dark:bg-[#020817]">
              <CheckCheck className="mr-2 size-4" />
              Accept
            </Button>
          </CredenzaFooter>
        </CredenzaContent>
      </Credenza>
    </div>
  );
}
