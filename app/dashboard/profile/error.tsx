'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertCircle, RotateCcw } from 'lucide-react'

export default function ProfileError({
     error,
     reset,
}: {
     error: Error & { digest?: string }
     reset: () => void
}) {
     useEffect(() => {
          console.error('Profile Error Boundary caught:', error)
     }, [error])

     return (
          <div className="container mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 text-center">
               <div className="flex flex-col items-center justify-center rounded-3xl border border-destructive/20 bg-destructive/5 p-8 shadow-sm">
                    <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
                         <AlertCircle className="size-7" />
                    </div>

                    <h2 className="text-xl font-black text-foreground">Failed to load profile</h2>
                    <p className="mt-2 max-w-md text-xs font-medium text-muted-foreground">
                         {error?.message || 'Something went wrong while fetching your profile information. Please check your network connection or try again.'}
                    </p>

                    <div className="mt-6 flex flex-wrap justify-center gap-3">
                         <Button
                              onClick={() => reset()}
                              className="rounded-xl text-xs font-bold gap-2"
                         >
                              <RotateCcw className="size-3.5" />
                              Try Again
                         </Button>
                    </div>
               </div>
          </div>
     )
}