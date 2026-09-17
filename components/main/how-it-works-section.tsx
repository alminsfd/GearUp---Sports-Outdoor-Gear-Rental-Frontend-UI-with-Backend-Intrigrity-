'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
     CalendarCheck,
     PackageOpen,
     Mountain,
     RotateCcw,
     CheckCircle2,
     ArrowRight,
     Sparkles,
} from 'lucide-react'
import Link from 'next/link'
import { FadeIn, StaggerContainer } from './motion-wrapper'

const steps = [
     {
          number: '01',
          title: 'Reserve Gear & Pick Dates',
          description: 'Choose from thousands of top-tier verified items. Select your adventure dates with real-time stock availability.',
          icon: CalendarCheck,
          accent: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
          badge: 'Takes 2 Minutes',
     },
     {
          number: '02',
          title: 'Direct Dispatch or Local Hub',
          description: 'Your gear arrives 1-2 days before your departure in a weather-resistant case, or pick it up at a basecamp hub.',
          icon: PackageOpen,
          accent: 'text-orange-500 bg-orange-500/10 border-orange-500/20',
          badge: 'Free Early Arrival',
     },
     {
          number: '03',
          title: 'Embark with Gear Shield™',
          description: 'Hike, camp, ride, or film with confidence. Minor wear, trail dust, and rain are 100% insured under our guarantee.',
          icon: Mountain,
          accent: 'text-cyan-500 bg-cyan-500/10 border-cyan-500/20',
          badge: 'Zero Stress',
     },
     {
          number: '04',
          title: 'Easy Return, No Cleaning',
          description: 'Simply slide the equipment back into the return box with our prepaid label and hand it to any carrier. We handle all sanitization.',
          icon: RotateCcw,
          accent: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
          badge: 'Prepaid Label',
     },
]

export function HowItWorksSection() {
     return (
          <section className="relative py-16 lg:py-24 overflow-hidden">
               {/* Ambient Glow */}
               <div className="pointer-events-none absolute bottom-0 right-10 size-96 rounded-full bg-primary/10 blur-[130px]" />

               <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <FadeIn className="text-center max-w-2xl mx-auto mb-16 space-y-3">
                         <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                              <Sparkles className="size-3.5" />
                              <span>Frictionless Rental Cycle</span>
                         </div>
                         <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                              How <span className="text-gradient-kinetic">GearUp Works</span>
                         </h2>
                         <p className="text-sm sm:text-base font-medium text-muted-foreground">
                              From booking to the backcountry and back home in four simple, fully insured steps.
                         </p>
                    </FadeIn>

                    {/* Steps Grid with Timeline styling */}
                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
                         {steps.map((step, idx) => {
                              const Icon = step.icon
                              return (
                                   <motion.div
                                        key={step.number}
                                        whileHover={{ y: -6 }}
                                        transition={{ duration: 0.25 }}
                                        className="glass-panel relative flex flex-col justify-between rounded-3xl border border-border/80 bg-card/85 p-7 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-primary/40 hover:shadow-lg"
                                   >
                                        <div>
                                             {/* Step Number & Badge */}
                                             <div className="flex items-center justify-between">
                                                  <span className="text-3xl font-black text-muted-foreground/30 font-mono">
                                                       {step.number}
                                                  </span>
                                                  <span className="rounded-full border border-border/60 bg-muted/60 px-2.5 py-0.5 text-[11px] font-bold text-muted-foreground">
                                                       {step.badge}
                                                  </span>
                                             </div>

                                             {/* Icon */}
                                             <div className={`mt-6 flex size-14 items-center justify-center rounded-2xl border shadow-sm ${step.accent}`}>
                                                  <Icon className="size-7 stroke-[1.8]" />
                                             </div>

                                             {/* Title & Desc */}
                                             <h3 className="mt-5 text-lg font-black text-foreground tracking-tight">
                                                  {step.title}
                                             </h3>
                                             <p className="mt-2 text-xs font-medium text-muted-foreground leading-relaxed">
                                                  {step.description}
                                             </p>
                                        </div>

                                        {/* Step Progress Line */}
                                        <div className="mt-8 flex items-center gap-2 border-t border-border/50 pt-4">
                                             <CheckCircle2 className="size-4 text-primary" />
                                             <span className="text-xs font-bold text-foreground/80">Step {idx + 1} of 4</span>
                                        </div>
                                   </motion.div>
                              )
                         })}
                    </StaggerContainer>

                    {/* Quick Call to Action Link */}
                    <FadeIn delay={2} className="mt-12 text-center">
                         <Link
                              href="/how-it-works"
                              className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
                         >
                              <span>Learn more about our logistics and hygiene standards</span>
                              <ArrowRight className="size-4" />
                         </Link>
                    </FadeIn>
               </div>
          </section>
     )
}
