"use server";
import prisma from "@repo/db/client";
import { GigsInterface } from "../../(dashboard)/explore/page";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
export async function acceptGig({ gig }: { gig: GigsInterface }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    console.log("Session Don't exist");
  }
  try {
    await prisma.gigUser.create({
      data: {
        gigId: gig.id,
        skizzerId: session?.user.id || "",
        UserId: gig.authorId,
      },
    });
    console.log("Meeting is requested");
  } catch (err) {
    console.log("Meeting is not Booked");
  }
}
