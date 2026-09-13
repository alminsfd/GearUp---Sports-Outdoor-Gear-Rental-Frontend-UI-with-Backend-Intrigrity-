import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface CategoryPageProps {
     params: Promise<{ id: string }>;
}

// Demo data for preview/development (Replace with server fetch logic)
async function getCategoryData(id: string) {
     // Demo check for 404
     if (!id) return null;

     return {
          id,
          name: 'Outdoor & Adventure Gear',
          slug: 'outdoor-adventure',
          description:
               'Explore high-quality camping, hiking, and trekking gear curated for outdoor enthusiasts. Verified items, fully insured, and ready for your next journey.',
          bannerImage:
               'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=1200&auto=format&fit=crop',
          totalItems: 24,
          items: [
               {
                    id: 'gear-101',
                    title: 'Ultralight 2-Person Camping Tent',
                    pricePerDay: 15,
                    rating: 4.8,
                    reviewsCount: 32,
                    location: 'Dhaka, BD',
                    image:
                         'https://images.unsplash.com/photo-1510312305653-8ed496efae75?q=80&w=600&auto=format&fit=crop',
                    available: true,
               },
               {
                    id: 'gear-102',
                    title: '50L Waterproof Trekking Backpack',
                    pricePerDay: 10,
                    rating: 4.9,
                    reviewsCount: 18,
                    location: 'Sylhet, BD',
                    image:
                         'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=600&auto=format&fit=crop',
                    available: true,
               },
               {
                    id: 'gear-103',
                    title: 'Portable Solar Power Station 500W',
                    pricePerDay: 25,
                    rating: 4.7,
                    reviewsCount: 45,
                    location: 'Chittagong, BD',
                    image:
                         'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600&auto=format&fit=crop',
                    available: false,
               },
          ],
     };
}

export default async function CategoryDetailPage({ params }: CategoryPageProps) {
     const { id } = await params;
     const category = await getCategoryData(id);

     if (!category) {
          notFound();
     }

     return (
          <div className="min-h-screen py-8">
               <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Breadcrumb Navigation */}
                    <nav className="mb-6 flex items-center gap-2 text-xs font-semibold text-muted-foreground sm:text-sm">
                         <Link href="/" className="hover:text-foreground transition-colors">
                              Home
                         </Link>
                         <span>/</span>
                         <Link href="/category" className="hover:text-foreground transition-colors">
                              Categories
                         </Link>
                         <span>/</span>
                         <span className="text-foreground font-bold capitalize">{category.name}</span>
                    </nav>

                    {/* Hero Header Banner Card */}
                    <div className="glass-panel relative overflow-hidden rounded-3xl p-6 sm:p-10 shadow-lg">
                         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

                              <div className="lg:col-span-7 z-10">
                                   <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground border border-primary/20">
                                        Category Overview
                                   </span>
                                   <h1 className="mt-4 text-3xl font-extrabold text-foreground sm:text-4xl lg:text-5xl tracking-tight leading-tight">
                                        {category.name}
                                   </h1>
                                   <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
                                        {category.description}
                                   </p>

                                   {/* Stats badges */}
                                   <div className="mt-6 flex flex-wrap items-center gap-4 text-xs sm:text-sm">
                                        <div className="flex items-center gap-2 rounded-xl bg-card border border-border px-4 py-2 font-medium">
                                             <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                                             <span className="text-foreground font-semibold">{category.totalItems}</span> Gear Items
                                        </div>
                                        <div className="flex items-center gap-2 rounded-xl bg-card border border-border px-4 py-2 font-medium">
                                             <svg className="h-4 w-4 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                             </svg>
                                             <span className="text-foreground font-semibold">4.8+</span> Rating Average
                                        </div>
                                   </div>
                              </div>

                              {/* Banner Media */}
                              <div className="lg:col-span-5 relative h-56 sm:h-72 w-full overflow-hidden rounded-2xl border border-border shadow-md">
                                   <Image
                                        src={category.bannerImage}
                                        alt={category.name}
                                        fill
                                        priority
                                        className="object-cover transition-transform duration-500 hover:scale-105"
                                   />
                              </div>
                         </div>
                    </div>

                    {/* Product Items Listing Header */}
                    <div className="mt-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border pb-4">
                         <div>
                              <h2 className="text-xl font-bold text-foreground">Available Gear in {category.name}</h2>
                              <p className="text-xs text-muted-foreground mt-0.5">Explore gear available for rent or purchase</p>
                         </div>

                         <div className="flex items-center gap-3">
                              <span className="text-xs font-semibold text-muted-foreground">Filter/Sort:</span>
                              <select className="rounded-xl border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                                   <option>Most Popular</option>
                                   <option>Price: Low to High</option>
                                   <option>Price: High to Low</option>
                                   <option>Highest Rated</option>
                              </select>
                         </div>
                    </div>

                    {/* Gear Grid */}
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                         {category.items.map((item) => (
                              <div
                                   key={item.id}
                                   className="gear-card-glow glass-panel group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all"
                              >
                                   {/* Product Thumbnail */}
                                   <div className="relative h-48 w-full bg-muted overflow-hidden">
                                        <Image
                                             src={item.image}
                                             alt={item.title}
                                             fill
                                             className="object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                        <div className="absolute top-3 right-3">
                                             <span
                                                  className={`rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider backdrop-blur-md ${item.available
                                                       ? 'bg-emerald-500/80 text-white'
                                                       : 'bg-rose-500/80 text-white'
                                                       }`}
                                             >
                                                  {item.available ? 'Available' : 'Rented Out'}
                                             </span>
                                        </div>
                                   </div>

                                   {/* Product Content */}
                                   <div className="flex flex-1 flex-col p-5">
                                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                                             <span className="flex items-center gap-1 font-medium">
                                                  <svg className="h-3.5 w-3.5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                  </svg>
                                                  {item.location}
                                             </span>
                                             <span className="flex items-center gap-1 text-amber-500 font-bold">
                                                  ★ {item.rating} <span className="text-muted-foreground font-normal">({item.reviewsCount})</span>
                                             </span>
                                        </div>

                                        <h3 className="mt-2 text-base font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                                             {item.title}
                                        </h3>

                                        <div className="mt-4 flex items-center justify-between pt-3 border-t border-border/60">
                                             <div>
                                                  <span className="text-xs text-muted-foreground block">Rent Rate</span>
                                                  <span className="text-lg font-black text-foreground">${item.pricePerDay}</span>
                                                  <span className="text-xs font-semibold text-muted-foreground">/day</span>
                                             </div>

                                             <Link
                                                  href={`/gear/${item.id}`}
                                                  className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground transition-all hover:opacity-90 active:scale-95"
                                             >
                                                  View Details
                                             </Link>
                                        </div>
                                   </div>
                              </div>
                         ))}
                    </div>

               </div>
          </div>
     );
}