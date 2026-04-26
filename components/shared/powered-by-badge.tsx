'use client'

import { cn } from '@/lib/utils'

interface PoweredByBadgeProps {
  variant?: 'default' | 'light' | 'dark'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function PoweredByBadge({
  variant = 'default',
  size = 'md',
  className,
}: PoweredByBadgeProps) {
  const sizeClasses = {
    sm: 'text-[10px]',
    md: 'text-xs',
    lg: 'text-sm',
  }

  const variantClasses = {
    default: 'text-sp-gold',
    light: 'text-sp-gold',
    dark: 'text-sp-gold',
  }

  return (
    <span
      className={cn(
        'font-mono italic tracking-tight',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      Powered by Peralta
    </span>
  )
}
