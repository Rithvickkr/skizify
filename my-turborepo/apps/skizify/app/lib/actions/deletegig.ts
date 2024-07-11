"use server"
import prisma from "@repo/db/client";

export const deleteGig = async (gigId: string) => {
  console.log(gigId);
  try {
    if(!gigId){
      throw new Error("gigId is not present")
    }
    await prisma.gigs.delete({
      where: {
        id: gigId,
      },
    });
    console.log("Gig deleted successfully");
  } catch (error) {
    console.error("Error deleting gig:", error);
    throw new Error("There was an error deleting the gig");
  }

};
