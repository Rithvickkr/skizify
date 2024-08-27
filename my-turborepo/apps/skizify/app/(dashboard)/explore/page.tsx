import { GigsInterface } from "@repo/store/types";
import { Search } from "lucide-react";
import { getServerSession } from "next-auth";
import GigStructure from "../../components/mygigs/Gig";
import filtergigs from "../../lib/actions/Filters";
import { getAllgigs } from "../../lib/actions/getgigs";
import { authOptions } from "../../lib/auth";


export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const page = searchParams['page'] ?? '1'
  const per_page = searchParams['per_page'] ?? '12'
  const gigs: GigsInterface[] = await getAllgigs() as unknown as GigsInterface[];
  const session = await getServerSession(authOptions);
  const filteredGigs =  filtergigs(gigs,session);  
  return (
    <div className="flex flex-col h-fit items-center  rounded-lg w-full pb-4">
    <div className="relative w-full max-w-lg ">
      <Search className=" absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground " />
      <input
        type="search"
        placeholder="Search..."
        className="w-full rounded-lg bg-background pl-8"
      />
    </div>
    <div className="mt-4 w-full">
      <GigStructure gigs={filteredGigs} page={page} per_page={per_page} />
    </div>
  </div>
);

}
