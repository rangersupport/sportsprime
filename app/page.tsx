export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

import { Navbar } from '@/components/shared/navbar'
import { Footer } from '@/components/shared/footer'
import { HeroCinematic } from '@/components/landing/hero-cinematic'
import { TickerMarquee } from '@/components/landing/ticker-marquee'
import { StatsSection } from '@/components/landing/stats-section'
import { DualAudience } from '@/components/landing/dual-audience'
import { SportSelector } from '@/components/landing/sport-selector'
import { ScrollStorytelling } from '@/components/landing/scroll-storytelling'
import { PeraltaSection } from '@/components/landing/peralta-section'
import { CoachTeaser } from '@/components/landing/coach-teaser'
import { RoboTeaser } from '@/components/landing/robo-teaser'
import { PricingRows } from '@/components/landing/pricing-rows'

export default function HomePage() {
  return (
    <main className="overflow-x-hidden">
      <Navbar variant="transparent" />
      
      {/* Hero - Full viewport cinematic */}
      <HeroCinematic />
      
      {/* Sport Ticker Marquee */}
      <TickerMarquee />
      
      {/* Statistics */}
      <StatsSection />
      
      {/* Dual Audience Split */}
      <DualAudience />
      
      {/* Sport Selector + Courts Listing */}
      <SportSelector />
      
      {/* How It Works - Scroll Storytelling */}
      <ScrollStorytelling />
      
      {/* Coach Peralta Section */}
      <PeraltaSection />
      
      {/* Coaching Marketplace Teaser */}
      <CoachTeaser />
      
      {/* Robotics Module Teaser */}
      <RoboTeaser />
      
      {/* Pricing Rows */}
      <PricingRows />
      
      {/* Footer */}
      <Footer />
    </main>
  )
}
