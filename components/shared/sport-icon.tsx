'use client'

import { cn } from '@/lib/utils'
import type { SportType } from '@/lib/types'

interface SportIconProps {
  sport: SportType
  className?: string
  size?: number
}

export function SportIcon({ sport, className, size = 24 }: SportIconProps) {
  const iconProps = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className: cn('shrink-0', className),
  }

  switch (sport) {
    case 'padel':
      return (
        <svg {...iconProps}>
          {/* Padel racket */}
          <ellipse cx="12" cy="9" rx="6" ry="7" />
          <line x1="12" y1="16" x2="12" y2="23" />
          <circle cx="9" cy="8" r="0.5" fill="currentColor" />
          <circle cx="12" cy="6" r="0.5" fill="currentColor" />
          <circle cx="15" cy="8" r="0.5" fill="currentColor" />
          <circle cx="10" cy="11" r="0.5" fill="currentColor" />
          <circle cx="14" cy="11" r="0.5" fill="currentColor" />
        </svg>
      )

    case 'tenis':
      return (
        <svg {...iconProps}>
          {/* Tennis racket */}
          <ellipse cx="12" cy="8" rx="5" ry="6" />
          <line x1="12" y1="14" x2="12" y2="23" />
          <path d="M7 8 Q12 4 17 8" />
          <path d="M7 8 Q12 12 17 8" />
          <line x1="12" y1="2" x2="12" y2="14" />
        </svg>
      )

    case 'futbol':
      return (
        <svg {...iconProps}>
          {/* Soccer ball */}
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2 L12 7 M22 12 L17 12 M12 22 L12 17 M2 12 L7 12" />
          <path d="M12 7 L9 10 L9 14 L12 17 L15 14 L15 10 Z" />
          <path d="M5.6 5.6 L9 10 M18.4 5.6 L15 10 M18.4 18.4 L15 14 M5.6 18.4 L9 14" />
        </svg>
      )

    case 'baloncesto':
      return (
        <svg {...iconProps}>
          {/* Basketball */}
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2 C8 8, 8 16, 12 22" />
          <path d="M12 2 C16 8, 16 16, 12 22" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <line x1="12" y1="2" x2="12" y2="22" />
        </svg>
      )

    case 'volleyball':
      return (
        <svg {...iconProps}>
          {/* Volleyball */}
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2 C8 6, 6 10, 7 14 C8 18, 12 22, 12 22" />
          <path d="M12 2 C16 6, 18 10, 17 14 C16 18, 12 22, 12 22" />
          <path d="M2 12 C6 10, 10 9, 12 12 C14 15, 18 14, 22 12" />
        </svg>
      )

    case 'futsal':
      return (
        <svg {...iconProps}>
          {/* Futsal ball - similar to soccer but smaller pentagon */}
          <circle cx="12" cy="12" r="10" />
          <polygon points="12,5 15,9 14,14 10,14 9,9" fill="currentColor" fillOpacity="0.3" />
          <path d="M12 5 L9 9 L10 14 L14 14 L15 9 Z" />
          <line x1="12" y1="2" x2="12" y2="5" />
          <line x1="9" y1="9" x2="3" y2="6" />
          <line x1="15" y1="9" x2="21" y2="6" />
          <line x1="10" y1="14" x2="5" y2="19" />
          <line x1="14" y1="14" x2="19" y2="19" />
        </svg>
      )

    case 'squash':
      return (
        <svg {...iconProps}>
          {/* Squash racket */}
          <ellipse cx="12" cy="9" rx="5" ry="6" />
          <line x1="12" y1="15" x2="12" y2="23" />
          <line x1="7" y1="9" x2="17" y2="9" />
          <line x1="12" y1="3" x2="12" y2="15" />
          <line x1="8" y1="5" x2="8" y2="13" />
          <line x1="16" y1="5" x2="16" y2="13" />
        </svg>
      )

    default:
      // Generic ball icon
      return (
        <svg {...iconProps}>
          <circle cx="12" cy="12" r="10" />
        </svg>
      )
  }
}

// Sport names mapping
export const sportNames: Record<SportType, string> = {
  padel: 'Pádel',
  tenis: 'Tenis',
  futbol: 'Fútbol',
  baloncesto: 'Baloncesto',
  volleyball: 'Volleyball',
  futsal: 'Futsal',
  squash: 'Squash',
}
