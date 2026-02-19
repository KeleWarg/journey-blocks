'use client'

import * as React from 'react'
import {
  BarChart3,
  ChevronRight,
  Landmark,
  PiggyBank,
  Wallet,
  type LucideIcon,
} from 'lucide-react'
import { BankFormLayout } from '@/components/bank-layout'
import type { TransitionDirection } from '@/components/bank-layout'
import { BANK_ACCOUNT_TYPE_OPTIONS, BANK_TOTAL_QUESTIONS, type BankAccountType } from '@/types/banks'

interface AccountTypeScreenProps {
  initialValue?: BankAccountType
  direction?: TransitionDirection
  onSubmit?: (value: BankAccountType) => void
}

const OPTION_ICONS: Record<BankAccountType, LucideIcon> = {
  cds: Landmark,
  checking: BarChart3,
  savings: PiggyBank,
  'money-market': Wallet,
}

export function AccountTypeScreen({ initialValue, direction = 'none', onSubmit }: AccountTypeScreenProps) {
  const [selected, setSelected] = React.useState<BankAccountType | undefined>(initialValue)

  const handleSelect = (value: BankAccountType) => {
    setSelected(value)
    window.setTimeout(() => onSubmit?.(value), 180)
  }

  return (
    <BankFormLayout
      answeredQuestions={selected ? 1 : 0}
      totalQuestions={BANK_TOTAL_QUESTIONS}
      stepKey="accountType"
      direction={direction}
    >
      <div>
        <h2 className="mb-8 text-2xl font-semibold text-neutral-900 sm:text-[28px] sm:leading-9">
          1. What type of account are you interested in?
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {BANK_ACCOUNT_TYPE_OPTIONS.map((option) => {
            const Icon = OPTION_ICONS[option.value]
            const isSelected = selected === option.value

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                className={[
                  'flex h-16 items-center justify-between rounded-lg border bg-white px-4 text-left transition-all duration-150',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2',
                  isSelected
                    ? 'border-[#5B5FC7] bg-[#F0F0FF] ring-1 ring-[#5B5FC7]'
                    : 'border-neutral-200 hover:border-neutral-300 hover:shadow-sm',
                ].join(' ')}
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-md border border-neutral-200 bg-neutral-50 text-neutral-500">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="text-base font-medium text-neutral-800">{option.label}</span>
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

export default AccountTypeScreen
