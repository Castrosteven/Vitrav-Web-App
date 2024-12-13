import { NextResponse } from "next/server";
import { verifyToken } from "./lib/auth"; // Utility for token verification
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Extract token from cookies
  console.log("Hello from middleware");
  const token = request.cookies.get("access_token");
  // If the token is missing or invalid, redirect to login page
  if (!token || !verifyToken(token.value)) {
    console.log(token);
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/profile", "/settings"], // Protect these routes
};
