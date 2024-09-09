"use client";

import { SearchIcon } from "lucide-react";
import { Label } from "../../../@/components/ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useEffect, useRef, useState } from "react";

export default function SearchBar() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const scrollableContainerRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState("");
  const [shortcut, setShortcut] = useState("Ctrl K");
  const [isListening, setIsListening] = useState(false);
  const speechRecognitionRef = useRef<any | null>(null);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === "KeyK" && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        setDialogOpen(true);
      }
      // else if (event.code === "ArrowDown") {
      //   event.preventDefault();
      //   setSelectedIndex((prevIndex) => Math.min(prevIndex + 1, searchTracks.length - 1));
      // } else if (event.code === "ArrowUp") {
      //   event.preventDefault();
      //   setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
      // } else if (event.code === "Enter" && selectedIndex !== -1) {
      //   event.preventDefault();
      //   document.getElementById(`track-link-${selectedIndex}`)?.click();
      // }
      // if (event.code === "ArrowDown" || event.code === "ArrowUp") {
      //   event.preventDefault();
      //   const container = scrollableContainerRef.current;
      //   if (container) {
      //     if (selectedIndex > 3) {
      //       const scrollAmount = event.code === "ArrowDown" ? 85 : -80;
      //       container.scrollBy({ top: scrollAmount, behavior: "smooth" });
      //     }
      //   }
      // }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  useEffect(() => {
    const isMacOS = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
    setShortcut(isMacOS ? "Cmd K" : "Ctrl K");
  }, []);

  return (
    <div className="my-1 flex w-full justify-center md:justify-end">
      <form className="2xl:1/4 w-[95%] lg:w-1/3 4xl:w-1/5">
        <div className="relative z-10 flex w-full items-center space-x-1 rounded-lg border bg-background p-2 shadow-lg">
          {/* 
                    flex-[1_0_0%] is a shorthand for flex-grow, flex-shrink and flex-basis
                    flex-grow: 1 - takes up as much space as possible
                    flex-shrink: 0 - don't shrink below its initial width
                    flex-basis: 0% - set the initial width to 0%
                  */}
          <div className="flex-[1_0_0%] items-center">
            <Label htmlFor="article" className="sr-only">
              Search article
            </Label>
            <Input
              name="article"
              className="h-full bg-neutral-100 dark:bg-v0dark"
              id="article"
              placeholder="Search article"
            />
          </div>
          <div className="h-8 w-[4.5rem] cursor-pointer truncate rounded bg-black/50 p-1 px-2 text-center text-white hover:opacity-90 dark:bg-zinc-800 dark:text-neutral-200 hover:dark:bg-zinc-700 hover:dark:text-white">
            {shortcut}
          </div>
          {/* The `flex-none` utility class sets `flex: none` on the element, which means it will not grow or shrink, and will only take up the space of its content. */}
          {/* The `items-center` utility class sets `align-items: center` on the element, which means all its children will be vertically centered. */}
          <div className="flex-[0_0_auto] p-1">
            <Button
              variant={"gooeyLeft"}
              className="w-14 bg-black hover:bg-black hover:opacity-80 dark:bg-white dark:text-black"
            >
              <SearchIcon className="text-xl text-white dark:text-black" />
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
