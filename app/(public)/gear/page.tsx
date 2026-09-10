import { IGear } from '@/types/gear'
import { getGears } from '../_actions/gear-actions'
import { GearFilters } from '@/components/gear/gear-filters'
import { GearCard } from '@/components/gear/gear-card'
import { GearPagination } from '@/components/gear/gear-pagination'
import { PackageOpen } from 'lucide-react'

export default async function GearListingPage({
     searchParams,
}: {
     searchParams: Promise<{ [key: string]: string | undefined }>
}) {
     const resolvedParams = await searchParams

     const currentPage = Number(resolvedParams.page) || 1

     const response = await getGears(resolvedParams)
     const gears: IGear[] = response?.data || []
     const totalPage = response?.meta?.totalPage || 1
     const totalItems = response?.meta?.total ?? gears.length

     return (
          <div className="min-h-screen pt-24 sm:pt-28 pb-16">
               <div className="container mx-auto max-w-7xl px-4 sm:px-6 space-y-6">
                    {/* 1. Header / Top Navigation Filter Bar */}
                    <GearFilters />

                    {/* 2. Results Meta Bar */}
                    <div className="flex items-center justify-between px-1">
                         <span className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
                              RESULTS: {totalItems} ITEMS
                         </span>
                    </div>

                    {/* 3. Product Grid Layout & Pagination */}
                    {gears.length === 0 ? (
                         <div className="flex min-h-90 flex-col items-center justify-center rounded-3xl border border-dashed border-border/80 bg-card/70 p-8 text-center shadow-sm">
                              <div className="mb-3 flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                   <PackageOpen className="size-7" />
                              </div>
                              <p className="text-lg font-bold text-foreground">No gear found</p>
                              <p className="mt-1 max-w-sm text-xs text-muted-foreground">
                                   Try adjusting your filters, selecting another category, or searching with different terms.
                              </p>
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