import { getServerSession } from "next-auth/next";
import GigStructure from "../../components/mygigs/Gig";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import getgigs, { getAllgigs } from "../../lib/actions/getgigs";
import { UserRole } from "@prisma/client";
import { GigStatus } from "@prisma/client";

export interface GigsInterface {
  id: string;
  title: string;
  content: string;
  startDateTime: Date;
  endDateTime: Date;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  acceptedById: string | null;
  Interval: any; //as it is a JSON vlaue
  status: GigStatus;
}

export default async function Page() {
  const gigs: GigsInterface[] = await getAllgigs();
  console.log(gigs);
  return (
    <div>
      <GigStructure gigs={gigs}/>
    </div>
  );
}