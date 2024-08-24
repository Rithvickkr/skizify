"use client";

import { Pencil, Trash } from "lucide-react";
import { GigsInterface } from "@repo/store/types";
import { Month, formatTime } from "../../lib/actions/ConvertgigInfo";
import { useSession } from "next-auth/react";
import { deleteGig } from "../../lib/actions/deletegig";
import { ToolTip } from "../ui/Tooltip";

export default function EditDeleteCard({ gig }: { gig: GigsInterface }) {
  const session  = useSession();

  if (!session) {
    // If session doesn't exist, the user will not be able to see the Edit and Delete options
    return <div></div>;
  }

  const handleDeleteGig = async (gigId: string) => {
    try {
      await deleteGig(gigId);
      window.location.reload();
      window.alert("Gig deleted Succesfully");
    } catch (error) {
      console.error("Error deleting gig:", error);
      window.alert("Gig is not deleted");
    }
  };

  return (
    <div className="flex self-center">
      <div className="m-1 self-center truncate p-1 text-xs text-gray-500 md:text-sm">
        Posted on{" "}
        {`${formatTime(gig.createdAt)} ${Month(gig.createdAt)} ${gig.createdAt.getDate()}`}
      </div>
      <div className="m-1 cursor-pointer rounded p-1 text-gray-500 shadow dark:border dark:border-gray-800">
        <ToolTip name="Edit">
        <Pencil
          className="size-4 text-black dark:text-white md:size-5 "
          strokeWidth={1.3}
          absoluteStrokeWidth
        />
        </ToolTip>
      </div>
      <div className="m-1 cursor-pointer rounded p-1 text-red-600 shadow dark:border dark:border-gray-800">
        <ToolTip name="Delete" className="bg-red-600 dark:bg-red-600 text-white dark:text-white">
        <Trash
        className="size-4 md:size-5"
        color="#ff0000"
        strokeWidth={1.5}
        absoluteStrokeWidth
        onClick={() => handleDeleteGig(gig.id)}
      />
        </ToolTip>
      </div>
    </div>
  );
}
