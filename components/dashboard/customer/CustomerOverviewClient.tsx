'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
     Package,
     CreditCard,
     Star,
     ExternalLink,
     Calendar,
     Clock,
     CheckCircle2,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { IUser } from '@/types/user'
import { Payment, RentalOrder } from '@/types/order'
import ReviewModal from './ReviewModal'

interface CustomerOverviewClientProps {
     user: IUser
     stats: {
          totalRentals: number
          activeRentals: number
          totalSpent: number
     }
     orders: RentalOrder[]
     payments: Payment[]

}

export default function CustomerOverviewClient({
     user,
     stats,
     orders = [],
     payments = [],
}: CustomerOverviewClientProps) {
     const [selectedGearForReview, setSelectedGearForReview] = useState<{ id: string; title: string } | null>(null)

     const getStatusBadge = (status: string) => {
          const statusKey = status?.toLowerCase()
          const statusClasses: Record<string, string> = {
               placed: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
               confirmed: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
               paid: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
               picked: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
               returned: 'bg-slate-500/10 text-slate-600 border-slate-500/20',
               cancelled: 'bg-rose-500/10 text-rose-600 border-rose-500/20',
          }

          return (
               <span
                    className={cn(
                         'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider',
                         statusClasses[statusKey] || statusClasses.placed
                    )}
               >
                    {status}
               </span>
          )
     }

     const formatDate = (dateStr?: string) => {
          if (!dateStr) return 'N/A'
          return new Date(dateStr).toLocaleDateString('en-US', {
               month: 'short',
               day: 'numeric',
               year: 'numeric',
          })
     }

     return (
          <div className="space-y-8">
               {/* Top Banner & Stats */}
               <div className="space-y-4">
                    <div>
                         <h1 className="text-2xl font-bold tracking-tight">
                              Welcome back, <span className="text-primary">{user?.data?.profile?.name || 'Customer'}</span>
                         </h1>
                         <p className="text-xs text-muted-foreground">
                              Manage your gear rentals, check order statuses, and review returned equipment.
                         </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                         <div className="glass-panel rounded-2xl p-5 border shadow-xs flex items-center gap-4">
                              <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                   <Package className="size-6" />
                              </div>
                              <div>
                                   <p className="text-xs font-semibold text-muted-foreground uppercase">Total Rentals</p>
                                   <h3 className="text-2xl font-bold">{stats.totalRentals}</h3>
                              </div>
                         </div>

                         <div className="glass-panel rounded-2xl p-5 border shadow-xs flex items-center gap-4">
                              <div className="flex size-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                                   <Clock className="size-6" />
                              </div>
                              <div>
                                   <p className="text-xs font-semibold text-muted-foreground uppercase">Active Rentals</p>
                                   <h3 className="text-2xl font-bold">{stats.activeRentals}</h3>
                              </div>
                         </div>

                         <div className="glass-panel rounded-2xl p-5 border shadow-xs flex items-center gap-4">
                              <div className="flex size-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
                                   <CreditCard className="size-6" />
                              </div>
                              <div>
                                   <p className="text-xs font-semibold text-muted-foreground uppercase">Total Spent</p>
                                   <h3 className="text-2xl font-bold">${stats.totalSpent}</h3>
                              </div>
                         </div>
                    </div>
               </div>

               {/* 1. Rental Orders History Table */}
               <div className="glass-panel rounded-3xl border p-6 shadow-sm space-y-4">
                    <div>
                         <h2 className="text-xl font-bold text-foreground">Rental Order History</h2>
                         <p className="text-xs text-muted-foreground">Recent equipment bookings and status updates</p>
                    </div>

                    <div className="overflow-x-auto">
                         <table className="w-full text-left text-sm">
                              <thead className="border-b text-xs font-bold uppercase text-muted-foreground bg-muted/40">
                                   <tr>
                                        <th className="py-3 px-4">Order ID</th>
                                        <th className="py-3 px-4">Gear Details</th>
                                        <th className="py-3 px-4">Duration</th>
                                        <th className="py-3 px-4">Price</th>
                                        <th className="py-3 px-4">Status</th>
                                        <th className="py-3 px-4 text-right">Action</th>
                                   </tr>
                              </thead>
                              <tbody className="divide-y divide-border">
                                   {orders.length === 0 ? (
                                        <tr>
                                             <td colSpan={6} className="py-6 text-center text-xs text-muted-foreground">
                                                  No rental orders found.
                                             </td>
                                        </tr>
                                   ) : (
                                        orders.map((order) => (
                                             <tr key={order.id} className="hover:bg-muted/30 transition-colors">
                                                  <td className="py-4 px-4 font-mono text-xs font-bold text-primary">
                                                       {order.id.slice(0, 8)}...
                                                  </td>
                                                  <td className="py-4 px-4">
                                                       <p className="font-semibold text-foreground">{order.gearItem?.title || 'N/A'}</p>
                                                       <span className="text-[11px] text-muted-foreground">{order.gearItem?.brand || 'Gear'}</span>
                                                  </td>
                                                  <td className="py-4 px-4 text-xs">
                                                       <div className="flex items-center gap-1 text-muted-foreground">
                                                            <Calendar className="size-3.5" />
                                                            <span>{formatDate(order.startDate)} to {formatDate(order.endDate)}</span>
                                                       </div>
                                                  </td>
                                                  <td className="py-4 px-4 font-bold">${order.totalAmount}</td>
                                                  <td className="py-4 px-4">{getStatusBadge(order.status)}</td>
                                                  <td className="py-4 px-4 text-right">
                                                       <div className="flex items-center justify-end gap-2">
                                                            {order.status === 'RETURNED' && (
                                                                 <button
                                                                      onClick={() =>
                                                                           setSelectedGearForReview({
                                                                                id: order?.gearItemId,
                                                                                title: order.gearItem?.title as string
                                                                           })

                                                                      }
                                                                      className="inline-flex items-center gap-1 rounded-xl bg-secondary/10 px-3 py-1.5 text-xs font-bold text-secondary hover:bg-secondary hover:text-white transition-colors"
                                                                 >
                                                                      <Star className="size-3.5" />
                                                                      <span>Review</span>
                                                                 </button>
                                                            )}
                                                            <Link
                                                                 href={`/dashboard/customer/orders/${order.id}`}
                                                                 className="inline-flex items-center gap-1 rounded-xl bg-muted px-3 py-1.5 text-xs font-semibold hover:bg-muted/80 transition-colors"
                                                            >
                                                                 <span>Details</span>
                                                                 <ExternalLink className="size-3" />
                                                            </Link>
                                                       </div>
                                                  </td>
                                             </tr>
                                        ))
                                   )}
                              </tbody>
                         </table>
                    </div>
               </div>

               {/* 2. Payment History Table */}
               <div className="glass-panel rounded-3xl border p-6 shadow-sm space-y-4">
                    <div>
                         <h2 className="text-xl font-bold text-foreground">Payment History</h2>
                         <p className="text-xs text-muted-foreground">Completed payment transactions</p>
                    </div>

                    <div className="overflow-x-auto">
                         <table className="w-full text-left text-sm">
                              <thead className="border-b text-xs font-bold uppercase text-muted-foreground bg-muted/40">
                                   <tr>
                                        <th className="py-3 px-4">Trx ID</th>
                                        <th className="py-3 px-4">Order Ref</th>
                                        <th className="py-3 px-4">Method</th>
                                        <th className="py-3 px-4">Date</th>
                                        <th className="py-3 px-4">Amount</th>
                                        <th className="py-3 px-4">Status</th>
                                   </tr>
                              </thead>
                              <tbody className="divide-y divide-border">
                                   {payments.length === 0 ? (
                                        <tr>
                                             <td colSpan={6} className="py-6 text-center text-xs text-muted-foreground">
                                                  No payment history found.
                                             </td>
                                        </tr>
                                   ) : (
                                        payments.map((pay) => (
                                             <tr key={pay.id} className="hover:bg-muted/30 transition-colors">
                                                  <td className="py-3.5 px-4 font-mono text-xs">{pay.transactionId}</td>
                                                  <td className="py-3.5 px-4 font-mono text-xs text-primary">
                                                       {pay.rentalOrderId ? `${pay.rentalOrderId.slice(0, 8)}...` : 'N/A'}
                                                  </td>
                                                  <td className="py-3.5 px-4 font-semibold">{pay.paymentMethod}</td>
                                                  <td className="py-3.5 px-4 text-xs text-muted-foreground">{formatDate(pay.paidAt || pay.createdAt)}</td>
                                                  <td className="py-3.5 px-4 font-bold text-emerald-600">${pay.amount}</td>
                                                  <td className="py-3.5 px-4">
                                                       <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                                                            <CheckCircle2 className="size-3" />
                                                            {pay.status}
                                                       </span>
                                                  </td>
                                             </tr>
                                        ))
                                   )}
                              </tbody>
                         </table>
                    </div>
               </div>

               {/* Dynamic Review Modal */}
               {
                    selectedGearForReview && (
                         <ReviewModal
                              gearTitle={selectedGearForReview.title}
                              gearItemId={selectedGearForReview.id}
                              onClose={() => setSelectedGearForReview(null)}
                         />
                    )
               }
          </div >
     )
}