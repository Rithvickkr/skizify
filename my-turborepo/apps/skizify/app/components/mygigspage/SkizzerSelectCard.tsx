"use client";

import { Avatar } from "@repo/ui/avatar";
import { Skizzerinfo } from "../../lib/actions/Skizzer-accept-gig";
import { useState } from "react";
import { CalendarDays, CheckCheck, Star } from "lucide-react";
import { Month, formatTime } from "../../lib/actions/ConvertgigInfo";
import { Button } from "../ui/button";
import { confirmGig } from "../../lib/actions/ConfirmingGig";

// SKizzersInfo  this is an array
// [
//   {
//     id: '2fd9e5f8-acd2-46a5-be19-668a510a8e1c',
//     gigId: '0df65238-1092-4bd2-9dfd-cbc3bf67a1bd',
//     budget: 83724,
//     finalDateTime: new Date('2024-06-28T07:54:00.000Z'),
//     Skizzer: {
//       name: 'wnhdfj3krhfd@krjhf.com ',
//       userImage: null,
//       reviewsReceived: []
//     }
//   }
// ]
export default function SkizzerselectCard({
  SKizzersInfo,
}: {
  SKizzersInfo: any;
}) {
  const [selectedCard, setselectedCard] = useState(""); // (This will store the Skizzer Id) and will update it into gig and will confirm and also confirm the Status of the Gig User
  //aslo I will put a limit if the user selected someone , then there that gig will not be displayed on the main screen
  console.log(SKizzersInfo);
  return (
    <div>
      <div className="flex flex-col space-y-4 p-2">
        {SKizzersInfo.map((skizzer: any) => {
          return (
            <div
              className={`flex cursor-pointer justify-between rounded-md p-4 shadow-md hover:border hover:border-black ${selectedCard === skizzer.id ? "border border-black bg-neutral-100" : ""}`}
              key={skizzer.id}
              onClick={() => setselectedCard(skizzer.id)}
            >
              <div className="flex">
                <div className="self-center justify-self-center">
                  <Avatar
                    name={skizzer.Skizzer.name}
                    classname="size-11 shadow-sm mr-3 bg-gray-200 text-xl text-black border border-black"
                  />
                </div>
                <div className="flex flex-col self-center truncate">
                  <div className="text-md truncate font-semibold mb-1">
                    {skizzer.Skizzer.name}
                  </div>
                  <div className="mt-1 flex text-sm">
                    <div className="mr-1 self-center">
                      <Star strokeWidth={2} className="size-4" />
                    </div>
                    <div className="font-display ">{`5.0 (10 reviews)`}</div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-3 self-center">
                <div className="text-right font-display">{`$ ${skizzer.budget}`}</div>
                <div className="flex self-center">
                  <CalendarDays strokeWidth={1} className="mr-1 size-4" />
                  <div className="text-xs">{`${Month(skizzer.finalDateTime)} ${skizzer.finalDateTime.getDate()} at ${formatTime(skizzer.finalDateTime)}`}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-between space-x-4 mt-4">
        <Button
          className="m-1 flex-1 border border-white bg-white text-black shadow hover:bg-white hover:ring-black dark:bg-white dark:text-black dark:hover:bg-white dark:hover:text-black dark:hover:ring-white"
          variant="ringHover"
        >
          Messages
        </Button>
        <Button
          className="col-span-1 m-1 w-full flex-1 bg-black text-white dark:border dark:border-white dark:bg-[#020817]"
          variant="gooeyLeft"
          onClick={async() =>{
            const info = SKizzersInfo.find((x : any) => { //This will return that Item
              return x.id === selectedCard;
            })
            console.log(selectedCard)
            //This is info
            // {
            //   id: '406422c6-2e1c-4e86-bd2b-c2b189e3aecf',
            //   gigId: 'b14b9bba-67df-40a5-a6a5-eca28d3cd15a',
            //   budget: 24234234,
            //   finalDateTime: new Date('2024-06-29T10:45:00.000Z'),
            //   skizzerId: 'f3840f5e-982e-4c17-9dee-cecb87b8d2f9',
            //   Skizzer: {
            //     name: 'ashagrover2212@gmail.com ',
            //     userImage: null,
            //     reviewsReceived: []
            //   }
            // }
            console.log(info)
            try {
              const change = await confirmGig({
                skizzerid: info.skizzerId || "", //selected Id 
                gigId: info.gigId,
                finalDateTime: info.finalDateTime,
                budget: info.budget,
              });
              if (change) {
                console.log("Gig confirmed successfully");
                window.alert("The meeting is now booked.");
              } else {
                throw new Error("Confirming gig server action failed");
              }
            } catch (error) {
              console.error(error);
              window.alert("Failed to confirm. Please choose one and try again.");
            }
          } }
        >
          <CheckCheck className="mr-2 size-4" />
          Accept
        </Button>
      </div>
    </div>
  );
}
// space-y-2 provide space between the child elemenents
// ${selectedCard === skizzer.id ? "focus:over:bg-zinc-50" : ""}
