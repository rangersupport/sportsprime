'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const COURTS = ['Padbol Norte', 'Padbol Sur']
const DEFAULT_MINUTES = 5

function pad(n: number) {
  return n.toString().padStart(2, '0')
}

function formatTime(seconds: number) {
  const abs = Math.abs(seconds)
  const m = Math.floor(abs / 60)
  const s = abs % 60
  return `${seconds < 0 ? '-' : ''}${pad(m)}:${pad(s)}`
}

export default function MachTimerPage() {
  const [court, setCourt]         = useState(COURTS[0])
  const [totalSecs]               = useState(DEFAULT_MINUTES * 60)
  const [remaining, setRemaining] = useState(DEFAULT_MINUTES * 60)
  const [running, setRunning]     = useState(false)
  const [started, setStarted]     = useState(false)
  const intervalRef               = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setRemaining((prev) => prev - 1)
      }, 1000)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [running])

  const handleStart = () => {
    setStarted(true)
    setRunning(true)
  }

  const handlePause = () => setRunning(false)
  const handleResume = () => setRunning(true)

  const handleReset = () => {
    setRunning(false)
    setStarted(false)
    setRemaining(totalSecs)
  }

  const isOvertime = remaining < 0
  const pct        = Math.max(0, (remaining / totalSecs) * 100)

  const ringColor  = isOvertime         ? '#ef4444'
                   : remaining < 60     ? '#ef4444'
                   : remaining < 3 * 60 ? '#f97316'
                   : '#22c55e'

  // Circumference for SVG ring
  const R   = 120
  const circ = 2 * Math.PI * R
  const dash = (pct / 100) * circ

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
      style={{ background: '#0D0D0D' }}
    >
      {/* Header */}
      <div className="text-center mb-8">
        <p className="text-xs font-sans uppercase tracking-[0.2em] mb-1" style={{ color: '#E31E24' }}>
          MACH Club · Cúcuta
        </p>
        <h1 className="font-serif text-3xl text-white">{court}</h1>
      </div>

      {/* Court selector */}
      {!started && (
        <div className="flex gap-3 mb-10">
          {COURTS.map((c) => (
            <button
              key={c}
              onClick={() => setCourt(c)}
              className="px-5 py-2 rounded-full font-sans text-sm transition-all"
              style={{
                background: court === c ? '#E31E24' : 'rgba(255,255,255,0.08)',
                color: '#fff',
                border: court === c ? '2px solid #E31E24' : '2px solid rgba(255,255,255,0.15)',
              }}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      {/* Ring + Time */}
      <div className="relative flex items-center justify-center mb-10">
        <svg width="280" height="280" className="-rotate-90">
          {/* Track */}
          <circle
            cx="140" cy="140" r={R}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="10"
          />
          {/* Progress */}
          <circle
            cx="140" cy="140" r={R}
            fill="none"
            stroke={ringColor}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={`${dash} ${circ}`}
            style={{ transition: 'stroke-dasharray 0.8s linear, stroke 0.5s' }}
          />
        </svg>

        <div className="absolute text-center">
          <AnimatePresence mode="wait">
            {isOvertime && (
              <motion.p
                key="overtime"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs font-sans uppercase tracking-widest mb-1"
                style={{ color: '#ef4444' }}
              >
                ¡Tiempo extra!
              </motion.p>
            )}
          </AnimatePresence>
          <span
            className="font-mono font-bold"
            style={{
              fontSize: '4rem',
              lineHeight: 1,
              color: isOvertime ? '#ef4444' : '#fff',
            }}
          >
            {formatTime(remaining)}
          </span>
          {!started && (
            <p className="text-xs font-sans mt-2" style={{ color: 'rgba(255,255,255,0.4)' }}>
              5 minutos
            </p>
          )}
        </div>
      </div>

      {/* Controls */}
      {!started ? (
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={handleStart}
          className="w-48 py-4 rounded-full font-sans font-bold text-lg uppercase tracking-wider text-white"
          style={{
            background: '#E31E24',
            boxShadow: '0 0 40px rgba(227,30,36,0.5)',
          }}
        >
          Iniciar
        </motion.button>
      ) : (
        <div className="flex gap-4">
          {running ? (
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={handlePause}
              className="w-36 py-3 rounded-full font-sans font-bold uppercase tracking-wider text-white"
              style={{ background: 'rgba(255,255,255,0.12)', border: '2px solid rgba(255,255,255,0.2)' }}
            >
              Pausar
            </motion.button>
          ) : (
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={handleResume}
              className="w-36 py-3 rounded-full font-sans font-bold uppercase tracking-wider text-white"
              style={{ background: '#E31E24', boxShadow: '0 0 24px rgba(227,30,36,0.4)' }}
            >
              Reanudar
            </motion.button>
          )}
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={handleReset}
            className="w-36 py-3 rounded-full font-sans font-bold uppercase tracking-wider"
            style={{
              background: 'transparent',
              border: '2px solid rgba(255,255,255,0.2)',
              color: 'rgba(255,255,255,0.6)',
            }}
          >
            Reiniciar
          </motion.button>
        </div>
      )}

      {/* Overtime pulse */}
      <AnimatePresence>
        {isOvertime && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.05, 0.15, 0.05] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="fixed inset-0 pointer-events-none"
            style={{ background: '#ef4444' }}
          />
        )}
      </AnimatePresence>

      <p className="mt-12 text-xs font-sans uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.2)' }}>
        Powered by Peralta Prime
      </p>
    </div>
  )
}
