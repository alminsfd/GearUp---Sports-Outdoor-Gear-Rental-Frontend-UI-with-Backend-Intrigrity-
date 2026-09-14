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
     X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { IUser } from '@/types/user'

// Mock Orders Data
const mockOrders = [
     {
          id: 'ORD-9842',
          gearName: 'Ultra-Lightweight 4-Person Tent',
          category: 'Camping',
          startDate: '2026-10-05',
          endDate: '2026-10-08',
          totalPrice: 120,
          status: 'returned',
     },
     {
          id: 'ORD-8731',
          gearName: 'Sony Alpha A7 IV Camera Kit',
          category: 'Electronics',
          startDate: '2026-09-18',
          endDate: '2026-09-20',
          totalPrice: 180,
          status: 'picked',
     },
     {
          id: 'ORD-6520',
          gearName: 'Mountain Trail Electric Bike',
          category: 'Cycling',
          startDate: '2026-09-25',
          endDate: '2026-09-27',
          totalPrice: 150,
          status: 'confirmed',
     },
     {
          id: 'ORD-4310',
          gearName: 'High-Altitude Sleeping Bag',
          category: 'Camping',
          startDate: '2026-09-01',
          endDate: '2026-09-03',
          totalPrice: 45,
          status: 'cancelled',
     },
]

// Mock Payment Data
const mockPayments = [
     {
          trxId: 'TXN-99881122',
          orderId: 'ORD-9842',
          amount: 120,
          method: 'Stripe',
          date: '2026-10-01',
          status: 'Paid',
     },
     {
          trxId: 'TXN-77665544',
          orderId: 'ORD-8731',
          amount: 180,
          method: 'SSLCommerz',
          date: '2026-09-15',
          status: 'Paid',
     },
]

export default function CustomerOverviewClient({ user, stats }: { user: IUser; stats: any }) {
     const [selectedGearForReview, setSelectedGearForReview] = useState<string | null>(null)
     const [rating, setRating] = useState(5)
     const [reviewComment, setReviewComment] = useState('')

     const getStatusBadge = (status: string) => {
          const statusClasses: Record<string, string> = {
               placed:
                    'bg-[hsl(var(--status-placed-bg))] text-[hsl(var(--status-placed-text))] border-[hsl(var(--status-placed-border))]',
               confirmed:
                    'bg-[hsl(var(--status-confirmed-bg))] text-[hsl(var(--status-confirmed-text))] border-[hsl(var(--status-confirmed-border))]',
               paid:
                    'bg-[hsl(var(--status-paid-bg))] text-[hsl(var(--status-paid-text))] border-[hsl(var(--status-paid-border))]',
               picked:
                    'bg-[hsl(var(--status-picked-bg))] text-[hsl(var(--status-picked-text))] border-[hsl(var(--status-picked-border))]',
               returned:
                    'bg-[hsl(var(--status-returned-bg))] text-[hsl(var(--status-returned-text))] border-[hsl(var(--status-returned-border))]',
               cancelled:
                    'bg-[hsl(var(--status-cancelled-bg))] text-[hsl(var(--status-cancelled-text))] border-[hsl(var(--status-cancelled-border))]',
          }

          return (
               <span
                    className={cn(
                         'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider',
                         statusClasses[status] || statusClasses.placed
                    )}
               >
                    {status}
               </span>
          )
     }

     const handleReviewSubmit = (e: React.FormEvent) => {
          e.preventDefault()
          alert(`Review submitted for ${selectedGearForReview}! Rating: ${rating} Stars`)
          setSelectedGearForReview(null)
          setReviewComment('')
     }

     return (
          <div className="space-y-8">
               {/* Welcome Banner & Top Stats */}
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

               {/* 1. Rental Orders History */}
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
                                   {mockOrders.map((order) => (
                                        <tr key={order.id} className="hover:bg-muted/30 transition-colors">
                                             <td className="py-4 px-4 font-mono text-xs font-bold text-primary">{order.id}</td>
                                             <td className="py-4 px-4">
                                                  <p className="font-semibold text-foreground">{order.gearName}</p>
                                                  <span className="text-[11px] text-muted-foreground">{order.category}</span>
                                             </td>
                                             <td className="py-4 px-4 text-xs">
                                                  <div className="flex items-center gap-1 text-muted-foreground">
                                                       <Calendar className="size-3.5" />
                                                       <span>{order.startDate} to {order.endDate}</span>
                                                  </div>
                                             </td>
                                             <td className="py-4 px-4 font-bold">${order.totalPrice}</td>
                                             <td className="py-4 px-4">{getStatusBadge(order.status)}</td>
                                             <td className="py-4 px-4 text-right">
                                                  <div className="flex items-center justify-end gap-2">
                                                       {order.status === 'returned' && (
                                                            <button
                                                                 onClick={() => setSelectedGearForReview(order.gearName)}
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
                                   ))}
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
                                   {mockPayments.map((pay) => (
                                        <tr key={pay.trxId} className="hover:bg-muted/30 transition-colors">
                                             <td className="py-3.5 px-4 font-mono text-xs">{pay.trxId}</td>
                                             <td className="py-3.5 px-4 font-mono text-xs text-primary">{pay.orderId}</td>
                                             <td className="py-3.5 px-4 font-semibold">{pay.method}</td>
                                             <td className="py-3.5 px-4 text-xs text-muted-foreground">{pay.date}</td>
                                             <td className="py-3.5 px-4 font-bold text-emerald-600">${pay.amount}</td>
                                             <td className="py-3.5 px-4">
                                                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                                                       <CheckCircle2 className="size-3" />
                                                       {pay.status}
                                                  </span>
                                             </td>
                                        </tr>
                                   ))}
                              </tbody>
                         </table>
                    </div>
               </div>

               {/* 3. Leave Review Modal Form */}
               {selectedGearForReview && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
                         <div className="glass-panel w-full max-w-md rounded-3xl border bg-card p-6 shadow-2xl relative space-y-4">
                              <button
                                   onClick={() => setSelectedGearForReview(null)}
                                   className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
                              >
                                   <X className="size-5" />
                              </button>

                              <div>
                                   <span className="text-xs font-bold text-secondary uppercase">Returned Gear</span>
                                   <h3 className="text-lg font-bold">Leave a Review</h3>
                                   <p className="text-xs text-muted-foreground">{selectedGearForReview}</p>
                              </div>

                              <form onSubmit={handleReviewSubmit} className="space-y-4">
                                   <div>
                                        <label className="text-xs font-bold uppercase text-muted-foreground block mb-1">
                                             Rating
                                        </label>
                                        <div className="flex gap-2">
                                             {[1, 2, 3, 4, 5].map((star) => (
                                                  <button
                                                       key={star}
                                                       type="button"
                                                       onClick={() => setRating(star)}
                                                       className="text-amber-400 hover:scale-110 transition-transform"
                                                  >
                                                       <Star
                                                            className={cn(
                                                                 'size-7',
                                                                 star <= rating ? 'fill-amber-400' : 'text-muted'
                                                            )}
                                                       />
                                                  </button>
                                             ))}
                                        </div>
                                   </div>

                                   <div>
                                        <label className="text-xs font-bold uppercase text-muted-foreground block mb-1">
                                             Your Feedback
                                        </label>
                                        <textarea
                                             rows={4}
                                             required
                                             value={reviewComment}
                                             onChange={(e) => setReviewComment(e.target.value)}
                                             placeholder="How was the equipment condition and experience?"
                                             className="w-full rounded-2xl border bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                        />
                                   </div>

                                   <div className="flex justify-end gap-2 pt-2">
                                        <button
                                             type="button"
                                             onClick={() => setSelectedGearForReview(null)}
                                             className="rounded-xl px-4 py-2 text-xs font-bold text-muted-foreground hover:bg-muted"
                                        >
                                             Cancel
                                        </button>
                                        <button
                                             type="submit"
                                             className="rounded-xl bg-primary px-5 py-2 text-xs font-bold text-primary-foreground shadow-md hover:opacity-90"
                                        >
                                             Submit Review
                                        </button>
                                   </div>
                              </form>
                         </div>
                    </div>
               )}
          </div>
     )
}