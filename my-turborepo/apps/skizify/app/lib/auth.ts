import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from 'bcrypt';
import { NextAuthOptions, Session } from "next-auth";
import { JWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }
    ) ,
   
        
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text", placeholder: "1231231231", required: true },
        password: { label: "Password", type: "password", required: true },
        name: { label: "Name", type: "text" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Missing email or password");
        }
        const hashedPassword = await bcrypt.hash(credentials.password, 10);
        const existingUser = await db.user.findFirst({
          where: { email: credentials.email },
        });

        if (existingUser) {
          const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
          if (passwordValidation) {
            return {
              id: existingUser.id.toString(),
              name: existingUser.name,
              email: existingUser.email,
            };
          } return null;
        }

        try {
          const hashedPassword = await bcrypt.hash(credentials.password, 10);
          const user = await db.user.create({
            data: {
              email: credentials.email,
              password: hashedPassword,
              name: credentials.name || null,
            },
          });
          return {
            id: user.id.toString(),
            name: user.name,
            email: user.email,
          };
        } catch (e) {
          console.error("Error creating user:", e);
          throw new Error("Unable to create user");
        }
      },
    }),
  ],
  secret: process.env.JWT_SECRET || "secret",
  callbacks: {
    async session({ token, session }: { token: any, session: any }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.userImage = token.userImage;
      }
      return session;
    },
    async jwt({ token }) {
      const dbUser= await db.user.findFirst({
        where : {
          email : token.email || "",
        },
      })

      if(!dbUser){
        return token
      }

      return {
        id : dbUser.id ,
        name : dbUser.name,
        email : dbUser.email,
        userImage : dbUser.userImage || "",
        role : dbUser.role
      };
    }

  },
  pages: {
    signIn: '/signin',
  },
};
