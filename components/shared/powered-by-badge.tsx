'use client'

import { cn } from '@/lib/utils'

interface PoweredByBadgeProps {
  variant?: 'default' | 'light' | 'dark' | 'navbar-transparent' | 'navbar-solid'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function PoweredByBadge({
  variant = 'default',
  size = 'md',
  className,
}: PoweredByBadgeProps) {
  const sizeClasses = {
    sm: 'text-[10px] md:text-[11px]',
    md: 'text-[11px]',
    lg: 'text-xs',
  }

  return (
    <span
      className={cn(
        'font-sans font-medium uppercase tracking-[0.06em] block',
        sizeClasses[size],
        className
      )}
      style={{
        color: '#E31E24',
        textShadow: '0 0 12px rgba(227,30,36,0.5)',
      }}
    >
      Powered by Peralta Prime
    </span>
  )
}
