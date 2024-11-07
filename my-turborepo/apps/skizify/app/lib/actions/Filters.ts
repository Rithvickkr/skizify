// lib/searchGigs.ts

import { GigsInterface, GigStatus } from "@repo/store/types";

export default function filtergigs(gigs: GigsInterface[], session: any) {
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

  // Filter out gigs where the user has already applied
  const filtergigs4 = filtergigs3.filter((gig) => {
    if (gig.acceptedUsers && gig.acceptedUsers.length > 0) {
      // Return false if user has already applied, true if they haven't
      return !gig.acceptedUsers.some(
        (user: { UserId: string }) => user.UserId === session?.user?.id
      );
    }
    // Include gigs with no applicants
    return true;
  });
  
  return filtergigs4;
}
