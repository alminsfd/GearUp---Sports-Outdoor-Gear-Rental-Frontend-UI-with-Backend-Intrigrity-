'use client';

import { useState, useTransition } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import {
     Search,
     Filter,
     UserCheck,
     UserX,
     ChevronLeft,
     ChevronRight,
     Loader2,
     Users,
} from 'lucide-react';
import { UserStatus } from '@/types/admin';
import { updateUserStatus } from '@/app/dashboard/_action/admin_action';

export interface IUser {
     id: string;
     name: string;
     email: string;
     role: string;
     status: UserStatus;
     createdAt?: string;
}

interface UserManagementProps {
     initialUsers: IUser[];
     meta: {
          page: number;
          limit: number;
          total: number;
          totalPage: number;
     };
}

export default function UserManagement({ initialUsers, meta }: UserManagementProps) {
     const router = useRouter();
     const pathname = usePathname();
     const searchParams = useSearchParams();

     const [isPending, startTransition] = useTransition();
     const [updatingId, setUpdatingId] = useState<string | null>(null);

     // Filters State
     const searchTerm = searchParams.get('searchTerm') || '';
     const selectedRole = searchParams.get('role') || 'ALL';
     const selectedStatus = searchParams.get('status') || 'ALL';

     // Update Query Params
     const updateQueryParams = (key: string, value: string) => {
          const params = new URLSearchParams(searchParams.toString());
          if (value && value !== 'ALL') {
               params.set(key, value);
          } else {
               params.delete(key);
          }
          // Page reset to 1 on filter change
          if (key !== 'page') params.set('page', '1');

          startTransition(() => {
               router.push(`${pathname}?${params.toString()}`);
          });
     };

     // Status Action Handler
     const handleToggleStatus = async (user: IUser) => {
          const newStatus: UserStatus = user.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
          setUpdatingId(user.id);

          try {
               const res = await updateUserStatus(user.id, newStatus);
               if (res.success) {
                    startTransition(() => {
                         router.refresh();
                    });
               } else {
                    alert(res.message || 'Failed to update user status.');
               }
          } catch (err) {
               console.error(err);
          } finally {
               setUpdatingId(null);
          }
     };

     return (
          <div className="space-y-6">
               {/* Top Header Controls */}
               <div className="glass-panel flex flex-col gap-4 rounded-3xl p-5 md:flex-row md:items-center md:justify-between">
                    {/* Search Input */}
                    <div className="relative flex-1">
                         <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                         <input
                              type="text"
                              placeholder="Search by name or email..."
                              defaultValue={searchTerm}
                              onChange={(e) => updateQueryParams('searchTerm', e.target.value)}
                              className="w-full rounded-2xl border border-border/60 bg-background/50 py-2.5 pl-10 pr-4 text-sm font-medium transition-all placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                         />
                    </div>

                    {/* Filter Dropdowns */}
                    <div className="flex flex-wrap items-center gap-3">
                         <div className="flex items-center gap-2 rounded-2xl border border-border/60 bg-background/50 px-3 py-1.5">
                              <Filter className="h-3.5 w-3.5 text-muted-foreground" />
                              <select
                                   value={selectedRole}
                                   onChange={(e) => updateQueryParams('role', e.target.value)}
                                   className="bg-transparent text-xs font-semibold focus:outline-none cursor-pointer"
                              >
                                   <option value="ALL">All Roles</option>
                                   <option value="CUSTOMER">Customer</option>
                                   <option value="PROVIDER">PROVIDER</option>
                                   <option value="ADMIN">Admin</option>
                              </select>
                         </div>

                         <div className="flex items-center gap-2 rounded-2xl border border-border/60 bg-background/50 px-3 py-1.5">
                              <select
                                   value={selectedStatus}
                                   onChange={(e) => updateQueryParams('status', e.target.value)}
                                   className="bg-transparent text-xs font-semibold focus:outline-none cursor-pointer"
                              >
                                   <option value="ALL">All Status</option>
                                   <option value="ACTIVE">Active</option>
                                   <option value="SUSPENDED">Suspended</option>
                              </select>
                         </div>
                    </div>
               </div>

               {/* Main Table Panel */}
               <div className="glass-panel relative overflow-hidden rounded-3xl border border-border/60 shadow-xl">
                    {isPending && (
                         <div className="absolute inset-0 z-20 flex items-center justify-center bg-background/20 backdrop-blur-[2px]">
                              <Loader2 className="h-7 w-7 animate-spin text-primary" />
                         </div>
                    )}

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

                              <tbody className="divide-y divide-border/40 font-medium">
                                   {initialUsers.length > 0 ? (
                                        initialUsers.map((user) => {
                                             const isUpdating = updatingId === user.id;

                                             return (
                                                  <tr
                                                       key={user.id}
                                                       className="transition-colors hover:bg-muted/30"
                                                  >
                                                       {/* Name & Email */}
                                                       <td className="px-6 py-4">
                                                            <div className="flex items-center gap-3">
                                                                 <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-sm font-bold text-primary">
                                                                      {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                                                 </div>
                                                                 <div>
                                                                      <p className="font-semibold text-foreground">{user.name}</p>
                                                                      <p className="text-xs text-muted-foreground">{user.email}</p>
                                                                 </div>
                                                            </div>
                                                       </td>

                                                       {/* Role Badge */}
                                                       <td className="px-6 py-4">
                                                            <span className="inline-flex items-center rounded-xl border border-border bg-card px-2.5 py-1 text-xs font-semibold text-foreground">
                                                                 {user.role}
                                                            </span>
                                                       </td>

                                                       {/* Status Badge */}
                                                       <td className="px-6 py-4">
                                                            {user.status === 'ACTIVE' ? (
                                                                 <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-500">
                                                                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                                                      Active
                                                                 </span>
                                                            ) : (
                                                                 <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-500/20 bg-rose-500/10 px-2.5 py-1 text-xs font-semibold text-rose-500">
                                                                      <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                                                                      Suspended
                                                                 </span>
                                                            )}
                                                       </td>

                                                       {/* Actions */}
                                                       <td className="px-6 py-4 text-right">
                                                            <button
                                                                 disabled={isUpdating}
                                                                 onClick={() => handleToggleStatus(user)}
                                                                 className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all active:scale-95 disabled:opacity-50 ${user.status === 'ACTIVE'
                                                                      ? 'border-rose-500/30 bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white'
                                                                      : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white'
                                                                      }`}
                                                            >
                                                                 {isUpdating ? (
                                                                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                                                 ) : user.status === 'ACTIVE' ? (
                                                                      <>
                                                                           <UserX className="h-3.5 w-3.5" />
                                                                           Suspend
                                                                      </>
                                                                 ) : (
                                                                      <>
                                                                           <UserCheck className="h-3.5 w-3.5" />
                                                                           Activate
                                                                      </>
                                                                 )}
                                                            </button>
                                                       </td>
                                                  </tr>
                                             );
                                        })
                                   ) : (
                                        <tr>
                                             <td colSpan={4} className="py-12 text-center text-muted-foreground">
                                                  <div className="flex flex-col items-center justify-center gap-2">
                                                       <Users className="h-8 w-8 text-muted-foreground/50" />
                                                       <p className="text-sm font-medium">No users found matching criteria.</p>
                                                  </div>
                                             </td>
                                        </tr>
                                   )}
                              </tbody>
                         </table>
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex flex-col gap-3 border-t border-border/60 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                         <p className="text-xs font-medium text-muted-foreground">
                              Showing Page <span className="font-bold text-foreground">{meta.page}</span> of{' '}
                              <span className="font-bold text-foreground">{meta.totalPage || 1}</span>
                         </p>

                         <div className="flex items-center gap-2">
                              <button
                                   disabled={meta.page <= 1}
                                   onClick={() => updateQueryParams('page', (meta.page - 1).toString())}
                                   className="inline-flex items-center gap-1 rounded-xl border border-border/60 bg-card/60 px-3 py-1.5 text-xs font-semibold transition-all hover:bg-muted disabled:opacity-40"
                              >
                                   <ChevronLeft className="h-3.5 w-3.5" /> Previous
                              </button>
                              <button
                                   disabled={meta.page >= meta.totalPage}
                                   onClick={() => updateQueryParams('page', (meta.page + 1).toString())}
                                   className="inline-flex items-center gap-1 rounded-xl border border-border/60 bg-card/60 px-3 py-1.5 text-xs font-semibold transition-all hover:bg-muted disabled:opacity-40"
                              >
                                   Next <ChevronRight className="h-3.5 w-3.5" />
                              </button>
                         </div>
                    </div>
               </div>
          </div>
     );
}