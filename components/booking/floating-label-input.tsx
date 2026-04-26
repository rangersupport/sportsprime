'use client'

import { useState, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface FloatingLabelInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export const FloatingLabelInput = forwardRef<
  HTMLInputElement,
  FloatingLabelInputProps
>(({ label, error, className, ...props }, ref) => {
  const [isFocused, setIsFocused] = useState(false)
  const hasValue = props.value !== undefined && props.value !== ''

  return (
    <div className="relative">
      <input
        ref={ref}
        {...props}
        onFocus={(e) => {
          setIsFocused(true)
          props.onFocus?.(e)
        }}
        onBlur={(e) => {
          setIsFocused(false)
          props.onBlur?.(e)
        }}
        className={cn(
          'w-full pt-6 pb-2 px-0 bg-transparent border-0 border-b font-sans text-sp-ink',
          'transition-colors duration-200 outline-none',
          'placeholder:text-transparent',
          isFocused ? 'border-sp-green' : 'border-sp-muted',
          error && 'border-sp-danger',
          className
        )}
        placeholder={label}
      />
      <label
        className={cn(
          'absolute left-0 transition-all duration-200 pointer-events-none font-sans',
          isFocused || hasValue
            ? 'top-0 text-xs scale-90 origin-left'
            : 'top-4 text-base',
          isFocused ? 'text-sp-green' : 'text-sp-muted',
          error && 'text-sp-danger'
        )}
      >
        {label}
      </label>
      {error && (
        <p className="mt-1 text-xs text-sp-danger">{error}</p>
      )}
    </div>
  )
})

FloatingLabelInput.displayName = 'FloatingLabelInput'
