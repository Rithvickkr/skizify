import { send } from "process";
import { cn } from "../../utils/cn";
import { CircleCheckBig, Clock7, Hourglass, HourglassIcon, UserRoundCheck } from "lucide-react";
import { ScrollArea } from "../../../@/components/ui/scroll-area";

export const BentoGridcopy = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 p-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItemcopy = ({
  className,
  title,
  description,
  header,
  icon,
  sender,
  range,
  status,
  interval,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  sender?: string | React.ReactNode;
  range?: string | React.ReactNode;
  status?: string | React.ReactNode;
  interval?: any | React.ReactNode;
}) => {
  const formatTimeInterval = (hours: number, minutes: number) => {
    const totalMinutes = Math.floor(hours * 60 + minutes); // Convert hours to minutes and add the extra minutes
    const formattedHours = Math.floor(totalMinutes / 60); // Calculate total hours
    const formattedMinutes = totalMinutes % 60; // Get the remainder for minutes
    const paddedMinutes = String(formattedMinutes).padStart(2, "0");
    return `${formattedHours}:${paddedMinutes}`;
  };
  return (
    <div
      className={cn(
        "group/bento shadow-input row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-transparent bg-white p-4 transition duration-200 hover:shadow-xl dark:border-white/[0.2] dark:bg-black dark:shadow-none",
        className,
      )}
    >
      <div className="transition duration-200 group-hover/bento:translate-x-2">
        <div className="flex items-center gap-4">
          <div>{icon}</div>
          <div className="font-semibold text-neutral-600 dark:text-neutral-200">
            {sender}
          </div>
        </div>
        {/* <div className="font-sans mt-2 text-lg font-bold text-neutral-800 dark:text-neutral-200">
          {title}
        </div>
        <div className="font-sans mt-1 text-sm text-neutral-600 dark:text-neutral-300">
          {description}
        </div> */}
         <div className="w-full">
              <div className="my-2 flex flex-col">
                <div className="ml-2 h-7 justify-items-center font-display text-xl font-medium">
                  {title || "Title"}
                </div>
                <ScrollArea className="w-full truncate text-wrap rounded-md border p-2 px-2 text-sm">
                  {description || "Description"}
                </ScrollArea>
              </div>
        <div className="flex justify-between">
          <div className="self-center"><Clock7 className="size-4" /></div>
          <div className="font-sans mt-1 pl-2 text-sm text-neutral-600 dark:text-neutral-300">
            {range}
          </div>
        </div>
        <div className="flex ">
          <div className="self-center"><Hourglass className="size-4"/></div>
          <div className="font-sans mt-1 pl-2 text-sm text-neutral-600 dark:text-neutral-300">
          {formatTimeInterval(interval.hours, interval.minutes)}
          </div>
        </div>
       
        <div className="flex ">
          <div className="self-center"><UserRoundCheck className="size-4"/></div>
          <div className="font-sans mt-1 pl-2 text-sm text-neutral-600 dark:text-neutral-300">
            Accepted By
          </div>
        </div>

       
        <div className="flex ">
          <div className="self-center"><CircleCheckBig className="size-4"/></div>
          <div className="font-sans mt-1 pl-2 text-sm text-neutral-600 dark:text-neutral-300">
          <h5
            className={
              status == "ACCEPTED" ? "text-green-600" : "text-blue-600"
            }
          >
            {status}
          </h5>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};
