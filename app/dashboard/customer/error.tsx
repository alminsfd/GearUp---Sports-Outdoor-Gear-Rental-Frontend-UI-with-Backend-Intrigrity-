'use client'

import { AlertTriangle, RotateCcw } from 'lucide-react'

export default function Error({
     error,
     reset,
}: {
     error: Error & { digest?: string }
     reset: () => void
}) {
     return (
          <div className="flex min-h-100 flex-col items-center justify-center p-6 text-center space-y-4">
               <div className="flex size-14 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
                    <AlertTriangle className="size-8" />
               </div>
               <h2 className="text-xl font-bold">Failed to load dashboard data</h2>
               <p className="text-xs text-muted-foreground max-w-sm">{error.message || 'An unexpected error occurred while fetching your orders.'}</p>
               <button
                    onClick={() => reset()}
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground hover:opacity-90"
               >
                    <RotateCcw className="size-4" />
                    <span>Try Again</span>
               </button>
          </div>
     )
}