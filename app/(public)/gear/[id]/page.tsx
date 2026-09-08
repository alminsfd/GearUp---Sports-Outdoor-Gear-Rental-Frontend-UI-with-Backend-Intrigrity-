import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getGearById } from '../../_actions/gear-actions'
import { Badge } from '@/components/ui/badge'
import { ShieldCheck, User, Star, PackageCheck, MessageSquare } from 'lucide-react'
import { IGearDetail } from '@/types/gear'
import { GearBookingCard } from '@/components/gear/gear-booking-card'
import { GearGallery } from '@/components/gear/gear-gallery'

export default async function GearDetailsPage({ params }: { params: Promise<{ id: string }> }) {
     const { id } = await params
     const response = await getGearById(id)
     const gear: IGearDetail = response?.data

     if (!gear) notFound()

     // Dynamic Average Rating Calculation
     const totalReviews = gear.reviews?.length || 0
     const avgRating = totalReviews
          ? (gear.reviews.reduce((acc, rev) => acc + rev.rating, 0) / totalReviews).toFixed(1)
          : 'New'

     return (
          <div className="container mx-auto px-4 py-10">
               <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">

                    {/* Left Section: Gallery, Description & Reviews */}
                    <div className="space-y-8 lg:col-span-7">
                         {/* Interactive Image Gallery (Client Component) */}
                         <GearGallery images={gear.images} title={gear.title} />

                         {/* Description */}
                         <div className="space-y-3 rounded-2xl border border-border/40 p-6 bg-card/50">
                              <h2 className="text-lg font-bold text-foreground">About this Gear</h2>
                              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                                   {gear.description || 'No detailed description provided for this item.'}
                              </p>
                         </div>

                         {/* Reviews Section */}
                         <div className="space-y-6">
                              <div className="flex items-center justify-between border-b border-border/40 pb-4">
                                   <h2 className="text-xl font-bold flex items-center gap-2">
                                        <MessageSquare className="size-5 text-primary" />
                                        <span>Reviews ({totalReviews})</span>
                                   </h2>
                                   {totalReviews > 0 && (
                                        <div className="flex items-center gap-1 font-semibold text-sm">
                                             <Star className="size-4 fill-amber-400 text-amber-400" />
                                             <span>{avgRating} out of 5</span>
                                        </div>
                                   )}
                              </div>

                              {totalReviews === 0 ? (
                                   <p className="text-xs text-muted-foreground italic">No reviews yet for this item.</p>
                              ) : (
                                   <div className="space-y-4">
                                        {gear.reviews.map((rev) => (
                                             <div key={rev.id} className="rounded-2xl border border-border/40 p-4 bg-card space-y-2">
                                                  <div className="flex items-center justify-between">
                                                       <div className="flex items-center gap-3">
                                                            <div className="relative size-8 overflow-hidden rounded-full bg-muted">
                                                                 {rev.customer?.profileImage ? (
                                                                      <Image src={rev.customer.profileImage} alt={rev.customer.name} fill className="object-cover" />
                                                                 ) : (
                                                                      <User className="size-5 m-1.5 text-muted-foreground" />
                                                                 )}
                                                            </div>
                                                            <div>
                                                                 <p className="text-xs font-bold">{rev.customer?.name || 'Anonymous Customer'}</p>
                                                                 <p className="text-[10px] text-muted-foreground">
                                                                      {new Date(rev.createdAt).toLocaleDateString()}
                                                                 </p>
                                                            </div>
                                                       </div>
                                                       <div className="flex items-center gap-0.5">
                                                            {[...Array(5)].map((_, i) => (
                                                                 <Star
                                                                      key={i}
                                                                      className={`size-3.5 ${i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/30'
                                                                           }`}
                                                                 />
                                                            ))}
                                                       </div>
                                                  </div>
                                                  <p className="text-xs text-muted-foreground pl-11">{rev.comment}</p>
                                             </div>
                                        ))}
                                   </div>
                              )}
                         </div>
                    </div>

                    {/* Right Section: Details & Booking */}
                    <div className="space-y-6 lg:col-span-5">
                         <div>
                              <div className="flex items-center gap-2">
                                   <Badge className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20">
                                        {gear.category?.name || 'General'}
                                   </Badge>
                                   <span className="text-xs font-semibold text-muted-foreground">{gear.brand}</span>
                              </div>

                              <h1 className="mt-2 text-3xl font-extrabold tracking-tight">{gear.title}</h1>

                              <div className="mt-3 flex items-center gap-2 text-sm font-semibold">
                                   <div className="flex items-center gap-1">
                                        <Star className="size-4 fill-amber-400 text-amber-400" />
                                        <span>{avgRating}</span>
                                   </div>
                                   <span className="text-muted-foreground">•</span>
                                   <span className="text-muted-foreground">({totalReviews} reviews)</span>
                                   <span className="text-muted-foreground">•</span>
                                   <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                        <PackageCheck className="size-3.5 text-emerald-500" /> Stock: {gear.stock}
                                   </span>
                              </div>
                         </div>

                         {/* Interactive Booking Card (Client Component) */}
                         <GearBookingCard
                              pricePerDay={gear.pricePerDay}
                              isAvailable={gear.isAvailable}
                              stock={gear.stock}
                         />

                         {/* Provider Details Card */}
                         <div className="flex items-center gap-4 rounded-2xl border border-border/40 p-4 bg-card">
                              <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                                   <User className="size-6" />
                              </div>
                              <div>
                                   <p className="text-xs text-muted-foreground">Equipment Owner</p>
                                   <p className="font-bold text-foreground">{gear.provider?.name || 'GearUp Verified Provider'}</p>
                                   <p className="text-xs text-muted-foreground">{gear.provider?.email}</p>
                                   <div className="flex items-center gap-1 text-xs text-emerald-600 mt-1">
                                        <ShieldCheck className="size-3.5" />
                                        <span>Verified Listing</span>
                                   </div>
                              </div>
                         </div>

                    </div>
               </div>
          </div>
     )
}