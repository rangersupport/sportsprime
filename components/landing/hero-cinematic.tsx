'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { PoweredByBadge } from '@/components/shared/powered-by-badge'

const cyclingWords = ['Entrena.', 'Compite.', 'Gana.', 'Triunfa.']

export function HeroCinematic() {
  const [wordIndex, setWordIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  const [displayText, setDisplayText] = useState('')

  useEffect(() => {
    const word = cyclingWords[wordIndex]
    
    if (isTyping) {
      if (displayText.length < word.length) {
        const timeout = setTimeout(() => {
          setDisplayText(word.slice(0, displayText.length + 1))
        }, 100)
        return () => clearTimeout(timeout)
      } else {
        const timeout = setTimeout(() => {
          setIsTyping(false)
        }, 1500)
        return () => clearTimeout(timeout)
      }
    } else {
      if (displayText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1))
        }, 50)
        return () => clearTimeout(timeout)
      } else {
        setWordIndex((prev) => (prev + 1) % cyclingWords.length)
        setIsTyping(true)
      }
    }
  }, [displayText, isTyping, wordIndex])

  return (
    <section className="relative h-[100svh] min-h-[600px] w-full overflow-hidden">
      {/* Background Video/Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-padel-court.jpg"
          alt="Club de pádel al atardecer"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-sp-green/90" 
             style={{ background: 'linear-gradient(to bottom, transparent 30%, rgba(10,61,46,0.88) 70%)' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 md:px-6">
        <div className="text-center max-w-4xl mx-auto" style={{ marginTop: '-12%' }}>
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <span className="w-10 h-px bg-sp-gold" />
            <span className="font-sans text-xs uppercase tracking-[0.2em] text-sp-gold">
              Colombia&apos;s Sports Platform
            </span>
            <span className="w-10 h-px bg-sp-gold" />
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-display-hero text-white"
          >
            <span className="block">Reserva. Juega.</span>
            <span className="block">
              {displayText}
              <span className="inline-block w-[3px] h-[0.9em] bg-sp-gold ml-1 cursor-blink" />
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 font-sans text-lg md:text-xl text-white/70 max-w-xl mx-auto leading-relaxed"
          >
            La plataforma de deportes más completa de Colombia.
            <br className="hidden md:block" />
            Pádel, tenis, fútbol y más — a un clic.
          </motion.p>

          {/* CTA Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Link
              href="/reservar"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-sp-gold text-sp-dark font-sans font-medium hover:bg-sp-gold/90 transition-all hover:scale-[1.02]"
            >
              Reserva tu cancha
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="ml-1">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link
              href="#como-funciona"
              className="inline-flex items-center px-6 py-3.5 rounded-full border border-white/30 text-white font-sans hover:bg-white/10 transition-colors"
            >
              Ver cómo funciona
            </Link>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 flex items-center justify-center gap-3"
          >
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-sp-dark bg-sp-stone flex items-center justify-center text-xs font-mono text-sp-muted"
                >
                  {i}
                </div>
              ))}
            </div>
            <span className="text-sm text-white/70">
              2.400+ reservas este mes
            </span>
          </motion.div>
        </div>

        {/* Peralta Signature */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="absolute bottom-24 right-4 md:bottom-32 md:right-10 hidden md:flex items-start gap-3"
        >
          <div className="w-12 h-12 rounded-full bg-sp-stone flex items-center justify-center text-sp-muted font-mono text-sm">
            CP
          </div>
          <div className="text-right">
            <p className="font-serif italic text-white text-sm">
              &ldquo;Lo construimos para Colombia.&rdquo;
            </p>
            <p className="text-sp-gold text-xs mt-1">— Coach Peralta</p>
            <div className="w-10 h-px bg-sp-gold mt-2 ml-auto" />
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center scroll-bounce"
        >
          <div className="w-px h-10 bg-sp-gold/50" />
          <span className="mt-2 font-mono text-[11px] text-sp-gold uppercase tracking-wider">
            Scroll
          </span>
        </motion.div>
      </div>
    </section>
  )
}
