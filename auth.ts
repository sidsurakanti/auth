import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "@/auth.config";

import bcrypt from "bcrypt";
import { formSchema } from "@/schemas/schemas";

import { getUser } from "@/lib/data";

// spread out authConfig and add providers
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      // handle the credentials recieved from user
      async authorize(credentials) {
        const parsedCredentials = formSchema.safeParse(credentials);

        if (parsedCredentials.success) {
          // get user from db w/ parsed data
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;

          // compare passwords and return user session
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
        }

        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
});
