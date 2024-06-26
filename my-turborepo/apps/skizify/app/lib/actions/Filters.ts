// lib/searchGigs.ts

import { GigsInterface } from "../../(dashboard)/explore/page";// Adjust the import path as necessary
import { getAllgigs } from "./getgigs";

export const searchGigs = async ( query: string): Promise<GigsInterface[]> => {
    const gigs: GigsInterface[] = await getAllgigs();
  return gigs.filter(gig =>
    gig.title.toLowerCase().includes(query.toLowerCase())
  );
};
