import { BentoGridItemcopy, BentoGridcopy } from "./Bentogridcopy";
import { Avatar } from "@repo/ui/avatar";
import prisma from "@repo/db/client";
import { GigsInterface } from "../../(dashboard)/explore/page";

export default async function GigStructurecopy({ gigs }: { gigs: GigsInterface[] }) {
  // Fetch user data for each gig
  const gigsWithUserData = await Promise.all(
    gigs.map(async gig => {
      const user = await prisma.user.findUnique({
        where: {
          id: gig.authorId,
        },
        select: {
          userImage: true,
          name: true,
        },
      });
      return { ...gig, user };
    })
  );

  return (
    <div>
      <BentoGridcopy>
        {gigsWithUserData.map(gig => (
          <BentoGridItemcopy
            key={gig.id}
            title={gig.title}
            description={gig.content}
            range={gig.startDateTime.toDateString() + " to " + gig.endDateTime.toDateString()}
            status={gig.status}
            interval={gig.Interval}
            acceptedby={gig.acceptedById || "0"}
            icon={<Avatar name={gig.user?.name} photo={gig.user?.userImage} />}
            sender={gig.user?.name || ""}
          />
        ))}
      </BentoGridcopy>
    </div>
  );
}
