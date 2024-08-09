import GigStructure from "../../components/mygigs/Gig";
import { getAllgigs } from "../../lib/actions/getgigs";
import { GigStatus } from "@prisma/client";
import { Search } from "lucide-react";
import filtergigs from "../../lib/actions/Filters";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";


export interface GigsInterface {
  confirmUserId: string;
  id: string;
  title: string;
  content: string;
  startDateTime: Date;
  endDateTime: Date;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  Interval: any; //as it is a JSON vlaue
  status: GigStatus;
  timeneeded: number;
 
}

export default async function Page() {
  const gigs: GigsInterface[] = await getAllgigs() as unknown as GigsInterface[];
  const session = await getServerSession(authOptions);
  const filteredGigs =  filtergigs(gigs,session);  
  return (
    <div className="flex flex-col items-center overflow-hidden rounded-lg w-full h-screen">
    <div className="relative w-full max-w-lg">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground " />
      <input
        type="search"
        placeholder="Search..."
       
        className="w-full rounded-lg bg-background pl-8"
      />
    </div>
    <div className="mt-4 w-full overflow-hidden">
      <GigStructure gigs={filteredGigs} />
    </div>
  </div>
);

}
