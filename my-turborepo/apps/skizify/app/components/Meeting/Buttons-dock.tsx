import React, { ComponentProps } from "react";

import { Dock, DockIcon } from "../../../@/components/magicui/dock";
import { Button } from "../ui/button";
import { ToolTip } from "@repo/ui/tooltip";

export default function ButtonsDock({
  children,
  className,
  name,
  iconclassname,
  shortcut,
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  iconclassname?: string;
  name: string;
  shortcut? : string
} & ComponentProps<"button">) {
  return (
    <ToolTip name={shortcut ?? ""} className="p-3 bg-white text-black dark:bg-black dark:text-white shadow-lg border min-w-12 dark:border-neutral-700 border-neutral-500 dark:shadow-lightwhite dark:shadow-sm" >
    <Button
      variant="ghost"
      className={`size-9 bg-neutral-200 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-lightdark  md:size-10   lg:size-11 xl:size-13 ${className}`}
      size="icon"
      {...rest}
    >
      {children}
      <span className="sr-only">{name}</span>
    </Button>
    </ToolTip>
  );
}
