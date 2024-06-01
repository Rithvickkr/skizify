"use client"

import * as React from "react"
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
} from "../../@/components/ui/dropdown-menu"

export default function SwitchTheme() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="">
        <span className="p-1">Theme</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-36 dark:bg-gray-900 bg-white border dark:border-gray-700">
        <DropdownMenuLabel>
            <span className="dark:bg-gray-800">Appeareance</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={theme} onValueChange={toggleTheme}>
          <DropdownMenuRadioItem value="light">
            <span className="cursor-pointer p-1 ml-3 self-center">Dark</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">
            <span className="cursor-pointer p-1 ml-3 self-center">Light</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system">
            <span className="cursor-pointer p-1 ml-3 self-center">System</span>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
