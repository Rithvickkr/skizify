import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import bcrypt from "bcrypt";
import { NextAuthOptions, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import { UserRole } from "@repo/store/types";

// To test the connection
// db.$connect()
//   .then(() => console.log('Database connected successfully'))
//   .catch((e) => console.error('Database connection error:', e));

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
        email: {
          label: "Email",
          type: "text",
          placeholder: "1231231231",
          required: true,
        },
        password: { label: "Password", type: "password", required: true },
        name: { label: "Name", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Missing email or password");
        }
        const existingUser = await db.user.findFirst({
          where: { email: credentials.email },
        });

        if (existingUser) {
          const passwordValidation = await bcrypt.compare(
            credentials.password,
            existingUser.password,
          );
          if (passwordValidation) {
            return {
              id: existingUser.id.toString(),
              name: existingUser.name,
              email: existingUser.email,
            };
          }
          return null;
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
    async session({ token, session }: { token: JWT; session: any }) {
      console.log("toke"+token.isSksizzer);
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.userImage = token.userImage;
        session.user.isSksizzer = token.isSksizzer;
      }
      return session;
    },
    async jwt({ token , account , profile  } : { token: JWT; account: any; profile?: any }) {
    // Handle sign-in via OAuth (Google, GitHub)
    if (account && profile) {

      const email = profile.email || ""; // Fallback for missing email
      const userImage = profile.picture || profile.avatar_url || ""; // Google (picture) or GitHub (avatar_url)

      let user = await db.user.findFirst({
        where: { email },
      });

      if (!user) {
        // Create a new user if it doesn't exist
        user = await db.user.create({
          data: {
            email,
            name: profile.name || profile.login || "Anonymous User",
            userImage,
            password: "", // Set a default or empty password for OAuth users
          },
        });
      }

      // Attach user details to the token
      token.id = user.id;
      token.name = user.name;
      token.email = user.email;
      token.userImage = user.userImage || "";
      token.role = user.role as UserRole;
      token.isSksizzer = user.skizzer;
    }

    // Handle normal (credentials-based) sign-in
    else if (token.email) {
      const dbUser = await db.user.findFirst({
        where: { email: token.email },
      });

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
  }
  
},
cookies: {
  sessionToken: {
    name: `next-auth.session-token`,
    options: {
      httpOnly: true, // Make sure it's httpOnly to prevent XSS
      sameSite: "lax", // Adjust based on your needs
      path: "/",
      secure: process.env.NODE_ENV === "production", // true in production
    }
  }},

pages: {
  signIn: "/signin",
},
};
