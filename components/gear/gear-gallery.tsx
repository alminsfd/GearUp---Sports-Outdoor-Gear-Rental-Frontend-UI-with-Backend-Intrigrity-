'use client'

import { useState } from 'react'
import Image from 'next/image'

export function GearGallery({ images, title }: { images: string[]; title: string }) {
     const [selectedImage, setSelectedImage] = useState(0)
     const displayImages = images?.length > 0 ? images : ['/placeholder-gear.jpg']

     return (
          <div className="space-y-4">
               {/* Main Large Image */}
               <div className="relative aspect-4/3 overflow-hidden rounded-3xl border border-border/60 bg-muted shadow-sm">
                    <Image
                         src={displayImages[selectedImage]}
                         alt={title}
                         fill
                         priority
                         className="object-cover transition-all duration-300"
                    />
               </div>

               {/* Multiple Images Thumbnail Preview */}
               {displayImages.length > 1 && (
                    <div className="flex items-center gap-3 overflow-x-auto pb-2">
                         {displayImages.map((img, idx) => (
                              <button
                                   key={idx}
                                   onClick={() => setSelectedImage(idx)}
                                   className={`relative aspect-square size-20 shrink-0 overflow-hidden rounded-xl border-2 transition-all ${selectedImage === idx
                                        ? 'border-primary ring-2 ring-primary/20'
                                        : 'border-transparent opacity-70 hover:opacity-100'
                                        }`}
                              >
                                   <Image src={img} alt={`${title} preview ${idx}`} fill className="object-cover" />
                              </button>
                         ))}
                    </div>
               )}
          </div>
     )
}