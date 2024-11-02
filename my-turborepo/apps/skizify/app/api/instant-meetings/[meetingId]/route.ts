import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: { meetingId: string } },
) {
  const { meetingId } = params;
  if (!meetingId) {
    return new Response("Meeting ID is required", { status: 400 });
  }
  // Find the meeting by its unique meetingId
  //To Check if the Meeting Exists on the Network
  const meeting = await prisma.instantMeeting.findUnique({
    where : {
        meetingId : meetingId,
    },
  });

  if (!meeting) {
    return new Response("Meeting not found", { status: 404 });
  }
  return Response.json(meeting);
}

export async function PATCH(
  req: Request,
  { params }: { params: { meetingId: string } },
) {
  const { meetingId } = params;
  const { guestId } = await req.json(); // Get guest ID from request body

  // Update the meeting with guest information and change status if both host and guest are present
  const updatedMeeting = await prisma.instantMeeting.update({
    where: {
        meetingId : meetingId,
    },
    data: {
      guestId,
      status: "ONGOING",
    },
  });

  return Response.json(updatedMeeting);
}
