import { skizzerRequests } from "../../lib/actions/skizzerRequests"
import { GigStatus } from "@prisma/client";
import SkizzerRequestCard from "./SkizzerRequestCard";
import { GiguserContent } from "@repo/store/types";


export default async function SkizzerrequestPage() {
    const requests = await skizzerRequests();
    console.log(requests);
    if(requests?.length === 0){
     
        return (
            <div>No requests are there to show you</div>
        )
    }
    return (
        <div className="mx-auto grid w-full grid-cols-1 gap-2 md:grid-cols-2 2xl:grid-cols-3 pl-1 md:pl-2 pr-4">
            {requests?.map((request) => {
                return (
                    <div key={request.id}>
                        <SkizzerRequestCard request={request}/>
                    </div>
                )
            })}
        </div>
    )
}
