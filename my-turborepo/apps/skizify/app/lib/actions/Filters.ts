// lib/searchGigs.ts

import { GigsInterface } from "../../(dashboard)/explore/page"; // Adjust the import path as necessary

export default function filtergigs(gigs: GigsInterface[], session: any) {
  const currentDate = new Date();
  const filtergigs = gigs.filter(
    (gig) => new Date(gig.endDateTime) >= currentDate,
  );
  //Also going to Filter the Gigs which Skizzer has Accepted or Requested to Join
  //We will also have to eliminate the Gigs posted by user so that It can't accept them
  const filtergigs2 = filtergigs.filter(
    (gig) => gig.authorId !== session?.user.id,
  );
  return filtergigs2;
}
