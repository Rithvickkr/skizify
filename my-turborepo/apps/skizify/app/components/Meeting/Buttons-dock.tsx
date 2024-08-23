import React, { ComponentProps } from "react";

import { Dock, DockIcon } from "../../../@/components/magicui/dock";
import { Button } from "../ui/button";

export default function ButtonsDock({
  children,
  className,
  name,
  iconclassname,
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  iconclassname?: string;
  name: string;
} & ComponentProps<"button">) {
  return (
    <Button
      variant="ghost"
      className={`size-9 bg-neutral-200 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-lightdark  md:size-10   lg:size-11 xl:size-13 ${className}`}
      size="icon"
      {...rest}
    >
      {children}
      <span className="sr-only">{name}</span>
    </Button>
  );
}
