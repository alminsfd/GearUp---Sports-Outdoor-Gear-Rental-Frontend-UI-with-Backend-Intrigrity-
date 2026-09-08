'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DateRangePicker } from '@/components/gear/date-range-picker'
import { DateRange } from 'react-day-picker'

interface GearBookingCardProps {
     pricePerDay: number
     isAvailable: boolean
     stock: number
}

export function GearBookingCard({ pricePerDay, isAvailable, stock }: GearBookingCardProps) {
     const [dateRange, setDateRange] = useState<DateRange | undefined>()

     return (
          <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm space-y-4">
               <div className="flex items-baseline justify-between">
                    <div>
                         <span className="text-3xl font-extrabold">${pricePerDay}</span>
                         <span className="text-xs text-muted-foreground"> / day</span>
                    </div>
                    <Badge variant={isAvailable && stock > 0 ? 'default' : 'destructive'}>
                         {isAvailable && stock > 0 ? 'Available Now' : 'Out of Stock'}
                    </Badge>
               </div>

               {/* Date Range Selection */}
               <div className="space-y-2 pt-2">
                    <label className="text-xs font-bold text-foreground">Select Rental Dates</label>
                    <DateRangePicker onDateChange={setDateRange} />
               </div>

               <Button
                    disabled={!isAvailable || stock === 0}
                    className="w-full rounded-xl py-6 font-bold"
               >
                    Rent Now
               </Button>
          </div>
     )
}