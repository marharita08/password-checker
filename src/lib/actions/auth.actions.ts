"use server";

import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";

import { auth, signIn, signOut } from "@/lib/auth";
import { authService } from "@/lib/services/auth.service";

import { usersService } from "../services/users.service";

export async function loginAction(email: string, password: string) {
  try {
    await signIn("credentials", { email, password, redirect: false });
  } catch (error) {
    if (isRedirectError(error)) throw error;
    if (error instanceof AuthError) {
      return { error: "Invalid email or password" };
    }
    throw error;
  }
  redirect("/");
}

export async function registerAction(email: string, password: string) {
  try {
    await authService.register(email, password);
  } catch {
    return { error: "Registration failed" };
  }

  await signIn("credentials", { email, password, redirect: false });
  redirect("/");
}

export async function logoutAction() {
  await signOut({ redirectTo: "/" });
}

export async function deleteAccountAction() {
  const session = await auth();
  if (!session?.user?.id) return { error: "Not authenticated" };

  try {
    await usersService.delete(session.user.id);
  } catch {
    return { error: "Failed to delete account" };
  }

  await signOut({ redirectTo: "/" });
}
