"use server";
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
  return gigs;
}


export async function getAllgigs() {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("You must be signed in to view this page.");
  }

  const gigs = await prisma.gigs.findMany({
    select: {
      confirmUserId: true,
      id: true,
      title: true,
      content: true,
      startDateTime: true,
      endDateTime: true,
      createdAt: true,
      updatedAt: true,
      authorId: true,
      Interval: true,
      status: true,
      timeneeded: true,
      category: true,
      acceptedUsers : {
        where : {
          UserId : session.user.id
        }
      },
    }
  });
  return gigs;
}

