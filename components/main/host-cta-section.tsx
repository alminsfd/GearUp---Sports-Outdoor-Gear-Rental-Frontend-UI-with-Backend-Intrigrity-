'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
     Zap,
     DollarSign,
     ArrowRight,
     CheckCircle2,
     Coins,
} from 'lucide-react'
import { FadeIn } from './motion-wrapper'

export function HostCtaSection() {
     return (
          <section className="relative py-16 lg:py-24">
               <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <FadeIn className="glass-panel relative overflow-hidden rounded-[2.5rem] border border-border/80 bg-linear-to-br from-card via-card/90 to-primary/10 p-8 sm:p-12 lg:p-16 shadow-2xl backdrop-blur-xl">
                         {/* Ambient Background Glows */}
                         <div className="pointer-events-none absolute -top-24 -right-24 size-96 rounded-full bg-secondary/15 blur-[120px]" />
                         <div className="pointer-events-none absolute -bottom-24 -left-24 size-96 rounded-full bg-primary/15 blur-[120px]" />

                         <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                              {/* Left Text & Value Prop (7 Cols) */}
                              <div className="space-y-6 lg:col-span-7">
                                   <div className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-secondary">
                                        <Coins className="size-3.5" />
                                        <span>Earn Passive Adventure Income</span>
                                   </div>

                                   <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl lg:text-5xl leading-[1.15]">
                                        Have Gear Gathering Dust? <br className="hidden sm:inline" />
                                        <span className="text-gradient-kinetic">Turn It Into Consistent Income</span>
                                   </h2>

                                   <p className="text-sm sm:text-base font-medium text-muted-foreground leading-relaxed max-w-xl">
                                        Top GearUp hosts earn between <span className="font-bold text-foreground">$450 and $2,200 per month</span> renting out tents, bikes, ski setups, and action cameras. We manage the insurance, identity verification, and deposits.
                                   </p>

                                   {/* Host Perks Bullet points */}
                                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                                        {[
                                             'Up to $5,000 Host Damage Shield',
                                             'Automatic Direct-Deposit Payouts',
                                             'Government ID Verified Renters',
                                             'You Retain 100% Calendar Control',
                                        ].map((perk) => (
                                             <div key={perk} className="flex items-center gap-2 text-xs font-bold text-foreground">
                                                  <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                                                       <CheckCircle2 className="size-3.5" />
                                                  </div>
                                                  <span>{perk}</span>
                                             </div>
                                        ))}
                                   </div>

                                   {/* Action Buttons */}
                                   <div className="flex flex-wrap items-center gap-4 pt-4">
                                        <Link
                                             href="/gear"
                                             className="group inline-flex items-center gap-2 rounded-2xl bg-primary px-7 py-4 text-sm font-extrabold text-primary-foreground shadow-xl shadow-primary/20 transition-all duration-300 hover:scale-[1.02] hover:bg-primary/90"
                                        >
                                             <Zap className="size-4.5 fill-current" />
                                             <span>List Your Gear Now</span>
                                             <ArrowRight className="size-4.5 transition-transform group-hover:translate-x-1" />
                                        </Link>
                                        <Link
                                             href="/dashboard/provider"
                                             className="inline-flex items-center gap-2 rounded-2xl border border-border/80 bg-card/60 px-6 py-4 text-sm font-bold text-foreground backdrop-blur-md transition-all hover:bg-muted"
                                        >
                                             <span>Provider Dashboard</span>
                                        </Link>
                                   </div>
                              </div>

                              {/* Right Earnings Visual Card (5 Cols) */}
                              <div className="lg:col-span-5">
                                   <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        transition={{ duration: 0.3 }}
                                        className="relative overflow-hidden rounded-3xl border border-border/80 bg-card/90 p-6 sm:p-8 shadow-xl backdrop-blur-md"
                                   >
                                        <div className="flex items-center justify-between border-b border-border/60 pb-4">
                                             <div>
                                                  <p className="text-xs font-bold text-muted-foreground">Estimated Average Monthly Yield</p>
                                                  <h4 className="text-3xl font-black text-foreground mt-0.5">$840 /mo</h4>
                                             </div>
                                             <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-500">
                                                  <DollarSign className="size-6 stroke-[2.5]" />
                                             </div>
                                        </div>

                                        <div className="mt-5 space-y-3.5">
                                             <div className="flex items-center justify-between text-xs font-bold">
                                                  <span className="text-muted-foreground">4-Person Camping Tent</span>
                                                  <span className="text-foreground">$160 / 5 days</span>
                                             </div>
                                             <div className="flex items-center justify-between text-xs font-bold">
                                                  <span className="text-muted-foreground">Full-Suspension MTB</span>
                                                  <span className="text-foreground">$380 / 4 days</span>
                                             </div>
                                             <div className="flex items-center justify-between text-xs font-bold">
                                                  <span className="text-muted-foreground">Cinema Drone & Action Cam</span>
                                                  <span className="text-foreground">$300 / 3 days</span>
                                             </div>
                                        </div>

                                        <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/10 p-3.5 text-center text-xs font-bold text-primary">
                                             🛡️ Protected by Gear Shield™ Equipment Guarantee
                                        </div>
                                   </motion.div>
                              </div>
                         </div>
                    </FadeIn>
               </div>
          </section>
     )
}
