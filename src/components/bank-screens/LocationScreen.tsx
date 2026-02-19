'use client'

import * as React from 'react'
import { MapPin, Navigation } from 'lucide-react'
import { BankFormLayout } from '@/components/bank-layout'
import type { TransitionDirection } from '@/components/bank-layout'
import { BANK_TOTAL_QUESTIONS } from '@/types/banks'

interface LocationScreenProps {
  answeredCount: number
  initialValue?: string
  direction?: TransitionDirection
  onBack?: () => void
  onSubmit?: (zipCode: string) => void
}

export function LocationScreen({
  answeredCount,
  initialValue = '',
  direction = 'none',
  onBack,
  onSubmit,
}: LocationScreenProps) {
  const [zipCode, setZipCode] = React.useState(initialValue)
  const [error, setError] = React.useState('')
  const [locating, setLocating] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const validateAndSubmit = (value: string) => {
    const cleaned = value.replace(/\D/g, '')
    if (cleaned.length !== 5) {
      setError('Please enter a valid 5-digit zip code')
      return
    }
    setError('')
    onSubmit?.(cleaned)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 5)
    setZipCode(value)
    setError('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      validateAndSubmit(zipCode)
    }
  }

  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser')
      return
    }
    setLocating(true)
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          )
          const data = await res.json()
          const zip = data.postcode || ''
          if (zip) {
            setZipCode(zip)
            setError('')
            onSubmit?.(zip)
          } else {
            setError('Could not determine your zip code. Please enter it manually.')
          }
        } catch {
          setError('Could not determine your location. Please enter your zip code manually.')
        } finally {
          setLocating(false)
        }
      },
      () => {
        setLocating(false)
        setError('Location access denied. Please enter your zip code manually.')
      }
    )
  }

  return (
    <BankFormLayout
      answeredQuestions={answeredCount}
      totalQuestions={BANK_TOTAL_QUESTIONS}
      stepKey="location"
      direction={direction}
      onBack={onBack}
    >
      <div>
        <h2 className="mb-8 text-2xl font-semibold text-neutral-900 sm:text-[28px] sm:leading-9">
          5. Where are you located?
        </h2>

        <div className="space-y-4">
          <div className="relative">
            <MapPin className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" aria-hidden="true" />
            <input
              ref={inputRef}
              type="text"
              inputMode="numeric"
              value={zipCode}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Enter zip code"
              className={[
                'w-full rounded-lg border bg-white py-4 pl-12 pr-4 text-base text-neutral-900 outline-none transition-colors',
                'focus:border-[#5B5FC7] focus:ring-2 focus:ring-[#5B5FC7]/20',
                error ? 'border-feedback-error' : 'border-neutral-200',
              ].join(' ')}
            />
          </div>

          {error && (
            <p className="text-sm text-feedback-error">{error}</p>
          )}

          <button
            type="button"
            onClick={handleUseLocation}
            disabled={locating}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-neutral-200 bg-white px-5 py-3.5 text-sm font-medium text-[#5B5FC7] transition-colors hover:border-neutral-300 hover:bg-neutral-50 disabled:opacity-50"
          >
            <Navigation className="h-4 w-4" aria-hidden="true" />
            {locating ? 'Detecting location...' : 'Use my current location'}
          </button>

          <button
            type="button"
            onClick={() => validateAndSubmit(zipCode)}
            disabled={!zipCode}
            className="w-full rounded-lg bg-[#35B782] px-5 py-3.5 text-base font-semibold text-white transition-colors hover:bg-[#2DA572] disabled:bg-[#CCEBE4] disabled:cursor-not-allowed"
          >
            Continue
          </button>
        </div>
      </div>
    </BankFormLayout>
  )
}

export default LocationScreen
