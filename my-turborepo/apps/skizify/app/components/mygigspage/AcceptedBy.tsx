import { GigsInterface } from "@repo/store/types";
import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "../ui/Credenza";
import { Button } from "../ui/button";
import { ArrowRightIcon, ChevronRight} from "lucide-react";
import { Skizzer_acceptedGig } from "../../lib/actions/Skizzer-accept-gig";
import SkizzerselectCard from "./SkizzerSelectCard";

export default async function AcceptedBy({ gig }: { gig: GigsInterface }) {
  //Fetch the Users Reveiws , ratings , Budget Proposed , time Proposed
  const SKizzersInfo = (await Skizzer_acceptedGig(gig.id)) || [];
  return (
    <div>
      <Credenza>
        <CredenzaTrigger asChild>
          <div className="my-1 flex place-content-start items-center p-2 sm:my-2 md:my-0">
            <Button
              className="w-full bg-black text-white hover:bg-black dark:bg-white dark:text-black hover:dark:bg-white"
              Icon={ChevronRight}
              iconPlacement="right"
              variant="expandIcon"
            >
              Accepted By
            </Button>
          </div>
        </CredenzaTrigger>
        <CredenzaContent className="border border-black dark:border-neutral-500 ">
          <CredenzaHeader>
            <CredenzaTitle>
              <div className="text-2xl font-bold md:text-4xl">
                Search Results
              </div>
            </CredenzaTitle>
            <CredenzaDescription>
              <div className="text-lg bg-gradient-to-r from-neutral-800 to-neutral-300 bg-clip-text">
                Requests by Skizzers
              </div>
            </CredenzaDescription>
          </CredenzaHeader>

          {SKizzersInfo?.length > 0 ? (

            <CredenzaBody>
            <SkizzerselectCard SKizzersInfo={SKizzersInfo} />
          </CredenzaBody>
          ) : (
            <div className="p-2 border-1 border-black dark:border-white rounded ">
        
            </div>
          )}

          {/* <CredenzaFooter className="flex justify-between space-x-4">
            <Button
              className="m-1 flex-1 bg-white text-black shadow border border-white hover:bg-white hover:ring-black dark:bg-white dark:text-black dark:hover:bg-white dark:hover:text-black dark:hover:ring-white"
              variant="ringHover"
            >
              Messages
            </Button>
            <Button
              className="col-span-1 m-1 w-full flex-1 bg-black text-white dark:border dark:border-white dark:bg-[#020817]"
              variant="gooeyLeft"
            >
              <CheckCheck className="mr-2 size-4" />
              Accept
            </Button>
          </CredenzaFooter> */}
        </CredenzaContent>
      </Credenza>
    </div>
  );
}
