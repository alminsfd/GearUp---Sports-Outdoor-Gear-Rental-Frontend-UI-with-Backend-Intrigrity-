'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { Calculator, Check, ArrowRight, Leaf, Shield } from 'lucide-react'
import { FadeIn } from './motion-wrapper'

interface ActivityOption {
     id: string
     name: string
     retailPrice: number
     dailyRental: number
     carbonSavedPerTrip: number
     includedGear: string
     categoryQuery: string
}

const activities: ActivityOption[] = [
     {
          id: 'camping',
          name: 'Backpacking Expedition',
          retailPrice: 1850,
          dailyRental: 32,
          carbonSavedPerTrip: 86,
          includedGear: 'Ultralight 3P Tent, 800-Fill Sleeping Bag, Inflatable Pad, Stove Kit & 65L Pack',
          categoryQuery: 'Camping',
     },
     {
          id: 'mtb',
          name: 'Mountain Biking Weekend',
          retailPrice: 4200,
          dailyRental: 75,
          carbonSavedPerTrip: 145,
          includedGear: 'Carbon Full-Suspension 29er MTB, Full-Face Helmet, Knee/Elbow Guards & Floor Pump',
          categoryQuery: 'Cycling',
     },
     {
          id: 'cinema',
          name: '4K Cinema / Drone Shoot',
          retailPrice: 5600,
          dailyRental: 89,
          carbonSavedPerTrip: 98,
          includedGear: 'Cinema 4K Camera Body, 24-70mm f/2.8 GM Lens, Carbon Gimbal & 4K Drone Kit',
          categoryQuery: 'Cameras',
     },
     {
          id: 'climbing',
          name: 'Alpine Rock & Mountaineering',
          retailPrice: 1450,
          dailyRental: 28,
          carbonSavedPerTrip: 65,
          includedGear: 'Certified Dynamic Rope 70m, Belay System, Harness, Helmet, Crampons & Ice Axe',
          categoryQuery: 'Climbing',
     },
     {
          id: 'paddle',
          name: 'Paddling & Kayaking Trip',
          retailPrice: 1600,
          dailyRental: 36,
          carbonSavedPerTrip: 72,
          includedGear: 'Touring Tandem Kayak / High-Pressure SUP, Carbon Paddles, PFDs & Dry Duffel',
          categoryQuery: 'Water Sports',
     },
]

export function GearCalculator() {
     const [selectedActivityId, setSelectedActivityId] = useState('camping')
     const [days, setDays] = useState(3)

     const currentActivity = useMemo(() => {
          return activities.find((a) => a.id === selectedActivityId) || activities[0]
     }, [selectedActivityId])

     const rentalCost = currentActivity.dailyRental * days
     const savings = currentActivity.retailPrice - rentalCost
     const savingsPercent = Math.round((savings / currentActivity.retailPrice) * 100)
     const carbonSaved = Math.round(currentActivity.carbonSavedPerTrip * (1 + (days - 1) * 0.15))

     return (
          <section className="relative py-16 lg:py-24">
               {/* Ambient Glow */}
               <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-full max-w-5xl bg-primary/10 blur-[140px]" />

               <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <FadeIn className="glass-panel relative overflow-hidden rounded-[2.5rem] border border-border/80 bg-card/90 p-8 sm:p-12 lg:p-16 shadow-2xl backdrop-blur-xl">
                         {/* Header */}
                         <div className="max-w-3xl space-y-3">
                              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                                   <Calculator className="size-3.5" />
                                   <span>Interactive Adventure ROI Calculator</span>
                              </div>
                              <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                                   Calculate Your <span className="text-gradient-kinetic">Rent vs. Buy Savings</span>
                              </h2>
                              <p className="text-sm sm:text-base font-medium text-muted-foreground">
                                   Compare the actual cost of purchasing flagship equipment with maintaining and storing it vs. renting peak-calibrated gear only when you need it.
                              </p>
                         </div>

                         {/* Calculator Body */}
                         <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                              {/* Left Config Controls (7 Cols) */}
                              <div className="space-y-8 lg:col-span-7">
                                   {/* Step 1: Select Activity */}
                                   <div>
                                        <label className="text-xs font-black tracking-wider text-muted-foreground uppercase">
                                             1. Choose Your Adventure Category
                                        </label>
                                        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                             {activities.map((act) => {
                                                  const isSelected = act.id === selectedActivityId
                                                  return (
                                                       <button
                                                            key={act.id}
                                                            type="button"
                                                            onClick={() => setSelectedActivityId(act.id)}
                                                            className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-left transition-all duration-200 cursor-pointer ${
                                                                 isSelected
                                                                      ? 'border-primary bg-primary/10 text-primary shadow-sm ring-1 ring-primary/40'
                                                                      : 'border-border/80 bg-muted/40 text-foreground hover:bg-muted hover:border-primary/30'
                                                            }`}
                                                       >
                                                            <span className="text-xs font-extrabold">{act.name}</span>
                                                            {isSelected && <Check className="size-4 stroke-[3]" />}
                                                       </button>
                                                  )
                                             })}
                                        </div>
                                   </div>

                                   {/* Included Gear Summary */}
                                   <div className="rounded-2xl border border-border/70 bg-muted/30 p-4">
                                        <span className="text-[11px] font-black text-primary uppercase tracking-wider">
                                             Included Kit Bundle
                                        </span>
                                        <p className="mt-1 text-xs font-semibold text-foreground/90">
                                             {currentActivity.includedGear}
                                        </p>
                                   </div>

                                   {/* Step 2: Trip Duration Slider */}
                                   <div>
                                        <div className="flex items-center justify-between">
                                             <label className="text-xs font-black tracking-wider text-muted-foreground uppercase">
                                                  2. Trip Duration
                                             </label>
                                             <span className="text-base font-black text-primary font-mono">
                                                  {days} {days === 1 ? 'Day' : 'Days'}
                                             </span>
                                        </div>
                                        <div className="mt-4">
                                             <input
                                                  type="range"
                                                  min={1}
                                                  max={14}
                                                  step={1}
                                                  value={days}
                                                  onChange={(e) => setDays(Number(e.target.value))}
                                                  className="w-full accent-emerald-500 cursor-pointer h-2 bg-muted rounded-lg"
                                             />
                                             <div className="mt-2 flex justify-between text-[11px] font-bold text-muted-foreground">
                                                  <span>1 Day (Quick Weekend)</span>
                                                  <span>7 Days (Week Expedition)</span>
                                                  <span>14 Days (Extended Journey)</span>
                                             </div>
                                        </div>
                                   </div>
                              </div>

                              {/* Right Result Card (5 Cols) */}
                              <div className="lg:col-span-5">
                                   <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-linear-to-b from-card to-card/95 p-8 shadow-xl">
                                        <div className="pointer-events-none absolute -top-12 -right-12 size-40 rounded-full bg-primary/20 blur-2xl" />

                                        <div className="space-y-6">
                                             <div>
                                                  <span className="text-xs font-bold text-muted-foreground">
                                                       Total Direct Savings
                                                  </span>
                                                  <div className="mt-1 flex items-baseline gap-2">
                                                       <span className="text-4xl sm:text-5xl font-black text-gradient-kinetic">
                                                            ${savings.toLocaleString()}
                                                       </span>
                                                       <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-black text-emerald-600 dark:text-emerald-400">
                                                            SAVE {savingsPercent}%
                                                       </span>
                                                  </div>
                                             </div>

                                             <div className="space-y-3 border-t border-b border-border/70 py-5 text-xs font-bold">
                                                  <div className="flex items-center justify-between">
                                                       <span className="text-muted-foreground">Buying Retail Price:</span>
                                                       <span className="text-foreground line-through decoration-destructive decoration-2">
                                                            ${currentActivity.retailPrice.toLocaleString()}
                                                       </span>
                                                  </div>
                                                  <div className="flex items-center justify-between text-sm">
                                                       <span className="text-foreground font-black">GearUp Rental ({days} days):</span>
                                                       <span className="text-primary font-black">${rentalCost}</span>
                                                  </div>
                                                  <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400">
                                                       <span className="flex items-center gap-1">
                                                            <Leaf className="size-3.5" /> Carbon Avoided:
                                                       </span>
                                                       <span>~{carbonSaved} kg CO₂e</span>
                                                  </div>
                                             </div>

                                             <div className="space-y-2 text-[11px] font-semibold text-muted-foreground">
                                                  <div className="flex items-center gap-1.5">
                                                       <Shield className="size-3.5 text-primary" />
                                                       <span>Includes Gear Shield™ damage protection</span>
                                                  </div>
                                                  <div className="flex items-center gap-1.5">
                                                       <Check className="size-3.5 text-primary" />
                                                       <span>Cleaned & inspected before dispatch</span>
                                                  </div>
                                             </div>

                                             <Link
                                                  href={`/gear?category=${encodeURIComponent(currentActivity.categoryQuery)}`}
                                                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-sm font-extrabold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:scale-[1.02] hover:bg-primary/90"
                                             >
                                                  <span>Book This Gear Setup</span>
                                                  <ArrowRight className="size-4" />
                                             </Link>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </FadeIn>
               </div>
          </section>
     )
}
