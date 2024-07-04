import { getServerSession } from "next-auth";
import Example from "../../components/CalendarPage/Calendar";
import { getSkizzercalendarMeetingsdetails, getUsercalendarMeetingsdetails, meetingsInfo_interface } from "../../lib/actions/getcalendarMeetings";
import { GigStatus , UserRole } from "@prisma/client";
import { authOptions } from "../../lib/auth";

export default async  function Home(){
    const session = await getServerSession(authOptions);
    let meetings : meetingsInfo_interface[]; 
  if(session?.user.role === UserRole.SKIZZER){
    meetings = await getSkizzercalendarMeetingsdetails();
    console.log(meetings)
  }else {
    meetings = await getUsercalendarMeetingsdetails();
  }
    return (
        <div className="h-screen">
            <Example meetings={meetings}/>
        </div>
    )
}