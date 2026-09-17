'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
     ShieldCheck,
     Sparkles,
     TrendingUp,
     Recycle,
     Truck,
     CheckCircle2,
     Zap,
     Percent,
} from 'lucide-react'
import { FadeIn } from './motion-wrapper'

export function FeaturesBento() {
     return (
          <section className="relative py-16 lg:py-24">
               <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Section Header */}
                    <FadeIn className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                         <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                              <Zap className="size-3.5 fill-current" />
                              <span>Engineered For Maximum Freedom</span>
                         </div>
                         <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                              Why The Modern Outdoors <br className="hidden sm:inline" />
                              Rents with <span className="text-gradient-kinetic">GearUp</span>
                         </h2>
                         <p className="text-sm sm:text-base font-medium text-muted-foreground leading-relaxed">
                              Own the experience, not the clutter. From premium tents to cinematic action gear, discover why thousands of adventurers choose circular rentals over costly purchases.
                         </p>
                    </FadeIn>

                    {/* Bento Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                         {/* Bento Item 1: Large Featured (7 Cols) - The 85% Savings Equation */}
                         <motion.div
                              whileHover={{ y: -4 }}
                              transition={{ duration: 0.25 }}
                              className="md:col-span-7 glass-panel relative overflow-hidden rounded-[2.5rem] border border-border/80 bg-card/85 p-8 sm:p-10 shadow-lg backdrop-blur-xl flex flex-col justify-between"
                         >
                              <div className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full bg-primary/10 blur-3xl" />

                              <div>
                                   <div className="flex items-center gap-2.5">
                                        <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                                             <Percent className="size-6 stroke-[2.2]" />
                                        </div>
                                        <span className="text-xs font-black tracking-widest text-primary uppercase">
                                             ECONOMIC ADVANTAGE
                                        </span>
                                   </div>

                                   <h3 className="mt-6 text-2xl sm:text-3xl font-black text-foreground tracking-tight">
                                        Save Up to 85% Over Costly Retail Purchase
                                    </h3>
                                   <p className="mt-3 text-sm font-medium text-muted-foreground max-w-xl leading-relaxed">
                                        The average adventure equipment is used only 4 to 6 days per year, degrading in your closet while losing value. Rent top-tier flagship gear whenever inspiration strikes.
                                   </p>

                                   {/* Interactive Comparison Visual Bar */}
                                   <div className="mt-8 space-y-3 rounded-2xl border border-border/60 bg-muted/40 p-5">
                                        <div className="flex items-center justify-between text-xs font-extrabold">
                                             <span className="text-muted-foreground">Buying Flagship Kit (Retail)</span>
                                             <span className="text-destructive font-black">$2,450 + Maintenance</span>
                                        </div>
                                        <div className="h-2.5 w-full rounded-full bg-destructive/20 overflow-hidden">
                                             <div className="h-full w-full bg-destructive rounded-full" />
                                        </div>

                                        <div className="flex items-center justify-between text-xs font-extrabold pt-2">
                                             <span className="text-primary font-bold">Renting 4-Day Expedition on GearUp</span>
                                             <span className="text-primary font-black">$120 (Save 95%)</span>
                                        </div>
                                        <div className="h-2.5 w-full rounded-full bg-primary/20 overflow-hidden">
                                             <div className="h-full w-[8%] bg-primary rounded-full animate-pulse" />
                                        </div>
                                   </div>
                              </div>

                              <div className="mt-8 flex flex-wrap items-center gap-4 text-xs font-bold text-muted-foreground border-t border-border/50 pt-5">
                                   <span className="flex items-center gap-1.5">
                                        <CheckCircle2 className="size-4 text-primary" /> Zero Storage Space Required
                                   </span>
                                   <span className="flex items-center gap-1.5">
                                        <CheckCircle2 className="size-4 text-primary" /> Latest Models Always Available
                                   </span>
                              </div>
                         </motion.div>

                         {/* Bento Item 2: Protection (5 Cols) - Gear Shield™ */}
                         <motion.div
                              whileHover={{ y: -4 }}
                              transition={{ duration: 0.25 }}
                              className="md:col-span-5 glass-panel relative overflow-hidden rounded-[2.5rem] border border-border/80 bg-card/85 p-8 sm:p-10 shadow-lg backdrop-blur-xl flex flex-col justify-between"
                         >
                              <div className="pointer-events-none absolute -left-20 -bottom-20 size-72 rounded-full bg-secondary/15 blur-3xl" />

                              <div>
                                   <div className="flex items-center gap-2.5">
                                        <div className="flex size-12 items-center justify-center rounded-2xl bg-secondary/15 text-secondary">
                                             <ShieldCheck className="size-6 stroke-[2.2]" />
                                        </div>
                                        <span className="text-xs font-black tracking-widest text-secondary uppercase">
                                             BUILT-IN PROTECTION
                                        </span>
                                   </div>

                                   <h3 className="mt-6 text-2xl font-black text-foreground tracking-tight">
                                        Gear Shield™ Coverage On Every Trip
                                   </h3>
                                   <p className="mt-3 text-sm font-medium text-muted-foreground leading-relaxed">
                                        Wilderness adventures happen. Normal wear, minor tears, mud, and dust are 100% covered. Adventure boldly without stressing over minor damage.
                                   </p>

                                   <div className="mt-6 space-y-2.5">
                                        {['Zero Deductible on Minor Scuffs', 'Direct Repair Network Replacement', '24/7 Remote Field Support Hotline'].map((feat) => (
                                             <div key={feat} className="flex items-center gap-2 text-xs font-bold text-foreground">
                                                  <div className="flex size-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-500">
                                                       <CheckCircle2 className="size-3.5" />
                                                  </div>
                                                  <span>{feat}</span>
                                             </div>
                                        ))}
                                   </div>
                              </div>

                              <div className="mt-8 rounded-2xl border border-secondary/20 bg-secondary/10 p-3 text-center text-xs font-bold text-secondary">
                                   🛡️ Up to $5,000 Coverage Automatically Activated
                              </div>
                         </motion.div>

                         {/* Bento Item 3: Inspection (4 Cols) */}
                         <motion.div
                              whileHover={{ y: -4 }}
                              transition={{ duration: 0.25 }}
                              className="md:col-span-4 glass-panel relative overflow-hidden rounded-[2.5rem] border border-border/80 bg-card/85 p-8 shadow-lg backdrop-blur-xl flex flex-col justify-between"
                         >
                              <div>
                                   <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-500">
                                        <Sparkles className="size-6" />
                                   </div>

                                   <h3 className="mt-6 text-xl font-black text-foreground">
                                        12-Point Sanitization & Field Diagnostics
                                   </h3>
                                   <p className="mt-2.5 text-xs font-medium text-muted-foreground leading-relaxed">
                                        Every single tent, camera sensor, sleeping bag, and MTB brake is meticulously sanitized with hospital-grade protocols and recalibrated before delivery.
                                   </p>
                              </div>

                              <div className="mt-6 flex items-center gap-2 text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
                                   <span>Read Our Safety Protocols</span>
                                   <TrendingUp className="size-4" />
                              </div>
                         </motion.div>

                         {/* Bento Item 4: Delivery / Logistics (4 Cols) */}
                         <motion.div
                              whileHover={{ y: -4 }}
                              transition={{ duration: 0.25 }}
                              className="md:col-span-4 glass-panel relative overflow-hidden rounded-[2.5rem] border border-border/80 bg-card/85 p-8 shadow-lg backdrop-blur-xl flex flex-col justify-between"
                         >
                              <div>
                                   <div className="flex size-12 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-500">
                                        <Truck className="size-6" />
                                   </div>

                                   <h3 className="mt-6 text-xl font-black text-foreground">
                                        Doorstep Box or Local Basecamp Pickup
                                   </h3>
                                   <p className="mt-2.5 text-xs font-medium text-muted-foreground leading-relaxed">
                                        Get gear couriered right to your door with prepaid return labels, or pick up immediately from one of 200+ partner adventure hubs near trailheads.
                                   </p>
                              </div>

                              <div className="mt-6 flex items-center gap-2 text-xs font-bold text-muted-foreground">
                                   <span>📦 Free prepaid return packaging included</span>
                              </div>
                         </motion.div>

                         {/* Bento Item 5: Circular Economy (4 Cols) */}
                         <motion.div
                              whileHover={{ y: -4 }}
                              transition={{ duration: 0.25 }}
                              className="md:col-span-4 glass-panel relative overflow-hidden rounded-[2.5rem] border border-border/80 bg-card/85 p-8 shadow-lg backdrop-blur-xl flex flex-col justify-between"
                         >
                              <div>
                                   <div className="flex size-12 items-center justify-center rounded-2xl bg-teal-500/15 text-teal-500">
                                        <Recycle className="size-6" />
                                   </div>

                                   <h3 className="mt-6 text-xl font-black text-foreground">
                                        Circular & Planet Positive Footprint
                                   </h3>
                                   <p className="mt-2.5 text-xs font-medium text-muted-foreground leading-relaxed">
                                        One shared tent offsets up to 140kg of carbon emissions over its rental lifecycle by keeping equipment in active use instead of premature landfills.
                                   </p>
                              </div>

                              <div className="mt-6 flex items-center gap-2 text-xs font-extrabold text-teal-600 dark:text-teal-400">
                                   <span>🌱 60% Lower Manufacturing Footprint</span>
                              </div>
                         </motion.div>
                    </div>
               </div>
          </section>
     )
}
