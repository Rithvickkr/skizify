"use client";
import React, { useState } from "react";
import { Input } from "../../../@/components/ui/input";
import { Button } from "../ui/button";
import prisma from "@repo/db/client";

const CheckMeetingCode: React.FC = () => {
  const [meetingId, setMeetingId] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);

const checkMeetingId = async () => {
    try {
        const response = await fetch("/api/check-meetingId", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ meetingId }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }
        const data = await response.json();

        if (data.isValid) {
            if (data.table === 'meeting') {
                window.location.href = `/meeting/${meetingId}`;
            } else if (data.table === 'instant-meeting') {
                window.location.href = `/instant-meeting/${meetingId}`;
            }
        }
        setIsValid(data.isValid);
    } catch (error) {
        console.error("Error checking meeting ID:", error);
        setIsValid(false);
    }
};
  return (
    <div>
      <Input
        placeholder="Meeting code"
        className="w-full rounded-lg border border-neutral-600 bg-neutral-800 px-5 py-6 text-lg text-neutral-200 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-500"
        value={meetingId}
        onChange={(e) => setMeetingId(e.target.value)}
      />
      <div className="mt-4 flex justify-center">
        <Button
          onClick={async () => {
            await checkMeetingId();
          }}
          variant={"outline"}
          className="w-full rounded-lg border-2 border-neutral-800/40 bg-white px-6 py-5 text-center text-lg font-medium text-neutral-900 transition-all hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-neutral-500 dark:bg-white dark:text-neutral-900 dark:ring-white dark:hover:bg-neutral-100 hover:dark:ring-2"
        >
          Join
        </Button>
      </div>
      {isValid === false && (
        <p className="mt-4 text-red-500">Meeting ID is not valid.</p>
      )}
    </div>
  );
};

export default CheckMeetingCode;
