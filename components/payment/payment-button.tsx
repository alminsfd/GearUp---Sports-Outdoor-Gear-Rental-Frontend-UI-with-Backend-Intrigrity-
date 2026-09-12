'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Lock, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { PaymentButtonProps } from '@/types/payment'
import { CheckoutAction, initiatePaymentAction } from '@/app/(payment)/_action/payment_action'


export default function PaymentButton({
     rentalOrderId,
     totalAmount,
     shippingAddress,
     paymentMethod,
     orderNote,
}: PaymentButtonProps) {
     const [isLoading, setIsLoading] = useState(false)
     const handlePaymentSubmit = async () => {
          const { phoneNumber, streetAddress, area } = shippingAddress

          if (!phoneNumber || !streetAddress || !area) {
               toast.error('Please fill in your phone number, street address, and area.')
               return
          }

          setIsLoading(true)
          const toastId = toast.loading('Processing your order and initiating payment...')

          try {
               // Step 1: Execute Checkout Action
               const checkoutData = await CheckoutAction({
                    rentalOrderId,
                    totalAmount,
                    shippingAddress,
                    paymentMethod,
                    orderNote,
               })

               if (!checkoutData?.success) {
                    toast.error(checkoutData?.message || 'Failed to process checkout details.', { id: toastId })
                    setIsLoading(false)
                    return
               }

               // Step 2: Initiate Payment Gateway Request
               const paymentResponse = await initiatePaymentAction({
                    rentalOrderId,
               })

               // Step 3: Handle Gateway URL and Redirect
               if (paymentResponse?.success) {
                    const paymentUrl =
                         paymentResponse?.data?.paymentUrl ||
                         paymentResponse?.data?.GatewayPageURL ||
                         paymentResponse?.paymentUrl

                    if (paymentUrl) {
                         toast.success('Redirecting to payment gateway...', { id: toastId })
                         window.location.href = paymentUrl
                    } else {
                         toast.error('Payment URL not found in response.', { id: toastId })
                         setIsLoading(false)
                    }
               } else {
                    toast.error(paymentResponse?.message || 'Failed to initiate payment gateway.', {
                         id: toastId,
                    })
                    setIsLoading(false)
               }
          } catch (error: unknown) {
               console.error('Payment Error:', error)
               toast.error('Failed to submit order. Please try again.', { id: toastId })
               setIsLoading(false)
          }
     }

     return (
          <Button
               type="button"
               onClick={handlePaymentSubmit}
               disabled={isLoading}
               className="w-full rounded-2xl py-6 font-black text-sm uppercase tracking-wider bg-foreground text-background hover:bg-foreground/90 transition-all shadow-md active:scale-[0.99] cursor-pointer"
          >
               {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                         <Loader2 className="size-4 animate-spin" />
                         Processing Request...
                    </span>
               ) : (
                    <span className="flex items-center justify-center gap-2">
                         <Lock className="size-4" />
                         Place Order & Pay
                    </span>
               )}
          </Button>
     )
}