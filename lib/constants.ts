// SportsPrime Constants

import type { SportType } from './types'

// Sports Configuration
export const SPORTS: { id: SportType; name: string; namePlural: string }[] = [
  { id: 'padel', name: 'Pádel', namePlural: 'Pádel' },
  { id: 'tenis', name: 'Tenis', namePlural: 'Tenis' },
  { id: 'futbol', name: 'Fútbol', namePlural: 'Fútbol' },
  { id: 'baloncesto', name: 'Baloncesto', namePlural: 'Baloncesto' },
  { id: 'volleyball', name: 'Volleyball', namePlural: 'Volleyball' },
  { id: 'futsal', name: 'Futsal', namePlural: 'Futsal' },
  { id: 'squash', name: 'Squash', namePlural: 'Squash' },
]

// Colombian Cities
export const CITIES = [
  'Bogotá',
  'Medellín',
  'Cali',
  'Barranquilla',
  'Cartagena',
  'Cúcuta',
  'Bucaramanga',
  'Pereira',
  'Santa Marta',
  'Ibagué',
  'Pasto',
  'Manizales',
  'Neiva',
  'Villavicencio',
  'Armenia',
]

// PSE Banks for Payment
export const PSE_BANKS = [
  { code: 'bancolombia', name: 'Bancolombia' },
  { code: 'davivienda', name: 'Davivienda' },
  { code: 'bbva', name: 'BBVA Colombia' },
  { code: 'bogota', name: 'Banco de Bogotá' },
  { code: 'occidente', name: 'Banco de Occidente' },
  { code: 'popular', name: 'Banco Popular' },
  { code: 'avvillas', name: 'Banco AV Villas' },
  { code: 'scotiabank', name: 'Scotiabank Colpatria' },
  { code: 'itau', name: 'Itaú' },
  { code: 'gnb', name: 'GNB Sudameris' },
  { code: 'falabella', name: 'Banco Falabella' },
  { code: 'pichincha', name: 'Banco Pichincha' },
]

// Booking Duration Options (minutes)
export const DURATION_OPTIONS = [
  { value: 30, label: '30 min' },
  { value: 60, label: '1 hora' },
  { value: 90, label: '1.5 horas' },
  { value: 120, label: '2 horas' },
]

// Player Count Options
export const PLAYER_COUNT_OPTIONS = Array.from({ length: 12 }, (_, i) => i + 1)

// IVA Rate (Colombia)
export const IVA_RATE = 0.19

// Pricing (COP)
export const PRICING = {
  // Athlete
  athlete: {
    name: 'Deportista',
    monthlyFee: 0,
    bookingCommission: 0.03,
    features: [
      'Reserva en 3 clics',
      'Paga con Nequi, PSE o efectivo',
      'Encuentra compañeros de juego',
      'Accede a entrenadores verificados',
    ],
  },
  // Prime Membership
  prime: {
    name: 'SportsPrime Prime',
    monthlyFee: 15000,
    bookingCommission: 0,
    features: [
      'Reserva prioritaria',
      'Descuentos en coaches',
      'Match con jugadores',
      'Seguro deportivo básico',
    ],
  },
  // Club Pro
  clubPro: {
    name: 'Club Pro',
    monthlyFeeFrom: 150000,
    features: [
      'Panel admin completo',
      'Timer + POS físico',
      'Facturación automática',
      'White-label',
      'Analytics',
      'Torneos',
      'Soporte prioritario',
    ],
  },
  // RoboClub
  roboClub: {
    name: 'RoboClub',
    priceType: 'quote',
    features: [
      'Todo Club Pro',
      'Brazo robótico AR4',
      'Control desde app',
      'Dashboard robótico',
      'Instalación incluida',
    ],
  },
}

// Module Pricing (for /robotica page)
export const MODULE_PRICING = [
  {
    number: '01',
    name: 'Solo Software',
    priceRange: '$150.000 - $300.000 COP/mes',
    features: [
      'Reservas online',
      'Panel admin',
      'Timer en cancha',
      'Pagos Colombia',
      'App para jugadores',
    ],
    cta: 'Comenzar ahora',
    ctaLink: '/auth/registro',
  },
  {
    number: '02',
    name: 'Software + POS Físico',
    priceRange: '$500.000 - $900.000 COP/mes',
    features: [
      'Todo en Módulo 1',
      'Caja registradora digital',
      'Kiosco táctil 10"',
      'Lector QR entrada',
      'Datafono Wompi',
    ],
    cta: 'Ver demo POS',
    ctaLink: '/pos',
  },
  {
    number: '03',
    name: 'Robótica en Cancha',
    priceRange: 'Desde $2.000.000 COP instalación',
    badge: 'ÚNICO EN COLOMBIA',
    features: [
      'Todo en Módulos 1+2',
      'Brazo robótico AR4 6DOF',
      'Control desde app del cliente',
      'Dashboard robótico',
    ],
    cta: 'Solicitar cotización',
    ctaLink: '/contacto',
  },
  {
    number: '04',
    name: 'RoboServe Eventos',
    priceRange: 'Cotización por evento',
    badge: 'FIFA 2026 READY',
    features: [
      'Unidad móvil para eventos',
      'Robot brazo cocinero',
      'Kiosco QR pedidos',
      'Branding personalizable',
      'Soporte',
    ],
    cta: 'Hablar con el equipo',
    ctaLink: '/contacto',
  },
]

// FIFA 2026 Host Cities
export const FIFA_2026_CITIES = [
  'Miami',
  'Los Angeles',
  'Nueva York',
  'Dallas',
  'San Francisco',
  'Seattle',
  'Boston',
  'Philadelphia',
  'Kansas City',
  'Atlanta',
  'Houston',
]

// AR4 Robot Specs
export const AR4_SPECS = [
  '6DOF',
  '600mm reach',
  '1kg payload',
  'Python control',
  'Open source',
  'Arduino Teensy 4.1',
  'ROS compatible',
  'Modbus support',
  'Servo gripper available',
]

// Navigation Links
export const NAV_LINKS = [
  { href: '/reservar', label: 'Canchas' },
  { href: '/entrenadores', label: 'Entrenadores' },
  { href: '/torneos', label: 'Torneos' },
  { href: '/para-clubes', label: 'Para Clubes' },
  { href: '/robotica', label: 'Robótica' },
  { href: '/precios', label: 'Precios' },
]

// Footer Links
export const FOOTER_LINKS = {
  plataforma: [
    { href: '/reservar', label: 'Canchas' },
    { href: '/entrenadores', label: 'Entrenadores' },
    { href: '/torneos', label: 'Torneos' },
    { href: '/partidos', label: 'Partidos' },
    { href: '/precios', label: 'Precios' },
  ],
  tecnologia: [
    { href: '/robotica', label: 'Módulo Robótico' },
    { href: '/robotica/roboserve', label: 'RoboServe' },
    { href: '/pos', label: 'POS' },
    { href: '/para-clubes', label: 'Marca Blanca' },
    { href: '/api', label: 'API' },
  ],
  empresa: [
    { href: '/nosotros', label: 'Sobre Nosotros' },
    { href: '/peralta', label: 'Coach Peralta' },
    { href: '/prensa', label: 'Prensa' },
    { href: '/inversores', label: 'Inversores' },
    { href: '/contacto', label: 'Contacto' },
  ],
}

// Social Links
export const SOCIAL_LINKS = [
  { name: 'Instagram', href: 'https://instagram.com/sportsprime' },
  { name: 'LinkedIn', href: 'https://linkedin.com/company/sportsprime' },
  { name: 'YouTube', href: 'https://youtube.com/@sportsprime' },
  { name: 'WhatsApp', href: 'https://wa.me/573001234567' },
]

// Urgency Thresholds (percentage of time remaining)
export const URGENCY_THRESHOLDS = {
  calm: 50, // > 50%
  aware: 25, // 25-50%
  alert: 10, // 10-25%
  urgent: 0, // < 10%
}

// Timer Extension Options
export const TIMER_EXTENSIONS = [
  { minutes: 30, price: 12500, label: '+30 min' },
  { minutes: 60, price: 25000, label: '+1 hora' },
]

// Default Court Price per Hour (COP)
export const DEFAULT_COURT_PRICE = 25000
