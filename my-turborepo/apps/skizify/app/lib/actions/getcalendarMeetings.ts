"use server";
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { GigStatus } from "@prisma/client";

//details to Show tha past and Future meetings for calendar

export interface meetingsInfo_interface {
  id: string;
  gigId: string;
  skizzerId: string;
  UserId: string;
  status: GigStatus;
  budget: number;
  finalDateTime: Date;
  user: {
    id: string;
    name: string | null;
    userImage: string | null;
  };
  Skizzer: {
    id: string;
    name: string | null;
    userImage: string | null;
  };
  gig: {
    title: string;
    content: string;
  };
}

// we need
export async function getUsercalendarMeetingsdetails() {
  //Meetings which user want to resolve his doughtx
  const session = await getServerSession(authOptions);
  try {
    const meetings = await prisma.gigUser.findMany({
      where: {
        UserId: session?.user.id || "",
        status: GigStatus.CONFIRMED, //We want only the meetings which are confirmed
      },
      select: {
        id: true,
        gigId: true,
        skizzerId: true,
        UserId: true,
        status: true,
        budget: true,
        finalDateTime: true,
        user: {
          select: {
            id: true,
            name: true, //name of the user
            userImage: true,
          },
        },
        Skizzer: {
          select: {
            id: true,
            name: true, //name of the user
            userImage: true,
          },
        },
        gig: {
          select: {
            title: true,
            content: true,
          },
        },
      },
    });
    if (meetings) {
      return meetings;
    } else {
      throw new Error("No meetings fetched");
    }
  } catch (err) {
    console.log("Error fetching details in Calendar, due to -->", err);
    throw new Error("error fetching fetails for calendar");
  }
}

export async function getSkizzercalendarMeetingsdetails() {
  //Meetings in which User will join as a Skizzer
  const session = await getServerSession(authOptions);
  try {
    const meetings = await prisma.gigUser.findMany({
      where: {
        skizzerId: session?.user.id || "",
        status: GigStatus.CONFIRMED,
      },
      select: {
        id: true,
        gigId: true,
        skizzerId: true,
        UserId: true,
        status: true,
        budget: true,
        finalDateTime: true,
        user: {
          select: {
            id: true,
            name: true, //name of the user
            userImage: true,
          },
        },
        Skizzer: {
          select: {
            id: true,
            name: true, //name of the user
            userImage: true,
          },
        },
        gig: {
          select: {
            title: true,
            content: true,
          },
        },
      },
    });
    if (meetings) {
      return meetings;
    } else {
      throw new Error("No meetings fetched");
    }
  } catch (err) {
    console.log("Error fetching details in Calendar, due to -->", err);
    throw new Error("error fetching fetails for calendar");
  }
}
