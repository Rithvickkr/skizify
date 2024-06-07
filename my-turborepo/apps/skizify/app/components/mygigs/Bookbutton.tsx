"use client"

import { CheckCheck } from "lucide-react";
import { acceptGig } from "../../lib/actions/Skizzer-accept-gig";
import { Button as ButtonE } from "../ui/button";
import { GigsInterface } from "../../(dashboard)/explore/page";

export default function BookmeetingButton({gig}:{gig : GigsInterface}){
    return (
        <ButtonE onClick={async () => {
            try{
              await acceptGig({gig});
              alert("Booked");
            }catch(err){
              alert('Failed');
            }
          }} className="my-1 mr-1 flex-1 bg-black text-white dark:bg-white hover:bg-black hover:ring-black dark:text-black dark:hover:bg-white dark:hover:text-black dark:hover:ring-white" variant="ringHover">
            <CheckCheck className="mr-2 size-4" />
            Accept
          </ButtonE>
    )
}