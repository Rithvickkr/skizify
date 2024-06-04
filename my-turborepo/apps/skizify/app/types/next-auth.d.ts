import { UserRole } from "@prisma/client";
import type { DefaultSession, User } from "next-auth";
import "next-auth/jwt";
import "next-auth"

type UserId = string;

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId;
    userImage : string ,
    role : UserRole
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      id: UserId;
      userImage? : string ,
      role? : UserRole
    } & DefaultSession['user'];
  }
}
