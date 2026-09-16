'use client'

import { useEffect } from 'react'
import { AlertTriangle, RotateCcw } from 'lucide-react'

export default function AdminOverviewError({
     error,
     reset,
}: {
     error: Error & { digest?: string }
     reset: () => void
}) {
     useEffect(() => {
          console.error('Admin Overview Error:', error)
     }, [error])

     return (
          <div className="flex min-h-112.5 w-full flex-col items-center justify-center rounded-3xl border border-destructive/20 bg-destructive/5 p-8 text-center backdrop-blur-md">
               <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
                    <AlertTriangle className="size-7" />
               </div>

               <h2 className="text-xl font-bold text-foreground">
                    Failed to load Admin Dashboard
               </h2>

               <p className="mt-2 max-w-md text-xs font-medium text-muted-foreground">
                    {error?.message || 'An error occurred while fetching system metrics. Please check your network connection or server status.'}
               </p>

               <button
                    onClick={() => reset()}
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 active:scale-95 cursor-pointer"
               >
                    <RotateCcw className="size-3.5" />
                    Try Again
               </button>
          </div>
     )
}