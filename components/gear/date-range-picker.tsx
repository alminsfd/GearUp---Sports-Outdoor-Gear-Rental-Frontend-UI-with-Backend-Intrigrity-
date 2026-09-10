'use client'
import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { DateRange } from 'react-day-picker'

export function DateRangePicker({ onDateChange }: { onDateChange?: (range: DateRange | undefined) => void }) {
     const [date, setDate] = useState<DateRange | undefined>({
          from: new Date(),
          to: undefined,
     })

     const handleSelect = (selected: DateRange | undefined) => {
          const today = new Date()
          const updatedRange: DateRange = {
               from: today,
               to: selected?.to || selected?.from,
          }

          setDate(updatedRange)
          if (onDateChange) onDateChange(updatedRange)
     }

     return (
          <div className="grid gap-2">
               <Popover>
                    <PopoverTrigger asChild>
                         <Button
                              variant="outline"
                              className="w-full justify-start rounded-2xl text-left font-medium border-border/70 bg-muted/40 hover:bg-muted text-foreground transition-colors cursor-pointer"
                         >
                              <CalendarIcon className="mr-2 size-4 text-primary" />
                              {date?.from ? (
                                   date.to ? (
                                        <>
                                             {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
                                        </>
                                   ) : (
                                        <>
                                             {format(date.from, 'LLL dd, y')} - <span className="text-muted-foreground">Select end date</span>
                                        </>
                                   )
                              ) : (
                                   <span>Pick rental dates</span>
                              )}
                         </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 rounded-2xl border border-border/70 bg-card shadow-xl" align="start">
                         <Calendar
                              autoFocus
                              mode="range"
                              defaultMonth={date?.from}
                              selected={date}
                              onSelect={handleSelect}
                              numberOfMonths={1}
                              disabled={(day) => day <= new Date()}
                         />
                    </PopoverContent>
               </Popover>
          </div>
     )
}