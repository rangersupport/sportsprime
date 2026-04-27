'use client'

import { cn } from '@/lib/utils'

interface GoldBadgeProps {
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function GoldBadge({ children, size = 'md', className }: GoldBadgeProps) {
  const sizeClasses = {
    sm: 'text-[10px] px-1.5 py-0.5',
    md: 'text-xs px-2 py-0.5',
    lg: 'text-sm px-3 py-1',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium uppercase tracking-wider',
        sizeClasses[size],
        className
      )}
      style={{
        background: '#E31E24',
        color: '#FFFFFF',
      }}
    >
      {children}
    </span>
  )
}
