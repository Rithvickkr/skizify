"use server";
import prisma from "@repo/db/client";

export async function setformy(
  name: string,
  username: string,
  bio: string,
  education: string,
  session: any,
  skills: string[],
  languages: string[],
  qualifications: string,
  profession: string,

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
            languages: {
              set: languages,
            },
            qualification: qualifications as string,
            profession: profession as string,
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
    console.log(session.user.email);
    console.log(err);
    throw new Error("an error occurred while updating user profile");
     
  }
}
