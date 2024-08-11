import { JSX, SVGProps } from "react";
import { Avatar } from "@repo/ui/avatar";
import { Textarea } from "../../../@/components/ui/textarea";
import { Button } from "../ui/button";
import { CameraIcon, MicIcon, PhoneIcon, ScreenShare, Send, SettingsIcon, ShareIcon, Smile, SmilePlus, X } from "lucide-react";

export default function Component() {
  return (
    <div className="flex h-full w-full">
      <div className="relative flex flex-1 items-center justify-center p-3">
        <div className="grid w-full max-w-4xl grid-cols-2 gap-6">
          <div className="overflow-hidden rounded-xl border border-white ring-2 ring-black dark:border-gray-700">
            <div
              className="h-full w-full rounded-lg bg-black object-cover"
              style={{ aspectRatio: "450/600", objectFit: "cover" }}
            />
          </div>
          <div className="overflow-hidden rounded-xl border border-white ring-2 ring-black dark:border-gray-700">
            <div
              className="h-full w-full rounded-lg bg-black object-cover"
              style={{ aspectRatio: "450/600", objectFit: "cover" }}
            />
          </div>
        </div>
        <div className="absolute flex items-center justify-center gap-2 bottom-2 w-full">
        <Button variant="ghost" className="hover:bg-neutral-700 dark:hover:bg-gray-500" size="icon">
          <MicIcon className="size-5 " />
          <span className="sr-only">Mute</span>
        </Button>
        <Button variant="ghost" className="hover:bg-neutral-700 dark:hover:bg-gray-500" size="icon">
          <CameraIcon className="size-5 " />
          <span className="sr-only">Camera</span>
        </Button>
        <Button variant="destructive" className="hover:bg-neutral-700 dark:hover:bg-gray-500 bg-red-600 text-white"  size="icon">
          <PhoneIcon className="size-5 " />
          <span className="sr-only">End Call</span>
        </Button>
        <Button variant="ghost" className="hover:bg-neutral-700 dark:hover:bg-gray-500" size="icon">
          <ScreenShare className="size-5 " />
          <span className="sr-only">Share</span>
        </Button>
        <Button variant="ghost" className="hover:bg-neutral-700 dark:hover:bg-gray-500" size="icon">
          <SettingsIcon className="size-5 " />
          <span className="sr-only">Settings</span>
        </Button>
        </div>
      </div>
      <div className="flex w-[320px] flex-col rounded-md border bg-black ring-2 ring-black dark:border-1 dark:border-gray-800 dark:bg-themeblue dark:ring-0">
        <div className="flex items-center justify-between border-b border-[#334155] px-4 py-3 dark:border-gray-700">
          <div className="text-lg font-medium text-[#e2e8f0]">Chat</div>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-md text-[#94a3b8] hover:bg-gray-500"
          >
            <X className="size-5" />
          </Button>
        </div>
        <div className="flex-1 space-y-4 overflow-auto p-4">
          <div className="flex items-start gap-3">
            <Avatar
              name={"SM"}
              classname="size-8 shadow-sm mr-3 bg-gray-200 text-sm  text-black border border-black"
            />
            <div className="rounded-lg bg-[#334155] p-3 text-sm text-[#e2e8f0]">
              <p>Hey, how's the video quality?</p>
              <div className="mt-1 text-xs text-[#94a3b8]">2:34 PM</div>
            </div>
          </div>
          <div className="flex items-start justify-end gap-3">
            <div className="rounded-lg bg-neutral-200 p-3 text-sm text-black dark:bg-[#25306c] dark:text-[#e2e8f0]">
              <p>It's looking great! Can you hear me okay?</p>
              <div className="mt-1 text-xs text-[#58595a] dark:text-gray-400">
                2:35 PM
              </div>
            </div>
            <Avatar
              name={"UP"}
              classname="size-8 shadow-sm mr-3 bg-gray-200 text-sm  text-black border border-black"
            />
          </div>
          <div className="flex items-start gap-3">
            <Avatar
              name={"SM"}
              classname="size-8 shadow-sm mr-3 bg-gray-200 text-sm  text-black border border-black"
            />
            <div className="rounded-lg bg-[#334155] p-3 text-sm text-[#e2e8f0]">
              <p>Yep, the audio is perfect. Let's get started!</p>
              <div className="mt-1 text-xs text-[#94a3b8]">2:36 PM</div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 border-t p-4 dark:border-gray-700">
          <Textarea
            placeholder="Type your message..."
            className="flex-1 resize-none text-white focus:border-none focus:outline-none focus:ring-2 focus:ring-neutral-500"
          />
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-neutral-700 dark:hover:bg-gray-500"
          >
            <Send className="size-5 text-white" />
            <span className="sr-only">Send</span>
          </Button>
          {/* <Button variant="ghost" size="icon">
            <SmilePlus className="size-5 hover:bg-gray-500" />
            <span className="sr-only">Emoji</span>
          </Button> */}
          {/* <Button variant="ghost" size="icon">
            <PaperclipIcon className="w-5 h-5" />
            <span className="sr-only">Attach</span>
          </Button> */}
        </div>
      </div>
    </div>
  );
}

function ChevronDownIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>,
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function PaperclipIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>,
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </svg>
  );
}
