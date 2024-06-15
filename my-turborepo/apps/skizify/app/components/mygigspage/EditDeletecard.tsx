"use client";
import { Pencil, Trash } from "lucide-react";
import { GigsInterface } from "../../(dashboard)/explore/page";
import { Month, formatTime } from "../../lib/actions/ConvertgigInfo";
import {  } from "next-auth";
import { authOptions } from "../../lib/auth";
import { deleteGig } from "../../lib/actions/deletegig";
import { useSession } from "next-auth/react";
export default function EditDeleteCard({ gig }: { gig: GigsInterface }) {
  const session = useSession(); //using getServerSession ,COMMON MISTAKE
  const deleteGigs = async (id: string, session: any) => {
    await deleteGig(id, session);
    window.alert("Gig deleted successfully");
    window.location.reload();
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
          onClick={() => {
            deleteGigs(gig.id, session);
            // window.location.reload();
            // window.alert("Gig deleted successfully");
          }}
        />
      </div>
    </div>
  );
}
