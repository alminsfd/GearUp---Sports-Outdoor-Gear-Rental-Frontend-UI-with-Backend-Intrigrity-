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
     provider?: {
          id: string;
          name: string;
          email: string;
          phone: string;
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
     status: 'PLACED' | 'CONFIRMED' | 'PAID' | 'PICKED' | 'RETURNED' | 'CANCELLED';
     createdAt: string;
     updatedAt: string;
     customerId: string;
     gearItemId: string;
     gearItem: GearItem;
     payment: Payment | null;
     customer?: {
          id: string;
          name: string;
          email: string;
          phone: string;
     };
}