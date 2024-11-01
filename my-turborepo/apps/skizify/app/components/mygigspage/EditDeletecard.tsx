"use client";

import { EditIcon, Pencil, Trash, TrashIcon } from "lucide-react";
import { GigsInterface } from "@repo/store/types";
import { Month, formatTime } from "../../lib/actions/ConvertgigInfo";
import { useSession } from "next-auth/react";
import { deleteGig } from "../../lib/actions/deletegig";
import { ToolTip } from "@repo/ui/tooltip";
import { Button } from "../ui/button";

export default function EditDeleteCard({ gig }: { gig: GigsInterface }) {
  const session = useSession();

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
    <div className="flex gap-2 sm:gap-1">
      {/* <ToolTip name="Edit">
        <Button
          variant="outline"
          size="icon"
          className="size-8 rounded-md border-neutral-700 bg-black/80 text-neutral-300 transition-all duration-300 hover:scale-110 hover:bg-neutral-800 sm:size-10"
        >
          <EditIcon className="size-3 sm:size-4" />
          <span className="sr-only">Edit</span>
        </Button>
      </ToolTip> */}
      <ToolTip
        name="Delete"
        className="bg-red-600 text-white dark:bg-red-600 dark:text-white"
      >
        <Button
          variant="outline"
          size="icon"
          className="size-8 rounded-md border-neutral-700 bg-black/80 text-neutral-300 transition-all duration-300 hover:scale-110 hover:bg-neutral-800 sm:size-10"
          onClick={() => handleDeleteGig(gig.id)}
        >
          <TrashIcon className="size-3 sm:size-4" />
          <span className="sr-only">Delete</span>
        </Button>
      </ToolTip>
    </div>
  );
}
