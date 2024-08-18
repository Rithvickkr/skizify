"use server";
import prisma from "@repo/db/client";

export default async function setreview(session:any, rating:number, feedback:string,giventouserid:string) {
  const user = prisma.user.findUnique({
    where: { email: session.user.email },
  });
  try {
    if (!user) {
      throw new Error("User not found");
    } else {
      const review = await prisma.reviews.create({
        data: {
          rating: rating,
          content: feedback,
          givenby: session.user.id,
          givento: "3ad4eb99-d0c7-4d2e-8a40-e4b6fbb4e064",
        },
      });
      console.log(review);
      return review;
    }
  } catch (err) {
    console.log("Error posting Review");
    console.log(err);
  }
}





