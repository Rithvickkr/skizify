import { PrismaClient } from '@prisma/client';
import { addHours } from 'date-fns';
const prisma = new PrismaClient();


//Route to Create a New Meeting
export async function POST(req : Request) {
    const { hostId } = await req.json();  // Get the host ID from request body
    const meetingId = Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);  // Generate a unique meeting ID
    
    // Create the meeting with UNBOOKED_PENDING status
    const newMeeting = await prisma.instantMeeting.create({
        data: {
            meetingId,
            hostId,
            status: 'UNBOOKED_PENDING',
            expiresAt: addHours(new Date(), 24),  // Set expiration to 24 hours later
        },
    });
    
    return Response.json(newMeeting);
}
