import {
  CalendarDaysIcon,
  CalendarIcon,
  CheckCheck,
  CircleCheckBig,
  Clock7,
  ClockIcon,
} from "lucide-react";
import { Button } from "../../../@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../@/components/ui/dialog";
import { Input } from "../../../@/components/ui/input";
import { Label } from "../../../@/components/ui/label";
import { GigsInterface } from "../../(dashboard)/explore/page";
import { Avatar } from "@repo/ui/avatar";
import { ScrollArea } from "../../../@/components/ui/scroll-area";
import { Datetimepackage } from "./Bentogrid";
import TimeSlider from "./Slider";

export function BookButton({
  gig,
  poster,
  Datetimepackage,
}: {
  gig: GigsInterface;
  poster: any;
  Datetimepackage: Datetimepackage;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="m-1 flex-1 bg-black text-white dark:border dark:border-white dark:bg-[#020817]">
          Book
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>
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
          </DialogTitle>
          <DialogDescription>
            <div className="my-2 flex flex-col">
              <div className="mb-1 ml-2 h-7 justify-items-center font-display text-2xl font-semibold">
                {gig.title || "Title"}
              </div>
              <ScrollArea className="w-full truncate text-wrap rounded-md border p-2 px-2 text-sm">
                {gig.content}
              </ScrollArea>
            </div>
          </DialogDescription>
        </DialogHeader>

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

        <DialogFooter className="flex justify-between space-x-4">
          <Button className="m-1 flex-1 bg-white text-black">Message</Button>
          <Button className="m-1 flex-1 bg-black text-white dark:border dark:border-white dark:bg-[#020817]">
            <CheckCheck className="mr-2 size-4" />
            Accept
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
