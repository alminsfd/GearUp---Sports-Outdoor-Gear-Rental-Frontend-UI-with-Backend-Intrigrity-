'use server'

import { isAccessTokenExist } from "@/validation/sesstion";

export async function getAllgears() {
     try {
          const accessToken = await isAccessTokenExist();

          if (!accessToken) {
               return {
                    success: false,
                    statusCode: 401,
                    message: 'You are not authenticated. Please log in first.',
                    data: null,
               };
          }

          const res = await fetch(`${process.env.BACKEND_API_URL}/api/gear`, {
               method: 'GET',
               headers: {
                    'Content-Type': 'application/json',
                    Cookie: `accessToken=${accessToken}`,
               },
               next: {
                    revalidate: 60
               }
          });

          const result = await res.json();

          if (!res.ok || !result.success) {
               return {
                    success: false,
                    statusCode: res.status,
                    message: result.message || 'Failed to fetch rental orders',
                    data: null,
               };
          }

          return { success: true, data: result.data };
     } catch (error: unknown) {
          console.error('Error fetching rental orders:', error);
          return {
               success: false,
               statusCode: 500,
               message: error instanceof Error ? error.message : 'Failed to get rental orders',
               data: null,
          };
     }
}