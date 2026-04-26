'use client'

import { cn, formatCOP, formatPrice } from '@/lib/utils'

interface PriceDisplayProps {
  amount: number
  showCOP?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: 'default' | 'gold' | 'green' | 'muted'
  perHour?: boolean
  className?: string
}

export function PriceDisplay({
  amount,
  showCOP = true,
  size = 'md',
  color = 'default',
  perHour = false,
  className,
}: PriceDisplayProps) {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
    xl: 'text-2xl',
  }

  const colorClasses = {
    default: 'text-sp-ink',
    gold: 'text-sp-gold',
    green: 'text-sp-green',
    muted: 'text-sp-muted',
  }

  const formatted = showCOP ? formatCOP(amount) : `$${formatPrice(amount)}`

  return (
    <span
      className={cn(
        'font-mono',
        sizeClasses[size],
        colorClasses[color],
        className
      )}
    >
      {formatted}
      {perHour && <span className="text-sp-muted text-sm">/hora</span>}
    </span>
  )
}
