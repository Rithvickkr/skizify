// import React from "react";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "../../../@/components/ui/card";
// import getgigs from "../../lib/actions/getgigs";

// export default async function () {
//   const gigs: any = await getgigs();
//   console.log(gigs);

//   const formatTimeInterval = (hours: number, minutes: number) => {
//     const totalMinutes = Math.floor(hours * 60 + minutes); // Convert hours to minutes and add the extra minutes
//     const formattedHours = Math.floor(totalMinutes / 60); // Calculate total hours
//     const formattedMinutes = totalMinutes % 60; // Get the remainder for minutes
//     const paddedMinutes = String(formattedMinutes).padStart(2, "0");
//     return `${formattedHours}:${paddedMinutes}`;
//   };

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5">
//       {gigs.map((gig: any) => (
//         <div key={gig.id}>
//           <Card className="w-full">
//             <CardHeader>
//               <CardTitle>{gig.title}</CardTitle>
//             </CardHeader>
//             <CardContent>{gig.content}</CardContent>
//             <CardContent>
//               {formatTimeInterval(gig.Interval.hours, gig.Interval.minutes)}
//             </CardContent>
//             <CardContent>Accepted by - {gig.acceptedbyId?gig.acceptedbyId:"0"}</CardContent>
//             <CardFooter>{new Date(gig.startDateTime).toLocaleString().slice(0,8)} to {new Date(gig.endDateTime).toLocaleString().slice(0,8)}</CardFooter>
//             <CardFooter>Status-<h5 className={gig.status=="ACCEPTED"?"text-green-600":"text-blue-600"}>{gig.status}</h5></CardFooter>
//           </Card>
//         </div>
//       ))}
//     </div>
//   );
// }
import { getServerSession } from "next-auth/next";
import GigStructure from "../../components/mygigs/Gig";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import getgigs, { getAllgigs } from "../../lib/actions/getgigs";
import { UserRole } from "@prisma/client";
import { GigStatus } from "@prisma/client";
import GigStructurecopy from "../../components/mygigs/Gigcopy";

export interface GigsInterface {
  id: string;
  title: string;
  content: string;
  startDateTime: Date;
  endDateTime: Date;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  acceptedById: string | null;
  Interval: any; //as it is a JSON vlaue
  status: GigStatus;
}

export default async function Page() {
  const gigs: GigsInterface[] = await getgigs();
  console.log(gigs);
  return (
    <div>
      <GigStructurecopy gigs={gigs}/>
    </div>
  );
}