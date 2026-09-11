'use server'

import { jwtUtils } from "@/lib/auth/jwt";
import { getNewAccessToken } from "@/service/refreshToken";
import { cookies } from "next/headers";

export type AuthUserResult = {
     isAuthenticated: boolean;
     message: string;
     status: "authenticated" | "unauthenticated" | "token_refreshed";
};

export async function Validation(): Promise<AuthUserResult> {
     const cookieStore = await cookies();

     let accessToken: string | undefined = cookieStore.get("accessToken")?.value;
     const refreshToken: string | undefined = cookieStore.get("refreshToken")?.value;

     // 1. Return unauthenticated if no tokens are present
     if (!accessToken && !refreshToken) {
          return {
               isAuthenticated: false,
               message: "You are not logged in. Please log in to continue.",
               status: "unauthenticated",
          };
     }

     // 2. Safely verify access token if it exists
     const decodedAccessToken = accessToken
          ? jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string)
          : null;

     const decodedRefreshToken = refreshToken
          ? jwtUtils.verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET as string)
          : null;

     // 3. Issue new access token if access token is expired but refresh token is valid
     if (!decodedAccessToken?.success && decodedRefreshToken?.success) {
          try {
               const result = await getNewAccessToken();

               if (result?.success) {
                    const newAccessToken: string = result.data.accessToken;

                    cookieStore.set("accessToken", newAccessToken, {
                         httpOnly: true,
                         maxAge: 60 * 60 * 24,
                         sameSite: "lax",
                    });

                    accessToken = newAccessToken;

                    const verified = jwtUtils.verifyToken(
                         newAccessToken,
                         process.env.JWT_ACCESS_SECRET as string
                    );

                    if (verified?.success) {
                         return {
                              isAuthenticated: true,
                              message: "Session successfully refreshed.",
                              status: "token_refreshed",
                         };
                    }
               }
          } catch (error) {
               console.error(error);
               cookieStore.delete("accessToken");
               cookieStore.delete("refreshToken");
          }
     }

     // 4. Return authenticated user data if access token verification succeeded
     if (decodedAccessToken?.success) {
          return {
               isAuthenticated: true,
               message: "User authenticated successfully.",
               status: "authenticated",
          };
     }

     // 5. Fallback for expired or invalid session
     return {
          isAuthenticated: false,
          message: "Your session has expired. Please log in again.",
          status: "unauthenticated",
     };
}