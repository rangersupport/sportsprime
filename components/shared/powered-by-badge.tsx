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
    sm: 'text-[13px] font-medium',
    md: 'text-xs',
    lg: 'text-sm',
  }

  const variantClasses = {
    default: 'text-sp-gold',
    light: 'text-sp-gold',
    dark: 'text-sp-gold',
    'navbar-transparent': 'text-sp-gold',
    'navbar-solid': 'text-sp-gold',
  }

  // Text shadow for navbar transparent mode (over dark hero)
  const textShadowStyle = variant === 'navbar-transparent' 
    ? { textShadow: '0px 1px 8px rgba(0,0,0,0.8), 0px 0px 20px rgba(0,0,0,0.6)' }
    : {}

  return (
    <span
      className={cn(
        'font-serif italic tracking-tight',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      style={textShadowStyle}
    >
      Powered by Peralta Prime
    </span>
  )
}
