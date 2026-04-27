'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { GoldBadge } from '@/components/shared/gold-badge'

interface PricingPlan {
  name: string
  price: string
  priceNote?: string
  features: string[]
  cta: string
  ctaLink: string
  featured?: boolean
  badge?: string
}

const plans: PricingPlan[] = [
  {
    name: 'Deportista',
    price: 'Gratis · 3% por reserva',
    features: [
      'Reserva en 3 clics',
      'Paga con Nequi, PSE o efectivo',
      'Encuentra compañeros de juego',
      'Accede a entrenadores verificados',
    ],
    cta: 'Comenzar gratis',
    ctaLink: '/auth/registro',
  },
  {
    name: 'SportsPrime Prime',
    price: '$15.000 COP/mes',
    features: [
      'Reserva prioritaria',
      'Descuentos en coaches',
      'Match con jugadores',
      'Seguro deportivo básico',
    ],
    cta: 'Suscribirme',
    ctaLink: '/auth/registro?plan=prime',
    featured: true,
  },
  {
    name: 'Club Pro',
    price: 'Desde $150.000 COP/mes',
    features: [
      'Panel admin completo',
      'Timer + POS físico',
      'Facturación automática',
      'White-label',
      'Analytics',
      'Torneos',
      'Soporte prioritario',
    ],
    cta: 'Ver demo del club',
    ctaLink: '/para-clubes',
  },
  {
    name: 'RoboClub',
    price: 'Cotización personalizada',
    features: [
      'Todo Club Pro',
      'Brazo robótico AR4',
      'Control desde app',
      'Dashboard robótico',
      'Instalación incluida',
    ],
    cta: 'Solicitar cotización',
    ctaLink: '/robotica',
    badge: 'NUEVO',
  },
]

export function PricingRows() {
  return (
    <section className="bg-sp-cream py-20 md:py-28">
      <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="font-serif text-display-section text-sp-ink">
            Planes
          </h2>
          <p className="mt-4 font-sans text-body-lg text-sp-muted max-w-xl">
            Desde gratis para deportistas hasta soluciones enterprise para clubes.
          </p>
        </motion.div>

        {/* Pricing Rows */}
        <div className="space-y-4">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                'relative bg-sp-stone rounded-lg p-6 lg:p-8',
                plan.featured && 'border-l-4 border-[#E31E24]'
              )}
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                {/* Plan Name */}
                <div className="flex items-center gap-3">
                  <h3 className="font-serif text-xl lg:text-2xl text-sp-ink">
                    {plan.name}
                  </h3>
                  {plan.badge && (
                    <GoldBadge size="sm">{plan.badge}</GoldBadge>
                  )}
                </div>

                {/* Features */}
                <div className="lg:col-span-1">
                  <ul className="flex flex-wrap gap-x-4 gap-y-1">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="text-sm text-sp-ink/70 before:content-['·'] before:mr-1.5 before:text-[#E31E24]"
                      >
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price & CTA */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between lg:justify-end gap-4">
                  <span className="font-mono text-lg lg:text-xl text-sp-ink">
                    {plan.price}
                  </span>
                  <Link
                    href={plan.ctaLink}
                    className={cn(
                      'inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-sans text-sm transition-all whitespace-nowrap',
                      plan.featured
                        ? 'bg-sp-green text-sp-cream hover:bg-sp-green/90'
                        : 'border border-sp-ink/20 text-sp-ink hover:bg-sp-ink hover:text-sp-cream'
                    )}
                  >
                    {plan.cta}
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
