import { GigsInterface } from "@repo/store/types";
import { Search, SearchIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import GigStructure from "../../components/mygigs/Gig";
import filtergigs from "../../lib/actions/Filters";
import { getAllgigs } from "../../lib/actions/getgigs";
import { authOptions } from "../../lib/auth";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import SearchBar from "../../components/mygigs/SearchBar";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = searchParams["page"] ?? "1";
  const per_page = searchParams["per_page"] ?? "12";
  const gigs: GigsInterface[] =
    (await getAllgigs()) as unknown as GigsInterface[];
  const session = await getServerSession(authOptions);
  const filteredGigs = filtergigs(gigs, session);
  return (
    <div className="flex h-fit w-full flex-col items-center rounded-lg pb-4">
      <div className="mt-4 w-full">
        <SearchBar />
        <GigStructure gigs={filteredGigs} page={page} per_page={per_page} />
      </div>
    </div>
  );
}
