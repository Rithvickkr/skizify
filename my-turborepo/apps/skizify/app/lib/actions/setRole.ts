"use server";

import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { UserRole } from "@prisma/client";

// Ensure the module exists and the path is correct


export async function setRole() {
 
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Session doesn't exist");
  }
 

  try {
    if (session.user?.email) {
      const user = await prisma.user.findUnique({
        where: {
          email: session.user.email,
        },
      });

      if (!user) {
        throw new Error("User not found");
      }

      const newRole =
        user.role === UserRole.USER ? UserRole.SKIZZER : UserRole.USER;

      const updatedUser = await prisma.user.update({
        where: {
          email: session.user.email,
        },
        data: {
          role: newRole,
        },
      });

      console.log("User role updated successfully:", updatedUser);
      return updatedUser.role;
    }
  } catch (error) {
    console.log("error: ", error);
    console.log("hELLO")
    console.error("Error updating user role:",error);
  }
}
