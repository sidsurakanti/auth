"use server";

import { signIn, signOut } from "@/auth";
import { formSchema } from "@/schemas/schemas";
import { AuthError } from "next-auth";
import { z } from "zod";

export async function authenticate(data: z.infer<typeof formSchema>) {
  try {
    // signIn using nextjs credentials provider w/ formData from form
    await signIn("credentials", data);
    console.log("Sucessfully signed in!");
  } catch (error) {
    // handle signIn errors
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
  await signOut();
}
