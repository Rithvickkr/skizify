"use server";
/**
 * update the
 * I have to update the Gig User TABLE
 * 
 */
import prisma from "@repo/db/client";
import { GigsInterface } from "../../(dashboard)/explore/page";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
export async function acceptGig({
  gig,
}: {
  gig: GigsInterface;
}) {
    //Update the GigTable
    const session = await getServerSession(authOptions);
    if(!session){
      console.log("Session Don't exist");
    }
    try {
      await prisma.gigUser.create({
        data : {
          gigId : gig.id,
          skizzerId : session?.user.id || "",
          UserId : gig.authorId,
        }
      })
      console.log("Meeting is requested");
    }catch(err){
      console.log('Meeting is not Booked');
    }

}
// model Gigs {
//     id            String    @id @default(uuid())
//     title         String
//     content       String
//     startDateTime DateTime
//     endDateTime   DateTime
//     createdAt     DateTime  @default(now()) // When the Post is Created
//     updatedAt     DateTime  @updatedAt
//     timeneeded    Int       
//     authorId      String
//     confirmUserId String?
//     confirmedUser User?     @relation(name: "ConfirmedUser", fields: [confirmUserId], references: [id])
//     status        GigStatus
//     author        User      @relation(name: "Author", fields: [authorId], references: [id])
//     acceptedUsers GigUser[]
//     Interval      Json //This will store the interval of the Gig
//   }

// model GigUser {
//   id        String    @id @default(uuid())
//   gig       Gigs      @relation(fields: [gigId], references: [id], onDelete: Cascade)
//   gigId     String
//   user      User      @relation(name: "UserCreatedGig", fields: [UserId], references: [id])
//   Skizzer   User      @relation(name: "UserAccptedGig", fields: [skizzerId], references: [id])
//   skizzerId String
//   UserId    String
//   status    GigStatus @default(PENDING)

//   @@unique([skizzerId, UserId])
// }

// export interface GigsInterface {
//     id: string;
//     title: string;
//     content: string;
//     startDateTime: Date;
//     endDateTime: Date;
//     createdAt: Date;
//     updatedAt: Date;
//     authorId: string;
//     Interval: any; //as it is a JSON vlaue
//     status: GigStatus;
//     timeneeded: number
//   }