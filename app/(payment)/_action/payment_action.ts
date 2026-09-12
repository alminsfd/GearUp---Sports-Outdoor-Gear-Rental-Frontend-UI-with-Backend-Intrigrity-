'use server'

import { PaymentButtonProps, PaymentPayload } from "@/types/payment"
import { isAccessTokenExist } from "@/validation/sesstion"

export interface ICreateRentalPayload {
     gearItemId: string
     startDate: string
     endDate: string
}

export async function createRentalOrderAction(payload: ICreateRentalPayload) {
     try {


          const accessToken = await isAccessTokenExist()

          const res = await fetch(`${process.env.BACKEND_API_URL}/api/rentals`, {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
                    Cookie: `accessToken=${accessToken}`,
               },
               body: JSON.stringify(payload),
               cache: "no-store",
          })

          return await res.json()



     } catch (error) {
          console.error("Error creating rental order via API:", error)
          return {
               success: false,
               statusCode: 500,
               message: (error as Error)?.message || "Failed to communicate with the rental service.",
               data: null,
          }
     }
}
export async function CheckoutAction(payload: PaymentButtonProps) {
     try {


          const accessToken = await isAccessTokenExist()

          const res = await fetch(`${process.env.BACKEND_API_URL}/api/checkout`, {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
                    Cookie: `accessToken=${accessToken}`,
               },
               body: JSON.stringify(payload),
               cache: "no-store",
          })

          return await res.json()



     } catch (error) {
          console.error("Error creating rental order via API:", error)
          return {
               success: false,
               statusCode: 500,
               message: (error as Error)?.message || "Failed to communicate with the rental service.",
               data: null,
          }
     }
}


export async function initiatePaymentAction(payload: PaymentPayload) {
     try {

          const accessToken = await isAccessTokenExist()


          if (!accessToken) {
               return {
                    success: false,
                    statusCode: 401,
                    message: 'You are not authenticated. Please log in first.',
                    data: null,
               }
          }

          const res = await fetch(`${process.env.BACKEND_API_URL}/api/payments/create`, {
               method: 'POST',
               headers: {
                    'Content-Type': 'application/json',
                    Cookie: `accessToken=${accessToken}`
               },
               body: JSON.stringify(payload),
               cache: 'no-store',
          })

          return await res.json()

     } catch (error: unknown) {
          console.error('Error initiating SSLCommerz payment:', error)
          return {
               success: false,
               statusCode: 500,
               message: error instanceof Error ? error.message : 'Failed to communicate with payment gateway.',
               data: null,
          }
     }
}