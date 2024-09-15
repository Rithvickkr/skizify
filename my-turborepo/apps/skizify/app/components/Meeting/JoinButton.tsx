"use client";

import { Button } from "../ui/button";

export function JoinMeetingButton({ SetMeetingTrue }: { SetMeetingTrue: any }) {
  return (
    <div>
      <Button
        className="w-full rounded-xl border border-neutral-500 bg-black py-6 text-lg"
        size="lg"
        variant={"gooeyLeft"}
        onClick={() => {SetMeetingTrue()
            console.log("Hello I am Clciked")
        }}
      >
        Join Meeting
      </Button>
    </div>
  );
}
