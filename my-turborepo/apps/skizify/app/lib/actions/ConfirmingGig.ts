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
    // Update the gig with confirmation details
    const gig = await prisma.gigs.update({
      where: { id: gigId },
      data: {
        finalDateTime,
        Budgetfinalised: budget,
        confirmUserId: skizzerid,
        status: GigStatus.CONFIRMED,
      },
    }); //No problem Works fine

    // If gig update is successful, update the gig user status
    if (gig) {
      const updatedRole = await prisma.gigUser.update({
        where: {
          gigId_skizzerId: {
            //WHY ? Check the schema, they are uique constraints
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
        throw new Error("Failed to make changes in GigUser Table");
      }
    } else {
      throw new Error("Failed to make changes in Gig Table");
    }
  } catch (error: any) {
    console.error("Error confirming gig:", error);
    throw new Error(
      "Skizzer is not accepted right now, status of gig is still unconfirmed",
    );
  }
}
