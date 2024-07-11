
import prisma from "@repo/db/client";
import { GigsInterface } from "../../(dashboard)/explore/page";
import MygigCard from "./Mygigcard";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import getgigs  from "../../lib/actions/getgigs";

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

export default async function Userrequests() {
  // Fetch active gigs
  const session = await getServerSession(authOptions);
  const gigs: GigsInterface[] = await getgigs() as unknown as GigsInterface[];
  // Delete expired gigs from the database
  await deleteExpiredGigs();

  // Filter out gigs whose end date has passed (just to be sure)
  const currentDate = new Date();
  const activeGigs = gigs.filter(
    (gig) => new Date(gig.endDateTime) >= currentDate,
  );

  return (
    <div>
      <MygigCard gigs={ activeGigs } session={session} />
    </div>
  );
}
