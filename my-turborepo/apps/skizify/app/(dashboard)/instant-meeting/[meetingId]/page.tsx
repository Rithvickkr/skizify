import { PrismaClient } from "@prisma/client";
import SetHairScreen from "../../../components/Meeting/SetHairScreen";


const prisma = new PrismaClient();

async function getMeetingValidity(meetingId: string) {
  try {
    const instantMeeting = await prisma.instantMeeting.findUnique({
      where: {
        meetingId: meetingId,
      },
    });

    if (instantMeeting) {
      return true;
    }

    return false;
  } catch (error) {
    console.error("Error checking meeting ID:", error);
    return false;
  }
}

export default async function MeetingPage({
  params,
}: {
  params: { meetingId: string };
}) {
  const isValid = await getMeetingValidity(params.meetingId);

  if (!isValid) {
    return <div>Error: Invalid Meeting ID</div>;
  }

  return (
    <div>
      <SetHairScreen meetingId={params.meetingId} />
    </div>
  );
}
