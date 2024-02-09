import { authConfig } from "./auth.config"
import NextAuth from "next-auth";
import credentials from "next-auth/providers/credentials";
import { formSchema } from "./schemas/schemas";
import bcrypt from "bcrypt"
import { sql } from "@vercel/postgres";
import type { User } from "@/lib/definitions";

export async function getUser(email: string): Promise<User | undefined> {
  try {
    const data = await sql<User>`
        SELECT * FROM users
        WHERE email=${email};
        `;
    const user = data.rows[0];

    console.log("Fetched user with email:", email);
    return user;
  } catch (error) {
    console.log("Database error", error);
    throw new Error("Failed to fetch user");
  }
}

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