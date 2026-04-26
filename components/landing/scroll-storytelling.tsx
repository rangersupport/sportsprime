'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'
import { SportIcon } from '@/components/shared/sport-icon'

const steps = [
  {
    number: '01',
    title: 'Elige tu deporte y cancha',
    description: 'Navega entre cientos de canchas verificadas en tu ciudad. Pádel, tenis, fútbol y más.',
    illustration: 'sports',
  },
  {
    number: '02',
    title: 'Escoge hora y paga fácil',
    description: 'Reserva con Nequi, PSE, Bancolombia o efectivo. Confirmación instantánea.',
    illustration: 'payment',
  },
  {
    number: '03',
    title: '¡A jugar! Nosotros manejamos el resto.',
    description: 'Recibe tu código QR, llegás al club y el timer arranca automáticamente.',
    illustration: 'play',
  },
]

export function ScrollStorytelling() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  return (
    <section
      id="como-funciona"
      ref={containerRef}
      className="relative bg-sp-stone"
      style={{ height: '300vh' }}
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="mx-auto max-w-[1440px] w-full px-4 md:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text Content */}
            <div className="relative">
              {steps.map((step, index) => (
                <StepContent
                  key={step.number}
                  step={step}
                  index={index}
                  scrollProgress={scrollYProgress}
                />
              ))}
            </div>

            {/* Illustration */}
            <div className="hidden lg:block relative h-[400px]">
              {steps.map((step, index) => (
                <StepIllustration
                  key={step.number}
                  type={step.illustration}
                  index={index}
                  scrollProgress={scrollYProgress}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function StepContent({
  step,
  index,
  scrollProgress,
}: {
  step: typeof steps[0]
  index: number
  scrollProgress: ReturnType<typeof useScroll>['scrollYProgress']
}) {
  const stepStart = index / steps.length
  const stepEnd = (index + 1) / steps.length
  
  // Ensure offsets are monotonically non-decreasing
  const fadeInStart = Math.max(0, stepStart - 0.1)
  const fadeOutEnd = Math.min(1, stepEnd)

  const opacity = useTransform(
    scrollProgress,
    [
      fadeInStart,
      stepStart,
      Math.max(stepStart + 0.01, stepEnd - 0.1),
      fadeOutEnd,
    ],
    [index === 0 ? 1 : 0, 1, 1, index === steps.length - 1 ? 1 : 0]
  )

  const y = useTransform(
    scrollProgress,
    [fadeInStart, Math.max(fadeInStart + 0.01, stepStart)],
    [index === 0 ? 0 : 50, 0]
  )

  return (
    <motion.div
      style={{ opacity, y }}
      className={cn(
        'absolute inset-0',
        index === 0 && 'relative'
      )}
    >
      {/* Background Number */}
      <span className="absolute -left-4 top-0 font-serif text-[120px] lg:text-[180px] text-sp-ink/[0.04] leading-none select-none">
        {step.number}
      </span>

      {/* Content */}
      <div className="relative">
        <span className="font-mono text-sm text-sp-gold">
          Paso {step.number}
        </span>
        <h3 className="mt-4 font-serif text-display-sub text-sp-ink">
          {step.title}
        </h3>
        <p className="mt-4 font-sans text-body-lg text-sp-muted max-w-md">
          {step.description}
        </p>
      </div>
    </motion.div>
  )
}

function StepIllustration({
  type,
  index,
  scrollProgress,
}: {
  type: string
  index: number
  scrollProgress: ReturnType<typeof useScroll>['scrollYProgress']
}) {
  const stepStart = index / steps.length
  const stepEnd = (index + 1) / steps.length
  
  // Ensure offsets are monotonically non-decreasing
  const fadeInStart = Math.max(0, stepStart - 0.1)
  const fadeOutEnd = Math.min(1, stepEnd)

  const opacity = useTransform(
    scrollProgress,
    [
      fadeInStart,
      stepStart,
      Math.max(stepStart + 0.01, stepEnd - 0.1),
      fadeOutEnd,
    ],
    [index === 0 ? 1 : 0, 1, 1, index === steps.length - 1 ? 1 : 0]
  )

  const scale = useTransform(
    scrollProgress,
    [fadeInStart, Math.max(fadeInStart + 0.01, stepStart)],
    [index === 0 ? 1 : 0.9, 1]
  )

  return (
    <motion.div
      style={{ opacity, scale }}
      className={cn(
        'absolute inset-0 flex items-center justify-center',
        index !== 0 && 'absolute'
      )}
    >
      {type === 'sports' && <SportsIllustration />}
      {type === 'payment' && <PaymentIllustration />}
      {type === 'play' && <PlayIllustration />}
    </motion.div>
  )
}

function SportsIllustration() {
  return (
    <div className="relative w-64 h-64">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0"
      >
        {['padel', 'tenis', 'futbol', 'baloncesto', 'volleyball'].map((sport, i) => (
          <motion.div
            key={sport}
            className="absolute w-16 h-16 rounded-full bg-sp-cream shadow-lg flex items-center justify-center"
            style={{
              top: '50%',
              left: '50%',
              transform: `rotate(${i * 72}deg) translateX(100px) rotate(-${i * 72}deg)`,
              marginLeft: -32,
              marginTop: -32,
            }}
            whileHover={{ scale: 1.1 }}
          >
            <SportIcon sport={sport as any} size={28} className="text-sp-green" />
          </motion.div>
        ))}
      </motion.div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-sp-green flex items-center justify-center">
          <span className="font-serif text-xl text-sp-cream">SP</span>
        </div>
      </div>
    </div>
  )
}

function PaymentIllustration() {
  return (
    <div className="w-72 space-y-3">
      {/* Time slots */}
      <div className="grid grid-cols-4 gap-2">
        {['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'].map((time, i) => (
          <motion.div
            key={time}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className={cn(
              'py-2 px-3 rounded text-center text-xs font-mono',
              i === 3
                ? 'bg-sp-green text-sp-cream'
                : i < 3
                  ? 'bg-sp-muted/30 text-sp-muted line-through'
                  : 'bg-sp-cream text-sp-ink border border-sp-muted/30'
            )}
          >
            {time}
          </motion.div>
        ))}
      </div>

      {/* Payment methods */}
      <div className="flex justify-center gap-4 pt-4">
        {['Nequi', 'PSE', 'Visa'].map((method, i) => (
          <motion.div
            key={method}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 + i * 0.15 }}
            className="w-14 h-10 rounded bg-sp-cream shadow flex items-center justify-center text-xs font-mono text-sp-muted"
          >
            {method}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function PlayIllustration() {
  return (
    <div className="relative">
      {/* Receipt/Ticket */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-56 bg-sp-cream rounded-lg shadow-xl p-6 ticket-perforation"
      >
        <div className="text-center">
          <span className="font-sans text-lg font-medium text-sp-ink">SportsPrime</span>
          <p className="text-xs text-sp-gold font-serif italic">Powered by Peralta</p>
        </div>

        <div className="mt-6 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-sp-muted">Cancha</span>
            <span className="font-mono text-sp-ink">Central</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sp-muted">Fecha</span>
            <span className="font-mono text-sp-ink">25/04/2026</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sp-muted">Hora</span>
            <span className="font-mono text-sp-ink">12:00</span>
          </div>
        </div>

        {/* QR Placeholder */}
        <div className="mt-6 mx-auto w-20 h-20 bg-sp-ink/10 rounded flex items-center justify-center">
          <span className="text-[10px] text-sp-muted">QR</span>
        </div>

        {/* Checkmark */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
          className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-sp-success flex items-center justify-center"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
            <path
              d="M5 12L10 17L20 7"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="stroke-draw"
              style={{ strokeDasharray: 30, strokeDashoffset: 30 }}
            />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  )
}
