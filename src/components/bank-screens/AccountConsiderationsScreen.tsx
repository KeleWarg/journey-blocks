'use client'

import * as React from 'react'
import { ChevronRight } from 'lucide-react'
import { BankFormLayout } from '@/components/bank-layout'
import type { TransitionDirection } from '@/components/bank-layout'
import {
  BANK_CONSIDERATION_OPTIONS,
  BANK_TOTAL_QUESTIONS,
  type BankConsideration,
} from '@/types/banks'

interface AccountConsiderationsScreenProps {
  answeredCount: number
  initialValue?: BankConsideration
  direction?: TransitionDirection
  onBack?: () => void
  onSubmit?: (value: BankConsideration) => void
}

export function AccountConsiderationsScreen({
  answeredCount,
  initialValue,
  direction = 'none',
  onBack,
  onSubmit,
}: AccountConsiderationsScreenProps) {
  const [selected, setSelected] = React.useState<BankConsideration | undefined>(initialValue)

  const handleSelect = (value: BankConsideration) => {
    setSelected(value)
    window.setTimeout(() => onSubmit?.(value), 180)
  }

  return (
    <BankFormLayout
      answeredQuestions={answeredCount}
      totalQuestions={BANK_TOTAL_QUESTIONS}
      stepKey="considerations"
      direction={direction}
      onBack={onBack}
    >
      <div>
        <h2 className="mb-8 text-2xl font-semibold text-neutral-900 sm:text-[28px] sm:leading-9">
          3. When considering a bank account, which of the following matters most to you?
        </h2>

        <div className="space-y-3">
          {BANK_CONSIDERATION_OPTIONS.map((option) => {
            const isSelected = selected === option.value
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
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
        </div>
      </div>
    </BankFormLayout>
  )
}

export default AccountConsiderationsScreen
