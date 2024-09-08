import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const currentUrl = new URL(request.url);

  // Allow access to the /signin page and any static or API routes without requiring authentication
  if (
    currentUrl.pathname === "/signin" ||
    currentUrl.pathname.startsWith("/_next") ||
    currentUrl.pathname.startsWith("/api")
  ) {
    return NextResponse.next();
  }

  // Access the session token from cookies
  const sessionToken =
    request.cookies.get("next-auth.session-token")?.value ||
    request.cookies.get("__Secure-next-auth.session-token")?.value;

  // If no session token is found, redirect to /signin
  if (!sessionToken) {
    return NextResponse.redirect(new URL("/signin", currentUrl.origin));
  }

  // Allow the request if the user is authenticated
  return NextResponse.next();
}

export default middleware;
