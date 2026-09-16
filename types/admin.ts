export interface GetUsersQuery {
     searchTerm?: string;
     role?: string;
     status?: string;
     page?: number;
     limit?: number;
}

export interface UserResponse {
     success: boolean;
     statusCode?: number;
     message: string;
     data?: IUser[];
     meta?: {
          page: number;
          limit: number;
          total: number;
          totalPage: number;
     };
}

export type UserRole = 'ADMIN' | 'PROVIDER' | 'CUSTOMER';
export type UserStatus = 'ACTIVE' | 'BLOCKED' | 'SUSPENDED';

export interface IUserCount {
     gears: number;
     rentalOrders: number;
}

export interface IUser {
     id: string;
     name: string;
     email: string;
     role: UserRole;
     status: UserStatus;
     profileImage: string;
     createdAt: string;
     updatedAt: string;
     _count: IUserCount;
}

export interface IGetUsersResponse {
     success: boolean;
     statusCode?: number;
     message: string;
     data: IUser[];
     meta?: {
          page: number;
          limit: number;
          total: number;
          totalPage: number;
     };
}

export interface Meta {
     page: number;
     limit: number;
     total: number;
     totalPage: number;
}

export interface ApiResponse<T> {
     success: boolean;
     statusCode: number;
     message: string;
     data: T;
     meta?: Meta;
}

export interface GearItem {
     id: string;
     title: string;
     description: string;
     pricePerDay: number;
     brand: string;
     stock: number;
     isAvailable: boolean;
     images: string[];
     createdAt: string;
     updatedAt: string;
     categoryId: string;
     providerId: string;
     category: {
          id: string;
          name: string;
     };
     provider: {
          id: string;
          name: string;
          email: string;
     };
     _count: {
          rentalOrders: number;
          reviews: number;
     };
}

export interface Payment {
     id: string;
     transactionId: string;
     amount: number;
     paymentMethod: string;
     status: string;
     paidAt: string;
     createdAt: string;
     updatedAt: string;
     rentalOrderId: string;
}

export interface RentalOrder {
     id: string;
     startDate: string;
     endDate: string;
     totalDays: number;
     totalAmount: number;
     status: string;
     createdAt: string;
     updatedAt: string;
     customerId: string;
     gearItemId: string;
     customer: {
          id: string;
          name: string;
          email: string;
     };
     gearItem: {
          id: string;
          title: string;
          pricePerDay: number;
          provider: {
               id: string;
               name: string;
               email: string;
          };
     };
     payment: Payment | null;
}


export interface UpdateUserStatusResponse {
     success: boolean;
     statusCode?: number;
     message: string;
     data?: {
          id: string;
          name: string;
          email: string;
          role: string;
          status: UserStatus;
          updatedAt: string;
     } | null;
}