import { IGear } from '@/types/gear'
import { getGears } from '../_actions/gear-actions'
import { GearFilters } from '@/components/gear/gear-filters'
import { GearCard } from '@/components/gear/gear-card'


export default async function GearListingPage({
     searchParams,
}: {
     searchParams: Promise<{ [key: string]: string | undefined }>
}) {
     const resolvedParams = await searchParams
     const response = await getGears(resolvedParams)
     const gears = response?.data || []


     return (
          <div className="container mx-auto px-4 py-8">
               <div className="mb-8">
                    <h1 className="text-3xl font-extrabold tracking-tight">Explore Adventure Gear</h1>
                    <p className="text-sm text-muted-foreground">
                         Rent high-quality sports and outdoor equipment from trusted providers.
                    </p>
               </div>

               <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    {/* Sidebar Filters */}
                    <div className="md:col-span-1">
                         <GearFilters />
                    </div>

                    {/* Gear Grid */}
                    <div className="md:col-span-3">
                         {gears.length === 0 ? (
                              <div className="flex min-h-75 flex-col items-center justify-center rounded-2xl border border-dashed border-border p-8 text-center">
                                   <p className="font-semibold text-foreground">No gear found</p>
                                   <p className="text-xs text-muted-foreground">Try adjusting your filters or search terms.</p>
                              </div>
                         ) : (
                              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                   {gears.map((gear: IGear) => (
                                        <GearCard key={gear.id} gear={gear} />
                                   ))}
                              </div>
                         )}
                    </div>
               </div>
          </div>
     )
}