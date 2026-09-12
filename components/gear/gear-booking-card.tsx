'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DateRangePicker } from '@/components/gear/date-range-picker'
import { DateRange } from 'react-day-picker'
import { cn } from '@/lib/utils'
import { ShieldCheck, Zap, Sparkles, CheckCircle2, Clock, RotateCcw } from 'lucide-react'
import { toast } from 'sonner'
import { getCurrentUser } from '@/validation/auth'
import { useRouter } from 'next/navigation'

export type RentalOrderStatus =
     | 'PLACED'
     | 'CONFIRMED'
     | 'PAID'
     | 'PICKED_UP'
     | 'RETURNED'
     | 'CANCELLED'

interface GearBookingCardProps {
     gearItemId: string
     pricePerDay: number
     isAvailable: boolean
     stock: number
     status?: RentalOrderStatus | null
}

export function GearBookingCard({
     pricePerDay,
     isAvailable,
     stock,
     gearItemId,
     status,
}: GearBookingCardProps) {
     const [dateRange, setDateRange] = useState<DateRange | undefined>()
     const [isLoading, setIsLoading] = useState(false)
     const router = useRouter()


     const isPaid = status === 'PAID'
     const isActiveRental = status === 'CONFIRMED' || status === 'PICKED_UP'
     const isReturnedOrNone = !status || status === 'RETURNED' || status === 'CANCELLED' || status === 'PLACED'

     const rentalDays =
          dateRange?.from && dateRange?.to
               ? Math.max(1, Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24)))
               : 0

     const subtotal = pricePerDay * (rentalDays || 1)
     const originalPrice = Math.round(pricePerDay * 1.25)

     const handleRentalRequest = async () => {
          if (!dateRange?.from || !dateRange?.to) {
               toast.error('Please select your rental start and end dates first!')
               return
          }

          setIsLoading(true)

          try {
               const auth = await getCurrentUser()

               if (!auth?.isAuthenticated || !auth?.user) {
                    toast.error('You must be logged in to make a rental request!')
                    router.push(`/login?redirectTo=/gear/${gearItemId}`)
                    setIsLoading(false)
                    return
               }

               if (auth.user.role !== 'CUSTOMER') {
                    toast.error('Only customers are allowed to request rentals.')
                    setIsLoading(false)
                    return
               }

               const startDate = dateRange.from.toISOString()
               const endDate = dateRange.to.toISOString()

               router.push(`/checkout?gearItemId=${gearItemId}&from=${startDate}&to=${endDate}`)
          } catch (error) {
               console.error('Rental request error:', error)
               toast.error('An error occurred while processing your request.')
          } finally {
               setIsLoading(false)
          }
     }

     return (
          <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-sm space-y-6">
               {/* Price & Status Badge Header */}
               <div className="flex items-start justify-between border-b border-border/40 pb-5">
                    <div>
                         <div className="flex items-baseline gap-2">
                              <span className="text-3xl font-black text-foreground tracking-tight">
                                   ${pricePerDay}
                              </span>
                              <span className="text-xs font-semibold text-muted-foreground">/ day</span>
                              <span className="text-xs font-semibold text-muted-foreground/60 line-through">
                                   ${originalPrice}
                              </span>
                         </div>
                         <p className="text-[11px] font-bold text-primary flex items-center gap-1 mt-1">
                              <Sparkles className="size-3" />
                              <span>Best Price Guaranteed</span>
                         </p>
                    </div>

                    {/* Status Badge */}
                    <Badge
                         variant="secondary"
                         className={cn(
                              'rounded-full px-3 py-1 font-bold text-xs',
                              isPaid && 'bg-amber-500/10 text-amber-600 border border-amber-500/20',
                              isActiveRental && 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20',
                              isReturnedOrNone && isAvailable && stock > 0
                                   ? 'bg-primary/10 text-primary border border-primary/20'
                                   : isReturnedOrNone && 'bg-destructive/10 text-destructive border border-destructive/20'
                         )}
                    >
                         {isPaid
                              ? 'Payment Complete'
                              : isActiveRental
                                   ? 'Rented by You'
                                   : isAvailable && stock > 0
                                        ? `${stock} Available`
                                        : 'Out of Stock'}
                    </Badge>
               </div>

               {/* Date Range & Cost Breakdown - শুধুমাত্র রেন্ট না থাকলে বা Return হলে দেখাবে */}
               {isReturnedOrNone && (
                    <>
                         <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                   <label className="text-xs font-black uppercase tracking-wider text-foreground">
                                        Select Rental Dates
                                   </label>
                                   {dateRange?.from && dateRange?.to && (
                                        <span className="text-xs font-bold text-primary">
                                             {rentalDays} {rentalDays === 1 ? 'Day' : 'Days'} Selected
                                        </span>
                                   )}
                              </div>
                              <DateRangePicker onDateChange={setDateRange} />
                         </div>

                         <div className="space-y-2.5 rounded-2xl bg-muted/40 p-4 text-xs">
                              <div className="flex justify-between text-muted-foreground font-medium">
                                   <span>
                                        ${pricePerDay} × {rentalDays > 0 ? rentalDays : 1} {rentalDays <= 1 ? 'day' : 'days'}
                                   </span>
                                   <span className="text-foreground font-bold">${subtotal}</span>
                              </div>
                              <div className="flex justify-between text-muted-foreground font-medium">
                                   <span>Damage Protection</span>
                                   <span className="text-primary font-bold">Included</span>
                              </div>
                              <div className="border-t border-border/60 pt-2.5 flex justify-between font-black text-sm text-foreground">
                                   <span>Total Estimated</span>
                                   <span className="text-lg text-primary">${subtotal}</span>
                              </div>
                         </div>
                    </>
               )}

               {/* MAIN ACTION UI */}

               {/* 1. Status == PAID */}
               {isPaid && (
                    <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-5 text-center space-y-3">
                         <div className="flex items-center justify-center gap-2 text-amber-600 font-bold text-sm">
                              <Clock className="size-5 animate-pulse" />
                              <span>Waiting for Provider Confirmation</span>
                         </div>
                         <p className="text-xs text-muted-foreground leading-relaxed">
                              Your payment was successful! Please wait for the gear provider to review and confirm your request.
                         </p>
                         <Button
                              type="button"
                              variant="outline"
                              onClick={() => router.push('/dashboard/orders')}
                              className="w-full mt-2 rounded-xl text-xs font-bold border-amber-500/30 hover:bg-amber-500/10"
                         >
                              Check Order Status
                         </Button>
                    </div>
               )}

               {/* 2. Status == CONFIRMED / PICKED_UP */}
               {isActiveRental && (
                    <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/20 p-5 text-center space-y-3">
                         <div className="flex items-center justify-center gap-2 text-emerald-600 font-bold text-sm">
                              <CheckCircle2 className="size-5" />
                              <span>You have active rental for this item</span>
                         </div>
                         <p className="text-xs text-muted-foreground leading-relaxed">
                              Check your dashboard to view rental duration and details.
                         </p>
                         <Button
                              type="button"
                              variant="outline"
                              onClick={() => router.push('/dashboard/orders')}
                              className="w-full mt-2 rounded-xl text-xs font-bold border-emerald-500/30 hover:bg-emerald-500/10"
                         >
                              Go to My Orders
                         </Button>
                    </div>
               )}

               {/* 3. Status == RETURNED / CANCELLED / None (Default Request Button) */}
               {isReturnedOrNone && (
                    <Button
                         type="button"
                         onClick={handleRentalRequest}
                         disabled={!isAvailable || stock === 0 || isLoading}
                         className={cn(
                              'w-full rounded-2xl py-6 font-black text-sm uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-2',
                              !isAvailable || stock === 0 || isLoading
                                   ? 'cursor-not-allowed opacity-50'
                                   : 'cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98] shadow-sm shadow-primary/25'
                         )}
                    >
                         {status === 'RETURNED' ? (
                              <RotateCcw className="size-4" />
                         ) : (
                              <Zap className="size-4 fill-current" />
                         )}
                         <span>
                              {isLoading
                                   ? 'Processing...'
                                   : status === 'RETURNED'
                                        ? 'Rent Again'
                                        : 'Instant Rental Request'}
                         </span>
                    </Button>
               )}

               {/* Guarantee Micro-text */}
               <div className="flex items-center justify-center gap-1.5 text-[11px] font-semibold text-muted-foreground pt-1">
                    <ShieldCheck className="size-4 text-primary" />
                    <span>Free cancellation up to 24 hours prior to rental</span>
               </div>
          </div>
     )
}