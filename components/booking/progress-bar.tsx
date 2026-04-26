'use client'

import { cn } from '@/lib/utils'

interface ProgressBarProps {
  currentStep: 1 | 2 | 3 | 4 | 5
}

const steps = [
  { number: 1, label: 'Cancha' },
  { number: 2, label: 'Horario' },
  { number: 3, label: 'Datos' },
  { number: 4, label: 'Pago' },
  { number: 5, label: 'Confirmación' },
]

export function ProgressBar({ currentStep }: ProgressBarProps) {
  return (
    <div className="w-full">
      {/* Step Label */}
      <div className="mb-2">
        <span className="font-mono text-[11px] uppercase tracking-wider text-sp-muted">
          Paso {currentStep} de 5 — {steps[currentStep - 1].label}
        </span>
      </div>
      
      {/* Progress Line */}
      <div className="relative h-0.5 w-full bg-sp-muted/30">
        {steps.map((step) => {
          const isCompleted = step.number < currentStep
          const isCurrent = step.number === currentStep
          const width = `${(step.number / steps.length) * 100}%`
          
          return (
            <div
              key={step.number}
              className={cn(
                'absolute top-0 left-0 h-full transition-all duration-500',
                isCompleted && 'bg-sp-gold',
                isCurrent && 'bg-sp-green'
              )}
              style={{ width: isCurrent || isCompleted ? width : '0%' }}
            />
          )
        })}
      </div>
    </div>
  )
}
