import { authConfig } from "./auth.config"
import NextAuth from "next-auth";
import credentials from "next-auth/providers/credentials";
import { formSchema } from "./schemas/schemas";
import bcrypt from "bcrypt"
import { getUser } from "@/lib/data"
import { NextResponse } from "next/server";


// spread out authConfig and add providers
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    credentials({
      async authorize(credentials){
        const parsedCredentials = formSchema.safeParse(credentials)

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password)

          if (passwordsMatch) return user;
        }

        console.log("Invalid credentials")
        return null
      }
    })
  ],
})