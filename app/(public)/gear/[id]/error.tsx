'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, RotateCcw, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function GearError({
     error,
     reset,
}: {
     error: Error & { digest?: string }
     reset: () => void
}) {
     useEffect(() => {
          //  Client-side error logging
          console.error('Gear Module Error:', error)
     }, [error])

     return (
          <div className="flex min-h-[65vh] flex-col items-center justify-center p-6 text-center">
               {/* Animated Icon Wrapper */}
               <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="mb-6 flex size-20 items-center justify-center rounded-2xl border border-destructive/20 bg-destructive/10 text-destructive shadow-lg shadow-destructive/10"
               >
                    <AlertTriangle className="size-10 animate-pulse" />
               </motion.div>

               {/* Error Details */}
               <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                    className="max-w-md space-y-2"
               >
                    <h2 className="text-2xl font-bold tracking-tight text-foreground">
                         Failed to load gear details!
                    </h2>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                         There was a network issue or the equipment item you requested could not be retrieved from the server.
                    </p>
               </motion.div>

               {/* Interactive Actions */}
               <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                    className="mt-8 flex flex-wrap items-center justify-center gap-3"
               >
                    <button
                         onClick={() => reset()}
                         className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:opacity-90 active:scale-95"
                    >
                         <RotateCcw className="size-4" />
                         <span>Try Again</span>
                    </button>

                    <Link
                         href="/gear"
                         className="inline-flex items-center gap-2 rounded-xl border border-border/80 bg-card px-5 py-2.5 text-xs font-semibold text-foreground shadow-sm transition-all hover:bg-muted active:scale-95"
                    >
                         <ArrowLeft className="size-4" />
                         <span>Back to All Gear</span>
                    </Link>
               </motion.div>
          </div>
     )
}