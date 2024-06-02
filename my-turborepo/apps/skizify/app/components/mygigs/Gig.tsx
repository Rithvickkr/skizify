"use client"
import { useSession } from "next-auth/react";
import { BentoGrid, BentoGridItem } from "./Bentogrid";
import { Avatar } from "@repo/ui/avatar";
export default function GigStructure(){
    const session = useSession();
    if(!session?.data?.user){
        return <div>loading...</div>
    }
    const { data : {
        user :{
            name ,
            email
        }
    }  } = session;
    return (
        <div>
            <BentoGrid>
                <BentoGridItem title="This is a Gig" description="This is the constent which I want to Store"
                header="Gig" icon={<Avatar name={name} altname={name} photo=}/>} />
            </BentoGrid>
        </div>
    )
}