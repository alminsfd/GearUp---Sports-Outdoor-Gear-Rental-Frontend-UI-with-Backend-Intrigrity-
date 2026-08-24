'use client'

import { ArrowRight, ChevronDown, ChevronRight, Package, Sparkles, TentTree, Bike, Waves, Fuel } from 'lucide-react'
import Link from 'next/link';

const categories = [
     { title: 'Camping & Hiking', description: 'Shelters, sleep systems, and trail essentials', icon: TentTree, accent: 'orange', count: '248 items' },
     { title: 'Cycling', description: 'Ride-ready bikes, kits, and workshop gear', icon: Bike, accent: 'blue', count: '186 items' },
     { title: 'Water Sports', description: 'Paddle, surf, and open-water equipment', icon: Waves, accent: 'cyan', count: '94 items' },
     { title: 'Road & Travel', description: 'Everything for the next big mile', icon: Fuel, accent: 'slate', count: '132 items' },
]

export function CategoryMenu({ open, setOpen }: { open: boolean; setOpen: (value: boolean) => void }) {
     return (
          <div className="relative">
               <button
                    type="button"
                    onClick={() => setOpen(!open)}
                    className={`nav-link ${open ? 'bg-muted text-foreground' : ''}`}
               >
                    <Package className="size-4" /> Categories <ChevronDown className={`size-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
               </button>

               {open && (
                    <div className="absolute left-1/2 top-[calc(100%+16px)] z-30 w-140 -translate-x-1/2 rounded-3xl border border-border/70 bg-card/95 p-3 shadow-2xl backdrop-blur-xl">
                         <div className="flex items-end justify-between px-3 pb-3 pt-2">
                              <div>
                                   <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Explore the collection</p>
                                   <h2 className="mt-1 text-xl font-bold text-foreground">Find your next adventure</h2>
                              </div>
                              <Link href="/categories" onClick={() => setOpen(false)} className="group flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-primary">
                                   View all <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                              </Link>
                         </div>
                         <div className="grid grid-cols-2 gap-2">
                              {categories.map((category) => {
                                   const Icon = category.icon
                                   return (
                                        <Link key={category.title} href="/browse" onClick={() => setOpen(false)} className="group rounded-2xl border border-border/60 bg-muted/35 p-4 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/5">
                                             <div className={`p-2 rounded-lg w-fit ${category.accent}`}><Icon className="size-5" /></div>
                                             <div className="mt-4 flex items-start justify-between gap-2">
                                                  <div><h3 className="text-sm font-bold text-foreground">{category.title}</h3><p className="mt-1 text-xs text-muted-foreground">{category.description}</p></div>
                                                  <ChevronRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                                             </div>
                                             <p className="mt-3 text-[11px] font-medium text-muted-foreground/80">{category.count}</p>
                                        </Link>
                                   )
                              })}
                         </div>
                         <div className="mt-2 flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-3 text-xs text-foreground">
                              <Sparkles className="size-4 text-primary" />
                              <span>Not sure where to start?</span>
                              <Link href="#how-it-works" onClick={() => setOpen(false)} className="ml-auto font-bold text-primary hover:underline">Take the gear quiz</Link>
                         </div>
                    </div>
               )}
          </div>
     )
}