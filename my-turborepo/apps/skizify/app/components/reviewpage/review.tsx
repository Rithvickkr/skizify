"use client";

import { JSX, SetStateAction, SVGProps, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../../../@/components/ui/dialog";
import { Button } from "../../../@/components/ui/button";
import { Label } from "../../../@/components/ui/label";
import { Textarea } from "../../../@/components/ui/textarea";
import { useSession } from "next-auth/react";
import { Credenza } from "../ui/Credenza";
// import { Avatar } from "@repo/ui/avatar";
import setreview from "../../lib/actions/setreview";

export default function Reviewpage() {
  const { data: session } = useSession();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const handleRatingChange = (value: SetStateAction<number>) => {
    setRating(value);
  };
  const handleFeedbackChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setFeedback(e.target.value);
  };
  const   handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const review=await setreview(session, rating, feedback, "3ad4eb99-d0c7-4d2e-8a40-e4b6fbb4e064");
  console.log(review);
    console.log("Rating:", rating);
    console.log("Feedback:", feedback);
  };
  return (
    <Credenza>
      <Dialog defaultOpen>
        <DialogTrigger asChild>
          <Button variant="outline">Leave Review</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Review your meeting</DialogTitle>
            <DialogDescription>
              Please share your feedback to help us improve.
            </DialogDescription>
            <div className="flex-row self-center p-5">
              {/* <div>
                <Avatar
                  name={session?.user?.name || ""}
                  photo={Avatar || ""}
                  classname="size-24 text-5xl self-center"
                />
              </div> */}
              <div className="mt-2 text-2xl font-bold text-gray-900 dark:text-gray-100">
                {session?.user?.name}
              </div>
            </div>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="grid gap-6 py-4">
            <div className="grid gap-2">
              <Label htmlFor="rating">Rating</Label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRatingChange(star)}
                    className={`h-6 w-6 cursor-pointer text-gray-400 transition-colors duration-200 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400 ${rating >= star ? "text-yellow-400 dark:text-yellow-300" : ""}`}
                  >
                    <StarIcon />
                  </button>
                ))}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="feedback">Feedback</Label>
              <Textarea
                id="feedback"
                placeholder="Share your thoughts..."
                className="min-h-[120px]"
                value={feedback}
                onChange={handleFeedbackChange}
              />
            </div>
            <DialogFooter className="flex justify-between">
              <Button
                type="button"
                variant="ghost"
                className="mr-4 bg-red-500 text-white hover:bg-red-600"
              >
                Report
              </Button>
              <Button type="submit">Submit Review</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Credenza>
  );
}

function StarIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
