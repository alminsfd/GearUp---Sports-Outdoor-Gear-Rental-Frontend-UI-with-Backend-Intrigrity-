import { Search, Filter } from 'lucide-react';

export default function UserManagementSkeleton() {
     return (
          <div className="space-y-6 animate-pulse">
               {/* Header Skeleton */}
               <div className="glass-panel flex flex-col gap-4 rounded-3xl p-5 md:flex-row md:items-center md:justify-between border border-border/60">
                    {/* Search Input Placeholder */}
                    <div className="relative flex-1">
                         <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/40" />
                         <div className="h-10 w-full rounded-2xl bg-muted/60" />
                    </div>

                    {/* Filters Placeholder */}
                    <div className="flex flex-wrap items-center gap-3">
                         <div className="flex items-center gap-2 rounded-2xl border border-border/60 bg-muted/40 px-3 py-2">
                              <Filter className="h-3.5 w-3.5 text-muted-foreground/40" />
                              <div className="h-4 w-20 rounded bg-muted/80" />
                         </div>

                         <div className="flex items-center gap-2 rounded-2xl border border-border/60 bg-muted/40 px-3 py-2">
                              <div className="h-4 w-20 rounded bg-muted/80" />
                         </div>
                    </div>
               </div>

               {/* Table Skeleton */}
               <div className="glass-panel relative overflow-hidden rounded-3xl border border-border/60 shadow-xl">
                    <div className="overflow-x-auto">
                         <table className="w-full text-left text-sm">
                              <thead className="border-b border-border/60 bg-muted/40 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                   <tr>
                                        <th scope="col" className="px-6 py-4">User</th>
                                        <th scope="col" className="px-6 py-4">Role</th>
                                        <th scope="col" className="px-6 py-4">Status</th>
                                        <th scope="col" className="px-6 py-4 text-right">Actions</th>
                                   </tr>
                              </thead>

                              <tbody className="divide-y divide-border/40">
                                   {Array.from({ length: 5 }).map((_, idx) => (
                                        <tr key={idx} className="transition-colors">
                                             {/* User Column */}
                                             <td className="px-6 py-4">
                                                  <div className="flex items-center gap-3">
                                                       <div className="h-10 w-10 shrink-0 rounded-2xl bg-muted/80" />
                                                       <div className="space-y-2">
                                                            <div className="h-4 w-32 rounded bg-muted/80" />
                                                            <div className="h-3 w-44 rounded bg-muted/50" />
                                                       </div>
                                                  </div>
                                             </td>

                                             {/* Role Column */}
                                             <td className="px-6 py-4">
                                                  <div className="h-6 w-20 rounded-xl bg-muted/70" />
                                             </td>

                                             {/* Status Column */}
                                             <td className="px-6 py-4">
                                                  <div className="h-6 w-24 rounded-full bg-muted/70" />
                                             </td>

                                             {/* Action Column */}
                                             <td className="px-6 py-4 text-right">
                                                  <div className="ml-auto h-8 w-24 rounded-xl bg-muted/80" />
                                             </td>
                                        </tr>
                                   ))}
                              </tbody>
                         </table>
                    </div>

                    {/* Pagination Skeleton */}
                    <div className="flex flex-col gap-3 border-t border-border/60 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                         <div className="h-4 w-36 rounded bg-muted/70" />
                         <div className="flex items-center gap-2">
                              <div className="h-8 w-24 rounded-xl bg-muted/70" />
                              <div className="h-8 w-20 rounded-xl bg-muted/70" />
                         </div>
                    </div>
               </div>
          </div>
     );
}