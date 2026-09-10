'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
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
          if (newPage < 1 || newPage > totalPage || newPage === currentPage) return
          const params = new URLSearchParams(searchParams.toString())
          params.set('page', newPage.toString())
          router.push(`${pathname}?${params.toString()}`)
     }

     if (totalPage <= 1) return null

     // Generate a sliding window of page numbers
     const getPageNumbers = () => {
          const pages: (number | string)[] = []
          if (totalPage <= 5) {
               for (let i = 1; i <= totalPage; i++) pages.push(i)
          } else {
               if (currentPage <= 3) {
                    pages.push(1, 2, 3, 4, '...', totalPage)
               } else if (currentPage >= totalPage - 2) {
                    pages.push(1, '...', totalPage - 3, totalPage - 2, totalPage - 1, totalPage)
               } else {
                    pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPage)
               }
          }
          return pages
     }

     return (
          <div className="flex items-center justify-center gap-2 pt-10 pb-6">
               {/* Previous Button */}
               <button
                    type="button"
                    disabled={currentPage <= 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="flex items-center gap-1.5 rounded-full border border-border/70 bg-card px-4 py-2 text-xs font-black uppercase tracking-wider text-foreground shadow-sm transition-all hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
               >
                    <ChevronLeft className="size-3.5 stroke-[2.5]" />
                    <span>PREV</span>
               </button>

               {/* Page Numbers */}
               <div className="flex items-center gap-1.5">
                    {getPageNumbers().map((page, idx) => {
                         if (page === '...') {
                              return (
                                   <span
                                        key={`dots-${idx}`}
                                        className="size-9 flex items-center justify-center text-xs font-bold text-muted-foreground"
                                   >
                                        ...
                                   </span>
                              )
                         }

                         const pageNum = Number(page)
                         const isActive = pageNum === currentPage

                         return (
                              <button
                                   key={pageNum}
                                   type="button"
                                   onClick={() => handlePageChange(pageNum)}
                                   className={`size-9 rounded-full flex items-center justify-center text-xs font-black transition-all cursor-pointer ${
                                        isActive
                                             ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/25'
                                             : 'bg-card border border-border/70 text-muted-foreground hover:text-foreground hover:bg-muted'
                                   }`}
                              >
                                   {pageNum}
                              </button>
                         )
                    })}
               </div>

               {/* Next Button */}
               <button
                    type="button"
                    disabled={currentPage >= totalPage}
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="flex items-center gap-1.5 rounded-full border border-border/70 bg-card px-4 py-2 text-xs font-black uppercase tracking-wider text-foreground shadow-sm transition-all hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
               >
                    <span>NEXT</span>
                    <ChevronRight className="size-3.5 stroke-[2.5]" />
               </button>
          </div>
     )
}