'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn, formatCOP } from '@/lib/utils'
import { GoldBadge } from '@/components/shared/gold-badge'

interface Coach {
  id: string
  name: string
  sport: string
  rating: number
  pricePerHour: number
  isVerified: boolean
  isFounder: boolean
}

// Mock data - [CC:DB] coach_profiles — SELECT filtered by sport, city, price
const coaches: Coach[] = [
  {
    id: '1',
    name: 'Coach Peralta',
    sport: 'Fútbol · Pádel',
    rating: 5.0,
    pricePerHour: 80000,
    isVerified: true,
    isFounder: true,
  },
  {
    id: '2',
    name: 'Carolina Martínez',
    sport: 'Tenis',
    rating: 4.9,
    pricePerHour: 65000,
    isVerified: true,
    isFounder: false,
  },
  {
    id: '3',
    name: 'Andrés Gómez',
    sport: 'Pádel',
    rating: 4.8,
    pricePerHour: 55000,
    isVerified: true,
    isFounder: false,
  },
]

export function CoachTeaser() {
  return (
    <section className="bg-sp-cream py-20 md:py-28">
      <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="font-sans text-xs uppercase tracking-[0.2em]" style={{ color: '#E31E24' }}>
            LO QUE EASYCANCHA NO TIENE
          </span>
          <h2 className="mt-4 font-serif text-display-section text-sp-ink">
            Mejora tu juego con entrenadores reales.
          </h2>
          <p className="mt-4 font-sans text-body-lg text-sp-muted max-w-xl mx-auto">
            Acceso directo a coaches verificados en tu ciudad.
          </p>
        </motion.div>

        {/* Coach Cards */}
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-3 md:overflow-visible">
          {coaches.map((coach, index) => (
            <motion.div
              key={coach.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="shrink-0 w-[280px] md:w-auto bg-sp-stone rounded-lg p-6 scroll-snap-start"
            >
              {/* Avatar */}
              <div className="flex items-start justify-between mb-4">
                <div className="w-20 h-20 rounded-full bg-sp-cream flex items-center justify-center border-2 border-sp-muted/20">
                  <span className="font-serif text-xl text-sp-muted">
                    {coach.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                {coach.isFounder && (
                  <GoldBadge size="sm">Fundador</GoldBadge>
                )}
              </div>

              {/* Info */}
              <h3 className="font-serif text-lg text-sp-ink">{coach.name}</h3>
              <p className="text-sm text-sp-muted mt-1">{coach.sport}</p>

              {/* Rating & Price */}
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-1">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ color: '#E31E24' }}>
                    <path d="M7 1L8.854 4.854L13 5.5L10 8.5L10.708 13L7 11L3.292 13L4 8.5L1 5.5L5.146 4.854L7 1Z" fill="currentColor"/>
                  </svg>
                  <span className="font-mono text-sm text-sp-ink">{coach.rating}</span>
                </div>
                <span className="font-mono" style={{ color: '#E31E24' }}>
                  {formatCOP(coach.pricePerHour, false)}/hora
                </span>
              </div>

              {/* Verified Badge */}
              {coach.isVerified && (
                <div className="flex items-center gap-1.5 mt-4" style={{ color: '#E31E24' }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 1L8.5 4L12 4.5L9.5 7L10 10.5L7 9L4 10.5L4.5 7L2 4.5L5.5 4L7 1Z" fill="currentColor"/>
                  </svg>
                  <span className="text-xs">Verificado</span>
                </div>
              )}

              {/* CTA */}
              <Link
                href={`/entrenadores/${coach.id}`}
                className="block w-full mt-6 py-2.5 text-center rounded-full border border-sp-green text-sp-green font-sans text-sm hover:bg-sp-green hover:text-sp-cream transition-colors"
              >
                Agendar
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-10">
          <Link
            href="/entrenadores"
            className="inline-flex items-center gap-2 font-sans text-sp-green hover:text-sp-gold transition-colors"
          >
            Ver todos los entrenadores
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
