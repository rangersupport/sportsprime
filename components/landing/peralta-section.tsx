'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const trustBadges = [
  { icon: 'shield', label: 'Pagos verificados' },
  { icon: 'trophy', label: 'Torneos oficiales' },
  { icon: 'robot', label: 'Tecnología robótica' },
]

export function PeraltaSection() {
  return (
    <section className="bg-sp-green py-20 md:py-28 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative order-2 lg:order-1"
          >
            {/* Placeholder for Peralta editorial photo */}
            <div className="relative aspect-[4/5] bg-sp-dark/30 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-sp-gold/10 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 rounded-full bg-sp-stone/10 mx-auto flex items-center justify-center">
                    <span className="font-serif text-4xl text-sp-cream/50">CP</span>
                  </div>
                  <p className="mt-4 font-mono text-xs text-sp-cream/30">
                    Coach Peralta
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2"
          >
            <span className="font-sans text-xs uppercase tracking-[0.2em]" style={{ color: '#E31E24' }}>
              CO-FOUNDER · SPORTSPRIME
            </span>

            <h2 className="mt-4 font-serif text-display-sub lg:text-[48px] text-white leading-tight">
              El fútbol colombiano llega al pádel.
            </h2>

            <p className="mt-6 font-sans text-body-lg text-white/70 leading-relaxed">
              Coach Peralta — reconocido en la Liga colombiana — trae su red, su nombre y su primer club al ecosistema SportsPrime. Juntos estamos construyendo la plataforma deportiva de Colombia.
            </p>

            {/* Trust Badges */}
            <div className="mt-10 flex flex-wrap gap-6">
              {trustBadges.map((badge) => (
                <div key={badge.label} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(227,30,36,0.1)' }}>
                    <BadgeIcon type={badge.icon} />
                  </div>
                  <span className="font-sans text-sm text-white/80">
                    {badge.label}
                  </span>
                </div>
              ))}
            </div>

            <Link
              href="/peralta"
              className="inline-flex items-center gap-2 mt-10 px-6 py-3 rounded-lg font-sans font-bold uppercase tracking-[0.04em] transition-all hover:scale-[1.02]"
              style={{
                background: '#E31E24',
                color: '#FFFFFF',
                boxShadow: '0 4px 20px rgba(227,30,36,0.35)',
              }}
            >
              Powered by Peralta Prime
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function BadgeIcon({ type }: { type: string }) {
  const iconProps = {
    width: 20,
    height: 20,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: '#E31E24',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }

  switch (type) {
    case 'shield':
      return (
        <svg {...iconProps}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      )
    case 'trophy':
      return (
        <svg {...iconProps}>
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
          <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
          <path d="M4 22h16" />
          <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
          <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
          <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
        </svg>
      )
    case 'robot':
      return (
        <svg {...iconProps}>
          <rect x="3" y="11" width="18" height="10" rx="2" />
          <circle cx="12" cy="5" r="2" />
          <path d="M12 7v4" />
          <line x1="8" y1="16" x2="8" y2="16" />
          <line x1="16" y1="16" x2="16" y2="16" />
          <circle cx="8" cy="16" r="1" fill="#E31E24" />
          <circle cx="16" cy="16" r="1" fill="#E31E24" />
        </svg>
      )
    default:
      return null
  }
}
