
export interface RentalData {
     id: string
     status: "PLACED" | "CONFIRMED" | "PAID" | "PICKED_UP" | "RETURNED" | "CANCELLED"
     createdAt: string
}



export interface CheckRentalStatusApiResponse {
     success: boolean
     statusCode: number
     message: string
     data: {
          rentalData: RentalData
     }
}


// Types Interface Definition

export type GearItem = {
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
};

export type PaymentStatus = "PENDING" | "PAID" | "COMPLETED" | "FAILED" |
     "REFUNDED";

export type Payment = {
     id: string;
     transactionId: string;
     amount: number;
     paymentMethod: "SSLCOMMERZ" | string;
     status: PaymentStatus;
     paidAt?: string;
     createdAt: string;
     updatedAt: string;
     rentalOrderId: string;
};

export type OrderStatus = "PLACED" | "CONFIRMED" | "PAID" | "PICKED_UP" | "RETURNED" | "CANCELLED" | string;

export type RentalOrder = {
     id: string;
     startDate: string;
     endDate: string;
     totalDays: number;
     totalAmount: number;
     status: OrderStatus;
     createdAt: string;
     updatedAt: string;
     customerId: string;
     gearItemId: string;
     gearItem?: GearItem;
     payment?: Payment;
};

export interface CustomerStats {
     totalRentals: number;
     activeRentals: number;
     totalSpent: number;
}

export interface CustomerOverviewClientProps {
     user: {
          data?: {
               profile?: {
                    name?: string;
               };
          };
     };
     stats: CustomerStats;
     orders: RentalOrder[];
     payments: Payment[];
}

export interface GearItemReview {
     gearItemId: string;
     rating: number;
     comment: string;
}