"use client"

export const dynamic = 'force-dynamic'

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  Award, 
  Users,
  Calendar,
  ChevronDown,
  BadgeCheck,
  Clock
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Navbar } from "@/components/shared/navbar"
import { Footer } from "@/components/shared/footer"
import { SportIcon } from "@/components/shared/sport-icon"
import { formatCOP, cn } from "@/lib/utils"

// Mock coach data
const coaches = [
  {
    id: "1",
    name: "Carlos Peralta",
    slug: "carlos-peralta",
    photo: "/images/coach-1.jpg",
    sports: ["padel", "tenis"],
    specialties: ["Técnica de saque", "Estrategia de dobles"],
    rating: 4.9,
    reviews: 127,
    hourlyRate: 150000,
    location: "Bogotá, Chapinero",
    experience: "15 años",
    verified: true,
    featured: true,
    availability: "Disponible hoy",
    students: 234,
    bio: "Ex-jugador profesional de pádel. Certificado por la Federación Colombiana.",
  },
  {
    id: "2",
    name: "María González",
    slug: "maria-gonzalez",
    photo: "/images/coach-2.jpg",
    sports: ["tenis"],
    specialties: ["Tenis juvenil", "Preparación física"],
    rating: 4.8,
    reviews: 89,
    hourlyRate: 120000,
    location: "Bogotá, Usaquén",
    experience: "10 años",
    verified: true,
    featured: false,
    availability: "Disponible mañana",
    students: 156,
    bio: "Especialista en desarrollo de jóvenes talentos. Metodología progresiva.",
  },
  {
    id: "3",
    name: "Andrés Restrepo",
    slug: "andres-restrepo",
    photo: "/images/coach-3.jpg",
    sports: ["futbol"],
    specialties: ["Fútbol sala", "Táctica"],
    rating: 4.7,
    reviews: 64,
    hourlyRate: 100000,
    location: "Medellín, El Poblado",
    experience: "8 años",
    verified: true,
    featured: false,
    availability: "Disponible hoy",
    students: 198,
    bio: "Ex-jugador de fútbol sala profesional. Énfasis en trabajo táctico.",
  },
  {
    id: "4",
    name: "Valentina Ochoa",
    slug: "valentina-ochoa",
    photo: "/images/coach-4.jpg",
    sports: ["padel"],
    specialties: ["Pádel femenino", "Competición"],
    rating: 4.9,
    reviews: 112,
    hourlyRate: 140000,
    location: "Cali, Ciudad Jardín",
    experience: "12 años",
    verified: true,
    featured: true,
    availability: "Disponible hoy",
    students: 187,
    bio: "Campeona nacional de pádel. Preparación para torneos y competición.",
  },
  {
    id: "5",
    name: "Diego Martínez",
    slug: "diego-martinez",
    photo: "/images/coach-5.jpg",
    sports: ["tenis", "padel"],
    specialties: ["Iniciación", "Adultos principiantes"],
    rating: 4.6,
    reviews: 45,
    hourlyRate: 90000,
    location: "Bogotá, Suba",
    experience: "6 años",
    verified: false,
    featured: false,
    availability: "Disponible esta semana",
    students: 89,
    bio: "Entrenador paciente especializado en adultos que comienzan en el deporte.",
  },
  {
    id: "6",
    name: "Laura Jiménez",
    slug: "laura-jimenez",
    photo: "/images/coach-6.jpg",
    sports: ["squash", "padel"],
    specialties: ["Squash profesional", "Condicionamiento"],
    rating: 4.8,
    reviews: 78,
    hourlyRate: 130000,
    location: "Barranquilla, Alto Prado",
    experience: "9 años",
    verified: true,
    featured: false,
    availability: "Disponible hoy",
    students: 145,
    bio: "Representante nacional de squash. Enfoque en rendimiento deportivo.",
  },
]

const sportFilters = [
  { value: "all", label: "Todos los deportes" },
  { value: "padel", label: "Pádel" },
  { value: "tenis", label: "Tenis" },
  { value: "futbol", label: "Fútbol" },
  { value: "squash", label: "Squash" },
]

function CoachCard({ coach, index }: { coach: typeof coaches[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Link href={`/entrenadores/${coach.slug}`}>
        <Card className={cn(
          "group overflow-hidden transition-all hover:shadow-lg",
          coach.featured && "ring-2 ring-gold"
        )}>
          {coach.featured && (
            <div className="bg-gold px-3 py-1 text-center text-xs font-medium text-forest">
              Entrenador Destacado
            </div>
          )}
          <CardContent className="p-0">
            {/* Photo */}
            <div className="relative aspect-[4/3] overflow-hidden bg-forest/10">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-24 w-24 rounded-full bg-forest/20 flex items-center justify-center">
                  <span className="text-3xl font-bold text-forest/40">
                    {coach.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              </div>
              {/* Sports badges */}
              <div className="absolute bottom-2 left-2 flex gap-1">
                {coach.sports.map((sport) => (
                  <div 
                    key={sport}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-cream shadow"
                  >
                    <SportIcon sport={sport} className="h-4 w-4 text-forest" />
                  </div>
                ))}
              </div>
              {/* Verified badge */}
              {coach.verified && (
                <div className="absolute right-2 top-2">
                  <Badge className="gap-1 bg-emerald-500 text-white">
                    <BadgeCheck className="h-3 w-3" />
                    Verificado
                  </Badge>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display text-lg font-semibold text-forest group-hover:text-gold transition-colors">
                    {coach.name}
                  </h3>
                  <p className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {coach.location}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-gold text-gold" />
                  <span className="font-medium">{coach.rating}</span>
                  <span className="text-sm text-muted-foreground">({coach.reviews})</span>
                </div>
              </div>

              {/* Specialties */}
              <div className="mt-3 flex flex-wrap gap-1">
                {coach.specialties.slice(0, 2).map((specialty) => (
                  <Badge key={specialty} variant="secondary" className="text-xs">
                    {specialty}
                  </Badge>
                ))}
              </div>

              {/* Stats */}
              <div className="mt-4 grid grid-cols-3 gap-2 border-t pt-4">
                <div className="text-center">
                  <p className="text-lg font-bold text-forest">{coach.experience}</p>
                  <p className="text-xs text-muted-foreground">Experiencia</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-forest">{coach.students}</p>
                  <p className="text-xs text-muted-foreground">Alumnos</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-forest">{coach.reviews}</p>
                  <p className="text-xs text-muted-foreground">Reseñas</p>
                </div>
              </div>

              {/* Price & Availability */}
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-xl font-bold text-forest">
                    {formatCOP(coach.hourlyRate, false)}
                  </p>
                  <p className="text-xs text-muted-foreground">por hora</p>
                </div>
                <Badge 
                  variant="outline" 
                  className={cn(
                    "gap-1",
                    coach.availability === "Disponible hoy" 
                      ? "border-emerald-500 text-emerald-600" 
                      : "border-gold text-gold"
                  )}
                >
                  <Clock className="h-3 w-3" />
                  {coach.availability}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}

export default function CoachMarketplace() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sportFilter, setSportFilter] = useState("all")
  const [sortBy, setSortBy] = useState("featured")
  const [priceRange, setPriceRange] = useState<string[]>([])

  const filteredCoaches = coaches
    .filter(coach => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return (
          coach.name.toLowerCase().includes(query) ||
          coach.location.toLowerCase().includes(query) ||
          coach.specialties.some(s => s.toLowerCase().includes(query))
        )
      }
      return true
    })
    .filter(coach => {
      if (sportFilter === "all") return true
      return coach.sports.includes(sportFilter)
    })
    .sort((a, b) => {
      if (sortBy === "featured") {
        if (a.featured && !b.featured) return -1
        if (!a.featured && b.featured) return 1
        return b.rating - a.rating
      }
      if (sortBy === "rating") return b.rating - a.rating
      if (sortBy === "price-low") return a.hourlyRate - b.hourlyRate
      if (sortBy === "price-high") return b.hourlyRate - a.hourlyRate
      if (sortBy === "reviews") return b.reviews - a.reviews
      return 0
    })

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-forest py-16">
        <div className="mx-auto max-w-7xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Badge className="mb-4 bg-gold/20 text-gold border-gold/30">
              Peralta Prime
            </Badge>
            <h1 className="font-display text-4xl font-bold text-cream md:text-5xl">
              Encuentra tu Entrenador Ideal
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-cream/80">
              Conecta con los mejores entrenadores certificados de Colombia. 
              Mejora tu técnica, estrategia y rendimiento deportivo.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-8 max-w-2xl"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre, ubicación o especialidad..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-14 pl-12 pr-4 text-lg bg-cream border-none"
              />
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-8"
          >
            <div className="flex items-center gap-2 text-cream/80">
              <Users className="h-5 w-5 text-gold" />
              <span><strong className="text-cream">150+</strong> entrenadores</span>
            </div>
            <div className="flex items-center gap-2 text-cream/80">
              <Award className="h-5 w-5 text-gold" />
              <span><strong className="text-cream">95%</strong> certificados</span>
            </div>
            <div className="flex items-center gap-2 text-cream/80">
              <Star className="h-5 w-5 text-gold" />
              <span><strong className="text-cream">4.8</strong> rating promedio</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters & Results */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4">
          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border bg-white p-4">
            <div className="flex flex-wrap items-center gap-3">
              {/* Sport Filter */}
              <Select value={sportFilter} onValueChange={setSportFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Deporte" />
                </SelectTrigger>
                <SelectContent>
                  {sportFilters.map((sport) => (
                    <SelectItem key={sport.value} value={sport.value}>
                      {sport.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Price Range Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Precio
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuCheckboxItem
                    checked={priceRange.includes("0-100000")}
                    onCheckedChange={(checked) => {
                      if (checked) setPriceRange([...priceRange, "0-100000"])
                      else setPriceRange(priceRange.filter(p => p !== "0-100000"))
                    }}
                  >
                    Hasta $100.000/hora
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={priceRange.includes("100000-150000")}
                    onCheckedChange={(checked) => {
                      if (checked) setPriceRange([...priceRange, "100000-150000"])
                      else setPriceRange(priceRange.filter(p => p !== "100000-150000"))
                    }}
                  >
                    $100.000 - $150.000/hora
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={priceRange.includes("150000+")}
                    onCheckedChange={(checked) => {
                      if (checked) setPriceRange([...priceRange, "150000+"])
                      else setPriceRange(priceRange.filter(p => p !== "150000+"))
                    }}
                  >
                    Más de $150.000/hora
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Location Filter */}
              <Button variant="outline" className="gap-2">
                <MapPin className="h-4 w-4" />
                Ubicación
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Ordenar por:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Destacados</SelectItem>
                  <SelectItem value="rating">Mejor valorados</SelectItem>
                  <SelectItem value="reviews">Más reseñas</SelectItem>
                  <SelectItem value="price-low">Precio: menor a mayor</SelectItem>
                  <SelectItem value="price-high">Precio: mayor a menor</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-6 flex items-center justify-between">
            <p className="text-muted-foreground">
              Mostrando <strong className="text-forest">{filteredCoaches.length}</strong> entrenadores
            </p>
          </div>

          {/* Coach Grid */}
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCoaches.map((coach, index) => (
              <CoachCard key={coach.id} coach={coach} index={index} />
            ))}
          </div>

          {/* Load More */}
          {filteredCoaches.length > 0 && (
            <div className="mt-8 text-center">
              <Button variant="outline" size="lg">
                Cargar más entrenadores
              </Button>
            </div>
          )}

          {/* Empty State */}
          {filteredCoaches.length === 0 && (
            <div className="py-16 text-center">
              <Users className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <h3 className="mt-4 font-display text-xl font-semibold text-forest">
                No encontramos entrenadores
              </h3>
              <p className="mt-2 text-muted-foreground">
                Intenta con otros filtros o términos de búsqueda
              </p>
              <Button 
                className="mt-4"
                onClick={() => {
                  setSearchQuery("")
                  setSportFilter("all")
                  setPriceRange([])
                }}
              >
                Limpiar filtros
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-forest py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="font-display text-3xl font-bold text-cream md:text-4xl">
            ¿Eres entrenador profesional?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-cream/80">
            Únete a la red de entrenadores de SportsPrime y conecta con miles de 
            deportistas en Colombia. Gestiona tu agenda, pagos y clientes en un solo lugar.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" className="bg-gold text-forest hover:bg-gold/90">
              Aplicar como entrenador
            </Button>
            <Button size="lg" variant="outline" className="border-cream/30 text-cream hover:bg-cream/10">
              Más información
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
