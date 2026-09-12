import { Suspense } from 'react'
import { ShieldCheck, ArrowLeft, Lock, AlertCircle, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import PaymentLoading from '../loading'
import { createRentalOrderAction } from '../_action/payment_action'
import PaymentCheckoutForm from '@/components/payment/payment-checkout-form'
import PaymentProductCard from '@/components/payment/payment-product-card'

interface CheckoutPageProps {
     searchParams: Promise<{
          gearItemId?: string
          from?: string
          to?: string
     }>
}

export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {
     const { gearItemId, from, to } = await searchParams

     let rentalOrderData = null
     let errorMessage = ''

     if (gearItemId && from && to) {
          const res = await createRentalOrderAction({
               gearItemId,
               startDate: from,
               endDate: to,
          })

          if (res.success && res.data) {
               rentalOrderData = res.data
          } else {
               errorMessage = res.message || "Failed to process rental request."
          }
     } else {
          errorMessage = "Required parameters (gearItemId, from, to) are missing in URL."
     }

     return (
          <Suspense fallback={<PaymentLoading />}>
               <div className="min-h-screen bg-background pb-10 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-5xl mx-auto space-y-8">

                         {/* Header Section */}
                         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/50 pb-6">
                              <div className="space-y-1">
                                   <Link
                                        href="/gear"
                                        className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors mb-2"
                                   >
                                        <ArrowLeft className="size-3.5" />
                                        Back to Gear Catalog
                                   </Link>
                                   <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
                                        Checkout & Payment
                                   </h1>
                                   <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                                        Review your rental item details and complete your payment securely.
                                   </p>
                              </div>

                              <div className="flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-3.5 py-2 rounded-2xl text-xs font-bold w-fit">
                                   <Lock className="size-4" />
                                   <span>256-Bit SSL Encrypted</span>
                              </div>
                         </div>


                         {errorMessage && !rentalOrderData ? (
                              <div className="rounded-3xl border border-destructive/20 bg-destructive/5 p-8 text-center space-y-4 max-w-xl mx-auto my-12">
                                   <div className="size-12 rounded-2xl bg-destructive/10 text-destructive flex items-center justify-center mx-auto">
                                        <AlertCircle className="size-6" />
                                   </div>
                                   <div className="space-y-1">
                                        <h3 className="text-lg font-black text-foreground">Rental Order Failed</h3>
                                        <p className="text-xs text-muted-foreground font-medium">{errorMessage}</p>
                                   </div>
                                   <div className="pt-2 flex items-center justify-center gap-3">
                                        <Button asChild variant="default" className="rounded-2xl font-bold text-xs">
                                             <Link href="/gear">
                                                  <ShoppingBag className="size-4 mr-1.5" />
                                                  Browse Other Gear
                                             </Link>
                                        </Button>
                                   </div>
                              </div>
                         ) : (

                              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                                   {/* Left Column: Product Info */}
                                   <div className="lg:col-span-7 space-y-6">
                                        <PaymentProductCard orderData={rentalOrderData} />
                                   </div>

                                   {/* Right Column: Checkout Form */}
                                   <div className="lg:col-span-5 space-y-6">
                                        <PaymentCheckoutForm
                                             rentalOrderId={rentalOrderData?.id || ''}
                                             totalAmount={rentalOrderData?.totalAmount || 0}
                                        />

                                        <div className="rounded-2xl bg-muted/40 p-4 border border-border/50 space-y-3">
                                             <div className="flex items-start gap-3">
                                                  <ShieldCheck className="size-5 text-primary shrink-0 mt-0.5" />
                                                  <div className="text-xs space-y-1">
                                                       <p className="font-bold text-foreground">Buyer Protection Guaranteed</p>
                                                       <p className="text-muted-foreground leading-relaxed">
                                                            Your funds are held securely and released only when the rental period successfully starts.
                                                       </p>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>

                              </div>
                         )}

                    </div>
               </div>
          </Suspense>
     )
}