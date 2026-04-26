'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

interface LangToggleProps {
  variant?: 'light' | 'dark'
  className?: string
}

// [CC:I18N] next-intl. Default locale 'es-CO'. Fallback 'en-US'. Toggle changes locale without page reload.

export function LangToggle({ variant = 'dark', className }: LangToggleProps) {
  const [locale, setLocale] = useState<'es' | 'en'>('es')

  const handleToggle = () => {
    setLocale(locale === 'es' ? 'en' : 'es')
    // [CC:I18N] Here we would call next-intl's setLocale function
  }

  return (
    <button
      onClick={handleToggle}
      className={cn(
        'font-mono text-xs tracking-wider transition-colors',
        variant === 'light'
          ? 'text-white/70 hover:text-white'
          : 'text-sp-muted hover:text-sp-ink',
        className
      )}
      aria-label="Cambiar idioma"
    >
      <span className={cn(locale === 'es' && 'text-sp-gold')}>ES</span>
      <span className="mx-1">|</span>
      <span className={cn(locale === 'en' && 'text-sp-gold')}>EN</span>
    </button>
  )
}
