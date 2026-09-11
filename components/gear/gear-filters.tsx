'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useRef, useState } from 'react'
import {
     Search,
     X,
     ChevronDown,
     SlidersHorizontal,
     Check,
     RotateCcw,
} from 'lucide-react'
import {
     Popover,
     PopoverContent,
     PopoverTrigger,
} from '@/components/ui/popover'

interface FilterTab {
     id: string
     label: string
     value: string
}

const CATEGORY_TABS: FilterTab[] = [
     { id: 'all', label: 'ALL', value: '' },
     { id: 'camping', label: 'CAMPING', value: 'camping' },
     { id: 'hiking', label: 'HIKING', value: 'hiking' },
     { id: 'cameras', label: 'CAMERAS', value: 'cameras' },
     { id: 'cycling', label: 'CYCLING', value: 'cycling' },
     { id: 'water-sports', label: 'WATER SPORTS', value: 'water-sports' },
     { id: 'gyms', label: 'Gym SPORTS', value: 'gyms-sports' },
]

const SORT_OPTIONS = [
     { label: 'RECOMMENDED', sortBy: '', sortOrder: '' },
     { label: 'PRICE: LOW TO HIGH', sortBy: 'pricePerDay', sortOrder: 'asc' },
     { label: 'PRICE: HIGH TO LOW', sortBy: 'pricePerDay', sortOrder: 'desc' },
     { label: 'NEWEST ARRIVALS', sortBy: 'createdAt', sortOrder: 'desc' },
     { label: 'OLDEST FIRST', sortBy: 'createdAt', sortOrder: 'asc' },
]

export function GearFilters() {
     const router = useRouter()
     const pathname = usePathname()
     const searchParams = useSearchParams()

     const currentCategory = searchParams.get('category') || ''
     const currentSortBy = searchParams.get('sortBy') || ''
     const currentSortOrder = searchParams.get('sortOrder') || ''
     const urlSearch = searchParams.get('searchTerm') || ''
     const [searchTerm, setSearchTerm] = useState(urlSearch)
     const [prevUrlSearch, setPrevUrlSearch] = useState(urlSearch)

     const urlMin = searchParams.get('minPrice') || ''
     const [minPrice, setMinPrice] = useState(urlMin)
     const [prevUrlMin, setPrevUrlMin] = useState(urlMin)

     const urlMax = searchParams.get('maxPrice') || ''
     const [maxPrice, setMaxPrice] = useState(urlMax)
     const [prevUrlMax, setPrevUrlMax] = useState(urlMax)

     const [sortOpen, setSortOpen] = useState(false)
     const [priceFilterOpen, setPriceFilterOpen] = useState(false)
     const debounceRef = useRef<NodeJS.Timeout | null>(null)

     // Synchronize internal state when URL changes externally during render (React recommended pattern)
     if (urlSearch !== prevUrlSearch) {
          setPrevUrlSearch(urlSearch)
          setSearchTerm(urlSearch)
     }
     if (urlMin !== prevUrlMin) {
          setPrevUrlMin(urlMin)
          setMinPrice(urlMin)
     }
     if (urlMax !== prevUrlMax) {
          setPrevUrlMax(urlMax)
          setMaxPrice(urlMax)
     }

     const updateQuery = useCallback(
          (updates: Record<string, string | null>) => {
               const params = new URLSearchParams(searchParams.toString())

               Object.entries(updates).forEach(([key, value]) => {
                    if (value && value.trim() !== '') {
                         params.set(key, value)
                    } else {
                         params.delete(key)
                    }
               })

               // Reset to page 1 whenever filters change
               if (!('page' in updates)) {
                    params.set('page', '1')
               }

               router.replace(`${pathname}?${params.toString()}`, { scroll: false })
          },
          [pathname, router, searchParams]
     )

     const handleSearchChange = (value: string) => {
          setSearchTerm(value)
          if (debounceRef.current) {
               clearTimeout(debounceRef.current)
          }
          debounceRef.current = setTimeout(() => {
               updateQuery({ searchTerm: value })
          }, 400)
     }

     const handleCategoryClick = (categoryValue: string) => {
          updateQuery({ category: categoryValue || null })
     }

     const handleSortSelect = (sortBy: string, sortOrder: string) => {
          updateQuery({
               sortBy: sortBy || null,
               sortOrder: sortOrder || null,
          })
          setSortOpen(false)
     }

     const handlePriceApply = () => {
          updateQuery({
               minPrice: minPrice || null,
               maxPrice: maxPrice || null,
          })
          setPriceFilterOpen(false)
     }

     const handleReset = () => {
          setSearchTerm('')
          setMinPrice('')
          setMaxPrice('')
          router.push(pathname)
     }

     const activeSortLabel =
          SORT_OPTIONS.find((opt) => opt.sortBy === currentSortBy && opt.sortOrder === currentSortOrder)?.label || 'RECOMMENDED'

     const hasActiveFilters =
          Boolean(searchTerm) ||
          Boolean(currentCategory) ||
          Boolean(currentSortBy) ||
          Boolean(minPrice) ||
          Boolean(maxPrice)

     return (
          <div className="w-full">
               {/* 1. Header / Top Navigation Filter Bar */}
               <div className="flex w-full flex-col gap-3 rounded-3xl border border-border/70 bg-card/90 backdrop-blur-md p-2.5 shadow-[0_8px_30px_-8px_rgba(16,185,129,0.06)] md:flex-row md:items-center md:justify-between md:rounded-full md:p-3">
                    {/* Search Input with Magnifying Glass Icon */}
                    <div className="relative flex min-w-50 flex-1 items-center rounded-full bg-muted/60 px-4 py-2.5 transition-all focus-within:bg-card focus-within:ring-2 focus-within:ring-primary/25 hover:bg-muted md:max-w-xs">
                         <Search className="size-4 text-muted-foreground shrink-0" />
                         <input
                              type="text"
                              value={searchTerm}
                              onChange={(e) => handleSearchChange(e.target.value)}
                              placeholder="Search gear..."
                              className="ml-2.5 w-full bg-transparent text-xs font-semibold text-foreground placeholder:text-muted-foreground focus:outline-none"
                         />
                         {searchTerm && (
                              <button
                                   type="button"
                                   onClick={() => {
                                        setSearchTerm('')
                                        updateQuery({ searchTerm: null })
                                   }}
                                   className="rounded-full p-0.5 text-muted-foreground hover:bg-muted hover:text-foreground"
                              >
                                   <X className="size-3.5" />
                              </button>
                         )}
                    </div>

                    {/* Horizontal Pill-Style Filter Tabs */}
                    <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
                         {CATEGORY_TABS.map((tab) => {
                              const isActive =
                                   tab.value === ''
                                        ? !currentCategory || currentCategory === 'all'
                                        : currentCategory.toLowerCase() === tab.value.toLowerCase()

                              return (
                                   <button
                                        key={tab.id}
                                        type="button"
                                        onClick={() => handleCategoryClick(tab.value)}
                                        className={`cursor-pointer rounded-full px-4 py-2 text-[11px] font-black tracking-wider uppercase transition-all duration-200 whitespace-nowrap ${isActive
                                             ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/25'
                                             : 'bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground'
                                             }`}
                                   >
                                        {tab.label}
                                   </button>
                              )
                         })}
                    </div>

                    {/* Right Side: Price Popover + Dark "Recommended / Sort" Dropdown */}
                    <div className="flex items-center justify-end gap-2 shrink-0">
                         {/* Optional Price Range Filter Popover */}
                         <Popover open={priceFilterOpen} onOpenChange={setPriceFilterOpen}>
                              <PopoverTrigger asChild>
                                   <button
                                        type="button"
                                        title="Price Filter"
                                        className={`flex items-center justify-center rounded-xl p-2.5 text-xs font-bold transition-colors cursor-pointer ${minPrice || maxPrice
                                             ? 'bg-primary/10 text-primary'
                                             : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                                             }`}
                                   >
                                        <SlidersHorizontal className="size-4" />
                                   </button>
                              </PopoverTrigger>
                              <PopoverContent align="end" className="w-72 rounded-2xl border border-border/70 bg-card p-4 shadow-xl">
                                   <div className="space-y-3">
                                        <div className="flex items-center justify-between border-b border-border/40 pb-2">
                                             <h4 className="text-xs font-black uppercase tracking-wider text-foreground">
                                                  Filter by Price
                                             </h4>
                                             {(minPrice || maxPrice) && (
                                                  <button
                                                       type="button"
                                                       onClick={() => {
                                                            setMinPrice('')
                                                            setMaxPrice('')
                                                            updateQuery({ minPrice: null, maxPrice: null })
                                                       }}
                                                       className="text-[11px] font-bold text-primary hover:underline"
                                                  >
                                                       Reset
                                                  </button>
                                             )}
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                             <div>
                                                  <label className="text-[10px] font-bold uppercase text-muted-foreground">Min ($)</label>
                                                  <input
                                                       type="number"
                                                       placeholder="0"
                                                       value={minPrice}
                                                       onChange={(e) => setMinPrice(e.target.value)}
                                                       className="mt-1 w-full rounded-xl border border-border bg-muted/50 px-3 py-1.5 text-xs font-semibold text-foreground focus:border-primary focus:bg-card focus:outline-none"
                                                  />
                                             </div>
                                             <div>
                                                  <label className="text-[10px] font-bold uppercase text-muted-foreground">Max ($)</label>
                                                  <input
                                                       type="number"
                                                       placeholder="500"
                                                       value={maxPrice}
                                                       onChange={(e) => setMaxPrice(e.target.value)}
                                                       className="mt-1 w-full rounded-xl border border-border bg-muted/50 px-3 py-1.5 text-xs font-semibold text-foreground focus:border-primary focus:bg-card focus:outline-none"
                                                  />
                                             </div>
                                        </div>
                                        <button
                                             type="button"
                                             onClick={handlePriceApply}
                                             className="w-full rounded-xl bg-primary py-2 text-xs font-bold text-primary-foreground transition-opacity hover:opacity-90"
                                        >
                                             Apply Price
                                        </button>
                                   </div>
                              </PopoverContent>
                         </Popover>

                         {/* Dark "Recommended / Sort" Dropdown Button */}
                         <Popover open={sortOpen} onOpenChange={setSortOpen}>
                              <PopoverTrigger asChild>
                                   <button
                                        type="button"
                                        className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-black tracking-wider text-white uppercase shadow-sm transition-all hover:bg-slate-800 active:scale-95 cursor-pointer md:rounded-2xl"
                                   >
                                        <SlidersHorizontal className="size-3.5 rotate-90 stroke-[2.5]" />
                                        <span className="hidden sm:inline">{activeSortLabel}</span>
                                        <span className="sm:hidden">SORT</span>
                                        <ChevronDown className="size-3.5 stroke-[2.5]" />
                                   </button>
                              </PopoverTrigger>
                              <PopoverContent
                                   align="end"
                                   className="w-52 overflow-hidden rounded-2xl border border-border/70 bg-card p-1.5 shadow-xl"
                              >
                                   <div className="space-y-0.5">
                                        {SORT_OPTIONS.map((opt) => {
                                             const isSelected = currentSortBy === opt.sortBy && currentSortOrder === opt.sortOrder
                                             return (
                                                  <button
                                                       key={opt.label}
                                                       type="button"
                                                       onClick={() => handleSortSelect(opt.sortBy, opt.sortOrder)}
                                                       className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-bold tracking-wide uppercase transition-colors cursor-pointer ${isSelected
                                                            ? 'bg-primary/10 text-primary'
                                                            : 'text-foreground hover:bg-muted'
                                                            }`}
                                                  >
                                                       <span>{opt.label}</span>
                                                       {isSelected && <Check className="size-3.5 text-primary stroke-3" />}
                                                  </button>
                                             )
                                        })}
                                   </div>
                              </PopoverContent>
                         </Popover>

                         {/* Quick Reset Button if filters active */}
                         {hasActiveFilters && (
                              <button
                                   type="button"
                                   onClick={handleReset}
                                   title="Reset all filters"
                                   className="flex items-center gap-1 rounded-xl bg-muted px-3 py-2 text-xs font-bold text-muted-foreground hover:bg-muted/80 hover:text-foreground transition-colors"
                              >
                                   <RotateCcw className="size-3" />
                              </button>
                         )}
                    </div>
               </div>
          </div>
     )
}