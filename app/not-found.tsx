'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Compass, Home } from 'lucide-react'

export default function NotFound() {
     return (
          <div className="flex min-h-[80vh] flex-col items-center justify-center p-6 text-center">
               {/* Animated Compass Icon */}
               <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    className="relative mb-6 flex size-24 items-center justify-center rounded-3xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 shadow-xl"
               >
                    <motion.div
                         animate={{ rotate: [0, 45, -45, 0] }}
                         transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
                    >
                         <Compass className="size-12" />
                    </motion.div>
               </motion.div>

               {/* 404 Header */}
               <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="max-w-md space-y-3"
               >
                    <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                         404 ERROR
                    </span>
                    <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                         Looks like you strayed off the trail!
                    </h1>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                         {/* eslint-disable-next-line react/no-unescaped-entities */}
                         The gear or page you are looking for doesn't exist or has been moved to another campsite.
                    </p>
               </motion.div>

               {/* Action Buttons */}
               <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-8 flex flex-wrap items-center justify-center gap-3"
               >
                    <Link href="/">
                         <motion.div
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all"
                         >
                              <Home className="size-4" />
                              <span>Back to Home</span>
                         </motion.div>
                    </Link>
               </motion.div>
          </div>
     )
}