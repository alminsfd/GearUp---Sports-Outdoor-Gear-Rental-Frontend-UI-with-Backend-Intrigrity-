'use client';

import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { toast } from 'sonner';
import {
     PackagePlus,
     Tag,
     DollarSign,
     Layers,
     Boxes,
     Image as ImageIcon,
     FileText,
     Loader2,
     Sparkles,
     ChevronDown,
} from 'lucide-react';
import { Createdgears, FormResponse } from '@/app/dashboard/_action/provider_action';


function SubmitButton() {
     const { pending } = useFormStatus();

     return (
          <button
               type="submit"
               disabled={pending}
               className="relative flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.99] disabled:pointer-events-none disabled:opacity-60 cursor-pointer"
          >
               {pending ? (
                    <>
                         <Loader2 className="h-5 w-5 animate-spin text-primary-foreground" />
                         <span>Publishing Equipment...</span>
                    </>
               ) : (
                    <>
                         <Sparkles className="h-4 w-4" />
                         <span>Publish Gear Listing</span>
                    </>
               )}
          </button>
     );
}

interface CategoryOption {
     id: string;
     name: string;
}

interface GearFormProps {
     categories?: CategoryOption[];
}

const initialState: FormResponse = {
     success: false,
     message: '',
};

export default function GearForm({ categories = [] }: GearFormProps) {
     const [state, formAction] = useActionState(Createdgears, initialState);

     useEffect(() => {
          if (state?.message) {
               if (state.success) {
                    toast.success(state.message);
               } else {
                    toast.error(state.message);
               }
          }
     }, [state]);

     return (
          <form action={formAction} className="space-y-6">
               <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Title */}
                    <div className="space-y-2 md:col-span-2">
                         <label
                              htmlFor="title"
                              className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                         >
                              <Tag className="h-3.5 w-3.5 text-primary" /> Gear Title
                         </label>
                         <input
                              id="title"
                              name="title"
                              type="text"
                              required
                              placeholder="e.g. Sony Alpha A7 IV Full-Frame Camera"
                              className="w-full rounded-xl border border-border bg-card/60 px-4 py-3 text-sm text-foreground shadow-xs backdrop-blur-md transition-all placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                         />
                    </div>

                    {/* Brand */}
                    <div className="space-y-2">
                         <label
                              htmlFor="brand"
                              className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                         >
                              <Layers className="h-3.5 w-3.5 text-primary" /> Brand Name
                         </label>
                         <input
                              id="brand"
                              name="brand"
                              type="text"
                              required
                              placeholder="e.g. Sony, Canon, RED"
                              className="w-full rounded-xl border border-border bg-card/60 px-4 py-3 text-sm text-foreground shadow-xs backdrop-blur-md transition-all placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                         />
                    </div>

                    {/* Professional Styled Category Select */}
                    <div className="space-y-2">
                         <label
                              htmlFor="categoryId"
                              className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                         >
                              <PackagePlus className="h-3.5 w-3.5 text-primary" /> Category
                         </label>
                         <div className="relative">
                              <select
                                   id="categoryId"
                                   name="categoryId"
                                   required
                                   defaultValue=""
                                   className="w-full appearance-none rounded-xl border border-border bg-card/60 px-4 py-3 pr-10 text-sm font-medium text-foreground shadow-xs backdrop-blur-md transition-all cursor-pointer focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                              >
                                   <option value="" disabled className="bg-popover text-muted-foreground">
                                        Select Equipment Category
                                   </option>
                                   {categories.length > 0 ? (
                                        categories.map((cat) => (
                                             <option
                                                  key={cat.id}
                                                  value={cat.id}
                                                  className="bg-popover py-2.5 text-foreground font-medium"
                                             >
                                                  {cat.name}
                                             </option>
                                        ))
                                   ) : (
                                        <>
                                             <option value="gyms-sports" className="bg-popover py-2.5 text-foreground font-medium">
                                                  Gyms & Sports
                                             </option>
                                             <option value="cycling" className="bg-popover py-2.5 text-foreground font-medium">
                                                  Cycling
                                             </option>
                                             <option value="camping" className="bg-popover py-2.5 text-foreground font-medium">
                                                  Camping
                                             </option>
                                             <option value="hiking" className="bg-popover py-2.5 text-foreground font-medium">
                                                  Hiking
                                             </option>
                                             <option value="cameras" className="bg-popover py-2.5 text-foreground font-medium">
                                                  Cameras & Photography
                                             </option>
                                        </>
                                   )}
                              </select>
                              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-muted-foreground">
                                   <ChevronDown className="h-4 w-4" />
                              </div>
                         </div>
                    </div>

                    {/* Price Per Day */}
                    <div className="space-y-2">
                         <label
                              htmlFor="pricePerDay"
                              className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                         >
                              <DollarSign className="h-3.5 w-3.5 text-primary" /> Daily Rent Rate ($)
                         </label>
                         <input
                              id="pricePerDay"
                              name="pricePerDay"
                              type="number"
                              step="0.01"
                              min="0"
                              required
                              placeholder="0.00"
                              className="w-full rounded-xl border border-border bg-card/60 px-4 py-3 text-sm text-foreground shadow-xs backdrop-blur-md transition-all placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                         />
                    </div>

                    {/* Stock Quantity */}
                    <div className="space-y-2">
                         <label
                              htmlFor="stock"
                              className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                         >
                              <Boxes className="h-3.5 w-3.5 text-primary" /> Stock Available
                         </label>
                         <input
                              id="stock"
                              name="stock"
                              type="number"
                              min="1"
                              defaultValue="1"
                              required
                              placeholder="Available units"
                              className="w-full rounded-xl border border-border bg-card/60 px-4 py-3 text-sm text-foreground shadow-xs backdrop-blur-md transition-all placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                         />
                    </div>

                    {/* Image URLs */}
                    <div className="space-y-2 md:col-span-2">
                         <label
                              htmlFor="images"
                              className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                         >
                              <ImageIcon className="h-3.5 w-3.5 text-primary" /> Image URLs (Comma Separated)
                         </label>
                         <input
                              id="images"
                              name="images"
                              type="text"
                              required
                              placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg"
                              className="w-full rounded-xl border border-border bg-card/60 px-4 py-3 font-mono text-xs text-foreground shadow-xs backdrop-blur-md transition-all placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                         />
                         <p className="text-[11px] text-muted-foreground">
                              Provide direct image URLs separated by commas.
                         </p>
                    </div>

                    {/* Description */}
                    <div className="space-y-2 md:col-span-2">
                         <label
                              htmlFor="description"
                              className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                         >
                              <FileText className="h-3.5 w-3.5 text-primary" /> Equipment Details & Specs
                         </label>
                         <textarea
                              id="description"
                              name="description"
                              rows={4}
                              required
                              placeholder="Provide condition, included accessories, guidelines, or specs..."
                              className="w-full resize-none rounded-xl border border-border bg-card/60 px-4 py-3 text-sm text-foreground shadow-xs backdrop-blur-md transition-all placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                         />
                    </div>
               </div>

               {/* Action Button */}
               <div className="pt-2">
                    <SubmitButton />
               </div>
          </form>
     );
}