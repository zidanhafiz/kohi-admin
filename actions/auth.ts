"use server";
import { auth, signIn, signOut } from "@/auth";
import { LoginSchema } from "@/lib/schema/authSchema";
import adminModels from "@/models/admin";
import { AuthError } from "next-auth";

export async function authenticate(data: LoginSchema) {
  try {
    await signIn("credentials", { redirectTo: `/${data.role.toLowerCase()}`, ...data});
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            success: false,
            message: "Invalid username or password",
          };
        default:
          return {
            success: false,
            message: "Error occurred",
          };
      }
    }
    throw error;
  }
}

export async function logout() {
  try {
    const user = await auth();

    const username = user?.user.username;

    if (!username) return;

    await adminModels.updateIsActiveByUsername(username, false);

    await signOut({ redirectTo: "/"});
  } catch (error) {
    throw error; 
  }
}
