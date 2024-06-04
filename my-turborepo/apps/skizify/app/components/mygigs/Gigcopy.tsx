import { BentoGrid, BentoGridItem } from "./Bentogrid";
import { Avatar } from "@repo/ui/avatar";
import prisma from "@repo/db/client";

//This will fetch Data from DB

// [{
//   id: '642b4dd4-4b20-4f7d-8424-009749fb9933',
//   title: 'lkrrlkg erg',
//   content: 'eh5yh53h5',
//   startDateTime: new Date('2024-06-04T09:18:00.000Z'),
//   endDateTime: new Date('2024-06-05T11:21:00.000Z'),
//   createdAt: new Date('2024-06-04T09:18:16.000Z'),
//   updatedAt: new Date('2024-06-04T09:18:16.000Z'),
//   authorId: '04ba4c81-3704-4ce1-a06c-3dc298fe85ec',
//   acceptedById: null,
//   Interval: {
//     hours: 26.05,
//     minutes: 1563,
//     seconds: 93780,
//     milliseconds: 93780000
//   },
//   status: 'PENDING'
// },....]

import { GigsInterface } from "../../(dashboard)/explore/page";
import { BentoGridItemcopy, BentoGridcopy } from "./Bentogridcopy";
export default async function GigStructurecopy({
  gigs,
}: {
  gigs: GigsInterface[];
}) {
  return (
    <div>
      <BentoGridcopy>
        {gigs.map(async (gig) => {
          const user = await prisma.user.findUnique({
            where: {
              id: gig.authorId,
            },
            select: {
              userImage: true,
              name: true,
            },
          });

          return (
            <BentoGridItemcopy
              title={gig.title}
              description={gig.content}
              range={gig.startDateTime.toDateString() + " to " + gig.endDateTime.toDateString()}
              status={gig.status}
              interval={gig.Interval}
              acceptedby={gig.acceptedById || "0"}

              

              icon={<Avatar name={user?.name} photo={user?.userImage} />}
              sender={user?.name || ""}

            />
          );
        })}
      </BentoGridcopy>
    </div>
  );
}
