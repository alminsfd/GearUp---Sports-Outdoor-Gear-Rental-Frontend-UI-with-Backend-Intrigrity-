import { IGear } from "./gear"

export interface PaymentButtonProps {
     rentalOrderId: string
     totalAmount?: number
     shippingAddress: {
          fullName: string
          phoneNumber: string
          streetAddress: string
          city: string
          area: string
     }
     paymentMethod: 'SSLCOMMERZ'
     orderNote?: string
}

export interface PaymentPayload {
     rentalOrderId: string
}

export interface IPayment {
     id: string;
     startDate: string;
     endDate: string;
     totalDays: number;
     totalAmount: number;
     status: "PAID" | "PLACED" | "CANCELLED" | "COMPLETED";
     createdAt: string;
     updatedAt: string;
     customerId: string;
     gearItemId: string;
     gearItem: IGear;
}