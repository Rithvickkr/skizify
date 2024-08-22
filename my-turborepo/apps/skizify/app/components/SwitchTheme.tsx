"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "../../@/components/ui/button";
import { Switch } from "../../@/components/ui/switch";

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
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDarkMode =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <div className="flex items-center gap-2">
      <Sun
        className={`m-2 mr-2 size-5  ${isDarkMode ? "text-lightwhite" : "text-black"}`}
      />
      <Switch
      className="bg-black dark:bg-white"
        checked={isDarkMode}
        onCheckedChange={(checked: any) => setTheme(checked ? "dark" : "light")}
      />
      <Moon
        className={`m-2 mr-2 size-5 ${isDarkMode ? "text-lightwhite" : "text-black"}`}
      />
    </div>
  );
}
