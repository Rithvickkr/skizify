import { getServerSession } from "next-auth/next";
import MeetingDashboard from "../../components/Meeting/Meeting-Dashboard";
import {
  getSkizzercalendarMeetingsdetails,
  getUsercalendarMeetingsdetails,
} from "../../lib/actions/getcalendarMeetings";
import { authOptions } from "../../lib/auth";
import { meetingsInfo_interface, UserRole } from "@repo/store/types";
import VideoPlatform from "../../components/Meeting/Structure";
// import SetHairScreen from "../../components/Meeting/SetHairScreen";
export default async function Meeting() {
  const session = await getServerSession(authOptions);
  let meetings: meetingsInfo_interface[];
  if (session?.user.role === UserRole.SKIZZER) {
    meetings =
      (await getSkizzercalendarMeetingsdetails()) as meetingsInfo_interface[];
  } else {
    meetings =
      (await getUsercalendarMeetingsdetails()) as meetingsInfo_interface[];
  }

  return (
    <div className="no-scrollbar h-screen w-full rounded-lg">
      {/* <Landing /> */}
      {/* <SetHairScreen meetingId={"1"} /> */}
      <MeetingDashboard meetings={meetings} />
      {/* <VideoPlatform /> */}
      
    </div>
  );
}
