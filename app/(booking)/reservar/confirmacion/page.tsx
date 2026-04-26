"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Check, Calendar, Clock, MapPin, Download, Share2, Copy, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useBookingStore, selectBookingData } from "@/lib/stores/booking-store"
import { formatCOP, formatDateCO, formatTime, generateBookingRef } from "@/lib/utils"
import { PoweredByBadge } from "@/components/shared/powered-by-badge"
import { SportIcon } from "@/components/shared/sport-icon"
import { toast } from "sonner"
import { Spinner } from "@/components/ui/spinner"

export default function ConfirmationPage() {
  const router = useRouter()
  const reset = useBookingStore((state) => state.reset)
  const booking = useBookingStore(selectBookingData)
  const [bookingRef] = useState(() => generateBookingRef())
  const [copied, setCopied] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)

  // Wait for hydration before checking store values
  useEffect(() => {
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    if (isHydrated && (!booking?.courtId || !booking?.date || !booking?.timeSlot)) {
      router.push("/reservar")
    }
  }, [booking, router, isHydrated])

  const handleCopyRef = () => {
    navigator.clipboard.writeText(bookingRef)
    setCopied(true)
    toast.success("Código copiado al portapapeles")
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = async () => {
    if (!booking?.date || !booking?.timeSlot) return
    const shareData = {
      title: "Mi Reserva SportsPrime",
      text: `Reserva confirmada: ${booking.sport} el ${formatDateCO(booking.date)} a las ${formatTime(booking.timeSlot)}`,
      url: window.location.href,
    }
    
    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch {
        // User cancelled share
      }
    } else {
      handleCopyRef()
    }
  }

  const handleWhatsApp = () => {
    if (!booking?.date || !booking?.timeSlot) return
    const message = encodeURIComponent(
      `Reserva confirmada en SportsPrime!\n\nDeporte: ${booking.sport}\nFecha: ${formatDateCO(booking.date)}\nHora: ${formatTime(booking.timeSlot)}\nCodigo: ${bookingRef}\n\nNos vemos en la cancha!`
    )
    window.open(`https://wa.me/?text=${message}`, "_blank")
  }

  const handleNewBooking = () => {
    reset()
    router.push("/reservar")
  }

  // Show loading state during SSR and hydration
  if (!isHydrated || !booking?.courtId) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream">
        <Spinner className="h-8 w-8 text-forest" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Success Animation */}
      <div className="relative overflow-hidden bg-forest py-16">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gold"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            <Check className="h-12 w-12 text-forest" strokeWidth={3} />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-center"
        >
          <h1 className="font-display text-3xl font-bold text-cream md:text-4xl">
            ¡Reserva Confirmada!
          </h1>
          <p className="mt-2 text-cream/80">
            Tu cancha está lista. Nos vemos pronto.
          </p>
        </motion.div>

        {/* Confetti effect */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                opacity: 1, 
                y: -20, 
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 400),
                rotate: 0 
              }}
              animate={{ 
                opacity: 0, 
                y: 300, 
                rotate: 360 
              }}
              transition={{ 
                duration: 2 + Math.random() * 2, 
                delay: Math.random() * 0.5,
                ease: "easeOut"
              }}
              className={`absolute h-3 w-3 ${
                i % 3 === 0 ? "bg-gold" : i % 3 === 1 ? "bg-cream" : "bg-gold/60"
              }`}
              style={{
                borderRadius: i % 2 === 0 ? "50%" : "0",
              }}
            />
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 py-8">
        {/* Booking Reference */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="border-2 border-gold bg-cream">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-forest/60">Código de Reserva</p>
                  <p className="font-mono text-2xl font-bold tracking-wider text-forest">
                    {bookingRef}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleCopyRef}
                  className="border-forest/20 text-forest hover:bg-forest hover:text-cream"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <p className="mt-2 text-xs text-forest/60">
                Muestra este código al llegar a la cancha
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Booking Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-6"
        >
          <Card>
            <CardContent className="p-6">
              <h2 className="font-display text-xl font-semibold text-forest">
                Detalles de la Reserva
              </h2>

              <div className="mt-4 space-y-4">
                {/* Sport & Court */}
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-forest/10">
                    <SportIcon sport={booking.sport || "padel"} className="h-5 w-5 text-forest" />
                  </div>
                  <div>
                    <p className="font-medium text-forest">{booking.sport}</p>
                    <p className="text-sm text-muted-foreground">{booking.courtName}</p>
                  </div>
                </div>

                {/* Date */}
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-forest/10">
                    <Calendar className="h-5 w-5 text-forest" />
                  </div>
                  <div>
                    <p className="font-medium text-forest">
                      {booking.date ? formatDateCO(booking.date) : ""}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {booking.date ? new Date(booking.date).toLocaleDateString("es-CO", { 
                        weekday: "long" 
                      }) : ""}
                    </p>
                  </div>
                </div>

                {/* Time */}
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-forest/10">
                    <Clock className="h-5 w-5 text-forest" />
                  </div>
                  <div>
                    <p className="font-medium text-forest">
                      {booking.timeSlot ? formatTime(booking.timeSlot) : ""}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {booking.duration} minutos de juego
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-forest/10">
                    <MapPin className="h-5 w-5 text-forest" />
                  </div>
                  <div>
                    <p className="font-medium text-forest">Club Deportivo El Campín</p>
                    <p className="text-sm text-muted-foreground">
                      Cra 30 #57-60, Bogotá
                    </p>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              {/* Price Summary */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatCOP(booking.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">IVA (19%)</span>
                  <span>{formatCOP(booking.iva)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-semibold">
                  <span>Total Pagado</span>
                  <span className="text-forest">{formatCOP(booking.total)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-6 grid grid-cols-3 gap-3"
        >
          <Button
            variant="outline"
            className="flex-col gap-1 py-6 border-forest/20 text-forest hover:bg-forest hover:text-cream"
            onClick={handleShare}
          >
            <Share2 className="h-5 w-5" />
            <span className="text-xs">Compartir</span>
          </Button>
          <Button
            variant="outline"
            className="flex-col gap-1 py-6 border-forest/20 text-forest hover:bg-forest hover:text-cream"
            onClick={handleWhatsApp}
          >
            <MessageCircle className="h-5 w-5" />
            <span className="text-xs">WhatsApp</span>
          </Button>
          <Button
            variant="outline"
            className="flex-col gap-1 py-6 border-forest/20 text-forest hover:bg-forest hover:text-cream"
          >
            <Download className="h-5 w-5" />
            <span className="text-xs">Descargar</span>
          </Button>
        </motion.div>

        {/* Calendar Add */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-6"
        >
          <Button
            variant="outline"
            className="w-full border-forest/20 text-forest hover:bg-forest hover:text-cream"
          >
            <Calendar className="mr-2 h-4 w-4" />
            Agregar a mi calendario
          </Button>
        </motion.div>

        {/* New Booking */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-4"
        >
          <Button
            onClick={handleNewBooking}
            className="w-full bg-gold text-forest hover:bg-gold/90"
          >
            Hacer otra reserva
          </Button>
        </motion.div>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-6 text-center"
        >
          <Link
            href="/"
            className="text-sm text-forest/60 underline-offset-4 hover:text-forest hover:underline"
          >
            Volver al inicio
          </Link>
        </motion.div>

        {/* Powered by Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="mt-8 flex justify-center"
        >
          <PoweredByBadge variant="dark" />
        </motion.div>
      </div>
    </div>
  )
}
