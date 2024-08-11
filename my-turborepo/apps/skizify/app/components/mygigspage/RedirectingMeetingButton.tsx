"use client"
import { useRouter } from "next/navigation";
import {
    ArrowRightIcon,
  } from "lucide-react";
  import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "../../../@/components/ui/tooltip"
import { Button } from "../ui/button";

export default function RedirectToMeetingPage({confirmId}:{confirmId : string}) {
      const router = useRouter();
    return (
        <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                  <Button
                    className="w-full bg-black text-white hover:bg-black dark:bg-white dark:text-black hover:dark:bg-white"
                    Icon={ArrowRightIcon}
                    iconPlacement="right"
                    variant="gooeyLeft"
                    onClick={() => router.push(`/Meetings/${confirmId}`)}
                  >
                    Booked 🎉
                  </Button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-black text-white dark:bg-white dark:text-black">
                      <p>Check out Calendar</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
    )
}