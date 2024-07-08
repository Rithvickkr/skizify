import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../@/components/ui/tooltip";
import { cn } from "../../utils/cn";
export function ToolTip({
  name,
  children,
  className,
}: {
  name: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent>
          <p
            className={cn(
              "rounded bg-black p-1 px-3 text-white dark:bg-white dark:text-black",
              className,
            )}
          >
            {name}
            <span className="sr-only">{name}</span>
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
