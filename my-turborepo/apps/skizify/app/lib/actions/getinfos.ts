
import prisma from "@repo/db/client";
export interface UserInfos {
    name: string ,
    userImage: string ,
    reviewsReceived: string[],
    bio: string ,
    education: string ,
}
export default async function getInfos(UserId: string) {
   
    const users = await prisma.user.findUnique({
        where: {
            id: UserId
        },
        select: {
            name: true,
            userImage: true,
            reviewsReceived: true,
            bio: true,
            education: true,
        }
    });
    if (!users) {
        console.log("User doesn't exist");
        return null;
    }
    return users;
    }