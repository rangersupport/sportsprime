'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'

interface Stat {
  value: number
  suffix: string
  label: string
}

const stats: Stat[] = [
  { value: 2400, suffix: '+', label: 'Reservas este mes' },
  { value: 98, suffix: '%', label: 'Puntualidad confirmada' },
  { value: 12, suffix: '', label: 'Deportes disponibles' },
]

function AnimatedNumber({ 
  value, 
  suffix,
  shouldAnimate 
}: { 
  value: number
  suffix: string
  shouldAnimate: boolean 
}) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!shouldAnimate) return

    const duration = 2000
    const startTime = Date.now()
    
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3)
      setDisplayValue(Math.floor(value * easeOut))
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    
    requestAnimationFrame(animate)
  }, [value, shouldAnimate])

  return (
    <span className="font-serif text-display-section md:text-[80px] text-sp-ink tabular-nums">
      {displayValue.toLocaleString('es-CO')}{suffix}
    </span>
  )
}

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="bg-sp-cream py-20 md:py-24 lg:py-28">
      <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                'text-center',
                index !== stats.length - 1 && 'md:border-r md:border-sp-muted/30'
              )}
            >
              <AnimatedNumber 
                value={stat.value} 
                suffix={stat.suffix}
                shouldAnimate={isInView} 
              />
              <p className="mt-2 font-sans text-sm text-sp-muted">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
