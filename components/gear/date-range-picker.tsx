'use client'

import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { DateRange } from 'react-day-picker'

export function DateRangePicker({ onDateChange }: { onDateChange?: (range: DateRange | undefined) => void }) {
     const [date, setDate] = useState<DateRange | undefined>()

     const handleSelect = (selected: DateRange | undefined) => {
          setDate(selected)
          if (onDateChange) onDateChange(selected)
     }

     return (
          <div className="grid gap-2">
               <Popover>
                    <PopoverTrigger asChild>
                         <Button
                              variant="outline"
                              className="w-full justify-start rounded-xl text-left font-normal border-border"
                         >
                              <CalendarIcon className="mr-2 size-4 text-muted-foreground" />
                              {date?.from ? (
                                   date.to ? (
                                        <>
                                             {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
                                        </>
                                   ) : (
                                        format(date.from, 'LLL dd, y')
                                   )
                              ) : (
                                   <span>Pick rental dates</span>
                              )}
                         </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                         <Calendar
                              autoFocus
                              mode="range"
                              defaultMonth={date?.from}
                              selected={date}
                              onSelect={handleSelect}
                              numberOfMonths={1}
                              disabled={(day) => day < new Date()}
                         />
                    </PopoverContent>
               </Popover>
          </div>
     )
}