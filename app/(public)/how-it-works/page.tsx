'use client'

import { useState } from 'react'
import {
     User,
     Store,
     ShieldCheck,
     Search,
     Calendar,
     CreditCard,
     RotateCcw,
     PlusCircle,
     CheckCircle2,
     PackageCheck,
     Users,
     Sliders,
     AlertTriangle,
     ArrowRight,
     Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/utils'

type RoleType = 'customer' | 'provider' | 'admin'

const roleFlows = {
     customer: {
          title: 'Customer Workflow',
          description: 'How gear renting works for customers from search to return',
          badge: 'Renter Guide',
          steps: [
               {
                    step: '01',
                    title: 'Discover & Search',
                    desc: 'Browse through categories, filter by date, price, or brand to find your desired gear.',
                    icon: Search,
               },
               {
                    step: '02',
                    title: 'Select Dates & Rent',
                    desc: 'Pick your start and end rental dates to check availability and total costs.',
                    icon: Calendar,
               },
               {
                    step: '03',
                    title: 'Secure Checkout',
                    desc: 'Complete payment via Stripe or SSLCommerz gateway with full buyer security.',
                    icon: CreditCard,
               },
               {
                    step: '04',
                    title: 'Pickup & Return',
                    desc: 'Collect gear from the provider and return it smoothly after your adventure.',
                    icon: RotateCcw,
               },
          ],
     },
     provider: {
          title: 'Provider Workflow',
          description: 'How equipment owners list gear and fulfill customer orders',
          badge: 'Owner Guide',
          steps: [
               {
                    step: '01',
                    title: 'List Your Equipment',
                    desc: 'Upload high-res images, set daily rates, specs, and availability status.',
                    icon: PlusCircle,
               },
               {
                    step: '02',
                    title: 'Manage Booking Requests',
                    desc: 'Review incoming customer orders and confirm rental bookings from dashboard.',
                    icon: CheckCircle2,
               },
               {
                    step: '03',
                    title: 'Handover & Status Update',
                    desc: 'Mark order as "Picked Up" when customer receives item.',
                    icon: PackageCheck,
               },
               {
                    step: '04',
                    title: 'Receive Back & Payout',
                    desc: 'Inspect gear upon return, mark "Returned", and receive automated payout.',
                    icon: RotateCcw,
               },
          ],
     },
     admin: {
          title: 'Admin Moderation Flow',
          description: 'How platform administrators oversee ecosystem quality and security',
          badge: 'System Governance',
          steps: [
               {
                    step: '01',
                    title: 'User & Role Moderation',
                    desc: 'Manage customer accounts, verify providers, and handle permissions.',
                    icon: Users,
               },
               {
                    step: '02',
                    title: 'Inventory Audit',
                    desc: 'Review listed gear catalog to ensure quality standards and proper categorization.',
                    icon: Sliders,
               },
               {
                    step: '03',
                    title: 'Order Monitoring',
                    desc: 'Track system-wide transaction flow, active rentals, and fulfillment updates.',
                    icon: CheckCircle2,
               },
               {
                    step: '04',
                    title: 'Dispute & Moderation',
                    desc: 'Resolve issues, review reported listings, and maintain platform integrity.',
                    icon: AlertTriangle,
               },
          ],
     },
}

export default function HowItWorksPage() {
     const [activeRole, setActiveRole] = useState<RoleType>('customer')

     const currentFlow = roleFlows[activeRole]

     return (
          <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
               {/* Page Header */}
               <div className="mx-auto max-w-3xl text-center space-y-4">
                    <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-bold text-primary">
                         <Sparkles className="size-3.5" />
                         <span>Platform Architecture</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
                         How <span className="text-gradient-kinetic">GearUp</span> Works
                    </h1>
                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                         GearUp connects outdoor enthusiasts with equipment owners seamlessly. Explore how our end-to-end ecosystem works for every role.
                    </p>
               </div>

               {/* Role Switcher Tabs */}
               <div className="mt-10 flex justify-center">
                    <div className="glass-panel inline-flex rounded-2xl p-1.5 shadow-lg border border-border/60">
                         <button
                              type="button"
                              onClick={() => setActiveRole('customer')}
                              className={cn(
                                   'flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all cursor-pointer',
                                   activeRole === 'customer'
                                        ? 'bg-primary text-primary-foreground shadow-md'
                                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                              )}
                         >
                              <User className="size-4" />
                              <span>Customer</span>
                         </button>

                         <button
                              type="button"
                              onClick={() => setActiveRole('provider')}
                              className={cn(
                                   'flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all cursor-pointer',
                                   activeRole === 'provider'
                                        ? 'bg-secondary text-secondary-foreground shadow-md'
                                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                              )}
                         >
                              <Store className="size-4" />
                              <span>Provider</span>
                         </button>

                         <button
                              type="button"
                              onClick={() => setActiveRole('admin')}
                              className={cn(
                                   'flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all cursor-pointer',
                                   activeRole === 'admin'
                                        ? 'bg-foreground text-background shadow-md'
                                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                              )}
                         >
                              <ShieldCheck className="size-4" />
                              <span>Admin</span>
                         </button>
                    </div>
               </div>

               {/* Dynamic Workflow Flowchart Diagram */}
               <div className="mt-12 rounded-3xl border border-border/70 bg-card/60 p-6 sm:p-10 shadow-xl glass-panel relative overflow-hidden">
                    <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                         <div>
                              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                                   {currentFlow.badge}
                              </span>
                              <h2 className="text-2xl font-bold tracking-tight text-foreground mt-1">
                                   {currentFlow.title}
                              </h2>
                              <p className="text-xs sm:text-sm text-muted-foreground">
                                   {currentFlow.description}
                              </p>
                         </div>
                    </div>

                    {/* Horizontal Flowchart Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
                         {currentFlow.steps.map((item, index) => {
                              const Icon = item.icon
                              return (
                                   <div key={item.step} className="relative group">
                                        <div className="h-full rounded-2xl border border-border/60 bg-background/80 p-5 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-md flex flex-col justify-between space-y-4">
                                             <div>
                                                  <div className="flex items-center justify-between mb-3">
                                                       <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                                            <Icon className="size-5" />
                                                       </div>
                                                       <span className="text-xs font-black text-muted-foreground/60">
                                                            {item.step}
                                                       </span>
                                                  </div>

                                                  <h3 className="font-bold text-base text-foreground mb-1.5">
                                                       {item.title}
                                                  </h3>
                                                  <p className="text-xs text-muted-foreground leading-relaxed">
                                                       {item.desc}
                                                  </p>
                                             </div>
                                        </div>

                                        {/* Arrow Connector for Desktop Flow */}
                                        {index < currentFlow.steps.length - 1 && (
                                             <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 size-6 items-center justify-center rounded-full bg-card border border-border text-muted-foreground shadow-sm">
                                                  <ArrowRight className="size-3" />
                                             </div>
                                        )}
                                   </div>
                              )
                         })}
                    </div>
               </div>

               {/* End-to-End Status Lifecycle Map */}
               <div className="mt-16 space-y-6">
                    <div className="text-center space-y-2">
                         <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                              Order Status Lifecycle
                         </h2>
                         <p className="text-xs sm:text-sm text-muted-foreground">
                              How an order state changes across Customer, Provider, and System
                         </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                         {[
                              {
                                   status: 'Placed',
                                   desc: 'Order created by customer',
                                   color: 'bg-[hsl(var(--status-placed-bg))] text-[hsl(var(--status-placed-text))] border-[hsl(var(--status-placed-border))]',
                              },
                              {
                                   status: 'Confirmed',
                                   desc: 'Approved by provider',
                                   color: 'bg-[hsl(var(--status-confirmed-bg))] text-[hsl(var(--status-confirmed-text))] border-[hsl(var(--status-confirmed-border))]',
                              },
                              {
                                   status: 'Paid',
                                   desc: 'Payment completed',
                                   color: 'bg-[hsl(var(--status-paid-bg))] text-[hsl(var(--status-paid-text))] border-[hsl(var(--status-paid-border))]',
                              },
                              {
                                   status: 'Picked Up',
                                   desc: 'Gear in customer hands',
                                   color: 'bg-[hsl(var(--status-picked-bg))] text-[hsl(var(--status-picked-text))] border-[hsl(var(--status-picked-border))]',
                              },
                              {
                                   status: 'Returned',
                                   desc: 'Returned to provider',
                                   color: 'bg-[hsl(var(--status-returned-bg))] text-[hsl(var(--status-returned-text))] border-[hsl(var(--status-returned-border))]',
                              },
                              {
                                   status: 'Cancelled',
                                   desc: 'Order terminated',
                                   color: 'bg-[hsl(var(--status-cancelled-bg))] text-[hsl(var(--status-cancelled-text))] border-[hsl(var(--status-cancelled-border))]',
                              },
                         ].map((item) => (
                              <div
                                   key={item.status}
                                   className={cn(
                                        'rounded-2xl border p-3 flex flex-col justify-between space-y-1 text-center transition-all',
                                        item.color
                                   )}
                              >
                                   <div className="text-xs font-black uppercase tracking-wide">
                                        {item.status}
                                   </div>
                                   <div className="text-[11px] opacity-80 leading-tight">
                                        {item.desc}
                                   </div>
                              </div>
                         ))}
                    </div>
               </div>
          </div>
     )
}