export default function OrderDetailsLoading() {
     return (
          <div className="mx-auto max-w-4xl px-4 py-8 animate-pulse space-y-6">
               {/* Top Back Navigation Skeleton */}
               <div className="flex items-center justify-between">
                    <div className="h-4 w-28 rounded bg-muted"></div>
                    <div className="h-4 w-40 rounded bg-muted"></div>
               </div>

               {/* Main Card Skeleton */}
               <div className="glass-panel space-y-6 rounded-2xl p-6 border border-border">
                    <div className="flex items-start justify-between border-b pb-4">
                         <div className="space-y-2">
                              <div className="h-7 w-48 rounded-lg bg-muted"></div>
                              <div className="h-4 w-24 rounded bg-muted"></div>
                         </div>
                         <div className="h-6 w-20 rounded-full bg-muted"></div>
                    </div>

                    {/* Image Skeleton */}
                    <div className="h-64 w-full rounded-xl bg-muted"></div>

                    {/* Info Grid Skeleton */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                         <div className="space-y-3 rounded-xl bg-muted/40 p-4">
                              <div className="h-5 w-24 rounded bg-muted"></div>
                              <div className="space-y-2">
                                   <div className="h-4 w-full rounded bg-muted"></div>
                                   <div className="h-4 w-3/4 rounded bg-muted"></div>
                                   <div className="h-4 w-1/2 rounded bg-muted"></div>
                              </div>
                         </div>
                         <div className="space-y-3 rounded-xl bg-muted/40 p-4">
                              <div className="h-5 w-24 rounded bg-muted"></div>
                              <div className="space-y-2">
                                   <div className="h-4 w-full rounded bg-muted"></div>
                                   <div className="h-4 w-3/4 rounded bg-muted"></div>
                                   <div className="h-4 w-1/2 rounded bg-muted"></div>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     );
}