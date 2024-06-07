"use server";
/**
 * update the
 * timeneeeded ,
 * I have to update the Gig table and GIGUSER TABLE
 *
 */
import prisma from "@repo/db/client";
import { UserRole, GigStatus } from "@prisma/client";
import { GigsInterface } from "../../(dashboard)/explore/page";
import { Datetimepackage } from "../../components/mygigs/Bentogrid";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
export async function acceptGig({
  gig,
  poster,
  Datetimepackage,
}: {
  gig: GigsInterface;
  poster: any;
  Datetimepackage: Datetimepackage;
}) {
    const session = await getServerSession(authOptions);

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
//     id       String  @id @default(uuid())
//     gig      Gigs    @relation(fields: [gigId], references: [id])
//     gigId    String
//     user     User    @relation(fields: [userId], references: [id])
//     userId   String
//     accepted Boolean //Teacher will also get to know which of the Requests are accepted
//     @@unique([gigId, userId])
//   }

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