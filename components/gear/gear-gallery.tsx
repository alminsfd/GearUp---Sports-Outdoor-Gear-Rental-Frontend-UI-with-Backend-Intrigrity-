'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'

interface GearGalleryProps {
     images: string[]
     title: string
}

export function GearGallery({ images, title }: GearGalleryProps) {
     const [selectedImage, setSelectedImage] = useState(0)
     const displayImages = images?.length > 0 ? images : ['/placeholder-gear.jpg']

     const handlePrev = () => {
          setSelectedImage((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1))
     }

     const handleNext = () => {
          setSelectedImage((prev) => (prev === displayImages.length - 1 ? 0 : prev + 1))
     }

     return (
          <div className="space-y-4">
               {/* Main Large Image Container */}
               <div className="group relative aspect-4/3 w-full overflow-hidden rounded-3xl border border-border/70 bg-card p-4 shadow-sm transition-all duration-300">
                    <div className="relative size-full overflow-hidden rounded-2xl bg-muted/40">
                         <Image
                              src={displayImages[selectedImage]}
                              alt={`${title} - View ${selectedImage + 1}`}
                              fill
                              priority
                              sizes="(max-width: 1024px) 100vw, 60vw"
                              className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                         />
                    </div>

                    {/* Navigation Chevrons (Shown when more than 1 image) */}
                    {displayImages.length > 1 && (
                         <>
                              <button
                                   type="button"
                                   onClick={handlePrev}
                                   aria-label="Previous Image"
                                   className="absolute left-6 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-card/90 text-foreground shadow-md backdrop-blur-md transition-all hover:bg-card hover:scale-110 active:scale-95 cursor-pointer"
                              >
                                   <ChevronLeft className="size-5 stroke-[2.5]" />
                              </button>
                              <button
                                   type="button"
                                   onClick={handleNext}
                                   aria-label="Next Image"
                                   className="absolute right-6 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-card/90 text-foreground shadow-md backdrop-blur-md transition-all hover:bg-card hover:scale-110 active:scale-95 cursor-pointer"
                              >
                                   <ChevronRight className="size-5 stroke-[2.5]" />
                              </button>
                         </>
                    )}

                    {/* Image Counter Badge */}
                    <div className="absolute bottom-6 right-6 flex items-center gap-1.5 rounded-full bg-foreground/80 px-3 py-1 text-xs font-bold text-background backdrop-blur-md">
                         <Maximize2 className="size-3 opacity-80" />
                         <span>
                              {selectedImage + 1} / {displayImages.length}
                         </span>
                    </div>
               </div>

               {/* Multiple Images Thumbnail Preview */}
               {displayImages.length > 1 && (
                    <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none">
                         {displayImages.map((img, idx) => {
                              const isSelected = selectedImage === idx
                              return (
                                   <button
                                        key={idx}
                                        type="button"
                                        onClick={() => setSelectedImage(idx)}
                                        className={`group/thumb relative aspect-square size-20 shrink-0 overflow-hidden rounded-2xl border-2 transition-all cursor-pointer ${isSelected
                                             ? 'border-primary ring-2 ring-primary/30 ring-offset-2 ring-offset-background'
                                             : 'border-border/60 opacity-60 hover:opacity-100 hover:border-border'
                                             }`}
                                   >
                                        <Image
                                             src={img}
                                             alt={`${title} preview ${idx + 1}`}
                                             fill
                                             sizes="80px"
                                             className="object-cover transition-transform group-hover/thumb:scale-105"
                                        />
                                   </button>
                              )
                         })}
                    </div>
               )}
          </div>
     )
}