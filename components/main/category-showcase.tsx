'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
     Tent,
     Bike,
     Camera,
     Mountain,
     Waves,
     ArrowRight,
     ChevronRight,
     Flame,
     Dumbbell,
} from 'lucide-react'
import { ICategoryListItem } from '@/types/catagory'
import { FadeIn, StaggerContainer } from './motion-wrapper'

interface CategoryShowcaseProps {
     categories?: ICategoryListItem[]
}

const fallbackCategories = [
     {
          id: '1',
          name: 'Camping & Hiking',
          description: 'Expedition tents, lightweight packs, alpine sleeping bags, & cooking systems.',
          icon: Tent,
          color: 'from-emerald-500/20 via-emerald-500/5 to-transparent',
          accent: 'text-emerald-500',
          count: '420+ Items',
     },
     {
          id: '2',
          name: 'Mountain Biking',
          description: 'Carbon full-suspension MTBs, gravel rigs, downhill protection & roof racks.',
          icon: Bike,
          color: 'from-orange-500/20 via-orange-500/5 to-transparent',
          accent: 'text-orange-500',
          count: '280+ Items',
     },
     {
          id: '3',
          name: 'Action Cameras & Drones',
          description: '4K/8K stabilization cams, cinematic drones, underwater housings & mounts.',
          icon: Camera,
          color: 'from-cyan-500/20 via-cyan-500/5 to-transparent',
          accent: 'text-cyan-500',
          count: '190+ Items',
     },
     {
          id: '4',
          name: 'Climbing & Alpine',
          description: 'Dynamic ropes, belay devices, harnesses, crash pads, & mountaineering ice axes.',
          icon: Mountain,
          color: 'from-amber-500/20 via-amber-500/5 to-transparent',
          accent: 'text-amber-500',
          count: '150+ Items',
     },
     {
          id: '5',
          name: 'Water Sports & Kayaks',
          description: 'Touring kayaks, touring inflatable SUPs, drysuits, paddles & waterproof packs.',
          icon: Waves,
          color: 'from-blue-500/20 via-blue-500/5 to-transparent',
          accent: 'text-blue-500',
          count: '130+ Items',
     },
     {
          id: '6',
          name: 'Fitness & Conditioning',
          description: 'Portable training setups, kettlebells, rowing rigs & field recovery devices.',
          icon: Dumbbell,
          color: 'from-purple-500/20 via-purple-500/5 to-transparent',
          accent: 'text-purple-500',
          count: '95+ Items',
     },
]

export function CategoryShowcase({ categories }: CategoryShowcaseProps) {
     // If backend categories exist, merge them or use high-aesthetic cards
     const displayCategories = categories && categories.length > 0
          ? categories.slice(0, 6).map((c, idx) => {
                 const fallback = fallbackCategories[idx % fallbackCategories.length]
                 const gearCount = (c as { _count?: { gears?: number } })._count?.gears ?? (50 + idx * 25)
                 return {
                      id: c.id,
                      name: c.name,
                      description: c.description || fallback.description,
                      icon: fallback.icon,
                      color: fallback.color,
                      accent: fallback.accent,
                      count: `${gearCount}+ Items`,
                 }
            })
          : fallbackCategories

     return (
          <section className="relative py-16 lg:py-24">
               <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Section Header */}
                    <FadeIn className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                         <div className="space-y-3">
                              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                                   <Flame className="size-3.5 text-primary" />
                                   <span>Curated Collections</span>
                              </div>
                              <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                                   Equip by Your Next <span className="text-gradient-kinetic">Sport & Discipline</span>
                              </h2>
                              <p className="max-w-xl text-sm font-medium text-muted-foreground sm:text-base">
                                   Find calibrated expedition-grade gear vetted by professionals for any altitude, climate, or terrain.
                              </p>
                         </div>

                         <Link
                              href="/catagory"
                              className="group inline-flex items-center gap-2 text-sm font-extrabold text-primary hover:text-primary/80 transition-colors shrink-0"
                         >
                              <span>View All Categories</span>
                              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                         </Link>
                    </FadeIn>

                    {/* Categories Grid */}
                    <StaggerContainer className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                         {displayCategories.map((cat) => {
                              const Icon = cat.icon
                              return (
                                   <motion.div
                                        key={cat.id}
                                        whileHover={{ y: -6 }}
                                        transition={{ duration: 0.25, ease: 'easeOut' }}
                                   >
                                        <Link
                                             href={`/gear?category=${encodeURIComponent(cat.name)}`}
                                             className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border/80 bg-card/85 p-7 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-primary/50 hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.15)] h-full"
                                        >
                                             {/* Top ambient color glow */}
                                             <div
                                                  className={`pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-b ${cat.color} opacity-70 group-hover:opacity-100 transition-opacity`}
                                             />

                                             <div>
                                                  {/* Icon & Count Badge */}
                                                  <div className="relative z-10 flex items-center justify-between">
                                                       <div
                                                            className={`flex size-14 items-center justify-center rounded-2xl border border-border/60 bg-card/90 shadow-sm transition-transform duration-300 group-hover:scale-110 ${cat.accent}`}
                                                       >
                                                            <Icon className="size-7 stroke-[1.8]" />
                                                       </div>
                                                       <span className="rounded-full border border-border/60 bg-muted/60 px-3 py-1 text-xs font-bold text-muted-foreground">
                                                            {cat.count}
                                                       </span>
                                                  </div>

                                                  {/* Category Details */}
                                                  <div className="relative z-10 mt-6 space-y-2">
                                                       <h3 className="text-xl font-black text-foreground tracking-tight transition-colors group-hover:text-primary">
                                                            {cat.name}
                                                       </h3>
                                                       <p className="text-xs font-medium text-muted-foreground leading-relaxed">
                                                            {cat.description}
                                                       </p>
                                                  </div>
                                             </div>

                                             {/* Card Footer Link Hint */}
                                             <div className="relative z-10 mt-6 flex items-center justify-between border-t border-border/50 pt-4 text-xs font-black text-foreground/80 group-hover:text-primary transition-colors">
                                                  <span>Explore Gear</span>
                                                  <div className="flex size-7 items-center justify-center rounded-full bg-muted/70 transition-all group-hover:bg-primary group-hover:text-primary-foreground">
                                                       <ChevronRight className="size-4" />
                                                  </div>
                                             </div>
                                        </Link>
                                   </motion.div>
                              )
                         })}
                    </StaggerContainer>
               </div>
          </section>
     )
}
