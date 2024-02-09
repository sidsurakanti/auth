import { authConfig } from "./auth.config";
import NextAuth from "next-auth";

// initialize auth.js and export the auth property
export default NextAuth(authConfig).auth;

// paths for pages that require authentication
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
