"use server";

import { signIn, signOut } from "@/auth";
import { formSchema } from "@/schemas/schemas";
import { AuthError } from "next-auth";
import { z } from "zod";

export async function authenticate(data: z.infer<typeof formSchema>) {
  try {
    // call sign in method using nextjs credentials provider
    await signIn("credentials", data);
  } catch (error) {
    // handle auth errors
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials";
        default:
          return "Something went wrong";
      }
    }
    throw error;
  }
}

export async function logout() {
  try {
    // call sign out method
    await signOut({});
  } catch (error) {
    throw error;
  }
}
