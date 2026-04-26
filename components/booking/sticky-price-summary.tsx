'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { cn, formatCOP, formatDuration } from '@/lib/utils'
import { useBookingStore } from '@/lib/stores/booking-store'

interface StickyPriceSummaryProps {
  nextStep: string
  nextLabel?: string
  canProceed?: boolean
}

export function StickyPriceSummary({
  nextStep,
  nextLabel = 'Continuar',
  canProceed = true,
}: StickyPriceSummaryProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const { court, date, startTime, duration, subtotal, iva, total } = useBookingStore()

  return (
    <>
      {/* Desktop Sidebar Summary */}
      <div className="hidden lg:block sticky top-24 bg-sp-stone rounded-lg p-6">
        <h3 className="font-serif text-lg text-sp-ink mb-4">Resumen</h3>

        {court ? (
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-sp-muted">Cancha</span>
              <span className="font-mono text-sp-ink">{court.name}</span>
            </div>

            {date && (
              <div className="flex justify-between text-sm">
                <span className="text-sp-muted">Fecha</span>
                <span className="font-mono text-sp-ink">{date}</span>
              </div>
            )}

            {startTime && (
              <div className="flex justify-between text-sm">
                <span className="text-sp-muted">Hora</span>
                <span className="font-mono text-sp-ink">{startTime}</span>
              </div>
            )}

            <div className="flex justify-between text-sm">
              <span className="text-sp-muted">Duración</span>
              <span className="font-mono text-sp-ink">{formatDuration(duration)}</span>
            </div>

            <div className="border-t border-sp-muted/20 pt-3 mt-3">
              <div className="flex justify-between text-sm">
                <span className="text-sp-muted">Subtotal</span>
                <span className="font-mono text-sp-ink">{formatCOP(subtotal, false)}</span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-sp-muted">IVA 19%</span>
                <span className="font-mono text-sp-ink">{formatCOP(iva, false)}</span>
              </div>
              <div className="flex justify-between mt-3">
                <span className="font-medium text-sp-ink">Total</span>
                <span className="font-mono text-xl text-sp-green">{formatCOP(total)}</span>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-sp-muted">Selecciona una cancha para ver el precio</p>
        )}

        <Link
          href={nextStep}
          className={cn(
            'block w-full mt-6 py-3 text-center rounded-full font-sans transition-all',
            canProceed
              ? 'bg-sp-green text-sp-cream hover:bg-sp-green/90'
              : 'bg-sp-muted/30 text-sp-muted cursor-not-allowed pointer-events-none'
          )}
        >
          {nextLabel}
        </Link>
      </div>

      {/* Mobile Sticky Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-sp-cream border-t border-sp-muted/20 safe-bottom z-40">
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="px-4 py-4 bg-sp-stone border-b border-sp-muted/20 overflow-hidden"
            >
              {court && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-sp-muted">Cancha</span>
                    <span className="font-mono text-sp-ink">{court.name}</span>
                  </div>
                  {date && (
                    <div className="flex justify-between text-sm">
                      <span className="text-sp-muted">Fecha</span>
                      <span className="font-mono text-sp-ink">{date}</span>
                    </div>
                  )}
                  {startTime && (
                    <div className="flex justify-between text-sm">
                      <span className="text-sp-muted">Hora</span>
                      <span className="font-mono text-sp-ink">{startTime}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-sp-muted">Duración</span>
                    <span className="font-mono text-sp-ink">{formatDuration(duration)}</span>
                  </div>
                  <div className="flex justify-between text-sm pt-2 border-t border-sp-muted/20">
                    <span className="text-sp-muted">Subtotal</span>
                    <span className="font-mono text-sp-ink">{formatCOP(subtotal, false)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-sp-muted">IVA 19%</span>
                    <span className="font-mono text-sp-ink">{formatCOP(iva, false)}</span>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2"
          >
            <span className="font-mono text-xl text-sp-gold">{formatCOP(total)}</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className={cn('text-sp-muted transition-transform', isExpanded && 'rotate-180')}
            >
              <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <Link
            href={nextStep}
            className={cn(
              'px-6 py-2.5 rounded-full font-sans text-sm transition-all flex items-center gap-2',
              canProceed
                ? 'bg-sp-green text-sp-cream'
                : 'bg-sp-muted/30 text-sp-muted pointer-events-none'
            )}
          >
            {nextLabel}
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </>
  )
}
