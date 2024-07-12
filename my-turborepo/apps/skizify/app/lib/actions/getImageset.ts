import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

 export async function getImageSet() {
    const session = await getServerSession(authOptions);
    if (!session) {
      return "";
    }
    try {
      if (session.user?.email) {
        const user = await prisma.user.findUnique({
          where: {
            email: session.user?.email,
          },
          select: {
            userImage: true,
            
          },
        });
        return user?.userImage;
      }
    } catch (error) {
      console.error("Error fetching user image:", error);
    }
    return "";
    }