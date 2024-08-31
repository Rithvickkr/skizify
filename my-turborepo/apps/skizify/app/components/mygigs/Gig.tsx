import { BentoGrid, BentoGridItem ,EnhancedLuxuryMeetingCard2 } from "./Bentogrid";
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
//   Interval: {
//     hours: 26.05,
//     minutes: 1563,
//     seconds: 93780,
//     milliseconds: 93780000
//   },
//   status: 'PENDING'
// },....]

import { GigsInterface } from "@repo/store/types";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import PaginationControls from "./PaginationControlsExplore";
export default async function GigStructure({
  gigs,
  page,
  per_page
}: {
  gigs: GigsInterface[];
  page: string | string[] | undefined,
  per_page: string | string[] | undefined
}) {
  const session = await getServerSession(authOptions);
  const start = (Number(page) - 1) * Number(per_page)
  const end = start + Number(per_page)

  const entries = gigs.slice(start, end)

  //If the session don't exist an Error will come on Screen which is due to getAllgigs which is used in parent of this
  return (
    <div className="">
      <div className="mx-auto grid w-full grid-cols-1 gap-2 pl-1 pr-3 md:grid-cols-2 md:pl-2 lg:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 4xl:grid-cols-5">
        {entries.map(async (gig: GigsInterface) => {
          const user = await prisma.user.findUnique({
            where: {
              id: gig.authorId,
            },
          });
          return (
            <EnhancedLuxuryMeetingCard2
              gig={gig}
              poster={user}
              status={session?.user.role}
              authorid={gig.authorId}
            />
          );
        })}
      </div>
      <div className="mt-6">
        <PaginationControls
          hasNextPage={end < gigs.length}
          hasPrevPage={start > 0}
          length = {gigs.length}
        />
      </div>
    </div>
  );
}
