"use client";
import { useRouter } from "next/navigation";
import { ArrowRightIcon, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { ToolTip } from "@repo/ui/tooltip";

export default function RedirectToMeetingPage({
  confirmId,
}: {
  confirmId: string;
}) {
  const router = useRouter();
  return (
    <div className="my-1 flex place-content-start items-center p-2 sm:my-2 md:my-0">
      <Button
        className="w-full bg-black text-white hover:bg-black dark:bg-white dark:text-black hover:dark:bg-white"
        Icon={ChevronRight}
        iconPlacement="right"
        variant="expandIcon"
        onClick={() => router.push(`/Meetings/${confirmId}`)}
      >
        Booked🎉
      </Button>
    </div>
  );
}
