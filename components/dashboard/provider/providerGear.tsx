'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { toast } from 'sonner';
import {
     Pencil,
     Trash2,
     Search,
     Box,
     CheckCircle2,
     XCircle,
     Layers,
     X,
     Loader2,
     AlertTriangle
} from 'lucide-react';
import { Deletegears, Updatedgears, UpdateGearStatus } from '@/app/dashboard/_action/provider_action';
import { IBike, IsAvailable } from '@/types/gear';


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
     categoryId?: string;
}

interface MyGearClientProps {
     initialGears: GearItem[];
}

export default function MyGearClient({ initialGears }: MyGearClientProps) {
     const [gears, setGears] = useState<GearItem[]>(initialGears);
     const [searchQuery, setSearchQuery] = useState('');
     const [selectedGear, setSelectedGear] = useState<GearItem | null>(null);
     const [deletingId, setDeletingId] = useState<string | null>(null);
     const [isEditModalOpen, setIsEditModalOpen] = useState(false);
     const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
     const [isUpdating, setIsUpdating] = useState(false);

     // Filtered Gears based on Search
     const filteredGears = useMemo(() => {
          return gears.filter(
               (gear) =>
                    gear.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    gear.brand.toLowerCase().includes(searchQuery.toLowerCase())
          );
     }, [gears, searchQuery]);

     // Inventory Analytics
     const stats = useMemo(() => {
          const total = gears.length;
          const available = gears.filter((g) => g.isAvailable).length;
          const totalStock = gears.reduce((acc, item) => acc + item.stock, 0);
          return { total, available, totalStock };
     }, [gears]);

     // Toggle Item Availability
     const handleToggleAvailability = async (gear: GearItem) => {
          const updatedStatus = !gear.isAvailable;
          const previousGears = [...gears];

          setGears((prev) =>
               prev.map((item) => (item.id === gear.id ? { ...item, isAvailable: updatedStatus } : item))
          );

          const payload: IsAvailable = { isAvailable: updatedStatus };
          const res = await UpdateGearStatus(payload, gear.id);

          if (res?.success) {
               toast.success(`Gear set to ${updatedStatus ? 'Available' : 'Disabled'}`);
          } else {
               setGears(previousGears);
               toast.error(res?.message || 'Failed to update availability status.');
          }
     };

     // Trigger Edit Modal
     const handleEditClick = (gear: GearItem) => {
          setSelectedGear({ ...gear });
          setIsEditModalOpen(true);
     };

     // Submit Updated Item Details
     const handleFormSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
          if (!selectedGear) return;

          setIsUpdating(true);
          const toastId = toast.loading('Updating gear listing...');

          const payload: IBike = {
               title: selectedGear.title,
               description: selectedGear.description,
               pricePerDay: Number(selectedGear.pricePerDay),
               brand: selectedGear.brand,
               categoryId: selectedGear.categoryId || '',
               stock: Number(selectedGear.stock),
          };

          const res = await Updatedgears(selectedGear.id, payload);

          if (res?.success) {
               setGears((prev) =>
                    prev.map((item) => (item.id === selectedGear.id ? selectedGear : item))
               );
               toast.success('Inventory item updated successfully!', { id: toastId });
               setIsEditModalOpen(false);
          } else {
               toast.error(res?.message || 'Failed to execute update.', { id: toastId });
          }
          setIsUpdating(false);
     };

     // Trigger Delete Confirmation
     const handleDeleteClick = (id: string) => {
          setDeletingId(id);
          setIsDeleteModalOpen(true);
     };

     // Confirm and Execute Deletion
     const confirmDelete = async () => {
          if (!deletingId) return;

          setIsUpdating(true);
          const toastId = toast.loading('Removing gear from inventory...');

          const res = await Deletegears(deletingId);

          if (res?.success) {
               setGears((prev) => prev.filter((item) => item.id !== deletingId));
               toast.success('Gear item deleted successfully.', { id: toastId });
               setIsDeleteModalOpen(false);
          } else {
               toast.error(res?.message || 'Failed to delete gear item.', { id: toastId });
          }
          setIsUpdating(false);
          setDeletingId(null);
     };

     return (
          <div className="space-y-6">
               {/* Metrics Row */}
               <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="rounded-xl border border-border bg-card p-4 shadow-sm flex items-center gap-4">
                         <div className="rounded-lg bg-primary/10 p-3 text-primary">
                              <Box className="h-6 w-6" />
                         </div>
                         <div>
                              <p className="text-xs text-muted-foreground font-medium">Total Listings</p>
                              <h4 className="text-xl font-bold text-foreground">{stats.total}</h4>
                         </div>
                    </div>
                    <div className="rounded-xl border border-border bg-card p-4 shadow-sm flex items-center gap-4">
                         <div className="rounded-lg bg-emerald-500/10 p-3 text-emerald-500">
                              <CheckCircle2 className="h-6 w-6" />
                         </div>
                         <div>
                              <p className="text-xs text-muted-foreground font-medium">Active / Available</p>
                              <h4 className="text-xl font-bold text-foreground">{stats.available}</h4>
                         </div>
                    </div>
                    <div className="rounded-xl border border-border bg-card p-4 shadow-sm flex items-center gap-4">
                         <div className="rounded-lg bg-blue-500/10 p-3 text-blue-500">
                              <Layers className="h-6 w-6" />
                         </div>
                         <div>
                              <p className="text-xs text-muted-foreground font-medium">Total Inventory Units</p>
                              <h4 className="text-xl font-bold text-foreground">{stats.totalStock}</h4>
                         </div>
                    </div>
               </div>

               {/* Control Bar */}
               <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="relative w-full sm:w-80">
                         <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                         <input
                              type="text"
                              placeholder="Search equipment or brand..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="w-full rounded-lg border border-border bg-background pl-9 pr-4 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                         />
                    </div>
               </div>

               {/* Main Table */}
               <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
                    <div className="overflow-x-auto">
                         <table className="w-full text-left text-sm">
                              <thead className="border-b bg-muted/40 text-xs font-semibold uppercase text-muted-foreground">
                                   <tr>
                                        <th className="px-6 py-4">Gear Item</th>
                                        <th className="px-6 py-4">Brand</th>
                                        <th className="px-6 py-4">Daily Rate</th>
                                        <th className="px-6 py-4">Stock</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                   </tr>
                              </thead>
                              <tbody className="divide-y divide-border">
                                   {filteredGears.length === 0 ? (
                                        <tr>
                                             <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                                                  <Box className="mx-auto h-8 w-8 opacity-40 mb-2" />
                                                  No matching equipment listings found.
                                             </td>
                                        </tr>
                                   ) : (
                                        filteredGears.map((gear) => (
                                             <tr key={gear.id} className="transition-colors hover:bg-muted/20">
                                                  <td className="px-6 py-4">
                                                       <div className="flex items-center gap-3">
                                                            <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
                                                                 {gear.images?.[0] ? (
                                                                      <Image
                                                                           src={gear.images[0]}
                                                                           alt={gear.title}
                                                                           fill
                                                                           className="object-cover"
                                                                      />
                                                                 ) : (
                                                                      <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                                                                           No image
                                                                      </div>
                                                                 )}
                                                            </div>
                                                            <div className="max-w-xs">
                                                                 <span className="font-semibold text-foreground line-clamp-1">{gear.title}</span>
                                                                 <p className="text-xs text-muted-foreground line-clamp-1">{gear.description}</p>
                                                            </div>
                                                       </div>
                                                  </td>
                                                  <td className="px-6 py-4 font-medium text-muted-foreground">{gear.brand}</td>
                                                  <td className="px-6 py-4 font-semibold text-foreground">${gear.pricePerDay}</td>
                                                  <td className="px-6 py-4 text-muted-foreground">{gear.stock} units</td>
                                                  <td className="px-6 py-4">
                                                       <button
                                                            onClick={() => handleToggleAvailability(gear)}
                                                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all ${gear.isAvailable
                                                                 ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 hover:bg-emerald-500/20'
                                                                 : 'bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive/20'
                                                                 }`}
                                                       >
                                                            {gear.isAvailable ? (
                                                                 <>
                                                                      <CheckCircle2 className="h-3.5 w-3.5" />
                                                                      Available
                                                                 </>
                                                            ) : (
                                                                 <>
                                                                      <XCircle className="h-3.5 w-3.5" />
                                                                      Disabled
                                                                 </>
                                                            )}
                                                       </button>
                                                  </td>
                                                  <td className="px-6 py-4 text-right">
                                                       <div className="flex items-center justify-end gap-2">
                                                            <button
                                                                 onClick={() => handleEditClick(gear)}
                                                                 className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                                                                 title="Edit Item"
                                                            >
                                                                 <Pencil className="h-4 w-4" />
                                                            </button>
                                                            <button
                                                                 onClick={() => handleDeleteClick(gear.id)}
                                                                 className="rounded-lg p-2 text-destructive/80 hover:bg-destructive/10 hover:text-destructive transition-colors"
                                                                 title="Delete Item"
                                                            >
                                                                 <Trash2 className="h-4 w-4" />
                                                            </button>
                                                       </div>
                                                  </td>
                                             </tr>
                                        ))
                                   )}
                              </tbody>
                         </table>
                    </div>
               </div>

               {/* Edit Inventory Modal */}
               {isEditModalOpen && selectedGear && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
                         <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-2xl">
                              <div className="mb-4 flex items-center justify-between border-b pb-3">
                                   <h3 className="text-lg font-bold text-foreground">Edit Listing Details</h3>
                                   <button
                                        onClick={() => setIsEditModalOpen(false)}
                                        className="rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                                   >
                                        <X className="h-5 w-5" />
                                   </button>
                              </div>

                              <form onSubmit={handleFormSubmit} className="space-y-4">
                                   <div>
                                        <label className="block text-xs font-medium text-foreground mb-1">Title</label>
                                        <input
                                             type="text"
                                             value={selectedGear.title}
                                             onChange={(e) => setSelectedGear({ ...selectedGear, title: e.target.value })}
                                             className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
                                             required
                                        />
                                   </div>

                                   <div className="grid grid-cols-2 gap-4">
                                        <div>
                                             <label className="block text-xs font-medium text-foreground mb-1">Price per Day ($)</label>
                                             <input
                                                  type="number"
                                                  value={selectedGear.pricePerDay}
                                                  onChange={(e) => setSelectedGear({ ...selectedGear, pricePerDay: Number(e.target.value) })}
                                                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
                                                  required
                                             />
                                        </div>
                                        <div>
                                             <label className="block text-xs font-medium text-foreground mb-1">Stock Quantity</label>
                                             <input
                                                  type="number"
                                                  value={selectedGear.stock}
                                                  onChange={(e) => setSelectedGear({ ...selectedGear, stock: Number(e.target.value) })}
                                                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
                                                  required
                                             />
                                        </div>
                                   </div>

                                   <div>
                                        <label className="block text-xs font-medium text-foreground mb-1">Description</label>
                                        <textarea
                                             rows={3}
                                             value={selectedGear.description}
                                             onChange={(e) => setSelectedGear({ ...selectedGear, description: e.target.value })}
                                             className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
                                        />
                                   </div>

                                   <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-3">
                                        <span className="text-xs font-medium text-foreground">Available for Rent</span>
                                        <input
                                             type="checkbox"
                                             checked={selectedGear.isAvailable}
                                             onChange={(e) => setSelectedGear({ ...selectedGear, isAvailable: e.target.checked })}
                                             className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                                        />
                                   </div>

                                   <div className="flex justify-end gap-3 pt-4 border-t">
                                        <button
                                             type="button"
                                             onClick={() => setIsEditModalOpen(false)}
                                             className="rounded-lg border border-border px-4 py-2 text-xs font-medium text-muted-foreground hover:bg-muted"
                                        >
                                             Cancel
                                        </button>
                                        <button
                                             type="submit"
                                             disabled={isUpdating}
                                             className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50"
                                        >
                                             {isUpdating && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                                             {isUpdating ? 'Saving...' : 'Save Changes'}
                                        </button>
                                   </div>
                              </form>
                         </div>
                    </div>
               )}

               {/* Delete Confirmation Modal */}
               {isDeleteModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
                         <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-2xl text-center">
                              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                                   <AlertTriangle className="h-6 w-6" />
                              </div>
                              <h3 className="text-lg font-bold text-foreground">Delete Equipment?</h3>
                              <p className="mt-1 text-xs text-muted-foreground">
                                   This action cannot be undone. This listing will be permanently deleted from the database.
                              </p>

                              <div className="mt-6 flex justify-center gap-3">
                                   <button
                                        type="button"
                                        onClick={() => setIsDeleteModalOpen(false)}
                                        className="rounded-lg border border-border px-4 py-2 text-xs font-medium text-muted-foreground hover:bg-muted"
                                   >
                                        Cancel
                                   </button>
                                   <button
                                        type="button"
                                        onClick={confirmDelete}
                                        disabled={isUpdating}
                                        className="inline-flex items-center gap-2 rounded-lg bg-destructive px-4 py-2 text-xs font-medium text-destructive-foreground hover:opacity-90 disabled:opacity-50"
                                   >
                                        {isUpdating && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                                        {isUpdating ? 'Deleting...' : 'Confirm Delete'}
                                   </button>
                              </div>
                         </div>
                    </div>
               )}
          </div>
     );
}