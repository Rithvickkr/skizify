import { Datetimepackage, GigsInterface } from "@repo/store/types";
import { Clock7 } from "lucide-react";
import { ScrollArea, ScrollBar } from "../../../@/components/ui/scroll-area";
import { Button as ButtonE } from "../ui/button";
import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaDescription,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger
} from "../ui/Credenza";
import { SelectDATE } from "./SelectDate";
import { Avatar, AvatarImage, AvatarFallback } from "../../../@/components/ui/avatar";

export function BookButton2({
  gig,
  poster,
  Datetimepackage,
}: {
  gig: GigsInterface;
  poster: any;
  Datetimepackage: Datetimepackage;
}) {
  return (
    <div>
      <Credenza>
        <CredenzaTrigger asChild>
          <ButtonE
            className="col-span-1  h-9 min-w-28 bg-black text-white dark:border dark:border-white dark:bg-black xl:h-10"
            variant="gooeyLeft"
          >
            Book
          </ButtonE>
        </CredenzaTrigger>
        <CredenzaContent className="border-2 border-black dark:border dark:border-neutral-600 dark:bg-lumadark/60 dark:backdrop-blur-sm   ">
          <CredenzaHeader>
            <CredenzaTitle>
              <div className="flex justify-between">
                <div className="flex items-center space-x-2">
                  <Avatar className="size-10">
                    <AvatarImage src={poster.userImage} alt={poster.name} />
                    <AvatarFallback>{poster.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-bold">{poster.name}</h3>
                  </div>
                </div>

                <div className="mr-4 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <div className="">
                    <Clock7 className="size-5" />
                  </div>
                  <div className="text-base font-normal">
                    {Datetimepackage.sessionTime}
                  </div>
                </div>
              </div>
            </CredenzaTitle>
            <CredenzaDescription>
              <div className="flex flex-col">
                <div className="mb-1 mt-4 h-7 justify-items-center tracking-wide text-2xl font-semibold">
                  {gig.title || "Title"}
                </div>
                <ScrollArea className=" w-full tracking-wider truncate text-wrap rounded-md border dark:border-neutral-500 p-2 px-2 text-sm">
                  {gig.content}
                  <ScrollBar orientation="vertical" />
                </ScrollArea>
              </div>
            </CredenzaDescription>
          </CredenzaHeader>
          <CredenzaBody>
            <div className="mt-3">
              <SelectDATE Datetimepackage={Datetimepackage} gig={gig} />
            </div>
          </CredenzaBody>
        </CredenzaContent>
      </Credenza>
    </div>
  );
}
