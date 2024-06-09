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

export default function AcceptedBy({ gig }: { gig: GigsInterface }) {

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
                <div className="md:text-4xl text-2xl font-bold font-display">
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
            <div>
                
            </div>
          </CredenzaBody>




          <CredenzaFooter className="flex justify-between space-x-4">
            <Button
              className="m-1 flex-1 bg-white text-black shadow hover:bg-white hover:ring-black dark:bg-white dark:text-black dark:hover:bg-white dark:hover:text-black dark:hover:ring-white"
              variant="ringHover"
            >
              Message
            </Button>
            <Button
            className="col-span-1 m-1 w-full bg-black text-white dark:border dark:border-white dark:bg-[#020817] flex-1"
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
