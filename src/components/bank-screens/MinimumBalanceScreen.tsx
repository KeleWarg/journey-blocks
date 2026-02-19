'use client'

import * as React from 'react'
import { ChevronRight } from 'lucide-react'
import { BankFormLayout } from '@/components/bank-layout'
import type { TransitionDirection } from '@/components/bank-layout'
import {
  BANK_BALANCE_OPTIONS,
  BANK_BALANCE_VALIDATION,
  BANK_TOTAL_QUESTIONS,
} from '@/types/banks'

interface MinimumBalanceScreenProps {
  answeredCount: number
  initialValue?: string
  direction?: TransitionDirection
  onBack?: () => void
  onSubmit?: (value: string) => void
}

export function MinimumBalanceScreen({
  answeredCount,
  initialValue,
  direction = 'none',
  onBack,
  onSubmit,
}: MinimumBalanceScreenProps) {
  const [selected, setSelected] = React.useState<string | undefined>(initialValue)
  const [customValue, setCustomValue] = React.useState('')
  const [showCustom, setShowCustom] = React.useState(false)
  const [error, setError] = React.useState('')
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handlePresetSelect = (value: string) => {
    setSelected(value)
    setShowCustom(false)
    setError('')
    window.setTimeout(() => onSubmit?.(value), 180)
  }

  const handleCustomToggle = () => {
    setShowCustom(true)
    setSelected(undefined)
    setTimeout(() => inputRef.current?.focus(), 100)
  }

  const formatCurrencyInput = (raw: string): string => {
    const digits = raw.replace(/\D/g, '')
    if (!digits) return ''
    return Number(digits).toLocaleString('en-US')
  }

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCurrencyInput(e.target.value)
    setCustomValue(formatted)
    setError('')
  }

  const handleCustomSubmit = () => {
    const numericValue = Number(customValue.replace(/\D/g, ''))
    if (numericValue < BANK_BALANCE_VALIDATION.min) {
      setError('Please enter a valid amount')
      return
    }
    if (numericValue > BANK_BALANCE_VALIDATION.max) {
      setError(BANK_BALANCE_VALIDATION.errorMsg)
      return
    }
    onSubmit?.(String(numericValue))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleCustomSubmit()
    }
  }

  return (
    <BankFormLayout
      answeredQuestions={answeredCount}
      totalQuestions={BANK_TOTAL_QUESTIONS}
      stepKey="minimumBalance"
      direction={direction}
      onBack={onBack}
    >
      <div>
        <h2 className="mb-8 text-2xl font-semibold text-neutral-900 sm:text-[28px] sm:leading-9">
          2. What is your preferred minimum account balance?
        </h2>

        <div className="space-y-3">
          {BANK_BALANCE_OPTIONS.map((option) => {
            const isSelected = selected === option.value && !showCustom
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => handlePresetSelect(option.value)}
                className={[
                  'flex w-full items-center justify-between rounded-lg border bg-white px-5 py-4 text-left transition-all duration-150',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2',
                  isSelected
                    ? 'border-[#5B5FC7] bg-[#F0F0FF] ring-1 ring-[#5B5FC7]'
                    : 'border-neutral-200 hover:border-neutral-300 hover:shadow-sm',
                ].join(' ')}
              >
                <span className="text-base font-medium text-neutral-800">
                  {option.label}
                </span>
                <ChevronRight className="h-4 w-4 text-neutral-400" aria-hidden="true" />
              </button>
            )
          })}

          {!showCustom ? (
            <button
              type="button"
              onClick={handleCustomToggle}
              className="flex w-full items-center justify-between rounded-lg border border-neutral-200 bg-white px-5 py-4 text-left transition-all duration-150 hover:border-neutral-300 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2"
            >
              <span className="text-base font-medium text-neutral-800">
                Enter a custom amount
              </span>
              <ChevronRight className="h-4 w-4 text-neutral-400" aria-hidden="true" />
            </button>
          ) : (
            <div className="space-y-3">
              <div className="relative">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-base text-neutral-500">
                  $
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  inputMode="numeric"
                  value={customValue}
                  onChange={handleCustomChange}
                  onKeyDown={handleKeyDown}
                  placeholder="0"
                  className={[
                    'w-full rounded-lg border bg-white py-4 pl-8 pr-4 text-base text-neutral-900 outline-none transition-colors',
                    'focus:border-[#5B5FC7] focus:ring-2 focus:ring-[#5B5FC7]/20',
                    error
                      ? 'border-feedback-error'
                      : 'border-neutral-200',
                  ].join(' ')}
                />
              </div>
              {error && (
                <p className="text-sm text-feedback-error">{error}</p>
              )}
              <button
                type="button"
                onClick={handleCustomSubmit}
                disabled={!customValue}
                className="w-full rounded-lg bg-[#35B782] px-5 py-3.5 text-base font-semibold text-white transition-colors hover:bg-[#2DA572] disabled:bg-[#CCEBE4] disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          )}
        </div>
      </div>
    </BankFormLayout>
  )
}

export default MinimumBalanceScreen
