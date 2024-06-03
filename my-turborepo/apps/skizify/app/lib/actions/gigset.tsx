"use server";
import prisma from "@repo/db/client";
export async function GigSet( title:String , description:String, date:String, time:String, endDate:String, endTime:String, session:any) {
    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
    });
        if (!user) {
            throw new Error("User not found");
        }
        else{
    const gig = await prisma.gigs.create({
        data: {
            title: title as string,
            content: description as string,
            startdate: date as string,
            starttime: time    as string,
            enddate: endDate as string,
            endtime: endTime    as string,
            authorId: user.id,
            status: "PENDING",
        },
    });
    console.log(gig);
  return gig;
}
}