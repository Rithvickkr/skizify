import { getSession } from "next-auth/react";
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

  // Get the session data
  const session = await getSession({ req: { headers: Object.fromEntries(request.headers.entries()) } });

  // If there is no session (user is not authenticated)
  if (!session) {
    return NextResponse.redirect(new URL("/signin", currentUrl.origin));
  }

  // Check if user is a "Skizzer" (assuming you have this property in session)
  const isSkizzer = session.user.isSksizzer || false;

  // If the user is authenticated but not a Skizzer, pop the modal
  if (!isSkizzer) {
    // You can handle the "modal" logic in the frontend instead of redirecting the user
    // For now, we'll just add a custom header to tell the frontend that they are not a Skizzer
    const response = NextResponse.next();
    response.headers.set("X-Is-Skizzer", "false");
    return response;
  }

  // Allow the request to continue if user is authenticated and is a Skizzer
  return NextResponse.next();
}

export default middleware;
