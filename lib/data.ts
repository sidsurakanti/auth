import { sql } from "@vercel/postgres";
import type { User } from "@/lib/definitions";

export async function getUser(email: string): Promise<User | undefined> {
    try {
    const data = await sql<User>`
        SELECT * FROM users
        WHERE email=${email};
        `
    const user = data.rows[0];

    console.log("Fetched user with email:", email);
    return user;
  } catch (error) {
    console.log("Database error", error);
    throw new Error("Failed to fetch user");
  }
}