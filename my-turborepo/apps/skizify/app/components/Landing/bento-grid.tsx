import { GlowingEffect } from "../../../components/ui/glowing-effect";
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
        "grid md:grid-rows-12 grid-cols-1 md:grid-cols-4 gap-4 max-w-7xl mx-auto ",
        className
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
        "row-span-1 rounded-lg group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-1 dark:bg-black dark:border-white/[0.2] bg-white border-[0.1rem] border-transparent justify-between flex flex-col space-y-4",
        className
      )}
    >
        <GlowingEffect
          blur={0}
          borderWidth={3}
          spread={80}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />

      {header}
    </div>
  );
};
