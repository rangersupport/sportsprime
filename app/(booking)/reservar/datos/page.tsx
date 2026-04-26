'use client'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { ProgressBar } from '@/components/booking/progress-bar'
import { StickyPriceSummary } from '@/components/booking/sticky-price-summary'
import { FloatingLabelInput } from '@/components/booking/floating-label-input'
import { useBookingStore } from '@/lib/stores/booking-store'
import { Spinner } from '@/components/ui/spinner'

const playerOptions = [2, 3, 4, 5, 6]

export default function ReservarStep3() {
  const router = useRouter()
  const { 
    court, 
    date, 
    startTime,
    numPlayers,
    playerName,
    playerPhone,
    playerEmail,
    notes,
    setNumPlayers,
    setPlayerInfo 
  } = useBookingStore()
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    if (isHydrated && (!court || !date || !startTime)) {
      router.push('/reservar')
    }
  }, [isHydrated, court, date, startTime, router])

  // Show loading during SSR/hydration
  if (!isHydrated || !court || !date || !startTime) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner className="h-8 w-8 text-forest" />
      </div>
    )
  }

  const [localName, setLocalName] = useState(playerName)
  const [localPhone, setLocalPhone] = useState(playerPhone || '+57')
  const [localEmail, setLocalEmail] = useState(playerEmail)
  const [localNotes, setLocalNotes] = useState(notes)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateAndSave = () => {
    const newErrors: Record<string, string> = {}
    
    if (!localName.trim()) {
      newErrors.name = 'El nombre es requerido'
    }
    
    const phoneClean = localPhone.replace(/\s/g, '')
    if (!phoneClean || phoneClean.length < 10) {
      newErrors.phone = 'Ingresa un número válido'
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!localEmail || !emailRegex.test(localEmail)) {
      newErrors.email = 'Ingresa un email válido'
    }

    setErrors(newErrors)
    
    if (Object.keys(newErrors).length === 0) {
      setPlayerInfo({
        name: localName,
        phone: localPhone,
        email: localEmail,
        notes: localNotes,
      })
      return true
    }
    return false
  }

  const canProceed = localName.trim() && localPhone.length >= 10 && localEmail.includes('@')

  return (
    <div className="pb-32 lg:pb-12">
      <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-10 py-6">
        <ProgressBar currentStep={3} />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h1 className="font-serif text-display-sub text-sp-ink mb-2">
              Datos del jugador
            </h1>
            <p className="text-sp-muted mb-8">
              Ingresa tus datos para la reserva
            </p>

            {/* Number of Players */}
            <div className="mb-8">
              <h2 className="font-sans text-sm text-sp-muted uppercase tracking-wider mb-4">
                Número de jugadores
              </h2>
              <div className="flex flex-wrap gap-2">
                {playerOptions.map((num) => (
                  <button
                    key={num}
                    onClick={() => setNumPlayers(num)}
                    className={cn(
                      'w-12 h-12 rounded-full font-mono text-lg transition-all',
                      numPlayers === num
                        ? 'bg-sp-green text-sp-cream'
                        : 'bg-sp-stone text-sp-ink hover:bg-sp-muted/30'
                    )}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6 max-w-md"
            >
              <FloatingLabelInput
                label="Nombre completo *"
                value={localName}
                onChange={(e) => setLocalName(e.target.value)}
                error={errors.name}
                onBlur={validateAndSave}
              />

              <FloatingLabelInput
                label="Teléfono *"
                type="tel"
                value={localPhone}
                onChange={(e) => setLocalPhone(e.target.value)}
                error={errors.phone}
                onBlur={validateAndSave}
              />

              <FloatingLabelInput
                label="Email *"
                type="email"
                value={localEmail}
                onChange={(e) => setLocalEmail(e.target.value)}
                error={errors.email}
                onBlur={validateAndSave}
              />

              <div className="relative">
                <textarea
                  value={localNotes}
                  onChange={(e) => setLocalNotes(e.target.value)}
                  onBlur={validateAndSave}
                  placeholder="Notas adicionales (opcional)"
                  rows={3}
                  className="w-full px-0 pt-6 pb-2 bg-transparent border-0 border-b border-sp-muted focus:border-sp-green transition-colors outline-none resize-none font-sans text-sp-ink placeholder:text-sp-muted"
                />
              </div>

              {/* Terms */}
              <div className="pt-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="mt-1 w-5 h-5 rounded border-sp-muted text-sp-green focus:ring-sp-green"
                    defaultChecked
                  />
                  <span className="text-sm text-sp-muted leading-relaxed">
                    Acepto los{' '}
                    <a href="/terminos" className="text-sp-green hover:underline">
                      términos y condiciones
                    </a>{' '}
                    y la{' '}
                    <a href="/privacidad" className="text-sp-green hover:underline">
                      política de privacidad
                    </a>
                  </span>
                </label>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <StickyPriceSummary
              nextStep="/reservar/pago"
              canProceed={canProceed}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
