"use server";
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { UserRole, GigStatus } from "@prisma/client";


//details to Show tha past and Future meetings for calendar

// we need
export async function getUsercalendarMeetingsdetails(){  //Meetings in which User was a USER
    const session = await getServerSession(authOptions);
    try{
        const meetings = await prisma.gigUser.findMany({
            where:{
                UserId : session?.user.id || "",
            },
        })
        if(meetings){
            return meetings;
        }else{
            throw new Error("No meetings fetched");
        }
    }catch(err){
        console.log("Error fetching details in Calendar, due to -->",err);
        throw new Error("error fetching fetails for calendar");
    }
}

export async function getSkizzercalendarMeetingsdetails(){ //Meetings in which User was a Skizzer
    const session = await getServerSession(authOptions);
    try{
        const meetings = await prisma.gigUser.findMany({
            where:{
                skizzerId : session?.user.id || "",
            },
        })
        if(meetings){
            return meetings;
        }else{
            throw new Error("No meetings fetched");
        }
    }catch(err){
        console.log("Error fetching details in Calendar, due to -->",err);
        throw new Error("error fetching fetails for calendar");
    }
}
