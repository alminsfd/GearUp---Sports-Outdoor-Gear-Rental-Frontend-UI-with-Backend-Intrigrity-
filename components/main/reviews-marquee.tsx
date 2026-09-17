'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Star, ShieldCheck, Quote } from 'lucide-react'
import { FadeIn, StaggerContainer } from './motion-wrapper'

const testimonials = [
     {
          id: '1',
          name: 'Marcus Vance',
          role: 'Ultralight Mountaineer',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
          rating: 5,
          gearRented: 'MSR Hubba Hubba NX 2P',
          quote: 'Rented this tent for a 6-day traverse through the Cascades. Arrived completely spotless, sealed in an airtight waterproof bag with fresh stakes. Saved over $500 versus buying new.',
          location: 'Seattle, WA',
     },
     {
          id: '2',
          name: 'Elena Rostova',
          role: 'Documentary Filmmaker',
          avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
          rating: 5,
          gearRented: 'Sony FX3 Cinema Rig + Gimbal',
          quote: 'Needed a secondary cinema body for a glacier documentary in Alaska. GearUp couriered it straight to my Anchorage hotel. The sensor was immaculate. Outstanding service!',
          location: 'Denver, CO',
     },
     {
          id: '3',
          name: 'Liam Chen',
          role: 'Enduro MTB Enthusiast',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
          rating: 5,
          gearRented: 'Specialized Stumpjumper Pro',
          quote: 'Flying with a carbon mountain bike is an airline nightmare and fees cost $300 alone. I booked on GearUp and picked it up tuned and ready near the trail. Brakes were razor sharp.',
          location: 'Whistler, BC',
     },
     {
          id: '4',
          name: 'Sarah Jenkins',
          role: 'Weekend Backpacker',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
          rating: 5,
          gearRented: 'Osprey Atmos AG 65L Pack',
          quote: 'I only camp two weekends every summer. Paying $360 for an expedition pack makes no financial sense. Renting for $19/day is the smartest thing to happen to outdoor recreation.',
          location: 'Portland, OR',
     },
     {
          id: '5',
          name: 'David O’Connor',
          role: 'Kayaking Guide',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
          rating: 5,
          gearRented: 'Red Paddle Co 10ft 6in SUP',
          quote: 'Gear Shield gave our family total peace of mind on the lake. Returning it was effortless — just dropped it at the UPS store with the included prepaid barcode.',
          location: 'Lake Tahoe, CA',
     },
     {
          id: '6',
          name: 'Maya Patel',
          role: 'Alpine Climber',
          avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80',
          rating: 5,
          gearRented: 'Petzl Ice Axe & Crampons Kit',
          quote: 'Climbing safety gear requires flawless trust. Every piece had inspection inspection tags and certification dates attached. Truly setting the industrial standard for rental gear.',
          location: 'Boulder, CO',
     },
]

export function ReviewsMarquee() {
     return (
          <section className="relative py-16 lg:py-24">
               <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <FadeIn className="text-center max-w-2xl mx-auto mb-16 space-y-3">
                         <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                              <Star className="size-3.5 fill-primary" />
                              <span>Proven In The Wild</span>
                         </div>
                         <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                              Trusted by Over <span className="text-gradient-kinetic">12,000+ Adventurers</span>
                         </h2>
                         <p className="text-sm sm:text-base font-medium text-muted-foreground">
                              Read authentic dispatches from mountain summits, coastal waterways, and rugged backroads.
                         </p>
                    </FadeIn>

                    {/* Testimonials Grid */}
                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                         {testimonials.map((item) => (
                              <motion.div
                                   key={item.id}
                                   whileHover={{ y: -5 }}
                                   transition={{ duration: 0.25 }}
                                   className="glass-panel relative flex flex-col justify-between rounded-3xl border border-border/80 bg-card/85 p-7 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-primary/40 hover:shadow-lg"
                              >
                                   <div>
                                        {/* Top Star Rating & Quote Icon */}
                                        <div className="flex items-center justify-between">
                                             <div className="flex items-center gap-1 text-amber-400">
                                                  {[...Array(item.rating)].map((_, i) => (
                                                       <Star key={i} className="size-4 fill-current" />
                                                  ))}
                                             </div>
                                             <Quote className="size-6 text-muted-foreground/30" />
                                        </div>

                                        {/* Quote Text */}
                                        <p className="mt-4 text-xs sm:text-sm font-medium text-foreground/90 leading-relaxed italic">
                                             &ldquo;{item.quote}&rdquo;
                                        </p>
                                   </div>

                                   {/* Bottom Reviewer & Gear Tag */}
                                   <div className="mt-6 border-t border-border/50 pt-4 space-y-3">
                                        <div className="flex items-center gap-3">
                                             {/* eslint-disable-next-line @next/next/no-img-element */}
                                             <img
                                                  src={item.avatar}
                                                  alt={item.name}
                                                  className="size-10 rounded-full object-cover border border-primary/30"
                                             />
                                             <div>
                                                  <div className="flex items-center gap-1.5">
                                                       <span className="text-xs font-black text-foreground">{item.name}</span>
                                                       <ShieldCheck className="size-3.5 text-primary" />
                                                  </div>
                                                  <p className="text-[11px] font-semibold text-muted-foreground">
                                                       {item.role} • {item.location}
                                                  </p>
                                             </div>
                                        </div>

                                        <div className="rounded-xl bg-muted/60 px-3 py-1.5 text-[11px] font-bold text-muted-foreground">
                                             🏷️ {item.gearRented}
                                        </div>
                                   </div>
                              </motion.div>
                         ))}
                    </StaggerContainer>
               </div>
          </section>
     )
}
