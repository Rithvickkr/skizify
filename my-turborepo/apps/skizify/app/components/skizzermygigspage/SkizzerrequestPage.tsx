import { skizzerRequests } from "../../lib/actions/skizzerRequests"
import { GigStatus } from "@prisma/client";
import SkizzerRequestCard from "./SkizzerRequestCard";

export interface GiguserContent {
id: string,
gigId: string,
skizzerId:string,
UserId:string,
status: GigStatus,
budget: number,
finalDateTime: Date,
gig: {
    title: string;
    content: string;
    timeneeded : number;
};
user: {
    name : string | null,
    userImage : string | null
};
}

export default async function SkizzerrequestPage() {
    const requests = await skizzerRequests();
    if(!requests){
        return (
            <div>No requests are there to show you</div>
        )
    }
    return (
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3 px-3">
            {requests.map((request) => {
                return (
                    <div key={request.id}>
                        <SkizzerRequestCard request={request}/>
                    </div>
                )
            })}
        </div>
    )
}
