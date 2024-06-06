"use server";
import prisma from "@repo/db/client";

export async function setform(
  name: string,
  username: string,
  bio: string,
  education: string,
  session: any
) {
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (user) { {
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        name: name as string,
        username: username as string,
        bio: bio as string,
        education: education as string,
      },
    });
    return updatedUser;
  }
}
else
{
    throw new Error("User not found");
}
}
