"use server";
import prisma from "@repo/db/client";
export async function GigSet(
  title: String,
  description: String,
  startDatetime: String,
  endDateTime: String,
  session: any,
  interval: any,
  timeneed:number
) {
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user) {
    throw new Error("User not found");
  } else {
    const gig = await prisma.gigs.create({
      data: {
        title: title as string,
        content: description as string,
        endDateTime: endDateTime as string,
        startDateTime: startDatetime as string,
        authorId: user.id,
        status: "PENDING",
        Interval: interval as {
          milliseconds: number;
          seconds: number;
          minutes: number;
          hours: number;
        },
        timeneeded: timeneed as number,
      },
    });
    return gig;
  }
}
