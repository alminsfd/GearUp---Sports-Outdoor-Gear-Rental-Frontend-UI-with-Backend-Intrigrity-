"use server";

import { jwtUtils } from "@/lib/auth/jwt";
import { cookies } from "next/headers";

export const getNewAccessToken = async () => {
     try {
          const cookieStore = await cookies();
          const refreshToken = cookieStore.get("refreshToken")?.value;

          if (!refreshToken) {
               return {
                    success: false,
                    message: "Refresh token not found!",
               };
          }

          const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/refresh-token`, {
               method: "POST",
               headers: {
                    Cookie: `refreshToken=${refreshToken}`,
               },
               cache: "no-store",
          });

          if (!res.ok) {
               return {
                    success: false,
                    message: "Failed to refresh token from server",
               };
          }

          const result = await res.json();
          return result;
     } catch (error) {
          return {
               success: false,
               message: "Something went wrong while refreshing token!",
          };
     }
};

export const isAccessTokenExist = async () => {
     const cookieStore = await cookies();
     let accessToken = cookieStore.get("accessToken")?.value || null;
     const refreshToken = cookieStore.get("refreshToken")?.value || null;


     if (!accessToken && !refreshToken) {
          return null;
     }

     const decodedAccessToken = accessToken
          ? jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string)
          : null;

     if (decodedAccessToken?.success) {
          return accessToken;
     }

     const decodedRefreshToken = refreshToken
          ? jwtUtils.verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET as string)
          : null;

     if (decodedRefreshToken?.success) {
          const result = await getNewAccessToken();

          if (result.success && result.data?.accessToken) {
               const newAccessToken = result.data.accessToken;

               try {
                    cookieStore.set("accessToken", newAccessToken, {
                         httpOnly: true,
                         maxAge: 60 * 60 * 24, // 1 day
                         sameSite: "lax",
                         path: "/",
                    });
               } catch (error) {
                    console.error("Failed to set cookie in Server Component context:", error);
               }

               accessToken = newAccessToken;
          } else {
               return null;
          }
     } else {
          return null;
     }

     return accessToken;
};