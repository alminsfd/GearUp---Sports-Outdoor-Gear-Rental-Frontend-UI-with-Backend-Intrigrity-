'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { CreditCard, CheckCircle2 } from 'lucide-react'
import PaymentButton from './payment-button'

interface PaymentCheckoutFormProps {
     rentalOrderId: string
     totalAmount?: number
     customerData?: {
          name?: string
          email?: string
     }
}

export default function PaymentCheckoutForm({
     rentalOrderId,
     totalAmount,
     customerData,
}: PaymentCheckoutFormProps) {
     // Only Online Payment is supported
     const paymentMethod = 'SSLCOMMERZ' as const

     // Form Field States
     const [fullName, setFullName] = useState(customerData?.name || '')
     const [phoneNumber, setPhoneNumber] = useState('')
     const [streetAddress, setStreetAddress] = useState('')
     const [city, setCity] = useState('Dhaka')
     const [area, setArea] = useState('')
     const [orderNote, setOrderNote] = useState('')

     return (
          <div className="glass-panel rounded-3xl p-6 md:p-8 space-y-8 shadow-sm">
               {/* Header */}
               <div className="space-y-1 border-b border-border/40 pb-4">
                    <h2 className="text-2xl font-black tracking-tight text-foreground">Quick Checkout</h2>
                    <p className="text-xs text-muted-foreground font-medium">
                         Complete your gear rental confirmation below.
                    </p>
               </div>

               <div className="space-y-6">
                    {/* Contact Information */}
                    <div className="space-y-3">
                         <label className="text-[11px] font-black uppercase tracking-wider text-muted-foreground">
                              Contact Information
                         </label>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-1">
                                   <span className="text-xs font-bold text-foreground">Full Name</span>
                                   <Input
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        placeholder="Full Name"
                                        className="rounded-2xl bg-muted/30 border-border/60 focus:bg-background"
                                   />
                              </div>
                              <div className="space-y-1">
                                   <span className="text-xs font-bold text-foreground">Phone Number</span>
                                   <Input
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        placeholder="01XXXXXXXXX"
                                        className="rounded-2xl bg-muted/30 border-border/60 focus:bg-background"
                                   />
                              </div>
                         </div>
                    </div>

                    {/* Delivery Address */}
                    <div className="space-y-3">
                         <label className="text-[11px] font-black uppercase tracking-wider text-muted-foreground">
                              Delivery / Pickup Address
                         </label>
                         <div className="space-y-3">
                              <div className="space-y-1">
                                   <span className="text-xs font-bold text-foreground">Street Address</span>
                                   <Input
                                        value={streetAddress}
                                        onChange={(e) => setStreetAddress(e.target.value)}
                                        placeholder="House, Road, Apartment details..."
                                        className="rounded-2xl bg-muted/30 border-border/60 focus:bg-background"
                                   />
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                   <div className="space-y-1">
                                        <span className="text-xs font-bold text-foreground">City</span>
                                        <Input
                                             value={city}
                                             onChange={(e) => setCity(e.target.value)}
                                             placeholder="Dhaka"
                                             className="rounded-2xl bg-muted/30 border-border/60 focus:bg-background"
                                        />
                                   </div>
                                   <div className="space-y-1">
                                        <span className="text-xs font-bold text-foreground">Area</span>
                                        <Input
                                             value={area}
                                             onChange={(e) => setArea(e.target.value)}
                                             placeholder="e.g. Uttara / Dhanmondi"
                                             className="rounded-2xl bg-muted/30 border-border/60 focus:bg-background"
                                        />
                                   </div>
                              </div>
                         </div>
                    </div>

                    {/* Payment Method - Only Online Payment */}
                    <div className="space-y-3">
                         <label className="text-[11px] font-black uppercase tracking-wider text-muted-foreground">
                              Payment Method
                         </label>
                         <div className="rounded-2xl p-4 border border-secondary bg-secondary/5 ring-1 ring-secondary flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                   <div className="size-5 rounded-full bg-secondary flex items-center justify-center text-white">
                                        <CheckCircle2 className="size-3.5" />
                                   </div>
                                   <div>
                                        <p className="text-xs font-bold text-foreground">Online Payment</p>
                                        <p className="text-[10px] text-muted-foreground">SSLCommerz, Cards, Mobile Banking (bKash/Nagad)</p>
                                   </div>
                              </div>
                              <CreditCard className="size-4 text-secondary" />
                         </div>
                    </div>

                    {/* Optional Order Note */}
                    <div className="space-y-1.5">
                         <span className="text-xs font-bold text-foreground">Order Note (Optional)</span>
                         <Textarea
                              value={orderNote}
                              onChange={(e) => setOrderNote(e.target.value)}
                              placeholder="Any specific instructions for us..."
                              className="rounded-2xl bg-muted/30 border-border/60 focus:bg-background resize-none h-20 text-xs"
                         />
                    </div>

                    {/* Action Button Component */}
                    <PaymentButton
                         rentalOrderId={rentalOrderId}
                         totalAmount={totalAmount}
                         shippingAddress={{ fullName, phoneNumber, streetAddress, city, area }}
                         paymentMethod={paymentMethod}
                         orderNote={orderNote}
                    />
               </div>
          </div>
     )
}