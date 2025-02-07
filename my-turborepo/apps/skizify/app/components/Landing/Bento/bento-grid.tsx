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
        "group/bento shadow-input row-span-1 flex min-h-80 flex-col justify-between space-y-4 rounded-2xl border border-neutral-600/40 bg-white transition duration-200 hover:border-neutral-500/40 hover:shadow-xl dark:bg-black dark:shadow-none",
        className,
      )}
    >
      {header}
      <div className="flex items-center gap-5 bg-transparent">
        {icon && (
          <div className="flex-shrink-0 text-3xl text-indigo-500/80 transition-colors group-hover/bento:text-indigo-400">
        {icon}
          </div>
        )}
        <div className="space-y-1">
          {title && (
        <h3 className="font-medium text-base text-neutral-800 dark:text-neutral-200 transition-colors group-hover/bento:text-neutral-950 dark:group-hover/bento:text-white">
          {title}
        </h3>
          )}
          {description && (
        <p className="text-sm text-neutral-600 dark:text-neutral-400 transition-colors group-hover/bento:text-neutral-700 dark:group-hover/bento:text-neutral-300">
          {description}
        </p>
          )}
        </div>
      </div>
    </div>
  );
};
