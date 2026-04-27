'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { cn, formatCOP } from '@/lib/utils'
import { ProgressBar } from '@/components/booking/progress-bar'
import { StickyPriceSummary } from '@/components/booking/sticky-price-summary'
import { StatusDot } from '@/components/shared/status-dot'
import { GoldBadge } from '@/components/shared/gold-badge'
import { Spinner } from '@/components/ui/spinner'
import { useBookingStore } from '@/lib/stores/booking-store'
import { supabase } from '@/lib/supabase'
import type { Court, CourtStatus } from '@/lib/types'

const FALLBACK_COURTS: Court[] = [
  { id: 'norte', club_id: 'mach', name: 'Padbol Norte', sport_type: 'padbol', price_per_hour: 50000, status: 'available', is_active: true, created_at: '' },
  { id: 'sur',   club_id: 'mach', name: 'Padbol Sur',   sport_type: 'padbol', price_per_hour: 50000, status: 'available', is_active: true, created_at: '' },
]

const DURATIONS = [60, 90, 120]
const weekDays  = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
const months    = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

function generateDays() {
  return Array.from({ length: 14 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() + i)
    return d
  })
}

function generateTimeSlots() {
  const slots: string[] = []
  for (let h = 7; h <= 21; h++) {
    slots.push(`${h.toString().padStart(2, '0')}:00`)
    if (h < 21) slots.push(`${h.toString().padStart(2, '0')}:30`)
  }
  return slots
}

// Expand a booking into every 30-min slot it occupies
function bookingToSlots(startTime: string, durationMinutes: number): string[] {
  const [h, m] = startTime.split(':').map(Number)
  const base   = h * 60 + m
  const slots: string[] = []
  for (let i = 0; i < durationMinutes; i += 30) {
    const total = base + i
    slots.push(
      `${Math.floor(total / 60).toString().padStart(2, '0')}:${(total % 60).toString().padStart(2, '0')}`
    )
  }
  return slots
}

export default function MachReservarPage() {
  const router = useRouter()
  const {
    court,
    date,
    startTime,
    duration,
    setCourt,
    setDate,
    setStartTime,
    setDuration,
    setSport,
  } = useBookingStore()

  const [courts, setCourts]         = useState<Court[]>([])
  const [loadingCourts, setLoadingCourts] = useState(true)
  const [selectedDate, setSelectedDate]   = useState<Date | null>(null)
  const [bookedSlots, setBookedSlots]     = useState<string[]>([])
  const [loadingSlots, setLoadingSlots]   = useState(false)
  const days      = generateDays()
  const timeSlots = generateTimeSlots()

  // Fetch MACH padbol courts from Supabase
  useEffect(() => {
    async function fetchCourts() {
      const { data, error } = await supabase
        .from('courts')
        .select('*, clubs!inner(slug)')
        .eq('clubs.slug', 'mach')
        .eq('sport_type', 'padbol')
        .eq('is_active', true)
        .order('name')

      if (!error && data && data.length > 0) {
        setCourts(data.map(({ clubs: _clubs, ...c }) => c as unknown as Court))
      } else {
        setCourts(FALLBACK_COURTS)
      }
      setLoadingCourts(false)
    }
    fetchCourts()
  }, [])

  // Fetch real availability whenever court or date changes
  const fetchAvailability = useCallback(async (courtId: string, isoDate: string) => {
    setLoadingSlots(true)
    const { data } = await supabase
      .from('bookings')
      .select('start_time, duration_minutes')
      .eq('court_id', courtId)
      .eq('date', isoDate)
      .in('status', ['confirmed', 'in_progress', 'pending'])

    const blocked: string[] = []
    for (const b of data ?? []) {
      blocked.push(...bookingToSlots(b.start_time, b.duration_minutes))
    }
    setBookedSlots(blocked)
    setLoadingSlots(false)
  }, [])

  const handleCourtSelect = (c: Court) => {
    if (c.status === 'occupied') return
    setCourt(c)
    setSport('padbol')
    if (selectedDate) {
      const iso = selectedDate.toISOString().split('T')[0]
      fetchAvailability(c.id, iso)
    }
  }

  const handleDateSelect = (d: Date) => {
    setSelectedDate(d)
    const formatted = d.toLocaleDateString('es-CO', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
    const iso = d.toISOString().split('T')[0]
    setDate(formatted, iso)
    setStartTime('')
    if (court) fetchAvailability(court.id, iso)
  }

  const handleTimeSelect = (slot: string) => {
    if (bookedSlots.includes(slot)) return
    setStartTime(slot)
  }

  const canProceed = !!court && !!date && !!startTime

  if (loadingCourts) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner className="h-8 w-8 text-sp-green" />
      </div>
    )
  }

  return (
    <div className="pb-32 lg:pb-12">
      <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-10 py-6">
        <ProgressBar currentStep={1} />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-10">

            {/* Club badge */}
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-sp-muted mb-4">
                <span className="w-4 h-px bg-sp-muted/50" />
                MACH Club · Cúcuta
              </span>
              <h1 className="font-serif text-display-sub text-sp-ink">
                Reserva tu cancha de Padbol
              </h1>
              <p className="text-sp-muted mt-2">
                Elige cancha, fecha y horario disponible
              </p>
            </div>

            {/* Court selection */}
            <section>
              <h2 className="font-sans text-xs text-sp-muted uppercase tracking-wider mb-4">
                Canchas disponibles
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {courts.map((c) => (
                  <CourtCard
                    key={c.id}
                    court={c}
                    isSelected={court?.id === c.id}
                    onSelect={handleCourtSelect}
                  />
                ))}
                {courts.length === 0 && (
                  <p className="text-sp-muted col-span-2">
                    No se encontraron canchas activas.
                  </p>
                )}
              </div>
            </section>

            {/* Date picker */}
            {court && (
              <motion.section
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="font-sans text-xs text-sp-muted uppercase tracking-wider mb-4">
                  Fecha
                </h2>
                <div className="flex overflow-x-auto gap-2 pb-2 -mx-4 px-4 hide-scrollbar">
                  {days.map((d) => {
                    const isToday    = d.toDateString() === new Date().toDateString()
                    const isSelected = selectedDate?.toDateString() === d.toDateString()
                    return (
                      <button
                        key={d.toISOString()}
                        onClick={() => handleDateSelect(d)}
                        className={cn(
                          'flex-shrink-0 w-16 h-20 rounded-lg flex flex-col items-center justify-center transition-all',
                          isSelected
                            ? 'bg-sp-green text-sp-cream'
                            : 'bg-sp-stone text-sp-ink hover:bg-sp-muted/20'
                        )}
                      >
                        <span className="text-[10px] uppercase tracking-wider opacity-70">
                          {weekDays[d.getDay()]}
                        </span>
                        <span className="font-mono text-2xl leading-none mt-1">
                          {d.getDate()}
                        </span>
                        <span className="text-[10px] uppercase tracking-wider opacity-70 mt-1">
                          {months[d.getMonth()]}
                        </span>
                        {isToday && !isSelected && (
                          <div className="w-1 h-1 rounded-full bg-sp-gold mt-1" />
                        )}
                      </button>
                    )
                  })}
                </div>
              </motion.section>
            )}

            {/* Time slots */}
            <AnimatePresence>
              {court && selectedDate && (
                <motion.section
                  key="slots"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <h2 className="font-sans text-xs text-sp-muted uppercase tracking-wider mb-4 flex items-center gap-2">
                    Hora de inicio
                    {loadingSlots && <Spinner className="h-3 w-3 text-sp-muted" />}
                  </h2>
                  <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                    {timeSlots.map((slot) => {
                      const isBlocked  = bookedSlots.includes(slot)
                      const isSelected = startTime === slot
                      return (
                        <button
                          key={slot}
                          onClick={() => handleTimeSelect(slot)}
                          disabled={isBlocked}
                          title={isBlocked ? 'No disponible' : undefined}
                          className={cn(
                            'py-3 rounded-lg font-mono text-sm transition-all',
                            isSelected
                              ? 'bg-sp-green text-sp-cream'
                              : isBlocked
                              ? 'bg-sp-muted/20 text-sp-muted line-through cursor-not-allowed'
                              : 'bg-sp-stone text-sp-ink hover:bg-sp-muted/30'
                          )}
                        >
                          {slot}
                        </button>
                      )
                    })}
                  </div>
                </motion.section>
              )}
            </AnimatePresence>

            {/* Duration */}
            <AnimatePresence>
              {startTime && (
                <motion.section
                  key="duration"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <h2 className="font-sans text-xs text-sp-muted uppercase tracking-wider mb-4">
                    Duración
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {DURATIONS.map((mins) => {
                      const label = mins === 60 ? '1 hora' : `${mins / 60 === 1.5 ? '1:30' : '2'} hr`
                      return (
                        <button
                          key={mins}
                          onClick={() => setDuration(mins)}
                          className={cn(
                            'px-5 py-2.5 rounded-full border font-mono text-sm transition-all',
                            duration === mins
                              ? 'bg-sp-ink border-sp-ink text-sp-cream'
                              : 'bg-transparent border-sp-muted/50 text-sp-ink hover:border-sp-ink'
                          )}
                        >
                          {label}
                        </button>
                      )
                    })}
                  </div>
                </motion.section>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <StickyPriceSummary
              nextStep="/reservar/datos"
              canProceed={canProceed}
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
  onSelect: (c: Court) => void
}) {
  const isOccupied = court.status === 'occupied'

  return (
    <motion.button
      onClick={() => onSelect(court)}
      disabled={isOccupied}
      whileHover={!isOccupied ? { y: -4 } : {}}
      className={cn(
        'relative w-full p-4 rounded-lg bg-sp-stone text-left transition-all',
        isSelected  && 'ring-2 ring-sp-green',
        isOccupied  && 'opacity-60 cursor-not-allowed'
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <GoldBadge size="sm">Padbol</GoldBadge>
        <StatusDot status={court.status as CourtStatus} showLabel size="sm" />
      </div>

      <h3 className="font-serif text-lg text-sp-ink">{court.name}</h3>
      <p className="text-sm text-sp-muted mt-1">MACH Club · Cúcuta</p>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <span className="font-mono text-xl text-sp-green">
            {formatCOP(court.price_per_hour, false)}
          </span>
          <span className="text-xs text-sp-muted ml-1">/hora</span>
        </div>
        <div className="flex items-center gap-1">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-sp-gold">
            <path d="M7 1L8.854 4.854L13 5.5L10 8.5L10.708 13L7 11L3.292 13L4 8.5L1 5.5L5.146 4.854L7 1Z" fill="currentColor" />
          </svg>
          <span className="font-mono text-sm text-sp-ink">5.0</span>
        </div>
      </div>

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
