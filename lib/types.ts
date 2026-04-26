// SportsPrime Type Definitions

export type SportType =
  | 'padel'
  | 'tenis'
  | 'futbol'
  | 'baloncesto'
  | 'volleyball'
  | 'futsal'
  | 'squash'

export type UserRole = 'athlete' | 'club_admin' | 'coach' | 'super_admin'

export type BookingStatus =
  | 'pending'
  | 'confirmed'
  | 'in_progress'
  | 'completed'
  | 'cancelled'

export type PaymentMethod =
  | 'nequi'
  | 'daviplata'
  | 'pse'
  | 'efecty'
  | 'card'
  | 'cash'

export type PaymentStatus = 'pending' | 'approved' | 'declined' | 'refunded'

export type CourtStatus = 'available' | 'ending_soon' | 'occupied' | 'maintenance'

export type PlayerLevel = 'principiante' | 'intermedio' | 'avanzado'

export type RobotStatus =
  | 'idle'
  | 'moving'
  | 'serving'
  | 'error'
  | 'maintenance'

// Core Entities
export interface User {
  id: string
  email: string
  phone: string
  full_name: string
  avatar_url?: string
  role: UserRole
  city?: string
  favorite_sport?: SportType
  created_at: string
  updated_at: string
}

export interface Club {
  id: string
  name: string
  slug: string
  logo_url?: string
  cover_image_url?: string
  address: string
  city: string
  phone: string
  email: string
  description?: string
  amenities: string[]
  opening_hours: {
    [key: string]: { open: string; close: string }
  }
  plan: 'basic' | 'pro' | 'roboclub'
  owner_id: string
  created_at: string
}

export interface Court {
  id: string
  club_id: string
  name: string
  sport_type: SportType
  price_per_hour: number
  image_url?: string
  description?: string
  status: CourtStatus
  is_active: boolean
  created_at: string
}

export interface Booking {
  id: string
  ref_code: string
  court_id: string
  user_id: string
  date: string
  start_time: string
  duration_minutes: number
  num_players: number
  player_name: string
  player_phone: string
  player_email: string
  notes?: string
  subtotal: number
  iva: number
  total: number
  payment_method: PaymentMethod
  payment_status: PaymentStatus
  status: BookingStatus
  created_at: string
  updated_at: string
  // Relations
  court?: Court
  club?: Club
}

export interface CourtSession {
  id: string
  booking_id: string
  court_id: string
  start_time: string
  end_time: string
  actual_end_time?: string
  is_overtime: boolean
  overtime_minutes?: number
  overtime_charge?: number
  status: 'active' | 'completed' | 'cancelled'
  created_at: string
}

export interface Coach {
  id: string
  user_id: string
  display_name: string
  bio: string
  avatar_url?: string
  cover_image_url?: string
  sports: SportType[]
  city: string
  price_per_hour: number
  years_experience: number
  specialties: string[]
  achievements: string[]
  languages: string[]
  is_verified: boolean
  is_founder: boolean
  rating: number
  total_reviews: number
  created_at: string
}

export interface CoachReview {
  id: string
  coach_id: string
  user_id: string
  rating: number
  comment: string
  created_at: string
  user?: Pick<User, 'full_name' | 'avatar_url'>
}

export interface PlayerProfile {
  id: string
  user_id: string
  sports: SportType[]
  level: PlayerLevel
  city: string
  bio?: string
  availability: {
    [key: string]: string[] // day: time slots
  }
  is_looking_for_partner: boolean
  created_at: string
}

export interface PlayerMatch {
  id: string
  player1_id: string
  player2_id: string
  sport: SportType
  status: 'pending' | 'accepted' | 'declined'
  booking_link?: string
  created_at: string
}

export interface Tournament {
  id: string
  club_id: string
  name: string
  sport: SportType
  format: 'single_elimination' | 'double_elimination' | 'round_robin'
  start_date: string
  end_date: string
  registration_deadline: string
  max_participants: number
  entry_fee: number
  prize_description?: string
  rules?: string
  status: 'draft' | 'registration_open' | 'in_progress' | 'completed'
  bracket_data?: object
  created_at: string
}

export interface Transaction {
  id: string
  club_id: string
  booking_id?: string
  amount: number
  payment_method: PaymentMethod
  status: PaymentStatus
  wompi_reference?: string
  stripe_reference?: string
  created_at: string
}

export interface RobotOrder {
  id: string
  club_id: string
  court_id?: string
  items: {
    name: string
    quantity: number
    price: number
  }[]
  total: number
  status: 'pending' | 'preparing' | 'delivering' | 'completed' | 'cancelled'
  created_at: string
}

// Booking Flow State
export interface BookingFlowState {
  step: 1 | 2 | 3 | 4 | 5
  sport?: SportType
  court?: Court
  date?: string
  startTime?: string
  duration: number
  numPlayers: number
  playerName: string
  playerPhone: string
  playerEmail: string
  notes: string
  paymentMethod?: PaymentMethod
  promoCode?: string
  subtotal: number
  iva: number
  total: number
}

// API Response Types
export interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  per_page: number
  total_pages: number
}

// Component Props
export interface CourtCardProps {
  court: Court
  isSelected?: boolean
  onSelect?: (court: Court) => void
}

export interface TimeSlot {
  time: string
  available: boolean
  price?: number
}

export interface SportOption {
  id: SportType
  name: string
  icon: React.ReactNode
}
