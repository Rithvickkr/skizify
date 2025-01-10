import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const { meetingId } = await req.json();
    console.log("meetingId: ", meetingId);

    if (!meetingId) {
        return Response.json({ message: 'Meeting ID is required' });
    }

    try {
        const instantMeeting = await prisma.instantMeeting.findUnique({
            where: {
                meetingId: meetingId,
            },
        });

        if (instantMeeting) {
            return Response.json({ isValid: true, table: 'instant-meeting' });
        }

        const gigMeeting = await prisma.meeting.findUnique({
            where: {
                gigUserId: meetingId,
            },
        });

        if (gigMeeting) {
            return Response.json({ isValid: true, table: 'meeting' });
        }

        return Response.json({ isValid: false, table: null });
    } catch (error) {
        console.error('Error checking meeting ID:', error);
        return Response.json({ message: 'Internal server error' });
    }
}