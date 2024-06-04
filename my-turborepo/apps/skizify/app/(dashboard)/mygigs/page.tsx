import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../@/components/ui/card";
import getgigs from "../../lib/actions/getgigs";

export default async function Home() {
  const gigs: any = await getgigs();
  console.log(gigs);
 
return ( gigs.map((gig: any) => {

  return (
    <div>
     {/* <Card className="w-[350px]" key={gig.id}>
          <CardHeader>
            <CardTitle>{gig.title}</CardTitle>
          </CardHeader>
          <CardContent>{gig.content}</CardContent>
          <CardFooter>{gig.startDateTime}</CardFooter>
        </Card> */}
    </div>
  );
}));
}
