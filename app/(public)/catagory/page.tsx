import { ICategoryListResponse } from '@/types/catagory';
import { getCatagoryall } from '../_actions/catagory-action';
import CategoryListClient from '@/components/catagory/category-list-client';



export default async function CategoryPage() {
     const response: ICategoryListResponse = await getCatagoryall();



     if (!response?.success || !response?.data) {
          return (
               <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
                    <div className="rounded-full bg-rose-50 p-4 text-rose-500 mb-4">
                         <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                         </svg>
                    </div>
                    <h2 className="text-xl font-bold text-slate-900">Failed to load categories</h2>
                    <p className="text-sm text-slate-500 mt-1">Please try refreshing the page or check back later.</p>
               </div>
          );
     }

     return (
          <main className="min-h-screen bg-slate-50/50 py-12">
               <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Header Section */}
                    <div className="mb-10 text-center md:text-left">
                         <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                              Browse Equipment
                         </span>
                         <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                              Explore Gear Categories
                         </h1>
                         <p className="mt-2 max-w-2xl text-base text-slate-600">
                              Find premium equipment tailored for your outdoor trips, fitness routines, and adventures.
                         </p>
                    </div>

                    {/* Interactive Client Component */}
                    <CategoryListClient categories={response.data} />
               </div>
          </main>
     );
}