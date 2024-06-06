import { getServerSession } from "next-auth/next";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import getgigs, { getAllgigs } from "../../lib/actions/getgigs";
import { UserRole, GigStatus } from "@prisma/client";
import GigStructurecopy from "../../components/mygigs/Gigcopy";

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
  Interval: any; // as it is a JSON value
  status: GigStatus;
  timeneeded: number;
}

// Function to delete expired gigs
const deleteExpiredGigs = async () => {
  const currentDate = new Date();
  await prisma.gigs.deleteMany({
    where: {
      endDateTime: {
        lt: currentDate,
      },
    },
  });
};

export default async function Page() {
  // Delete expired gigs from the database
  await deleteExpiredGigs();

  // Fetch active gigs
  const gigs: GigsInterface[] = await getgigs();

  // Filter out gigs whose end date has passed (just to be sure)
  const currentDate = new Date();
  const activeGigs = gigs.filter(
    (gig) => new Date(gig.endDateTime) >= currentDate,
  );

  return (
    <div className="h-screen">
      <GigStructurecopy gigs={activeGigs} />
    </div>
  );
}
