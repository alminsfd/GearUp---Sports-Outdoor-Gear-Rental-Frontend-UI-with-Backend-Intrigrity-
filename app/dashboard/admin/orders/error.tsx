import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function OrderManagementSkeleton() {
     return (
          <div className="space-y-6 animate-pulse">
               {/* Table Container Skeleton */}
               <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/60 backdrop-blur-xl shadow-xl">
                    <div className="overflow-x-auto">
                         <table className="w-full text-left text-sm">
                              {/* Header */}
                              <thead className="border-b border-border/60 bg-muted/40 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                   <tr>
                                        <th scope="col" className="px-6 py-4">Order & Item</th>
                                        <th scope="col" className="px-6 py-4">Customer</th>
                                        <th scope="col" className="px-6 py-4">Provider</th>
                                        <th scope="col" className="px-6 py-4">Duration & Cost</th>
                                        <th scope="col" className="px-6 py-4">Payment</th>
                                        <th scope="col" className="px-6 py-4">Order Status</th>
                                        <th scope="col" className="px-6 py-4 text-right">Actions</th>
                                   </tr>
                              </thead>

                              {/* Rows */}
                              <tbody className="divide-y divide-border/40">
                                   {Array.from({ length: 5 }).map((_, idx) => (
                                        <tr key={idx} className="transition-colors">
                                             {/* Order & Item */}
                                             <td className="px-6 py-4">
                                                  <div className="space-y-2">
                                                       <div className="h-4 w-44 rounded bg-muted/80" />
                                                       <div className="h-3 w-20 rounded bg-muted/50" />
                                                  </div>
                                             </td>

                                             {/* Customer */}
                                             <td className="px-6 py-4">
                                                  <div className="flex items-center gap-2">
                                                       <div className="h-7 w-7 rounded-xl bg-muted/80 shrink-0" />
                                                       <div className="space-y-1.5">
                                                            <div className="h-3.5 w-24 rounded bg-muted/80" />
                                                            <div className="h-3 w-32 rounded bg-muted/50" />
                                                       </div>
                                                  </div>
                                             </td>

                                             {/* Provider */}
                                             <td className="px-6 py-4">
                                                  <div className="flex items-center gap-2">
                                                       <div className="h-7 w-7 rounded-xl bg-muted/80 shrink-0" />
                                                       <div className="space-y-1.5">
                                                            <div className="h-3.5 w-24 rounded bg-muted/80" />
                                                            <div className="h-3 w-32 rounded bg-muted/50" />
                                                       </div>
                                                  </div>
                                             </td>

                                             {/* Duration & Cost */}
                                             <td className="px-6 py-4">
                                                  <div className="space-y-1.5">
                                                       <div className="h-4 w-16 rounded bg-muted/80" />
                                                       <div className="h-3 w-24 rounded bg-muted/50" />
                                                  </div>
                                             </td>

                                             {/* Payment */}
                                             <td className="px-6 py-4">
                                                  <div className="space-y-1.5">
                                                       <div className="h-5 w-16 rounded-md bg-muted/70" />
                                                       <div className="h-3 w-20 rounded bg-muted/40" />
                                                  </div>
                                             </td>

                                             {/* Order Status */}
                                             <td className="px-6 py-4">
                                                  <div className="h-6 w-24 rounded-full bg-muted/70" />
                                             </td>

                                             {/* Action Button */}
                                             <td className="px-6 py-4 text-right">
                                                  <div className="ml-auto h-8 w-20 rounded-xl bg-muted/80" />
                                             </td>
                                        </tr>
                                   ))}
                              </tbody>
                         </table>
                    </div>

                    {/* Pagination Skeleton */}
                    <div className="flex flex-col gap-3 border-t border-border/60 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                         <div className="h-4 w-28 rounded bg-muted/70" />
                         <div className="flex items-center gap-2">
                              <div className="flex items-center gap-1 rounded-xl border border-border/60 bg-card/60 px-3 py-1.5 text-xs font-semibold text-muted-foreground/50 opacity-50">
                                   <ChevronLeft className="h-3.5 w-3.5" /> Previous
                              </div>
                              <div className="flex items-center gap-1 rounded-xl border border-border/60 bg-card/60 px-3 py-1.5 text-xs font-semibold text-muted-foreground/50 opacity-50">
                                   Next <ChevronRight className="h-3.5 w-3.5" />
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     );
}