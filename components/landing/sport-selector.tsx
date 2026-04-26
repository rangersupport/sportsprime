'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { cn, formatCOP } from '@/lib/utils'
import { SportIcon, sportNames } from '@/components/shared/sport-icon'
import { StatusDot } from '@/components/shared/status-dot'
import { GoldBadge } from '@/components/shared/gold-badge'
import type { SportType, CourtStatus } from '@/lib/types'

interface Court {
  id: string
  name: string
  sport: SportType
  image: string
  price: number
  rating: number
  status: CourtStatus
  club: string
}

// Mock data - [CC:DB] courts — SELECT by sport_type + city, active only
const mockCourts: Record<SportType, Court[]> = {
  padel: [
    { id: '1', name: 'Cancha Central', sport: 'padel', image: '/images/courts/padel-1.jpg', price: 25000, rating: 4.9, status: 'available', club: 'Club Peralta' },
    { id: '2', name: 'Cancha Norte', sport: 'padel', image: '/images/courts/padel-2.jpg', price: 30000, rating: 4.8, status: 'ending_soon', club: 'Pádel Premium' },
    { id: '3', name: 'Cancha VIP', sport: 'padel', image: '/images/courts/padel-3.jpg', price: 45000, rating: 5.0, status: 'available', club: 'Club Elite' },
    { id: '4', name: 'Cancha Sur', sport: 'padel', image: '/images/courts/padel-4.jpg', price: 22000, rating: 4.7, status: 'occupied', club: 'Deportivo Central' },
  ],
  tenis: [
    { id: '5', name: 'Cancha Arcilla', sport: 'tenis', image: '/images/courts/tenis-1.jpg', price: 35000, rating: 4.9, status: 'available', club: 'Tennis Club' },
    { id: '6', name: 'Cancha Dura', sport: 'tenis', image: '/images/courts/tenis-2.jpg', price: 28000, rating: 4.6, status: 'available', club: 'Club Peralta' },
  ],
  futbol: [
    { id: '7', name: 'Cancha 5 Sintética', sport: 'futbol', image: '/images/courts/futbol-1.jpg', price: 80000, rating: 4.8, status: 'available', club: 'Fútbol 5' },
    { id: '8', name: 'Cancha 7', sport: 'futbol', image: '/images/courts/futbol-2.jpg', price: 120000, rating: 4.5, status: 'ending_soon', club: 'La Bombonera' },
  ],
  baloncesto: [
    { id: '9', name: 'Cancha Principal', sport: 'baloncesto', image: '/images/courts/basket-1.jpg', price: 40000, rating: 4.7, status: 'available', club: 'Basket Club' },
  ],
  volleyball: [
    { id: '10', name: 'Cancha Arena', sport: 'volleyball', image: '/images/courts/volley-1.jpg', price: 35000, rating: 4.6, status: 'available', club: 'Volley Beach' },
  ],
  futsal: [
    { id: '11', name: 'Cancha Indoor', sport: 'futsal', image: '/images/courts/futsal-1.jpg', price: 60000, rating: 4.8, status: 'available', club: 'Futsal Pro' },
  ],
  squash: [
    { id: '12', name: 'Court A', sport: 'squash', image: '/images/courts/squash-1.jpg', price: 30000, rating: 4.9, status: 'available', club: 'Squash Center' },
  ],
}

const sportTabs: SportType[] = ['padel', 'tenis', 'futbol', 'baloncesto', 'volleyball']

export function SportSelector() {
  const [activeSport, setActiveSport] = useState<SportType>('padel')
  const courts = mockCourts[activeSport] || []

  return (
    <section className="bg-sp-cream py-20 md:py-28 overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-10">
        {/* Section Title */}
        <div className="mb-12">
          <h2 className="font-serif text-display-section text-sp-ink">
            Encuentra
          </h2>
          <h2 className="font-serif text-display-section text-sp-ink ml-0 md:ml-20">
            tu cancha.
          </h2>
        </div>

        {/* Sport Tabs */}
        <div className="flex flex-wrap gap-3 mb-10">
          {sportTabs.map((sport) => (
            <button
              key={sport}
              onClick={() => setActiveSport(sport)}
              className={cn(
                'flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all',
                activeSport === sport
                  ? 'bg-sp-green border-sp-green text-sp-cream'
                  : 'bg-transparent border-sp-muted/50 text-sp-muted hover:border-sp-ink hover:text-sp-ink'
              )}
            >
              <SportIcon 
                sport={sport} 
                size={18} 
                className={activeSport === sport ? 'text-sp-gold' : ''} 
              />
              <span className="font-sans text-sm">{sportNames[sport]}</span>
            </button>
          ))}
        </div>

        {/* Courts Horizontal Scroll */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSport}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.25 }}
            className="flex gap-5 overflow-x-auto pb-4 scroll-snap-x scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0"
          >
            {courts.map((court) => (
              <CourtCard key={court.id} court={court} />
            ))}
            {/* Peek card for scroll signal */}
            <div className="w-6 shrink-0" aria-hidden="true" />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

function CourtCard({ court }: { court: Court }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative shrink-0 w-[280px] h-[380px] rounded-lg overflow-hidden bg-sp-stone scroll-snap-start group"
      style={{ perspective: '1000px' }}
      whileHover={{ y: -4 }}
    >
      {/* Image */}
      <div className="relative h-[55%] overflow-hidden">
        <div className="absolute inset-0 bg-sp-muted/20" />
        {/* Placeholder - would use actual images */}
        <div className="absolute inset-0 bg-gradient-to-br from-sp-green/20 to-sp-green/5 flex items-center justify-center">
          <SportIcon sport={court.sport} size={48} className="text-sp-green/30" />
        </div>

        {/* Sport Badge */}
        <GoldBadge size="sm" className="absolute top-3 right-3">
          {sportNames[court.sport]}
        </GoldBadge>

        {/* Status Dot */}
        <div className="absolute top-3 left-3">
          <StatusDot status={court.status} showLabel size="md" />
        </div>
      </div>

      {/* Content */}
      <div className="p-4 h-[45%] flex flex-col">
        <p className="text-xs text-sp-muted">{court.club}</p>
        <h3 className="mt-1 font-serif text-lg text-sp-ink font-medium">
          {court.name}
        </h3>

        <div className="mt-auto flex items-end justify-between">
          <div>
            <p className="font-mono text-xl text-sp-green">
              {formatCOP(court.price, false)}
            </p>
            <p className="text-xs text-sp-muted">/hora</p>
          </div>

          <div className="flex items-center gap-1">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-sp-gold">
              <path d="M7 1L8.854 4.854L13 5.5L10 8.5L10.708 13L7 11L3.292 13L4 8.5L1 5.5L5.146 4.854L7 1Z" fill="currentColor"/>
            </svg>
            <span className="font-mono text-sm text-sp-ink">{court.rating}</span>
          </div>
        </div>

        {/* Reservar Button - slides up on hover */}
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: isHovered ? 0 : '100%', opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-0 left-0 right-0 p-4 bg-sp-cream"
        >
          <Link
            href={`/reservar?court=${court.id}`}
            className="block w-full py-2.5 text-center rounded-full bg-sp-green text-sp-cream font-sans text-sm hover:bg-sp-green/90 transition-colors"
          >
            Reservar
          </Link>
        </motion.div>
      </div>

      {/* Selected border effect */}
      <div className={cn(
        'absolute inset-0 border-2 rounded-lg pointer-events-none transition-colors',
        isHovered ? 'border-sp-green' : 'border-transparent'
      )} />
    </motion.div>
  )
}
