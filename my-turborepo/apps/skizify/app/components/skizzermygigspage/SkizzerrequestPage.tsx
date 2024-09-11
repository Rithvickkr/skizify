import { skizzerRequests } from "../../lib/actions/skizzerRequests";
import EnhancedGigCards from "./SkizzzerRequestCard2";
import { GiguserContent } from "@repo/store/types";

export default async function SkizzerrequestPage() {
  const requests: GiguserContent[] = await skizzerRequests() as GiguserContent[];
  console.log(requests);
  if (requests?.length === 0) {
    return <div>No requests are there to show you</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-100 via-neutral-200 to-neutral-300 p-4 dark:from-black dark:to-neutral-900 sm:p-8">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 4xl:grid-cols-5">
        {requests?.map((gig : GiguserContent) => <EnhancedGigCards key={gig.id} gig={gig} />)}
      </div>
    </div>
  );
}
