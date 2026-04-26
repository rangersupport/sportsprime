"use client"

export const dynamic = 'force-dynamic'

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { 
  Star, 
  MapPin, 
  Calendar, 
  Clock, 
  Award, 
  Users,
  MessageCircle,
  Share2,
  Heart,
  ChevronLeft,
  ChevronRight,
  BadgeCheck,
  Play,
  Quote
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Navbar } from "@/components/shared/navbar"
import { Footer } from "@/components/shared/footer"
import { SportIcon } from "@/components/shared/sport-icon"
import { formatCOP, cn } from "@/lib/utils"

// Mock coach data (in production, fetch by slug)
const coach = {
  id: "1",
  name: "Carlos Peralta",
  slug: "carlos-peralta",
  photo: "/images/coach-1.jpg",
  sports: ["padel", "tenis"],
  specialties: ["Técnica de saque", "Estrategia de dobles", "Preparación mental", "Competición"],
  rating: 4.9,
  reviews: 127,
  hourlyRate: 150000,
  packageRate: 500000,
  packageHours: 5,
  location: "Bogotá, Chapinero",
  experience: "15 años",
  verified: true,
  students: 234,
  sessionsCompleted: 1847,
  responseTime: "< 2 horas",
  bio: "Ex-jugador profesional de pádel con más de 15 años de experiencia como entrenador. Certificado por la Federación Colombiana de Pádel y especialista en técnica avanzada y preparación para competición. Mi metodología se enfoca en el desarrollo integral del deportista, combinando fundamentos técnicos con estrategia táctica y fortaleza mental.",
  certifications: [
    "Certificación Federación Colombiana de Pádel (Nivel 3)",
    "Entrenador Nacional de Tenis (ITF)",
    "Preparador Físico Deportivo (Universidad del Bosque)",
    "Coach de Alto Rendimiento (ENARD Argentina)",
  ],
  achievements: [
    "Campeón Nacional de Pádel Masculino (2015)",
    "Subcampeón Sudamericano de Pádel (2014)",
    "Top 20 Ranking Nacional (2012-2018)",
  ],
  availability: [
    { day: "Lunes", slots: ["06:00", "07:00", "08:00", "17:00", "18:00", "19:00"] },
    { day: "Martes", slots: ["06:00", "07:00", "17:00", "18:00", "19:00", "20:00"] },
    { day: "Miércoles", slots: ["06:00", "07:00", "08:00", "17:00", "18:00"] },
    { day: "Jueves", slots: ["06:00", "07:00", "17:00", "18:00", "19:00", "20:00"] },
    { day: "Viernes", slots: ["06:00", "07:00", "08:00", "17:00", "18:00"] },
    { day: "Sábado", slots: ["08:00", "09:00", "10:00", "11:00"] },
  ],
}

const reviews = [
  {
    id: 1,
    author: "Juan Rodríguez",
    avatar: null,
    rating: 5,
    date: "Hace 2 semanas",
    comment: "Excelente entrenador. Carlos tiene una paciencia increíble y sabe explicar cada técnica de manera clara. Mi saque mejoró notablemente después de solo 5 sesiones.",
  },
  {
    id: 2,
    author: "María Fernanda López",
    avatar: null,
    rating: 5,
    date: "Hace 1 mes",
    comment: "Muy profesional y puntual. Las sesiones son intensas pero divertidas. Totalmente recomendado para cualquier nivel.",
  },
  {
    id: 3,
    author: "Andrés García",
    avatar: null,
    rating: 4,
    date: "Hace 1 mes",
    comment: "Buen entrenador con conocimiento técnico sólido. A veces las sesiones van un poco rápido para principiantes, pero en general muy satisfecho.",
  },
]

const ratingBreakdown = [
  { stars: 5, percentage: 85 },
  { stars: 4, percentage: 10 },
  { stars: 3, percentage: 3 },
  { stars: 2, percentage: 1 },
  { stars: 1, percentage: 1 },
]

export default function CoachProfilePage() {
  const params = useParams()
  const [selectedDay, setSelectedDay] = useState(0)
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [isSaved, setIsSaved] = useState(false)

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      {/* Breadcrumb */}
      <div className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/entrenadores" className="text-muted-foreground hover:text-forest">
              Entrenadores
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="text-forest font-medium">{coach.name}</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col gap-6 md:flex-row">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="h-32 w-32 rounded-2xl bg-forest/10 flex items-center justify-center">
                      <span className="text-4xl font-bold text-forest/40">
                        {coach.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    {coach.verified && (
                      <div className="absolute -bottom-2 -right-2 rounded-full bg-emerald-500 p-1.5">
                        <BadgeCheck className="h-5 w-5 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h1 className="font-display text-2xl font-bold text-forest md:text-3xl">
                          {coach.name}
                        </h1>
                        <p className="flex items-center gap-1 mt-1 text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          {coach.location}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="icon" 
                          variant="outline"
                          onClick={() => setIsSaved(!isSaved)}
                        >
                          <Heart className={cn(
                            "h-5 w-5",
                            isSaved && "fill-red-500 text-red-500"
                          )} />
                        </Button>
                        <Button size="icon" variant="outline">
                          <Share2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>

                    {/* Sports */}
                    <div className="mt-3 flex flex-wrap gap-2">
                      {coach.sports.map((sport) => (
                        <Badge key={sport} variant="secondary" className="gap-1 capitalize">
                          <SportIcon sport={sport} className="h-3 w-3" />
                          {sport}
                        </Badge>
                      ))}
                    </div>

                    {/* Rating */}
                    <div className="mt-4 flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={cn(
                              "h-5 w-5",
                              i < Math.floor(coach.rating) 
                                ? "fill-gold text-gold" 
                                : "text-muted-foreground/30"
                            )} 
                          />
                        ))}
                        <span className="ml-2 font-bold">{coach.rating}</span>
                        <span className="text-muted-foreground">({coach.reviews} reseñas)</span>
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="mt-4 flex flex-wrap gap-6">
                      <div className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-gold" />
                        <span className="text-sm">
                          <strong>{coach.experience}</strong> de experiencia
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-gold" />
                        <span className="text-sm">
                          <strong>{coach.students}</strong> alumnos
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-gold" />
                        <span className="text-sm">
                          <strong>{coach.sessionsCompleted}</strong> sesiones
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="w-full justify-start bg-white">
                <TabsTrigger value="about">Sobre mí</TabsTrigger>
                <TabsTrigger value="reviews">Reseñas</TabsTrigger>
                <TabsTrigger value="credentials">Credenciales</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="mt-4 space-y-6">
                {/* Bio */}
                <Card>
                  <CardContent className="p-6">
                    <h2 className="font-display text-xl font-semibold text-forest">
                      Acerca de {coach.name.split(' ')[0]}
                    </h2>
                    <p className="mt-4 leading-relaxed text-muted-foreground">
                      {coach.bio}
                    </p>

                    <Separator className="my-6" />

                    <h3 className="font-semibold text-forest">Especialidades</h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {coach.specialties.map((specialty) => (
                        <Badge key={specialty} variant="outline">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Video Introduction */}
                <Card>
                  <CardContent className="p-6">
                    <h2 className="font-display text-xl font-semibold text-forest">
                      Video de Presentación
                    </h2>
                    <div className="mt-4 aspect-video rounded-lg bg-forest/10 flex items-center justify-center">
                      <Button size="lg" className="gap-2 bg-forest text-cream">
                        <Play className="h-5 w-5" />
                        Ver video
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="mt-4 space-y-6">
                {/* Rating Summary */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-6 md:flex-row">
                      <div className="text-center md:text-left">
                        <div className="text-5xl font-bold text-forest">{coach.rating}</div>
                        <div className="mt-1 flex items-center justify-center gap-1 md:justify-start">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                          ))}
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {coach.reviews} reseñas
                        </p>
                      </div>
                      <div className="flex-1 space-y-2">
                        {ratingBreakdown.map(({ stars, percentage }) => (
                          <div key={stars} className="flex items-center gap-3">
                            <span className="w-3 text-sm">{stars}</span>
                            <Star className="h-4 w-4 fill-gold text-gold" />
                            <Progress value={percentage} className="flex-1 h-2" />
                            <span className="w-10 text-right text-sm text-muted-foreground">
                              {percentage}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Reviews List */}
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <Avatar>
                            <AvatarFallback className="bg-forest text-cream">
                              {review.author.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">{review.author}</p>
                                <p className="text-sm text-muted-foreground">{review.date}</p>
                              </div>
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={cn(
                                      "h-4 w-4",
                                      i < review.rating 
                                        ? "fill-gold text-gold" 
                                        : "text-muted-foreground/30"
                                    )} 
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="mt-3 text-muted-foreground">
                              {review.comment}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Button variant="outline" className="w-full">
                  Ver todas las reseñas
                </Button>
              </TabsContent>

              <TabsContent value="credentials" className="mt-4 space-y-6">
                {/* Certifications */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-gold" />
                      Certificaciones
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {coach.certifications.map((cert, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <BadgeCheck className="h-5 w-5 text-emerald-500 mt-0.5" />
                          <span>{cert}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Achievements */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-gold" />
                      Logros Deportivos
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {coach.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="h-2 w-2 rounded-full bg-gold mt-2" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-3xl font-bold text-forest">
                      {formatCOP(coach.hourlyRate, false)}
                    </span>
                    <span className="text-muted-foreground">/hora</span>
                  </div>
                  <Badge variant="outline" className="border-gold text-gold">
                    Pack: {formatCOP(coach.packageRate, false)}/{coach.packageHours}h
                  </Badge>
                </div>

                <Separator className="my-4" />

                {/* Availability */}
                <div>
                  <p className="font-medium text-forest mb-3">Disponibilidad</p>
                  
                  {/* Day selector */}
                  <div className="flex items-center gap-2 mb-4">
                    <Button 
                      size="icon" 
                      variant="ghost"
                      onClick={() => setSelectedDay(Math.max(0, selectedDay - 1))}
                      disabled={selectedDay === 0}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <div className="flex-1 text-center">
                      <p className="font-medium">{coach.availability[selectedDay].day}</p>
                    </div>
                    <Button 
                      size="icon" 
                      variant="ghost"
                      onClick={() => setSelectedDay(Math.min(coach.availability.length - 1, selectedDay + 1))}
                      disabled={selectedDay === coach.availability.length - 1}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Time slots */}
                  <div className="grid grid-cols-3 gap-2">
                    {coach.availability[selectedDay].slots.map((slot) => (
                      <Button
                        key={slot}
                        variant={selectedSlot === slot ? "default" : "outline"}
                        size="sm"
                        className={cn(
                          selectedSlot === slot && "bg-forest text-cream"
                        )}
                        onClick={() => setSelectedSlot(slot)}
                      >
                        {slot}
                      </Button>
                    ))}
                  </div>
                </div>

                <Separator className="my-4" />

                <Button 
                  className="w-full bg-gold text-forest hover:bg-gold/90"
                  size="lg"
                  disabled={!selectedSlot}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Reservar sesión
                </Button>

                <Button variant="outline" className="w-full mt-2" size="lg">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Enviar mensaje
                </Button>

                <p className="mt-4 text-center text-xs text-muted-foreground">
                  Responde en {coach.responseTime}
                </p>
              </CardContent>
            </Card>

            {/* Quote */}
            <Card className="bg-forest text-cream">
              <CardContent className="p-6">
                <Quote className="h-8 w-8 text-gold mb-2" />
                <p className="italic text-cream/90">
                  {`"El éxito en el deporte no es solo talento, es dedicación constante 
                  y la voluntad de mejorar cada día."`}
                </p>
                <p className="mt-3 text-sm text-gold">— {coach.name}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
