'use client'

export const dynamic = 'force-dynamic'

import { useState, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { ProgressBar } from '@/components/booking/progress-bar'
import { StickyPriceSummary } from '@/components/booking/sticky-price-summary'
import { useBookingStore } from '@/lib/stores/booking-store'
import { Spinner } from '@/components/ui/spinner'

const DURATIONS = [30, 60, 90, 120, 150, 180]

// Generate next 14 days
function generateDays() {
  const days = []
  const today = new Date()
  for (let i = 0; i < 14; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    days.push(date)
  }
  return days
}

// Generate time slots (7 AM to 10 PM)
function generateTimeSlots() {
  const slots = []
  for (let hour = 7; hour <= 22; hour++) {
    slots.push(`${hour.toString().padStart(2, '0')}:00`)
    if (hour < 22) {
      slots.push(`${hour.toString().padStart(2, '0')}:30`)
    }
  }
  return slots
}

const weekDays = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab']
const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

export default function ReservarStep2() {
  const router = useRouter()
  const { court, date, startTime, duration, setDate, setStartTime, setDuration } = useBookingStore()
  const [isHydrated, setIsHydrated] = useState(false)
  
  useEffect(() => {
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    if (isHydrated && !court) {
      router.push('/reservar')
    }
  }, [isHydrated, court, router])

  // Show loading during SSR/hydration
  if (!isHydrated || !court) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner className="h-8 w-8 text-forest" />
      </div>
    )
  }

  const days = useMemo(() => generateDays(), [])
  const timeSlots = useMemo(() => generateTimeSlots(), [])
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    date ? new Date(date) : null
  )

  // Mock availability - [CC:DB] check real-time availability for selected court + date
  const [bookedSlots] = useState<string[]>(['09:00', '09:30', '14:00', '14:30', '15:00', '18:00'])

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
  }

  const handleTimeSelect = (time: string) => {
    if (bookedSlots.includes(time)) return
    setStartTime(time)
  }

  const handleDurationSelect = (mins: number) => {
    setDuration(mins)
  }

  const canProceed = !!date && !!startTime

  return (
    <div className="pb-32 lg:pb-12">
      <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-10 py-6">
        <ProgressBar currentStep={2} />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h1 className="font-serif text-display-sub text-sp-ink mb-2">
              Elige fecha y hora
            </h1>
            <p className="text-sp-muted mb-8">
              Selecciona cuándo quieres jugar en {court.name}
            </p>

            {/* Date Picker - Horizontal Scroll */}
            <div className="mb-8">
              <h2 className="font-sans text-sm text-sp-muted uppercase tracking-wider mb-4">
                Fecha
              </h2>
              <div className="flex overflow-x-auto gap-2 pb-2 -mx-4 px-4 hide-scrollbar">
                {days.map((d) => {
                  const isToday = d.toDateString() === new Date().toDateString()
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
            </div>

            {/* Time Slots Grid */}
            {selectedDate && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <h2 className="font-sans text-sm text-sp-muted uppercase tracking-wider mb-4">
                  Hora de inicio
                </h2>
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                  {timeSlots.map((slot) => {
                    const isBooked = bookedSlots.includes(slot)
                    const isSelected = startTime === slot

                    return (
                      <button
                        key={slot}
                        onClick={() => handleTimeSelect(slot)}
                        disabled={isBooked}
                        className={cn(
                          'py-3 rounded-lg font-mono text-sm transition-all',
                          isSelected
                            ? 'bg-sp-green text-sp-cream'
                            : isBooked
                            ? 'bg-sp-muted/20 text-sp-muted line-through cursor-not-allowed'
                            : 'bg-sp-stone text-sp-ink hover:bg-sp-muted/30'
                        )}
                      >
                        {slot}
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {/* Duration Selector */}
            {startTime && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="font-sans text-sm text-sp-muted uppercase tracking-wider mb-4">
                  Duración
                </h2>
                <div className="flex flex-wrap gap-2">
                  {DURATIONS.map((mins) => {
                    const isSelected = duration === mins
                    const hours = mins / 60
                    const label = hours >= 1
                      ? `${Math.floor(hours)}${mins % 60 > 0 ? ':30' : ''} hr`
                      : '30 min'

                    return (
                      <button
                        key={mins}
                        onClick={() => handleDurationSelect(mins)}
                        className={cn(
                          'px-5 py-2.5 rounded-full border font-mono text-sm transition-all',
                          isSelected
                            ? 'bg-sp-ink border-sp-ink text-sp-cream'
                            : 'bg-transparent border-sp-muted/50 text-sp-ink hover:border-sp-ink'
                        )}
                      >
                        {label}
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            )}
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
