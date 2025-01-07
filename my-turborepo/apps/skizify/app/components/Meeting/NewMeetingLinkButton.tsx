"use client";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../@/components/ui/dialog";
import { CircleCheckBig, Link } from "lucide-react";
import { Label } from "../../../@/components/ui/label";
import { Input } from "../../../@/components/ui/input";
import { Clipboard } from "lucide-react";
import { BorderBeam } from "../../../@/components/ui/border-beam";
import CopyLinkButton from "./CopyButtonMeeting";


export default function CreateMeetingLinkButton() {
  const session = useSession();
  const [meetingLink, setMeetingLink] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCreateMeeting = async () => {
    const res = await fetch("/api/instant-meetings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hostId: `${session.data?.user.id}` }), // Replace with actual host user ID
    });

    if (!res.ok) {
      // If response is not OK
      const errorText = await res.text(); // Get error text
      console.error("Error creating meeting:", errorText);
      return;
    }

    const newMeeting = await res.json();
    console.log("newMeeting: ", newMeeting);

    // Generate the meeting link
    const link = `${window.location.origin}/instant-meeting/${newMeeting.meetingId}`;
    setMeetingLink(link); // Set the meeting link in state
  };

  return (
    <div>
      {/* <Button
                variant={"gooeyLeft"}
                className='bg-black dark:bg-white hover:ring-2 border-white ring-black dark:ring-white border-2'
                onClick={() => {
                    try {
                        handleCreateMeeting();
                    } catch (error) {
                        console.error('Error creating meeting:', error);
                        alert('Meeting Link not Created. Please try again later.');
                    }
                }}
            >
                Create New Meeting
            </Button>
            {meetingLink && ( // Conditionally render the link if it exists
                <div className="mt-4">
                    <p>Meeting Link:</p>
                    <a href={meetingLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                        {meetingLink}
                    </a>
                </div>
            )} */}
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="col-span-1 relative flex h-40 w-full flex-col items-center justify-center border border-black/60 bg-transparent text-black opacity-75 hover:bg-black/5 hover:opacity-100 dark:border-white/50 dark:text-white dark:hover:bg-white/10"
            onClick={() => {
              try {
                handleCreateMeeting();
              } catch (error) {
                console.error("Error creating meeting:", error);
                alert("Meeting Link not Created. Please try again later.");
              }
            }}
          >
            <Link className="mb-2 h-6 w-6" />
            Share Link
            <BorderBeam size={200} duration={12} delay={2} colorFrom="white" colorTo="#484848" />

          </Button>
        </DialogTrigger>
        <DialogContent className="rounded-lg border-2 border-black dark:border dark:border-neutral-600 dark:bg-lumadark/30 dark:bg-opacity-5 dark:backdrop-blur-sm">

          <DialogHeader>
            <DialogTitle>Meeting Link</DialogTitle>
            <DialogDescription>
              Link will be Generatd One Time
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center">
          {meetingLink && (

            <div className="mt-2 grid grid-cols-12 items-center gap-4">
              <Label htmlFor="name" className="col-span-2 text-lg">
                Link :
              </Label>
              <Input
                id="name"
                value={meetingLink}
                className="col-span-9"
                readOnly
              />
              
              <CopyLinkButton meetingLink={meetingLink} />

              {copied && (
                <CircleCheckBig className=" text-white col-span-1 size-8 cursor-pointer rounded-md p-2 bg-green-500" />
              )}
            </div>
          )}
          {!meetingLink && (
            <div role="status" className="flex justify-center items-center">
<div className="lds-hourglass"></div>
            <span className="sr-only">Loading...</span>
        </div>        
          )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
