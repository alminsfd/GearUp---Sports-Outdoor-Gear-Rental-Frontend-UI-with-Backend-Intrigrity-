import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCatagoryById } from '../../_actions/catagory-action';
import { ICategoryDetailResponse } from '@/types/catagory';
import { IGear } from '@/types/gear';

interface CategoryPageProps {
     params: Promise<{ id: string }>;
}

export default async function CategoryDetailPage({ params }: CategoryPageProps) {
     const { id } = await params;

     // Server Action call
     const response: ICategoryDetailResponse = await getCatagoryById(id);

     // Response structure verification
     const category = response?.data || response;

     if (!category || !category.name) {
          notFound();
     }

     const gearsList = category.gears || [];
     const totalItems = gearsList.length;

     return (
          <div className="min-h-screen py-8">
               <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Breadcrumb Navigation */}
                    <nav className="mb-6 flex items-center gap-2 text-xs font-semibold text-muted-foreground sm:text-sm">
                         <Link href="/" className="hover:text-foreground transition-colors">
                              Home
                         </Link>
                         <span>/</span>
                         <Link href="/catagory" className="hover:text-foreground transition-colors">
                              Categories
                         </Link>
                         <span>/</span>
                         <span className="text-foreground font-bold capitalize">{category.name.replace('-', ' ')}</span>
                    </nav>

                    {/* Hero Header Banner Card */}
                    <div className="glass-panel relative overflow-hidden rounded-3xl p-6 sm:p-10 shadow-lg border border-border">
                         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

                              <div className="lg:col-span-7 z-10">
                                   <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground border border-primary/20">
                                        Category Overview
                                   </span>
                                   <h1 className="mt-4 text-3xl font-extrabold text-foreground sm:text-4xl lg:text-5xl tracking-tight leading-tight capitalize">
                                        {category.name.replace('-', ' ')}
                                   </h1>
                                   <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
                                        {category.description}
                                   </p>

                                   {/* Stats Badges */}
                                   <div className="mt-6 flex flex-wrap items-center gap-4 text-xs sm:text-sm">
                                        <div className="flex items-center gap-2 rounded-xl bg-card border border-border px-4 py-2 font-medium">
                                             <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                                             <span className="text-foreground font-semibold">{totalItems}</span> {totalItems === 1 ? 'Gear Item' : 'Gear Items'}
                                        </div>
                                   </div>
                              </div>

                              {/* Category Banner Media */}
                              <div className="lg:col-span-5 relative h-56 sm:h-72 w-full overflow-hidden rounded-2xl border border-border shadow-md bg-muted">
                                   <Image
                                        src={category.icon}
                                        alt={category.name}
                                        fill
                                        className="object-cover transition-transform duration-500 hover:scale-105"
                                   />
                              </div>
                         </div>
                    </div>

                    {/* Product Items Listing Header */}
                    <div className="mt-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border pb-4">
                         <div>
                              <h2 className="text-xl font-bold text-foreground capitalize">Available Gear in {category.name.replace('-', ' ')}</h2>
                              <p className="text-xs text-muted-foreground mt-0.5">Explore equipment available for rent</p>
                         </div>
                    </div>

                    {/* Gear Grid */}
                    {gearsList.length > 0 ? (
                         <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                              {gearsList.map((gear: IGear) => {
                                   const mainImage = gear.images?.[0] || category.icon;

                                   return (
                                        <div
                                             key={gear.id}
                                             className="glass-panel group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                                        >
                                             {/* Image & Status Badge */}
                                             <div className="relative h-52 w-full bg-muted overflow-hidden">
                                                  <Image
                                                       src={mainImage}
                                                       alt={gear.title}
                                                       fill
                                                       className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                  />

                                                  {/* Availability Badge */}
                                                  <div className="absolute top-3 right-3 flex flex-col items-end gap-1.5">
                                                       <span
                                                            className={`rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider backdrop-blur-md shadow-sm ${gear.isAvailable
                                                                 ? 'bg-emerald-500/90 text-white'
                                                                 : 'bg-rose-500/90 text-white'
                                                                 }`}
                                                       >
                                                            {gear.isAvailable ? 'Available' : 'Rented Out'}
                                                       </span>
                                                  </div>

                                                  {/* Brand Badge */}
                                                  {gear.brand && (
                                                       <div className="absolute bottom-3 left-3">
                                                            <span className="rounded-lg bg-black/60 backdrop-blur-md px-2.5 py-1 text-xs font-medium text-white border border-white/10">
                                                                 {gear.brand}
                                                            </span>
                                                       </div>
                                                  )}
                                             </div>

                                             {/* Gear Details Content */}
                                             <div className="flex flex-1 flex-col p-5">
                                                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                                                       <span className="font-medium text-emerald-600 dark:text-emerald-400">
                                                            Stock: {gear.stock} units left
                                                       </span>
                                                  </div>

                                                  <h3 className="text-base font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                                                       {gear.title}
                                                  </h3>

                                                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                                                       {gear.description}
                                                  </p>

                                                  {/* Pricing & CTA */}
                                                  <div className="mt-auto pt-4 flex items-center justify-between border-t border-border/60">
                                                       <div>
                                                            <span className="text-[10px] uppercase font-bold text-muted-foreground block tracking-wider">
                                                                 Rent Rate
                                                            </span>
                                                            <div className="flex items-baseline gap-0.5">
                                                                 <span className="text-xl font-black text-foreground">${gear.pricePerDay}</span>
                                                                 <span className="text-xs font-semibold text-muted-foreground">/day</span>
                                                            </div>
                                                       </div>

                                                       <Link
                                                            href={`/gear/${gear.id}`}
                                                            className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground transition-all duration-200 hover:opacity-90 active:scale-95 shadow-sm"
                                                       >
                                                            View Details
                                                       </Link>
                                                  </div>
                                             </div>
                                        </div>
                                   );
                              })}
                         </div>
                    ) : (
                         /* Empty State */
                         <div className="mt-12 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border p-12 text-center bg-card/50">
                              <div className="rounded-full bg-muted p-4">
                                   <svg className="h-8 w-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                   </svg>
                              </div>
                              <h3 className="mt-4 text-lg font-bold text-foreground">No Gear Found</h3>
                              <p className="mt-1 text-sm text-muted-foreground">Currently, there are no items listed in this category.</p>
                         </div>
                    )}

               </div>
          </div>
     );
}