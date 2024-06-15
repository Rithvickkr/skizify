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
import { Clock7 } from "lucide-react";
import { GigsInterface } from "../../(dashboard)/explore/page";
import { Datetimepackage } from "./Bentogrid";
import { Button } from "../../../@/components/ui/button";
import { Avatar } from "@repo/ui/avatar";
import { ScrollArea, ScrollBar } from "../../../@/components/ui/scroll-area";
import { Button as ButtonE } from "../ui/button";
import { acceptGig } from "../../lib/actions/Skizzer-accept-gig";
import BookmeetingButton from "./Bookbutton";
import { SelectDATE } from "./SelectDate";
import { Content } from "@radix-ui/react-popover";
import { Label } from "../../../@/components/ui/label";
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
          <ButtonE
            className="col-span-1 m-1 w-full bg-black text-white dark:border dark:border-white dark:bg-[#020817]"
            variant="gooeyLeft"
          >
            Book
          </ButtonE>
        </CredenzaTrigger>
        <CredenzaContent className="border-2 border-black">
          <CredenzaHeader>
            <CredenzaTitle>
              <div className="flex justify-between">
                <div className="flex items-center space-x-2">
                  <Avatar
                    name={poster.name}
                    photo={poster.userImage}
                    classname="size-10 text-md"
                  />
                  <div>
                    <h3 className="text-lg font-bold">{poster.name}</h3>
                  </div>
                </div>

                <div className="mr-4 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <div className="">
                    <Clock7 className="size-5" />
                  </div>
                  <div className="text-base font-normal">
                    {Datetimepackage.sessionTime}
                  </div>
                </div>
              </div>
            </CredenzaTitle>
            <CredenzaDescription>
              <div className="flex flex-col">
                <div className="mb-1 ml-2 h-7 justify-items-center font-display text-2xl font-semibold">
                  {gig.title || "Title"}
                </div>
                <ScrollArea className="w-full truncate text-wrap rounded-md border p-2 px-2 text-sm">
                  {gig.content}
                  <ScrollBar orientation="vertical" />
                </ScrollArea>
              </div>
            </CredenzaDescription>
          </CredenzaHeader>
          <CredenzaBody>
            {/* <div className="flex h-fit items-center justify-between px-2">
              <div className="mr-3 flex gap-2 text-sm text-gray-500 dark:text-gray-400">
                <div className="self-center">
                  <Clock7 className="size-6" />
                </div>
                <div className="self-center text-base font-normal">{`${Datetimepackage.startTime} - ${Datetimepackage.endTime}`}</div>
              </div>
            </div> */}
            <div className="mt-3">
              <SelectDATE Datetimepackage={Datetimepackage} gig={gig} />
            </div>
          </CredenzaBody>
          {/* <CredenzaFooter className="flex justify-between space-x-4">
            <CredenzaClose asChild>
              <button>Close</button>
            </CredenzaClose>
            <ButtonE
              className="m-1 flex-1 bg-white text-black shadow hover:bg-white hover:ring-black dark:bg-white dark:text-black dark:hover:bg-white dark:hover:text-black dark:hover:ring-white"
              variant="ringHover"
            >
              Message
            </ButtonE>
            <BookmeetingButton gig={gig} />
          </CredenzaFooter> */}
        </CredenzaContent>
      </Credenza>
    </div>
  );
}
// if (startDate.getDay() === endDate.getDay()) {
//   days.push(startDate); // If start time and end time are the same, add the single date to the array
//   {`${Month(date) } ${date.getDay()}, ${date.getFullYear()}`}
