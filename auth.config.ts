import type { NextAuthConfig } from "next-auth";

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
        if (isLoggedIn) return true;
        return false; // redirect user to login page
      } else if (isLoggedIn) {
        // if logged in but not on dashboard page, take them to dashboard
        return Response.redirect(new URL("/dashboard", url.origin));
      }
    },
  },
  providers: [],
} satisfies NextAuthConfig;
