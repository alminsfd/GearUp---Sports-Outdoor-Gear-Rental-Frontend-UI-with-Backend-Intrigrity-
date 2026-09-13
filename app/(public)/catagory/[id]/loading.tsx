export default function CategoryLoading() {
     return (
          <div className="min-h-screen py-8 animate-pulse">
               <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Breadcrumb Skeleton */}
                    <div className="mb-6 h-4 w-48 rounded-lg bg-muted" />

                    {/* Hero Banner Skeleton */}
                    <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-border">
                         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                              <div className="lg:col-span-7 space-y-4">
                                   <div className="h-6 w-32 rounded-full bg-muted" />
                                   <div className="h-10 w-3/4 rounded-xl bg-muted" />
                                   <div className="h-4 w-full rounded-lg bg-muted" />
                                   <div className="h-4 w-2/3 rounded-lg bg-muted" />
                                   <div className="flex gap-3 pt-2">
                                        <div className="h-8 w-28 rounded-xl bg-muted" />
                                        <div className="h-8 w-28 rounded-xl bg-muted" />
                                   </div>
                              </div>
                              <div className="lg:col-span-5 h-56 sm:h-72 w-full rounded-2xl bg-muted" />
                         </div>
                    </div>

                    {/* Header Skeleton */}
                    <div className="mt-12 flex justify-between items-center border-b border-border pb-4">
                         <div className="space-y-2">
                              <div className="h-6 w-56 rounded-lg bg-muted" />
                              <div className="h-3 w-40 rounded-lg bg-muted" />
                         </div>
                         <div className="h-8 w-32 rounded-xl bg-muted" />
                    </div>

                    {/* Grid Skeleton */}
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                         {[1, 2, 3].map((index) => (
                              <div
                                   key={index}
                                   className="rounded-2xl border border-border bg-card p-4 space-y-4 shadow-sm"
                              >
                                   <div className="h-48 w-full rounded-xl bg-muted" />
                                   <div className="space-y-2">
                                        <div className="h-4 w-1/3 rounded-lg bg-muted" />
                                        <div className="h-5 w-5/6 rounded-lg bg-muted" />
                                   </div>
                                   <div className="flex justify-between items-center pt-2 border-t border-border">
                                        <div className="h-8 w-20 rounded-lg bg-muted" />
                                        <div className="h-8 w-24 rounded-xl bg-muted" />
                                   </div>
                              </div>
                         ))}
                    </div>

               </div>
          </div>
     );
}