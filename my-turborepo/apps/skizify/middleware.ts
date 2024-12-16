import { getToken } from "next-auth/jwt"; // Use `getToken` for Edge Runtime compatibility
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const currentUrl = new URL(request.url);

  // Allow access to the /signin page and static routes
  if (
    currentUrl.pathname === "/signin" ||
    currentUrl.pathname.startsWith("/_next") ||
    currentUrl.pathname.startsWith("/api")
  ) {
    return NextResponse.next();
  }

  // Get the session token using `getToken`
  const secret = process.env.NEXTAUTH_SECRET; // Ensure this is set in your environment variables
  if (!secret) {
    console.error("NEXTAUTH_SECRET is not set in environment variables.");
    return NextResponse.redirect(new URL("/signin", currentUrl.origin));
  }

  // Adjust `getToken` to use NextRequest-compatible structure
  const token = await getToken({
    req: {
      cookies: request.cookies ,
      headers: Object.fromEntries(request.headers),
    },
    secret,
    
  });

  console.log("Token:", token);

  // If there is no token (user is not authenticated)
  if (!token) {
    return NextResponse.redirect(new URL("/signin", currentUrl.origin));
  }

  // Check if the user has the required `isSkizzer` attribute
  const isSkizzer = token?.isSksizzer;
  console.log("isSkizzer:", isSkizzer);

  // If the user is not a Skizzer, redirect them to the "Create Profile" page
  if (!isSkizzer) {
    return NextResponse.redirect(new URL("/createprofile", currentUrl.origin));
  }

  // Allow the request to continue if the user is authenticated and is a Skizzer
  return NextResponse.next();
}

export const config = {
  matcher: ["/profile", "/postgig", "/protected/:path*"], // Apply to all routes you want to protect
};
