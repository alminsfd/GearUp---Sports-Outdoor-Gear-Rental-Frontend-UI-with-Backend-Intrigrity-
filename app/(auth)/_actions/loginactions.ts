"use server";

import { jwtUtils } from "@/lib/auth/jwt";
import { cookies } from "next/headers";

export type LoginState = {
     success: boolean;
     statusCode?: number;
     message: string;
     redirectTo?: string;
} | null;

export const loginAction = async (prevState: LoginState, formData: FormData): Promise<LoginState> => {
     const email = formData.get("email");
     const password = formData.get("password");

     let userRole: string | null = null;

     try {
          const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
               method: "POST",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify({ email, password }),
          });

          const result = await res.json();

          if (result.success) {
               const cookieStore = await cookies();

               cookieStore.set("accessToken", result.data.accessToken, {
                    httpOnly: true,
                    maxAge: 60 * 60 * 24,
                    sameSite: "lax",
               });

               cookieStore.set("refreshToken", result.data.refreshToken, {
                    httpOnly: true,
                    maxAge: 60 * 60 * 24 * 7,
                    sameSite: "lax",
               });

               const decoded = jwtUtils.verifyToken(
                    result.data.accessToken,
                    process.env.JWT_ACCESS_SECRET as string
               );

               if (decoded?.success && decoded.data) {
                    userRole = (decoded.data as { role: string }).role;
               }


               let targetPath = "/";
               if (userRole === "ADMIN") targetPath = "/dashboard/admin";
               else if (userRole === "PROVIDER") targetPath = "/dashboard/provider";
               else if (userRole === "CUSTOMER") targetPath = "/dashboard/customer";

               return {
                    success: true,
                    message: result.message || "Login successful!",
                    redirectTo: targetPath,
               };
          } else {
               return result;
          }
     } catch (error: unknown) {
          console.log("login action error because", error);
          return { success: false, message: "Something went wrong!" };
     }
};