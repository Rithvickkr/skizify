"use server"
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface SetImageInDBProps {
    userId: string;
    url: string;
}

export default async function setImageInDB({ userId, url }: SetImageInDBProps) {
    try {
        const user = await prisma.user.update({
            where: { id: userId },
            data: { userImage: url.split("?")[0] },
        });
        return user;
    } catch (error) {
        console.error('Failed to set image in DB:', error);
        throw new Error('We didn\'t succeed in saving the image URL to the database.');
    }
}