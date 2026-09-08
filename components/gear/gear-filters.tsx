'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, Filter, RotateCcw } from 'lucide-react'

export function GearFilters() {
     const router = useRouter()
     const searchParams = useSearchParams()

     const createQueryString = useCallback(
          (name: string, value: string) => {
               const params = new URLSearchParams(searchParams.toString())
               if (value) params.set(name, value)
               else params.delete(name)
               return params.toString()
          },
          [searchParams]
     )

     const handleFilterChange = (key: string, value: string) => {
          router.push(`?${createQueryString(key, value)}`)
     }

     const resetFilters = () => {
          router.push('/gear')
     }

     return (
          <div className="space-y-6 rounded-2xl border border-border/60 bg-card p-5 shadow-sm">
               <div className="flex items-center justify-between border-b border-border/40 pb-3">
                    <div className="flex items-center gap-2 font-bold text-foreground">
                         <Filter className="size-4 text-primary" />
                         <span>Filters</span>
                    </div>
                    <button
                         onClick={resetFilters}
                         className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
                    >
                         <RotateCcw className="size-3" />
                         <span>Reset</span>
                    </button>
               </div>

               {/* Search Bar */}
               <div className="space-y-2">
                    <Label className="text-xs font-semibold">Search Gear</Label>
                    <div className="relative">
                         <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                         <Input
                              placeholder="e.g., Hiking Tent"
                              defaultValue={searchParams.get('search') || ''}
                              onChange={(e) => handleFilterChange('search', e.target.value)}
                              className="pl-9 text-xs rounded-xl"
                         />
                    </div>
               </div>

               {/* Category Filter */}
               <div className="space-y-2">
                    <Label className="text-xs font-semibold">Category</Label>
                    <Select
                         defaultValue={searchParams.get('category') || ''}
                         onValueChange={(val) => handleFilterChange('category', val === 'all' ? '' : val)}
                    >
                         <SelectTrigger className="rounded-xl text-xs">
                              <SelectValue placeholder="All Categories" />
                         </SelectTrigger>
                         <SelectContent>
                              <SelectItem value="all">All Categories</SelectItem>
                              <SelectItem value="camping">Camping & Hiking</SelectItem>
                              <SelectItem value="climbing">Climbing</SelectItem>
                              <SelectItem value="water-sports">Water Sports</SelectItem>
                              <SelectItem value="cycling">Cycling</SelectItem>
                         </SelectContent>
                    </Select>
               </div>

               {/* Price Range */}
               <div className="space-y-2">
                    <Label className="text-xs font-semibold">Max Price ($/day)</Label>
                    <Input
                         type="number"
                         placeholder="e.g. 100"
                         defaultValue={searchParams.get('maxPrice') || ''}
                         onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                         className="rounded-xl text-xs"
                    />
               </div>
          </div>
     )
}