import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Calendar, ShieldCheck, Tag } from 'lucide-react'

interface RentalOrderData {
     id: string
     startDate: string
     endDate: string
     totalDays: number
     totalAmount: number
     status: string
     gearItem: {
          id: string
          title: string
          description: string
          pricePerDay: number
          brand: string
          images: string[]
     }
}

interface PaymentProductCardProps {
     orderData?: RentalOrderData | null
}

export default function PaymentProductCard({ orderData }: PaymentProductCardProps) {
     if (!orderData) {
          return (
               <div className="glass-panel rounded-3xl p-6 text-center text-muted-foreground">
                    No rental order details available.
               </div>
          )
     }

     const { gearItem, totalDays, totalAmount, startDate, endDate, status } = orderData

     const formattedStart = new Date(startDate).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
     })
     const formattedEnd = new Date(endDate).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
     })

     return (
          <div className="glass-panel rounded-3xl p-6 shadow-sm space-y-6">
               <div className="flex items-center justify-between border-b border-border/50 pb-4">
                    <h3 className="text-lg font-black tracking-tight text-foreground">Your Order</h3>
                    <Badge className="bg-[hsl(var(--status-placed-bg))] text-[hsl(var(--status-placed-text))] border border-[hsl(var(--status-placed-border))] font-bold rounded-full px-3 py-0.5 text-xs">
                         {status}
                    </Badge>
               </div>

               {/* Product Information */}
               <div className="flex gap-4 items-center">
                    <div className="relative size-20 rounded-2xl overflow-hidden bg-muted border border-border/60 shrink-0">
                         <Image
                              src={gearItem?.images[0] || '/placeholder.png'}
                              alt={gearItem?.title || 'Gear Image'}
                              fill
                              className="object-cover"
                         />
                    </div>
                    <div className="space-y-1">
                         <span className="text-[10px] font-bold uppercase tracking-wider text-secondary flex items-center gap-1">
                              <Tag className="size-3" />
                              {gearItem?.brand}
                         </span>
                         <h4 className="text-sm font-bold text-foreground line-clamp-1">
                              {gearItem?.title}
                         </h4>
                         <p className="text-xs text-muted-foreground font-semibold">
                              ${gearItem?.pricePerDay} / day
                         </p>
                    </div>
               </div>

               {/* Rental Period */}
               <div className="rounded-2xl bg-muted/40 p-3.5 border border-border/40 text-xs space-y-1.5">
                    <div className="flex items-center justify-between font-bold text-foreground">
                         <span className="flex items-center gap-1.5 text-muted-foreground">
                              <Calendar className="size-3.5 text-primary" />
                              Rental Duration:
                         </span>
                         <span className="text-primary font-black">{totalDays} Days</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground text-[11px] font-medium pt-1 border-t border-border/30">
                         <span>{formattedStart}</span>
                         <span>to</span>
                         <span>{formattedEnd}</span>
                    </div>
               </div>

               {/* Cost Breakdown */}
               <div className="space-y-2.5 text-xs border-t border-border/50 pt-4">
                    <div className="flex justify-between text-muted-foreground font-medium">
                         <span>Subtotal ({totalDays} Days)</span>
                         <span className="text-foreground font-bold">${totalAmount}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground font-medium">
                         <span>Damage Protection</span>
                         <span className="text-primary font-bold">Free</span>
                    </div>
                    <div className="flex justify-between items-baseline pt-3 border-t border-border/60 font-black">
                         <span className="text-base text-foreground">Total Amount</span>
                         <span className="text-2xl text-secondary">${totalAmount}</span>
                    </div>
               </div>

               {/* Security micro badge */}
               <div className="rounded-2xl bg-primary/10 border border-primary/20 p-3 flex items-center gap-2 text-[11px] font-bold text-primary">
                    <ShieldCheck className="size-4 shrink-0" />
                    <span>Guaranteed safe & secure checkout with GearUp</span>
               </div>
          </div>
     )
}