import { getToken } from "next-auth/jwt"; // Ensure this is the correct import
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

  // Use the correct request object for getToken
  const token = await getToken({
    req: request as any, // Cast to any if necessary to bypass type issues
    secret,
  });

  // If there is no token (user is not authenticated)
  if (!token) {
    return NextResponse.redirect(new URL("/signin", currentUrl.origin));
  }

  // Check if the user has the required `isSkizzer` attribute
  const isSkizzer = token?.isSksizzer;
  console.log("isSkizzer:", isSkizzer);

  // Allow the request to continue if the user is authenticated and is a Skizzer
  return NextResponse.next();
}

export const config = {
  matcher: ["/profile", "/postgig", "/protected/:path*"], // Apply to all routes you want to protect
};
