import { PrismaClient } from "@prisma/client";
import { authOptions } from "../../../lib/auth";
import { getServerSession } from "next-auth";
import SetHairScreen from "../../../components/Meeting/SetHairScreen";

const prisma = new PrismaClient();

async function getMeetingValidity(meetingId: string) {
  const session = await getServerSession(authOptions);
  try {
    if (!session?.user?.id) {
      return false;
    }

    // Checking if the meeting exists and the user or the Skizzer has access to it
    const gigMeeting = await prisma.meeting.findFirst({
      where: {
        gigUserId: meetingId,
        GigUser: {
          OR: [
            { UserId: session.user.id }, 
            { skizzerId: session.user.id },
          ],
        },
      },
    });

    if (gigMeeting) {
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
    return <div>You can't Join this Meeting</div>;
  }

  return (
    <div>
      <SetHairScreen meetingId={params.meetingId} />
    </div>
  );
}
