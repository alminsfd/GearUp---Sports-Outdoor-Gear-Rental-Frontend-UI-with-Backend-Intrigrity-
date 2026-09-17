'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
     Search,
     ArrowRight,
     Sparkles,
     ShieldCheck,
     Star,
     Compass,
     PackageCheck,
     Clock,
     ChevronRight,
} from 'lucide-react'

interface HeroSectionProps {
     categories?: Array<{ id: string; name: string }>
}

export function HeroSection({ categories = [] }: HeroSectionProps) {
     const router = useRouter()
     const [searchTerm, setSearchTerm] = useState('')
     const [selectedCategory, setSelectedCategory] = useState('')

     const handleSearch = (e: React.FormEvent) => {
          e.preventDefault()
          const params = new URLSearchParams()
          if (searchTerm.trim()) params.set('searchTerm', searchTerm.trim())
          if (selectedCategory) params.set('category', selectedCategory)
          router.push(`/gear?${params.toString()}`)
     }

     return (
          <section className="relative overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-24">
               {/* Ambient Glow Accents */}
               <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 h-96 w-full max-w-7xl bg-linear-to-b from-primary/10 via-primary/5 to-transparent blur-3xl" />
               <div className="pointer-events-none absolute top-1/4 -right-40 size-96 rounded-full bg-secondary/15 blur-[120px]" />

               <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
                         {/* Left Column: Heading & Controls (7 Cols) */}
                         <div className="space-y-8 lg:col-span-7">
                              {/* Pill Badge */}
                              <motion.div
                                   initial={{ opacity: 0, y: 16 }}
                                   animate={{ opacity: 1, y: 0 }}
                                   transition={{ duration: 0.5 }}
                                   className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 backdrop-blur-md"
                              >
                                   <span className="flex size-2 rounded-full bg-primary animate-pulse" />
                                   <span className="text-xs font-bold tracking-wide text-primary">
                                        INDUSTRIAL-GRADE GEAR SHIELD™ INCLUDED
                                   </span>
                                   <Sparkles className="size-3.5 text-primary" />
                              </motion.div>

                              {/* Main Headline */}
                              <motion.div
                                   initial={{ opacity: 0, y: 20 }}
                                   animate={{ opacity: 1, y: 0 }}
                                   transition={{ duration: 0.6, delay: 0.1 }}
                                   className="space-y-3"
                              >
                                   <h1 className="text-4xl font-black tracking-tight text-foreground sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.08]">
                                        Rent Pro Equipment.{' '}
                                        <span className="text-gradient-kinetic block sm:inline">
                                             Conquer Any Terrain.
                                        </span>
                                   </h1>
                                   <p className="max-w-2xl text-base font-medium text-muted-foreground sm:text-lg lg:text-xl leading-relaxed">
                                        Access peak-condition camping kits, carbon mountain bikes, 4K action cameras, and mountaineering rigs. Skip the retail cost and storage headache.
                                   </p>
                              </motion.div>

                              {/* Search & Quick Filter Bar */}
                              <motion.form
                                   onSubmit={handleSearch}
                                   initial={{ opacity: 0, y: 20 }}
                                   animate={{ opacity: 1, y: 0 }}
                                   transition={{ duration: 0.6, delay: 0.2 }}
                                   className="glass-panel relative flex flex-col gap-2 rounded-3xl p-2.5 shadow-2xl sm:flex-row sm:items-center sm:gap-2"
                              >
                                   {/* Search Input */}
                                   <div className="flex flex-1 items-center gap-2.5 px-3 py-1.5">
                                        <Search className="size-5 text-muted-foreground shrink-0" />
                                        <input
                                             type="text"
                                             value={searchTerm}
                                             onChange={(e) => setSearchTerm(e.target.value)}
                                             placeholder="Search tents, mountain bikes, drones, packs..."
                                             className="w-full bg-transparent text-sm font-semibold text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
                                        />
                                   </div>

                                   {/* Category Selector if categories exist */}
                                   {categories.length > 0 && (
                                        <div className="hidden border-l border-border/80 px-3 md:block">
                                             <select
                                                  value={selectedCategory}
                                                  onChange={(e) => setSelectedCategory(e.target.value)}
                                                  className="bg-transparent text-xs font-bold text-foreground focus:outline-none cursor-pointer"
                                             >
                                                  <option value="" className="bg-card text-foreground">
                                                       All Disciplines
                                                  </option>
                                                  {categories.map((c) => (
                                                       <option key={c.id} value={c.name} className="bg-card text-foreground">
                                                            {c.name}
                                                       </option>
                                                  ))}
                                             </select>
                                        </div>
                                   )}

                                   {/* Submit CTA */}
                                   <button
                                        type="submit"
                                        className="flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3.5 text-sm font-extrabold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-[1.02] hover:bg-primary/90 active:scale-[0.98]"
                                   >
                                        <span>Find Gear</span>
                                        <ArrowRight className="size-4 stroke-[2.5]" />
                                   </button>
                              </motion.form>

                              {/* Popular Quick Tags */}
                              <motion.div
                                   initial={{ opacity: 0 }}
                                   animate={{ opacity: 1 }}
                                   transition={{ duration: 0.5, delay: 0.3 }}
                                   className="flex flex-wrap items-center gap-2 pt-1"
                              >
                                   <span className="text-xs font-bold text-muted-foreground">Trending:</span>
                                   {['Ultralight Tents', 'Full Suspension MTB', 'Sony Alpha 4K', 'Sub-Zero Bags'].map((tag) => (
                                        <Link
                                             key={tag}
                                             href={`/gear?searchTerm=${encodeURIComponent(tag)}`}
                                             className="rounded-full border border-border/70 bg-card/60 px-3 py-1 text-xs font-semibold text-foreground/80 transition-colors hover:border-primary/50 hover:bg-primary/10 hover:text-primary backdrop-blur-xs"
                                        >
                                             {tag}
                                        </Link>
                                   ))}
                              </motion.div>

                              {/* Action Buttons */}
                              <motion.div
                                   initial={{ opacity: 0, y: 16 }}
                                   animate={{ opacity: 1, y: 0 }}
                                   transition={{ duration: 0.5, delay: 0.35 }}
                                   className="flex flex-wrap items-center gap-4 pt-2"
                              >
                                   <Link
                                        href="/gear"
                                        className="group inline-flex items-center gap-2 rounded-2xl bg-foreground px-6 py-3.5 text-sm font-extrabold text-background shadow-lg transition-all duration-300 hover:bg-foreground/90 hover:scale-[1.02]"
                                   >
                                        <Compass className="size-4 text-primary" />
                                        <span>Browse Full Catalog</span>
                                        <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" />
                                   </Link>
                                   <Link
                                        href="/catagory"
                                        className="inline-flex items-center gap-2 rounded-2xl border border-border/80 bg-card/70 px-6 py-3.5 text-sm font-bold text-foreground backdrop-blur-md transition-all hover:bg-muted hover:border-primary/30"
                                   >
                                        <span>Explore Categories</span>
                                   </Link>
                              </motion.div>
                         </div>

                         {/* Right Column: Visual Showcase & Floating Feature Badges (5 Cols) */}
                         <div className="relative lg:col-span-5">
                              {/* Main Featured Showcase Card */}
                              <motion.div
                                   initial={{ opacity: 0, scale: 0.94 }}
                                   animate={{ opacity: 1, scale: 1 }}
                                   transition={{ duration: 0.7, delay: 0.2 }}
                                   className="glass-panel relative overflow-hidden rounded-[2.5rem] border border-border/80 bg-card/90 p-6 shadow-2xl"
                              >
                                   {/* Header Info */}
                                   <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                             <span className="flex size-2 rounded-full bg-emerald-500 animate-pulse" />
                                             <span className="text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                                                  READY TO DISPATCH
                                             </span>
                                        </div>
                                        <div className="flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-black text-amber-500 border border-amber-500/20">
                                             <Star className="size-3.5 fill-current" />
                                             <span>4.96</span>
                                        </div>
                                   </div>

                                   {/* Visual Gear Mockup / Graphic */}
                                   <div className="relative my-6 aspect-4/3 w-full overflow-hidden rounded-2xl bg-linear-to-br from-muted/80 via-primary/5 to-muted/40 p-6 flex flex-col justify-between border border-border/50">
                                        <div className="flex justify-between items-start">
                                             <span className="rounded-xl bg-card/80 px-3 py-1 text-xs font-black text-foreground shadow-xs backdrop-blur-sm">
                                                  CAMPING & ALPINE
                                             </span>
                                             <span className="rounded-xl bg-secondary/90 px-3 py-1 text-xs font-extrabold text-white shadow-xs">
                                                  TOP RATED
                                             </span>
                                        </div>

                                        {/* Stylized Center Display */}
                                        <div className="flex flex-col items-center justify-center py-4 text-center">
                                             <div className="flex size-24 items-center justify-center rounded-3xl bg-primary/10 text-primary border border-primary/20 shadow-inner group-hover:scale-110 transition-transform">
                                                  <PackageCheck className="size-12 stroke-[1.8]" />
                                             </div>
                                             <h3 className="mt-3 text-lg font-black text-foreground">
                                                  Big Agnes Copper Spur HV 3P
                                             </h3>
                                             <p className="text-xs font-semibold text-muted-foreground">
                                                  Ultralight 3-Season Weatherproof Expedition Tent
                                             </p>
                                        </div>

                                        <div className="flex items-center justify-between text-xs font-bold text-muted-foreground/80 border-t border-border/50 pt-3">
                                             <span>📦 Weight: 1.58 kg</span>
                                             <span>🛡️ Sanitized & Inspected</span>
                                        </div>
                                   </div>

                                   {/* Card Bottom Pricing & Details CTA */}
                                   <div className="flex items-center justify-between border-t border-border/60 pt-4">
                                        <div>
                                             <span className="text-xs font-semibold text-muted-foreground">
                                                  Retail: $580
                                             </span>
                                             <div className="flex items-baseline gap-1">
                                                  <span className="text-2xl font-black text-primary">$32</span>
                                                  <span className="text-xs font-bold text-muted-foreground">/day</span>
                                             </div>
                                        </div>
                                        <Link
                                             href="/gear"
                                             className="flex items-center gap-1.5 rounded-2xl bg-primary px-4 py-2 text-xs font-black text-primary-foreground shadow-sm transition-all hover:bg-primary/90"
                                        >
                                             <span>Reserve Now</span>
                                             <ChevronRight className="size-3.5" />
                                        </Link>
                                   </div>
                              </motion.div>

                              {/* Floating Badge 1: Top Left Protection */}
                              <motion.div
                                   initial={{ opacity: 0, x: -20, y: 10 }}
                                   animate={{ opacity: 1, x: 0, y: 0 }}
                                   transition={{ duration: 0.6, delay: 0.4 }}
                                   className="glass-panel absolute -top-6 -left-6 hidden sm:flex items-center gap-3 rounded-2xl border border-border/80 bg-card/95 p-3 shadow-xl backdrop-blur-xl"
                              >
                                   <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                        <ShieldCheck className="size-5" />
                                   </div>
                                   <div>
                                        <p className="text-xs font-extrabold text-foreground">100% Insured Trips</p>
                                        <p className="text-[10px] font-semibold text-muted-foreground">
                                             Gear Shield™ damage waiver
                                        </p>
                                   </div>
                              </motion.div>

                              {/* Floating Badge 2: Bottom Right Fast Delivery */}
                              <motion.div
                                   initial={{ opacity: 0, x: 20, y: 10 }}
                                   animate={{ opacity: 1, x: 0, y: 0 }}
                                   transition={{ duration: 0.6, delay: 0.5 }}
                                   className="glass-panel absolute -bottom-6 -right-4 hidden sm:flex items-center gap-3 rounded-2xl border border-border/80 bg-card/95 p-3 shadow-xl backdrop-blur-xl"
                              >
                                   <div className="flex size-10 items-center justify-center rounded-xl bg-secondary/15 text-secondary">
                                        <Clock className="size-5" />
                                   </div>
                                   <div>
                                        <p className="text-xs font-extrabold text-foreground">Same-Day Dispatch</p>
                                        <p className="text-[10px] font-semibold text-muted-foreground">
                                             Local hub or doorstep box
                                        </p>
                                   </div>
                              </motion.div>
                         </div>
                    </div>

                    {/* Industrial Impact Stats Counter Bar */}
                    <div className="mt-16 grid grid-cols-2 gap-4 rounded-3xl border border-border/70 bg-card/60 p-6 backdrop-blur-lg sm:grid-cols-4 sm:gap-6 shadow-sm">
                         <div className="space-y-1">
                              <span className="text-2xl font-black text-foreground sm:text-3xl lg:text-4xl">
                                   15,000<span className="text-primary">+</span>
                              </span>
                              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                                   Premium Gear Items
                              </p>
                         </div>
                         <div className="space-y-1">
                              <span className="text-2xl font-black text-foreground sm:text-3xl lg:text-4xl">
                                   99.8<span className="text-secondary">%</span>
                              </span>
                              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                                   5-Star Trip Ratings
                              </p>
                         </div>
                         <div className="space-y-1">
                              <span className="text-2xl font-black text-foreground sm:text-3xl lg:text-4xl">
                                   $2.8M<span className="text-primary">+</span>
                              </span>
                              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                                   Saved vs Buying
                              </p>
                         </div>
                         <div className="space-y-1">
                              <span className="text-2xl font-black text-foreground sm:text-3xl lg:text-4xl">
                                   12-Pt<span className="text-emerald-500">✓</span>
                              </span>
                              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                                   Field Safety Checked
                              </p>
                         </div>
                    </div>
               </div>
          </section>
     )
}
