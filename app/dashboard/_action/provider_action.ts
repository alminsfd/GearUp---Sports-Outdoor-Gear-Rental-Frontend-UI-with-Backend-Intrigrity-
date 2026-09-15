'use server'

import { IBike, IsAvailable } from "@/types/gear";
import { OrderStatusChange } from "@/types/order";
import { isAccessTokenExist } from "@/validation/sesstion";

export async function Updatedgears(id: string, payload: IBike) {
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

          const res = await fetch(`${process.env.BACKEND_API_URL}/api/gear/provider/${id}`, {
               method: 'PUT',
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
export async function Deletegears(id: string) {
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

          const res = await fetch(`${process.env.BACKEND_API_URL}/api/gear/provider/${id}`, {
               method: 'DELETE',
               headers: {
                    'Content-Type': 'application/json',
                    Cookie: `accessToken=${accessToken}`,
               },
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
export async function UpdateRentalsStatus(payload: OrderStatusChange, id: string) {
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
               cache: 'no-store',
               body: JSON.stringify(payload)
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
export async function UpdateGearStatus(payload: IsAvailable, id: string) {
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

          const res = await fetch(`${process.env.BACKEND_API_URL}/api/gear/provider/availability/${id}`, {
               method: 'PATCH',
               headers: {
                    'Content-Type': 'application/json',
                    Cookie: `accessToken=${accessToken}`,
               },
               cache: 'no-store',
               body: JSON.stringify(payload)
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

