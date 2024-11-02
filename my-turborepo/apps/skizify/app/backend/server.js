// apps/backend/server.js


//SCRIP FOR DELETING EXPIRED MEETINGS
// This script will run every hour and delete any expired meetings from the database.

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import express from 'express'; // or whatever server framework you're using
const app = express();

// Add the setInterval code here to run every hour and delete expired meetings
setInterval(async () => {
    const now = new Date();
    try {
        const result = await prisma.instantMeeting.deleteMany({
            where: {
                expiresAt: { lte: now },
            },
        });
        console.log(`Deleted ${result.count} expired meetings`);
    } catch (error) {
        console.error('Error deleting expired meetings:', error);
    }
}, 60 * 60 * 1000); // Run every hour

// Start the Express server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
