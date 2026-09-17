import React from 'react'
import { Metadata } from 'next'
import { getGears } from '@/app/(public)/_actions/gear-actions'
import { getCatagoryall } from '@/app/(public)/_actions/catagory-action'
import { HeroSection } from '@/components/main/hero-section'
import { CategoryShowcase } from '@/components/main/category-showcase'
import { FeaturedGearSection } from '@/components/main/featured-gear-section'
import { FeaturesBento } from '@/components/main/features-bento'
import { HowItWorksSection } from '@/components/main/how-it-works-section'
import { GearCalculator } from '@/components/main/gear-calculator'
import { ReviewsMarquee } from '@/components/main/reviews-marquee'
import { HostCtaSection } from '@/components/main/host-cta-section'

export const metadata: Metadata = {
     title: 'GearUp | Pro Sports & Outdoor Gear Rental Platform',
     description:
          'Rent pro-grade camping gear, mountain bikes, action cameras, and alpine equipment. Save up to 85% over retail with built-in Gear Shield™ damage protection.',
}

export default async function HomePage() {
     // Fetch data in parallel for optimal Server-Side Performance
     const [categoriesRes, gearsRes] = await Promise.all([
          getCatagoryall().catch(() => ({ success: false, data: [] })),
          getGears({ limit: 12, sortBy: 'createdAt', sortOrder: 'desc' }).catch(() => ({
               success: false,
               data: [],
          })),
     ])

     const categories = categoriesRes?.data || []
     const gears = gearsRes?.data || []

     return (
          <div className="relative min-h-screen overflow-hidden">
               {/* 1. Hero Section with Dynamic Search & Floating Gear Displays */}
               <HeroSection categories={categories} />

               {/* 2. Category Discipline Showcase */}
               <CategoryShowcase categories={categories} />

               {/* 3. Featured & Trending Equipment with Dynamic Filtering */}
               <FeaturedGearSection initialGears={gears} />

               {/* 4. Industrial Standard Bento Grid Features */}
               <FeaturesBento />

               {/* 5. 4-Step How It Works Timeline */}
               <HowItWorksSection />

               {/* 6. Interactive Rent vs Buy ROI Calculator */}
               <GearCalculator />

               {/* 7. Community & Verified Adventurers Reviews */}
               <ReviewsMarquee />

               {/* 8. Gear Host Monetization Call-To-Action */}
               <HostCtaSection />
          </div>
     )
}