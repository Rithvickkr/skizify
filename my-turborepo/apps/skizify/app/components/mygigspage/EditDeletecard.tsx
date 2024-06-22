"use client";

import { Pencil, Trash } from "lucide-react";
import { GigsInterface } from "../../(dashboard)/explore/page";
import { Month, formatTime } from "../../lib/actions/ConvertgigInfo";
import { useSession } from "next-auth/react";
import prisma from "@repo/db/client";
import { deleteGig } from "../../lib/actions/deletegig";

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
        {`${formatTime(gig.createdAt)} ${Month(gig.createdAt)} ${gig.createdAt.getDay()}`}
      </div>
      <div className="m-1 cursor-pointer rounded p-1 text-gray-500 shadow">
        <Pencil
          className="size-4 text-black dark:text-white md:size-6"
          strokeWidth={1.3}
          absoluteStrokeWidth
        />
      </div>
      <div className="m-1 cursor-pointer rounded p-1 text-red-500 shadow">
        <Trash
          className="size-4 md:size-6"
          color="#ff0000"
          strokeWidth={1.5}
          absoluteStrokeWidth
          onClick={() => handleDeleteGig(gig.id)}
        />
      </div>
    </div>
  );
}
