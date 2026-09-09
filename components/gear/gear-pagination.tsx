'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface GearPaginationProps {
     totalPage: number
     currentPage: number
}

export function GearPagination({ totalPage, currentPage }: GearPaginationProps) {
     const router = useRouter()
     const pathname = usePathname()
     const searchParams = useSearchParams()

     const handlePageChange = (newPage: number) => {
          const params = new URLSearchParams(searchParams)
          params.set('page', newPage.toString()) // URL-এ page=2, page=3 ইত্যাদি সেট করবে
          router.push(`${pathname}?${params.toString()}`)
     }

     // যদি মোট পেজ ১টি বা তার কম হয়, তবে বাটন দেখানোর প্রয়োজন নেই
     if (totalPage <= 1) return null

     return (
          <div className="flex items-center justify-center gap-3 pt-8 pb-4">
               {/* Previous Button */}
               <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage <= 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="gap-1 rounded-xl cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
               >
                    <ChevronLeft className="size-4" />
                    <span>Previous</span>
               </Button>

               {/* Page Info */}
               <div className="text-sm font-semibold text-muted-foreground">
                    Page <span className="text-foreground font-bold">{currentPage}</span> of{' '}
                    <span className="text-foreground font-bold">{totalPage}</span>
               </div>

               {/* Next Button */}
               <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage >= totalPage}
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="gap-1 rounded-xl cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
               >
                    <span>Next</span>
                    <ChevronRight className="size-4" />
               </Button>
          </div>
     )
}