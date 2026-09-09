'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useRef, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, Filter, RotateCcw } from 'lucide-react'

export function GearFilters() {
     const router = useRouter()
     const searchParams = useSearchParams()
     const pathname = usePathname()
     const [search, setSearch] = useState(searchParams.get('searchTerm') || '')
     const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

     const createQueryString = useCallback(
          (name: string, value: string) => {
               const params = new URLSearchParams(searchParams.toString());
               if (value) {
                    params.set(name, value);
               } else {
                    params.delete(name);
               }
               if (name !== "page") {
                    params.set("page", "1");
               }
               if (debounceTimerRef.current) {
                    clearTimeout(debounceTimerRef.current);
               }
               debounceTimerRef.current = setTimeout(() => {
                    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
               }, 500);
          },
          [searchParams, pathname, router]
     );

     const handleSearchChange = (value: string) => {
          setSearch(value)

          handleFilterChange('searchTerm', value)
     }

     const handleFilterChange = (key: string, value: string) => {
          router.push(`?${createQueryString(key, value)}`)
     }

     const resetFilters = () => {
          setSearch('')
          router.push('/gear')
     }


     return (
          <div
               key={searchParams.toString() || 'filters'}
               className="space-y-6 rounded-2xl border border-border/60 bg-card p-5 shadow-sm"
          >
               <div className="flex items-center justify-between border-b border-border/40 pb-3">
                    <div className="flex items-center gap-2 font-bold text-foreground">
                         <Filter className="size-4 text-primary" />
                         <span>Filters</span>
                    </div>
                    <button
                         type="button"
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
                              value={search}
                              onChange={(e) => handleSearchChange(e.target.value)}
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
               <div className="space-y-2">
                    <Label className="text-xs font-semibold">Min Price ($/day)</Label>
                    <Input
                         type="number"
                         placeholder="e.g. 100"
                         defaultValue={searchParams.get('minPrice') || ''}
                         onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                         className="rounded-xl text-xs"
                    />
               </div>
          </div>
     )
}