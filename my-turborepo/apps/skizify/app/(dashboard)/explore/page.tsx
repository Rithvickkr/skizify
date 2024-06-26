import { getServerSession } from "next-auth/next";
import GigStructure from "../../components/mygigs/Gig";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import getgigs, { getAllgigs } from "../../lib/actions/getgigs";
import { UserRole } from "@prisma/client";
import { GigStatus } from "@prisma/client";
import { Search } from "lucide-react";
import { Input } from "../../../@/components/ui/input";

export interface GigsInterface {
  id: string;
  title: string;
  content: string;
  startDateTime: Date;
  endDateTime: Date;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  Interval: any; //as it is a JSON vlaue
  status: GigStatus;
  timeneeded: number;
}

export default async function Page() {
  const gigs: GigsInterface[] = await getAllgigs();

  return (
    <div className="flex flex-col items-center p-4 overflow-hidden w-full">
    <div className="relative w-full max-w-lg">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <input
        type="search"
        placeholder="Search..."
       
        className="w-full rounded-lg bg-background pl-8"
      />
    </div>
    <div className="mt-4 w-full overflow-hidden">
      <GigStructure gigs={gigs} />
    </div>
  </div>
);

}
