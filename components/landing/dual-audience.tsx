'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const checkIcon = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5">
    <path d="M3 8L6.5 11.5L13 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export function DualAudience() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2">
      {/* Athlete Panel - Dark Green */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-sp-green px-6 py-16 md:px-12 lg:px-16 lg:py-24"
      >
        <span className="font-sans text-xs uppercase tracking-[0.2em]" style={{ color: '#E31E24' }}>
          SOY DEPORTISTA
        </span>
        
        <h2 className="mt-4 font-serif text-display-sub text-white">
          Encuentra tu cancha. Juega hoy.
        </h2>
        
        <ul className="mt-8 space-y-4">
          {[
            'Reserva en 3 clics',
            'Paga con Nequi, PSE o efectivo',
            'Encuentra compañeros de juego',
            'Accede a entrenadores verificados',
          ].map((feature) => (
            <li key={feature} className="flex items-start gap-3 text-white/80">
              {checkIcon}
              <span className="font-sans text-body">{feature}</span>
            </li>
          ))}
        </ul>
        
        <Link
          href="/reservar"
          className="inline-flex items-center gap-2 mt-10 px-6 py-3 rounded-lg font-sans font-bold uppercase tracking-[0.04em] transition-all hover:scale-[1.02]"
          style={{
            background: '#E31E24',
            color: '#FFFFFF',
            boxShadow: '0 4px 20px rgba(227,30,36,0.35)',
          }}
        >
          Ver canchas disponibles
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </motion.div>

      {/* Club Panel - Cream */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-sp-cream px-6 py-16 md:px-12 lg:px-16 lg:py-24"
      >
        <span className="font-sans text-xs uppercase tracking-[0.2em] text-sp-green">
          TENGO UN CLUB
        </span>
        
        <h2 className="mt-4 font-serif text-display-sub text-sp-ink">
          Digitaliza tu club. Cobra más.
        </h2>
        
        <ul className="mt-8 space-y-4">
          {[
            'Panel admin completo',
            'Timer + POS físico en cancha',
            'Facturación automática',
            'Robótica integrada (único en Colombia)',
          ].map((feature) => (
            <li key={feature} className="flex items-start gap-3 text-sp-ink/80">
              {checkIcon}
              <span className="font-sans text-body">{feature}</span>
            </li>
          ))}
        </ul>
        
        <Link
          href="/para-clubes"
          className="inline-flex items-center gap-2 mt-10 px-6 py-3 rounded-full bg-sp-green text-sp-cream font-sans font-medium hover:bg-sp-green/90 transition-all"
        >
          Ver demo del club
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </motion.div>
    </section>
  )
}
