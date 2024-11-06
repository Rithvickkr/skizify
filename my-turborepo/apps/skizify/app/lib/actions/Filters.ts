// lib/searchGigs.ts

import { GigsInterface, GigStatus } from "@repo/store/types";

export default function filtergigs(gigs: GigsInterface[], session: any) {
  console.log("gigs: ", gigs);
  const currentDate = new Date();
  const filtergigs = gigs.filter(
    (gig) => new Date(gig.endDateTime) >= currentDate,
  );
  //Also going to Filter the Gigs which Skizzer has Accepted or Requested to Join

  //We will also have to eliminate the Gigs posted by user so that he can't accept them
  const filtergigs2 = filtergigs.filter(
    (gig) => gig.authorId !== session?.user.id,
  );

  //Filtering Gigs Whose Status is already Confirmed
  const filtergigs3 = filtergigs2.filter((gig) => gig.status !== GigStatus.CONFIRMED);

  //Also filtering the Gigs which we have already requested to join
  // const filtergigs4 = filtergigs3.filter((gig) => {
  //   console.log("gig.acceptedUsers: ", gig.acceptedUsers);
  //   if (gig.acceptedUsers) {
  //     return !gig.acceptedUsers.some(
  //       (user: { UserId: any; }) => user.UserId === session?.user.id,
  //     );
  //   }
  //   return true;
  // })
  
  return filtergigs3;
}
