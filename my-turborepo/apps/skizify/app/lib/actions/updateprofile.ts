import prisma from "@repo/db/client";

export default function updateProfile(sessionId: string, data: any) {
  return prisma.user.update({
    where: { email: sessionId },
    data: {
        ...data,
    },
  });
}

