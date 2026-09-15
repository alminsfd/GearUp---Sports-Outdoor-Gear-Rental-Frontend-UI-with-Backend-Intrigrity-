export default function OrdersLoading() {
     return (
          <div className="mx-auto max-w-7xl px-4 py-8 animate-pulse">
               {/* Header Skeleton */}
               <div className="mb-6 flex items-center justify-between">
                    <div className="space-y-2">
                         <div className="h-8 w-64 rounded-lg bg-muted"></div>
                         <div className="h-4 w-80 rounded-lg bg-muted"></div>
                    </div>
               </div>

               {/* Table Skeleton */}
               <div className="glass-panel overflow-hidden rounded-xl border border-border">
                    <div className="overflow-x-auto">
                         <table className="w-full text-left text-sm">
                              <thead className="border-b bg-muted/50">
                                   <tr>
                                        <th className="px-6 py-4"><div className="h-4 w-24 rounded bg-muted"></div></th>
                                        <th className="px-6 py-4"><div className="h-4 w-20 rounded bg-muted"></div></th>
                                        <th className="px-6 py-4"><div className="h-4 w-24 rounded bg-muted"></div></th>
                                        <th className="px-6 py-4"><div className="h-4 w-16 rounded bg-muted"></div></th>
                                        <th className="px-6 py-4"><div className="h-4 w-24 rounded bg-muted"></div></th>
                                        <th className="px-6 py-4 text-right"><div className="ml-auto h-4 w-16 rounded bg-muted"></div></th>
                                   </tr>
                              </thead>
                              <tbody className="divide-y divide-border">
                                   {Array.from({ length: 5 }).map((_, index) => (
                                        <tr key={index}>
                                             <td className="px-6 py-4">
                                                  <div className="flex items-center gap-3">
                                                       <div className="h-10 w-10 rounded-lg bg-muted"></div>
                                                       <div className="h-4 w-32 rounded bg-muted"></div>
                                                  </div>
                                             </td>
                                             <td className="px-6 py-4"><div className="h-4 w-16 rounded bg-muted"></div></td>
                                             <td className="px-6 py-4"><div className="h-4 w-16 rounded bg-muted"></div></td>
                                             <td className="px-6 py-4"><div className="h-6 w-20 rounded-full bg-muted"></div></td>
                                             <td className="px-6 py-4"><div className="h-4 w-24 rounded bg-muted"></div></td>
                                             <td className="px-6 py-4">
                                                  <div className="flex justify-end gap-2">
                                                       <div className="h-7 w-16 rounded-lg bg-muted"></div>
                                                  </div>
                                             </td>
                                        </tr>
                                   ))}
                              </tbody>
                         </table>
                    </div>
               </div>
          </div>
     );
}