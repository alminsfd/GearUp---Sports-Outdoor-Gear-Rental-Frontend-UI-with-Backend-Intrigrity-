import { getCatagoryall } from '@/app/(public)/_actions/catagory-action';
import GearForm from '@/components/gear/gear-form';
import { ICategory, ICategoryDetailResponse } from '@/types/catagorydetail';
import { PlusCircle, ShieldCheck } from 'lucide-react';

export default async function AddNewGearPage() {
     const catagoryResponse: ICategoryDetailResponse = await getCatagoryall();
     const categories: ICategory[] = catagoryResponse?.data ?? [];

     return (
          <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
               {/* Header Banner */}
               <div className="mb-8 text-center sm:text-left">
                    <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary mb-3">
                         <PlusCircle className="h-3.5 w-3.5" />
                         Provider Portal
                    </div>
                    <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
                         List New <span className="text-gradient-kinetic">Equipment</span>
                    </h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                         Fill out the specifications below to put your professional gear up for rental on GearUp.
                    </p>
               </div>

               {/* Form Card */}
               <div className="glass-panel overflow-hidden rounded-3xl p-6 sm:p-8 shadow-2xl relative">
                    {/* Pass categories array safely */}
                    <GearForm categories={categories} />

                    {/* Footer info badge */}
                    <div className="mt-8 border-t border-border/60 pt-4 flex items-center justify-between text-[11px] text-muted-foreground">
                         <span className="flex items-center gap-1">
                              <ShieldCheck className="h-3.5 w-3.5 text-primary" /> Authenticated Request
                         </span>
                         <span>GearUp Provider Network</span>
                    </div>
               </div>
          </div>
     );
}
