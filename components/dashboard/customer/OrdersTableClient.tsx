'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CencelOrder } from '@/app/dashboard/_action/customar_action';
import { RentalOrder } from '@/types/orderDetails';
import { toast } from 'sonner';


interface OrdersTableClientProps {
     initialOrders: RentalOrder[];
}

export default function OrdersTableClient({ initialOrders }: OrdersTableClientProps) {
     const [orders, setOrders] = useState(initialOrders);
     const [cancellingId, setCancellingId] = useState<string | null>(null);

     // মূল Cancel API Execution
     const executeCancellation = async (id: string) => {
          setCancellingId(id);
          const toastId = toast.loading('Cancelling your order...');

          const res = await CencelOrder({ status: 'CANCELLED' }, id);

          if (res?.success) {
               setOrders((prev) =>
                    prev.map((item) => (item.id === id ? { ...item, status: 'CANCELLED' } : item))
               );
               toast.success('Order cancelled successfully!', { id: toastId });
          } else {
               toast.error(res?.message || 'Failed to cancel order', { id: toastId });
          }
          setCancellingId(null);
     };

     // Toast Confirmation Trigger
     const handleCancelOrder = (id: string) => {
          toast('Are you sure you want to cancel this order?', {
               description: 'This action cannot be undone.',
               action: {
                    label: 'Confirm Cancel',
                    onClick: () => executeCancellation(id),
               },
               cancel: {
                    label: 'Dismiss',
                    onClick: () => { },
               },
          });
     };

     const getStatusBadge = (status: RentalOrder['status']) => {
          const statusMap = {
               PLACED: 'bg-[hsl(var(--status-placed-bg))] text-[hsl(var(--status-placed-text))] border-[hsl(var(--status-placed-border))]',
               CONFIRMED: 'bg-[hsl(var(--status-confirmed-bg))] text-[hsl(var(--status-confirmed-text))] border-[hsl(var(--status-confirmed-border))]',
               PAID: 'bg-[hsl(var(--status-paid-bg))] text-[hsl(var(--status-paid-text))] border-[hsl(var(--status-paid-border))]',
               PICKED: 'bg-[hsl(var(--status-picked-bg))] text-[hsl(var(--status-picked-text))] border-[hsl(var(--status-picked-border))]',
               RETURNED: 'bg-[hsl(var(--status-returned-bg))] text-[hsl(var(--status-returned-text))] border-[hsl(var(--status-returned-border))]',
               CANCELLED: 'bg-[hsl(var(--status-cancelled-bg))] text-[hsl(var(--status-cancelled-text))] border-[hsl(var(--status-cancelled-border))]',
          };

          return (
               <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${statusMap[status] || ''}`}>
                    {status}
               </span>
          );
     };

     return (
          <div className="glass-panel overflow-hidden rounded-xl">
               <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                         <thead className="border-b bg-muted/50 text-xs uppercase text-muted-foreground">
                              <tr>
                                   <th className="px-6 py-4 font-semibold">Gear Item</th>
                                   <th className="px-6 py-4 font-semibold">Total Days</th>
                                   <th className="px-6 py-4 font-semibold">Total Amount</th>
                                   <th className="px-6 py-4 font-semibold">Status</th>
                                   <th className="px-6 py-4 font-semibold">Created At</th>
                                   <th className="px-6 py-4 text-right font-semibold">Actions</th>
                              </tr>
                         </thead>
                         <tbody className="divide-y divide-border">
                              {orders.map((order) => (
                                   <tr key={order.id} className="transition-colors hover:bg-muted/30">
                                        <td className="px-6 py-4">
                                             <div className="flex items-center gap-3">
                                                  {order.gearItem?.images?.[0] && (
                                                       <Image
                                                            src={order.gearItem.images[0]}
                                                            alt={order.gearItem.title}
                                                            width={40}
                                                            height={40}
                                                            className="rounded-lg object-cover"
                                                       />
                                                  )}
                                                  <span className="font-semibold text-foreground">
                                                       {order.gearItem?.title || 'N/A'}
                                                  </span>
                                             </div>
                                        </td>
                                        <td className="px-6 py-4 text-muted-foreground">{order.totalDays} Days</td>
                                        <td className="px-6 py-4 font-medium text-foreground">${order.totalAmount}</td>
                                        <td className="px-6 py-4">{getStatusBadge(order.status)}</td>
                                        <td className="px-6 py-4 text-muted-foreground">
                                             {new Date(order.createdAt).toLocaleDateString('en-US', {
                                                  year: 'numeric',
                                                  month: '2-digit',
                                                  day: '2-digit',
                                                  timeZone: 'UTC',
                                             })}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                             <div className="flex items-center justify-end gap-2">
                                                  <Link
                                                       href={`/dashboard/customer/orders/${order.id}`}
                                                       className="rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90"
                                                  >
                                                       Details
                                                  </Link>

                                                  {order.status === 'PLACED' && (
                                                       <button
                                                            onClick={() => handleCancelOrder(order.id)}
                                                            disabled={cancellingId === order.id}
                                                            className="rounded-lg bg-destructive px-3 py-1.5 text-xs font-medium text-destructive-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
                                                       >
                                                            {cancellingId === order.id ? 'Cancelling...' : 'Cancel'}
                                                       </button>
                                                  )}
                                             </div>
                                        </td>
                                   </tr>
                              ))}
                         </tbody>
                    </table>
               </div>
          </div>
     );
}