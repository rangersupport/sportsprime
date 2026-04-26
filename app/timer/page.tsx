"use client"

export const dynamic = 'force-dynamic'

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, RotateCcw, Volume2, VolumeX, Maximize2, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatCountdown, getUrgencyLevel, cn } from "@/lib/utils"
import { PoweredByBadge } from "@/components/shared/powered-by-badge"
import { SportIcon } from "@/components/shared/sport-icon"

// Mock court data - in production this would come from WebSocket
const MOCK_COURTS = [
  { id: 1, name: "Cancha 1", sport: "padel", durationMins: 60 },
  { id: 2, name: "Cancha 2", sport: "tenis", durationMins: 90 },
  { id: 3, name: "Cancha 3", sport: "futbol", durationMins: 60 },
  { id: 4, name: "Cancha 4", sport: "padel", durationMins: 60 },
]

interface CourtTimer {
  id: number
  name: string
  sport: string
  totalSeconds: number
  remainingSeconds: number
  isActive: boolean
  playerName?: string
}

const urgencyColors = {
  calm: {
    bg: "bg-emerald-500",
    text: "text-emerald-500",
    glow: "shadow-emerald-500/50",
    border: "border-emerald-500",
  },
  aware: {
    bg: "bg-gold",
    text: "text-gold",
    glow: "shadow-gold/50",
    border: "border-gold",
  },
  alert: {
    bg: "bg-orange-500",
    text: "text-orange-500",
    glow: "shadow-orange-500/50",
    border: "border-orange-500",
  },
  urgent: {
    bg: "bg-red-500",
    text: "text-red-500",
    glow: "shadow-red-500/50",
    border: "border-red-500",
  },
  overtime: {
    bg: "bg-red-600",
    text: "text-red-600",
    glow: "shadow-red-600/50",
    border: "border-red-600",
  },
}

function CourtTimerCard({ court, onToggle, onReset }: { 
  court: CourtTimer
  onToggle: () => void
  onReset: () => void
}) {
  const percentage = (court.remainingSeconds / court.totalSeconds) * 100
  const urgency = getUrgencyLevel(percentage)
  const colors = urgencyColors[urgency]
  const isOvertime = court.remainingSeconds < 0

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "relative flex flex-col items-center justify-center rounded-2xl border-2 p-6 transition-all duration-500",
        colors.border,
        court.isActive && `shadow-lg ${colors.glow}`,
        isOvertime && "animate-pulse"
      )}
      style={{
        backgroundColor: `color-mix(in srgb, var(--forest) 95%, ${urgency === 'calm' ? '#10b981' : urgency === 'aware' ? '#C9A84C' : '#ef4444'} 5%)`,
      }}
    >
      {/* Court Name & Sport */}
      <div className="flex items-center gap-2 text-cream/80">
        <SportIcon sport={court.sport} className="h-5 w-5" />
        <span className="font-mono text-sm uppercase tracking-wider">{court.name}</span>
      </div>

      {/* Player Name */}
      {court.playerName && (
        <p className="mt-1 text-sm text-cream/60">{court.playerName}</p>
      )}

      {/* Timer Display */}
      <div className={cn(
        "mt-4 font-mono text-5xl font-bold tracking-tight transition-colors duration-500 md:text-6xl lg:text-7xl",
        colors.text
      )}>
        {formatCountdown(court.remainingSeconds)}
      </div>

      {/* Overtime Label */}
      <AnimatePresence>
        {isOvertime && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-2 rounded-full bg-red-600 px-3 py-1 text-xs font-bold uppercase text-white"
          >
            Tiempo Extra
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Ring */}
      <div className="relative mt-4 h-2 w-full overflow-hidden rounded-full bg-cream/10">
        <motion.div
          className={cn("h-full rounded-full transition-colors duration-500", colors.bg)}
          initial={{ width: "100%" }}
          animate={{ width: `${Math.max(0, percentage)}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Controls */}
      <div className="mt-4 flex gap-2">
        <Button
          size="sm"
          variant="ghost"
          onClick={onToggle}
          className="text-cream/60 hover:bg-cream/10 hover:text-cream"
        >
          {court.isActive ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4" />
          )}
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={onReset}
          className="text-cream/60 hover:bg-cream/10 hover:text-cream"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  )
}

export default function TimerKioskPage() {
  const [courts, setCourts] = useState<CourtTimer[]>(() =>
    MOCK_COURTS.map(c => ({
      ...c,
      totalSeconds: c.durationMins * 60,
      remainingSeconds: Math.floor(Math.random() * c.durationMins * 60),
      isActive: true,
      playerName: ["Juan Pérez", "María García", "Carlos López", "Ana Martínez"][c.id - 1],
    }))
  )
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Update current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  // Update court timers
  useEffect(() => {
    const interval = setInterval(() => {
      setCourts(prev =>
        prev.map(court => {
          if (!court.isActive) return court
          const newRemaining = court.remainingSeconds - 1
          
          // Play warning sound at specific thresholds
          if (soundEnabled && [300, 60, 0].includes(newRemaining)) {
            // In production, play actual audio
            console.log(`[v0] Warning sound for ${court.name} at ${newRemaining}s`)
          }
          
          return { ...court, remainingSeconds: newRemaining }
        })
      )
    }, 1000)
    return () => clearInterval(interval)
  }, [soundEnabled])

  const toggleCourt = useCallback((id: number) => {
    setCourts(prev =>
      prev.map(c => (c.id === id ? { ...c, isActive: !c.isActive } : c))
    )
  }, [])

  const resetCourt = useCallback((id: number) => {
    setCourts(prev =>
      prev.map(c => (c.id === id ? { ...c, remainingSeconds: c.totalSeconds, isActive: true } : c))
    )
  }, [])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  return (
    <div className="min-h-screen bg-forest text-cream">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-cream/10 px-6 py-4">
        <div className="flex items-center gap-4">
          <h1 className="font-display text-2xl font-bold">
            <span className="text-gold">Sports</span>Prime
          </h1>
          <span className="rounded-full bg-cream/10 px-3 py-1 font-mono text-xs uppercase tracking-wider">
            Timer Kiosk
          </span>
        </div>

        <div className="flex items-center gap-4">
          {/* Current Time */}
          <div className="text-right">
            <p className="font-mono text-2xl font-bold">
              {currentTime.toLocaleTimeString("es-CO", { 
                hour: "2-digit", 
                minute: "2-digit",
                second: "2-digit",
                hour12: false 
              })}
            </p>
            <p className="text-xs text-cream/60">
              {currentTime.toLocaleDateString("es-CO", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            </p>
          </div>

          {/* Controls */}
          <div className="flex gap-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="text-cream/60 hover:bg-cream/10 hover:text-cream"
            >
              {soundEnabled ? (
                <Volume2 className="h-5 w-5" />
              ) : (
                <VolumeX className="h-5 w-5" />
              )}
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={toggleFullscreen}
              className="text-cream/60 hover:bg-cream/10 hover:text-cream"
            >
              <Maximize2 className="h-5 w-5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="text-cream/60 hover:bg-cream/10 hover:text-cream"
            >
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Court Grid */}
      <main className="p-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {courts.map(court => (
            <CourtTimerCard
              key={court.id}
              court={court}
              onToggle={() => toggleCourt(court.id)}
              onReset={() => resetCourt(court.id)}
            />
          ))}
        </div>

        {/* Legend */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm">
          {Object.entries(urgencyColors).map(([level, colors]) => (
            <div key={level} className="flex items-center gap-2">
              <div className={cn("h-3 w-3 rounded-full", colors.bg)} />
              <span className="capitalize text-cream/60">
                {level === "calm" ? "Tranquilo" :
                 level === "aware" ? "Atento" :
                 level === "alert" ? "Alerta" :
                 level === "urgent" ? "Urgente" : "Tiempo Extra"}
              </span>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 flex items-center justify-between border-t border-cream/10 px-6 py-3">
        <p className="text-xs text-cream/40">
          v1.0.0 — Actualización automática cada segundo
        </p>
        <PoweredByBadge variant="light" />
      </footer>
    </div>
  )
}
