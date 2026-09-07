'use client'

import { motion } from 'framer-motion'
import { Tent, Sparkles } from 'lucide-react'

export default function Loading() {
     return (
          <div className="flex min-h-[70vh] flex-col items-center justify-center p-6 text-center">
               <div className="relative flex items-center justify-center">
                    {/* Outer Rotating Pulse Ring */}
                    <motion.div
                         animate={{ rotate: 360 }}
                         transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
                         className="size-32 rounded-full border-2 border-dashed border-emerald-500/30"
                    />

                    {/* Inner Pulsing Circle */}
                    <motion.div
                         animate={{ scale: [0.85, 1.1, 0.85], opacity: [0.5, 0.9, 0.5] }}
                         transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                         className="absolute size-24 rounded-full bg-emerald-500/10 blur-md dark:bg-emerald-500/20"
                    />

                    {/* Bouncing Gear Icon */}
                    <motion.div
                         animate={{ y: [-4, 4, -4] }}
                         transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                         className="absolute flex size-16 items-center justify-center rounded-2xl bg-card shadow-lg border border-border"
                    >
                         <Tent className="size-8 text-emerald-500" />
                    </motion.div>
               </div>

               {/* Loading Text */}
               <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-8 space-y-2"
               >
                    <div className="flex items-center justify-center gap-2 font-semibold text-foreground">
                         <Sparkles className="size-4 animate-spin text-emerald-500" />
                         <span>Packing your gear...</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                         Preparing adventure-ready items for you.
                    </p>
               </motion.div>
          </div>
     )
}