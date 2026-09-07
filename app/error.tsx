'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, RotateCcw, Home } from 'lucide-react'
import Link from 'next/link'

export default function Error({
     error,
     reset,
}: {
     error: Error & { digest?: string }
     reset: () => void
}) {
     useEffect(() => {
          console.error(error)
     }, [error])

     return (
          <div className="flex min-h-[80vh] flex-col items-center justify-center p-6 text-center">
               {/* Bouncing Warning Icon */}
               <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    className="relative mb-6 flex size-20 items-center justify-center rounded-2xl bg-destructive/10 text-destructive border border-destructive/20 shadow-lg"
               >
                    <motion.div
                         animate={{ scale: [1, 1.15, 1] }}
                         transition={{ repeat: Infinity, duration: 2 }}
                    >
                         <AlertTriangle className="size-10" />
                    </motion.div>
               </motion.div>

               {/* Error Message */}
               <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="max-w-md space-y-2"
               >
                    <h2 className="text-2xl font-bold tracking-tight">Equipment Malfunction!</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                         {/* eslint-disable-next-line react/no-unescaped-entities */}
                         Something went wrong while fetching gear details. Don't worry, our team is on it!
                    </p>
               </motion.div>

               {/* Buttons */}
               <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="mt-8 flex flex-wrap items-center justify-center gap-3"
               >
                    {/* Try Again / Reset Button */}
                    <motion.button
                         whileHover={{ scale: 1.03 }}
                         whileTap={{ scale: 0.97 }}
                         onClick={() => reset()}
                         className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all"
                    >
                         <RotateCcw className="size-4" />
                         <span>Try Again</span>
                    </motion.button>

                    {/* Go Home Button */}
                    <Link href="/">
                         <motion.div
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-2.5 text-xs font-semibold text-foreground shadow-sm transition-all hover:bg-muted"
                         >
                              <Home className="size-4" />
                              <span>Go to Home</span>
                         </motion.div>
                    </Link>
               </motion.div>
          </div>
     )
}