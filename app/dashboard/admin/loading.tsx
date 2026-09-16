import { Skeleton } from '@/components/ui/skeleton'

export default function AdminOverviewLoading() {
     return (
          <div className="space-y-8">
               {/* Top Action Bar Skeleton */}
               <div className="flex justify-end">
                    <Skeleton className="h-10 w-48 rounded-xl" />
               </div>

               {/* Metrics Cards Grid Skeleton */}
               <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {Array.from({ length: 4 }).map((_, index) => (
                         <div
                              key={index}
                              className="rounded-3xl border border-border/60 bg-card/40 p-6 shadow-sm"
                         >
                              <div className="flex items-center justify-between">
                                   <Skeleton className="size-12 rounded-2xl" />
                                   <Skeleton className="h-5 w-16 rounded-full" />
                              </div>
                              <div className="mt-5 space-y-2">
                                   <Skeleton className="h-3.5 w-24 rounded" />
                                   <Skeleton className="h-8 w-28 rounded-lg" />
                                   <Skeleton className="h-3 w-36 rounded" />
                              </div>
                         </div>
                    ))}
               </div>

               {/* Operational Status & Quick Management Skeleton */}
               <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* System Health Skeleton */}
                    <div className="rounded-3xl border border-border/60 bg-card/40 p-6 lg:col-span-2 space-y-6">
                         <div className="flex items-center justify-between border-b border-border/60 pb-4">
                              <Skeleton className="h-6 w-56 rounded-lg" />
                              <Skeleton className="h-4 w-20 rounded" />
                         </div>

                         <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                              {Array.from({ length: 3 }).map((_, i) => (
                                   <div key={i} className="rounded-2xl border border-border/50 p-4 space-y-3">
                                        <Skeleton className="h-4 w-24 rounded" />
                                        <Skeleton className="h-7 w-16 rounded-lg" />
                                        <Skeleton className="h-3 w-20 rounded" />
                                   </div>
                              ))}
                         </div>
                    </div>

                    {/* Quick Management Navigation Skeleton */}
                    <div className="rounded-3xl border border-border/60 bg-card/40 p-6 flex flex-col justify-between space-y-6">
                         <div className="space-y-2">
                              <Skeleton className="h-6 w-40 rounded-lg" />
                              <Skeleton className="h-3.5 w-48 rounded" />
                         </div>

                         <div className="space-y-2.5">
                              <Skeleton className="h-11 w-full rounded-xl" />
                              <Skeleton className="h-11 w-full rounded-xl" />
                              <Skeleton className="h-11 w-full rounded-xl" />
                         </div>
                    </div>
               </div>
          </div>
     )
}