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