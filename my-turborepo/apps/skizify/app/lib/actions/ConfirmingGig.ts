"use server";
import prisma from "@repo/db/client";
import { UserRole, GigStatus } from "@prisma/client";

export async function ConfirmingGig({
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
  //Now I have to confirm it in the Gig and also update the Status of both Table
  try {
    const gig = await prisma.gigs.update({
      where: {
        id: gigId,
      },
      data: {
        finalDateTime: finalDateTime,
        Budgetfinalised: budget,
        confirmUserId: skizzerid,
        status: GigStatus.CONFIRMED,
      },
    });
    if (gig) {
      const updateRole = await prisma.gigUser.update({
        where: {
          gigId_skizzerId: {
            //WHY Because there we can't find on the Basis of indivisual ID
            gigId: gigId,
            skizzerId: skizzerid,
          },
        },
        data: {
          status: GigStatus.CONFIRMED,
        },
      });
      if (updateRole) {
        console.log("Yes")
        return { message: "Gig Confirmed Successfully" };
      } else {
        console.log("Yes")
        throw new Error("Error in updating status in Giguser Table");
      }
    } else {
        console.log("Yes")
      throw new Error("Error in updating Gig Table");
    }
    //Updating the confirmId
  } catch(err : any) {
    console.log("Yes")
    console.log(err)
    console.log(
      "Skizzer is not accepted right now, Status of gig is still unconfirmed",
      err,
    );
  }
}
