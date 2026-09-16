'use client';

import { useState, useTransition } from 'react';
import Image from 'next/image';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import {
     Package,
     Layers,
     ShoppingBag,
     Star,
     ChevronLeft,
     ChevronRight,
     Loader2,
     User,
     Eye,
     CheckCircle2,
     XCircle,
     Clock,
} from 'lucide-react';

export interface GearItem {
     id: string;
     title: string;
     description: string;
     pricePerDay: number;
     brand: string;
     stock: number;
     isAvailable: boolean;
     images: string[];
     createdAt: string;
     updatedAt: string;
     categoryId: string;
     providerId: string;
     category: {
          id: string;
          name: string;
     };
     provider: {
          id: string;
          name: string;
          email: string;
     };
     _count?: {
          rentalOrders: number;
          reviews: number;
     };
}

interface GearManagementProps {
     initialGears: GearItem[];
     meta?: {
          page: number;
          limit: number;
          total: number;
          totalPage: number;
     };
}

export default function GearManagement({ initialGears, meta }: GearManagementProps) {
     const router = useRouter();
     const pathname = usePathname();
     const searchParams = useSearchParams();

     const [isPending, startTransition] = useTransition();
     const [selectedGear, setSelectedGear] = useState<GearItem | null>(null);

     const currentPage = meta?.page || 1;
     const totalPages = meta?.totalPage || 1;

     const handlePageChange = (newPage: number) => {
          const params = new URLSearchParams(searchParams.toString());
          params.set('page', newPage.toString());

          startTransition(() => {
               router.push(`${pathname}?${params.toString()}`);
          });
     };

     return (
          <div className="space-y-6">
               {/* Content Grid */}
               <div className="glass-panel relative overflow-hidden rounded-3xl border border-border/60 shadow-xl">
                    {isPending && (
                         <div className="absolute inset-0 z-20 flex items-center justify-center bg-background/20 backdrop-blur-[2px]">
                              <Loader2 className="h-7 w-7 animate-spin text-primary" />
                         </div>
                    )}

                    <div className="overflow-x-auto">
                         <table className="w-full text-left text-sm">
                              <thead className="border-b border-border/60 bg-muted/40 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                   <tr>
                                        <th scope="col" className="px-6 py-4">Gear Item</th>
                                        <th scope="col" className="px-6 py-4">Category & Brand</th>
                                        <th scope="col" className="px-6 py-4">Provider</th>
                                        <th scope="col" className="px-6 py-4">Pricing & Stock</th>
                                        <th scope="col" className="px-6 py-4">Status</th>
                                        <th scope="col" className="px-6 py-4 text-right">Moderation</th>
                                   </tr>
                              </thead>

                              <tbody className="divide-y divide-border/40 font-medium">
                                   {initialGears.length > 0 ? (
                                        initialGears.map((gear) => (
                                             <tr key={gear.id} className="transition-colors hover:bg-muted/30">
                                                  {/* Gear Thumbnail & Title */}
                                                  <td className="px-6 py-4">
                                                       <div className="flex items-center gap-3">
                                                            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-2xl border border-border/60 bg-muted">
                                                                 {gear.images?.[0] ? (
                                                                      <Image
                                                                           src={gear.images[0]}
                                                                           alt={gear.title}
                                                                           fill
                                                                           sizes="48px"
                                                                           className="object-cover"
                                                                      />
                                                                 ) : (
                                                                      <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                                                                           <Package className="h-5 w-5" />
                                                                      </div>
                                                                 )}
                                                            </div>
                                                            <div className="max-w-xs">
                                                                 <p className="line-clamp-1 font-semibold text-foreground">{gear.title}</p>
                                                                 <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                                                                      <span className="flex items-center gap-1">
                                                                           <ShoppingBag className="h-3 w-3" />
                                                                           {gear._count?.rentalOrders || 0} rentals
                                                                      </span>
                                                                      <span>•</span>
                                                                      <span className="flex items-center gap-1">
                                                                           <Star className="h-3 w-3 text-amber-500" />
                                                                           {gear._count?.reviews || 0} reviews
                                                                      </span>
                                                                 </div>
                                                            </div>
                                                       </div>
                                                  </td>

                                                  {/* Category & Brand */}
                                                  <td className="px-6 py-4">
                                                       <div className="space-y-1">
                                                            <span className="inline-flex items-center gap-1 rounded-xl border border-border/80 bg-card px-2.5 py-0.5 text-xs font-semibold text-foreground">
                                                                 <Layers className="h-3 w-3 text-primary" />
                                                                 {gear.category?.name || 'Uncategorized'}
                                                            </span>
                                                            <p className="text-xs text-muted-foreground">Brand: {gear.brand}</p>
                                                       </div>
                                                  </td>

                                                  {/* Provider Info */}
                                                  <td className="px-6 py-4">
                                                       <div className="flex items-center gap-2">
                                                            <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-primary/10 text-xs font-bold text-primary">
                                                                 <User className="h-3.5 w-3.5" />
                                                            </div>
                                                            <div>
                                                                 <p className="text-xs font-semibold text-foreground">{gear.provider?.name}</p>
                                                                 <p className="text-[11px] text-muted-foreground">{gear.provider?.email}</p>
                                                            </div>
                                                       </div>
                                                  </td>

                                                  {/* Price & Stock */}
                                                  <td className="px-6 py-4">
                                                       <div>
                                                            <p className="font-extrabold text-foreground">${gear.pricePerDay}<span className="text-xs font-normal text-muted-foreground">/day</span></p>
                                                            <p className="text-xs text-muted-foreground">Stock: {gear.stock} units</p>
                                                       </div>
                                                  </td>

                                                  {/* Availability Status */}
                                                  <td className="px-6 py-4">
                                                       {gear.isAvailable ? (
                                                            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-500">
                                                                 <CheckCircle2 className="h-3 w-3" />
                                                                 Listed
                                                            </span>
                                                       ) : (
                                                            <span className="inline-flex items-center gap-1 rounded-full border border-rose-500/20 bg-rose-500/10 px-2.5 py-1 text-xs font-semibold text-rose-500">
                                                                 <XCircle className="h-3 w-3" />
                                                                 Unlisted
                                                            </span>
                                                       )}
                                                  </td>

                                                  {/* Quick Inspect Button */}
                                                  <td className="px-6 py-4 text-right">
                                                       <button
                                                            onClick={() => setSelectedGear(gear)}
                                                            className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card/60 px-3 py-1.5 text-xs font-semibold text-foreground transition-all hover:border-primary/50 hover:bg-muted active:scale-95"
                                                       >
                                                            <Eye className="h-3.5 w-3.5 text-primary" />
                                                            Inspect
                                                       </button>
                                                  </td>
                                             </tr>
                                        ))
                                   ) : (
                                        <tr>
                                             <td colSpan={6} className="py-12 text-center text-muted-foreground">
                                                  <div className="flex flex-col items-center justify-center gap-2">
                                                       <Package className="h-8 w-8 text-muted-foreground/50" />
                                                       <p className="text-sm font-medium">No gear listings found.</p>
                                                  </div>
                                             </td>
                                        </tr>
                                   )}
                              </tbody>
                         </table>
                    </div>

                    {/* Pagination Bar */}
                    <div className="flex flex-col gap-3 border-t border-border/60 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                         <p className="text-xs font-medium text-muted-foreground">
                              Showing Page <span className="font-bold text-foreground">{currentPage}</span> of{' '}
                              <span className="font-bold text-foreground">{totalPages}</span>
                         </p>

                         <div className="flex items-center gap-2">
                              <button
                                   disabled={currentPage <= 1}
                                   onClick={() => handlePageChange(currentPage - 1)}
                                   className="inline-flex items-center gap-1 rounded-xl border border-border/60 bg-card/60 px-3 py-1.5 text-xs font-semibold transition-all hover:bg-muted disabled:opacity-40 cursor-pointer"
                              >
                                   <ChevronLeft className="h-3.5 w-3.5" /> Previous
                              </button>
                              <button
                                   disabled={currentPage >= totalPages}
                                   onClick={() => handlePageChange(currentPage + 1)}
                                   className="inline-flex items-center gap-1 rounded-xl border border-border/60 bg-card/60 px-3 py-1.5 text-xs font-semibold transition-all hover:bg-muted disabled:opacity-40 cursor-pointer"
                              >
                                   Next <ChevronRight className="h-3.5 w-3.5" />
                              </button>
                         </div>
                    </div>
               </div>

               {/* Inspect Detail Modal */}
               {selectedGear && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
                         <div className="glass-panel w-full max-w-lg overflow-hidden rounded-3xl border border-border/80 bg-background p-6 shadow-2xl space-y-5">
                              <div className="flex items-start justify-between border-b border-border/60 pb-4">
                                   <div>
                                        <span className="inline-flex items-center gap-1 rounded-lg border border-primary/20 bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase text-primary">
                                             {selectedGear.category?.name}
                                        </span>
                                        <h3 className="mt-1 text-lg font-bold text-foreground">{selectedGear.title}</h3>
                                   </div>
                                   <button
                                        onClick={() => setSelectedGear(null)}
                                        className="rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                                   >
                                        ✕
                                   </button>
                              </div>

                              <div className="space-y-3">
                                   <div className="relative h-48 w-full overflow-hidden rounded-2xl border border-border/60 bg-muted">
                                        {selectedGear.images?.[0] ? (
                                             <Image
                                                  src={selectedGear.images[0]}
                                                  alt={selectedGear.title}
                                                  fill
                                                  className="object-cover"
                                             />
                                        ) : (
                                             <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                                                  No Preview Available
                                             </div>
                                        )}
                                   </div>

                                   <div>
                                        <h4 className="text-xs font-bold uppercase text-muted-foreground">Description</h4>
                                        <p className="mt-1 text-xs text-foreground leading-relaxed">{selectedGear.description}</p>
                                   </div>

                                   <div className="grid grid-cols-2 gap-3 pt-2">
                                        <div className="rounded-2xl border border-border/50 bg-card/40 p-3">
                                             <span className="text-[10px] text-muted-foreground">Provider Info</span>
                                             <p className="text-xs font-semibold text-foreground">{selectedGear.provider?.name}</p>
                                             <p className="text-[11px] text-muted-foreground">{selectedGear.provider?.email}</p>
                                        </div>

                                        <div className="rounded-2xl border border-border/50 bg-card/40 p-3">
                                             <span className="text-[10px] text-muted-foreground">System Metadata</span>
                                             <div className="flex items-center gap-1 text-[11px] text-muted-foreground mt-1">
                                                  <Clock className="h-3 w-3" />
                                                  Created: {new Date(selectedGear.createdAt).toLocaleDateString()}
                                             </div>
                                        </div>
                                   </div>
                              </div>

                              <div className="flex justify-end pt-2">
                                   <button
                                        onClick={() => setSelectedGear(null)}
                                        className="rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-md transition-all hover:bg-primary/90"
                                   >
                                        Close Inspection
                                   </button>
                              </div>
                         </div>
                    </div>
               )}
          </div>
     );
}