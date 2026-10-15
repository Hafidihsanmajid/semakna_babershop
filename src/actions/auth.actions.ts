"use server";

import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { signToken, setSessionCookie, deleteSessionCookie } from "@/lib/auth";
import { redirect } from "next/navigation";

export interface AuthActionResult {
  success: boolean;
  error?: string;
}

export async function loginAction(
  prevState: AuthActionResult | null,
  formData: FormData
): Promise<AuthActionResult> {
  const username = formData.get("username")?.toString().trim();
  const password = formData.get("password")?.toString();

  if (!username || !password) {
    return { success: false, error: "Username dan password wajib diisi." };
  }

  const admin = await prisma.admin.findUnique({
    where: { username },
  });

  if (!admin) {
    return { success: false, error: "Username atau password tidak valid." };
  }

  const isPasswordMatch = await bcrypt.compare(password, admin.password);
  if (!isPasswordMatch) {
    return { success: false, error: "Username atau password tidak valid." };
  }

  // Generate JWT token
  const token = await signToken({
    id: admin.id,
    username: admin.username,
    name: admin.name,
  });

  // Set HTTP-Only Cookie
  await setSessionCookie(token);

  return { success: true };
}

export async function logoutAction() {
  await deleteSessionCookie();
  redirect("/login");
}
