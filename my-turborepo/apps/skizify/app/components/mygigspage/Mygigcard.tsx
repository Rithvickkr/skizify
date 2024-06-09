import { Avatar } from "@repo/ui/avatar";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import getgigs from "../../lib/actions/getgigs";
import { CalendarDays, Pencil, Trash, Trash2 } from "lucide-react";
import { ScrollArea, ScrollBar } from "../../../@/components/ui/scroll-area";
import { Month } from "../../lib/actions/ConvertgigInfo";

//This will take content,
export default async function MygigCard() {
  const session = await getServerSession(authOptions);
  const gigs = await getgigs();

  return (
    <div className="space-y-4 p-3 group/mygiggs transition duration-200">
      {gigs.map(async (gig) => {
        return (
          <div className="shadow-md  rounded-lg border border-gray-300 flex w-full flex-col p-3 transition duration-200 hover/mygiggs:translate-x-2">


            <div className="flex w-full justify-between ">
              <div className="flex space-x-1">
                <Avatar
                  name={session?.user.name}
                  photo={session?.user.userImage}
                  classname="size-10 text-sm"
                />
                <div className="self-center">
                  <span className="text-md text-gray-500">
                    {session?.user.name}
                  </span>
                </div>
              </div>
              <div className="flex self-center">
                <div className="m-1 cursor-pointer rounded text-gray-500 p-1 shadow">
                <Pencil className="md:size-7 size-5 dark:text-white text-black" strokeWidth={1.3} absoluteStrokeWidth />
                </div>
                <div className="m-1 cursor-pointer rounded p-1 text-red-500 shadow">
                <Trash className="md:size-7 size-5" color="#ff0000" strokeWidth={1.5} absoluteStrokeWidth />
                </div>
              </div>
            </div>





            <div className="flex my-3">

            <div className="flex-1 flex flex-col">
              <div className="ml-2 text-xl font-display">
                <h1>{gig.title || "Title"}</h1>
              </div>
              <div>
                <ScrollArea className="w-full truncate text-wrap rounded-md border p-2 px-2 text-sm">
                  {gig.content}
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </div>
            </div>

            <div className="flex-1 ">

                <div className="shadow flex justify-between">
                  <div>
                  <div><CalendarDays className="md:size-7 size-5" color="#000000" strokeWidth={1.5} absoluteStrokeWidth /></div>
                  <div className="self-center">{`${Month(gig.startDateTime)} ${gig.startDateTime.getDay()} - ${Month(gig.endDateTime)} ${gig.endDateTime.getDay()}`}</div>
                  </div>
                </div>
                <div className="shadow">

                </div>
                <div className="shadow">

                </div>
            </div>

            </div>

          </div>
        );
      })}
    </div>
  );
}

//space-x,y-2/3/4 to give space b/w it's children
