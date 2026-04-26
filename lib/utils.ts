import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { IVA_RATE } from './constants'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format price in Colombian Pesos (COP)
 * Uses period as thousand separator: $25.000 COP
 */
export function formatCOP(amount: number, showCurrency = true): string {
  const formatted = new Intl.NumberFormat('es-CO', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
  return showCurrency ? `$${formatted} COP` : `$${formatted}`
}

/**
 * Format price without COP suffix for compact display
 */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('es-CO', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

/**
 * Calculate IVA (19%) and total from subtotal
 */
export function calculatePricing(subtotal: number): {
  subtotal: number
  iva: number
  total: number
} {
  const iva = Math.round(subtotal * IVA_RATE)
  return {
    subtotal,
    iva,
    total: subtotal + iva,
  }
}

/**
 * Format date in Colombian format: DD/MM/AAAA
 */
export function formatDateCO(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('es-CO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

/**
 * Format time in 12h format with AM/PM
 */
export function formatTime(time: string): string {
  const [hours, minutes] = time.split(':').map(Number)
  const period = hours >= 12 ? 'PM' : 'AM'
  const displayHours = hours % 12 || 12
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`
}

/**
 * Format duration in human readable format
 */
export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  if (mins === 0) return `${hours} hora${hours > 1 ? 's' : ''}`
  return `${hours}h ${mins}min`
}

/**
 * Generate booking reference code: SP-[YEAR]-[RANDOM6]
 */
export function generateBookingRef(): string {
  const year = new Date().getFullYear()
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `SP-${year}-${random}`
}

/**
 * Format phone number with Colombian prefix
 */
export function formatPhoneCO(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.startsWith('57')) {
    return `+${cleaned}`
  }
  return `+57${cleaned}`
}

/**
 * Calculate time remaining as percentage
 */
export function getTimeRemainingPercentage(
  startTime: Date,
  endTime: Date,
  now: Date = new Date()
): number {
  const total = endTime.getTime() - startTime.getTime()
  const remaining = endTime.getTime() - now.getTime()
  return Math.max(0, Math.min(100, (remaining / total) * 100))
}

/**
 * Get urgency level based on remaining percentage
 */
export function getUrgencyLevel(
  percentage: number
): 'calm' | 'aware' | 'alert' | 'urgent' | 'overtime' {
  if (percentage <= 0) return 'overtime'
  if (percentage < 10) return 'urgent'
  if (percentage < 25) return 'alert'
  if (percentage < 50) return 'aware'
  return 'calm'
}

/**
 * Format countdown time: MM:SS or HH:MM:SS
 */
export function formatCountdown(seconds: number): string {
  if (seconds < 0) {
    const absSeconds = Math.abs(seconds)
    const mins = Math.floor(absSeconds / 60)
    const secs = absSeconds % 60
    return `-${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const hours = Math.floor(seconds / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  if (hours > 0) {
    return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length) + '...'
}

/**
 * Slugify text for URLs
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}
