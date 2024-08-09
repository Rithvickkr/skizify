"use server";
import prisma from "@repo/db/client";
import { UserRole, GigStatus, MeetingStatus } from "@prisma/client";
import { formatTime } from "./ConvertgigInfo";
//This will be accesible to User after User is Watching who has Accepted the Gig and Then choose one SKIZZER
// and Booked the meeting
// Function to confirm a Skizzer for a gig
export async function confirmGig({
  skizzerid,
  gigId,
  budget,
  finalDateTime,
}: {
  skizzerid: string;
  gigId: string;
  budget: number;
  finalDateTime: Date;
}) {
  try {
    // Validate finalDateTime
    if (!(finalDateTime instanceof Date) || isNaN(finalDateTime.getTime())) {
      throw new Error(
        "Invalid finalDateTime provided. It must be a valid Date object.",
      );
    }
//If the Gig is Failed to update then the GigUser table will aslo not be updated then the meeting will also not be created
    const meetingStatus = await prisma.$transaction(async (prisma) => {
      const gig = await prisma.gigs.update({
        where: { id: gigId },
        data: {
          Budgetfinalised: budget,
          confirmUserId: skizzerid,
          status: GigStatus.CONFIRMED,
          finalDateTime: finalDateTime,
        },
      });
      const updatedRole = await prisma.gigUser.update({
        where: {
          gigId_skizzerId: {
            gigId,      // Unique Constraints in the DB
            skizzerId: skizzerid,
          },
        },
        data: {
          status: GigStatus.CONFIRMED,
        },
      });

      const meeting = await prisma.meeting.create({
        data: {
          gigUser: updatedRole.id, // Use updatedRole.id from the previous update
          status: MeetingStatus.BOOKED_PENDING,
        },
      });

      return { gig, updatedRole, meeting };
    });

    // Check if the role update is successful
    if (!meetingStatus) {
      throw new Error("Failed to create meeting ");
    }
    return { message: "Gig confirmed successfully" };
  } catch (error: any) {
    console.error("Error confirming gig:", error);
    throw new Error(
      "An error occurred while confirming the gig. Please check the logs for more details.",
    );
  }
}
