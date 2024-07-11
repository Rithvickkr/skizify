// lib/searchGigs.ts

import { GigsInterface } from "../../(dashboard)/explore/page"; // Adjust the import path as necessary


export default  function filtergigs (gigs: GigsInterface[]){
  const currentDate = new Date();
const filtergigs= gigs.filter((gig) => new Date(gig.endDateTime) >= currentDate);

  return filtergigs;
}
