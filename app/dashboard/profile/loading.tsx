import { Skeleton } from '@/components/ui/skeleton'

export default function ProfileLoading() {
     return (
          <div className="container mx-auto max-w-5xl space-y-6 px-4 py-8">
               {/* Banner Skeleton */}
               <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-card p-6 shadow-sm">
                    <div className="h-32 rounded-2xl bg-muted/60 sm:h-40" />
                    <div className="-mt-14 flex flex-col items-start gap-4 px-4 sm:-mt-16 sm:flex-row sm:items-end sm:justify-between">
                         <div className="flex items-end gap-4">
                              <Skeleton className="size-24 rounded-2xl border-4 border-card sm:size-28" />
                              <div className="space-y-2 mb-2">
                                   <Skeleton className="h-6 w-48 rounded-lg" />
                                   <Skeleton className="h-4 w-32 rounded-lg" />
                              </div>
                         </div>
                         <Skeleton className="h-10 w-32 rounded-xl" />
                    </div>
               </div>

               {/* Grid Skeleton */}
               <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <div className="space-y-6 lg:col-span-2">
                         <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-sm space-y-4">
                              <Skeleton className="h-4 w-36 rounded-lg" />
                              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                   <Skeleton className="h-20 w-full rounded-2xl" />
                                   <Skeleton className="h-20 w-full rounded-2xl" />
                                   <Skeleton className="h-20 w-full rounded-2xl" />
                                   <Skeleton className="h-20 w-full rounded-2xl" />
                              </div>
                         </div>
                    </div>

                    <div className="space-y-6">
                         <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-sm space-y-4">
                              <Skeleton className="h-4 w-32 rounded-lg" />
                              <Skeleton className="h-6 w-full rounded-lg" />
                              <Skeleton className="h-6 w-full rounded-lg" />
                              <Skeleton className="h-6 w-full rounded-lg" />
                         </div>
                    </div>
               </div>
          </div>
     )
}