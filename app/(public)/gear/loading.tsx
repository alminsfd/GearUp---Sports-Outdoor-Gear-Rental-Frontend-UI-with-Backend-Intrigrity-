import { Skeleton } from '@/components/ui/skeleton'

export default function LoadingGearList() {
     return (
          <div className="container mx-auto px-4 py-8">
               <Skeleton className="h-8 w-64 rounded-xl" />
               <Skeleton className="mt-2 h-4 w-96 rounded-xl" />

               <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-4">
                    <Skeleton className="h-87.5 w-full rounded-2xl" />
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 md:col-span-3">
                         {[...Array(6)].map((_, i) => (
                              <div key={i} className="space-y-3 rounded-2xl border p-4">
                                   <Skeleton className="aspect-4/3 w-full rounded-xl" />
                                   <Skeleton className="h-4 w-2/3 rounded-md" />
                                   <Skeleton className="h-6 w-1/3 rounded-md" />
                              </div>
                         ))}
                    </div>
               </div>
          </div>
     )
}