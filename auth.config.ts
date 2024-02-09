import type { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

export const authConfig = {
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    // this is run everytime middleware is run
    // checks if user is authorized to acces path
    authorized({ request, auth }) {
      const url = request.nextUrl;
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = url.pathname.startsWith("/dashboard");

      if (isOnDashboard) {
        // continue to dashboard if user is logged in
        if (isLoggedIn) return true;
        return false; // redirect user to login page
      } else if (isLoggedIn) {
        console.log("Logged in! Redirecting to dashboard.");
        return NextResponse.redirect(new URL("/dashboard", request.url));
      } else {
        return NextResponse.next();
      }
    },
  },
  providers: [],
} satisfies NextAuthConfig;
