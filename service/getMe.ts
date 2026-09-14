"use server"

import { IUPdateUser } from "@/types/user";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";


// 1. Get Logged-in User Profile
export const getMe = async () => {
     try {
          const cookieStore = await cookies();
          const accessToken = cookieStore.get("accessToken")?.value || null;

          if (!accessToken) {
               return {
                    success: false,
                    message: "User not logged in!",
               };
          }

          const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/me`, {
               method: "GET",
               headers: {
                    Authorization: `Bearer ${accessToken}`,
                    Cookie: `accessToken=${accessToken}`,
               },
               cache: "force-cache",
               next: {
                    revalidate: 60,
                    tags: ["my-profile"],
               },
          });

          const result = await res.json();
          return result;
     } catch (error: unknown) {
          console.error("Error fetching user profile:", error);
          return {
               success: false,
               message: error instanceof Error ? error.message : "Failed to fetch user profile",
          };
     }
};

// 2. Update User Profile
export const updateMe = async (payload: IUPdateUser) => {
     try {
          const cookieStore = await cookies();
          const accessToken = cookieStore.get("accessToken")?.value || null;

          if (!accessToken) {
               return {
                    success: false,
                    message: "User not logged in!",
               };
          }

          const res = await fetch(`${process.env.BACKEND_API_URL}/api/users/my-profile`, {
               method: "PUT",
               headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                    Cookie: `accessToken=${accessToken}`,
               },
               body: JSON.stringify(payload),
               cache: "no-store",
          });

          const result = await res.json();

          if (result?.success) {
               revalidateTag("my-profile", { expire: 0 });
          }

          return result;
     } catch (error: unknown) {
          console.error("Error updating profile:", error);
          return {
               success: false,
               message: error instanceof Error ? error.message : "Failed to update profile",
          };
     }
};