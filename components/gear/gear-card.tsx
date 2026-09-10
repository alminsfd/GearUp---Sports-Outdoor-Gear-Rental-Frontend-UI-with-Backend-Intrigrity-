'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, ChevronRight, Star } from 'lucide-react'
import { IGear } from '@/types/gear'

interface GearCardProps {
     gear: IGear
}

export function GearCard({ gear }: GearCardProps) {
     // Dynamic fallback or calculated discount & original price
     const discountPercent = gear.isAvailable ? 15 : 0
     const originalPrice = Math.round(gear.pricePerDay * 1.25)
     const rating = 4.8 // Default or dynamic review rating

     // Contextual dynamic specs with cute icons matching the design
     const categoryLower = gear.category?.name?.toLowerCase() || ''
     const spec1 = categoryLower.includes('camp') || categoryLower.includes('tent')
          ? '⛺ 4 Person'
          : categoryLower.includes('cycl') || categoryLower.includes('bike')
          ? '🚴 Pro Frame'
          : categoryLower.includes('cam') || categoryLower.includes('photo')
          ? '📷 4K Ultra'
          : categoryLower.includes('climb')
          ? '🧗 All-Terrain'
          : `⛺ ${gear.brand || 'Outdoor'}`

     const spec2 = gear.stock > 0 ? '🎒 Lightweight' : '🎒 Out of Stock'

     return (
          <div className="group relative flex flex-col justify-between rounded-3xl border border-border/70 bg-card/90 backdrop-blur-sm p-4 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_35px_-8px_rgba(16,185,129,0.12)] hover:border-primary/40">
               <div>
                    {/* Top Badge: Red pill showing discount or availability */}
                    <div className="flex items-center justify-between">
                         {gear.isAvailable ? (
                              <div className="flex items-center gap-1 rounded-full bg-red-500 px-2.5 py-0.5 text-[11px] font-black text-white shadow-sm">
                                   <ArrowDown className="size-3 stroke-[3]" />
                                   <span>{discountPercent}% OFF</span>
                              </div>
                         ) : (
                              <div className="rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-black text-muted-foreground shadow-sm">
                                   RENTED
                              </div>
                         )}
                    </div>

                    {/* Image Area: Clean aspect-ratio container with image centered on soft background */}
                    <div className="relative my-2 aspect-square w-full overflow-hidden rounded-2xl bg-muted/40 p-4 flex items-center justify-center">
                         <Image
                              src={gear.images?.[0] || '/placeholder-gear.jpg'}
                              alt={gear.title}
                              fill
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                              className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                         />
                    </div>

                    {/* Card Body */}
                    <div className="space-y-1 pt-1">
                         {/* Category & Rating */}
                         <div className="flex items-center justify-between gap-2">
                              <span className="text-[11px] font-black tracking-wider text-primary uppercase truncate">
                                   {gear.category?.name || 'OUTDOOR GEAR'}
                              </span>
                              <div className="flex items-center gap-1 text-xs font-black text-foreground shrink-0">
                                   <Star className="size-3.5 fill-amber-400 text-amber-400" />
                                   <span>{rating}</span>
                              </div>
                         </div>

                         {/* Title */}
                         <h3 className="text-base font-extrabold text-foreground line-clamp-1 tracking-tight transition-colors group-hover:text-primary">
                              {gear.title}
                         </h3>

                         {/* Specs Line with small icons */}
                         <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground truncate pt-0.5">
                              <span>{spec1}</span>
                              <span className="text-border">•</span>
                              <span>{spec2}</span>
                         </div>
                    </div>
               </div>

               {/* Bottom Section: Old price crossed out, bold current price, and Details button */}
               <div className="mt-4 flex items-end justify-between border-t border-border/50 pt-3">
                    <div className="flex flex-col">
                         <span className="text-xs font-semibold text-muted-foreground/70 line-through leading-none">
                              ${originalPrice}
                         </span>
                         <div className="mt-1 flex items-baseline gap-1">
                              <span className="text-xl md:text-2xl font-black text-primary tracking-tight leading-none">
                                   ${gear.pricePerDay}
                              </span>
                              <span className="text-xs font-bold text-muted-foreground">/day</span>
                         </div>
                    </div>

                    <Link
                         href={`/gear/${gear.id}`}
                         className="flex items-center gap-1 rounded-full bg-muted/80 px-3.5 py-1.5 text-xs font-bold text-foreground transition-all hover:bg-primary hover:text-primary-foreground group-hover:bg-primary/10 group-hover:text-primary"
                    >
                         <span>DETAILS</span>
                         <ChevronRight className="size-3.5 stroke-[2.5]" />
                    </Link>
               </div>
          </div>
     )
}