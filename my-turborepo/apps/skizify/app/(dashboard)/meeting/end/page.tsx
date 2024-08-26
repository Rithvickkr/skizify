"use client"
import { useRouter } from "next/navigation";
import { Button } from "../../../components/ui/button";
export default function MeetingEnded() {
  const router = useRouter();
  return (
    <div className="flex flex-col space-y-4">
        <div>
      Meeting Ended

        </div>
      <Button variant={"gooeyLeft"} onClick={() => router.push("./")}>
        Want to Go Back to meeting
      </Button>
      <Button variant={"gooeyRight"} className="dark:bg-white dark:text-black">Want to stay here</Button>
    </div>
  );
}
