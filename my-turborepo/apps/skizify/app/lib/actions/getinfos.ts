
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
            
            bio: true,
            education: true,
            username: true,
            skills: true,
            reviewsReceived: {
                select: {
                    content: true,
                    rating: true,
                    createdAt: true,
                    updatedAt: true,
                    givento: true,
                    givenby: true,
                    givenbyUser: {
                        select: {
                            name: true,
                            userImage: true,
                            username: true,
                        }
                    }
                }
            },
            
        }
    });
    if (!users) {
        console.log("User doesn't exist");
        return null;
    }
    console.log(users.reviewsReceived);
    return users;
    }