"use server";

import { GearItemCencel, GearItemReview } from "@/types/order";
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
export async function getRentalOrdersDetails(id: string) {
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

          const res = await fetch(`${process.env.BACKEND_API_URL}/api/rentals/${id}`, {
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

export async function CencelOrder(payload: GearItemCencel, id: string) {

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

          const res = await fetch(`${process.env.BACKEND_API_URL}/api/rentals/${id}/status`, {
               method: 'PATCH',
               headers: {
                    'Content-Type': 'application/json',
                    Cookie: `accessToken=${accessToken}`,
               },
               body: JSON.stringify(payload),
               cache: 'no-store'
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

export async function postReviews(payload: GearItemReview) {
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

          const res = await fetch(`${process.env.BACKEND_API_URL}/api/reviews`, {
               method: 'POST',
               headers: {
                    'Content-Type': 'application/json',
                    Cookie: `accessToken=${accessToken}`,
               },
               body: JSON.stringify(payload),
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

          return result
     } catch (error: unknown) {
          console.error('Error fetching Order history:', error);
          return {
               success: false,
               statusCode: 500,
               message: error instanceof Error ? error.message : 'Failed to get payment history',
               data: null,
          };
     }

}


