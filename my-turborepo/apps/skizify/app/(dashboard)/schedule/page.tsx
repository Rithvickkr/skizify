import { getServerSession } from "next-auth";
import Calendar from "../../components/CalendarPage/Calendar";
import { getSkizzercalendarMeetingsdetails, getUsercalendarMeetingsdetails } from "../../lib/actions/getcalendarMeetings";
import { meetingsInfo_interface } from "@repo/store/types";
import { GigStatus , UserRole } from "@repo/store/types";
import { authOptions } from "../../lib/auth";

export default async function Home(){
    const session = await getServerSession(authOptions);
    let meetings : meetingsInfo_interface[]; 
  if(session?.user.role === UserRole.SKIZZER){
    meetings = await getSkizzercalendarMeetingsdetails() as meetingsInfo_interface[];
  }else {
    meetings = await getUsercalendarMeetingsdetails() as meetingsInfo_interface[];
  }
    return (
      
        <div className="h-screen dark:bg-transparent  ">
            <Calendar meetings={meetings}/>
        </div>
    )
}