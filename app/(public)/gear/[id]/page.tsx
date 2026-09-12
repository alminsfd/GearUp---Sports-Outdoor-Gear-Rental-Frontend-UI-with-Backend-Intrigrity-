import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getGearById } from '../../_actions/gear-actions'
import { Badge } from '@/components/ui/badge'
import {
     ShieldCheck,
     User,
     Star,
     PackageCheck,
     MessageSquare,
     ArrowLeft,
     CheckCircle2,
     Clock,
     Sparkles,
     Share2,
     Heart,
     Tag,
     Award
} from 'lucide-react'
import { IGearDetail } from '@/types/gear'
import { GearBookingCard } from '@/components/gear/gear-booking-card'
import { GearGallery } from '@/components/gear/gear-gallery'
import { checkGearRentalStatusAction } from '@/app/(payment)/_action/payment_action'
import { CheckRentalStatusApiResponse } from '@/types/order'


export default async function GearDetailsPage({ params }: { params: Promise<{ id: string }> }) {
     const { id } = await params
     const response = await getGearById(id)
     const gear: IGearDetail = response?.data
     const photo = gear.provider.profileImage
     const rentalorderChecked: CheckRentalStatusApiResponse = await checkGearRentalStatusAction(gear?.id)



     if (!gear) notFound()

     // Dynamic Average Rating Calculation
     const totalReviews = gear.reviews?.length || 0
     const avgRating = totalReviews
          ? (gear.reviews.reduce((acc, rev) => acc + rev.rating, 0) / totalReviews).toFixed(1)
          : '4.8'

     return (
          <div className="min-h-screen pt-24 sm:pt-28 pb-20">
               <div className="container mx-auto max-w-7xl px-4 sm:px-6 space-y-8">
                    {/* Top Breadcrumb & Navigation Bar */}
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-border/40 pb-4">
                         <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                              <Link
                                   href="/gear"
                                   className="inline-flex items-center gap-1.5 rounded-full bg-muted/80 px-3 py-1.5 text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                              >
                                   <ArrowLeft className="size-3.5 stroke-[2.5]" />
                                   <span>Back to Gear</span>
                              </Link>
                              <span className="text-border">/</span>
                              <span>{gear.category?.name || 'Equipment'}</span>
                              <span className="text-border">/</span>
                              <span className="truncate max-w-50 text-foreground font-bold">{gear.title}</span>
                         </div>

                         {/* Action Buttons */}
                         <div className="flex items-center gap-2">
                              <button
                                   type="button"
                                   title="Share listing"
                                   className="flex size-9 items-center justify-center rounded-full border border-border/70 bg-card text-muted-foreground transition-all hover:bg-muted hover:text-foreground active:scale-95 cursor-pointer"
                              >
                                   <Share2 className="size-4" />
                              </button>
                              <button
                                   type="button"
                                   title="Save to wishlist"
                                   className="flex size-9 items-center justify-center rounded-full border border-border/70 bg-card text-muted-foreground transition-all hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 active:scale-95 cursor-pointer"
                              >
                                   <Heart className="size-4" />
                              </button>
                         </div>
                    </div>

                    {/* Main Content Grid: 12 Columns */}
                    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 items-start">
                         {/* Left Section: Gallery, Highlights, Description & Reviews */}
                         <div className="space-y-10 lg:col-span-7">
                              {/* Interactive Image Gallery */}
                              <GearGallery images={gear.images} title={gear.title} />

                              {/* Quick Specs Highlight Cards */}
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                   <div className="rounded-2xl border border-border/70 bg-card p-3.5 text-center shadow-sm">
                                        <Tag className="size-4 text-primary mx-auto mb-1.5" />
                                        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Category</p>
                                        <p className="text-xs font-black text-foreground truncate mt-0.5">{gear.category?.name || 'Outdoor'}</p>
                                   </div>
                                   <div className="rounded-2xl border border-border/70 bg-card p-3.5 text-center shadow-sm">
                                        <Award className="size-4 text-primary mx-auto mb-1.5" />
                                        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Brand</p>
                                        <p className="text-xs font-black text-foreground truncate mt-0.5">{gear.brand || 'Pro Series'}</p>
                                   </div>
                                   <div className="rounded-2xl border border-border/70 bg-card p-3.5 text-center shadow-sm">
                                        <PackageCheck className="size-4 text-primary mx-auto mb-1.5" />
                                        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Inventory</p>
                                        <p className="text-xs font-black text-foreground mt-0.5">{gear.stock} in Stock</p>
                                   </div>
                                   <div className="rounded-2xl border border-border/70 bg-card p-3.5 text-center shadow-sm">
                                        <Star className="size-4 fill-amber-400 text-amber-400 mx-auto mb-1.5" />
                                        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Rating</p>
                                        <p className="text-xs font-black text-foreground mt-0.5">{avgRating} / 5.0</p>
                                   </div>
                              </div>

                              {/* Description Section */}
                              <div className="space-y-3 rounded-3xl border border-border/70 bg-card p-6 shadow-sm">
                                   <h2 className="text-lg font-black tracking-tight text-foreground flex items-center gap-2">
                                        <Sparkles className="size-4 text-primary" />
                                        <span>About This Equipment</span>
                                   </h2>
                                   <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                                        {gear.description || 'No detailed description provided for this item.'}
                                   </p>
                              </div>

                              {/* Rental Guarantees & Perks */}
                              <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-sm space-y-4">
                                   <h3 className="text-sm font-black uppercase tracking-wider text-foreground">
                                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                                        What's Included in Your Rental
                                   </h3>
                                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                                        <div className="flex items-start gap-2.5 rounded-2xl bg-muted/40 p-3">
                                             <CheckCircle2 className="size-4.5 text-primary shrink-0 mt-0.5" />
                                             <div>
                                                  <p className="text-xs font-bold text-foreground">Sanitized & Inspected</p>
                                                  <p className="text-[11px] text-muted-foreground">Cleaned & tested thoroughly prior to every handover.</p>
                                             </div>
                                        </div>
                                        <div className="flex items-start gap-2.5 rounded-2xl bg-muted/40 p-3">
                                             <CheckCircle2 className="size-4.5 text-primary shrink-0 mt-0.5" />
                                             <div>
                                                  <p className="text-xs font-bold text-foreground">Flexible Return Window</p>
                                                  <p className="text-[11px] text-muted-foreground">Easy extensions available if your adventure goes longer.</p>
                                             </div>
                                        </div>
                                        <div className="flex items-start gap-2.5 rounded-2xl bg-muted/40 p-3">
                                             <CheckCircle2 className="size-4.5 text-primary shrink-0 mt-0.5" />
                                             <div>
                                                  <p className="text-xs font-bold text-foreground">Gear Protection Plan</p>
                                                  <p className="text-[11px] text-muted-foreground">Standard wear & tear is fully covered by GearUp.</p>
                                             </div>
                                        </div>
                                        <div className="flex items-start gap-2.5 rounded-2xl bg-muted/40 p-3">
                                             <CheckCircle2 className="size-4.5 text-primary shrink-0 mt-0.5" />
                                             <div>
                                                  <p className="text-xs font-bold text-foreground">Verified Equipment</p>
                                                  <p className="text-[11px] text-muted-foreground">100% genuine equipment guaranteed as described.</p>
                                             </div>
                                        </div>
                                   </div>
                              </div>

                              {/* Reviews Section */}
                              <div className="space-y-6 rounded-3xl border border-border/70 bg-card p-6 shadow-sm">
                                   <div className="flex items-center justify-between border-b border-border/40 pb-4">
                                        <div className="flex items-center gap-2">
                                             <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                                  <MessageSquare className="size-4.5" />
                                             </div>
                                             <div>
                                                  <h2 className="text-base font-black tracking-tight text-foreground">Customer Reviews</h2>
                                                  <p className="text-xs text-muted-foreground">{totalReviews} verified rental feedback</p>
                                             </div>
                                        </div>

                                        <div className="flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-black text-amber-600">
                                             <Star className="size-3.5 fill-amber-400 text-amber-400" />
                                             <span>{avgRating} out of 5</span>
                                        </div>
                                   </div>

                                   {totalReviews === 0 ? (
                                        <div className="py-8 text-center">
                                             <p className="text-xs font-medium text-muted-foreground">No customer reviews yet. Be the first to rent and review this item!</p>
                                        </div>
                                   ) : (
                                        <div className="space-y-4">
                                             {gear.reviews.map((rev) => (
                                                  <div key={rev.id} className="rounded-2xl border border-border/40 bg-muted/30 p-4 space-y-2.5 transition-colors hover:bg-muted/50">
                                                       <div className="flex items-center justify-between">
                                                            <div className="flex items-center gap-3">
                                                                 <div className="relative size-9 overflow-hidden rounded-full bg-muted border border-border">
                                                                      {rev.customer?.profileImage ? (
                                                                           <Image src={rev.customer.profileImage} alt={rev.customer.name} fill className="object-cover" />
                                                                      ) : (
                                                                           <User className="size-5 m-2 text-muted-foreground" />
                                                                      )}
                                                                 </div>
                                                                 <div>
                                                                      <p className="text-xs font-black text-foreground">{rev.customer?.name || 'Verified Renter'}</p>
                                                                      <p className="text-[10px] text-muted-foreground">
                                                                           {new Date(rev.createdAt).toLocaleDateString(undefined, {
                                                                                year: 'numeric',
                                                                                month: 'short',
                                                                                day: 'numeric'
                                                                           })}
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
                                                       <p className="text-xs text-muted-foreground leading-relaxed pl-12">{rev.comment}</p>
                                                  </div>
                                             ))}
                                        </div>
                                   )}
                              </div>
                         </div>

                         {/* Right Section: Title, Booking Card & Owner Info (Sticky) */}
                         <div className="space-y-6 lg:col-span-5 lg:sticky lg:top-28">
                              {/* Header Title & Badges */}
                              <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-sm space-y-3">
                                   <div className="flex items-center justify-between gap-2">
                                        <Badge className="bg-primary/10 text-primary border border-primary/20 font-black uppercase text-[10px] tracking-wider rounded-full px-3 py-0.5">
                                             {gear.category?.name || 'Outdoor Gear'}
                                        </Badge>
                                        <span className="text-xs font-bold text-muted-foreground uppercase">{gear.brand}</span>
                                   </div>

                                   <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight leading-snug">
                                        {gear.title}
                                   </h1>

                                   <div className="flex items-center gap-3 text-xs font-bold pt-1 border-t border-border/40">
                                        <div className="flex items-center gap-1 text-foreground">
                                             <Star className="size-3.5 fill-amber-400 text-amber-400" />
                                             <span>{avgRating}</span>
                                             <span className="text-muted-foreground font-medium">({totalReviews})</span>
                                        </div>
                                        <span className="text-border">•</span>
                                        <div className="flex items-center gap-1 text-primary">
                                             <PackageCheck className="size-3.5" />
                                             <span>Stock: {gear.stock}</span>
                                        </div>
                                        <span className="text-border">•</span>
                                        <span className="text-muted-foreground font-medium">Instant Booking</span>
                                   </div>
                              </div>

                              {/* Interactive Booking Card (Client Component) */}
                              <GearBookingCard
                                   pricePerDay={gear.pricePerDay}
                                   isAvailable={gear.isAvailable}
                                   stock={gear.stock}
                                   gearItemId={id}
                                   status={rentalorderChecked?.data?.rentalData?.status}
                              />

                              {/* Provider Details Card */}
                              <div className="rounded-3xl border border-border/70 bg-card p-5 shadow-sm space-y-4">
                                   <div className="flex items-center gap-3.5">
                                        <div className="relative flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shrink-0 border border-primary/20">
                                             {photo ? (
                                                  <Image src={photo} alt={gear.title} fill className="object-cover rounded-full" />
                                             ) : (
                                                  <User className="size-6" />
                                             )}

                                             <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full bg-emerald-500 ring-2 ring-card" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                             <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Equipment Owner</p>
                                             <p className="font-black text-sm text-foreground truncate mt-0.5">
                                                  {gear.provider?.name || 'GearUp Verified Host'}
                                             </p>
                                             <p className="text-[11px] text-muted-foreground truncate">{gear.provider?.email}</p>
                                        </div>
                                   </div>

                                   <div className="border-t border-border/40 pt-3 grid grid-cols-2 gap-2 text-center text-[11px]">
                                        <div className="rounded-xl bg-muted/40 p-2">
                                             <div className="flex items-center justify-center gap-1 text-primary font-bold">
                                                  <ShieldCheck className="size-3.5" />
                                                  <span>Verified</span>
                                             </div>
                                             <p className="text-[10px] text-muted-foreground mt-0.5">Identity Checked</p>
                                        </div>
                                        <div className="rounded-xl bg-muted/40 p-2">
                                             <div className="flex items-center justify-center gap-1 text-foreground font-bold">
                                                  <Clock className="size-3.5 text-primary" />
                                                  <span>~15 Mins</span>
                                             </div>
                                             <p className="text-[10px] text-muted-foreground mt-0.5">Response Time</p>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     )
}