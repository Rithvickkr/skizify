import { BentoGrid, BentoGridItem } from "./Bentogrid";
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
export default async function GigStructure({
  gigs,
}: {
  gigs: GigsInterface[];
}) {
  const session = await getServerSession(authOptions);
  //If the session don't exist an Error will come on Screen which is due to getAllgigs which is used in parent of this
  return (
    <div className="">
      <div className="mx-auto grid w-full grid-cols-1 gap-2 pl-1 pr-3 md:grid-cols-2 md:pl-2 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-6">
        {gigs.map(async (gig: GigsInterface) => {
          const user = await prisma.user.findUnique({
            where: {
              id: gig.authorId,
            },
          });
          return (
            <BentoGridItem
              gig={gig}
              poster={user}
              status={session?.user.role}
            />
          );
        })}
      </div>
    </div>
  );
}
