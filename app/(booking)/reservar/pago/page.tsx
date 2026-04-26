'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { cn, formatCOP } from '@/lib/utils'
import { ProgressBar } from '@/components/booking/progress-bar'
import { useBookingStore } from '@/lib/stores/booking-store'
import { redirect } from 'next/navigation'
import type { PaymentMethod } from '@/lib/types'

const paymentMethods: { id: PaymentMethod; name: string; icon: JSX.Element }[] = [
  {
    id: 'nequi',
    name: 'Nequi',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#E0006E"/>
        <path d="M7 12h10M12 7v10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'daviplata',
    name: 'Daviplata',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#E31837"/>
        <text x="12" y="16" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">D</text>
      </svg>
    ),
  },
  {
    id: 'pse',
    name: 'PSE',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#004B87"/>
        <text x="12" y="16" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">PSE</text>
      </svg>
    ),
  },
  {
    id: 'credit_card',
    name: 'Tarjeta de crédito',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="5" width="20" height="14" rx="2"/>
        <path d="M2 10h20"/>
        <path d="M6 14h4"/>
      </svg>
    ),
  },
  {
    id: 'cash',
    name: 'Efectivo',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="6" width="20" height="12" rx="2"/>
        <circle cx="12" cy="12" r="3"/>
        <path d="M6 12h.01M18 12h.01"/>
      </svg>
    ),
  },
]

export default function ReservarStep4() {
  const router = useRouter()
  const { 
    court, 
    date, 
    startTime, 
    playerName,
    paymentMethod,
    promoCode,
    subtotal,
    iva,
    total,
    setPaymentMethod,
    setPromoCode 
  } = useBookingStore()

  // Redirect if missing previous steps
  if (!court || !date || !startTime || !playerName) {
    redirect('/reservar')
  }

  const [localPromo, setLocalPromo] = useState(promoCode)
  const [isProcessing, setIsProcessing] = useState(false)
  const [promoApplied, setPromoApplied] = useState(false)

  const handleApplyPromo = () => {
    // [CC:DB] validate promo code against database
    if (localPromo.toUpperCase() === 'PERALTA10') {
      setPromoCode(localPromo)
      setPromoApplied(true)
    }
  }

  const handlePayment = async () => {
    if (!paymentMethod) return
    
    setIsProcessing(true)
    
    // [CC:API] Process payment via Nequi/Daviplata/PSE/Stripe
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // [CC:DB] Create booking record
    // On success, redirect to confirmation
    router.push('/reservar/confirmacion')
  }

  return (
    <div className="pb-32 lg:pb-12">
      <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-10 py-6">
        <ProgressBar currentStep={4} />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h1 className="font-serif text-display-sub text-sp-ink mb-2">
              Método de pago
            </h1>
            <p className="text-sp-muted mb-8">
              Elige cómo quieres pagar tu reserva
            </p>

            {/* Payment Methods */}
            <div className="space-y-3 max-w-lg">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className={cn(
                    'w-full flex items-center gap-4 p-4 rounded-lg border transition-all',
                    paymentMethod === method.id
                      ? 'border-sp-green bg-sp-green/5'
                      : 'border-sp-muted/30 bg-sp-stone hover:border-sp-muted'
                  )}
                >
                  <div className="flex-shrink-0">{method.icon}</div>
                  <span className="font-sans text-sp-ink">{method.name}</span>
                  
                  {paymentMethod === method.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-auto w-6 h-6 rounded-full bg-sp-green flex items-center justify-center"
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M3 7L6 10L11 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.div>
                  )}
                </button>
              ))}
            </div>

            {/* Promo Code */}
            <div className="mt-8 max-w-lg">
              <h2 className="font-sans text-sm text-sp-muted uppercase tracking-wider mb-4">
                Código promocional
              </h2>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={localPromo}
                  onChange={(e) => setLocalPromo(e.target.value.toUpperCase())}
                  placeholder="Ej: PERALTA10"
                  disabled={promoApplied}
                  className={cn(
                    'flex-1 px-4 py-3 rounded-lg border font-mono uppercase',
                    'bg-sp-stone border-sp-muted/30 text-sp-ink',
                    'placeholder:text-sp-muted focus:border-sp-green outline-none',
                    promoApplied && 'opacity-60'
                  )}
                />
                <button
                  onClick={handleApplyPromo}
                  disabled={!localPromo || promoApplied}
                  className={cn(
                    'px-6 py-3 rounded-lg font-sans text-sm transition-all',
                    promoApplied
                      ? 'bg-sp-gold/20 text-sp-gold'
                      : 'bg-sp-ink text-sp-cream hover:bg-sp-ink/90 disabled:opacity-50'
                  )}
                >
                  {promoApplied ? 'Aplicado' : 'Aplicar'}
                </button>
              </div>
              {promoApplied && (
                <p className="text-sm text-sp-gold mt-2">
                  Código PERALTA10 aplicado — 10% de descuento
                </p>
              )}
            </div>
          </div>

          {/* Sidebar Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-sp-stone rounded-lg p-6">
              <h3 className="font-serif text-lg text-sp-ink mb-4">Resumen del pago</h3>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-sp-muted">Cancha</span>
                  <span className="font-mono text-sp-ink">{court.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-sp-muted">Fecha</span>
                  <span className="font-mono text-sp-ink">{date}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-sp-muted">Hora</span>
                  <span className="font-mono text-sp-ink">{startTime}</span>
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
                  {promoApplied && (
                    <div className="flex justify-between text-sm mt-1 text-sp-gold">
                      <span>Descuento 10%</span>
                      <span className="font-mono">-{formatCOP(Math.round(total * 0.1), false)}</span>
                    </div>
                  )}
                  <div className="flex justify-between mt-3">
                    <span className="font-medium text-sp-ink">Total</span>
                    <span className="font-mono text-xl text-sp-green">
                      {formatCOP(promoApplied ? Math.round(total * 0.9) : total)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={!paymentMethod || isProcessing}
                className={cn(
                  'w-full mt-6 py-3 text-center rounded-full font-sans transition-all',
                  'flex items-center justify-center gap-2',
                  paymentMethod && !isProcessing
                    ? 'bg-sp-green text-sp-cream hover:bg-sp-green/90'
                    : 'bg-sp-muted/30 text-sp-muted cursor-not-allowed'
                )}
              >
                {isProcessing ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Procesando...
                  </>
                ) : (
                  <>
                    Pagar {formatCOP(promoApplied ? Math.round(total * 0.9) : total)}
                  </>
                )}
              </button>

              {/* Security Badge */}
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-sp-muted">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                Pago seguro encriptado
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
