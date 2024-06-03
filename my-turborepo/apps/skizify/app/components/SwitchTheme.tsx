"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Button } from "../../@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../@/components/ui/dropdown-menu";

export default function SwitchTheme() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="">
        <span className="p-1">Theme</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-36 border bg-white dark:border-gray-700 dark:bg-gray-900">
        <DropdownMenuLabel>
          <span className="dark:bg-gray-800">Appeareance</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={theme} onValueChange={toggleTheme}>
          <DropdownMenuRadioItem value="dark">
            <span className="ml-3 cursor-pointer self-center p-1">Dark</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="light">
            <span className="ml-3 cursor-pointer self-center p-1">Light</span>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
