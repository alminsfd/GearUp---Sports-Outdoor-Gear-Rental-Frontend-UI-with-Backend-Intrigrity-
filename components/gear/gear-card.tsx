'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Tag } from 'lucide-react'
import { IGear } from '@/types/gear'



export function GearCard({ gear }: { gear: IGear }) {
     return (
          <Card className="group overflow-hidden rounded-2xl border border-border/60 bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
               {/* Image Container */}
               <div className="relative aspect-4/3 w-full overflow-hidden bg-muted">
                    <Image
                         src={gear.imageUrl || '/placeholder-gear.jpg'}
                         alt={gear.title}
                         fill
                         sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                         className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute left-3 top-3 flex gap-2">
                         <Badge className="bg-background/80 font-semibold text-foreground backdrop-blur-md">
                              {gear.category}
                         </Badge>
                    </div>
                    <div className="absolute right-3 top-3">
                         <Badge
                              variant={gear.isAvailable ? 'default' : 'destructive'}
                              className={gear.isAvailable ? 'bg-emerald-500 hover:bg-emerald-600' : ''}
                         >
                              {gear.isAvailable ? 'Available' : 'Rented'}
                         </Badge>
                    </div>
               </div>

               {/* Content */}
               <CardContent className="p-4">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                         <Tag className="size-3.5 text-primary" />
                         <span>{gear.brand}</span>
                    </div>
                    <h3 className="mt-1 line-clamp-1 font-bold text-foreground transition-colors group-hover:text-primary">
                         {gear.title}
                    </h3>
               </CardContent>

               {/* Footer */}
               <CardFooter className="flex items-center justify-between border-t border-border/40 p-4 pt-3">
                    <div>
                         <span className="text-lg font-extrabold text-foreground">${gear.pricePerDay}</span>
                         <span className="text-xs text-muted-foreground"> / day</span>
                    </div>
                    <Link
                         href={`/gear/${gear.id}`}
                         className="rounded-xl bg-primary px-3.5 py-2 text-xs font-bold text-primary-foreground transition-all hover:opacity-90 active:scale-95"
                    >
                         View Details
                    </Link>
               </CardFooter>
          </Card>
     )
}