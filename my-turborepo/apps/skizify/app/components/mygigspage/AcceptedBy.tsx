import { Avatar } from "@repo/ui/avatar";
import { GigsInterface } from "../../(dashboard)/explore/page";
import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "../mygigs/Credenza";
import { Button } from "../ui/button";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ScrollBar } from "../../../@/components/ui/scroll-area";
import BookmeetingButton from "../mygigs/Bookbutton";
import { ArrowRightIcon, CheckCheck, Clock7 } from "lucide-react";
import { Skizzer_acceptedGig } from "../../lib/actions/Skizzer-accept-gig";

export default async function AcceptedBy({ gig }: { gig: GigsInterface }) {
  //Fetch the Users Reveiws , ratings , Budget Proposed , time Proposed
  const SKizzersInfo = await Skizzer_acceptedGig(gig.id);
  return (
    <div>
      <Credenza>
        <CredenzaTrigger asChild>
          <div className="my-1 flex place-content-start items-center p-2 sm:my-2 md:my-0">
            <Button
              className="w-full bg-black text-white hover:bg-black dark:bg-white dark:text-black hover:dark:bg-white"
              Icon={ArrowRightIcon}
              iconPlacement="right"
              variant="expandIcon"
            >
              Accepted By
            </Button>
          </div>
        </CredenzaTrigger>
        <CredenzaContent>
          <CredenzaHeader>
            <CredenzaTitle>
              <div className="font-display text-2xl font-bold md:text-4xl">
                Search Results
              </div>
            </CredenzaTitle>
            <CredenzaDescription>
              <div className="text-lg text-gray-400">
                Request accepted by Skizzers
              </div>
            </CredenzaDescription>
          </CredenzaHeader>

          <CredenzaBody>
            <div></div>
          </CredenzaBody>

          <CredenzaFooter className="flex justify-between space-x-4">
            <Button
              className="m-1 flex-1 bg-white text-black shadow hover:bg-white hover:ring-black dark:bg-white dark:text-black dark:hover:bg-white dark:hover:text-black dark:hover:ring-white"
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
          </CredenzaFooter>
        </CredenzaContent>
      </Credenza>
    </div>
  );
}
