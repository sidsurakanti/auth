"use server";

import { signIn, signOut } from "@/auth";
import { formSchema } from "@/schemas/schemas";
import { AuthError } from "next-auth";
import { z } from "zod";

export async function authenticate(data: z.infer<typeof formSchema>) {
  try {
    // call sign in method using nextjs credentials provider
    const res = await signIn("credentials", data);
    console.log("Sucessfully signed in!");
    console.log(res);
    return res;
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
    console.log(error);
    throw error;
  }
}

export async function logout() {
  await signOut();
}
