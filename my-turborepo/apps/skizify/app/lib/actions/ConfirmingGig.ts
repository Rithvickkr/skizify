"use server";
import prisma from "@repo/db/client";
import { UserRole, GigStatus } from "@prisma/client";
import { formatTime } from "./ConvertgigInfo";

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
      throw new Error("Invalid finalDateTime provided. It must be a valid Date object.");
    }

    // Update the gig with confirmation details
    const gig = await prisma.gigs.update({
      where: { id: gigId },
      data: {
        Budgetfinalised: budget,
        confirmUserId: skizzerid,
        status: GigStatus.CONFIRMED,
        finalDateTime: finalDateTime,
      },
    });

    // If gig update is successful, update the gig user status
    if (gig) {
      const updatedRole = await prisma.gigUser.update({
        where: {
          gigId_skizzerId: {
            gigId,
            skizzerId: skizzerid,
          },
        },
        data: {
          status: GigStatus.CONFIRMED,
        },
      });

      // Check if the role update is successful
      if (updatedRole) {
        return { message: "Gig confirmed successfully" };
      } else {
        throw new Error("Failed to update GigUser table.");
      }
    } else {
      throw new Error("Failed to update Gig table.");
    }
  } catch (error: any) {
    console.error("Error confirming gig:", error);
    throw new Error(
      "An error occurred while confirming the gig. Please check the logs for more details."
    );
  }
}
