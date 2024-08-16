"use server";
import prisma from "@repo/db/client";

export async function setform(
  name: string,
  username: string,
  bio: string,
  education: string,
  session: any,
  skills: string[],
) {
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  try {
    if (user) {
      {
        const updatedUser = await prisma.user.update({
          where: { email: session.user.email },
          data: {
            name: name as string,
            username: username as string,
            bio: bio as string,
            education: education as string,
            skills: {
              set: skills,
            },
          },
        });

        return updatedUser;
      }
    } else {
      throw new Error("User not found");
    }
  } catch (err: any) {
    if (err.code === "P2002") {
      throw new Error("Username is already taken");
    }
    throw new Error("an error occurred while updating user profile");
  }
}
