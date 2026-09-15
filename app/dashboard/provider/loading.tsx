export default function ProviderOverviewLoading() {
     return (
          <div className="mx-auto max-w-7xl px-4 py-8 animate-pulse space-y-8">
               {/* Header Skeleton */}
               <div className="space-y-2">
                    <div className="h-8 w-64 rounded-lg bg-muted"></div>
                    <div className="h-4 w-96 rounded-lg bg-muted"></div>
               </div>

               {/* Stats Cards Skeleton */}
               <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {Array.from({ length: 4 }).map((_, index) => (
                         <div key={index} className="glass-panel rounded-xl p-5 border border-border space-y-3">
                              <div className="h-3 w-28 rounded bg-muted"></div>
                              <div className="h-8 w-16 rounded-lg bg-muted"></div>
                         </div>
                    ))}
               </div>

               {/* Listed Gear Table Skeleton */}
               <div className="space-y-4">
                    <div className="flex items-center justify-between">
                         <div className="h-6 w-36 rounded bg-muted"></div>
                         <div className="h-4 w-16 rounded bg-muted"></div>
                    </div>

                    <div className="glass-panel overflow-hidden rounded-xl border border-border">
                         <div className="p-4 space-y-4">
                              {Array.from({ length: 3 }).map((_, index) => (
                                   <div key={index} className="flex items-center justify-between border-b border-border/50 pb-3">
                                        <div className="flex items-center gap-3">
                                             <div className="h-10 w-10 rounded-lg bg-muted"></div>
                                             <div className="h-4 w-40 rounded bg-muted"></div>
                                        </div>
                                        <div className="h-4 w-20 rounded bg-muted"></div>
                                        <div className="h-4 w-16 rounded bg-muted"></div>
                                   </div>
                              ))}
                         </div>
                    </div>
               </div>

               {/* Recent Orders Table Skeleton */}
               <div className="space-y-4">
                    <div className="flex items-center justify-between">
                         <div className="h-6 w-40 rounded bg-muted"></div>
                         <div className="h-4 w-24 rounded bg-muted"></div>
                    </div>

                    <div className="glass-panel overflow-hidden rounded-xl border border-border">
                         <div className="p-4 space-y-4">
                              {Array.from({ length: 3 }).map((_, index) => (
                                   <div key={index} className="flex items-center justify-between border-b border-border/50 pb-3">
                                        <div className="flex items-center gap-3">
                                             <div className="h-10 w-10 rounded-lg bg-muted"></div>
                                             <div className="h-4 w-44 rounded bg-muted"></div>
                                        </div>
                                        <div className="h-6 w-20 rounded-full bg-muted"></div>
                                        <div className="h-7 w-16 rounded-lg bg-muted"></div>
                                   </div>
                              ))}
                         </div>
                    </div>
               </div>
          </div>
     );
}