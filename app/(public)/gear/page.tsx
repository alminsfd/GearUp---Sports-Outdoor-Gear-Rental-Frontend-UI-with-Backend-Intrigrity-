import { IGear } from '@/types/gear'
import { getGears } from '../_actions/gear-actions'
import { GearFilters } from '@/components/gear/gear-filters'
import { GearCard } from '@/components/gear/gear-card'
import { GearPagination } from '@/components/gear/gear-pagination'
import { PackageOpen, X } from 'lucide-react'
import Link from 'next/link'

export default async function GearListingPage({
     searchParams,
}: {
     searchParams: Promise<{ [key: string]: string | undefined }>
}) {
     const resolvedParams = await searchParams

     const currentPage = Number(resolvedParams.page) || 1
     const searchQuery = resolvedParams.search

     const response = await getGears(resolvedParams)
     const gears: IGear[] = response?.data || []
     const totalPage = response?.meta?.totalPage || 1
     const totalItems = response?.meta?.total ?? gears.length

     return (
          <div className="min-h-screen pb-16">
               <div className="container mx-auto max-w-7xl space-y-6 px-4 sm:px-6">
                    {/* 1. Header / Top Navigation Filter Bar */}
                    <GearFilters />

                    {/* 2. Results Meta Bar & Active Search Indicator */}
                    <div className="flex flex-wrap items-center justify-between gap-2 px-1">
                         <span className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
                              RESULTS: {totalItems} ITEMS
                         </span>

                         {searchQuery && (
                              <div className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                                   {/*  eslint-disable-next-line react/no-unescaped-entities */}
                                   <span>Search: "{searchQuery}"</span>
                                   <Link href="/gear" className="hover:opacity-75">
                                        <X className="size-3.5" />
                                   </Link>
                              </div>
                         )}
                    </div>

                    {/* 3. Product Grid Layout & Pagination */}
                    {gears.length === 0 ? (
                         <div className="flex min-h-90 flex-col items-center justify-center rounded-3xl border border-dashed border-border/80 bg-card/70 p-8 text-center shadow-sm">
                              <div className="mb-3 flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                   <PackageOpen className="size-7" />
                              </div>
                              <p className="text-lg font-bold text-foreground">No gear found</p>
                              <p className="mt-1 max-w-sm text-xs text-muted-foreground">
                                   {searchQuery
                                        ? `No items found matching "${searchQuery}". Try searching for something else.`
                                        : 'Try adjusting your filters, selecting another category, or searching with different terms.'}
                              </p>
                              {searchQuery && (
                                   <Link
                                        href="/gear"
                                        className="mt-4 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground hover:bg-primary/90"
                                   >
                                        Clear Search
                                   </Link>
                              )}
                         </div>
                    ) : (
                         <div className="space-y-6">
                              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                                   {gears.map((gear: IGear) => (
                                        <GearCard key={gear.id} gear={gear} />
                                   ))}
                              </div>

                              {/* Pagination */}
                              <GearPagination currentPage={currentPage} totalPage={totalPage} />
                         </div>
                    )}
               </div>
          </div>
     )
}