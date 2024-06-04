"use server"
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";


export default async function getgigs() {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new Error("You must be signed in to view this page.");
    }
    
    const gigs = await prisma.gigs.findMany({
      where: {
        authorId: session.user.id,
      },
    });
    console.log(session);
    console.log(gigs[0]);

    return gigs;
  }