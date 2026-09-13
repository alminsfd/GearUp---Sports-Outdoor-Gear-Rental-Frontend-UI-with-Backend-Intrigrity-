export default function Loading() {
     return (
          <div className="min-h-screen bg-slate-50/50 py-12">
               <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-10 animate-pulse space-y-3">
                         <div className="h-4 w-28 rounded bg-slate-200" />
                         <div className="h-8 w-64 rounded bg-slate-200" />
                         <div className="h-4 w-96 rounded bg-slate-200" />
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                         {[...Array(6)].map((_, i) => (
                              <div key={i} className="h-52 animate-pulse rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                                   <div className="flex items-center justify-between">
                                        <div className="h-14 w-14 rounded-xl bg-slate-200" />
                                        <div className="h-6 w-16 rounded-full bg-slate-200" />
                                   </div>
                                   <div className="mt-4 h-6 w-3/4 rounded bg-slate-200" />
                                   <div className="mt-2 h-4 w-full rounded bg-slate-200" />
                                   <div className="mt-1 h-4 w-2/3 rounded bg-slate-200" />
                              </div>
                         ))}
                    </div>
               </div>
          </div>
     );
}