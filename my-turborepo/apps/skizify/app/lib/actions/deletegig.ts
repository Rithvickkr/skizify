"use server";
import prisma from "@repo/db/client"; 

export const deleteGig = async (gigId: string, session: any) => {

  if (!session) {
    throw new Error("You must be logged in to delete a gig");
  }
  
  try
  { await prisma.gigs.delete({
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
