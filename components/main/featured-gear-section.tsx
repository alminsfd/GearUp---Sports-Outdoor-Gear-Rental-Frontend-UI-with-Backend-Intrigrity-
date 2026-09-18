'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Compass, Flame, CheckCircle2 } from 'lucide-react'
import { IGear } from '@/types/gear'
import { GearCard } from '@/components/gear/gear-card'
import { FadeIn } from './motion-wrapper'

type FilterCategory = 'all' | 'camping' | 'cycling' | 'cameras' | 'hiking'

interface FeaturedGearSectionProps {
     initialGears?: IGear[]
}

const fallbackFeaturedGears: IGear[] = [
     {
          id: 'mock-1',
          title: 'MSR Hubba Hubba NX 2-Person Lightweight Tent',
          description: 'Engineered for 3-season backpacking with ultra-durable Easton Syclone poles and stay-dry rainfly.',
          pricePerDay: 28,
          brand: 'MSR Gear',
          stock: 4,
          isAvailable: true,
          images: ['https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80'],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          categoryId: 'cat-1',
          providerId: 'prov-1',
          category: { id: 'cat-1', name: 'Camping' },
          provider: { id: 'prov-1', name: 'Summit Pro Rentals', email: 'summit@gearup.io', profileImage: '' },
     },
     {
          id: 'mock-2',
          title: 'Specialized Stumpjumper Pro Carbon Trail Bike',
          description: 'Full-suspension 29er carbon mountain bike built to shred technical singletracks and flow trails.',
          pricePerDay: 75,
          brand: 'Specialized',
          stock: 2,
          isAvailable: true,
          images: ['https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80'],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          categoryId: 'cat-2',
          providerId: 'prov-2',
          category: { id: 'cat-2', name: 'Cycling' },
          provider: { id: 'prov-2', name: 'Alpine Cycles Hub', email: 'alpine@gearup.io', profileImage: '' },
     },
     {
          id: 'mock-3',
          title: 'Sony FX3 Cinema Line Full-Frame 4K Camera Rig',
          description: 'High-mobility cinema camera paired with 24-70mm GM lens and carbon fiber gimbal for expedition filmmakers.',
          pricePerDay: 85,
          brand: 'Sony',
          stock: 3,
          isAvailable: true,
          images: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80'],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          categoryId: 'cat-3',
          providerId: 'prov-3',
          category: { id: 'cat-3', name: 'Cameras' },
          provider: { id: 'prov-3', name: 'Apex Media Gear', email: 'apex@gearup.io', profileImage: '' },
     },
     {
          id: 'mock-4',
          title: 'Petzl Grigri + Vector Helmet + Dynamic Rope 70m',
          description: 'Complete certified sport climbing package with bi-pattern dry-treated rope and lightweight harness.',
          pricePerDay: 24,
          brand: 'Petzl',
          stock: 5,
          isAvailable: true,
          images: ['https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=800&q=80'],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          categoryId: 'cat-4',
          providerId: 'prov-4',
          category: { id: 'cat-4', name: 'Climbing' },
          provider: { id: 'prov-4', name: 'RockCraft Guides', email: 'rockcraft@gearup.io', profileImage: '' },
     },
     {
          id: 'mock-5',
          title: 'Osprey Atmos AG 65L Anti-Gravity Backpack',
          description: 'Industry-standard expedition pack with seamless suspended mesh backpanel for multi-day treks.',
          pricePerDay: 19,
          brand: 'Osprey',
          stock: 6,
          isAvailable: true,
          images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80'],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          categoryId: 'cat-1',
          providerId: 'prov-1',
          category: { id: 'cat-1', name: 'Camping' },
          provider: { id: 'prov-1', name: 'Summit Pro Rentals', email: 'summit@gearup.io', profileImage: '' },
     },
     {
          id: 'mock-6',
          title: 'DJI Mavic 3 Pro Cine Drone with Fly More Combo',
          description: 'Triple-camera drone system with Hasselblad optics, omnidirectional obstacle sensing, and 43 min flight time.',
          pricePerDay: 68,
          brand: 'DJI',
          stock: 2,
          isAvailable: true,
          images: ['https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=800&q=80'],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          categoryId: 'cat-3',
          providerId: 'prov-3',
          category: { id: 'cat-3', name: 'Cameras' },
          provider: { id: 'prov-3', name: 'Apex Media Gear', email: 'apex@gearup.io', profileImage: '' },
     },
     {
          id: 'mock-7',
          title: 'Red Paddle Co 10ft 6in Inflatable All-Rounder SUP',
          description: 'Stiff MSL fusion composite stand-up paddleboard with 3-piece carbon paddle and dry duffel bag.',
          pricePerDay: 35,
          brand: 'Red Paddle',
          stock: 3,
          isAvailable: true,
          images: ['https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80'],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          categoryId: 'cat-5',
          providerId: 'prov-5',
          category: { id: 'cat-5', name: 'Water Sports' },
          provider: { id: 'prov-5', name: 'Ocean Currents Co', email: 'ocean@gearup.io', profileImage: '' },
     },
     {
          id: 'mock-8',
          title: 'Garmin inReach Explorer+ Satellite Communicator',
          description: 'Global Iridium satellite SOS, 2-way text messaging, Topo maps, and tracking for remote wilderness.',
          pricePerDay: 16,
          brand: 'Garmin',
          stock: 7,
          isAvailable: true,
          images: ['https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80'],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          categoryId: 'cat-1',
          providerId: 'prov-1',
          category: { id: 'cat-1', name: 'Camping' },
          provider: { id: 'prov-1', name: 'Summit Pro Rentals', email: 'summit@gearup.io', profileImage: '' },
     },
]

export function FeaturedGearSection({ initialGears }: FeaturedGearSectionProps) {
     const [activeFilter, setActiveFilter] = useState<'all' | 'camping' | 'cycling' | 'cameras' | 'hiking'>('all')

     // Use fetched gears if >= 4 items, else use curated mock dataset
     const gearsList = initialGears && initialGears.length >= 4 ? initialGears : fallbackFeaturedGears

     const filteredGears = useMemo(() => {
          if (activeFilter === 'all') return gearsList.slice(0, 8)
          return gearsList.filter((item) => {
               const cat = (item.category?.name || '').toLowerCase()
               if (activeFilter === 'camping') return cat.includes('camp') || cat.includes('hike')
               if (activeFilter === 'cycling') return cat.includes('cycl') || cat.includes('bike')
               if (activeFilter === 'cameras') return cat.includes('cam') || cat.includes('photo') || cat.includes('drone')
               if (activeFilter === 'hiking') return cat.includes('hikin') || cat.includes('alpine')
               return true
          }).slice(0, 8)
     }, [gearsList, activeFilter])

     return (
          <section className="relative py-16 lg:py-24">
               {/* Background subtle radial glow */}
               <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 h-96 w-full max-w-6xl bg-primary/5 blur-[120px]" />

               <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Section Heading & Filter Tabs */}
                    <FadeIn className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                         <div className="space-y-3">
                              <div className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-secondary">
                                   <Flame className="size-3.5 fill-current" />
                                   <span>Trending Gear Rentals</span>
                              </div>
                              <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                                   Field-Ready <span className="text-gradient-kinetic">Top Rated Equipment</span>
                              </h2>
                              <p className="max-w-xl text-sm font-medium text-muted-foreground sm:text-base">
                                   Every item is sanitized, safety checked, and guaranteed covered under Gear Shield™.
                              </p>
                         </div>

                         {/* Filter Pill Tabs */}
                         <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-border/80 bg-card/80 p-1.5 backdrop-blur-md">
                              {[
                                   { id: 'all', label: 'All Gear' },
                                   { id: 'camping', label: 'Camping' },
                                   { id: 'cycling', label: 'cycling' },
                                   { id: 'cameras', label: 'Cameras' },
                                   { id: 'hiking', label: 'Hiking' },
                              ].map((tab) => {
                                   const isActive = activeFilter === tab.id
                                   return (
                                        <button
                                             key={tab.id}
                                             onClick={() => setActiveFilter(tab.id as FilterCategory)}
                                             className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all duration-200 cursor-pointer ${isActive
                                                  ? 'bg-primary text-primary-foreground shadow-sm'
                                                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/70'
                                                  }`}
                                        >
                                             {tab.label}
                                        </button>
                                   )
                              })}
                         </div>
                    </FadeIn>

                    {/* Products Grid */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                         <AnimatePresence mode="popLayout">
                              {filteredGears.map((gear, idx) => (
                                   <motion.div
                                        key={gear.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.35, delay: idx * 0.05 }}
                                   >
                                        <GearCard gear={gear} />
                                   </motion.div>
                              ))}
                         </AnimatePresence>
                    </div>

                    {/* Bottom CTA to View Full Catalog */}
                    <FadeIn delay={2} className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
                         <Link
                              href="/gear"
                              className="group inline-flex items-center gap-2 rounded-2xl bg-primary px-8 py-4 text-sm font-black text-primary-foreground shadow-xl shadow-primary/20 transition-all duration-300 hover:scale-[1.02] hover:bg-primary/90"
                         >
                              <Compass className="size-4.5" />
                              <span>Explore All {gearsList.length > 8 ? 'Available Gear' : '15,000+ Gear Options'}</span>
                              <ArrowRight className="size-4.5 transition-transform group-hover:translate-x-1" />
                         </Link>

                         <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                              <CheckCircle2 className="size-4 text-emerald-500" />
                              <span>Instant Booking Confirmation</span>
                         </div>
                    </FadeIn>
               </div>
          </section>
     )
}
