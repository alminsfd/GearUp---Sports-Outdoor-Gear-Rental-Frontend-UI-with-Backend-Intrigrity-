"use server";

// স্পেলিং চেক করুন: validation/session (বা আপনার ফোল্ডার স্ট্রাকচার অনুযায়ী)
import { isAccessTokenExist } from "@/validation/sesstion";

export async function getRentalOrders() {
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

          const res = await fetch(`${process.env.BACKEND_API_URL}/api/rentals`, {
               method: 'GET',
               headers: {
                    'Content-Type': 'application/json',
                    Cookie: `accessToken=${accessToken}`,
               },
               cache: "no-store",
          });

          const result = await res.json();

          // throw new Error না দিয়ে সরাসরি Safe Return করুন
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

export async function getPaymentHistory() {
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

          const res = await fetch(`${process.env.BACKEND_API_URL}/api/payments`, {
               method: 'GET',
               headers: {
                    'Content-Type': 'application/json',
                    Cookie: `accessToken=${accessToken}`,
               },
               cache: "no-store",
          });

          const result = await res.json();

          if (!res.ok || !result.success) {
               return {
                    success: false,
                    statusCode: res.status,
                    message: result.message || 'Failed to get payment history',
                    data: null,
               };
          }

          return { success: true, data: result.data };
     } catch (error: unknown) {
          console.error('Error fetching payment history:', error);
          return {
               success: false,
               statusCode: 500,
               message: error instanceof Error ? error.message : 'Failed to get payment history',
               data: null,
          };
     }
}