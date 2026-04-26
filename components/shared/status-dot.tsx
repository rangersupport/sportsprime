'use client'

import { cn } from '@/lib/utils'
import type { CourtStatus } from '@/lib/types'

interface StatusDotProps {
  status: CourtStatus
  showLabel?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const statusConfig: Record<
  CourtStatus,
  { color: string; label: string; pulse: boolean }
> = {
  available: {
    color: 'bg-sp-success',
    label: 'Disponible',
    pulse: true,
  },
  ending_soon: {
    color: 'bg-sp-warning',
    label: 'Terminando',
    pulse: true,
  },
  occupied: {
    color: 'bg-sp-danger',
    label: 'Ocupada',
    pulse: false,
  },
  maintenance: {
    color: 'bg-sp-muted',
    label: 'Mantenimiento',
    pulse: false,
  },
}

export function StatusDot({
  status,
  showLabel = false,
  size = 'md',
  className,
}: StatusDotProps) {
  const config = statusConfig[status]

  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
  }

  return (
    <span className={cn('inline-flex items-center gap-1.5', className)}>
      <span className="relative flex">
        <span
          className={cn(
            'rounded-full',
            sizeClasses[size],
            config.color,
            config.pulse && 'status-pulse'
          )}
        />
        {config.pulse && (
          <span
            className={cn(
              'absolute inset-0 rounded-full opacity-40',
              sizeClasses[size],
              config.color,
              'animate-ping'
            )}
          />
        )}
      </span>
      {showLabel && (
        <span className="text-xs text-sp-muted">{config.label}</span>
      )}
    </span>
  )
}
