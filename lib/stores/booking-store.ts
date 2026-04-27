import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { SportType, Court, PaymentMethod } from '@/lib/types'
import { IVA_RATE } from '@/lib/constants'

export interface BookingData {
  sport: SportType | null
  courtId: string | null
  courtName: string | null
  date: string | null
  timeSlot: string | null
  duration: number
  numPlayers: number
  playerName: string
  playerPhone: string
  playerEmail: string
  notes: string
  subtotal: number
  iva: number
  total: number
}

interface BookingState {
  // Step 1: Sport & Court
  sport: SportType | null
  court: Court | null

  // Step 2: Date & Time
  date: string | null       // formatted for display (e.g. "27 abr. 2026")
  isoDate: string | null    // ISO format for DB (e.g. "2026-04-27")
  startTime: string | null
  duration: number // minutes
  
  // Step 3: Player Info
  numPlayers: number
  playerName: string
  playerPhone: string
  playerEmail: string
  notes: string
  
  // Step 4: Payment
  paymentMethod: PaymentMethod | null
  promoCode: string
  
  // Calculated
  subtotal: number
  iva: number
  total: number
  
  // Actions
  setSport: (sport: SportType) => void
  setCourt: (court: Court) => void
  setDate: (date: string, isoDate: string) => void
  setStartTime: (time: string) => void
  setDuration: (minutes: number) => void
  setNumPlayers: (num: number) => void
  setPlayerInfo: (info: { name: string; phone: string; email: string; notes?: string }) => void
  setPaymentMethod: (method: PaymentMethod) => void
  setPromoCode: (code: string) => void
  calculateTotal: () => void
  reset: () => void
}

const initialState = {
  sport: null,
  court: null,
  date: null,
  isoDate: null,
  startTime: null,
  duration: 60,
  numPlayers: 2,
  playerName: '',
  playerPhone: '+57',
  playerEmail: '',
  notes: '',
  paymentMethod: null,
  promoCode: '',
  subtotal: 0,
  iva: 0,
  total: 0,
}

export const useBookingStore = create<BookingState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setSport: (sport) => set({ sport }),
      
      setCourt: (court) => {
        set({ court, sport: court?.sport_type ?? null })
        get().calculateTotal()
      },
      
      setDate: (date, isoDate) => set({ date, isoDate }),
      
      setStartTime: (time) => set({ startTime: time }),
      
      setDuration: (minutes) => {
        set({ duration: minutes })
        get().calculateTotal()
      },
      
      setNumPlayers: (num) => set({ numPlayers: num }),
      
      setPlayerInfo: ({ name, phone, email, notes }) => {
        set({
          playerName: name,
          playerPhone: phone,
          playerEmail: email,
          notes: notes ?? '',
        })
      },
      
      setPaymentMethod: (method) => set({ paymentMethod: method }),
      
      setPromoCode: (code) => {
        set({ promoCode: code })
        get().calculateTotal()
      },
      
      calculateTotal: () => {
        const { court, duration } = get()
        if (!court) {
          set({ subtotal: 0, iva: 0, total: 0 })
          return
        }
        
        const hours = duration / 60
        const subtotal = (court?.price_per_hour ?? 0) * hours
        const iva = Math.round(subtotal * IVA_RATE)
        const total = subtotal + iva
        
        set({ subtotal, iva, total })
      },
      
      reset: () => set(initialState),
    }),
    {
      name: 'sportsprime-booking',
      partialize: (state) => ({
        sport: state.sport,
        court: state.court,
        date: state.date,
        isoDate: state.isoDate,
        startTime: state.startTime,
        duration: state.duration,
        numPlayers: state.numPlayers,
        playerName: state.playerName,
        playerPhone: state.playerPhone,
        playerEmail: state.playerEmail,
        notes: state.notes,
      }),
    }
  )
)

// Selector to get booking data for confirmation page
export function selectBookingData(state: BookingState): BookingData {
  return {
    sport: state.sport,
    courtId: state.court?.id ?? null,
    courtName: state.court?.name ?? null,
    date: state.date,
    timeSlot: state.startTime,
    duration: state.duration,
    numPlayers: state.numPlayers,
    playerName: state.playerName,
    playerPhone: state.playerPhone,
    playerEmail: state.playerEmail,
    notes: state.notes,
    subtotal: state.subtotal,
    iva: state.iva,
    total: state.total,
  }
}
