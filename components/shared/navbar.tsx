'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { NAV_LINKS } from '@/lib/constants'
import { PoweredByBadge } from './powered-by-badge'
import { LangToggle } from './lang-toggle'

interface NavbarProps {
  variant?: 'transparent' | 'solid'
}

export function Navbar({ variant = 'transparent' }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const showSolidBg = variant === 'solid' || isScrolled

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300'
        )}
        style={{
          // Mobile: always frosted dark glass
          // Desktop: transparent at top, solid after scroll
          background: showSolidBg 
            ? 'rgba(0, 0, 0, 0.82)' 
            : 'rgba(0, 0, 0, 0.82)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(227, 30, 36, 0.4)',
        }}
      >
        {/* Desktop transparent override */}
        <style jsx>{`
          @media (min-width: 769px) {
            header {
              background: ${showSolidBg ? 'rgba(0, 0, 0, 0.82)' : 'transparent'} !important;
              backdrop-filter: ${showSolidBg ? 'blur(12px)' : 'none'} !important;
              -webkit-backdrop-filter: ${showSolidBg ? 'blur(12px)' : 'none'} !important;
              border-bottom: ${showSolidBg ? '1px solid rgba(227, 30, 36, 0.4)' : 'none'} !important;
            }
          }
        `}</style>
        <nav className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-10">
          <div className="flex h-16 md:h-20 items-center justify-between">
            {/* Logo */}
            <Link 
              href="/" 
              className="flex flex-col relative"
              style={!showSolidBg ? {
                background: 'linear-gradient(to right, rgba(0,0,0,0.55) 0%, transparent 100%)',
                padding: '8px 16px 8px 0',
                marginLeft: '-8px',
                paddingLeft: '8px',
                borderRadius: '0 8px 8px 0',
              } : undefined}
            >
              <span
                className="font-sans text-[16px] md:text-[18px] font-medium transition-colors text-white"
              >
                SportsPrime
              </span>
              <PoweredByBadge
                size="sm"
                className="-mt-0.5"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-[15px] font-sans transition-colors',
                    pathname === link.href
                      ? 'text-[#E31E24]'
                      : 'text-white/90 hover:text-[#E31E24]'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right Section */}
            <div className="hidden lg:flex items-center gap-4">
              <LangToggle variant="light" />
              
              <Link
                href="/auth/login"
                className="text-sm font-sans px-4 py-2 rounded-lg border border-white/30 text-white hover:bg-white/10 transition-colors"
              >
                Iniciar sesión
              </Link>

              <Link
                href="/reservar"
                className="text-sm font-sans font-bold px-5 py-2.5 rounded-lg uppercase tracking-[0.04em] transition-all hover:scale-[1.02]"
                style={{
                  background: '#E31E24',
                  color: '#FFFFFF',
                  boxShadow: '0 4px 20px rgba(227,30,36,0.35)',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#B01019'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#E31E24'}
              >
                Reservar
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden relative w-10 h-10 flex items-center justify-center"
              aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              <div className="relative w-6 h-5">
                <span
                  className={cn(
                    'absolute left-0 block h-0.5 w-6 transition-all duration-300 bg-white',
                    isMobileMenuOpen
                      ? 'top-2 rotate-45'
                      : 'top-0'
                  )}
                />
                <span
                  className={cn(
                    'absolute left-0 top-2 block h-0.5 w-6 transition-all duration-300 bg-white',
                    isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                  )}
                />
                <span
                  className={cn(
                    'absolute left-0 block h-0.5 w-6 transition-all duration-300 bg-white',
                    isMobileMenuOpen
                      ? 'top-2 -rotate-45'
                      : 'top-4'
                  )}
                />
              </div>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
            style={{ background: '#0D0D0D' }}
          >
            <div className="flex flex-col h-full pt-24 px-6 pb-8">
              <nav className="flex flex-col gap-6">
                {NAV_LINKS.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        'block font-serif text-3xl transition-colors',
                        pathname === link.href
                          ? 'text-[#E31E24]'
                          : 'text-white hover:text-[#E31E24]'
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto flex flex-col gap-4">
                <LangToggle variant="light" />
                
                <Link
                  href="/auth/login"
                  className="text-center py-3 rounded-lg border border-white/30 text-white font-sans"
                >
                  Iniciar sesión
                </Link>

                <Link
                  href="/reservar"
                  className="text-center py-3 rounded-lg font-sans font-bold uppercase tracking-[0.04em]"
                  style={{
                    background: '#E31E24',
                    color: '#FFFFFF',
                    boxShadow: '0 4px 20px rgba(227,30,36,0.35)',
                  }}
                >
                  Reservar
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
