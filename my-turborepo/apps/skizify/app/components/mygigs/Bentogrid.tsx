import { send } from "process";
import { cn } from "../../utils/cn";

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
  title,
  description,
  icon,
  sender,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  icon?: React.ReactNode;
  sender?: string | React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "group/bento shadow-input row-span-1 flex cursor-pointer flex-col justify-between space-y-4 rounded-xl border border-[#d1d5d8] bg-white p-4 transition duration-200 hover:shadow-xl dark:border-gray-800 dark:bg-[#020817] dark:shadow-none",
        className,
      )}
    >
      <div className="transition duration-200 group-hover/bento:translate-x-2">
        <div className="flex gap-10">
          <div>{icon}</div>
          <div>{sender}</div>
        </div>
        <div className="font-sans mb-2 mt-2 font-bold text-neutral-600 dark:text-neutral-200">
          {title}
        </div>
        <div className="font-sans text-xs font-normal text-neutral-600 dark:text-neutral-300">
          {description}
        </div>
      </div>
    </div>
  );
};
