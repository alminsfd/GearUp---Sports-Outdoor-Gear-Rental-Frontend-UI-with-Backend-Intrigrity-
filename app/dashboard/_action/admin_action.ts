'use server'

import { ApiResponse, GearItem, GetUsersQuery, IGetUsersResponse, IUser, RentalOrder, UpdateUserStatusResponse, UserStatus } from "@/types/admin";
import { isAccessTokenExist } from "@/validation/sesstion";
import { revalidateTag } from "next/cache";



export async function getALLUsers(queryFilters?: GetUsersQuery): Promise<{
     success: boolean;
     statusCode?: number;
     message: string;
     data: IUser[];
     meta: {
          page: number,
          limit: number,
          total: number,
          totalPage: number
     }
}> {

     try {
          const accessToken = await isAccessTokenExist();

          if (!accessToken) {
               return {
                    success: false,
                    statusCode: 401,
                    message: 'You are not authenticated. Please log in first.',
                    data: [],
                    meta: {
                         page: 1,
                         limit: 10,
                         total: 0,
                         totalPage: 0

                    }
               };
          }


          const params = new URLSearchParams();

          if (queryFilters?.searchTerm) {
               params.append('searchTerm', queryFilters.searchTerm);
          }
          if (queryFilters?.role) {
               params.append('role', queryFilters.role);
          }
          if (queryFilters?.status) {
               params.append('status', queryFilters.status);
          }
          if (queryFilters?.page) {
               params.append('page', queryFilters.page.toString());
          }
          if (queryFilters?.limit) {
               params.append('limit', queryFilters.limit.toString());
          }

          const queryString = params.toString();
          const endpoint = `${process.env.BACKEND_API_URL}/api/admin/users${queryString ? `?${queryString}` : ''}`;

          const res = await fetch(endpoint, {
               method: 'GET',
               headers: {
                    'Content-Type': 'application/json',
                    Cookie: `accessToken=${accessToken}`,
               },
               cache: 'no-store',
          });

          const result: IGetUsersResponse = await res.json();

          return {
               success: result.success,
               statusCode: res.status,
               message: result.message,
               data: result.data || [],
               meta: {
                    page: 1,
                    limit: 10,
                    total: 0,
                    totalPage: 0,

               }
          };
     } catch (error: unknown) {
          console.error('Error fetching admin users:', error);
          return {
               success: false,
               statusCode: 500,
               message: error instanceof Error ? error.message : 'Internal server error',
               data: [],
               meta: {
                    page: 1,
                    limit: 10,
                    total: 0,
                    totalPage: 0

               }
          };
     }
}


export async function getAllAdminGears(queryParams?: { page?: number; limit?: number }) {
     try {
          const accessToken = await isAccessTokenExist();

          if (!accessToken) {
               return {
                    success: false,
                    statusCode: 401,
                    message: 'You are not authenticated. Please log in first.',
                    data: [],
               };
          }

          const searchParams = new URLSearchParams();

          if (queryParams?.page) searchParams.append('page', queryParams.page.toString());
          if (queryParams?.limit) searchParams.append('limit', queryParams.limit.toString());

          const queryString = searchParams.toString();
          const endpoint = `${process.env.BACKEND_API_URL}/admin/gear${queryString ? `?${queryString}` : ''}`;

          const res = await fetch(endpoint, {
               method: 'GET',
               headers: {
                    'Content-Type': 'application/json',
                    Cookie: `accessToken=${accessToken}`,
               },
               next: { revalidate: 60, tags: ['admin-gears'] },
          });

          const result: ApiResponse<GearItem[]> = await res.json();

          if (!res.ok) {
               return {
                    success: false,
                    message: result.message || 'Failed to fetch gear listings',
                    data: [],
               };
          }

          return result;
     } catch (error) {
          console.error('Error in getAllAdminGears:', error);
          return {
               success: false,
               message: 'Something went wrong while fetching gear listings.',
               data: [],
               meta: undefined
          };
     }
}

export async function getAllAdminRentals(queryParams?: { page?: number; limit?: number }) {
     try {

          const accessToken = await isAccessTokenExist();

          if (!accessToken) {
               return {
                    success: false,
                    statusCode: 401,
                    message: 'You are not authenticated. Please log in first.',
                    data: [],
                    meta: undefined
               };
          }

          const searchParams = new URLSearchParams();

          if (queryParams?.page) searchParams.append('page', queryParams.page.toString());
          if (queryParams?.limit) searchParams.append('limit', queryParams.limit.toString());

          const queryString = searchParams.toString();
          const endpoint = `${process.env.BACKEND_API_URL}/admin/rentals${queryString ? `?${queryString}` : ''}`;

          const res = await fetch(endpoint, {
               method: 'GET',
               headers: {
                    'Content-Type': 'application/json',
                    Cookie: `accessToken=${accessToken}`,
               },
               next: { revalidate: 60, tags: ['admin-rentals'] },
          });

          const result: ApiResponse<RentalOrder[]> = await res.json();

          if (!res.ok) {
               return {
                    success: false,
                    message: result.message || 'Failed to fetch rental orders',
                    data: [],
                    meta: undefined
               };
          }

          return result;
     } catch (error) {
          console.error('Error in getAllAdminRentals:', error);
          return {
               success: false,
               message: 'Something went wrong while fetching rental orders.',
               data: [],
               meta: undefined
          };
     }
}



// User Status Type Definition



export async function updateUserStatus(
     userId: string,
     status: UserStatus
): Promise<UpdateUserStatusResponse> {
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

          const endpoint = `${process.env.BACKEND_API_URL}/api/admin/users/${userId}`;

          const res = await fetch(endpoint, {
               method: 'PATCH',
               headers: {
                    'Content-Type': 'application/json',
                    Cookie: `accessToken=${accessToken}`,
               },
               body: JSON.stringify({ status }),
          });

          const result: UpdateUserStatusResponse = await res.json();

          if (!res.ok) {
               return {
                    success: false,
                    statusCode: res.status,
                    message: result.message || 'Failed to update user status.',
                    data: null,
               };
          }


          revalidateTag('admin-users', { expire: 0 });

          return {
               success: result.success,
               statusCode: result.statusCode || res.status,
               message: result.message,
               data: result.data,
          };
     } catch (error: unknown) {
          console.error('Error updating user status:', error);
          return {
               success: false,
               statusCode: 500,
               message: error instanceof Error ? error.message : 'Internal server error',
               data: null,
          };
     }
}