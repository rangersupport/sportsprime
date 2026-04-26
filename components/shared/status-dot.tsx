'use client'

import { cn } from '@/lib/utils'

type StatusType = 
  | 'available' 
  | 'ending_soon' 
  | 'occupied' 
  | 'maintenance'
  | 'confirmed'
  | 'pending'
  | 'cancelled'

interface StatusDotProps {
  status: StatusType
  showLabel?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const statusConfig: Record<
  StatusType,
  { color: string; label: string; pulse: boolean }
> = {
  // Court statuses
  available: {
    color: 'bg-emerald-500',
    label: 'Disponible',
    pulse: true,
  },
  ending_soon: {
    color: 'bg-amber-500',
    label: 'Terminando',
    pulse: true,
  },
  occupied: {
    color: 'bg-red-500',
    label: 'Ocupada',
    pulse: false,
  },
  maintenance: {
    color: 'bg-gray-400',
    label: 'Mantenimiento',
    pulse: false,
  },
  // Booking statuses
  confirmed: {
    color: 'bg-emerald-500',
    label: 'Confirmada',
    pulse: false,
  },
  pending: {
    color: 'bg-amber-500',
    label: 'Pendiente',
    pulse: true,
  },
  cancelled: {
    color: 'bg-red-500',
    label: 'Cancelada',
    pulse: false,
  },
}

export function StatusDot({
  status,
  showLabel = false,
  size = 'md',
  className,
}: StatusDotProps) {
  const config = statusConfig[status] ?? {
    color: 'bg-gray-400',
    label: status ?? 'Desconocido',
    pulse: false,
  }

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
