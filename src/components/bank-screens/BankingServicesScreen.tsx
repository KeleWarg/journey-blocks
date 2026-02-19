'use client'

import * as React from 'react'
import { Check } from 'lucide-react'
import { BankFormLayout } from '@/components/bank-layout'
import type { TransitionDirection } from '@/components/bank-layout'
import {
  BANK_SERVICE_OPTIONS,
  BANK_TOTAL_QUESTIONS,
  type BankingService,
} from '@/types/banks'

interface BankingServicesScreenProps {
  answeredCount: number
  initialValue?: BankingService[]
  direction?: TransitionDirection
  onBack?: () => void
  onSubmit?: (value: BankingService[]) => void
  onSkip?: () => void
}

export function BankingServicesScreen({
  answeredCount,
  initialValue = [],
  direction = 'none',
  onBack,
  onSubmit,
  onSkip,
}: BankingServicesScreenProps) {
  const [selected, setSelected] = React.useState<BankingService[]>(initialValue)

  const toggleOption = (value: BankingService) => {
    setSelected((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    )
  }

  const handleContinue = () => {
    onSubmit?.(selected)
  }

  return (
    <BankFormLayout
      answeredQuestions={answeredCount}
      totalQuestions={BANK_TOTAL_QUESTIONS}
      stepKey="bankingServices"
      direction={direction}
      onBack={onBack}
    >
      <div>
        <h2 className="mb-8 text-2xl font-semibold text-neutral-900 sm:text-[28px] sm:leading-9">
          4. What other banking services or financial products are you interested in exploring?
        </h2>

        <div className="space-y-3">
          {BANK_SERVICE_OPTIONS.map((option) => {
            const isSelected = selected.includes(option.value)
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => toggleOption(option.value)}
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
                {isSelected && (
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#5B5FC7] text-white">
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {selected.length > 0 && (
          <button
            type="button"
            onClick={handleContinue}
            className="mt-6 w-full rounded-lg bg-[#35B782] px-5 py-3.5 text-base font-semibold text-white transition-colors hover:bg-[#2DA572]"
          >
            Continue
          </button>
        )}

        {onSkip && (
          <div className="mt-4 flex items-center gap-4">
            <button
              type="button"
              onClick={onSkip}
              className="text-sm font-medium text-neutral-500 hover:text-neutral-700 hover:underline"
            >
              Skip
            </button>
          </div>
        )}
      </div>
    </BankFormLayout>
  )
}

export default BankingServicesScreen
