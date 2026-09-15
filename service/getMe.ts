"use server"



import { isAccessTokenExist } from "@/validation/sesstion";




// 1. Get Logged-in User Profile
export const getMe = async () => {
     try {
          const accessToken = await isAccessTokenExist();


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
                    revalidate: 60 * 60 * 24,
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







