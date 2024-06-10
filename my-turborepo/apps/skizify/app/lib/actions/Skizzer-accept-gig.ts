"use server";
import prisma from "@repo/db/client";
import { GigsInterface } from "../../(dashboard)/explore/page";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
export async function acceptGig({ gig }: { gig: GigsInterface }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    console.log("Session Don't exist");
  }
  try {
    await prisma.gigUser.create({
      data: {
        gigId: gig.id,
        skizzerId: session?.user.id || "",
        UserId: gig.authorId,
      },
    });
    console.log("Meeting is requested");
  } catch (err) {
    console.log("Meeting is not Booked");
  }
}

//This will return User name , userImage , rating, review , proposed budget , Date and Time of the meeting 
//it want's gig Id , it will find the Gig in the records , and we will get the person who has accepted the request
export async function Skizzer_acceptedGig(gigId: string){
  const session = await getServerSession(authOptions);
  if(!session){
    console.log("Session doesn't Exist");
    return null
  }
  try{
    const Users = await prisma.gigUser.findMany({
      where : {
        gigId : gigId,
        UserId : session?.user.id || ""
      },
      select : {
        budget : true ,
        finalDateTime : true,
        user : {
          select :{
            name : true,
            userImage : true,
            reviewsReceived : true
          }
        }
      }
    })
    return Users
    }catch(err){
    console.log("Error fetching Skizzer's who accpeted Request",err)
  }
}
