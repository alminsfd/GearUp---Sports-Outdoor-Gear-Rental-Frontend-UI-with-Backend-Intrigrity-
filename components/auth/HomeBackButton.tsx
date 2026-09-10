'use client'

import Link from 'next/link'
import { ArrowLeft, Home } from 'lucide-react'
import { motion } from 'framer-motion'

export function HomeBackButton() {
     return (
          <motion.div
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.4, ease: 'easeOut' }}
          >
               <Link href="/">
                    <motion.div
                         whileHover="hover"
                         whileTap={{ scale: 0.95 }}
                         className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full border border-border/80 bg-background/80 px-4 py-2 text-xs font-semibold text-foreground shadow-sm backdrop-blur-md transition-colors hover:border-emerald-500/50 hover:bg-card"
                    >

                         <span className="absolute inset-0 bg-linear-to-r from-emerald-500/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />


                         <motion.div
                              variants={{
                                   hover: { x: -3 },
                              }}
                              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                              className="text-muted-foreground transition-colors group-hover:text-emerald-500"
                         >
                              <ArrowLeft className="size-4" />
                         </motion.div>

                         <div className="relative z-10 flex items-center gap-1.5">
                              <Home className="size-3.5 text-muted-foreground transition-colors group-hover:text-foreground" />
                              <span>Back to Home</span>
                         </div>
                    </motion.div>
               </Link>
          </motion.div>
     )
}