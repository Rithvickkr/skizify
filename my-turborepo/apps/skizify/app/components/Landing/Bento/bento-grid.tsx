import { GlowingEffect } from "../../../../components/ui/glowing-effect";
import { cn } from "../../../utils/cn";

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
        "mx-auto grid max-w-7xl grid-cols-1 gap-1 md:grid-cols-12 md:grid-rows-12",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  header,
  title,
  description,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "group/bento shadow-input row-span-1 flex flex-col justify-between space-y-4 rounded-2xl border border-neutral-600/40 bg-white p-1 transition duration-200 hover:border-neutral-500/40 hover:shadow-xl dark:bg-black dark:shadow-none",
        className,
      )}
    >
      {header}
    </div>
  );
};
