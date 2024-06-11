import { BentoGridItemcopy, BentoGridcopy } from "./Bentogridcopy";
import { Avatar } from "@repo/ui/avatar";
import prisma from "@repo/db/client";
import { GigsInterface } from "../../(dashboard)/explore/page";
import MygigCard from "../mygigspage/Mygigcard";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

export default async function GigStructurecopy({ gigs }: { gigs: GigsInterface[] }) {
  // Fetch user data for each gig
  const session = await getServerSession(authOptions);
  console.log("session", session);

  // const gigsWithUserData: GigWithUser[] = await Promise.all(
  //   gigs.map(async gig => {
  //     const user = await prisma.user.findUnique({
  //       where: {
  //         id: gig.authorId,
  //       },
  //       select: {
  //         userImage: true,
  //         name: true,
  //       },
  //     });
  //     return { ...gig, user };
  //   })
  // );

  return (
    <div>
      {/* <BentoGridcopy>
        {gigsWithUserData.map(gig => (
          <BentoGridItemcopy
            key={gig.id}
            title={gig.title}
            description={gig.content}
            range={gig.startDateTime.toDateString() + " to " + gig.endDateTime.toDateString()}
            status={gig.status}
            interval={gig.Interval}
            icon={<Avatar name={gig.user?.name} photo={gig.user?.userImage} />}
            sender={gig.user?.name || ""}
          />
        ))}
      </BentoGridcopy> */}
    
      <MygigCard gigs={gigs} session={session} />
    </div>
  );
}
