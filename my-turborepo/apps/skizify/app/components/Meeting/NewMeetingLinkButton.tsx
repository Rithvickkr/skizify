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
            <BorderBeam size={200} duration={12} delay={1} colorFrom="white" colorTo="#484848" />

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
              {!copied && (
                <Clipboard
                  className="col-span-1 size-8 cursor-pointer rounded-md p-2 hover:bg-black/20 dark:hover:bg-white/15 dark:bg-white/20 "
                  onClick={() => {
                    navigator.clipboard.writeText(meetingLink);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                />
              )}

              {copied && (
                <CircleCheckBig className=" text-white col-span-1 size-8 cursor-pointer rounded-md p-2 bg-green-500" />
              )}
            </div>
          )}
          {!meetingLink && (
            <div role="status">
            <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span className="sr-only">Loading...</span>
        </div>        
          )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
