'use client'

import React from 'react'
import { motion, type HTMLMotionProps, type Variants } from 'framer-motion'

export const fadeInVariants: Variants = {
     hidden: { opacity: 0, y: 28 },
     visible: (custom: number = 0) => ({
          opacity: 1,
          y: 0,
          transition: {
               duration: 0.65,
               delay: custom * 0.1,
               ease: [0.21, 0.47, 0.32, 0.98],
          },
     }),
}

export const staggerContainerVariants: Variants = {
     hidden: { opacity: 0 },
     visible: {
          opacity: 1,
          transition: {
               staggerChildren: 0.12,
               delayChildren: 0.1,
          },
     },
}

export const scaleInVariants: Variants = {
     hidden: { opacity: 0, scale: 0.92 },
     visible: (custom: number = 0) => ({
          opacity: 1,
          scale: 1,
          transition: {
               duration: 0.55,
               delay: custom * 0.1,
               ease: [0.21, 0.47, 0.32, 0.98],
          },
     }),
}

interface MotionWrapperProps extends HTMLMotionProps<'div'> {
     children: React.ReactNode
     className?: string
     delay?: number
}

export function FadeIn({ children, className = '', delay = 0, ...props }: MotionWrapperProps) {
     return (
          <motion.div
               variants={fadeInVariants}
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true, margin: '-60px' }}
               custom={delay}
               className={className}
               {...props}
          >
               {children}
          </motion.div>
     )
}

export function StaggerContainer({ children, className = '', ...props }: MotionWrapperProps) {
     return (
          <motion.div
               variants={staggerContainerVariants}
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true, margin: '-60px' }}
               className={className}
               {...props}
          >
               {children}
          </motion.div>
     )
}

export function ScaleIn({ children, className = '', delay = 0, ...props }: MotionWrapperProps) {
     return (
          <motion.div
               variants={scaleInVariants}
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true, margin: '-60px' }}
               custom={delay}
               className={className}
               {...props}
          >
               {children}
          </motion.div>
     )
}
