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
    // Check if acceptedUsers exists and has entries
    if (!gig.acceptedUsers || gig.acceptedUsers.length === 0) {
      return true; // Include gigs with no applicants
    }
    
    // Return false if user has already applied (filter out those gigs)
    const hasUserApplied = gig.acceptedUsers.some(
      (user: { skizzerId: string }) => user.skizzerId === session?.user?.id
    );
    return !hasUserApplied;
  });
  
  return filtergigs4;
}
