'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn, formatCOP } from '@/lib/utils'
import { ProgressBar } from '@/components/booking/progress-bar'
import { StickyPriceSummary } from '@/components/booking/sticky-price-summary'
import { SportIcon, sportNames } from '@/components/shared/sport-icon'
import { StatusDot } from '@/components/shared/status-dot'
import { GoldBadge } from '@/components/shared/gold-badge'
import { useBookingStore } from '@/lib/stores/booking-store'
import type { SportType, Court, CourtStatus } from '@/lib/types'

const sportTabs: SportType[] = ['padel', 'tenis', 'futbol', 'baloncesto', 'volleyball']

// Mock data - [CC:DB] courts — SELECT by sport_type + city, active only
const mockCourts: Court[] = [
  { id: '1', club_id: 'c1', name: 'Cancha Central', sport_type: 'padel', price_per_hour: 25000, status: 'available' as CourtStatus, is_active: true, created_at: '' },
  { id: '2', club_id: 'c1', name: 'Cancha Norte', sport_type: 'padel', price_per_hour: 30000, status: 'ending_soon' as CourtStatus, is_active: true, created_at: '' },
  { id: '3', club_id: 'c2', name: 'Cancha VIP', sport_type: 'padel', price_per_hour: 45000, status: 'available' as CourtStatus, is_active: true, created_at: '' },
  { id: '4', club_id: 'c1', name: 'Cancha Sur', sport_type: 'padel', price_per_hour: 22000, status: 'occupied' as CourtStatus, is_active: true, created_at: '' },
  { id: '5', club_id: 'c3', name: 'Court Arcilla', sport_type: 'tenis', price_per_hour: 35000, status: 'available' as CourtStatus, is_active: true, created_at: '' },
  { id: '6', club_id: 'c1', name: 'Court Dura', sport_type: 'tenis', price_per_hour: 28000, status: 'available' as CourtStatus, is_active: true, created_at: '' },
  { id: '7', club_id: 'c4', name: 'Cancha 5 Sintética', sport_type: 'futbol', price_per_hour: 80000, status: 'available' as CourtStatus, is_active: true, created_at: '' },
  { id: '8', club_id: 'c4', name: 'Cancha 7', sport_type: 'futbol', price_per_hour: 120000, status: 'ending_soon' as CourtStatus, is_active: true, created_at: '' },
  { id: '9', club_id: 'c5', name: 'Cancha Principal', sport_type: 'baloncesto', price_per_hour: 40000, status: 'available' as CourtStatus, is_active: true, created_at: '' },
  { id: '10', club_id: 'c6', name: 'Cancha Arena', sport_type: 'volleyball', price_per_hour: 35000, status: 'available' as CourtStatus, is_active: true, created_at: '' },
]

export default function ReservarStep1() {
  const { sport, court, setSport, setCourt } = useBookingStore()
  const [activeSport, setActiveSport] = useState<SportType>(sport || 'padel')

  const filteredCourts = mockCourts.filter((c) => c.sport_type === activeSport)

  const handleSportChange = (newSport: SportType) => {
    setActiveSport(newSport)
    setSport(newSport)
  }

  const handleCourtSelect = (selectedCourt: Court) => {
    if (selectedCourt.status === 'occupied') return
    setCourt(selectedCourt)
  }

  return (
    <div className="pb-32 lg:pb-12">
      <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-10 py-6">
        {/* Progress Bar */}
        <ProgressBar currentStep={1} />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h1 className="font-serif text-display-sub text-sp-ink mb-2">
              Elige tu deporte y cancha
            </h1>
            <p className="text-sp-muted mb-8">
              Selecciona el deporte y la cancha donde quieres jugar
            </p>

            {/* Sport Tabs */}
            <div className="flex flex-wrap gap-3 mb-8">
              {sportTabs.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSportChange(s)}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all',
                    activeSport === s
                      ? 'bg-sp-green border-sp-green text-sp-cream'
                      : 'bg-transparent border-sp-muted/50 text-sp-muted hover:border-sp-ink hover:text-sp-ink'
                  )}
                >
                  <SportIcon
                    sport={s}
                    size={18}
                    className={activeSport === s ? 'text-sp-gold' : ''}
                  />
                  <span className="font-sans text-sm">{sportNames[s]}</span>
                </button>
              ))}
            </div>

            {/* Courts Grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSport}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {filteredCourts.map((c) => (
                  <CourtCard
                    key={c.id}
                    court={c}
                    isSelected={court?.id === c.id}
                    onSelect={handleCourtSelect}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Sidebar Summary */}
          <div className="lg:col-span-1">
            <StickyPriceSummary
              nextStep="/reservar/fecha"
              canProceed={!!court}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function CourtCard({
  court,
  isSelected,
  onSelect,
}: {
  court: Court
  isSelected: boolean
  onSelect: (court: Court) => void
}) {
  const isOccupied = court.status === 'occupied'

  return (
    <motion.button
      onClick={() => onSelect(court)}
      disabled={isOccupied}
      whileHover={!isOccupied ? { y: -4 } : {}}
      className={cn(
        'relative w-full p-4 rounded-lg bg-sp-stone text-left transition-all',
        isSelected && 'ring-2 ring-sp-green',
        isOccupied && 'opacity-60 cursor-not-allowed'
      )}
    >
      {/* Sport Badge */}
      <div className="flex items-start justify-between mb-3">
        <GoldBadge size="sm">{sportNames[court.sport_type]}</GoldBadge>
        <StatusDot status={court.status} showLabel size="sm" />
      </div>

      {/* Court Info */}
      <h3 className="font-serif text-lg text-sp-ink">{court.name}</h3>
      <p className="text-sm text-sp-muted mt-1">Club Peralta</p>

      {/* Price */}
      <div className="mt-4 flex items-end justify-between">
        <div>
          <span className="font-mono text-xl text-sp-green">
            {formatCOP(court.price_per_hour, false)}
          </span>
          <span className="text-xs text-sp-muted ml-1">/hora</span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-sp-gold">
            <path d="M7 1L8.854 4.854L13 5.5L10 8.5L10.708 13L7 11L3.292 13L4 8.5L1 5.5L5.146 4.854L7 1Z" fill="currentColor" />
          </svg>
          <span className="font-mono text-sm text-sp-ink">4.8</span>
        </div>
      </div>

      {/* Selected Indicator */}
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-3 right-3 w-6 h-6 rounded-full bg-sp-green flex items-center justify-center"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 7L6 10L11 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      )}
    </motion.button>
  )
}
