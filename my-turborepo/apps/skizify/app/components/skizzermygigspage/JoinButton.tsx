"use client"
import { useRouter } from "next/navigation";
import { VideoIcon } from "lucide-react";
import { Button } from "../ui/button";

export default function JoinButton(){
    const router = useRouter();
    return (
        <Button
        variant={"gooeyLeft"}
        className="flex items-center space-x-2 rounded-full border border-neutral-500 bg-v0dark px-4 py-2 text-sm text-white shadow-md transition-all duration-300 hover:shadow-lg group-hover:scale-105 dark:border-0 dark:bg-neutral-800/90 dark:text-neutral-100 dark:shadow-md dark:hover:bg-neutral-700 dark:hover:shadow-lg"
        onClick={() => {router.push("./meeting")}}
      >
        <VideoIcon className="h-4 w-4" />
        <span>Join Meeting</span>
      </Button>
    )
}