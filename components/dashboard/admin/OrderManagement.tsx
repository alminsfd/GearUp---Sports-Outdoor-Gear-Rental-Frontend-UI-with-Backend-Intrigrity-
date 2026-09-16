'use client';

import { useState, useTransition } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import {
     ShoppingBag,
     Calendar,
     CreditCard,
     User,
     Store,
     Eye,
     ChevronLeft,
     ChevronRight,
     Loader2,
     Clock,
     CheckCircle2,
     AlertCircle,
     RotateCcw,
     ShieldCheck,
     Hash,
     X,
} from 'lucide-react';

export interface RentalOrder {
     id: string;
     startDate: string;
     endDate: string;
     totalDays: number;
     totalAmount: number;
     status: 'PENDING' | 'CONFIRMED' | 'ON_RENT' | 'RETURNED' | 'CANCELLED' | string;
     createdAt: string;
     updatedAt: string;
     customerId: string;
     gearItemId: string;
     customer: {
          id: string;
          name: string;
          email: string;
     };
     gearItem: {
          id: string;
          title: string;
          pricePerDay: number;
          provider: {
               id: string;
               name: string;
               email: string;
          };
     };
     payment: {
          id: string;
          transactionId: string;
          amount: number;
          paymentMethod: string;
          status: 'PAID' | 'UNPAID' | 'FAILED' | string;
          paidAt: string;
          createdAt: string;
          updatedAt: string;
          rentalOrderId: string;
     } | null;
}

interface OrderManagementProps {
     initialOrders: RentalOrder[];
     meta?: {
          page: number;
          limit: number;
          total: number;
          totalPage: number;
     };
}

export default function OrderManagement({ initialOrders, meta }: OrderManagementProps) {
     const router = useRouter();
     const pathname = usePathname();
     const searchParams = useSearchParams();

     const [isPending, startTransition] = useTransition();
     const [selectedOrder, setSelectedOrder] = useState<RentalOrder | null>(null);

     const currentPage = meta?.page || 1;
     const totalPages = meta?.totalPage || 1;

     const handlePageChange = (newPage: number) => {
          const params = new URLSearchParams(searchParams.toString());
          params.set('page', newPage.toString());

          startTransition(() => {
               router.push(`${pathname}?${params.toString()}`);
          });
     };

     const getStatusBadge = (status: string) => {
          switch (status) {
               case 'CONFIRMED':
                    return (
                         <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-500">
                              <CheckCircle2 className="h-3 w-3" />
                              Confirmed
                         </span>
                    );
               case 'RETURNED':
                    return (
                         <span className="inline-flex items-center gap-1 rounded-full border border-blue-500/20 bg-blue-500/10 px-2.5 py-1 text-xs font-semibold text-blue-500">
                              <RotateCcw className="h-3 w-3" />
                              Returned
                         </span>
                    );
               default:
                    return (
                         <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-1 text-xs font-semibold text-amber-500">
                              <Clock className="h-3 w-3" />
                              {status}
                         </span>
                    );
          }
     };

     return (
          <div className="space-y-6">
               <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/60 backdrop-blur-xl shadow-xl">
                    {isPending && (
                         <div className="absolute inset-0 z-20 flex items-center justify-center bg-background/20 backdrop-blur-[2px]">
                              <Loader2 className="h-7 w-7 animate-spin text-primary" />
                         </div>
                    )}

                    <div className="overflow-x-auto">
                         <table className="w-full text-left text-sm">
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

                              <tbody className="divide-y divide-border/40 font-medium">
                                   {initialOrders.length > 0 ? (
                                        initialOrders.map((order) => (
                                             <tr key={order.id} className="transition-colors hover:bg-muted/30">
                                                  {/* Order ID & Item Title */}
                                                  <td className="px-6 py-4">
                                                       <div className="space-y-1">
                                                            <p className="line-clamp-1 font-semibold text-foreground max-w-xs">
                                                                 {order.gearItem?.title}
                                                            </p>
                                                            <div className="flex items-center gap-1 text-[11px] font-mono text-muted-foreground">
                                                                 <Hash className="h-3 w-3 shrink-0" />
                                                                 <span>{order.id.slice(0, 8)}...</span>
                                                            </div>
                                                       </div>
                                                  </td>

                                                  {/* Customer Info */}
                                                  <td className="px-6 py-4">
                                                       <div className="flex items-center gap-2">
                                                            <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-primary/10 text-xs font-bold text-primary">
                                                                 <User className="h-3.5 w-3.5" />
                                                            </div>
                                                            <div>
                                                                 <p className="text-xs font-semibold text-foreground">{order.customer?.name}</p>
                                                                 <p className="text-[11px] text-muted-foreground">{order.customer?.email}</p>
                                                            </div>
                                                       </div>
                                                  </td>

                                                  {/* Provider Info */}
                                                  <td className="px-6 py-4">
                                                       <div className="flex items-center gap-2">
                                                            <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-muted text-xs font-bold text-muted-foreground">
                                                                 <Store className="h-3.5 w-3.5" />
                                                            </div>
                                                            <div>
                                                                 <p className="text-xs font-semibold text-foreground">{order.gearItem?.provider?.name}</p>
                                                                 <p className="text-[11px] text-muted-foreground">{order.gearItem?.provider?.email}</p>
                                                            </div>
                                                       </div>
                                                  </td>

                                                  {/* Duration & Cost */}
                                                  <td className="px-6 py-4">
                                                       <div>
                                                            <p className="font-extrabold text-foreground">${order.totalAmount}</p>
                                                            <p className="text-xs text-muted-foreground">{order.totalDays} Days (${order.gearItem?.pricePerDay}/day)</p>
                                                       </div>
                                                  </td>

                                                  {/* Payment Status */}
                                                  <td className="px-6 py-4">
                                                       {order.payment ? (
                                                            <div className="space-y-1">
                                                                 <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-500 border border-emerald-500/20">
                                                                      <CreditCard className="h-3 w-3" />
                                                                      {order.payment.status}
                                                                 </span>
                                                                 <p className="text-[10px] font-mono text-muted-foreground">{order.payment.paymentMethod}</p>
                                                            </div>
                                                       ) : (
                                                            <span className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-0.5 text-[11px] font-semibold text-muted-foreground border border-border/50">
                                                                 <AlertCircle className="h-3 w-3" />
                                                                 UNPAID
                                                            </span>
                                                       )}
                                                  </td>

                                                  {/* Status Badge */}
                                                  <td className="px-6 py-4">
                                                       {getStatusBadge(order.status)}
                                                  </td>

                                                  {/* Action Button */}
                                                  <td className="px-6 py-4 text-right">
                                                       <button
                                                            onClick={() => setSelectedOrder(order)}
                                                            className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card/60 px-3 py-1.5 text-xs font-semibold text-foreground transition-all hover:border-primary/50 hover:bg-muted active:scale-95 cursor-pointer"
                                                       >
                                                            <Eye className="h-3.5 w-3.5 text-primary" />
                                                            Details
                                                       </button>
                                                  </td>
                                             </tr>
                                        ))
                                   ) : (
                                        <tr>
                                             <td colSpan={7} className="py-12 text-center text-muted-foreground">
                                                  <div className="flex flex-col items-center justify-center gap-2">
                                                       <ShoppingBag className="h-8 w-8 text-muted-foreground/50" />
                                                       <p className="text-sm font-medium">No rental orders found.</p>
                                                  </div>
                                             </td>
                                        </tr>
                                   )}
                              </tbody>
                         </table>
                    </div>

                    {/* Pagination Control */}
                    <div className="flex flex-col gap-3 border-t border-border/60 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                         <p className="text-xs font-medium text-muted-foreground">
                              Page <span className="font-bold text-foreground">{currentPage}</span> of{' '}
                              <span className="font-bold text-foreground">{totalPages}</span>
                         </p>

                         <div className="flex items-center gap-2">
                              <button
                                   disabled={currentPage <= 1}
                                   onClick={() => handlePageChange(currentPage - 1)}
                                   className="inline-flex items-center gap-1 rounded-xl border border-border/60 bg-card/60 px-3 py-1.5 text-xs font-semibold transition-all hover:bg-muted disabled:opacity-40 cursor-pointer"
                              >
                                   <ChevronLeft className="h-3.5 w-3.5" /> Previous
                              </button>
                              <button
                                   disabled={currentPage >= totalPages}
                                   onClick={() => handlePageChange(currentPage + 1)}
                                   className="inline-flex items-center gap-1 rounded-xl border border-border/60 bg-card/60 px-3 py-1.5 text-xs font-semibold transition-all hover:bg-muted disabled:opacity-40 cursor-pointer"
                              >
                                   Next <ChevronRight className="h-3.5 w-3.5" />
                              </button>
                         </div>
                    </div>
               </div>

               {/* Modal View for Detailed Order Breakdown */}
               {selectedOrder && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
                         <div className="w-full max-w-xl overflow-hidden rounded-3xl border border-border/80 bg-background p-6 shadow-2xl space-y-6">
                              <div className="flex items-center justify-between border-b border-border/60 pb-4">
                                   <div className="space-y-1">
                                        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Order Inspection</span>
                                        <h3 className="text-lg font-bold text-foreground">{selectedOrder.gearItem?.title}</h3>
                                   </div>
                                   <button
                                        onClick={() => setSelectedOrder(null)}
                                        className="rounded-full p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                                   >
                                        <X className="h-5 w-5" />
                                   </button>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                   <div className="rounded-2xl border border-border/50 bg-card/40 p-3 space-y-1">
                                        <span className="text-[10px] uppercase font-bold text-muted-foreground">Customer</span>
                                        <p className="text-xs font-semibold text-foreground">{selectedOrder.customer?.name}</p>
                                        <p className="text-[11px] text-muted-foreground">{selectedOrder.customer?.email}</p>
                                   </div>

                                   <div className="rounded-2xl border border-border/50 bg-card/40 p-3 space-y-1">
                                        <span className="text-[10px] uppercase font-bold text-muted-foreground">Equipment Owner</span>
                                        <p className="text-xs font-semibold text-foreground">{selectedOrder.gearItem?.provider?.name}</p>
                                        <p className="text-[11px] text-muted-foreground">{selectedOrder.gearItem?.provider?.email}</p>
                                   </div>
                              </div>

                              <div className="rounded-2xl border border-border/50 bg-muted/20 p-4 space-y-3">
                                   <div className="flex items-center justify-between">
                                        <span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                                             <Calendar className="h-4 w-4 text-primary" /> Rental Schedule
                                        </span>
                                        <span className="text-xs font-bold text-foreground">{selectedOrder.totalDays} Total Days</span>
                                   </div>
                                   <div className="grid grid-cols-2 gap-2 text-xs">
                                        <div>
                                             <p className="text-[10px] text-muted-foreground">Start Date</p>
                                             <p className="font-semibold text-foreground">{new Date(selectedOrder.startDate).toLocaleString()}</p>
                                        </div>
                                        <div>
                                             <p className="text-[10px] text-muted-foreground">End Date</p>
                                             <p className="font-semibold text-foreground">{new Date(selectedOrder.endDate).toLocaleString()}</p>
                                        </div>
                                   </div>
                              </div>

                              {selectedOrder.payment ? (
                                   <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 space-y-2">
                                        <div className="flex items-center justify-between">
                                             <span className="text-xs font-bold text-emerald-500 flex items-center gap-1.5">
                                                  <ShieldCheck className="h-4 w-4" /> Payment Ledger
                                             </span>
                                             <span className="text-xs font-extrabold text-foreground">${selectedOrder.payment.amount}</span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2 text-[11px] text-muted-foreground font-mono">
                                             <div>
                                                  <p className="text-[10px]">Transaction ID</p>
                                                  <p className="font-bold text-foreground">{selectedOrder.payment.transactionId}</p>
                                             </div>
                                             <div>
                                                  <p className="text-[10px]">Gateway</p>
                                                  <p className="font-bold text-foreground">{selectedOrder.payment.paymentMethod}</p>
                                             </div>
                                        </div>
                                   </div>
                              ) : (
                                   <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 flex items-center gap-2 text-amber-500 text-xs font-medium">
                                        <AlertCircle className="h-4 w-4 shrink-0" />
                                        No verified payment transaction recorded for this rental order.
                                   </div>
                              )}

                              <div className="flex justify-end border-t border-border/60 pt-4">
                                   <button
                                        onClick={() => setSelectedOrder(null)}
                                        className="rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-md transition-all hover:bg-primary/90"
                                   >
                                        Close View
                                   </button>
                              </div>
                         </div>
                    </div>
               )}
          </div>
     );
}