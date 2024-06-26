"use server";
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export async function skizzerRequests(){
    const session = await getServerSession(authOptions);
    if(!session){
        console.log("Session doesn't exist");
        throw new Error("session doesn't exist");
    }
    try {
        const requests = await prisma.gigUser.findMany({
            where : {
                skizzerId : session.user.id || "",
            },
            select : {
                id            :true,
                gigId         :true,
                finalDateTime :true,
                skizzerId     :true,
                UserId        :true,
                status        :true,
                budget        :true,
                gig : {
                    select : {
                        title : true,
                        content : true,
                        timeneeded : true
                    }
                },
                user : {
                    select :{
                        name : true,
                        userImage : true
                    }
                }
            }
        })
        if(requests){
            console.log("Skizzer request Succesful");
            return requests;
        }else{
            throw new Error("Error in fetching requests of Skizzer")
        }
    }catch(err){
        console.log("Error fetching skizzerRequests",err)
    }
}