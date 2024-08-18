"use server";
import prisma from "@repo/db/client";
import { GigsInterface } from "@repo/store/types";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

//Accept button in Book page when requesting for meeting
//This is clicked by SKizzer to request for the Meeting
export async function acceptGig({ gig , budget , finalDateTime }: { gig: GigsInterface , budget : number , finalDateTime : string }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    console.log("Session Don't exist");
  }
  console.log(finalDateTime);
  console.log(budget);
  try {
    await prisma.gigUser.create({
      data: {
        gigId: gig.id,
        skizzerId: session?.user.id || "",
        UserId: gig.authorId,
        budget : budget || 0,  //Currently set the min budget to 0
        finalDateTime
      },
    });
    console.log("Meeting is Booked for",finalDateTime);
     return ("Meeting is requested");
  } catch (err) {
    console.log(err);
     return (`Meeting is not Booked ${err} <---This is the error `);
  }
}
export interface Skizzerinfo {
  id: string;
  budget : number;
  finalDateTime : Date;
  Skizzer : any
}

//This is fetch the Skizzer details on a particular Gig of user on mygigs page
// This will return User name , userImage , rating, review , proposed budget , Date and Time of the meeting 
// it want's gig Id , it will find the Gig in the records , and we will get the person who has accepted the request
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
        UserId : session?.user.id || "",
      },
      select : {
        id : true,
        gigId : true,
        budget : true ,
        finalDateTime : true,
        skizzerId : true,
        Skizzer : {
          select :{
            name : true,
            email : true,
            userImage : true,
            reviewsReceived : true,
            
          }
        }
      }
    })
    return Users
    }catch(err){
    console.log("Error fetching Skizzer's who accepted Request",err);
  }
}
