import { cn } from "../../utils/cn";
import { GigsInterface } from "../../(dashboard)/explore/page";
import { Avatar } from "@repo/ui/avatar";
import { JSX, SVGProps } from "react";
import { Card, CardContent } from "../../../@/components/ui/card";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../../../@/components/ui/popover";
import { Button } from "../../../@/components/ui/button";
import { Clock7 } from "lucide-react";
// {
//   id: string;
//   title: string;
//   content: string;
//   startDateTime: Date;
//   endDateTime: Date;
//   createdAt: Date;
//   updatedAt: Date;
//   authorId: string;
//   acceptedById: string | null;
//   Interval: any; //as it is a JSON vlaue
//   status: GigStatus;
// }

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  gig,
  poster,
}: {
  className?: string;
  gig: GigsInterface;
  poster: any;
}) => {
  const startDATEmonth = gig.startDateTime.getMonth();
  const startDATEday = gig.startDateTime.getDay();
  const endDATEmonth = gig.endDateTime.getMonth();
  const endDATEday = gig.endDateTime.getDay();

  return (
    <div
      className={cn(
        "group/bento shadow-input row-span-1 flex cursor-pointer items-center justify-center space-y-4 rounded-xl border border-[#d1d5d8] bg-white p-3 transition duration-200 hover:shadow-lg dark:border-gray-800 dark:bg-[#020817] dark:shadow-none",
        className,
      )}
    >
      <div className="transition duration-200 group-hover/bento:translate-x-2">
        {/* <div className="flex gap-10">
          <div><Avatar name={poster.name} photo={poster.userImage}/></div>
          <div>{poster.name}</div>
        </div>
        <div className="font-sans mb-2 mt-2 font-bold text-neutral-600 dark:text-neutral-200">
          {gig.title}
        </div>
        <div className="font-sans text-xs font-normal text-neutral-600 dark:text-neutral-300">
          {gig.content}
        </div> */}
        <Card className="mx-auto max-w-md">
          <CardContent className="grid h-full">
            <div className="flex items-center space-x-4">
              <Avatar name={poster.name} photo={poster.userImage} />
              <div>
                <h3 className="text-lg font-semibold">{poster.name}</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Product Manager
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="my-3 text-ellipsis overflow-hidden max-w-full">{gig.content}</p>
              <div className="flex items-center justify-between">
                <div className="mr-2 flex text-sm text-gray-500 dark:text-gray-400 gap-2">
                  <div><Clock7 /></div>
                  <div className="self-center">{gig.Interval.hours}</div>
                </div>
                <div className="flex items-center">
                  <CalendarIcon className="h-5 w-5" />
                  <span>{`${startDATEmonth}Jun${startDATEday} - ${endDATEmonth}Jun ${endDATEday}`}</span>
                </div>
              </div>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="m-2 w-full">
                  <div className="flex items-center justify-between">
                    <span>Select a time</span>
                    <ChevronDownIcon className="h-4 w-4" />
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="space-y-4 border border-[#d1d5d8] bg-white p-4 transition duration-200 hover:shadow-xl dark:border-gray-800 dark:bg-[#020817] dark:shadow-none">
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant="default"
                    className="border-[#d1d5d8] bg-black px-2 py-1 text-xs text-white dark:bg-white dark:text-black"
                  >
                    9:00 AM
                  </Button>
                  <Button
                    variant="default"
                    className="border-[#d1d5d8] bg-black px-2 py-1 text-xs text-white dark:bg-white dark:text-black"
                  >
                    10:00 AM
                  </Button>
                  <Button
                    variant="default"
                    className="border-[#d1d5d8] bg-black px-2 py-1 text-xs text-white dark:bg-white dark:text-black"
                  >
                    11:00 AM
                  </Button>
                  <Button
                    variant="default"
                    className="border-[#d1d5d8] bg-black px-2 py-1 text-xs text-white dark:bg-white dark:text-black"
                  >
                    1:00 PM
                  </Button>
                  <Button
                    variant="default"
                    className="border-[#d1d5d8] bg-black px-2 py-1 text-xs text-white dark:bg-white dark:text-black"
                  >
                    2:00 PM
                  </Button>
                  <Button
                    variant="default"
                    className="border-[#d1d5d8] bg-black px-2 py-1 text-xs text-white dark:bg-white dark:text-black"
                  >
                    3:00 PM
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            <div className="flex space-x-4">
              <Button className="m-1 flex-1 bg-black text-white dark:border dark:border-white">
                Book
              </Button>
              <Button className="m-1 flex-1 bg-white text-black">
                Message
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

function CalendarIcon(
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
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function ChevronDownIcon(
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
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
