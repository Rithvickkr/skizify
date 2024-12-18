import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import bcrypt from "bcrypt";
import { NextAuthOptions, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import { UserRole } from "@repo/store/types";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "example@example.com", required: true },
        password: { label: "Password", type: "password", required: true },
        name: { label: "Name", type: "text", required: false },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Missing email or password");
        }

        // Fetch user from the database
        const existingUser = await db.user.findFirst({ where: { email: credentials.email } });
        console.log("Existing User:", existingUser); // Debugging log

        if (existingUser) {
          // Validate password for existing user
          const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
          console.log("Password Validation:", passwordValidation); // Debugging log
          if (passwordValidation) {
            return {
              id: existingUser.id.toString(),
              name: existingUser.name,
              email: existingUser.email,
            };
          }
          throw new Error("Invalid credentials");
        }

        // Create a new user if none exists
        try {
          const hashedPassword = await bcrypt.hash(credentials.password, 10);
          const newUser = await db.user.create({
            data: {
              email: credentials.email,
              password: hashedPassword,
              name: credentials.name || "Anonymous User", // Default name for new users
            },
          });
          console.log("New User Created:", newUser); // Debugging log
          return {
            id: newUser.id.toString(),
            name: newUser.name,
            email: newUser.email,
          };
        } catch (error) {
          console.error("Error creating user:", error);
          throw new Error("Unable to create user");
        }
      },
    }),
  ],
  secret: process.env.JWT_SECRET || "secret",
  callbacks: {
    async session({ token, session }: { token: JWT; session: any }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.userImage = token.userImage;
        session.user.isSksizzer = token.isSksizzer;
      }
      return session;
    },
    async jwt({ token, account, profile }: { token: JWT; account: any; profile?: any }) {
      if (account && profile) {
        const email = profile.email || ""; // Ensure email is defined
        const userImage = profile.picture || profile.avatar_url || ""; // Google (picture) or GitHub (avatar_url)

        let user = await db.user.findFirst({ where: { email } });

        if (!user) {
          user = await db.user.create({
            data: {
              email,
              name: profile.name || profile.login || "Anonymous User",
              userImage,
              password: "", // No password for OAuth users
            },
          });
        }

        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.userImage = user.userImage || "";
        token.role = user.role as UserRole;
        token.isSksizzer = user.skizzer || false;
      } else if (token.email) {
        const dbUser = await db.user.findFirst({ where: { email: token.email } });

        if (dbUser) {
          token.id = dbUser.id;
          token.name = dbUser.name;
          token.email = dbUser.email;
          token.userImage = dbUser.userImage || "";
          token.role = dbUser.role as UserRole;
          token.isSksizzer = dbUser.skizzer || false;
        }
      }

      return token;
    },
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  pages: {
    signIn: "/signin",
  },
};
