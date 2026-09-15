'use client';

import { useState, useMemo, useRef, useEffect, JSX } from 'react';
import Image from 'next/image';
import { toast } from 'sonner';
import {
     Search,
     ShoppingBag,
     Calendar,
     CreditCard,
     User,
     Phone,
     Mail,
     CheckCircle2,
     Clock,
     PackageCheck,
     RotateCcw,
     XCircle,
     Loader2,
     ChevronDown,
     Sparkles,
     ArrowRightLeft,
     Filter,
} from 'lucide-react';
import { OrderStatusChange } from '@/types/order';
import { UpdateRentalsStatus } from '@/app/dashboard/_action/provider_action';

export interface Customer {
     id: string;
     name: string;
     email: string;
     phone: string;
}

export interface GearItem {
     id: string;
     title: string;
     description: string;
     pricePerDay: number;
     brand: string;
     stock: number;
     isAvailable: boolean;
     images: string[];
}

export interface Payment {
     id: string;
     transactionId: string;
     amount: number;
     paymentMethod: string;
     status: string;
     paidAt: string;
}

export interface RentalOrder {
     id: string;
     startDate: string;
     endDate: string;
     totalDays: number;
     totalAmount: number;
     status: OrderStatusChange['status'];
     createdAt: string;
     updatedAt: string;
     customerId: string;
     gearItemId: string;
     gearItem: GearItem;
     customer: Customer;
     payment: Payment | null;
}

interface MyOrdersClientProps {
     initialOrders: RentalOrder[];
}

const STATUS_CONFIG: Record<
     OrderStatusChange['status'],
     { label: string; icon: JSX.Element; badgeClass: string; activeClass: string }
> = {
     PLACED: {
          label: 'Placed',
          icon: <Clock className="h-3.5 w-3.5" />,
          badgeClass: 'bg-status-placed-bg text-status-placed-text border-status-placed-border',
          activeClass: 'hover:bg-amber-500/15 text-amber-600 border-amber-500/30',
     },
     CONFIRMED: {
          label: 'Confirmed',
          icon: <CheckCircle2 className="h-3.5 w-3.5" />,
          badgeClass: 'bg-status-confirmed-bg text-status-confirmed-text border-status-confirmed-border',
          activeClass: 'hover:bg-sky-500/15 text-sky-600 border-sky-500/30',
     },
     PAID: {
          label: 'Paid',
          icon: <CreditCard className="h-3.5 w-3.5" />,
          badgeClass: 'bg-status-paid-bg text-status-paid-text border-status-paid-border',
          activeClass: 'hover:bg-purple-500/15 text-purple-600 border-purple-500/30',
     },
     PICKED_UP: {
          label: 'Picked Up',
          icon: <PackageCheck className="h-3.5 w-3.5" />,
          badgeClass: 'bg-status-picked-bg text-status-picked-text border-status-picked-border',
          activeClass: 'hover:bg-emerald-500/15 text-emerald-600 border-emerald-500/30',
     },
     RETURNED: {
          label: 'Returned',
          icon: <RotateCcw className="h-3.5 w-3.5" />,
          badgeClass: 'bg-status-returned-bg text-status-returned-text border-status-returned-border',
          activeClass: 'hover:bg-slate-500/15 text-slate-600 border-slate-500/30',
     },
     CANCELLED: {
          label: 'Cancelled',
          icon: <XCircle className="h-3.5 w-3.5" />,
          badgeClass: 'bg-status-cancelled-bg text-status-cancelled-text border-status-cancelled-border',
          activeClass: 'hover:bg-rose-500/15 text-rose-600 border-rose-500/30',
     },
};

const ALL_STATUSES: OrderStatusChange['status'][] = [
     'PLACED',
     'CONFIRMED',
     'PAID',
     'PICKED_UP',
     'RETURNED',
     'CANCELLED',
];

export default function MyOrdersClient({ initialOrders }: MyOrdersClientProps) {
     const [orders, setOrders] = useState<RentalOrder[]>(initialOrders);
     const [searchQuery, setSearchQuery] = useState('');
     const [statusFilter, setStatusFilter] = useState<string>('ALL');
     const [updatingId, setUpdatingId] = useState<string | null>(null);
     const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);

     // Dynamic dropdown close handler (Fixed Ref issue)
     const containerRef = useRef<HTMLTableSectionElement | null>(null);

     useEffect(() => {
          const handleClickOutside = (event: MouseEvent) => {
               const target = event.target as HTMLElement;
               if (!target.closest('.status-dropdown-container')) {
                    setActiveDropdownId(null);
               }
          };
          document.addEventListener('mousedown', handleClickOutside);
          return () => document.removeEventListener('mousedown', handleClickOutside);
     }, []);

     // Filter & Search Logic
     const filteredOrders = useMemo(() => {
          return orders.filter((order) => {
               const matchesSearch =
                    order.gearItem?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    order.customer?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    order.customer?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    order.id.toLowerCase().includes(searchQuery.toLowerCase());

               const matchesStatus = statusFilter === 'ALL' || order.status === statusFilter;

               return matchesSearch && matchesStatus;
          });
     }, [orders, searchQuery, statusFilter]);

     // Handle Order Status Update
     const handleStatusChange = async (orderId: string, newStatus: OrderStatusChange['status']) => {
          setActiveDropdownId(null);
          setUpdatingId(orderId);
          const toastId = toast.loading('Updating order status...');

          try {
               const payload: OrderStatusChange = { status: newStatus };
               const res = await UpdateRentalsStatus(payload, orderId);


               if (res?.success || res?.statusCode === 200 || res?.data) {
                    setOrders((prev) =>
                         prev.map((item) => (item.id === orderId ? { ...item, status: newStatus } : item))
                    );
                    toast.success(`Status updated to ${STATUS_CONFIG[newStatus].label}`, { id: toastId });
               } else {
                    toast.error(res?.message || 'Failed to update order status.', { id: toastId });
               }
          } catch (error: any) {
               toast.error(error?.message || 'An unexpected error occurred', { id: toastId });
          } finally {
               setUpdatingId(null);
          }
     };

     // Safe Date Formatter to Prevent Hydration Errors
     const formatDate = (dateStr: string) => {
          if (!dateStr) return '';
          const date = new Date(dateStr);
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const day = String(date.getDate()).padStart(2, '0');
          return `${year}-${month}-${day}`;
     };

     return (
          <div className="space-y-6">
               {/* Search & Filter Header */}
               <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="relative flex-1 max-w-md">
                         <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                         <input
                              type="text"
                              placeholder="Search customer, item name, or ID..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="w-full rounded-2xl border border-border bg-card/60 pl-10 pr-4 py-2.5 text-sm text-foreground shadow-xs placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all backdrop-blur-md"
                         />
                    </div>

                    {/* Status Filter Tabs */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
                         <Filter className="h-4 w-4 text-muted-foreground shrink-0 hidden md:block" />
                         <button
                              onClick={() => setStatusFilter('ALL')}
                              className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all whitespace-nowrap border ${statusFilter === 'ALL'
                                   ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                                   : 'bg-card text-muted-foreground border-border hover:bg-muted hover:text-foreground'
                                   }`}
                         >
                              All Orders ({orders.length})
                         </button>
                         {ALL_STATUSES.map((status) => (
                              <button
                                   key={status}
                                   onClick={() => setStatusFilter(status)}
                                   className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all whitespace-nowrap border ${statusFilter === status
                                        ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                                        : 'bg-card text-muted-foreground border-border hover:bg-muted hover:text-foreground'
                                        }`}
                              >
                                   {STATUS_CONFIG[status].label}
                              </button>
                         ))}
                    </div>
               </div>

               {/* Orders Table Container */}
               <div className="glass-panel overflow-hidden rounded-2xl shadow-xl">
                    <div className="overflow-x-auto">
                         <table className="w-full text-left text-sm">
                              <thead className="border-b border-border bg-muted/50 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                                   <tr>
                                        <th className="px-6 py-4">Equipment Listing</th>
                                        <th className="px-6 py-4">Customer Info</th>
                                        <th className="px-6 py-4">Rental Period</th>
                                        <th className="px-6 py-4">Payment Info</th>
                                        <th className="px-6 py-4">Current Status</th>
                                        <th className="px-6 py-4 text-right">Quick Action</th>
                                   </tr>
                              </thead>
                              <tbody ref={containerRef} className="divide-y divide-border/60">
                                   {filteredOrders.length === 0 ? (
                                        <tr>
                                             <td colSpan={6} className="px-6 py-16 text-center text-muted-foreground">
                                                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-muted/60 mb-3">
                                                       <ShoppingBag className="h-6 w-6 text-muted-foreground/50" />
                                                  </div>
                                                  <p className="font-semibold text-foreground">No rental orders match your filters</p>
                                                  <p className="text-xs text-muted-foreground mt-1">Try adjusting your search terms or filters.</p>
                                             </td>
                                        </tr>
                                   ) : (
                                        filteredOrders.map((order) => {
                                             const currentStatus = STATUS_CONFIG[order.status] || STATUS_CONFIG.PLACED;
                                             const isDropdownOpen = activeDropdownId === order.id;

                                             return (
                                                  <tr key={order.id} className="transition-colors hover:bg-muted/30 group">
                                                       {/* Equipment Listing */}
                                                       <td className="px-6 py-4">
                                                            <div className="flex items-center gap-3.5">
                                                                 <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-border/80 bg-muted shadow-xs transition-transform group-hover:scale-105">
                                                                      {order.gearItem?.images?.[0] ? (
                                                                           <Image
                                                                                src={order.gearItem.images[0]}
                                                                                alt={order.gearItem.title}
                                                                                fill
                                                                                className="object-cover"
                                                                           />
                                                                      ) : (
                                                                           <div className="flex h-full w-full items-center justify-center text-[10px] text-muted-foreground">
                                                                                No Image
                                                                           </div>
                                                                      )}
                                                                 </div>
                                                                 <div className="max-w-[200px] lg:max-w-xs">
                                                                      <span className="font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                                                                           {order.gearItem?.title || 'Gear Listing'}
                                                                      </span>
                                                                      <span className="text-[11px] font-mono text-muted-foreground">
                                                                           Order ID: #{order.id.slice(0, 8)}
                                                                      </span>
                                                                 </div>
                                                            </div>
                                                       </td>

                                                       {/* Customer Info */}
                                                       <td className="px-6 py-4">
                                                            <div className="space-y-1">
                                                                 <div className="flex items-center gap-1.5 font-medium text-foreground text-xs">
                                                                      <User className="h-3.5 w-3.5 text-muted-foreground" />
                                                                      {order.customer?.name}
                                                                 </div>
                                                                 <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                                                                      <Mail className="h-3 w-3 shrink-0" />
                                                                      <span className="truncate max-w-[150px]">{order.customer?.email}</span>
                                                                 </div>
                                                                 <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                                                                      <Phone className="h-3 w-3 shrink-0" />
                                                                      {order.customer?.phone}
                                                                 </div>
                                                            </div>
                                                       </td>

                                                       {/* Rental Period & Pricing */}
                                                       <td className="px-6 py-4">
                                                            <div className="space-y-1">
                                                                 <div className="flex items-baseline gap-1.5 font-bold text-foreground">
                                                                      <span className="text-base">${order.totalAmount}</span>
                                                                      <span className="text-xs font-normal text-muted-foreground">
                                                                           ({order.totalDays} {order.totalDays === 1 ? 'day' : 'days'})
                                                                      </span>
                                                                 </div>
                                                                 <div
                                                                      className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground"
                                                                      suppressHydrationWarning
                                                                 >
                                                                      <Calendar className="h-3 w-3 text-muted-foreground shrink-0" />
                                                                      {formatDate(order.startDate)} — {formatDate(order.endDate)}
                                                                 </div>
                                                            </div>
                                                       </td>

                                                       {/* Payment Status */}
                                                       <td className="px-6 py-4">
                                                            {order.payment ? (
                                                                 <div className="space-y-1">
                                                                      <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                                                                           <Sparkles className="h-2.5 w-2.5" />
                                                                           {order.payment.paymentMethod}
                                                                      </span>
                                                                      <p className="text-[11px] font-mono text-muted-foreground truncate max-w-[130px]">
                                                                           {order.payment.transactionId}
                                                                      </p>
                                                                 </div>
                                                            ) : (
                                                                 <span className="inline-block rounded-md bg-muted px-2 py-0.5 text-[11px] italic text-muted-foreground">
                                                                      Payment Pending
                                                                 </span>
                                                            )}
                                                       </td>

                                                       {/* Current Status Badge */}
                                                       <td className="px-6 py-4">
                                                            <span
                                                                 className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold shadow-2xs transition-all ${currentStatus.badgeClass}`}
                                                            >
                                                                 {currentStatus.icon}
                                                                 {currentStatus.label}
                                                            </span>
                                                       </td>

                                                       {/* Dynamic Action Button Dropdown */}
                                                       <td className="px-6 py-4 text-right">
                                                            <div className="status-dropdown-container relative inline-block text-left">
                                                                 {updatingId === order.id ? (
                                                                      <div className="inline-flex items-center gap-2 rounded-xl bg-muted/60 border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground">
                                                                           <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
                                                                           Updating...
                                                                      </div>
                                                                 ) : (
                                                                      <div>
                                                                           {/* Trigger Button */}
                                                                           <button
                                                                                type="button"
                                                                                onClick={() =>
                                                                                     setActiveDropdownId(isDropdownOpen ? null : order.id)
                                                                                }
                                                                                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/80 px-3 py-1.5 text-xs font-semibold text-foreground shadow-xs transition-all hover:border-primary/40 hover:bg-muted hover:shadow-md active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/20"
                                                                           >
                                                                                <ArrowRightLeft className="h-3.5 w-3.5 text-primary" />
                                                                                Change Status
                                                                                <ChevronDown
                                                                                     className={`h-3.5 w-3.5 text-muted-foreground transition-transform duration-200 ${isDropdownOpen ? 'rotate-180 text-primary' : ''
                                                                                          }`}
                                                                                />
                                                                           </button>

                                                                           {/* Interactive Floating Menu */}
                                                                           {isDropdownOpen && (
                                                                                <div className="absolute right-0 z-50 mt-2 w-44 origin-top-right rounded-2xl border border-border bg-popover/95 p-1.5 shadow-2xl backdrop-blur-xl animate-in fade-in-50 zoom-in-95 duration-150">
                                                                                     <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground border-b border-border/50 mb-1">
                                                                                          Set Order Status
                                                                                     </div>

                                                                                     <div className="space-y-0.5">
                                                                                          {ALL_STATUSES.map((statusKey) => {
                                                                                               const statusItem = STATUS_CONFIG[statusKey];
                                                                                               const isSelected = order.status === statusKey;

                                                                                               return (
                                                                                                    <button
                                                                                                         key={statusKey}
                                                                                                         type="button"
                                                                                                         onClick={() => handleStatusChange(order.id, statusKey)}
                                                                                                         className={`w-full flex items-center justify-between rounded-xl px-2.5 py-1.5 text-xs font-medium transition-colors ${isSelected
                                                                                                              ? 'bg-primary/10 text-primary font-bold'
                                                                                                              : 'text-popover-foreground hover:bg-muted'
                                                                                                              }`}
                                                                                                    >
                                                                                                         <div className="flex items-center gap-2">
                                                                                                              <span
                                                                                                                   className={`flex h-5 w-5 items-center justify-center rounded-lg border ${statusItem.badgeClass}`}
                                                                                                              >
                                                                                                                   {statusItem.icon}
                                                                                                              </span>
                                                                                                              {statusItem.label}
                                                                                                         </div>
                                                                                                         {isSelected && (
                                                                                                              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                                                                                         )}
                                                                                                    </button>
                                                                                               );
                                                                                          })}
                                                                                     </div>
                                                                                </div>
                                                                           )}
                                                                      </div>
                                                                 )}
                                                            </div>
                                                       </td>
                                                  </tr>
                                             );
                                        })
                                   )}
                              </tbody>
                         </table>
                    </div>
               </div>
          </div>
     );
}