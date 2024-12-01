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
  const token = await getToken({ req: request, secret });

  // If there is no token (user is not authenticated)
  if (!token) {
    return NextResponse.redirect(new URL("/signin", currentUrl.origin));
  }

  // Check if the user has the required role ("Skizzer")
  const isSkizzer = token.isSkizzer || false;

  if (!isSkizzer) {
    // Add a custom header to notify the frontend
    const response = NextResponse.next();
    response.headers.set("X-Is-Skizzer", "false");
    return response;
  }

  // Allow the request to continue if user is authenticated and is a Skizzer
  return NextResponse.next();
}

export const config = {
  matcher: ["/protected/:path*"], // Apply middleware to protected routes
};
