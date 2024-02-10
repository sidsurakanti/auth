"use server";

import { sql } from "@vercel/postgres";
import { signIn, signOut } from "@/auth";
import { formSchema } from "@/schemas/schemas";
import { AuthError } from "next-auth";
import { z } from "zod";
import bcrypt from "bcrypt";
import { User } from "./definitions";
import { redirect } from "next/navigation";

export async function createUser(user: User) {
  // encrypt password and destructure data
  const { name, email, password } = {
    ...user,
    password: await bcrypt.hash(user.password, 10),
  };

  try {
    // * duplicate users are not allowed by db columns bc of unique email contrainsts
    const res = await sql`
      INSERT INTO users (name, email, password) 
      VALUES (${name}, ${email}, ${password})
    `;
    console.log("Created new user", res);
    redirect("/auth/login");
  } catch (error) {
    if ((error as any).code === "23505") {
      console.log("Error: user with that email already exists");
      return "User with that email already exists";
    }
    console.log("Database error", error);
    throw new Error("Database error");
  }
}

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
